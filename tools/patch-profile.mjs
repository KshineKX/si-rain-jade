// Edit supported top-level YAML patch records in place. Nested name/config data
// remains byte-for-byte intact; unsupported or duplicate records fail closed.
export function enableSkinPatch(input){
 const lines=input.replace(/^\uFEFF/,'').split(/\r?\n/),starts=[];let indent=Infinity;
 for(let i=0;i<lines.length;i++){const m=lines[i].match(/^( *)-\s/);if(m)indent=Math.min(indent,m[1].length);}
 if(!Number.isFinite(indent)){
  if(lines.some(line=>!/^\s*(?:\[\s*\]|#.*|---|\.\.\.)?\s*$/.test(line)))throw Error('Unsupported patch YAML; preserve original');
  return{patch:lines.filter(line=>!/^\s*(?:\[\s*\]|\.\.\.)\s*$/.test(line)).join('\n')+'\n- id: ui-skin-si-rain-jade\n  disabled: false\n',switchesOff:[]};
 }
 for(let i=0;i<lines.length;i++)if(new RegExp('^ {'+indent+'}-\\s').test(lines[i]))starts.push(i);
 const seen=new Set(),switchesOff=[];let hasOwn=false;const parts=[];let cursor=0;
 const idPattern=new RegExp('^ {'+indent+'}(?:- |  )id:\\s*(?:"([^"\\\\]+)"|\'([^\']+)\'|([^#\\s]+))\\s*(?:#.*)?$');
 for(let n=0;n<starts.length;n++){
  const start=starts[n],end=starts[n+1]??lines.length;parts.push(...lines.slice(cursor,start));const block=lines.slice(start,end),ids=block.map(line=>line.match(idPattern)).filter(Boolean);
  if(!new RegExp('^ {'+indent+'}- [A-Za-z][\\w-]*:').test(block[0])||block.some(line=>/^\s*\.\.\./.test(line)))throw Error('Unsupported patch record syntax; preserve original');
  if(ids.length>1)throw Error('Duplicate id property in patch record');
  const id=ids[0]&&(ids[0][1]||ids[0][2]||ids[0][3]);
  if(id){if(seen.has(id))throw Error('Duplicate patch id; preserve original: '+id);seen.add(id);}
  if(id&&/^ui-skin-[\w-]+$/.test(id)){
   const own=id==='ui-skin-si-rain-jade';hasOwn ||=own;if(!own)switchesOff.push(id);
   const disabled=new RegExp('^ {'+indent+'}(?:- |  )disabled:\\s*');let count=0;
   for(let i=0;i<block.length;i++)if(disabled.test(block[i])){block[i]=block[i].slice(0,indent+2)+'disabled: '+(!own);count++;}
   if(count>1)throw Error('Duplicate disabled property in patch record');
   if(!count){let i=block.length;while(i>0&&/^\s*(?:#.*)?$/.test(block[i-1]))i--;block.splice(i,0,' '.repeat(indent+2)+'disabled: '+(!own));}
  }
  parts.push(...block);cursor=end;
 }
 if(!hasOwn)parts.push('',' '.repeat(indent)+'- id: ui-skin-si-rain-jade',' '.repeat(indent+2)+'disabled: false','');
 return{patch:parts.join('\n'),switchesOff};
}

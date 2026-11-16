import fs from'node:fs';import path from'node:path';import os from'node:os';import{fileURLToPath}from'node:url';
import{HOST_CONTRACT}from'../packages/skin/src/host-contract.js';

// Read published client bundles only. Never import or execute inspected host code.
export function checkClientContract({version,clients}){
 const checks=[];const has=(name,test)=>checks.push({name,passed:test});
 const text=name=>clients[name]||'';
 for(const[name,methods]of Object.entries(HOST_CONTRACT.services))if(name==='theme')for(const method of methods)has('theme.'+method,new RegExp('\\b'+method+'\\s*\\(').test(text('ui-theme')));
 has('slot.shell.overlay',text('ui-layout').includes('shell.overlay'));
 for(const slot of ['sidebar.session.action'])has('slot.'+slot,text('ui-sidebar').includes(slot));
 const slots={root:'ui-layout',main:'ui-layout',sidebar:'ui-layout',conversation:'ui-conversation',header:'ui-conversation'};
 for(const[key,selector]of Object.entries(HOST_CONTRACT.selectors)){
  const slot=selector.match(/data-slot="([^"]+)"/);
  if(slot)has('declaration.'+slot[1],text(slots[key]).includes(slot[1]));
  else{const marker=selector.slice(1,-1);has('marker.'+marker,text(key==='flow'?'ui-chat':'ui-conversation').includes(marker));}
 }
 has('slot-api.entries',/slots\.entries\s*\(/.test(text('ui-layout')+text('ui-sidebar')+text('ui-workspace')));
 has('navigation.openSession',/\bopenSession\s*\(/.test(text('ui-workspace')));
 const warnings=[];for(const[name,selector]of Object.entries(HOST_CONTRACT.decorations)){const source=name==='messageBubbles'?text('ui-chat'):text('ui-sidebar')+text('ui-workspace'),markers=[...selector.matchAll(/\[(data-[\w-]+)\]/g)].map(m=>m[1]),suffixes=[...selector.matchAll(/_([A-Za-z]+)"/g)].map(m=>'_'+m[1]);if(![...markers,...suffixes].some(x=>source.includes(x)))warnings.push('Optional decoration changed: '+name);}
 return{schema:HOST_CONTRACT.schema,hostVersion:version,scope:'static-contract',knownVersion:HOST_CONTRACT.verifiedHosts.includes(version),checks,warnings,capabilitiesPresent:checks.every(c=>c.passed),runtimeAcceptance:false,next:'Run the isolated UI probe before upgrading a working environment.'};
}

function readAsar(file){
 const fd=fs.openSync(file,'r'),prefix=Buffer.alloc(16);fs.readSync(fd,prefix,0,16,0);const size=prefix.readUInt32LE(12);if(size>20000000||size<2)throw Error('Unsupported ASAR header');const raw=Buffer.alloc(size);fs.readSync(fd,raw,0,size,16);const header=JSON.parse(raw),offset=8+prefix.readUInt32LE(4);
 return{get(name){let entry={files:header.files};for(const part of name.split('/'))entry=entry?.files?.[part];if(!entry||entry.unpacked||entry.size>5000000)throw Error('Missing or unsafe host file '+name);const data=Buffer.alloc(entry.size);fs.readSync(fd,data,0,data.length,offset+Number(entry.offset));return data.toString('utf8')},close(){fs.closeSync(fd)}};
}

export function inspectInstalledHost({desktop,modules}){
 const names=['ui-layout','ui-theme','ui-sidebar','ui-conversation','ui-chat','ui-workspace'];let version,clients={},versions=[];
 if(modules){for(const name of names){const dir=path.join(modules,'@deepseek-ai/dsh-client-'+name);clients[name]=fs.readFileSync(path.join(dir,'lib/client.js'),'utf8');versions.push(JSON.parse(fs.readFileSync(path.join(dir,'package.json'),'utf8')).version);version??=versions.at(-1);}}
 else{const reader=readAsar(path.join(path.dirname(desktop),'resources/app.asar'));try{for(const name of names){const base='dsh/node_modules/@deepseek-ai/dsh-client-'+name;clients[name]=reader.get(base+'/lib/client.js');versions.push(JSON.parse(reader.get(base+'/package.json')).version);version??=versions.at(-1);}}finally{reader.close()}}
 const result=checkClientContract({version,clients});result.checks.push({name:'version.all-components-match',passed:versions.every(v=>v===version)});result.capabilitiesPresent=result.checks.every(c=>c.passed);return result;
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{const args=process.argv.slice(2),value=key=>{const at=args.indexOf(key);return at<0?undefined:args[at+1]},modules=value('--modules'),desktop=value('--desktop')||path.join(process.env.LOCALAPPDATA||path.join(os.homedir(),'AppData/Local'),'Programs/DeepSeek Harness/DeepSeek Harness.exe');const report=inspectInstalledHost({desktop,modules});const output=value('--output');if(output)fs.writeFileSync(path.resolve(output),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));process.exitCode=report.capabilitiesPresent?0:2;}catch(error){console.error('Compatibility check could not complete: '+error.message);process.exitCode=2;}
}

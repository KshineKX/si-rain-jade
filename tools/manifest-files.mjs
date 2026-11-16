import fs from'node:fs';import path from'node:path';import{createHash}from'node:crypto';

export function collectManifestFiles(root,allowed){
 if(!Array.isArray(allowed)||allowed.some(p=>typeof p!=='string'))throw Error('Build allowlist must contain explicit file paths');
 const canonical=fs.realpathSync(root),normal=p=>process.platform==='win32'?p.toLowerCase():p,seen=new Set();
 return [...allowed].sort().map(relative=>{
  if(!relative||relative.includes('\\')||path.posix.isAbsolute(relative)||relative.split('/').some(p=>!p||p==='.'||p==='..'||['node_modules','.git','.env','dist','cache'].includes(p))||seen.has(relative))throw Error('Unsafe or duplicate build path: '+relative);
  seen.add(relative);const file=path.join(canonical,...relative.split('/')),resolved=fs.realpathSync(file);
  if(normal(resolved)!==normal(file)||!fs.statSync(file).isFile())throw Error('Linked or non-file build input: '+relative);
  const data=fs.readFileSync(file);return{path:relative,bytes:data.length,sha256:createHash('sha256').update(data).digest('hex')};
 });
}

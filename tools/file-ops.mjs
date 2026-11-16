import fs from'node:fs';import path from'node:path';import{randomUUID}from'node:crypto';
const normal=p=>process.platform==='win32'?path.resolve(p).toLowerCase():path.resolve(p);
export function assertRegularTarget(target){if(!fs.lstatSync(target).isDirectory()||normal(fs.realpathSync(target))!==normal(target))throw Error('Version target is not an owned regular directory; preserve it');}
export function atomicWrite(file,data){const temporary=file+'.'+randomUUID()+'.tmp';try{fs.writeFileSync(temporary,data);fs.renameSync(temporary,file);}finally{if(fs.existsSync(temporary))fs.unlinkSync(temporary);}}
export function removeCreatedVersion(target,versionsRoot,release){
 if(!fs.existsSync(target))return;
 const absolute=path.resolve(target),base=path.resolve(versionsRoot);if(!normal(absolute).startsWith(normal(base)+path.sep))throw Error('Cleanup target escaped managed versions');assertRegularTarget(absolute);
 const allowed=new Set(release.files.filter(f=>f.path.startsWith('packages/skin/')).map(f=>f.path.slice('packages/skin/'.length)));
 function inspect(dir,relative=''){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const rel=relative?relative+'/'+e.name:e.name,file=path.join(dir,e.name);if(normal(fs.realpathSync(file))!==normal(file))throw Error('Unexpected linked cleanup input; preserve it');if(e.isDirectory())inspect(file,rel);else if(!allowed.has(rel))throw Error('Unexpected file in failed version; preserve it');}}
 inspect(absolute);fs.rmSync(absolute,{recursive:true,force:true});
}

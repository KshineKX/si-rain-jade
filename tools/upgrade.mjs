import fs from'node:fs';import path from'node:path';import{createHash,randomUUID}from'node:crypto';
const name='dsh-si-rain-jade',hash=b=>createHash('sha256').update(b).digest('hex'),json=b=>JSON.parse(b.toString('utf8').replace(/^\uFEFF/,''));
function inside(file,base){return path.resolve(file).startsWith(path.resolve(base)+path.sep);}
function checkEntries(pkg,target){if(pkg.dependencies?.[name]!=='link:'+target.replaceAll('\\','/')||pkg.dsh?.profile?.bundles?.filter(n=>n===name).length!==1)throw Error('Owned dependency/bundle changed; preserve current profile.');}
function atomic(file,data){const temporary=file+'.'+randomUUID()+'.tmp';fs.writeFileSync(temporary,data);fs.renameSync(temporary,file);}
export function upgradeOwned({loc,source,release,state,stateFile,manifestFile,patchFile,link,apply,isOwnLink,removeLink}){
 if(!inside(state.target,path.join(loc.data,'versions'))||!isOwnLink(link,state.target))throw Error('Previous target ownership mismatch');
 const raw=fs.readFileSync(manifestFile),patch=fs.readFileSync(patchFile),pkg=json(raw);checkEntries(pkg,state.target);
 if(!apply)return{status:'upgrade-plan',from:state.version,to:release.version,preserves:'other dependencies, bundles, patches, settings and conversations'};
 const backup=path.join(loc.data,'backups','upgrade-'+Date.now()+'-'+randomUUID()),target=path.join(loc.data,'versions',release.version,'skin');
 const existing=fs.existsSync(target);if(existing&&(!fs.lstatSync(target).isDirectory()||fs.lstatSync(target).isSymbolicLink()))throw Error('New version target is not an owned regular directory; preserve it');
 fs.mkdirSync(backup,{recursive:true});fs.writeFileSync(path.join(backup,'package.json'),raw);fs.writeFileSync(path.join(backup,'cordis.patch.yml'),patch);const oldState=fs.readFileSync(stateFile);fs.writeFileSync(path.join(backup,'previous-state.json'),oldState);
 for(const entry of release.files.filter(e=>e.path.startsWith('packages/skin/'))){const out=path.resolve(target,entry.path.slice('packages/skin/'.length));if(!inside(out,target))throw Error('Unsafe package path');if(!existing){fs.mkdirSync(path.dirname(out),{recursive:true});fs.copyFileSync(path.join(source,entry.path),out);}if(!fs.existsSync(out)||hash(fs.readFileSync(out))!==entry.sha256)throw Error('New version bytes differ; preserve existing version directory.');}
 pkg.dependencies[name]='link:'+target.replaceAll('\\','/');const next=Buffer.from(JSON.stringify(pkg,null,2)+'\n');
 removeLink(link,state.target);
 try{fs.symlinkSync(target,link,process.platform==='win32'?'junction':'dir');atomic(manifestFile,next);atomic(stateFile,JSON.stringify({version:release.version,kind:'upgrade',target,backup,previousTarget:state.target,beforeManifest:hash(raw),beforePatch:hash(patch),previousStateHash:hash(oldState),afterManifest:hash(next),afterPatch:hash(patch)}));}
 catch(error){atomic(manifestFile,raw);if(fs.existsSync(link)){if(!isOwnLink(link,target))throw Error('Upgrade failed and link changed; preserve backup '+backup);removeLink(link,target);}fs.symlinkSync(state.target,link,process.platform==='win32'?'junction':'dir');atomic(stateFile,oldState);throw error;}
 return{status:'upgraded',from:state.version,to:release.version,backup,patchPreserved:true};
}
export function rollbackOwnedUpgrade({loc,state,stateFile,manifestFile,patchFile,link,apply,isOwnLink,removeLink}){
 if(!inside(state.backup,path.join(loc.data,'backups'))||!inside(state.previousTarget,path.join(loc.data,'versions'))||!isOwnLink(link,state.target))throw Error('Upgrade backup/link ownership mismatch');
 const before=fs.readFileSync(path.join(state.backup,'package.json')),beforePatch=fs.readFileSync(path.join(state.backup,'cordis.patch.yml')),previous=fs.readFileSync(path.join(state.backup,'previous-state.json'));
 if(hash(before)!==state.beforeManifest||hash(beforePatch)!==state.beforePatch||hash(previous)!==state.previousStateHash||json(previous).target!==state.previousTarget)throw Error('Upgrade backup modified');
 const raw=fs.readFileSync(manifestFile),patch=fs.readFileSync(patchFile),pkg=json(raw);checkEntries(pkg,state.target);
 if(!apply)return{status:'upgrade-rollback-plan',restoreVersion:json(previous).version,backup:state.backup};
 const exact=hash(raw)===state.afterManifest;let restored=before;if(!exact){pkg.dependencies[name]=json(before).dependencies[name];restored=Buffer.from(JSON.stringify(pkg,null,2)+'\n');}
 const rollbackBackup=path.join(loc.data,'backups','rollback-upgrade-'+Date.now()+'-'+randomUUID());fs.mkdirSync(rollbackBackup,{recursive:true});fs.writeFileSync(path.join(rollbackBackup,'package.json'),raw);fs.writeFileSync(path.join(rollbackBackup,'cordis.patch.yml'),patch);const currentState=fs.readFileSync(stateFile);fs.writeFileSync(path.join(rollbackBackup,'state.json'),currentState);
 removeLink(link,state.target);
 try{fs.symlinkSync(state.previousTarget,link,process.platform==='win32'?'junction':'dir');atomic(manifestFile,restored);atomic(stateFile,previous);}
 catch(error){atomic(manifestFile,raw);if(fs.existsSync(link))removeLink(link,state.previousTarget);fs.symlinkSync(state.target,link,process.platform==='win32'?'junction':'dir');atomic(stateFile,currentState);throw error;}
 return{status:'upgrade-restored',version:json(previous).version,backup:rollbackBackup,otherEditsPreserved:true,patchPreserved:true};
}

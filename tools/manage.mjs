import{atomicWrite,removeCreatedVersion}from'./file-ops.mjs';
import{enableSkinPatch}from'./patch-profile.mjs';
import{assertDshStopped}from'./process-guard.mjs';
import{inspectInstalledHost}from'./check-compat.mjs';
import{upgradeOwned,rollbackOwnedUpgrade}from'./upgrade.mjs';
import fs from'node:fs';import path from'node:path';import os from'node:os';import{fileURLToPath}from'node:url';import{createHash}from'node:crypto';import{execFileSync}from'node:child_process';
const project=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),name='dsh-si-rain-jade';
const hash=b=>createHash('sha256').update(b).digest('hex');
const parseJson=b=>JSON.parse(b.toString('utf8').replace(/^\uFEFF/,''));
// Windows fix (v2): junctions are directories to lstat(); fs.unlinkSync() on them fails with EPERM (rmdir required).
// Ownership: only treat a path as ours when it resolves to the recorded target; never follow or delete anything else.
const real=p=>{try{return fs.realpathSync.native(p)}catch{return fs.realpathSync(p)}};
const isOwnLink=(link,target)=>{
 const st=fs.lstatSync(link);
 if(st.isSymbolicLink()){const got=real(link);if(got!==real(target))throw Error('Link points elsewhere; preserve it: '+link+' -> '+got);return true;}
 if(process.platform==='win32'&&st.isDirectory()){const got=real(link);if(got!==real(target))throw Error('Path is not the plugin link; preserve it: '+link+' -> '+got);return true;}
 throw Error('Path is not a link created by this installer; preserve it: '+link);
};
const removeLink=(link,target)=>{isOwnLink(link,target);const st=fs.lstatSync(link);if(st.isSymbolicLink())fs.unlinkSync(link);else fs.rmdirSync(link);};
export function locations(home,profile='desktop'){if(!/^[\w-]+$/.test(profile))throw Error('Invalid profile');return{home,profile,dir:path.join(home,'profiles',profile),data:path.join(home,'si-rain-jade',profile)};}
export function manage(action,loc,{apply=false,source=project}={}){
 const manifestFile=path.join(loc.dir,'package.json'),patchFile=path.join(loc.dir,'cordis.patch.yml'),stateFile=path.join(loc.data,'state.json'),link=path.join(loc.dir,'node_modules',name);
 if(action==='rollback'||action==='uninstall'){
  if(!fs.existsSync(stateFile))return{status:'not-installed'};
  const state=parseJson(fs.readFileSync(stateFile));
  if(state.kind==='upgrade'){if(action==='uninstall')throw Error('This is an upgrade: run Rollback first to restore the prior version, then review uninstall separately. Nothing changed.');return rollbackOwnedUpgrade({loc,state,stateFile,manifestFile,patchFile,link,apply,isOwnLink,removeLink});}
  for(const[file,expected]of [[manifestFile,state.afterManifest],[patchFile,state.afterPatch]])if(hash(fs.readFileSync(file))!==expected)throw Error('Profile changed since install; rollback refused to preserve unrelated edits. Backup: '+state.backup);
  if(!isOwnLink(link,state.target))throw Error('Owned link changed; preserve it.');
  for(const[file]of[[path.join(state.backup,'package.json')],[path.join(state.backup,'cordis.patch.yml')]])if(!fs.existsSync(file)||!fs.statSync(file).isFile())throw Error('Backup missing; refusing destructive rollback: '+state.backup);if(!apply)return{status:'rollback-plan',backup:state.backup};
  const currentManifest=fs.readFileSync(manifestFile),currentPatch=fs.readFileSync(patchFile);
  try{atomicWrite(manifestFile,fs.readFileSync(path.join(state.backup,'package.json')));atomicWrite(patchFile,fs.readFileSync(path.join(state.backup,'cordis.patch.yml')));removeLink(link,state.target);fs.renameSync(stateFile,stateFile+'.removed-'+Date.now());}
  catch(error){atomicWrite(manifestFile,currentManifest);atomicWrite(patchFile,currentPatch);if(!fs.existsSync(link))fs.symlinkSync(state.target,link,process.platform==='win32'?'junction':'dir');throw error;}
  return{status:'restored',backup:state.backup,settingsPreserved:true};
 }
 const release=parseJson(fs.readFileSync(path.join(source,'release-manifest.json')));
 const releasePaths=new Set();for(const file of release.files){if(typeof file.path!=='string'||file.path.includes('\\')||path.posix.isAbsolute(file.path)||file.path.split('/').some(part=>!part||part==='.'||part==='..')||releasePaths.has(file.path))throw Error('Unsafe or duplicate release path');releasePaths.add(file.path);const absolute=path.resolve(source,file.path);if(!absolute.startsWith(path.resolve(source)+path.sep)||hash(fs.readFileSync(absolute))!==file.sha256)throw Error('Release integrity failure: '+file.path);}
 if(fs.existsSync(stateFile)){const state=parseJson(fs.readFileSync(stateFile));if(state.version!==release.version)return upgradeOwned({loc,source,release,state,stateFile,manifestFile,patchFile,link,apply,isOwnLink,removeLink});const current=parseJson(fs.readFileSync(manifestFile));if(current.dependencies?.[name]!=='link:'+state.target.replaceAll('\\','/')||current.dsh?.profile?.bundles?.filter(n=>n===name).length!==1)throw Error('Owned profile entry changed; preserve it before installing');isOwnLink(link,state.target);for(const entry of release.files.filter(e=>e.path.startsWith('packages/skin/'))){const installed=path.join(state.target,entry.path.slice('packages/skin/'.length));if(!fs.existsSync(installed)||hash(fs.readFileSync(installed))!==entry.sha256)throw Error('Installed version files differ; preserve existing files and use a new version or rollback: '+entry.path);}return{status:'already-installed',version:state.version,otherProfileSettingsPreserved:true};}
 const raw=fs.readFileSync(manifestFile),patch=fs.readFileSync(patchFile),pkg=parseJson(raw);
 if(!Array.isArray(pkg.dsh?.profile?.bundles))throw Error('Unsupported DSH profile schema');
 if(fs.existsSync(link)||pkg.dependencies?.[name]||pkg.dsh.profile.bundles.includes(name))throw Error('Existing unowned Si package; no overwrite');
 const patchPlan=enableSkinPatch(patch.toString()),other=patchPlan.switchesOff;
 if(!apply)return{status:'install-plan',version:release.version,profile:loc.profile,switchesOff:[...new Set(other)],data:loc.data};
 const backup=path.join(loc.data,'backups',Date.now().toString()),target=path.join(loc.data,'versions',release.version,'skin');
 fs.mkdirSync(backup,{recursive:true});fs.writeFileSync(path.join(backup,'package.json'),raw);fs.writeFileSync(path.join(backup,'cordis.patch.yml'),patch);
 if(fs.existsSync(target))throw Error('Version directory already exists; preserve it');
 try{
 for(const file of release.files.filter(e=>e.path.startsWith('packages/skin/'))){const out=path.resolve(target,file.path.slice('packages/skin/'.length));if(!out.startsWith(path.resolve(target)+path.sep))throw Error('Unsafe target path');fs.mkdirSync(path.dirname(out),{recursive:true});fs.copyFileSync(path.join(source,file.path),out);if(hash(fs.readFileSync(out))!==file.sha256)throw Error('Copy integrity failure');}
 pkg.dependencies??={};pkg.dependencies[name]='link:'+target.replaceAll('\\','/');pkg.dsh.profile.bundles.push(name);
 const nextManifest=Buffer.from(JSON.stringify(pkg,null,2)+'\n');
 const nextPatch=Buffer.from(patchPlan.patch);
 fs.mkdirSync(path.dirname(link),{recursive:true});fs.symlinkSync(target,link,process.platform==='win32'?'junction':'dir');
 atomicWrite(manifestFile,nextManifest);atomicWrite(patchFile,nextPatch);atomicWrite(stateFile,JSON.stringify({version:release.version,target,backup,afterManifest:hash(nextManifest),afterPatch:hash(nextPatch)}));
 }catch(error){atomicWrite(manifestFile,raw);atomicWrite(patchFile,patch);if(fs.existsSync(link))removeLink(link,target);removeCreatedVersion(target,path.join(loc.data,'versions'),release);throw error;}
 return{status:'installed',version:release.version,backup,nativeAcceptance:'pending user restart and visual acceptance'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{const args=process.argv.slice(2),action=args.shift()||'install';if(!['install','uninstall','rollback'].includes(action))throw Error('Unknown action');const value=key=>{const n=args.indexOf(key);return n<0?undefined:args[n+1];};const home=path.resolve(value('--dsh-home')||process.env.DSH_HOME||path.join(os.homedir(),'.dsh'));const apply=args.includes('--apply');if(apply)assertDshStopped();if(action==='install'&&apply){const report=inspectInstalledHost({desktop:value('--desktop')||path.join(process.env.LOCALAPPDATA||path.join(os.homedir(),'AppData/Local'),'Programs/DeepSeek Harness/DeepSeek Harness.exe'),modules:value('--host-modules')});if(!report.knownVersion)throw Error('This host version has not passed the supported-version gate. Run the isolated probe and update the supported contract before installing.');if(!report.capabilitiesPresent)throw Error('Host is missing required skin APIs: '+report.checks.filter(c=>!c.passed).map(c=>c.name).join(', ')+'. Run tools/check-compat.mjs before updating. No profile files changed.');}
console.log(JSON.stringify(manage(action,locations(home,value('--profile')||'desktop'),{apply}),null,2));}catch(error){console.error(error.message);process.exitCode=2;}
}

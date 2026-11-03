import fs from'node:fs';import path from'node:path';import os from'node:os';import{fileURLToPath}from'node:url';import{createHash}from'node:crypto';import{execFileSync}from'node:child_process';
const project=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),name='dsh-si-rain-jade';
const hash=b=>createHash('sha256').update(b).digest('hex');
export function locations(home,profile='desktop'){if(!/^[\w-]+$/.test(profile))throw Error('Invalid profile');return{home,profile,dir:path.join(home,'profiles',profile),data:path.join(home,'si-rain-jade',profile)};}
export function manage(action,loc,{apply=false,source=project}={}){
 const manifestFile=path.join(loc.dir,'package.json'),patchFile=path.join(loc.dir,'cordis.patch.yml'),stateFile=path.join(loc.data,'state.json'),link=path.join(loc.dir,'node_modules',name);
 if(action==='rollback'||action==='uninstall'){
  if(!fs.existsSync(stateFile))return{status:'not-installed'};
  const state=JSON.parse(fs.readFileSync(stateFile));
  for(const[file,expected]of [[manifestFile,state.afterManifest],[patchFile,state.afterPatch]])if(hash(fs.readFileSync(file))!==expected)throw Error('Profile changed since install; rollback refused to preserve unrelated edits. Backup: '+state.backup);
  if(!fs.lstatSync(link).isSymbolicLink()||fs.realpathSync(link)!==fs.realpathSync(state.target))throw Error('Owned link changed; preserve it.');
  if(!apply)return{status:'rollback-plan',backup:state.backup};
  fs.copyFileSync(path.join(state.backup,'package.json'),manifestFile);fs.copyFileSync(path.join(state.backup,'cordis.patch.yml'),patchFile);fs.unlinkSync(link);fs.renameSync(stateFile,stateFile+'.removed-'+Date.now());return{status:'restored',backup:state.backup,settingsPreserved:true};
 }
 const release=JSON.parse(fs.readFileSync(path.join(source,'release-manifest.json')));
 for(const file of release.files){const absolute=path.resolve(source,file.path);if(!absolute.startsWith(path.resolve(source)+path.sep)||hash(fs.readFileSync(absolute))!==file.sha256)throw Error('Release integrity failure: '+file.path);}
 if(fs.existsSync(stateFile)){const state=JSON.parse(fs.readFileSync(stateFile));if(hash(fs.readFileSync(manifestFile))===state.afterManifest&&hash(fs.readFileSync(patchFile))===state.afterPatch)return{status:'already-installed',version:state.version};throw Error('Existing installation changed; preserve it before upgrading');}
 const raw=fs.readFileSync(manifestFile),patch=fs.readFileSync(patchFile),pkg=JSON.parse(raw);
 if(!Array.isArray(pkg.dsh?.profile?.bundles))throw Error('Unsupported DSH profile schema');
 if(fs.existsSync(link)||pkg.dependencies?.[name]||pkg.dsh.profile.bundles.includes(name))throw Error('Existing unowned Si package; no overwrite');
 const other=[...patch.toString().matchAll(/^\s*-\s*id:\s*(ui-skin-[\w-]+)\s*$/gm)].map(m=>m[1]).filter(id=>id!=='ui-skin-si-rain-jade');
 if(!apply)return{status:'install-plan',version:release.version,profile:loc.profile,switchesOff:[...new Set(other)],data:loc.data};
 const backup=path.join(loc.data,'backups',Date.now().toString()),target=path.join(loc.data,'versions',release.version,'skin');
 fs.mkdirSync(backup,{recursive:true});fs.writeFileSync(path.join(backup,'package.json'),raw);fs.writeFileSync(path.join(backup,'cordis.patch.yml'),patch);
 if(fs.existsSync(target))throw Error('Version directory already exists; preserve it');
 for(const file of release.files.filter(e=>e.path.startsWith('packages/skin/'))){const out=path.join(target,file.path.slice('packages/skin/'.length));fs.mkdirSync(path.dirname(out),{recursive:true});fs.copyFileSync(path.join(source,file.path),out);if(hash(fs.readFileSync(out))!==file.sha256)throw Error('Copy integrity failure');}
 pkg.dependencies??={};pkg.dependencies[name]='link:'+target.replaceAll('\\','/');pkg.dsh.profile.bundles.push(name);
 const nextManifest=Buffer.from(JSON.stringify(pkg,null,2)+'\n');
 const basePatch=patch.toString().replace(/^\s*\[\]\s*$/gm,'');
 const nextPatch=Buffer.from(basePatch+'\n- id: ui-skin-si-rain-jade\n  disabled: false\n'+[...new Set(other)].map(id=>'- id: '+id+'\n  disabled: true\n').join(''));
 fs.mkdirSync(path.dirname(link),{recursive:true});fs.symlinkSync(target,link,process.platform==='win32'?'junction':'dir');
 try{fs.writeFileSync(manifestFile,nextManifest);fs.writeFileSync(patchFile,nextPatch);fs.writeFileSync(stateFile,JSON.stringify({version:release.version,target,backup,afterManifest:hash(nextManifest),afterPatch:hash(nextPatch)}));}
 catch(error){fs.writeFileSync(manifestFile,raw);fs.writeFileSync(patchFile,patch);fs.unlinkSync(link);throw error;}
 return{status:'installed',version:release.version,backup,nativeAcceptance:'pending user restart and visual acceptance'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{const args=process.argv.slice(2),action=args.shift()||'install';if(!['install','uninstall','rollback'].includes(action))throw Error('Unknown action');const value=key=>{const n=args.indexOf(key);return n<0?undefined:args[n+1];};const home=path.resolve(value('--dsh-home')||process.env.DSH_HOME||path.join(os.homedir(),'.dsh'));const apply=args.includes('--apply');if(apply&&process.platform==='win32'){const count=execFileSync('powershell.exe',['-NoProfile','-Command',"@(Get-Process -Name 'DeepSeek Harness' -ErrorAction SilentlyContinue).Count"],{encoding:'utf8',windowsHide:true}).trim();if(Number(count)>0)throw Error('Exit DSH completely (including tray) before install/rollback. No restart is performed automatically.');}console.log(JSON.stringify(manage(action,locations(home,value('--profile')||'desktop'),{apply}),null,2));}catch(error){console.error(error.message);process.exitCode=2;}
}

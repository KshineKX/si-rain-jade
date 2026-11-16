import{collectManifestFiles}from'./manifest-files.mjs';
import{bundleClient}from'./client-bundle.mjs';
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';import {createHash} from 'node:crypto';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),skin=path.join(root,'packages/skin');
const read=f=>fs.readFileSync(path.join(skin,f),'utf8').replace(/^\uFEFF/,'');
const scenes=read('src/scenes.js').replace(/new URL\((["'])(\.\.\/assets\/[^"']+)\1,import\.meta\.url\)\.href/g,(_,q,p)=>'new URL('+JSON.stringify('/si-rain-jade/'+path.basename(p))+',location.origin).href');
if(scenes.includes('import.meta.url'))throw Error('unresolved scene URL');
let loader=read('src/loader.js');loader=loader.replace("const KEY='endfield-ritual:preview:v1'","const KEY='si-rain-jade:native:v1'");
const css=read('src/tokens.css')+'\n'+read('src/materials.css')+'\n'+read('native.css');
const graph=bundleClient('src/plugin-entry.js',id=>id==='src/scenes.js'?scenes:id==='src/loader.js'?loader:read(id));
const client="window.__ModuleLoader__.load({id:'dsh-si-rain-jade',factory:function(require){const exports={};\nconst SI_VERSION="+JSON.stringify(JSON.parse(read('package.json')).version)+";\nconst SI_REACT=require('react'),SI_REACT_DOM=require('react-dom');\nconst SI_CSS="+JSON.stringify(css)+';\n'+graph+'\nreturn exports;}});\n';
new Function(client); // Reject invalid shipped JavaScript before writing any output.
fs.mkdirSync(path.join(skin,'lib'),{recursive:true});fs.writeFileSync(path.join(skin,'lib/client.js'),client);
const media=fs.readdirSync(path.join(skin,'assets')).filter(f=>/\.(png|mp4)$/.test(f));fs.writeFileSync(path.join(skin,'lib/media.json'),JSON.stringify(media));
const files=collectManifestFiles(root,JSON.parse(fs.readFileSync(path.join(root,'build-files.json'),'utf8')));
fs.writeFileSync(path.join(root,'release-manifest.json'),JSON.stringify({version:JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8').replace(/^\uFEFF/,'')).version,files},null,2));console.log(JSON.stringify({files:files.length,media:media.length,clientBytes:client.length}));

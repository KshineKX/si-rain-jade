import {SCENES,resolveScene,describeScene} from './scenes.js';
import {createMotion} from './motion.js';
import {createOpening} from './opening.js';
// Independent visual prototype. Native installation/profile changes are separate.
const ID='endfield-ritual-skin';
const KEY='endfield-ritual:preview:v1';
const ENUMS={opening:['on','off'],tone:['light','dark'],reading:['normal','focus','admire'],palette:["jade","celadon","pine","teal","mist","frost","mono","forest","ink","moss"],material:['native','liquid','frost','jade'],motion:['static','dynamic'],quality:['standard','ultra'],scene:Object.keys(SCENES)};
const DEFAULTS={opening:'on',tone:'dark',reading:'normal',palette:'jade',material:'liquid',motion:'dynamic',quality:'ultra',scene:'lotus',normalFog:0,focusFog:100};
export function sanitize(value={}){const safe={...DEFAULTS};for(const key of Object.keys(ENUMS))if(ENUMS[key].includes(value?.[key]))safe[key]=value[key];for(const key of ['normalFog','focusFog'])if(typeof value?.[key]==='number'&&Number.isFinite(value[key]))safe[key]=Math.round(Math.max(0,Math.min(100,value[key])));return safe}
export function readingFog(percent){const p=Math.max(0,Math.min(100,Number(percent)||0));return p===0?{fill:'transparent',filter:'none'}:p<=50?{fill:'color-mix(in srgb, transparent '+(100-p*2)+'%, var(--paper) '+p*2+'%)',filter:'blur('+(3*p/50)+'px)'}:{fill:'color-mix(in srgb, var(--paper) '+(200-p*2)+'%, var(--paper-focus) '+(p*2-100)+'%)',filter:'blur('+(3+13*(p-50)/50)+'px)'};}
export function mount(root=document.documentElement,{storage=localStorage}={}){
 const current=document.getElementById(ID);if(current)return current.controller;
 const ownAttrs=['data-ritual-tone','data-ritual-reading','data-ritual-palette','data-ritual-material','data-ritual-fog'];
 const before=ownAttrs.map(name=>[name,root.getAttribute(name)]);
 let stored={};try{stored=JSON.parse(storage.getItem(KEY)||'{}')||{}}catch{}
 const query=new URLSearchParams(location.search),settings=sanitize(stored);
 // Old admire meant normal. Gallery is temporary: a fresh mount always restores the conversation.
 if(settings.reading==='admire')settings.reading='normal';
 if(stored.motionSchema!==1)settings.motion='dynamic';if(!(stored.schema>=2))settings.tone='dark';settings.schema=2;
 if(['blue','slate'].includes(stored.palette))settings.palette='mist';
 for(const key of Object.keys(ENUMS))if(ENUMS[key].includes(query.get(key)))settings[key]=query.get(key);
 if(['blue','slate'].includes(query.get('palette')))settings.palette='mist';
 const layer=document.createElement('div');layer.id=ID;layer.setAttribute('aria-hidden','true');
 layer.innerHTML='<img class="ritual-art" alt="" draggable="false"><div class="ritual-edge-glass"></div><div class="ritual-reading-light"></div>';
 const artwork=layer.querySelector('.ritual-art');
 let ticket=0,disposed=false,opening=null;
 const motion=createMotion(layer,()=>({settings,scene:resolveScene(settings.scene),artworkUrl:artwork.src}));
 function syncCaption(tone){const info=describeScene(settings.scene,tone);document.querySelectorAll('[data-scene-title]').forEach(el=>el.textContent=info.title);document.querySelectorAll('[data-scene-description]').forEach(el=>el.textContent='虚构对话 · '+info.description)}
 function commitScene(tone,url){syncCaption(tone);artwork.src=url;layer.style.setProperty('--ritual-scene-image',`url("${url}")`);layer.dataset.sceneTone=tone;delete layer.dataset.scenePending;motion.sync()}
 function syncScene(){
  const revision=++ticket;
  motion.sync();
  if(settings.material==='native'&&settings.reading!=='admire'){syncCaption(settings.tone);artwork.removeAttribute('src');layer.style.removeProperty('--ritual-scene-image');layer.dataset.sceneTone='native';delete layer.dataset.scenePending;return}
  const tone=settings.tone,url=resolveScene(settings.scene).images[tone];
  if(artwork.src===url){syncCaption(tone);delete layer.dataset.scenePending;return}
  if(!artwork.getAttribute('src')){commitScene(tone,url);return}
  layer.dataset.scenePending=tone;const candidate=new Image();candidate.src=url;
  candidate.decode().then(()=>{if(disposed||revision!==ticket)return;commitScene(tone,url)}).catch(()=>{if(revision===ticket){delete layer.dataset.scenePending;console.warn('场景图未能加载，保留当前画面。')}});
 }
 const veil=layer.querySelector('.ritual-reading-light'),flow=document.querySelector('.message-column'),scroll=document.querySelector('[data-conversation-scroll]');
 function syncVeil(){if(!flow||!scroll)return;const box=flow.getBoundingClientRect(),area=scroll.getBoundingClientRect(),bleed=innerWidth<800?24:72;Object.assign(veil.style,{left:`${box.left-bleed}px`,width:`${box.width+bleed*2}px`,top:`${area.top-26}px`,height:`${area.height+95}px`})}
 const observer=new ResizeObserver(syncVeil);if(flow)observer.observe(flow);if(scroll)observer.observe(scroll);
 function update(next={}){
  for(const key of Object.keys(ENUMS))if(ENUMS[key].includes(next[key]))settings[key]=next[key];
  for(const key of ['normalFog','focusFog'])if(typeof next[key]==='number'&&Number.isFinite(next[key]))settings[key]=Math.round(Math.max(0,Math.min(100,next[key])));
  root.dataset.ritualTone=settings.tone;root.dataset.ritualReading=settings.reading;root.dataset.ritualPalette=settings.palette;root.dataset.ritualMaterial=settings.material;

  const percent=settings.reading==='focus'?settings.focusFog:settings.normalFog,fog=readingFog(percent);root.dataset.ritualFog=String(percent);veil.style.background=fog.fill;veil.style.backdropFilter=fog.filter;
  syncScene();try{storage.setItem(KEY,JSON.stringify({...settings,motionSchema:1,schema:2,readingSchema:1,fogSchema:1}))}catch{}
  opening?.sync();document.dispatchEvent(new CustomEvent('ritual:change',{detail:{...settings}}));
 }
 const controller={update,replayOpening(){return opening.play(true)},get opening(){return {available:opening?.available||false,state:opening?.state||'idle',variant:opening?.variant||'',handoff:opening?.handoff||''}},get settings(){return {...settings}},destroy(){disposed=true;ticket++;opening?.destroy();motion.destroy();observer.disconnect();layer.remove();for(const[name,value]of before)value===null?root.removeAttribute(name):root.setAttribute(name,value)}};
 layer.controller=controller;update();document.body.prepend(layer);opening=createOpening(layer,()=>({settings,scene:resolveScene(settings.scene),artworkUrl:artwork.src}),{onActive:()=>motion.sync()});queueMicrotask(()=>{if(!disposed)void opening.play(false)});syncVeil();return controller;
}

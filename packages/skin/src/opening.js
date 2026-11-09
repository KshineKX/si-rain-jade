import {OPENING} from './scenes.js';

export function selectOpeningVariant(settings){return settings.scene==='lotus'&&settings.tone==='light'&&settings.material!=='native'?'full':'neutral';}

// Both streams are owned local assets. Credits live outside object-fit cropping.
export function createOpening(layer,read,{config=OPENING,session=sessionStorage,onActive=()=>{}}={}){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),root=document.documentElement;
 let disposed=false,attempted=false,overlay=null,video=null,target=null,skip=null,active=false,closing=false,focusBefore=null,loadTimer=0,playTimer=0,exitTimer=0,revealTimer=0,token=0,handoffToken=0,state='idle',variant='',handoff='',selectionKey='',stopLoadingInteraction=null;
 const inertBefore=new Map(),seenKey='si-rain-jade:opening:'+config.id;
 const fingerprint=s=>JSON.stringify(['scene','tone','material','reading','palette','motion','quality','normalFog','focusFog'].map(k=>s[k]));
 const spec=()=>{const v=selectOpeningVariant(read().settings);return{variant:v,src:config[v+'Src']||'',poster:config[v+'Poster']||''};};
 const available=()=>Boolean(config.ready&&spec().src&&!reduced.matches);
 function report(next,reason=''){state=next;layer.dataset.openingState=next;layer.dataset.openingReason=reason;layer.dataset.openingVariant=variant;layer.dataset.openingHandoff=handoff;document.dispatchEvent(new CustomEvent('ritual:opening',{detail:{state:next,reason,variant,handoff}}));}
 function seen(){try{return session.getItem(seenKey)==='seen'}catch{return attempted}}
 function markSeen(){try{session.setItem(seenKey,'seen')}catch{}}
 function clearTimers(){clearTimeout(loadTimer);clearTimeout(playTimer);clearTimeout(exitTimer);clearTimeout(revealTimer);}
 function release(){
  token++;handoffToken++;clearTimers();stopLoadingInteraction?.();stopLoadingInteraction=null;
  const previous=overlay;video?.pause();if(video){video.removeAttribute('src');video.load();}overlay?.remove();overlay=null;video=null;target=null;skip=null;closing=false;
  for(const[e,value]of inertBefore)if(e.isConnected)value===null?e.removeAttribute('inert'):e.setAttribute('inert',value);inertBefore.clear();
  if(active){active=false;root.removeAttribute('data-si-opening-active');onActive(false);}
  if(focusBefore?.isConnected&&!focusBefore.closest('[inert]')&&document.hasFocus()&&(!document.activeElement||document.activeElement===document.body||previous?.contains(document.activeElement)))focusBefore.focus({preventScroll:true});focusBefore=null;
 }
 async function prepareTarget(revision){
  if(!target)return;const info=read(),s=info.settings,url=s.material==='native'&&s.reading!=='admire'?'':info.scene?.images?.[s.tone]||info.artworkUrl||'';
  target.hidden=!url;layer.dataset.openingTarget=url?'selected-wallpaper':'native-canvas';if(!url){target.removeAttribute('src');return;}
  target.src=url;try{await Promise.race([target.decode(),new Promise((_,reject)=>setTimeout(()=>reject(Error('target-timeout')),1200))]);}catch{if(revision===handoffToken&&target){target.hidden=true;layer.dataset.openingTarget='canvas-fallback';}}
 }
 async function finish(reason,{immediate=false,neutral=false}={}){
  if(!overlay)return;if(closing&&!immediate&&!neutral)return;
  closing=true;const revision=++handoffToken;clearTimers();stopLoadingInteraction?.();stopLoadingInteraction=null;
  if(!active||immediate||reduced.matches){release();report('finished',reason);return;}
  handoff=neutral||variant==='neutral'||fingerprint(read().settings)!==selectionKey?'neutral':'matched';overlay.dataset.handoff=handoff;video?.pause();report('handoff',reason);
  await prepareTarget(revision);if(!overlay||disposed||revision!==handoffToken)return;
  const fade=Math.max(100,Math.min(1200,Number(config.handoffMs)||650));overlay.style.setProperty('--si-opening-handoff-ms',fade+'ms');
  const leave=()=>{if(!overlay||disposed||revision!==handoffToken)return;overlay.dataset.state='leaving';exitTimer=setTimeout(()=>{release();report('finished',reason);},fade);};
  if(handoff==='neutral'){
   // Destroy the silhouette's readable pose first. The new scene clears from soft mist afterwards.
   overlay.dataset.state='ink-dissolve';revealTimer=setTimeout(leave,Math.max(650,Math.min(1600,Number(config.neutralRevealMs)||950)));
  }else leave();
 }
 function lock(){
  focusBefore=document.activeElement instanceof HTMLElement?document.activeElement:null;
  for(const e of document.body.children)if(e!==overlay&&!['SCRIPT','STYLE','LINK','META','TEMPLATE'].includes(e.tagName)){inertBefore.set(e,e.getAttribute('inert'));e.inert=true;}
  active=true;root.setAttribute('data-si-opening-active','');onActive(true);overlay.dataset.state='playing';skip.focus({preventScroll:true});report('playing');
 }
 async function play(manual=false){
  if(disposed)return{started:false,reason:'disposed'};if(overlay)return{started:false,reason:'already-active'};
  if(!available()){report('unavailable',reduced.matches?'reduced-motion':'media-not-bound');return{started:false,reason:reduced.matches?'reduced-motion':'media-not-bound'};}
  const s=read().settings;if(!manual&&(attempted||seen()||s.opening==='off'))return{started:false,reason:s.opening==='off'?'disabled':'seen'};
  attempted=true;markSeen();const media=spec(),revision=++token;variant=media.variant;handoff='';selectionKey=fingerprint(s);report('loading');
  overlay=document.createElement('section');overlay.id='si-opening-overlay';overlay.dataset.state='loading';overlay.dataset.variant=variant;overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','祀 · 雨荷青玉开屏动画');
  target=document.createElement('img');target.className='si-opening-target';target.alt='';target.hidden=true;target.setAttribute('aria-hidden','true');
  video=document.createElement('video');video.className='si-opening-video';video.muted=true;video.defaultMuted=true;video.playsInline=true;video.preload='auto';video.setAttribute('muted','');video.setAttribute('playsinline','');video.setAttribute('aria-hidden','true');video.tabIndex=-1;if(media.poster)video.poster=media.poster;
  skip=document.createElement('button');skip.type='button';skip.className='si-opening-skip';skip.textContent='跳过';skip.setAttribute('aria-label','跳过开屏动画（Esc）');skip.addEventListener('click',()=>void finish('skip',{immediate:true}));
  const credit=document.createElement('small');credit.className='si-opening-credit';credit.setAttribute('role','note');credit.textContent=(String(config.credit||'开屏参考：见习饼饼 · BV15eJD6DEec｜非商用·保留署名').trim())+(config.sourceUrl?'\n'+config.sourceUrl:'');overlay.append(target,video,skip,credit);document.body.append(overlay);
  const cancelPending=()=>{if(!active&&!manual)void finish('interaction-before-ready',{immediate:true});};document.addEventListener('pointerdown',cancelPending,true);document.addEventListener('keydown',cancelPending,true);stopLoadingInteraction=()=>{document.removeEventListener('pointerdown',cancelPending,true);document.removeEventListener('keydown',cancelPending,true);};
  loadTimer=setTimeout(()=>void finish('load-timeout',{immediate:true}),Math.max(500,Math.min(12000,Number(config.loadTimeoutMs)||7000)));
  video.addEventListener('error',()=>void finish('decode-error',{immediate:true}),{once:true});video.addEventListener('ended',()=>void finish('ended'),{once:true});
  video.addEventListener('loadeddata',async()=>{
   if(disposed||revision!==token||closing||!video)return;
   if(!Number.isFinite(video.duration)||video.duration<.1||video.duration>(Number(config.maxDurationSeconds)||30)){void finish('invalid-duration',{immediate:true});return;}
   clearTimeout(loadTimer);stopLoadingInteraction?.();stopLoadingInteraction=null;playTimer=setTimeout(()=>void finish('autoplay-timeout',{immediate:true}),7000);
   try{await video.play();if(disposed||revision!==token||closing||!overlay)return;clearTimeout(playTimer);lock();playTimer=setTimeout(()=>void finish('playback-timeout',{immediate:true}),Math.min(65000,video.duration*1000+5000));}catch{void finish('autoplay-blocked',{immediate:true});}
  },{once:true});video.src=media.src;video.load();return{started:true,reason:'loading',variant};
 }
 const key=e=>{if(!active)return;if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();void finish('escape',{immediate:true});}else if(e.key==='Tab'){e.preventDefault();e.stopImmediatePropagation();skip?.focus({preventScroll:true});}};
 const reducedChange=()=>{if(reduced.matches)void finish('reduced-motion',{immediate:true});else if(!overlay)report('ready');};
 const visibility=()=>{if(!video||!active||closing)return;if(document.hidden)video.pause();else video.play().catch(()=>void finish('autoplay-blocked',{immediate:true}));};
 document.addEventListener('keydown',key,true);document.addEventListener('visibilitychange',visibility);reduced.addEventListener('change',reducedChange);report(available()?'ready':'unavailable',config.ready?'':'media-not-bound');
 return{play,sync(){if(!overlay)return;const s=read().settings;if(s.opening==='off'){void finish('disabled',{immediate:true});return;}const next=fingerprint(s);if(next!==selectionKey){selectionKey=next;if(closing&&overlay.dataset.state==='leaving'){handoff='neutral';void finish('settings-changed',{immediate:true});}else void finish('settings-changed',{neutral:true});}},get available(){return available()},get state(){return state},get variant(){return variant},get handoff(){return handoff},destroy(){disposed=true;release();document.removeEventListener('keydown',key,true);document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener('change',reducedChange);for(const key of['openingState','openingReason','openingVariant','openingHandoff','openingTarget'])delete layer.dataset[key];}};
}

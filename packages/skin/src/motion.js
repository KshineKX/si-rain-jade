import {MOTION_ULTRA} from './scenes.js';
// A single muted video overlays the matching static artwork only after playback starts.
export function createMotion(layer,read){
 const video=document.createElement('video');video.className='ritual-art ritual-motion';video.muted=true;video.defaultMuted=true;video.loop=true;video.playsInline=true;video.preload='none';video.setAttribute('muted','');video.setAttribute('playsinline','');video.setAttribute('aria-hidden','true');video.tabIndex=-1;
 layer.querySelector('.ritual-art').after(video);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let disposed=false,activeUrl='',failedUrl='';
 function desired(){const {settings,scene,artworkUrl}=read();const url=settings.motion==='dynamic'&&(settings.material!=='native'||settings.reading==='admire')?(settings.quality==='ultra'?(MOTION_ULTRA[scene.id]?.[settings.tone]||scene.motion?.[settings.tone]):scene.motion?.[settings.tone]):null;const eligible=Boolean(url&&artworkUrl===scene.images[settings.tone]&&settings.reading!=='focus'&&!document.hidden&&!reduced.matches);return {url,eligible}}
 function hide(){video.dataset.playing='false';video.pause()}
 async function play(){const want=desired();if(disposed||!want.eligible||want.url!==activeUrl||video.readyState<2)return;try{await video.play();const current=desired();if(!disposed&&current.eligible&&current.url===activeUrl&&video.readyState>=2){video.dataset.playing='true';layer.dataset.motionState='playing'}else hide()}catch{hide();layer.dataset.motionState='static'}}
 function sync(){if(disposed)return;const want=desired();if(!want.url){hide();if(activeUrl){activeUrl='';video.removeAttribute('src');video.load()}layer.dataset.motionState='static';return}if(activeUrl!==want.url){hide();activeUrl=want.url;failedUrl='';video.src=activeUrl;video.preload='auto';video.load()}if(!want.eligible){hide();layer.dataset.motionState='paused';return}if(failedUrl===activeUrl){hide();layer.dataset.motionState='fallback';return}layer.dataset.motionState=video.readyState>=2?'ready':'loading';void play()}
 const loaded=()=>void play(),error=()=>{failedUrl=activeUrl;hide();layer.dataset.motionState='fallback'};
 video.addEventListener('loadeddata',loaded);video.addEventListener('error',error);document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
 return {sync,destroy(){disposed=true;hide();document.removeEventListener('visibilitychange',sync);reduced.removeEventListener('change',sync);video.removeEventListener('loadeddata',loaded);video.removeEventListener('error',error);video.removeAttribute('src');video.load();video.remove()}};
}

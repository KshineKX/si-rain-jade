import {createHostAdapter} from './host-adapter.js';
// Official Slot registration owns the portal and all mounted skin effects.
export const inject=['slots','theme','uiWorkspace','sessions','workspaces'];
export function apply(ctx){
 ctx.inject(inject,ready=>{
 const theme=ready.get('theme');
 if(typeof theme?.overrideTokens!=='function'||typeof theme?.getTheme!=='function'||typeof theme?.setTheme!=='function'||typeof ready.slots?.inject!=='function'||typeof ready.slots?.register!=='function')return;
 return ready.slots.inject('shell.overlay',()=>ready.slots.register({name:'shell.overlay',id:'si-rain-jade.visual',order:10},function SiSkinHost(){
  const host=SI_REACT.useRef(null);
  SI_REACT.useLayoutEffect(()=>{
   const adapter=createHostAdapter();let stop=null;
   const unsubscribe=adapter.subscribe(state=>{
    if(state.compatible){if(!stop)stop=mountNative(ready,{parent:host.current,adapter});}
    else if(stop){stop();stop=null;}
   });
   return()=>{unsubscribe();if(stop)stop();adapter.dispose();};
  },[]);
  return SI_REACT_DOM.createPortal(SI_REACT.createElement('div',{id:'si-plugin-host',ref:host,style:{display:'contents'}}),document.body);
 }));
 });
}

import {inspectHostServices} from './host-contract.js';
import {createPinnedComponent} from './pinned-entry.js';
import {createHostAdapter} from './host-adapter.js';
import {mountNative} from '../native-client.js';
// Official Slot registration owns the portal and all mounted skin effects.
export const inject=['slots','theme','uiWorkspace','sessions','workspaces'];
export function apply(ctx){
 ctx.inject(inject,ready=>{
 if(!inspectHostServices(ready).compatible)return;
 let compatible=false;const listeners=new Set(),compatibility={getSnapshot:()=>compatible,subscribe:fn=>{listeners.add(fn);return()=>listeners.delete(fn)},set(value){if(compatible===value)return;compatible=value;for(const fn of listeners)fn();}};
 ready.slots.inject('sidebar.session.action',()=>ready.slots.register({name:'sidebar.session.action',id:'si-rain-jade.session'},createPinnedComponent(ready,compatibility)));
 return ready.slots.inject('shell.overlay',()=>ready.slots.register({name:'shell.overlay',id:'si-rain-jade.visual',order:10},function SiSkinHost(){
  const host=SI_REACT.useRef(null);
  SI_REACT.useLayoutEffect(()=>{
   const adapter=createHostAdapter();let stop=null;
   const unsubscribe=adapter.subscribe(state=>{
    compatibility.set(state.compatible);
    if(state.compatible){if(!stop)stop=mountNative(ready,{parent:host.current,adapter});}
    else if(stop){stop();stop=null;}
   });
   return()=>{compatibility.set(false);unsubscribe();if(stop)stop();adapter.dispose();};
  },[]);
  return SI_REACT_DOM.createPortal(SI_REACT.createElement('div',{id:'si-plugin-host',ref:host,style:{display:'contents'}}),document.body);
 }));
 });
}

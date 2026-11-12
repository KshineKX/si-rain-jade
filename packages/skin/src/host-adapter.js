// DSH DOM compatibility is confined here. Slots/theme services own registration.
const SI_OWN='#si-plugin-host,#si-native-dock,#si-native-panel,#endfield-ritual-skin,#si-opening-overlay,#si-pinned-entry';
export function createHostAdapter(doc=document){
 const rendered=e=>e?(getComputedStyle(e).display==='contents'?e.firstElementChild:e):null;
 const listeners=new Set(),pending=new Set();let frame=0,disposed=false,structural=true,snapshot=null;
 const stats={structuralScans:0,incrementalScans:0,ignoredMessageMutations:0,notifications:0};
 function read(){
  stats.structuralScans++;
  const slot=name=>doc.querySelector('[data-slot="'+name+'"]');
  const root=slot('root'),main=slot('main'),sidebarSlot=slot('sidebar'),sidebar=rendered(sidebarSlot),conversation=rendered(slot('main.conversation'));
  const scroll=conversation?.querySelector('[data-conversation-scroll]'),content=conversation?.querySelector('[data-conversation-content]');
  const compatible=Boolean(root&&main&&root.contains(main)&&sidebar&&(!conversation||scroll&&content));
  return{compatible,root:rendered(root),rootParent:root?.parentElement,main:main?.parentElement,sidebar,sidebarColumn:sidebarSlot?.parentElement,conversation,header:rendered(slot('conversation.header')),scroll,content,flow:scroll?.querySelector('[data-chat-flow],.message-column'),workspace:sidebar?.querySelector('[data-slot="sidebar.workspaces"]'),composers:conversation?[...conversation.querySelectorAll('[data-composer-card]')]:[],seats:conversation?[...conversation.querySelectorAll('[data-composer-seat]')]:[]};
 }
 function bubbleNodes(node){
  const found=[];if(node?.nodeType!==1)return found;
  // Only the bubble fallback needs a module suffix on the supported host.
  const match=e=>e.hasAttribute('data-message-bubble')||[...e.classList].some(c=>c.endsWith('_bubble'));
  if(match(node))found.push(node);
  for(const e of node.querySelectorAll('[data-message-bubble],[class$="_bubble"]'))if(match(e))found.push(e);
  return found;
 }
 function flush(){frame=0;if(disposed)return;const bubbles=[];
  if(structural){snapshot=read();if(snapshot.conversation)bubbles.push(...bubbleNodes(snapshot.conversation));}
  else for(const e of pending){stats.incrementalScans++;bubbles.push(...bubbleNodes(e));}
  pending.clear();structural=false;stats.notifications++;
  for(const fn of listeners)fn(snapshot,{bubbles:[...new Set(bubbles)]});
 }
 function schedule(){if(!disposed&&!frame)frame=requestAnimationFrame(flush);}
 const observer=new MutationObserver(records=>{
  for(const r of records){const target=r.target.nodeType===1?r.target:r.target.parentElement;
   if(target?.closest(SI_OWN))continue;
   if(r.type==='attributes'){structural=true;continue;}
   const insideMessage=target?.closest('[data-chat-flow]'),insideComposer=target?.closest('[data-composer-card]');
   if(insideMessage||insideComposer){let changed=false;for(const e of r.addedNodes)if(e.nodeType===1&&bubbleNodes(e).length){pending.add(e);changed=true;}if(!changed)stats.ignoredMessageMutations++;continue;}
   // Ignore text-only streaming updates and inspect only actual structural nodes.
   if([...r.addedNodes,...r.removedNodes].some(e=>e.nodeType===1&&!e.matches?.(SI_OWN)))structural=true;
  }
  if(structural||pending.size)schedule();
 });
 observer.observe(doc.body,{childList:true,subtree:true,attributes:true,attributeFilter:['data-content-phase','data-global-panel','data-sidebar-collapsed']});
 snapshot=read();structural=false;
 return{get snapshot(){return snapshot},get stats(){return {...stats}},subscribe(fn){listeners.add(fn);fn(snapshot,{bubbles:snapshot.conversation?bubbleNodes(snapshot.conversation):[]});return()=>listeners.delete(fn)},refresh(){structural=true;schedule()},dispose(){disposed=true;observer.disconnect();if(frame)cancelAnimationFrame(frame);listeners.clear();pending.clear()}};
}

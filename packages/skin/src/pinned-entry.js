// Grounded in official DSH rc.5 UiWorkspaceService.openSession(), not a guessed route.
export const SI_PINNED_ENTRY_CSS = `
.si-session-actions{display:flex;flex-direction:column;align-items:stretch;gap:6px;min-width:0;width:100%;flex:1}.si-session-actions>[data-slot]{display:contents}.si-session-actions>button{min-height:38px}#si-pinned-entry{box-sizing:border-box;display:flex;align-items:center;gap:10px;flex:none;width:calc(100% - 4px);min-height:48px;margin:0 2px 10px;padding:7px 10px;border:1px solid var(--line);border-radius:13px;background:var(--surface-fill,var(--surface-deep));color:var(--ink);box-shadow:var(--surface-shadow);backdrop-filter:var(--surface-filter);cursor:pointer;font:inherit;text-align:left;-webkit-app-region:no-drag}
#si-pinned-entry:hover,#si-pinned-entry[aria-pressed="true"]{background:var(--active-fill)}
#si-pinned-entry:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
#si-pinned-entry:disabled{opacity:.65;cursor:default}
#si-pinned-entry .si-pin-portrait{display:grid;place-items:center;flex:none;width:32px;height:34px;overflow:hidden;color:var(--accent);font-size:17px}
#si-pinned-entry img{width:100%;height:100%;object-fit:contain}
#si-pinned-entry .si-pin-copy{min-width:0;display:flex;flex-direction:column;gap:1px}
#si-pinned-entry .si-pin-title{font-size:13px;line-height:19px;font-weight:500}
#si-pinned-entry .si-pin-subtitle{font-size:11px;line-height:16px;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#si-pinned-entry[data-collapsed="true"]{width:36px;min-height:36px;padding:2px;margin:0 0 12px}
#si-pinned-entry[data-collapsed="true"] .si-pin-copy{display:none}

.si-session-actions[data-wide="false"]{width:36px;flex:none;gap:4px}.si-session-actions[data-wide="false"] #si-pinned-entry{margin:0;width:36px;min-height:36px}
html[data-si-native][data-windows-titlebar]:has(.si-session-actions[data-wide="false"]){--dsh-windows-menu-start:120px}
[data-windows-titlebar] .si-session-actions[data-wide="false"]{flex-direction:row;align-items:center;width:max-content;gap:4px;animation:none!important}
[data-windows-titlebar] .si-session-actions[data-wide="false"] #si-pinned-entry{width:28px;min-height:28px;height:28px;padding:0;position:fixed;left:80px;top:calc((var(--dsh-windows-titlebar-height,48px) - 28px)/2);z-index:31}
`;

const compact=s=>String(s||'').replace(/\s+/g,'').replace(/·|・|•/g,'·');

// Reads metadata only. Ambiguity never creates, archives, moves, or selects a random chat.
export function resolveSiPinnedTarget(sessionSnapshot,workspaceSnapshot,options={}){
 const byId=sessionSnapshot?.byId||{},items=workspaceSnapshot?.items||[],archived=new Set(workspaceSnapshot?.archivedSessionIds||[]);
 const known=options.sessionId||'';
 if(known){if(byId[known]&&!archived.has(known))return{id:known,reason:'existing-id'};return{id:null,reason:'explicit-target-unavailable'};}
 const expected=compact(options.sessionTitle||'祀 · 管理员的画境会话');
 const exact=Object.values(byId).filter(s=>s&&compact(s.title??s.displayTitle)===expected&&!archived.has(s.id));
 if(exact.length===1)return{id:exact[0].id,reason:'unique-title'};
 if(exact.length>1)return{id:null,reason:'ambiguous-title'};
 const workspaces=items.filter(w=>compact(w.title)===compact(options.workspaceTitle||'祀 · 画境'));
 if(workspaces.length!==1)return{id:null,reason:workspaces.length?'ambiguous-workspace':'not-found'};
 if(!Array.isArray(workspaces[0].sessionIds))return{id:null,reason:'members-unavailable'};
 const candidates=workspaces[0].sessionIds.filter(id=>byId[id]&&!byId[id].blank&&!archived.has(id));
 return candidates.length===1?{id:candidates[0],reason:'unique-workspace-member'}:{id:null,reason:candidates.length?'ambiguous-members':'not-found'};
}

// Official sidebar HOC/foot slots own this component. No DOM reparenting or observer.
export function createPinnedComponent(ctx,compatibility){
 const sessions=ctx.get('sessions'),workspaces=ctx.get('workspaces'),ui=ctx.get('uiWorkspace');
 const useStore=store=>SI_REACT.useSyncExternalStore(listener=>store.subscribe(listener),()=>store.getSnapshot(),()=>store.getSnapshot());
 return function SiPinnedSlot(props){
  const compatible=SI_REACT.useSyncExternalStore(compatibility.subscribe,compatibility.getSnapshot,compatibility.getSnapshot);
  const ss=useStore(sessions.list),ws=useStore(workspaces.list);
  const wide=props.wide!==false,show=compatible,target=resolveSiPinnedTarget(ss,ws);
  const [error,setError]=SI_REACT.useState(false);
  const pin=show?SI_REACT.createElement('button',{id:'si-pinned-entry',type:'button','data-collapsed':String(!wide),disabled:!target.id,'aria-label':'祀 · 画境，专属会话','aria-pressed':String(Boolean(target.id&&Object.values(ss.byId||{}).some(session=>session.id===target.id&&(session.retainedBy?.mainView||0)>0))),title:target.id?'打开已有的祀专属会话':'未找到唯一的既有祀会话，未创建新聊天',onClick:e=>{e.preventDefault();e.stopPropagation();if(!target.id)return;try{ui.openSession(target.id);setError(false)}catch{setError(true)}}},SI_REACT.createElement('span',{className:'si-pin-portrait'},'祀'),SI_REACT.createElement('span',{className:'si-pin-copy'},SI_REACT.createElement('span',{className:'si-pin-title'},'祀 · 画境'),SI_REACT.createElement('span',{className:'si-pin-subtitle'},error?'暂时未能打开':target.id?'专属会话':target.reason.startsWith('ambiguous')?'请确认祀会话':'祀会话尚未就绪'))):null;
  const style=show?SI_REACT.createElement('style',{id:'si-pinned-entry-style'},SI_PINNED_ENTRY_CSS):null;
  if(!show)return props.children;
  return SI_REACT.createElement('div',{className:'si-session-actions','data-wide':String(wide)},style,props.children,pin);
 };
}

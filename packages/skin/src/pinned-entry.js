// Grounded in official DSH rc.5 UiWorkspaceService.openSession(), not a guessed route.
export const SI_PINNED_ENTRY_CSS = `
#si-pinned-entry{box-sizing:border-box;display:flex;align-items:center;gap:10px;flex:none;width:calc(100% - 4px);min-height:48px;margin:0 2px 10px;padding:7px 10px;border:1px solid var(--line);border-radius:13px;background:var(--surface-fill,var(--surface-deep));color:var(--ink);box-shadow:var(--surface-shadow);backdrop-filter:var(--surface-filter);cursor:pointer;font:inherit;text-align:left;-webkit-app-region:no-drag}
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
`;

const compact=s=>String(s||'').replace(/\s+/g,'').replace(/·|・|•/g,'·');

// Reads metadata only. Ambiguity never creates, archives, moves, or selects a random chat.
export function resolveSiPinnedTarget(sessionSnapshot,workspaceSnapshot,options={}){
 const byId=sessionSnapshot?.byId||{},items=workspaceSnapshot?.items||[],archived=new Set(workspaceSnapshot?.archivedSessionIds||[]);
 const known=options.sessionId||'';
 if(known){if(byId[known]&&!archived.has(known))return{id:known,reason:'existing-id'};return{id:null,reason:'explicit-target-unavailable'};}
 const expected=compact(options.sessionTitle||'祀 · 管理员的画境会话');
 const exact=Object.values(byId).filter(s=>s&&compact(s.title)===expected&&!archived.has(s.id));
 if(exact.length===1)return{id:exact[0].id,reason:'unique-title'};
 if(exact.length>1)return{id:null,reason:'ambiguous-title'};
 const workspaces=items.filter(w=>compact(w.title)===compact(options.workspaceTitle||'祀 · 画境'));
 if(workspaces.length!==1)return{id:null,reason:workspaces.length?'ambiguous-workspace':'not-found'};
 if(!Array.isArray(workspaces[0].sessionIds))return{id:null,reason:'members-unavailable'};
 const candidates=workspaces[0].sessionIds.filter(id=>byId[id]&&!byId[id].blank&&!archived.has(id));
 return candidates.length===1?{id:candidates[0],reason:'unique-workspace-member'}:{id:null,reason:candidates.length?'ambiguous-members':'not-found'};
}

export function mountSiPinnedEntry(ctx,options={}){
 if(document.getElementById('si-pinned-entry'))return()=>{};
 const ui=ctx.get('uiWorkspace'),sessions=ctx.get('sessions'),workspaces=ctx.get('workspaces');
 const entry=document.createElement('button');entry.type='button';entry.id='si-pinned-entry';entry.setAttribute('aria-label','祀 · 画境，专属会话');
 const portrait=document.createElement('span');portrait.className='si-pin-portrait';portrait.textContent='祀';entry.append(portrait);
 if(options.imageUrl){const img=document.createElement('img');img.alt='';img.src=options.imageUrl;img.addEventListener('error',()=>{img.remove();portrait.textContent='祀';},{once:true});portrait.textContent='';portrait.append(img);}
 const copy=document.createElement('span');copy.className='si-pin-copy';const title=document.createElement('span');title.className='si-pin-title';title.textContent='祀 · 画境';const subtitle=document.createElement('span');subtitle.className='si-pin-subtitle';subtitle.textContent='专属会话';copy.append(title,subtitle);entry.append(copy);
 const style=document.createElement('style');style.id='si-pinned-entry-style';style.textContent=options.cssText||SI_PINNED_ENTRY_CSS;document.head.append(style);
 let frame=0,disposed=false,observedSidebar=null;
 const resolve=()=>resolveSiPinnedTarget(sessions.list.getSnapshot(),workspaces.list.getSnapshot(),options);
 const schedule=()=>{if(!disposed&&!frame)frame=requestAnimationFrame(()=>{frame=0;refresh();});};
 const resize=new ResizeObserver(schedule);
 function refresh(){
  const slot=document.querySelector('[data-slot="sidebar"]'),sidebar=slot?.firstElementChild;
  // _newSession is the current official module suffix; brand carries the same aria-label.
  let region=sidebar?.querySelector('[data-slot="sidebar.workspaces"]');
  if(region){while(region.parentElement&&region.parentElement!==sidebar)region=region.parentElement;if(region.parentElement===sidebar&&entry.nextElementSibling!==region)sidebar.insertBefore(entry,region);}
  if(sidebar&&sidebar!==observedSidebar){resize.disconnect();resize.observe(sidebar);observedSidebar=sidebar;}
  entry.dataset.collapsed=String(Boolean(sidebar&&sidebar.getBoundingClientRect().width<120));
  const target=resolve();entry.disabled=!target.id;entry.dataset.siTarget=target.id||'';
  subtitle.textContent=target.id?'专属会话':target.reason.startsWith('ambiguous')?'请确认祀会话':'祀会话尚未就绪';
  entry.title=target.id?'打开已有的祀专属会话':'未找到唯一的既有祀会话，未创建新聊天';
  entry.setAttribute('aria-pressed',String(Boolean(target.id&&ui.selection?.getSnapshot?.().sessionId===target.id)));
 }
 entry.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();const target=resolve();if(!target.id){refresh();return;}try{ui.openSession(target.id);refresh();}catch(error){subtitle.textContent='暂时未能打开';options.onError?.(error);}});
 const stops=[sessions.list.subscribe(schedule),workspaces.list.subscribe(schedule)];if(ui.selection?.subscribe)stops.push(ui.selection.subscribe(schedule));
 const observer=new MutationObserver(records=>{if(records.every(r=>r.target.closest?.('#si-pinned-entry')))return;schedule();});observer.observe(document.body,{childList:true,subtree:true});refresh();
 return()=>{disposed=true;if(frame)cancelAnimationFrame(frame);observer.disconnect();resize.disconnect();for(const stop of stops)stop();entry.remove();style.remove();};
}

// Context injection waits for the official navigation service instead of assuming load order.
export function installSiPinnedEntry(ctx,options={}){
 return ctx.inject(['uiWorkspace','sessions','workspaces'],ready=>{ready.effect(()=>mountSiPinnedEntry(ready,options),'si-rain-jade:pinned-existing-session');});
}

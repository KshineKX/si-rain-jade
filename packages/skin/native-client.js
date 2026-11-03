export function mountNative(){
 if(document.getElementById('si-native-dock'))return()=>{};
 if(document.querySelector('[data-herta-atelier]')){console.warn('祀：请先在皮肤管理中切换皮肤，当前皮肤不叠加加载。');return()=>{};}
 const style=document.createElement('style');style.id='si-native-style';style.textContent=SI_CSS;document.head.append(style);
 const controller=mount(document.documentElement);
 const tagged=new Map();let frame=0;
 function tagNative(){for(const region of document.querySelectorAll('[data-conversation-region],[data-conversation-scroll],[data-slot="sidebar"]')){for(let element=region;element&&element!==document.body;element=element.parentElement){if(!tagged.has(element)){tagged.set(element,element.getAttribute('data-si-native-surface'));element.setAttribute('data-si-native-surface','1');}}}}
 tagNative();const observer=new MutationObserver(records=>{if(records.every(r=>r.target.closest?.('#si-native-dock,#endfield-ritual-skin')))return;if(!frame)frame=requestAnimationFrame(()=>{frame=0;tagNative();});});observer.observe(document.body,{childList:true,subtree:true});
 const dock=document.createElement('div');dock.id='si-native-dock';dock.setAttribute('aria-label','祀皮肤设置');
 dock.innerHTML='<button type="button" aria-expanded="false">祀 · 外观</button><section hidden><strong>祀 · 雨荷青玉 · 原生测试</strong><p>普通聊天使用DSH原生界面。专属角色会话未启用。</p></section>';
 const panel=dock.querySelector('section'),toggle=dock.querySelector('button');toggle.onclick=()=>{panel.hidden=!panel.hidden;toggle.setAttribute('aria-expanded',String(!panel.hidden));};
 const groups=[['场景','scene',Object.keys(SCENES)],['昼夜','tone',['light','dark']],['阅读','reading',['admire','focus']],['材质','material',['native','liquid','frost','jade']],['配色','palette',['mono','jade','celadon','mist','frost','pine','teal']],['动态','motion',['static','dynamic']],['画质','quality',['standard','ultra']]];
 const labels={light:'浅色',dark:'深色',admire:'欣赏',focus:'专注',native:'原生',liquid:'流光',frost:'磨砂',jade:'青玉',mono:'黑白',celadon:'青瓷',mist:'冷雾',pine:'松绿',teal:'碧水',static:'静态',dynamic:'动态',standard:'标准',ultra:'极清'};
 const buttons=[];
 for(const[title,key,values]of groups){const group=document.createElement('details');const heading=document.createElement('summary');heading.textContent=title;group.append(heading);for(const value of values){const b=document.createElement('button');b.type='button';b.textContent=key==='scene'?SCENES[value].title:(labels[value]||value);b.onclick=()=>controller.update({[key]:value});group.append(b);buttons.push({b,key,value});}panel.append(group);}
 function sync(){for(const{b,key,value}of buttons)b.setAttribute('aria-pressed',String(controller.settings[key]===value));}
 document.addEventListener('ritual:change',sync);sync();document.body.append(dock);
 return()=>{observer.disconnect();if(frame)cancelAnimationFrame(frame);for(const[element,value]of tagged)if(element.getAttribute('data-si-native-surface')==='1'){if(value===null)element.removeAttribute('data-si-native-surface');else element.setAttribute('data-si-native-surface',value);}document.removeEventListener('ritual:change',sync);dock.remove();controller.destroy();style.remove();};
}
export function apply(ctx){ctx.effect(()=>mountNative(),'si-rain-jade:native');}

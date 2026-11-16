// One compatibility contract is shared by runtime detection and the upgrade preflight.
export const HOST_CONTRACT=Object.freeze({
 schema:1,
 verifiedHosts:['0.2.2-rc.3'],
 services:{slots:['register','inject','entries'],theme:['getTheme','overrideTokens'],uiWorkspace:['openSession']},
 slots:['shell.overlay','sidebar.session.action'],
 selectors:{root:'[data-slot="root"]',main:'[data-slot="main"]',sidebar:'[data-slot="sidebar"]',conversation:'[data-slot="main.conversation"]',header:'[data-slot="conversation.header"]',scroll:'[data-conversation-scroll]',content:'[data-conversation-content]',flow:'[data-chat-flow]',composer:'[data-composer-card]',seat:'[data-composer-seat]'},decorations:{newSession:'button[class$="_newSession"]',sidebarFades:'[class$="_scrollFade"],[class$="_fade"]',messageBubbles:'[data-message-bubble],[class$="_bubble"]'}
});
export function inspectHostServices(ctx){
 const missing=[];
 for(const[name,methods]of Object.entries(HOST_CONTRACT.services)){const service=ctx.get(name);for(const method of methods)if(typeof service?.[method]!=='function')missing.push(name+'.'+method);}
 for(const name of ['sessions','workspaces']){const list=ctx.get(name)?.list;for(const method of ['subscribe','getSnapshot'])if(typeof list?.[method]!=='function')missing.push(name+'.list.'+method);}
 return{compatible:missing.length===0,missing};
}

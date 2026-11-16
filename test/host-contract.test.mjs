import test from'node:test';import assert from'node:assert/strict';
import{HOST_CONTRACT,inspectHostServices}from'../packages/skin/src/host-contract.js';
import{checkClientContract}from'../tools/check-compat.mjs';
import{siPanelBounds}from'../packages/skin/src/geometry.js';
test('host service diagnostics identify unavailable APIs without mounting effects',()=>{
 const report=inspectHostServices({get:()=>null});assert.equal(report.compatible,false);assert(report.missing.includes('theme.overrideTokens'));assert(report.missing.includes('sessions.list.subscribe'));
});
test('preflight tolerates formatting changes and distinguishes static presence from runtime acceptance',()=>{
 const clients={'ui-theme':'getTheme(){} setTheme(id){} overrideTokens(source,tokens){}','ui-layout':'shell.overlay root main sidebar slots.entries()','ui-sidebar':'`sidebar.session.action`;`sidebar.footer.action`','ui-conversation':'main.conversation conversation.header data-conversation-scroll data-conversation-content data-composer-card data-composer-seat','ui-chat':'data-chat-flow','ui-workspace':'openSession(id){}'};
 const result=checkClientContract({version:'9.0.0',clients});assert.equal(result.capabilitiesPresent,true);assert.equal(result.knownVersion,false);assert.equal(result.runtimeAcceptance,false);clients['ui-sidebar']='removed';const broken=checkClientContract({version:HOST_CONTRACT.verifiedHosts[0],clients});assert.equal(broken.capabilitiesPresent,false);assert(broken.checks.some(c=>!c.passed&&c.name==='slot.sidebar.session.action'));
});
test('panel placement remains inside a panned viewport and flips above a low anchor',()=>{
 const v={left:100,top:50,right:900,bottom:650},r=siPanelBounds({right:880,top:600,bottom:630},{width:340,height:300},v);assert(r.left>=v.left+12);assert(r.left+340<=v.right-12);assert(r.top<600);assert(r.top>=v.top+12);assert(r.maxHeight>0);
});

test('message bubble decoration is checked in the chat bundle and accepts the semantic marker',()=>{const result=checkClientContract({version:HOST_CONTRACT.verifiedHosts[0],clients:{'ui-chat':'data-message-bubble'}});assert(!result.warnings.some(w=>w.includes('messageBubbles')));});

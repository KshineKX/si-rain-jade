import test from 'node:test';
import assert from 'node:assert/strict';
import {createThemeBridge} from '../packages/skin/src/theme-bridge.js';

function fixture(){
 const listeners=new Set(),layers=new Map([['another-plugin',{other:true}]]);let preference='system';
 const snapshot=()=>({preference,active:{colorScheme:preference==='dark'?'dark':'light'}});
 const emit=()=>{for(const listener of listeners)listener(snapshot())};
 const theme={getTheme:snapshot,setTheme(value){preference=value;emit()},overrideTokens(id,tokens){for(const value of Object.values(tokens)){assert.equal(typeof value.light,'string');assert.equal(typeof value.dark,'string');}layers.set(id,tokens);emit();return()=>{layers.delete(id);emit()}}};
 const ctx={get:()=>theme,on(name,fn){assert.equal(name,'theme/change');listeners.add(fn);return()=>listeners.delete(fn)}};
 const settings={tone:'dark'},external=[];const bridge=createThemeBridge(ctx,()=>settings,tone=>{external.push(tone);settings.tone=tone});
 return{theme,bridge,layers,listeners,settings,external};
}

test('removing an owned theme layer restores the prior native preference and preserves other plugins',()=>{
 const f=fixture();f.bridge.sync();assert.equal(f.theme.getTheme().preference,'dark');f.bridge.dispose();assert.equal(f.theme.getTheme().preference,'system');assert(f.layers.has('another-plugin'));assert(!f.layers.has('dsh-si-rain-jade'));assert.equal(f.listeners.size,0);f.bridge.dispose();
});

test('native appearance changes propagate without overwriting a later user choice on removal',()=>{
 const f=fixture();f.bridge.sync();f.theme.setTheme('light');assert.deepEqual(f.external,['light']);f.bridge.sync();f.bridge.dispose();assert.equal(f.theme.getTheme().preference,'light');
});

test('missing theme capability leaves the native service untouched',()=>{
 let touched=false;assert.equal(createThemeBridge({get:()=>({setTheme(){touched=true}})},()=>({tone:'dark'}),()=>{}),null);assert.equal(touched,false);
});

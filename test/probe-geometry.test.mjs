import test from'node:test';import assert from'node:assert/strict';import{validReadingGeometry}from'../tools/probe-geometry.mjs';
test('1920 shrink rejects stale 2560 veil even when it covers text; accepts current clipped geometry',()=>{
 const sample={flow:{left:546.5,right:1646.5,top:92,bottom:554},veil:{left:360.5,right:2472.5,top:76,bottom:1440},scroll:{left:280,right:1918,top:76,bottom:1080},viewport:{left:0,right:1920,top:0,bottom:1080},featherLeft:48,featherRight:48};
 assert.equal(validReadingGeometry(sample),false);
 sample.veil={left:490.5,right:1702.5,top:76,bottom:1080};assert.equal(validReadingGeometry(sample),true);
 sample.veil.bottom=1100;assert.equal(validReadingGeometry(sample),false);
});

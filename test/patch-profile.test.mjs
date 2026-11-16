import test from'node:test';import assert from'node:assert/strict';import{enableSkinPatch}from'../tools/patch-profile.mjs';
test('skin patch edits one existing record and preserves nested configuration',()=>{
 const original='- id: ui-skin-other\n  name: "@sample/skin"\n  disabled: false\n  config:\n    list:\n      - id: nested\n        disabled: false\n    color: jade\n- id: other-plugin\n  disabled: false\n';
 const result=enableSkinPatch(original);assert.equal(result.patch.split('- id: ui-skin-other').length,2);assert(result.patch.includes('  name: "@sample/skin"\n  disabled: true\n  config:'));assert(result.patch.includes('      - id: nested\n        disabled: false'));assert(result.patch.includes('- id: other-plugin\n  disabled: false'));assert.deepEqual(result.switchesOff,['ui-skin-other']);assert.equal(enableSkinPatch(result.patch).patch,result.patch);
});
test('patch supports direct id after name and refuses duplicate top-level ids',()=>{
 const result=enableSkinPatch('- name: "@sample/skin"\n  id: ui-skin-other\n  config: {}\n');assert(result.patch.includes('  config: {}\n  disabled: true'));
 assert.throws(()=>enableSkinPatch('- id: ui-skin-other\n- id: ui-skin-other\n'),/Duplicate patch id/);assert.throws(()=>enableSkinPatch('{id: example}'),/Unsupported/);
});

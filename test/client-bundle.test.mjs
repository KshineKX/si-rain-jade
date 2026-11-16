import test from'node:test';import assert from'node:assert/strict';import{bundleClient}from'../tools/client-bundle.mjs';
test('client graph resolves explicit imports and isolates repeated module-local names',()=>{
 const sources={'main.js':"import{value as a}from'./a.js';\nimport{value as b}from'./b.js';\nexport const sum=a+b;",'a.js':'const local=3;\nexport const value=local;','b.js':'const local=5;\nexport const value=local;'};
 const result=Function('const exports={};\n'+bundleClient('main.js',id=>sources[id])+'\nreturn exports;')();assert.equal(result.sum,8);
});
test('client graph rejects cycles and unsupported imports',()=>{
 assert.throws(()=>bundleClient('a.js',()=>"import{x}from'./a.js';\nexport const y=1;"),/Circular/);
 assert.throws(()=>bundleClient('a.js',()=>"import x from 'other';\nexport const y=1;"),/Unsupported/);
});

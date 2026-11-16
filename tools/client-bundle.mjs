import path from 'node:path';
// Small, explicit module graph for this dependency-free browser client. Unknown
// module syntax fails the build instead of silently relying on concatenation order.
export function bundleClient(entry,read){
 const modules=[],visiting=new Set(),done=new Set();
 function visit(id){
  if(done.has(id))return;if(visiting.has(id))throw Error('Circular client module: '+id);visiting.add(id);
  let source=read(id);const imports=[];
  source=source.replace(/^import\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"];?\r?\n/gm,(_,names,spec)=>{
   if(!spec.startsWith('.'))throw Error('External client import is unsupported: '+spec);
   const dependency=path.posix.normalize(path.posix.join(path.posix.dirname(id),spec));
   if(dependency.startsWith('../'))throw Error('Client import escapes source: '+spec);
   const bindings=names.split(',').map(s=>s.trim());if(bindings.some(s=>!/^\w+(?:\s+as\s+\w+)?$/.test(s)))throw Error('Unsupported import binding');
   imports.push({dependency,bindings:bindings.map(s=>s.replace(/\s+as\s+/,':')).join(',')});return '';
  });
  if(/^import\b/m.test(source))throw Error('Unsupported client import in '+id);
  const exports=[];source=source.replace(/^export\s+(?=(?:function|const|let|class)\s+(\w+))/gm,(_,name)=>{exports.push(name);return '';});
  if(/^export\b/m.test(source))throw Error('Unsupported client export in '+id);
  for(const item of imports)visit(item.dependency);
  modules.push('__siModules['+JSON.stringify(id)+']=(()=>{\n'+imports.map(i=>'const{'+i.bindings+'}=__siModules['+JSON.stringify(i.dependency)+'];').join('\n')+'\n'+source+'\nreturn{'+exports.join(',')+'};\n})();');
  visiting.delete(id);done.add(id);
 }
 visit(entry);return 'const __siModules=Object.create(null);\n'+modules.join('\n')+'\nObject.assign(exports,__siModules['+JSON.stringify(entry)+']);';
}

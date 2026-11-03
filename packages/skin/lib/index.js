import fs from 'node:fs';import path from 'node:path';import{fileURLToPath}from'node:url';
const folder=fileURLToPath(new URL('../assets/',import.meta.url));
export const name='ui-skin-si-rain-jade';
export function serve(file,req,res){
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
 const stat=fs.statSync(file);let start=0,end=stat.size-1,status=200;
 const headers={'Content-Type':file.endsWith('.mp4')?'video/mp4':'image/png','Accept-Ranges':'bytes','Cache-Control':'private,max-age=3600','X-Content-Type-Options':'nosniff'};
 if(req.headers.range){const m=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);if(!m||(!m[1]&&!m[2])){res.writeHead(416,{'Content-Range':'bytes */'+stat.size});res.end();return;}if(!m[1])start=Math.max(0,stat.size-Number(m[2]));else{start=Number(m[1]);if(m[2])end=Math.min(end,Number(m[2]));}if(!Number.isSafeInteger(start)||start>end||start>=stat.size){res.writeHead(416,{'Content-Range':'bytes */'+stat.size});res.end();return;}status=206;headers['Content-Range']=`bytes ${start}-${end}/${stat.size}`;}
 headers['Content-Length']=String(end-start+1);res.writeHead(status,headers);if(req.method==='HEAD'){res.end();return;}const stream=fs.createReadStream(file,{start,end});stream.on('error',()=>res.destroy());res.on('close',()=>stream.destroy());stream.pipe(res);
}
export function apply(root){const files=JSON.parse(fs.readFileSync(new URL('./media.json',import.meta.url)));root.inject(['webServer'],ctx=>{for(const file of files)ctx.effect(()=>ctx.webServer.register({kind:'exact',path:'/si-rain-jade/'+file,handler:(req,res)=>serve(path.join(folder,file),req,res)}),'si:'+file);});}

import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve('dist');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.xml':'application/xml','.txt':'text/plain'};
const port=Number(process.env.PORT||4295);
createServer(async(req,res)=>{
 try {
  const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  let file=resolve(root,'.'+path);
  if(file!==root && !file.startsWith(root+sep))throw Error();
  if((await stat(file)).isDirectory()){
   if(!path.endsWith('/')){res.writeHead(308,{Location:path+'/'});res.end();return;}
   file=resolve(file,'index.html');
  }
  const bytes=await readFile(file);
  res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream','Cache-Control':'no-store'});
  res.end(bytes);
 }catch{
  res.writeHead(404,{'Content-Type':mime['.html']});res.end(await readFile(resolve(root,'404.html')));
 }
}).listen(port,'127.0.0.1',()=>console.log('Studios.Bit preview http://127.0.0.1:'+port));

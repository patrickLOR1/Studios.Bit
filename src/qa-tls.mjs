import {chromium} from 'playwright-core';
import {writeFile} from 'node:fs/promises';
const b=await chromium.launch({channel:'chrome'});
const report=[];
try{
 for(const url of ['http://127.0.0.1:4295/es/','https://studios-bit-agency.polearyrosas.chatgpt.site/es/']){
  const p=await b.newPage();
  const client=await p.context().newCDPSession(p);
  const hosts=new Set(),failures=[],security=[];
  await client.send('Security.enable');
  client.on('Security.visibleSecurityStateChanged',e=>security.push({state:e.visibleSecurityState.securityState,issues:e.visibleSecurityState.securityStateIssueIds}));
  p.on('request',r=>hosts.add(new URL(r.url()).host));
  p.on('requestfailed',r=>failures.push({url:r.url(),error:r.failure()?.errorText}));
  let status=null,error=null;
  try{status=(await p.goto(url,{waitUntil:'load',timeout:25000}))?.status();await p.evaluate(()=>document.fonts.ready); }catch(e){error=e.message;}
  report.push({url,status,final:p.url(),hosts:[...hosts],failures,security,error});
  await p.close();
 }
}finally{await b.close();}
await writeFile('review/chrome-tls.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report));

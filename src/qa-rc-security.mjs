import {chromium} from 'playwright-core';
import {writeFile,mkdir} from 'node:fs/promises';
await mkdir('review/rc',{recursive:true});
const b=await chromium.launch({channel:'chrome'});
const rows=[];
try{for(const url of ['http://studiosbit.org','https://studiosbit.org','https://www.studiosbit.org/es/','https://www.studiosbit.org/en/']){
const p=await b.newPage();const failures=[];const origins=new Set();const security=[];
const c=await p.context().newCDPSession(p);await c.send('Security.enable');c.on('Security.visibleSecurityStateChanged',e=>security.push(e.visibleSecurityState));
p.on('requestfailed',r=>failures.push({url:r.url(),error:r.failure()?.errorText}));p.on('request',r=>origins.add(new URL(r.url()).origin));
try{const r=await p.goto(url,{waitUntil:'networkidle',timeout:30000});rows.push({url,final:p.url(),status:r.status(),tls:await r.securityDetails(),origins:[...origins],failures,security,robots:await p.locator('meta[name=robots]').getAttribute('content'),arrows:await p.locator('body').evaluate(e=>e.textContent.includes('↗'))});}catch(e){rows.push({url,error:e.message,failures});}await p.close();}
}finally{await b.close()}await writeFile('review/rc/security.json',JSON.stringify(rows,null,2));console.log(rows.map(r=>({url:r.url,status:r.status,failures:r.failures,final:r.final})));

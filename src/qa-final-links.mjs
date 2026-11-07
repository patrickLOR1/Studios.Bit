import {chromium} from 'playwright-core';
import {writeFile} from 'node:fs/promises';
const b=await chromium.launch({channel:'chrome'});const rows=[];
try{for(const url of ['https://studiosbit.setmore.com/patrick','https://instagram.com/studios.bit']){
 const p=await b.newPage();const failures=[];p.on('requestfailed',r=>failures.push({url:r.url(),error:r.failure()?.errorText}));
 try{const r=await p.goto(url,{waitUntil:'domcontentloaded',timeout:45000});await p.waitForTimeout(4000);const body=await p.locator('body').innerText();rows.push({url,final:p.url(),status:r.status(),tls:await r.securityDetails(),failures,body:body.slice(0,10000)});if(url.includes('setmore'))await p.screenshot({path:'review/final-round/setmore.png',fullPage:true});}catch(e){rows.push({url,error:e.message,failures})}await p.close();
}}finally{await b.close()}
await writeFile('review/final-round/external-links.json',JSON.stringify(rows,null,2));console.log(rows);

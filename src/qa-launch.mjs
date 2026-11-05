import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
const browser=await chromium.launch({channel:'chrome'});
try {
 for(const lang of ['es','en']){
  const page=await browser.newPage();
  const url=(process.env.PREVIEW_URL || 'http://127.0.0.1:4295')+'/'+lang+'/';
  await page.goto(url);
  assert.equal(await page.locator('[data-consent]').count(),0);
  await page.route('**/launch-config.js*',r=>r.fulfill({contentType:'text/javascript',body:'window.studiosLaunch={leadEnabled:true,privacyUrl:"https://example.test/privacy",privacyVersion:"QA"}'}));
  let mode='invalid',count=0,body;
  await page.route('https://formspree.io/f/mljjzngl',async r=>{
   count++;body=r.request().postDataJSON();
   if(mode==='offline')return r.abort();
   await new Promise(resolve=>setTimeout(resolve,250));
   await r.fulfill({status:mode==='invalid'?422:200,contentType:'application/json',body:JSON.stringify({ok:mode==='success'})});
  });
  await page.reload();
  await page.locator('.lab-steps [data-step="2"]').click();
  await page.locator('[data-action=proposal]').click();
  const consent=page.locator('[data-consent]'),panel=consent.locator('../..'),send=panel.locator('button'),status=panel.locator('[role=status]');
  assert.equal(await consent.isChecked(),false);
  await send.click();assert.equal(count,0);
  await page.locator('#name').fill('QA');
  await page.locator('#email').fill('qa@example.test');
  await page.locator('#company').fill('QA');
  await page.locator('#service').selectOption({index:1});
  await send.click();assert.equal(count,0);
  await consent.check();
  for(mode of ['invalid','offline','success']){
   const previous=count;
   await send.evaluate(b=>{b.click();b.click()});
   await page.waitForFunction(()=>!document.querySelector('[data-consent]').closest('div').querySelector('button').disabled);
   assert.equal(count,previous+1);
   assert.equal(await page.locator('#name').inputValue(),'QA');
   const msg=await status.innerText();
   assert.match(msg,mode==='success'?/recibió|received/:mode==='offline'?/confirm/:/rechaz|reject/);
  }
  assert.equal(body.language,lang);assert.ok(body.project_summary);assert.equal(typeof body.estimated_once_mxn,'number');
  assert.equal(body.company,'QA');assert.ok(body.scope);
  await page.close();
 }
 console.log('ES/EN: consent, validation, quote payload, duplicate lock, 422, network failure, success passed (intercepted endpoint).');
}finally{await browser.close();}

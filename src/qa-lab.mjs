import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import { chromium } from 'playwright-core';
import { estimate } from './pricing.js';
for(const [web,plan,units,once,monthly] of [
 ['landing','growth',2,17745,8900],['corporate','integral',0,24765,12900],
 ['none','essential',2,0,5500],['corporate','none',2,29085,0]
]){
 const quote=estimate({web,plan,units,bilingual:true,copy:true,motion:true});
 assert.equal(quote.once,once);
 assert.equal(quote.monthly,monthly);
}
const browser=await chromium.launch({executablePath:process.env.EDGE_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
try{
 for(const width of [390,1440]){
  const page=await browser.newPage({viewport:{width,height:width===390?844:960},...(width===1440?{recordVideo:{dir:'review/video',size:{width:1280,height:854}}}:{})});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  for(const lang of ['es','en']){
   await page.goto((process.env.PREVIEW_URL || 'http://127.0.0.1:4295')+'/'+lang+'/');
   await page.locator('.lab-steps').waitFor();
   if(width===1440 && lang==='es'){
    await page.waitForTimeout(1400);
    for(const section of ['.manifesto','.decision','.services','.process','.audience','#proyecto']){
      await page.locator(section).evaluate(el=>el.scrollIntoView({behavior:'smooth'}));
      await page.waitForTimeout(section==='.audience'?4100:1350);
    }
   }
   await page.locator('.lab-steps [data-step="0"]').click();
   const field=key=>page.locator('[data-field='+key+']');
   await page.locator('[data-pick=goal][data-value=community]').click();
   await page.locator('[data-pick=presence][data-value=existing]').click();
   await page.screenshot({path:'review/direction-'+width+'-'+lang+'.png'});
   await page.locator('[data-action=apply]').click();
   assert.equal(await field('plan').inputValue(),'essential');
   await page.locator('[data-pick=web][data-value=corporate]').click();
   await field('bilingual').check();
   await page.locator('.scope-art').scrollIntoViewIfNeeded();
   await page.screenshot({path:'review/project-'+width+'-'+lang+'.png'});
   if(width<900) await page.locator('.menu-toggle').click();
   await page.locator('[data-lang='+ (lang==='en'?'es':'en')+']').click();
   assert.equal(await field('web').inputValue(),'corporate');
   assert.ok(await field('bilingual').isChecked());
   assert.equal(await field('goal').inputValue(),'community');
   assert.equal(await page.locator('a[href="https://studiosbit.setmore.com/patrick"]').count(),5);
   await page.locator('[data-panel="1"] [data-step="2"]').click();
   await page.reload();
   await page.locator('.final-brief').waitFor();
   assert.match(await page.locator('.final-brief').innerText(),/18[,.]765/);
   const download=page.waitForEvent('download');
   await page.locator('[data-action=download]').click();
   const file=await download;
   assert.match(await readFile(await file.path(),'utf8'),/5[,.]500/);
   await page.locator('.lab-steps').scrollIntoViewIfNeeded();
   await page.screenshot({path:'review/brief-'+width+'-'+(await page.locator('html').getAttribute('lang'))+'.png'});
   await page.locator('[data-action=proposal]').click();
   assert.match(await page.locator('#details').inputValue(),/18[,.]765/);
   assert.match(await page.locator('#details').inputValue(),/5[,.]500/);
   await page.locator('#name').fill('Demo');
   await page.locator('#email').fill('demo@example.test');
   await page.locator('#project-form>button').click();
   assert.match(await page.locator('#message-preview').textContent(),/18[,.]765/);
   await page.locator('#message-preview').scrollIntoViewIfNeeded();
   await page.waitForTimeout(900);
   assert.deepEqual(errors,[]);
  }
  const video=page.video();
  await page.close();
  if(video)await video.saveAs('review/recorrido-studios-bit.webm');
 }
}finally{await browser.close();}
console.log('Pricing, recommendation, bilingual state, proposal handoff and booking links passed.');

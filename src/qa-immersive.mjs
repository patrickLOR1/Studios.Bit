import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome'});
const errors=[];
try {
 for(const width of [390,1440]){
  const context=await browser.newContext({viewport:{width,height:width===390?844:960},recordVideo:{dir:'review/immersive/video',size:{width,height:width===390?844:960}},hasTouch:width===390});
  const page=await context.newPage();
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4395/es/');
  await page.waitForTimeout(1500);
  await page.screenshot({path:'review/immersive/hero-'+width+'-es.png'});
  for(const selector of ['.decision','.transformation','.service:nth-child(1)','.service:nth-child(2)','.service:nth-child(3)','.audience-band']){
   await page.locator(selector).evaluate(el=>el.scrollIntoView({behavior:'smooth',block:'center'}));
   await page.waitForTimeout(selector==='.transformation'?2500:1600);
   if(selector.includes('.service'))await page.locator(selector).click({force:true});
  }
  await page.mouse.move(0,0);
  const band=page.locator('.audience-band');
  const before=await page.locator('.band-track').evaluate(el=>getComputedStyle(el).transform);
  await page.waitForTimeout(21000);
  const after=await page.locator('.band-track').evaluate(el=>getComputedStyle(el).transform);
  assert.notEqual(before,after);
  await page.screenshot({path:'review/immersive/band-'+width+'.png'});
  await page.locator('.project-bridge').evaluate(el=>el.scrollIntoView({behavior:'smooth'}));
  await page.waitForTimeout(1500);
  await page.locator('[data-pick=goal][data-value=catalog]').click();
  await page.waitForTimeout(650);
  await page.locator('[data-action=apply]').click();
  await page.waitForTimeout(650);
  await page.locator('[data-field=units]').fill('3');
  await page.locator('[data-field=bilingual]').check();
  await page.locator('[data-pick=plan][data-value=growth]').click();
  await page.locator('.project-prototype').scrollIntoViewIfNeeded();
  await page.waitForTimeout(750);
  assert.equal(await page.locator('.prototype-pages>i').count(),8);
  assert.equal(await page.locator('.prototype-social i').count(),12);
  assert.match(await page.locator('.prototype-nav').innerText(),/ES \/ EN/);
  await page.screenshot({path:'review/immersive/project-'+width+'-es.png'});
  await page.locator('[data-panel="1"] [data-step="2"]').click();
  const download=page.waitForEvent('download');
  await page.locator('[data-action=download]').click();
  await download;
  await page.locator('.closing').evaluate(el=>el.scrollIntoView({behavior:'smooth'}));
  await page.waitForTimeout(1500);
  await page.screenshot({path:'review/immersive/closing-'+width+'-es.png'});
  await page.locator('#contacto').evaluate(el=>el.scrollIntoView({behavior:'smooth'}));
  await page.waitForTimeout(1500);
  await page.goto('http://127.0.0.1:4395/en/');
  await page.waitForTimeout(1400);
  await page.screenshot({path:'review/immersive/hero-'+width+'-en.png'});
  await page.locator('.transformation').scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await page.screenshot({path:'review/immersive/transformation-'+width+'-en.png'});
  await page.locator('.closing').scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await page.screenshot({path:'review/immersive/closing-'+width+'-en.png'});
  const video=page.video();
  await context.close();
  await video.saveAs('review/immersive/tour-'+width+'.webm');
 }
 assert.deepEqual(errors,[]);
 console.log('Recorded ES/EN desktop and touch tours, 21-second band, scope and download verified.');
} finally {await browser.close()}


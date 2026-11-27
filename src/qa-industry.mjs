import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
import {mkdir,readFile} from 'node:fs/promises';
const origin=process.env.PREVIEW_URL||'http://127.0.0.1:4295';
const browser=await chromium.launch({executablePath:process.env.EDGE_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
await mkdir('review/industrial-2026-11-27',{recursive:true});
try{
 for(const width of [320,390,768,1440])for(const lang of ['es','en']){
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const path of [`/${lang}/`,`/${lang}/${lang==='es'?'industria':'industry'}/`]){
   assert.equal((await page.goto(origin+path)).status(),200);
   assert.equal(await page.locator('h1').count(),1);
   assert.equal(await page.locator('html').getAttribute('lang'),lang);
   assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),'https://www.studiosbit.org'+path);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow ${path} ${width}`);
   const links=await page.locator('a[href]').evaluateAll(els=>els.map(el=>el.getAttribute('href')));
   for(const href of links.filter(h=>h.startsWith('#')))assert.ok(await page.locator(`[id="${href.slice(1)}"]`).count(),href);
   if(path.split('/').length>3){assert.equal(await page.locator('details').count(),7);await page.locator('summary').first().click();assert.ok(await page.locator('details').first().getAttribute('open')!==null);}
   if([390,1440].includes(width))await page.screenshot({path:`review/industrial-2026-11-27/${width}-${lang}-${path.includes('industr')?'industry':'home'}.png`,fullPage:true});
  }
  await page.goto(origin+`/${lang}/`);
  await page.locator('.hero-cta').click();
  await page.locator('[data-pick=need][data-value=website]').click();
  await page.locator('[data-pick=sector][data-value=industrial]').click();
  await page.locator('[data-action=apply]').click();
  await page.locator('[data-panel="1"] [data-step="2"]').click();
  await page.locator('[data-action=proposal]').click();
  assert.match(await page.locator('#details').inputValue(),/Sector: industrial/);
  assert.ok((await page.locator('.form-note').innerText()).includes(lang==='es'?'NO ENVÍA':'DOES NOT SEND'));
  assert.ok(await page.locator('a[href*="setmore.com"]').count());
  const other=lang==='es'?'en':'es';
  await page.evaluate(other=>document.querySelector(`[data-lang="${other}"]`).click(),other);
  assert.equal(await page.locator('[data-industry-link]').getAttribute('href'),other==='es'?'/es/industria/':'/en/industry/');
  assert.equal(errors.length,0,errors.join('\n'));
  console.log(`${width} ${lang}: routes, metadata, FAQ, overflow, quote, contact and language PASS`);
  await page.close();
 }
 const sitemap=await readFile('dist/sitemap.xml','utf8');for(const path of ['/es/','/en/','/es/industria/','/en/industry/'])assert.ok(sitemap.includes(path));
}finally{await browser.close()}

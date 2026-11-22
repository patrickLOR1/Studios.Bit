import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';

const browser=await chromium.launch({executablePath:process.env.EDGE_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
const origin=process.env.PREVIEW_URL||'http://127.0.0.1:4295';
try{
 for(const width of [390,1440]){
  const page=await browser.newPage({viewport:{width,height:width===390?844:960},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  for(const lang of ['es','en']){
   await page.goto(`${origin}/${lang}/`,{waitUntil:'domcontentloaded'});
   const hero=await page.locator('.hero').innerText();
   for(const phrase of lang==='es'?['SITIOS WEB','REDES SOCIALES','COTIZAR MI PROYECTO']:['WEBSITES','SOCIAL MEDIA','GET A PROJECT ESTIMATE'])assert.ok(hero.includes(phrase),phrase);
   assert.equal(await page.locator('#main-nav a[href="#proyecto"]').count(),1);
   await page.locator('.hero-cta').click();
   await page.locator('#proyecto').waitFor({state:'visible'});
   assert.ok((await page.locator('#proyecto').innerText()).includes(lang==='es'?'Cotiza tu proyecto':'Estimate your project'));
   assert.ok((await page.locator('#proyecto').innerText()).includes(lang==='es'?'estimaciones':'estimates'));
   await page.locator('#contacto').scrollIntoViewIfNeeded();
   assert.ok((await page.locator('.form-note').innerText()).includes(lang==='es'?'NO ENVÍA':'DOES NOT SEND'));
  }
  assert.equal(errors.length,0);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.close();
 }
 console.log('Commercial clarity, quote access, bilingual contact disclosure and responsive overflow passed.');
}finally{await browser.close()}

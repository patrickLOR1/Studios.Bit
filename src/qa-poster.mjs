import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
const browser=await chromium.launch({channel:'chrome'});
try{
 for(const width of [320,375,390,768,1024,1440]){
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  for(const lang of ['es','en']){
   await page.goto('http://127.0.0.1:4395/'+lang+'/');
   await page.locator('.audience-band').scrollIntoViewIfNeeded();
   assert.equal(await page.locator('.band-clone').count(),0);
   assert.equal(await page.locator('.band-group span').count(),5);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   assert.ok(await page.locator('.service-demo').first().isVisible());
   await page.emulateMedia({reducedMotion:'no-preference'});
   await page.waitForTimeout(200);
   assert.equal(await page.locator('.band-clone[aria-hidden=true]').count(),1);
   await page.locator('.audience-band').focus();
   const transform=await page.locator('.band-track').evaluate(el=>getComputedStyle(el).transform);
   await page.waitForTimeout(150);
   assert.equal(await page.locator('.band-track').evaluate(el=>getComputedStyle(el).transform),transform);
   await page.keyboard.press('Escape');
   await page.locator('.audience-band').evaluate(el=>el.blur());
   await page.emulateMedia({reducedMotion:'reduce'});
  }
  await page.close();
 }
 const plain=await browser.newPage({javaScriptEnabled:false,viewport:{width:320,height:800}});
 await plain.goto('http://127.0.0.1:4395/en/');
 assert.equal(await plain.locator('h1').count(),1);
 assert.equal(await plain.locator('.band-group span').count(),5);
 assert.match(await plain.locator('.closing h2').innerText(),/YOUR NEXT/);
 assert.ok(await plain.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await plain.close();
 console.log('Band: 12 layouts, reduced motion, pause, accessible single copy and no-JS HTML passed.');
}finally{await browser.close()}

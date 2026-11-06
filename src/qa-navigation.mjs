import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {chromium} from 'playwright-core';
const dir='review/navigation';
await mkdir(dir,{recursive:true});
const browser=await chromium.launch({channel:'chrome'});
const page=await browser.newPage({viewport:{width:1440,height:900},recordVideo:{dir}});
const errors=[];
page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('http://127.0.0.1:4395/es/');
 const nav=page.locator('#main-nav'),dialog=page.locator('#navigation-dialog'),toggle=page.locator('.menu-toggle');
 await nav.locator('.nav-marker').waitFor();
 await page.waitForTimeout(900);
 for(const link of await nav.locator('a').all()){await link.hover();await page.waitForTimeout(420)}
 await nav.locator('a[href="#servicios"]').click();await page.mouse.move(0,400);
 await page.waitForTimeout(1100);
 assert.equal(await nav.locator('a[aria-current]').getAttribute('href'),'#servicios');
 assert.ok(await page.locator('.nav.floating').count());
 assert.ok(Math.abs((await page.locator('.nav').boundingBox()).y)<2);
 await page.screenshot({path:dir+'/desktop.png'});
 await page.locator('[data-lang=en]').click();
 await page.waitForTimeout(350);
 assert.equal(await nav.locator('a').first().getAttribute('aria-label'),'Studio');
 assert.equal(await page.locator('.nav-cta').getAttribute('href'),'#proyecto');
 for(const width of [1024,768,390,375,320]){
  await page.setViewportSize({width,height:820});
  if(width<=900){
   await toggle.click();
   await dialog.waitFor();assert.equal(await page.locator(':focus').getAttribute('class'),'nav-close');
   await page.keyboard.press('Shift+Tab');assert.equal(await page.locator(':focus').getAttribute('class'),'nav-cta');
   await page.keyboard.press('Tab');assert.equal(await page.locator(':focus').getAttribute('class'),'nav-close');
   if(width===390){
    await page.waitForTimeout(850);
    await page.screenshot({path:dir+'/mobile-en.png'});
    await page.locator('[data-lang=es]').click();
    assert.equal(await nav.locator('a').first().getAttribute('aria-label'),'Estudio');
    await page.waitForTimeout(700);
   }
   await page.keyboard.press('Escape');await dialog.waitFor({state:'hidden'});
   assert.ok(await toggle.evaluate(el=>el===document.activeElement));
  }
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 }
 await toggle.click();await dialog.locator('.nav-cta').click();await dialog.waitFor({state:'hidden'});
 assert.equal(await page.locator(':focus').getAttribute('id'),'proyecto');
 await page.emulateMedia({reducedMotion:'reduce'});
 await toggle.click();await nav.locator('a[href="#proceso"]').click();await dialog.waitFor({state:'hidden'});
 assert.equal(await page.locator(':focus').getAttribute('id'),'proceso');
 await toggle.click();await page.setViewportSize({width:1440,height:900});
 await dialog.waitFor({state:'hidden'});assert.equal(await page.locator('html.nav-locked').count(),0);
 assert.deepEqual(errors,[]);
 console.log('Six widths, ES/EN, section tracking, keyboard trap, Escape, CTA, reduced motion and resize passed.');
}finally{const video=page.video();await page.close();await video.saveAs(dir+'/navigation.webm');await browser.close()}

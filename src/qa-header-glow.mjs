import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
const dir='review/header-glow';
await mkdir(dir,{recursive:true});
const browser=await chromium.launch({channel:'chrome'});
try{
 for(const width of [1440,1920,1024,768,390,375]){
  const touch=width<=768,record=width===1440;
  const ctx=await browser.newContext({viewport:{width,height:900},hasTouch:touch,isMobile:touch,...(record?{recordVideo:{dir,size:{width,height:900}}}:{})});
  const p=await ctx.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
  for(const lang of ['es','en']){
   await p.goto('http://127.0.0.1:4395/'+lang+'/');
   const header=p.locator('header.nav'),halo=p.locator('.cursor-glow');
   assert.equal(await header.evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(11, 11, 13)');
   if(!touch){
    await p.mouse.move(180,350);await p.waitForTimeout(300);
    await p.mouse.move(width*.72,550,{steps:record?45:5});await p.waitForTimeout(380);
    assert.ok(await halo.evaluate(el=>el.classList.contains('is-lit')&&getComputedStyle(el).opacity==='1'&&getComputedStyle(el).pointerEvents==='none'));
    await p.mouse.wheel(0,220);await p.waitForTimeout(250);await p.mouse.wheel(0,1100);await p.waitForTimeout(900);
    await p.locator('#main-nav a[href="#servicios"]').click();
   }else{
    assert.equal(await halo.evaluate(el=>getComputedStyle(el).display),'none');
    await p.locator('.menu-toggle').click();
    await p.locator('#main-nav a[href="#servicios"]').click();
   }
   await p.waitForFunction(()=>Math.abs(document.querySelector('#servicios').getBoundingClientRect().top-studiosScroll.inset())<3,null,{timeout:6500});
   const gap=await p.evaluate(()=>{const h=document.querySelector('header.nav'),s=document.querySelector('.story-chapters');return getComputedStyle(s).position==='sticky'?s.getBoundingClientRect().top-h.getBoundingClientRect().bottom:0});
   assert.ok(Math.abs(gap)<1,'bar gap '+gap);
   if(!touch){
    await p.mouse.move(160,270,{steps:12});await p.mouse.move(width*.65,480,{steps:record?50:6});await p.waitForTimeout(350);
    if(record&&lang==='es')await p.screenshot({path:dir+'/desktop.png'});
    await p.mouse.move(-10,-10);await p.waitForTimeout(450);
    assert.equal(await halo.evaluate(el=>getComputedStyle(el).opacity),'0');
    await p.mouse.move(250,390);await p.waitForTimeout(350);
    await p.emulateMedia({reducedMotion:'reduce'});assert.equal(await halo.evaluate(el=>getComputedStyle(el).display),'none');
    await p.emulateMedia({reducedMotion:'no-preference'});
   }else if(width===390 && lang==='es')await p.screenshot({path:dir+'/mobile.png'});
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  }
  assert.deepEqual(errors,[]);
  const video=p.video();await ctx.close();if(video)await video.saveAs(dir+'/demo.webm');console.log(width+' ES/EN passed');
 }
}finally{await browser.close()}

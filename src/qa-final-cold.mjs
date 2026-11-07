import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const dir='review/final-round';await mkdir(dir,{recursive:true});
const browser=await chromium.launch({channel:'chrome'});const rows=[];
try{
 for(const width of [390,1440])for(const lang of ['es','en']){
 const context=await browser.newContext({viewport:{width,height:900},isMobile:width===390,hasTouch:width===390});
 const p=await context.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
 // Deliberately slow CSS: distinguish document paint from the browser's empty tab.
 await p.route('**/*.css*',async route=>{await new Promise(r=>setTimeout(r,1200));await route.continue();});
 const cdp=await context.newCDPSession(p);await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
 await p.goto('http://127.0.0.1:4395/'+lang+'/',{waitUntil:'commit'});
 await p.waitForFunction(()=>document.body);
 const background=await p.evaluate(()=>({html:getComputedStyle(document.documentElement).backgroundColor,body:getComputedStyle(document.body).backgroundColor}));
 assert.equal(background.html,'rgb(11, 11, 13)');assert.equal(background.body,'rgb(11, 11, 13)');
 const shot=await cdp.send('Page.captureScreenshot');await writeFile(`${dir}/cold-${width}-${lang}.png`,Buffer.from(shot.data,'base64'));
 await p.waitForLoadState('networkidle');await p.waitForTimeout(1700);
 await p.screenshot({path:`${dir}/hero-${width}-${lang}.png`});
 for(const selector of ['.transformation','.service','.audience-band','.closing']){
 await p.locator(selector).first().scrollIntoViewIfNeeded();await p.waitForTimeout(900);
 assert.ok(await p.locator(selector).first().isVisible());assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 }
 await p.evaluate(()=>window.studiosScroll.navigate(document.querySelector('#proyecto')));await p.waitForTimeout(1300);
 await p.screenshot({path:`${dir}/project-${width}-${lang}.png`});
 await p.emulateMedia({reducedMotion:'reduce'});await p.emulateMedia({reducedMotion:'no-preference'});await p.waitForTimeout(500);
 assert.equal(errors.length,0);rows.push({width,lang,background,errors,lazyScenes:'visited',reducedMotion:'toggled',physicalDevice:false});await context.close();
 }
}finally{await browser.close()}
await writeFile(`${dir}/cold-scenes.json`,JSON.stringify(rows,null,2));console.log(rows);

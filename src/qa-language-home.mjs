import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
const b=await chromium.launch({channel:'chrome'});
try{
for(const width of [390,1440])for(const lang of ['es','en'])for(const reducedMotion of ['reduce','no-preference']){
const p=await b.newPage({viewport:{width,height:850},reducedMotion});
const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.goto('http://127.0.0.1:4395/'+lang+'/');
await p.locator('#main-nav .nav-marker').waitFor({state:'attached'});
if(width===390)await p.locator('.menu-toggle').click();
await p.locator('.nav-cta').click();
await p.waitForFunction(()=>Math.abs(document.querySelector('#proyecto').getBoundingClientRect().top-studiosScroll.inset())<4);
if(width===390)await p.locator('.menu-toggle').click();
await p.locator('[data-lang="'+(lang==='es'?'en':'es')+'"]').click();
if(width===390){await p.keyboard.press('Escape');await p.locator('#navigation-dialog').waitFor({state:'hidden'});}
await p.locator('.nav .brand').click();
await p.waitForFunction(()=>scrollY<2&&!document.querySelector('#main-nav [aria-current]'));
assert.equal(await p.locator('html').getAttribute('lang'),lang==='es'?'en':'es');assert.deepEqual(errors,[]);
console.log(width,lang,reducedMotion,'PASS');await p.close();
}
}finally{await b.close()}


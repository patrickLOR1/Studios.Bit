import {chromium,webkit,devices} from 'playwright-core';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
await mkdir('review/arrows',{recursive:true});
for(const [name,type,options] of [['ios-webkit',webkit,devices['iPhone 13']],['android-chromium',chromium,devices['Pixel 7']],['desktop-chrome',chromium,{viewport:{width:1440,height:900}}]]){
const b=await type.launch(name==='desktop-chrome'?{channel:'chrome'}:{});
try{const p=await b.newPage(options);
for(const lang of ['es','en']){
await p.goto('http://127.0.0.1:4395/'+lang+'/');
await p.waitForTimeout(900);
for(const next of [lang,lang==='es'?'en':'es',lang]){
await p.evaluate(l=>document.querySelector('[data-lang="'+l+'"]').click(),next);
for(const step of [0,1,2]){
await p.locator('.lab-steps [data-step="'+step+'"]').click();
await p.waitForTimeout(150);
assert.equal(await p.locator('body').evaluate(el=>el.textContent.includes('↗')),false);
assert.equal(await p.locator('svg.icon-arrow:not([aria-hidden="true"])').count(),0);
assert.ok(await p.locator('svg.icon-arrow').count()>10);
const sizes=await p.locator('button svg.icon-arrow:visible,a svg.icon-arrow:visible').evaluateAll(els=>els.map(e=>({width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height})));
assert.ok(sizes.every(s=>s.width<=32&&s.height<=32),'Decorative arrows must stay icon-sized');
}
}
await p.evaluate(()=>window.studiosScroll.navigate(document.querySelector('#inicio')));
await p.waitForTimeout(1800);
await p.screenshot({path:'review/arrows/'+name+'-'+lang+'.png'});
console.log(name,lang,'PASS',await p.locator('.hero-cta .icon-arrow').evaluate(e=>({stroke:getComputedStyle(e).stroke,width:e.getBoundingClientRect().width})));
}
}finally{await b.close()}
}

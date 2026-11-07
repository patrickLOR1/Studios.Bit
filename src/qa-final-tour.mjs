import {chromium} from 'playwright-core';
const b=await chromium.launch({channel:'chrome'});
const c=await b.newContext({viewport:{width:1440,height:900},recordVideo:{dir:'review/final-round/video',size:{width:1440,height:900}}});const p=await c.newPage();
try{
await p.goto('http://127.0.0.1:4395/es/');await p.waitForTimeout(1700);
await p.mouse.move(400,300,{steps:20});
for(const id of ['nosotros','servicios','proceso']){await p.locator('#main-nav a[href="#'+id+'"]').click();await p.waitForTimeout(1400);}
await p.locator('.nav-cta').click();await p.waitForTimeout(1800);
await p.locator('[data-pick=goal][data-value=catalog]').click();await p.waitForTimeout(700);
await p.locator('[data-action=apply]').click();await p.waitForTimeout(700);
await p.locator('[data-field=bilingual]').check();await p.waitForTimeout(700);
await p.locator('[data-panel="1"] [data-step="2"]').click();await p.waitForTimeout(1200);
await p.locator('[data-action=proposal]').click();await p.waitForTimeout(1600);
await p.locator('[data-lang=en]').click();await p.waitForTimeout(1000);
await p.locator('.nav .brand').click();await p.waitForTimeout(1700);
const video=p.video();await c.close();await video.saveAs('review/final-round/tour-final.webm');
}finally{await b.close()}

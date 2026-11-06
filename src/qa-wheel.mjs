import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
import {mkdir,writeFile} from 'node:fs/promises';
import {gzipSync} from 'node:zlib';
const variant=process.argv[2],dir='review/wheel/'+variant;
await mkdir(dir,{recursive:true});
const b=await chromium.launch({channel:'chrome'});
try{
 const ctx=await b.newContext({viewport:{width:1440,height:900},recordVideo:{dir}});
 const p=await ctx.newPage();await p.goto('http://127.0.0.1:4395/es/');
 await p.waitForTimeout(1600);await p.mouse.move(450,350);
 const cdp=await ctx.newCDPSession(p);
 await cdp.send('Tracing.start',{categories:'devtools.timeline,blink.user_timing,disabled-by-default-devtools.timeline.frame',transferMode:'ReturnAsStream'});
 await p.evaluate(()=>{window.tasks=[];new PerformanceObserver(l=>tasks.push(...l.getEntries().map(e=>e.duration))).observe({type:'longtask'})});
 const samples=[];
 for(const delta of [240,240,-240,240,-240]){
  await p.evaluate(delta=>{
   window.sample=new Promise(resolve=>window.addEventListener('wheel',()=>{
    const y=scrollY,start=performance.now();let first;
    function measure(){
     const ms=performance.now()-start,progress=(scrollY-y)/delta;
     if(progress>0 && first===undefined)first=ms;
     if(progress>=.95 || ms>1300)resolve({first:Math.round(first??ms),to95:Math.round(ms),progress});
     else requestAnimationFrame(measure);
    }requestAnimationFrame(measure);
   },{once:true,passive:true}));
  },delta);
  await p.mouse.wheel(0,delta);samples.push(await p.evaluate(()=>window.sample));await p.waitForTimeout(450);
 }
 for(const delta of [40,40,40,1400,1400,-2200,650]){await p.mouse.wheel(0,delta);await p.waitForTimeout(90)}
 await p.waitForTimeout(1000);
 const end=new Promise(r=>cdp.once('Tracing.tracingComplete',r));await cdp.send('Tracing.end');const {stream}=await end;
 let raw='',chunk;do{chunk=await cdp.send('IO.read',{handle:stream});raw+=chunk.data}while(!chunk.eof);
 await writeFile(dir+'/chrome.json.gz',gzipSync(raw));const dropped=JSON.parse(raw).traceEvents.filter(e=>e.name==='DroppedFrame').length;
 const report={samples,dropped,longTasks:await p.evaluate(()=>tasks)};console.log(report);await writeFile(dir+'/metrics.json',JSON.stringify(report,null,2));
 if(variant==='after'){
  for(const width of [1440,390]){
   await p.setViewportSize({width,height:850});
   for(const lang of ['es','en']){
    await p.goto('http://127.0.0.1:4395/'+lang+'/');await p.waitForTimeout(400);
    assert.equal(await p.locator('#main-nav [aria-current]').count(),0);
    for(const id of ['nosotros','servicios','proceso','contacto','proceso','servicios','nosotros']){
     if(width===390)await p.locator('.menu-toggle').click();
     await p.locator('#main-nav a[href="#'+id+'"]').click();
     await p.waitForFunction(id=>document.querySelector('#main-nav [aria-current]')?.hash==='#'+id,id);
     await p.waitForTimeout(450);
    }
    if(width===390)await p.locator('.menu-toggle').click();
    await p.locator('.nav-cta').click();
    await p.waitForFunction(()=>Math.abs(document.querySelector('#proyecto').getBoundingClientRect().top-studiosScroll.inset())<4);
    await p.locator('.lab-steps [data-step="1"]').click();
    if(width===390)await p.locator('.menu-toggle').click();
    await p.locator('[data-lang="'+(lang==='es'?'en':'es')+'"]').click();
    if(width===390){await p.keyboard.press('Escape');await p.locator('#navigation-dialog').waitFor({state:'hidden'});}
    await p.emulateMedia({reducedMotion:'reduce'});await p.locator('.nav .brand').click();
    await p.waitForFunction(()=>scrollY<2&&!document.querySelector('#main-nav [aria-current]'));
    await p.emulateMedia({reducedMotion:'no-preference'});
   }
  }
 }
 console.log('Wheel and ES/EN desktop/mobile navigation, language switch, return home and reduced motion passed.');
 const video=p.video();await ctx.close();await video.saveAs(dir+'/tour.webm');
}finally{await b.close()}


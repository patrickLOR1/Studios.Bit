import {chromium} from 'playwright-core';
import {mkdir,writeFile} from 'node:fs/promises';
import {gzipSync} from 'node:zlib';
import assert from 'node:assert/strict';
const run=process.argv[2];
const dir='review/scroll/'+run;
await mkdir(dir,{recursive:true});
const browser=await chromium.launch({channel:'chrome'});
try{
 for(const width of [1440,390]){
  const ctx=await browser.newContext({viewport:{width,height:850},recordVideo:{dir},hasTouch:width===390});
  const page=await ctx.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4395/es/');
  await page.waitForTimeout(1300);
  const cdp=await ctx.newCDPSession(page);
  await cdp.send('Performance.enable');
  const metrics=async()=>Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(m=>[m.name,m.value]));
  const start=await metrics();
  await cdp.send('Tracing.start',{categories:'devtools.timeline,blink.user_timing,v8,disabled-by-default-devtools.timeline.frame',transferMode:'ReturnAsStream'});
  await page.evaluate(()=>{window.taskTimes=[];new PerformanceObserver(list=>taskTimes.push(...list.getEntries().map(e=>e.duration))).observe({type:'longtask'});window.gaps=[];let last;function tick(t){if(last)gaps.push(t-last);last=t;requestAnimationFrame(tick)}requestAnimationFrame(tick)});
  for(let i=0;i<8;i++){await page.mouse.wheel(0,45);await page.waitForTimeout(60)}
  await page.mouse.wheel(0,1500);
  const click=async(hash,settle)=>{
   if(width===390)await page.locator('.menu-toggle').click();
   await page.locator('#main-nav a[href="'+hash+'"]').click();
   if(width===390)await page.locator('dialog').waitFor({state:'hidden'});
   await page.waitForTimeout(settle);
  };
  for(const hash of ['#servicios','#nosotros','#proceso','#contacto'])await click(hash,140);
  await page.waitForTimeout(1150);
  const contactTop=await page.locator('#contacto').evaluate(el=>el.getBoundingClientRect().top);
  if(width===390)await page.locator('.menu-toggle').click();
  await page.locator('.nav-cta').click();
  await page.waitForTimeout(1200);
  await page.locator('.lab-steps [data-step="1"]').click();
  await page.locator('.lab-steps [data-step="2"]').click();
  if(width===390)await page.locator('.menu-toggle').click();
  await page.locator('[data-lang=en]').click();
  if(width===390)await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.locator('.brand[href="#inicio"]').first().click();
  await page.waitForTimeout(550);
  await page.setViewportSize({width:width===390?768:1024,height:850});
  const end=await metrics();
  const done=new Promise(resolve=>cdp.once('Tracing.tracingComplete',resolve));
  await cdp.send('Tracing.end');const {stream}=await done;
  const parts=[];let read;do{read=await cdp.send('IO.read',{handle:stream});parts.push(read.data)}while(!read.eof);
  const raw=parts.join('');await writeFile(dir+'/trace-'+width+'.json.gz',gzipSync(raw));
  const events=JSON.parse(raw).traceEvents;
  const frames=await page.evaluate(()=>gaps);
  const report={width,contactTop,frameSamples:frames.length,framesOver33ms:frames.filter(x=>x>33.5).length,worstFrameMs:Math.round(Math.max(...frames)),longTasks:await page.evaluate(()=>taskTimes.length),droppedFrameEvents:events.filter(e=>e.name==='DroppedFrame').length,layoutCount:end.LayoutCount-start.LayoutCount,recalcCount:end.RecalcStyleCount-start.RecalcStyleCount,layoutMs:Math.round(1000*(end.LayoutDuration-start.LayoutDuration)),styleMs:Math.round(1000*(end.RecalcStyleDuration-start.RecalcStyleDuration)),errors};
  await writeFile(dir+'/metrics-'+width+'.json',JSON.stringify(report,null,2));console.log(report);
  const video=page.video();await ctx.close();await video.saveAs(dir+'/tour-'+width+'.webm');assert.deepEqual(errors,[]);
 }
}finally{await browser.close()}

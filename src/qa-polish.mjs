import {chromium} from 'playwright-core';
import {mkdir} from 'node:fs/promises';

const browser=await chromium.launch({executablePath:process.env.EDGE_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
const origin=process.env.PREVIEW_URL||'http://127.0.0.1:4295';
await mkdir('review/release-polish',{recursive:true});
try{
 for(const width of [390,1440]){
  const page=await browser.newPage({viewport:{width,height:width===390?844:960},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(origin+'/es/',{waitUntil:'domcontentloaded'});
  await page.locator('#comparacion').scrollIntoViewIfNeeded();
  for(const value of [0,50,100]){
   await page.locator('#compare-range').fill(String(value));
   await page.locator('.compare-demo').screenshot({path:`review/release-polish/comparator-${width}-${value}.png`});
  }
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error(`overflow at ${width}px`);
  if(errors.length)throw Error(errors.join('\n'));
  await page.close();
 }
 console.log('Comparator captures 390/1440 at 0/50/100 passed without console errors or overflow.');
}finally{await browser.close()}

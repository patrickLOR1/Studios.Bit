import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
const browser=await chromium.launch({channel:'chrome'});
try{
 for(const width of [320,375,390,768,1024,1440]){
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  for(const lang of ['es','en']){
   await page.goto('http://127.0.0.1:4395/'+lang+'/');
   const poster=page.locator('.poster.mounted');
   await poster.scrollIntoViewIfNeeded();
   for(let index=0;index<5;index++){
    const word=poster.locator('[aria-hidden=false]');
    assert.equal(await word.count(),1);
    assert.ok(await word.evaluate(el=>el.scrollWidth<=el.clientWidth+1));
    assert.equal(await poster.locator('output').innerText(),'0'+(index+1)+' / 05');
    if(index===2 && [390,1440].includes(width))await poster.screenshot({path:'review/poster-'+width+'-'+lang+'.png'});
    await poster.locator('[data-next]').click();
   }
  }
  await page.close();
 }
 console.log('Poster: 60 categories verified, manual loop and reduced motion.');
}finally{await browser.close()}

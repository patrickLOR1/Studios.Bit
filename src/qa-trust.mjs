import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';

const origin=process.env.PREVIEW_URL||'http://127.0.0.1:4295';
const browser=await chromium.launch({
  executablePath:process.env.EDGE_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  headless:true
});

try{
  for(const width of [320,390,768,1024,1440]){
    for(const lang of ['es','en']){
      const page=await browser.newPage({viewport:{width,height:width<500?844:960},reducedMotion:'reduce'});
      const errors=[];
      page.on('pageerror',error=>errors.push(error.message));
      await page.goto(`${origin}/${lang}/`,{waitUntil:'domcontentloaded'});
      await page.locator('#confianza').waitFor();

      assert.equal(await page.locator('html').getAttribute('lang'),lang);
      assert.ok(await page.locator('#confianza').innerText().then(text=>text.includes(lang==='es'?'Alcance definido':'Defined scope')));
      assert.deepEqual(await page.locator('.case-meta strong').allTextContents(),Array(3).fill(lang==='es'?'PROYECTO CONCEPTUAL':'CONCEPT PROJECT'));
      assert.equal(await page.locator('.portrait figcaption b').count(),2);
      assert.equal(await page.locator('.service-scope-note').count(),3);
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth));

      const slider=page.locator('#compare-range');
      await slider.fill('0');
      assert.equal(await slider.getAttribute('aria-valuetext'),lang==='es'?'0% mejorada':'0% improved');
      assert.match(await page.locator('.ui-after').evaluate(el=>getComputedStyle(el).clipPath),/100%/);
      await slider.fill('100');
      assert.equal(await slider.getAttribute('aria-valuetext'),lang==='es'?'100% mejorada':'100% improved');
      assert.match(await page.locator('.ui-after').evaluate(el=>getComputedStyle(el).clipPath),/0%/);
      assert.deepEqual(errors,[]);
      await page.close();
      console.log(`${width} px · ${lang.toUpperCase()} trust flow OK`);
    }
  }
}finally{
  await browser.close();
}

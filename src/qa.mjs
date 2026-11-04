import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

const browser = await chromium.launch({
  executablePath: process.env.EDGE_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  headless: true
});
const origin = process.env.PREVIEW_URL || 'http://127.0.0.1:4294';
await mkdir('review', { recursive: true });
try {
  for (const width of [320,375,390,768,1024,1440]) {
    const page = await browser.newPage({viewport:{width,height:width<600?844:960}});
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    for (const lang of ['es','en']) {
      await page.goto(origin+'/'+lang+'/',{waitUntil:'domcontentloaded'});
      await page.locator('.languages button').first().waitFor({state:'attached'});
      await page.evaluate(()=>document.fonts.ready);
      await page.waitForTimeout(1100);
      assert.equal(await page.locator('html').getAttribute('lang'),lang);
      assert.equal(await page.locator('.languages').count(),1);
      assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),await page.locator('link[hreflang='+lang+']').getAttribute('href'));
      assert.match(await page.locator('meta[name=robots]').getAttribute('content'),/noindex/);
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      if(width===390 || width===1440) await page.screenshot({path:'review/'+width+'-'+lang+'.png'});
      await page.locator('.service-select').nth(1).click();
      assert.equal(await page.locator('#service').inputValue(),'corporate');
      await page.locator('#project-form>button').click();
      assert.ok(await page.locator('#form-error').textContent());
      await page.locator('#name').fill('QA');
      await page.locator('#email').fill('review@example.test');
      await page.locator('#details').fill('Studio review');
      await page.locator('#project-form>button').click();
      assert.match(await page.locator('#message-preview').textContent(),/Studio review/);
      const next=lang==='es'?'en':'es';
      if(width<=900) await page.locator('.menu-toggle').click();
      await page.locator('[data-lang='+next+']').click();
      assert.equal(await page.locator('#service').inputValue(),'corporate');
      assert.equal(await page.locator('#details').inputValue(),'Studio review');
      assert.match(await page.locator('#message-preview').textContent(),next==='en'?/Corporate Websites/:/Sitios web corporativos/);
      await page.locator('#main-nav a').first().click();
      assert.ok(page.url().includes('/'+next+'/'));
      await page.reload();
      assert.equal(await page.locator('html').getAttribute('lang'),next);
    }
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.waitForFunction(()=>!document.documentElement.classList.contains('motion-scroll'));
    assert.ok(!(await page.locator('html').getAttribute('class')||'').includes('motion-scroll'));
    assert.deepEqual(errors,[]);
    console.log(width+' px · ES/EN OK');
    await page.close();
  }
} finally { await browser.close(); }

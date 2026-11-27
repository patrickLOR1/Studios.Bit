import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
import {mkdir,writeFile} from 'node:fs/promises';
const origin=process.env.PREVIEW_URL||'http://127.0.0.1:4296';
const dir='review/business-solutions-2026-11-27';await mkdir(dir,{recursive:true});
const browser=await chromium.launch({executablePath:process.env.EDGE_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
const results=[];
try{
 for(const width of [320,375,768,1024,1440])for(const lang of ['es','en']){
  const page=await browser.newPage({viewport:{width,height:960},reducedMotion:width===1024?'no-preference':'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin+'/'+lang+'/');
  await page.locator('[data-pick=need]').first().waitFor({state:'attached'});
  assert.match(await page.locator('h1').innerText(),lang==='es'?/TECNOLOGÍA/:/TECHNOLOGY/);
  assert.equal(await page.locator('.solution-card').count(),6);assert.equal(await page.locator('.use-case-list article').count(),4);
  assert.equal(await page.locator('[data-pick=need]').count(),8);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow ${width} ${lang}`);
  const anchors=await page.locator('a[href^="#"]').evaluateAll(els=>els.map(el=>el.getAttribute('href')));
  for(const hash of anchors)assert.ok(await page.locator(`[id="${hash.slice(1)}"]`).count(),hash);
  const schema=JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());assert.equal(schema['@graph'].filter(x=>x['@type']==='Service').length,6);
  if([375,1440].includes(width)){
   await page.screenshot({path:`${dir}/after-${lang}-${width}.png`});
   await page.locator('#soluciones').screenshot({path:`${dir}/solutions-${lang}-${width}.png`});
   await page.locator('#casos-de-uso').screenshot({path:`${dir}/use-cases-${lang}-${width}.png`});
  }
  await page.locator('.hero-cta').click();
  assert.equal(await page.locator('[data-pick=need][data-value=unsure]').getAttribute('aria-pressed'),'true');
  await page.locator('[data-pick=need][data-value=crm]').click();await page.locator('[data-action=apply]').click();
  await page.locator('[data-field=challenge]').fill('Organizar clientes <prueba>');
  await page.locator('[data-pick=connection][data-value=yes]').click();
  assert.equal(await page.locator('[data-field=challenge]').inputValue(),'Organizar clientes <prueba>');
  await page.locator('[data-field=tools]').fill('Hojas de cálculo');
  await page.locator('[data-panel="1"] [data-step="2"]').click();
  assert.ok(!(await page.locator('#proyecto').innerText()).includes('MXN'));
  assert.match(await page.locator('.final-brief').innerText(),/Hojas de cálculo/);
  const download=page.waitForEvent('download');await page.locator('[data-action=download]').click();assert.ok((await download).suggestedFilename().endsWith('.txt'));
  await page.locator('[data-action=proposal]').click();
  assert.equal(await page.locator('#service').inputValue(),'crm');assert.match(await page.locator('#details').inputValue(),/<prueba>/);
  await page.locator('#project-form>button[type=submit]').click();assert.equal(await page.locator('#name').getAttribute('aria-invalid'),'true');
  await page.locator('#name').fill('QA local');await page.locator('#email').fill('qa@example.com');
  await page.locator('#project-form>button[type=submit]').click();assert.ok(await page.locator('.message-result').isVisible());
  assert.match(await page.locator('#message-preview').innerText(),/CRM/);
  const other=lang==='es'?'en':'es';await page.evaluate(other=>document.querySelector(`[data-lang="${other}"]`).click(),other);
  assert.equal(await page.locator('html').getAttribute('lang'),other);assert.equal(await page.locator('#service').inputValue(),'crm');
  assert.match(await page.locator('#details').inputValue(),other==='es'?/Propuesta personalizada pendiente/:/Tailored proposal pending/);
  await page.reload();await page.locator('[data-action=proposal]').waitFor();assert.ok(!(await page.locator('#proyecto').innerText()).includes('MXN'));
  await page.locator('.lab-steps [data-step="0"]').click();await page.locator('[data-pick=need][data-value=website]').click();await page.locator('[data-action=apply]').click();
  assert.match(await page.locator('aside').innerText(),/8,004/);
  await page.locator('[data-panel="1"] [data-step="2"]').click();await page.locator('[data-action=proposal]').click();assert.equal(await page.locator('#service').inputValue(),'landing');
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert.deepEqual(errors,[]);results.push({width,lang,motion:width===1024?'normal':'reduced',status:'PASS'});console.log(width,lang,'PASS');await page.close();
 }
 // Every service branch remains navigable; no currency for any bespoke solution.
 const p=await browser.newPage({reducedMotion:'reduce'});await p.goto(origin+'/es/');
 for(const need of ['software','automation','platform','dashboard','unsure','marketing']){
  await p.locator('.lab-steps [data-step="0"]').click();await p.locator(`[data-pick=need][data-value=${need}]`).click();await p.locator('[data-action=apply]').click();
  if(need==='marketing')assert.match(await p.locator('aside').innerText(),/6,380/);
  else assert.ok(!(await p.locator('#proyecto').innerText()).includes('MXN'));
  await p.locator('[data-panel="1"] [data-step="2"]').click();await p.locator('[data-action=proposal]').click();assert.equal(await p.locator('#service').inputValue(),need==='marketing'?'social':need);
 }
 await p.goto(origin+'/es/');await p.keyboard.press('Tab');assert.equal(await p.evaluate(()=>document.activeElement.className),'skip-link');
 for(const path of ['/es/industria/','/en/industry/']){assert.equal((await p.goto(origin+path)).status(),200);assert.equal(await p.locator('details').count(),7);}
 await p.close();
 // Mock delivery only: verify bespoke payload does not carry stale numeric estimates.
 const p2=await browser.newPage({reducedMotion:'reduce'});let sent;
 await p2.route('**/launch-config.js',r=>r.fulfill({contentType:'text/javascript',body:'window.studiosLaunch={leadEnabled:true,privacyUrl:"https://example.com/privacy",privacyVersion:"qa-only"};'}));
 await p2.route('https://formspree.io/**',r=>{sent=r.request().postDataJSON();return r.fulfill({status:200,contentType:'application/json',body:'{"ok":true}'});});
 await p2.goto(origin+'/es/');await p2.locator('[data-pick=need][data-value=software]').click();await p2.locator('[data-action=apply]').click();await p2.locator('[data-field=challenge]').fill('Proceso de operaciones');await p2.locator('[data-panel="1"] [data-step="2"]').click();await p2.locator('[data-action=proposal]').click();
 await p2.locator('#name').fill('QA');await p2.locator('#email').fill('qa@example.com');await p2.locator('[data-consent]').check();await p2.getByRole('button',{name:'Enviar solicitud a Studios.Bit',exact:true}).click();await p2.getByText('Formspree recibió tu solicitud.',{exact:true}).waitFor();
 assert.equal(sent.pricing_status,'requires_tailored_proposal');assert.equal(sent.service,'software');assert.ok(!Object.keys(sent).some(k=>k.startsWith('estimated_')));await p2.close();
 results.push({branches:'all',mockedSubmission:'PASS',keyboard:'skip link PASS',industryRoutes:'PASS'});
 await writeFile(`${dir}/results.json`,JSON.stringify(results,null,2));console.log('All service branches, mock delivery and retained industry routes PASS');
}finally{await browser.close()}

import assert from 'node:assert/strict';
import {access,readFile} from 'node:fs/promises';
import {parseHTML} from 'linkedom';

const sitemap=await readFile('dist/sitemap.xml','utf8');
for(const lang of ['es','en']){
 const {document}=parseHTML(await readFile('dist/'+lang+'/index.html','utf8'));
 const attr=(selector,name)=>document.querySelector(selector)?.getAttribute(name);
 const canonical=attr('link[rel=canonical]','href');
 assert.equal(document.documentElement.lang,lang);
 assert.ok(canonical.endsWith('/'+lang+'/'));
 assert.equal(attr('meta[property="og:url"]','content'),canonical);
 assert.equal(attr('meta[property="og:title"]','content'),document.title);
 assert.ok(attr('meta[name=description]','content'));
 assert.ok(attr('meta[name="twitter:card"]','content'));
 assert.equal(attr('meta[name="twitter:title"]','content'),document.title);
 assert.equal(attr('meta[name="twitter:description"]','content'),attr('meta[name=description]','content'));
 assert.equal(attr('link[hreflang=x-default]','href'),new URL('/',canonical).href);
 for(const locale of ['es','en']) {
  const target=attr('link[hreflang='+locale+']','href');
  assert.equal(target,new URL('/'+locale+'/',canonical).href);
  assert.ok(sitemap.includes('<loc>'+target+'</loc>'));
 }
 assert.equal(document.querySelectorAll('h1').length,1);
 for(const link of document.querySelectorAll('a[href^="#"]'))assert.ok(document.getElementById(link.getAttribute('href').slice(1)),link.outerHTML);
 for(const resource of document.querySelectorAll('script[src^="/"],img[src^="/"],link[rel=stylesheet][href^="/"]')){
  const path=resource.getAttribute('src')||resource.getAttribute('href');
  await access('dist'+path.split('?')[0]);
 }
 const entities=JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent)['@graph'];
 assert.equal(entities.filter(e=>e['@type']==='Organization').length,1);
 assert.equal(entities.filter(e=>e['@type']==='WebSite').length,1);
 assert.deepEqual(entities.filter(e=>e['@type']==='Service').map(e=>e.name),[...document.querySelectorAll('.service h2')].map(el=>el.textContent));
 const questions=[...document.querySelectorAll('#proyecto details')];
 assert.ok(questions.length>=5 && questions.every(el=>el.querySelector('summary') && el.querySelector('p')?.textContent));
 assert.ok(document.querySelector('#proyecto aside').textContent.includes('MXN'));
 console.log(lang,document.title,canonical,questions.length+' FAQs',attr('meta[name=robots]','content'));
}

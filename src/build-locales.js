import {transform} from 'esbuild';
import {readFile,mkdir,writeFile,cp} from 'node:fs/promises';
import {renderTransformation,renderBridge,renderClosing,renderServiceArt} from './scenes.js';
import vm from 'node:vm';
import {parseHTML} from 'linkedom';
import {renderLab,renderBook} from './experience.js';
import {industryPath,industryTeaser,renderIndustry} from './industry.js';
import {renderSolutions,renderUseCases} from './solutions.js';
const siteURL=new URL(process.env.SITE_URL || 'https://www.studiosbit.org');
if(siteURL.protocol!=='https:')throw Error('SITE_URL must use HTTPS');
const origin=siteURL.origin;
const production=process.env.SITE_ENV==='production' && (!process.env.VERCEL_ENV || process.env.VERCEL_ENV==='production');
if(production && origin!=='https://www.studiosbit.org')throw Error('Production requires explicit HTTPS SITE_URL');
const indexable=production && process.env.SITE_INDEXABLE==='true';
const privacyUrl=process.env.APPROVED_PRIVACY_URL||'';
const privacyVersion=process.env.PRIVACY_VERSION||'';
if(privacyUrl && new URL(privacyUrl).protocol!=='https:')throw Error('Privacy notice must use HTTPS');
const leadEnabled=process.env.LEADS_ENABLED==='true';
if(leadEnabled && (!privacyUrl || !privacyVersion))throw Error('Approved privacy URL and version required');
const template=(await readFile('src/index.html','utf8'))
 .replaceAll('{{SITE_URL}}',origin)
 .replace('{{ROBOTS}}',indexable?'index,follow':'noindex,nofollow');
await mkdir('dist',{recursive:true});
await writeFile('dist/launch-config.js','window.studiosLaunch='+JSON.stringify({leadEnabled,privacyUrl,privacyVersion,origin})+';');
await writeFile('dist/launch.js',(await transform(await readFile('src/launch.js','utf8'),{loader:'js',minify:true})).code);
await cp('src/assets','dist/assets',{recursive:true});
await writeFile('dist/industry.css',(await transform(await readFile('src/industry.css','utf8'),{loader:'css',minify:true})).code);
for(const file of ['solutions.css','project-intake.js'])await writeFile('dist/'+file,(await transform(await readFile('src/'+file,'utf8'),{loader:file.endsWith('.css')?'css':'js',minify:true})).code);
for(const file of ['scroll.js','script.js','styles.css','refinements.css','i18n.js','experience.js','pricing.js','project.css','immersive.css','navigation.css','prototype.js','showcase.css','showcase.js']) await writeFile('dist/'+file,(await transform(await readFile('src/'+file,'utf8'),{loader:file.endsWith('.css')?'css':'js',minify:true})).code);
const script=await readFile('src/i18n.js','utf8');
await writeFile('dist/sitemap.xml','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+['/es/','/en/','/es/industria/','/en/industry/'].map(path=>'<url><loc>'+origin+path+'</loc></url>').join('')+'</urlset>');
await writeFile('dist/robots.txt',indexable?'User-agent: *\nAllow: /\nSitemap: '+origin+'/sitemap.xml\n':'User-agent: *\nDisallow: /\n');
for(const lang of ['es','en']) {
 const {document,window}=parseHTML(template);
 const sandbox={document,window,Event:window.Event,matchMedia:()=>({matches:false,addEventListener:()=>{}}),location:{pathname:`/${lang}/`},localStorage:{getItem:()=>lang,setItem:()=>{}}};
 vm.runInNewContext(script,sandbox);
 const solutionsStyle=document.createElement('link');solutionsStyle.rel='stylesheet';solutionsStyle.href='/solutions.css';document.head.append(solutionsStyle);
 for(const html of [renderSolutions(lang),renderUseCases(lang)]){const slot=document.createElement('div');slot.innerHTML=html;document.querySelector('#servicios').before(slot.firstElementChild);}
 const industryStyle=document.createElement('link');industryStyle.rel='stylesheet';industryStyle.href='/industry.css';document.head.append(industryStyle);
 const industrySlot=document.createElement('div');industrySlot.innerHTML=industryTeaser(lang);document.querySelector('#servicios').before(industrySlot.firstElementChild);
 const lab=document.createElement('section');
 lab.id='proyecto';
 lab.innerHTML=renderLab(lang);
 document.querySelector('#contacto').before(lab);
 const insert=(html,before)=>{const holder=document.createElement('div');holder.innerHTML=html;before.before(holder.firstElementChild);};
 insert(renderTransformation(lang),document.querySelector('#servicios'));
 insert(renderBridge(lang),lab);
 insert(renderClosing(lang),document.querySelector('#contacto'));
 document.querySelectorAll('.service').forEach((service,i)=>{
   service.querySelector('.service-visual').outerHTML=renderServiceArt(i,lang);
 });
 const chapters=document.createElement('nav');
 chapters.className='story-chapters';
 chapters.setAttribute('aria-label',lang==='es'?'Recorrido del proyecto':'Project journey');
 chapters.innerHTML=['decision-title','soluciones','proyecto'].map((id,i)=>{
  const names=lang==='es'?['Identificar la necesidad','Explorar soluciones','Cuéntanos tu proyecto']:['Identify your needs','Explore solutions','Tell us about your project'];
  return '<a href="#'+id+'"><small>0'+(i+1)+'</small><span>'+names[i]+'</span></a>';
 }).join('');
 document.querySelector('.hero').after(chapters);
 const projectLink=document.querySelector('.hero-cta');
 projectLink.href='#proyecto';
 const schema=document.querySelector('script[type="application/ld+json"]');
 const organization=JSON.parse(schema.textContent);
 organization['@id']=origin+'/#studio';
 const services=[...document.querySelectorAll('.solution-card h3')].map(title=>({
   '@type':'Service',name:title.textContent,provider:{'@id':organization['@id']},
   url:origin+'/'+lang+'/#soluciones'
 }));
 schema.textContent=JSON.stringify({'@context':'https://schema.org','@graph':[organization,{'@type':'WebSite','@id':origin+'/#website',url:origin+'/',name:'Studios.Bit',inLanguage:['es','en'],publisher:{'@id':organization['@id']}},...services]});
 for(const selector of ['.hero-bottom>div','.services','.contact-copy','footer','.closing [data-book]']){
   const target=document.querySelector(selector);
   const slot=target.hasAttribute('data-book')?target:document.createElement('div');
   slot.setAttribute('data-book','');
   slot.innerHTML=renderBook(lang);
   if(slot!==target)target.append(slot);
 }
 await mkdir(`dist/${lang}`,{recursive:true});
 await writeFile(`dist/${lang}/index.html`,'<!doctype html>\n'+document.documentElement.outerHTML);
 await mkdir('dist'+industryPath(lang),{recursive:true});
 await writeFile('dist'+industryPath(lang)+'index.html',renderIndustry(lang,origin,indexable));
 if(lang==='es') await writeFile('dist/index.html','<!doctype html>\n'+document.documentElement.outerHTML);
}
await writeFile('dist/404.html','<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="robots" content="noindex"><title>404 · Studios.Bit</title><body style="background:#0b0b0d;color:white;padding:8vw;font-family:system-ui"><h1>404 · Studios.Bit</h1><p>Página no encontrada. <span lang="en">Page not found.</span></p><a style="color:#ff6a00" href="/es/">Inicio</a> / <a style="color:#ff6a00" href="/en/" lang="en">Home</a></body></html>');

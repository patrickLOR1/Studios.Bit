import {readFile,mkdir,writeFile,copyFile,cp} from 'node:fs/promises';
import {renderTransformation,renderBridge,renderClosing,renderServiceArt} from './scenes.js';
import vm from 'node:vm';
import {parseHTML} from 'linkedom';
import {renderLab,renderBook} from './experience.js';
const origin=new URL(process.env.SITE_URL || 'https://www.studiosbit.org').origin;
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
await copyFile('src/launch.js','dist/launch.js');
await cp('src/assets','dist/assets',{recursive:true});
for(const file of ['scroll.js','script.js','styles.css','refinements.css','i18n.js','experience.js','pricing.js','project.css','immersive.css','navigation.css','prototype.js']) await copyFile('src/'+file,'dist/'+file);
const script=await readFile('src/i18n.js','utf8');
await writeFile('dist/sitemap.xml','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+['es','en'].map(lang=>'<url><loc>'+origin+'/'+lang+'/</loc></url>').join('')+'</urlset>');
await writeFile('dist/robots.txt',indexable?'User-agent: *\nAllow: /\nSitemap: '+origin+'/sitemap.xml\n':'User-agent: *\nDisallow: /\n');
for(const lang of ['es','en']) {
 const {document,window}=parseHTML(template);
 const sandbox={document,window,Event:window.Event,matchMedia:()=>({matches:false,addEventListener:()=>{}}),location:{pathname:`/${lang}/`},localStorage:{getItem:()=>lang,setItem:()=>{}}};
 vm.runInNewContext(script,sandbox);
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
 chapters.innerHTML=['decision-title','servicios','proyecto'].map((id,i)=>{
  const names=lang==='es'?['Encontrar la oportunidad','Explorar soluciones','Construir mi proyecto']:['Find the opportunity','Explore solutions','Build my project'];
  return '<a href="#'+id+'"><small>0'+(i+1)+'</small><span>'+names[i]+'</span></a>';
 }).join('');
 document.querySelector('.hero').after(chapters);
 const projectLink=document.querySelector('.hero-cta');
 projectLink.href='#proyecto';
 const schema=document.querySelector('script[type="application/ld+json"]');
 const organization=JSON.parse(schema.textContent);
 organization['@id']=origin+'/#studio';
 const services=[...document.querySelectorAll('.service h2')].map(title=>({
   '@type':'Service',name:title.textContent,provider:{'@id':organization['@id']},
   url:origin+'/'+lang+'/#servicios'
 }));
 schema.textContent=JSON.stringify({'@context':'https://schema.org','@graph':[organization,...services]});
 for(const selector of ['.hero-bottom>div','.services','.contact-copy','footer','.closing [data-book]']){
   const target=document.querySelector(selector);
   const slot=target.hasAttribute('data-book')?target:document.createElement('div');
   slot.setAttribute('data-book','');
   slot.innerHTML=renderBook(lang);
   if(slot!==target)target.append(slot);
 }
 await mkdir(`dist/${lang}`,{recursive:true});
 await writeFile(`dist/${lang}/index.html`,'<!doctype html>\n'+document.documentElement.outerHTML);
 if(lang==='es') await writeFile('dist/index.html','<!doctype html>\n'+document.documentElement.outerHTML);
}
await writeFile('dist/404.html','<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="robots" content="noindex"><title>404 · Studios.Bit</title><body style="background:#0b0b0d;color:white;padding:8vw;font-family:system-ui"><h1>404 · Studios.Bit</h1><p>Página no encontrada. <span lang="en">Page not found.</span></p><a style="color:#ff6a00" href="/es/">Inicio</a> / <a style="color:#ff6a00" href="/en/" lang="en">Home</a></body></html>');

import {readFile,mkdir,writeFile} from 'node:fs/promises';
import vm from 'node:vm';
import {parseHTML} from 'linkedom';
const template=await readFile('dist/index.html','utf8');
const script=await readFile('dist/i18n.js','utf8');
for(const lang of ['es','en']) {
 const {document,window}=parseHTML(template);
 const sandbox={document,window,Event:window.Event,matchMedia:()=>({matches:false,addEventListener:()=>{}}),location:{pathname:`/${lang}/`},localStorage:{getItem:()=>lang,setItem:()=>{}}};
 vm.runInNewContext(script,sandbox);
 await mkdir(`dist/${lang}`,{recursive:true});
 await writeFile(`dist/${lang}/index.html`,'<!doctype html>\n'+document.documentElement.outerHTML);
}

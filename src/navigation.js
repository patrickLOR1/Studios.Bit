import {gsap} from 'gsap';

const header=document.querySelector('.nav');
const nav=document.querySelector('#main-nav');
const toggle=header.querySelector('.menu-toggle');
const dialog=document.querySelector('#navigation-dialog');
const close=dialog.querySelector('.nav-close');
const cta=header.querySelector('.nav-cta');
const mobile=matchMedia('(max-width:900px)');
const reduced=matchMedia('(prefers-reduced-motion:reduce)');
const links=[...nav.querySelectorAll('a')];
function collectSections(items){
 return items.map(link=>({link,target:document.querySelector(link.hash)}));
}
const sections=collectSections(links);
const chapters=collectSections([...document.querySelectorAll('.story-chapters a')]);
const marker=document.createElement('i');
marker.className='nav-marker';
marker.setAttribute('aria-hidden','true');
nav.append(marker);
let active=null,activeChapter=null,closeAnimation,scrollFrame;
function labels(){
 links.forEach(link=>{
  const name=link.textContent;link.setAttribute('aria-label',name);
  const mask=document.createElement('span');
  mask.className='nav-mask';
  const word=document.createElement('span');
  word.className='nav-word';
  word.textContent=name;
  word.dataset.echo=name;
  mask.append(word);link.replaceChildren(mask);
 });
}
function position(instant=false){
 if(mobile.matches)return;
 const props=active
  ? {opacity:1,x:active.offsetLeft+12,scaleX:Math.max(1,active.offsetWidth-24)}
  : {opacity:0};
 if(instant||reduced.matches){gsap.killTweensOf(marker);gsap.set(marker,props)}
 else gsap.to(marker,{...props,duration:.22,ease:'power3.out',overwrite:true});
}
function select(link){
 if(active===link)return;
 active=link;
 links.forEach(el=>el===link?el.setAttribute('aria-current','location'):el.removeAttribute('aria-current'));
 position();
}
let activationLine=0;
function measureSections(){
 activationLine=window.studiosScroll.inset()+Math.min(innerHeight*.12,90);
 for(const section of [...sections,...chapters])section.top=window.studiosScroll.layoutTop(section.target);
 scrollUpdate();
}
const geometry=new ResizeObserver(measureSections);
document.querySelectorAll('main>section,main>.story-chapters,.nav').forEach(el=>geometry.observe(el));
// Keep the last active item across tiny reversals on the boundary.
function reached(items,previous,line){
 let result=null;
 for(const item of items){
  if(item.top <= line+(item.link===previous?6:0))result=item.link;
 }
 return result;
}
function readScroll(){
 scrollFrame=0;
 header.classList.toggle('floating',scrollY>32);
 const line=scrollY+activationLine;
 select(reached(sections,active,line));
 const next=reached(chapters,activeChapter,line);
 if(next!==activeChapter){
  activeChapter=next;
  for(const {link} of chapters){
   if(link===next)link.setAttribute('aria-current','location');
   else link.removeAttribute('aria-current');
  }
 }
}
function scrollUpdate(){if(!scrollFrame)scrollFrame=requestAnimationFrame(readScroll)}
links.forEach(link=>{
 link.addEventListener('pointermove',e=>{
  if(mobile.matches||reduced.matches||e.pointerType!=='mouse')return;
  const r=link.getBoundingClientRect();
  link.style.setProperty('--magnet',((e.clientX-r.left)/r.width*4-2)+'px');
 });
 link.addEventListener('pointerleave',()=>link.style.removeProperty('--magnet'));
});
function restore(){
 header.insertBefore(nav,header.querySelector('.languages')||toggle);
 header.append(cta);
 toggle.setAttribute('aria-expanded','false');
 toggle.querySelector('.sr-only').textContent=document.documentElement.lang==='en'?'Open menu':'Abrir menú';
 document.documentElement.classList.remove('nav-locked');
 dialog.classList.remove('leaving');
 closeAnimation=null;
 position(true);
}
function openMenu(){
 if(!mobile.matches||dialog.open)return;
 dialog.append(nav,cta);
 dialog.showModal();
 toggle.setAttribute('aria-expanded','true');
 document.documentElement.classList.add('nav-locked');
 close.focus({preventScroll:true});
}
function closeMenu(destination,immediate=false){
 if(!dialog.open)return;
 closeAnimation?.cancel();
 const finish=()=>{
  dialog.close();restore();
  if(destination){
   const target=document.querySelector(destination);
   window.studiosScroll.navigate(target,{hash:destination});
  }else (mobile.matches?toggle:active)?.focus({preventScroll:true});
 };
 if(immediate||reduced.matches){finish();return}
 dialog.classList.add('leaving');
 closeAnimation=dialog.animate([{opacity:1},{opacity:0}],{duration:160,easing:'ease-out'});
 closeAnimation.onfinish=finish;
}
toggle.addEventListener('click',openMenu);
close.addEventListener('click',()=>closeMenu());
dialog.addEventListener('cancel',e=>{e.preventDefault();closeMenu()});
dialog.addEventListener('click',e=>{
 const link=e.target.closest('a[href^="#"]');
 if(link){e.preventDefault();closeMenu(link.hash)}
});
dialog.addEventListener('keydown',e=>{
 if(e.key!=='Tab')return;
 const stops=[...dialog.querySelectorAll('button,a[href]')].filter(el=>el.getClientRects().length);
 if(e.shiftKey&&document.activeElement===stops[0]){e.preventDefault();stops.at(-1).focus()}
 if(!e.shiftKey&&document.activeElement===stops.at(-1)){e.preventDefault();stops[0].focus()}
});
mobile.addEventListener('change',()=>{if(!mobile.matches)closeMenu(null,true);position(true)});
document.addEventListener('languagechange',()=>{labels();position(true)});
window.addEventListener('scroll',scrollUpdate,{passive:true});
new ResizeObserver(()=>{position(true);scrollUpdate()}).observe(nav);
document.fonts.ready.then(()=>position(true));
labels();measureSections();readScroll();position(true);



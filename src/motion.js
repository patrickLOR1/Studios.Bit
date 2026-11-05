import './navigation.js';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {mountBand} from './poster.js';
gsap.registerPlugin(ScrollTrigger);

const chapters=[...document.querySelectorAll('.story-chapters a')];
function chapter(index){
 chapters.forEach((link,i)=>i===index?link.setAttribute('aria-current','location'):link.removeAttribute('aria-current'));
}
function translateChapters(){
 const en=document.documentElement.lang==='en';
 const names=en?['Find the opportunity','Explore solutions','Build my project']:['Encontrar la oportunidad','Explorar soluciones','Construir mi proyecto'];
 chapters.forEach((link,i)=>link.querySelector('span').textContent=names[i]);
 document.querySelector('.story-chapters').setAttribute('aria-label',en?'Project journey':'Recorrido del proyecto');
}
let media, cleanupBand, navContext;
function mount(){
 cleanupBand=mountBand();
 navContext=gsap.context(()=>{
  ['.decision','.services','#proyecto'].forEach((trigger,i)=>ScrollTrigger.create({
   trigger,start:'top 35%',onEnter:()=>chapter(i),onLeaveBack:()=>chapter(Math.max(0,i-1))
  }));
 });
 chapter(0);translateChapters();
 media=gsap.matchMedia();
 media.add({motion:'(prefers-reduced-motion: no-preference)',desktop:'(min-width: 901px) and (pointer: fine)'},context=>{
  if(!context.conditions.motion)return;
  const desktop=context.conditions.desktop;
  const interactive=desktop && !(navigator.hardwareConcurrency<=4);
  const disposers=[];
  const on=(target,event,listener,options)=>{target.addEventListener(event,listener,options);disposers.push(()=>target.removeEventListener(event,listener,options))};
  let lenis,tick;
  if(interactive){
   lenis=new Lenis({smoothWheel:true,syncTouch:false,anchors:true,duration:.85});
   lenis.on('scroll',ScrollTrigger.update);
   tick=time=>lenis.raf(time*1000);
   gsap.ticker.add(tick);
   document.documentElement.classList.add('motion-scroll');
  }
  const heading=document.querySelector('.hero h1');
  const original=[...heading.childNodes];
  const groups=[[]];
  original.forEach(node=>node.nodeName==='BR'?groups.push([]):groups.at(-1).push(node));
  const lines=groups.map(nodes=>{
   const mask=document.createElement('span');mask.className='intro-line';
   const phrase=document.createElement('span');phrase.className='intro-phrase';
   phrase.append(...nodes);mask.append(phrase);return mask;
  });
  heading.replaceChildren(...lines);
  const intro=gsap.timeline({defaults:{ease:'power3.out'}});
  intro.from('.nav .brand img',{clipPath:'inset(0 100% 0 0)',duration:.65,clearProps:'clipPath'},0)
   .from('.hero-signature img',{clipPath:'inset(0 100% 0 0)',duration:.65,clearProps:'clipPath'},0)
   .from('.hero-signature span',{x:10,opacity:.3,duration:.65,clearProps:'transform,opacity'},.12)
   .from('.orb',{scale:.65,rotation:-18,opacity:.4,duration:1.1,clearProps:'transform,opacity'},0)
   .from(lines.map(line=>line.firstChild),{yPercent:65,opacity:.65,duration:.85,stagger:.09,clearProps:'transform,opacity'},.12)
   .from('.hero-bottom',{y:14,opacity:.5,duration:.65,clearProps:'transform,opacity'},.45);
  gsap.to('.orb',{yPercent:desktop?24:10,scale:.76,rotation:28,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.5}});
  gsap.to('.hero h1',{xPercent:-2,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
  gsap.from('.manifesto-copy',{y:desktop?35:12,duration:.8,clearProps:'transform',scrollTrigger:{trigger:'.manifesto',start:'top 85%',once:true}});
  gsap.from('.decision h2',{xPercent:3,ease:'none',scrollTrigger:{trigger:'.decision',start:'top 90%',end:'center center',scrub:true}});

  const transform=gsap.timeline({scrollTrigger:{trigger:'.transformation',start:desktop?'top 65%':'top 75%',end:desktop?'bottom 45%':'bottom 75%',scrub:.35}});
  transform.from('.idea-orbit',{scale:.3,rotation:-90},0)
   .from('.build-frame',{scale:.35,rotation:-12,opacity:0},.15)
   .to('.idea-core',{scale:.35,opacity:0},.15)
   .to('.idea-orbit',{scale:1.3,opacity:.2},.2)
   .from('.build-nav i',{scaleX:0,stagger:.05,transformOrigin:'left'},.35)
   .from('.build-layout>*',{y:30,opacity:0,stagger:.1},.55)
   .from('.build-tiles i',{scaleY:0,transformOrigin:'bottom',stagger:.1},.8);
  transform.from('.transform-stages li',{x:10,stagger:.12,duration:.28},0);

  document.querySelectorAll('.service').forEach((service,index)=>{
   const art=service.querySelector('.demo-stage');
   const pieces=art.querySelectorAll(index===0?'.demo-landing>* , .demo-foot i':index===1?'.map-page':'.social-piece');
   const reveal=gsap.timeline({paused:true,defaults:{ease:'power3.out'}});
   reveal.fromTo(pieces,{y:20,rotation:index===2?-6:0},{y:0,rotation:0,opacity:1,stagger:.08,duration:.55,clearProps:'transform,opacity'});
   const play=()=>{if(!reveal.isActive())reveal.restart()};
   ScrollTrigger.create({trigger:service,start:'top 80%',once:true,onEnter:play});
   on(service,'pointerenter',play);on(service,'focusin',play);on(service,'pointerdown',play);
   if(interactive){
    const x=gsap.quickTo(art,'rotationY',{duration:.55,ease:'power3.out'});
    const y=gsap.quickTo(art,'rotationX',{duration:.55,ease:'power3.out'});
    on(service,'pointermove',e=>{const r=service.getBoundingClientRect();x(((e.clientX-r.left)/r.width-.5)*7);y(-((e.clientY-r.top)/r.height-.5)*5)},{passive:true});
    on(service,'pointerleave',()=>{x(0);y(0)});
   }
  });
  gsap.from('.project-bridge h2',{y:24,scale:.97,duration:.85,clearProps:'transform',scrollTrigger:{trigger:'.project-bridge',start:'top 80%',once:true}});
  gsap.from('.closing h2',{y:desktop?40:15,duration:.9,ease:'power3.out',clearProps:'transform',scrollTrigger:{trigger:'.closing',start:'top 80%',once:true}});
  gsap.fromTo('.closing-orb',{yPercent:15,rotation:-15},{yPercent:-10,rotation:20,ease:'none',scrollTrigger:{trigger:'.closing',start:'top bottom',end:'bottom top',scrub:.5}});
  if(interactive){
   const rings=document.querySelector('.orb i');
   const x=gsap.quickTo(rings,'x',{duration:.8,ease:'power3.out'});
   const y=gsap.quickTo(rings,'y',{duration:.8,ease:'power3.out'});
   on(document.querySelector('.hero'),'pointermove',e=>{const r=e.currentTarget.getBoundingClientRect();x(((e.clientX-r.left)/r.width-.5)*28);y(((e.clientY-r.top)/r.height-.5)*28)},{passive:true});
   on(document.querySelector('.hero'),'pointerleave',()=>{x(0);y(0)});
   document.querySelectorAll('.hero-cta,.closing-actions>a').forEach(button=>{
    const mx=gsap.quickTo(button,'x',{duration:.3}),my=gsap.quickTo(button,'y',{duration:.3});
    on(button,'pointermove',e=>{const r=button.getBoundingClientRect();mx(((e.clientX-r.left)/r.width-.5)*8);my(((e.clientY-r.top)/r.height-.5)*8)},{passive:true});
    on(button,'pointerleave',()=>{mx(0);my(0)});
   });
  }
  return ()=>{
   disposers.forEach(dispose=>dispose());
   if(tick)gsap.ticker.remove(tick);lenis?.destroy();
   document.documentElement.classList.remove('motion-scroll');
   if(lines[0]?.parentNode===heading)heading.replaceChildren(...original);
  };
 });
}
function unmount(){media?.revert();navContext?.revert();cleanupBand?.()}
let refreshFrame;
function refresh(){cancelAnimationFrame(refreshFrame);refreshFrame=requestAnimationFrame(()=>ScrollTrigger.refresh())}
document.addEventListener('languagechange',()=>{unmount();mount();refresh()});
document.addEventListener('labresize',refresh);
document.fonts.ready.then(refresh);
window.addEventListener('pagehide',unmount);
window.addEventListener('pageshow',event=>{if(event.persisted){mount();refresh()}});
mount();

let previousAmounts;
const amountTweens=new Set();
document.addEventListener('labchange',event=>{
 const values=[event.detail.once,event.detail.monthly];
 amountTweens.forEach(tween=>tween.kill());amountTweens.clear();
 if(previousAmounts && !matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.querySelectorAll('.lab-grid aside>strong').forEach((element,index)=>{
   if(previousAmounts[index]===values[index])return;
   const visual=document.createElement('span');visual.className='amount-animation';visual.setAttribute('aria-hidden','true');element.append(visual);
   const counter={value:previousAmounts[index]};
   const format=new Intl.NumberFormat(document.documentElement.lang==='en'?'en-US':'es-MX',{style:'currency',currency:'MXN',currencyDisplay:'code',maximumFractionDigits:0});
   const tween=gsap.to(counter,{value:values[index],duration:.32,ease:'power2.out',onUpdate:()=>visual.textContent=format.format(counter.value),onComplete:()=>{visual.remove();amountTweens.delete(tween)}});
   amountTweens.add(tween);
  });
 }
 previousAmounts=values;
});
window.addEventListener('pagehide',()=>{amountTweens.forEach(tween=>tween.kill());amountTweens.clear()});

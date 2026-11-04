import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
gsap.registerPlugin(ScrollTrigger);
const chapters=[...document.querySelectorAll('.story-chapters a')];
function updateChapterNav(){
 const en=document.documentElement.lang==='en';
 const names=en?['Find the opportunity','Explore solutions','Build my project']:['Encontrar la oportunidad','Explorar soluciones','Construir mi proyecto'];
 document.querySelector('.story-chapters')?.setAttribute('aria-label',en?'Project journey':'Recorrido del proyecto');
 chapters.forEach((link,i)=>link.querySelector('span').textContent=names[i]);
}
updateChapterNav();
document.addEventListener('languagechange',updateChapterNav);
function chapter(index){
 chapters.forEach((link,i)=>i===index?link.setAttribute('aria-current','location'):link.removeAttribute('aria-current'));
}
chapter(0);
['.decision','.services','#proyecto'].forEach((trigger,i)=>ScrollTrigger.create({
 trigger,start:'top 35%',onEnter:()=>chapter(i),onLeaveBack:()=>chapter(Math.max(0,i-1))
}));
const media = gsap.matchMedia();
media.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 901px) and (pointer: fine)' }, context => {
  if (!context.conditions.motion) return;
  const desktop = context.conditions.desktop;
  const thread=document.createElement('div');
  thread.className='chapter-thread';thread.setAttribute('aria-hidden','true');document.body.append(thread);
  gsap.to(thread,{scaleX:1,ease:'none',scrollTrigger:{trigger:'main',start:'top top',end:'bottom bottom',scrub:true}});
  gsap.from('.decision h2',{x:desktop?32:8,ease:'none',scrollTrigger:{trigger:'.decision',start:'top 95%',end:'center 55%',scrub:true}});
  gsap.from('.nav .brand', { x:-10, opacity:.75, duration:.65, ease:'power2.out', clearProps:'transform,opacity' });
  gsap.from('.project-inner>h2', {y:18, duration:.7, ease:'power3.out', clearProps:'transform', scrollTrigger:{trigger:'#proyecto',start:'top 85%',once:true}});
  let lenis, tick;
  if (desktop) {
    lenis = new Lenis({ smoothWheel: true, syncTouch: false, anchors: true, duration: 0.9 });
    lenis.on('scroll', ScrollTrigger.update);
    tick = time => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    document.documentElement.classList.add('motion-scroll');
  }
  if(desktop && !(navigator.hardwareConcurrency<=4)){
    gsap.fromTo('.manifesto-note',{y:24},{y:-14,ease:'none',scrollTrigger:{trigger:'.manifesto',scrub:true}});
    gsap.fromTo('.hero-cta',{scale:.96},{scale:1,duration:.5});
  }
  const heading=document.querySelector('.hero h1');
  const lines=[];
  for(const node of [...heading.childNodes]){
    if(node.nodeName==='BR'){lines.push([]);continue;}
    if(!lines.length)lines.push([]);
    lines.at(-1).push(node);
  }
  const fragments=lines.map(nodes=>{
    const line=document.createElement('span');
    line.className='intro-line';
    const phrase=document.createElement('b');
    phrase.style.cssText='display:inline-block;font-weight:inherit';
    for(const node of nodes){
      if(node.nodeType!==Node.TEXT_NODE){phrase.append(node);continue;}
      for(const chunk of node.textContent.split(/(\s+)/)){
        if(!chunk.trim()){phrase.append(chunk);continue;}
        const word=document.createElement('b');
        word.style.cssText='display:inline-block;font-weight:inherit';
        word.textContent=chunk;phrase.append(word);
      }
    }
    line.append(phrase);
    return line;
  });
  heading.replaceChildren(...fragments);
  const intro=gsap.timeline({defaults:{ease:'power3.out',clearProps:'transform,opacity'}});
  intro.from('.hero-kicker',{y:8,opacity:.8,duration:.4})
    .from(fragments.map(line=>line.firstChild),{yPercent:55,opacity:.7,stagger:.085,duration:.72},.08)
    .from(heading.querySelectorAll('b>b'),{x:desktop?9:3,stagger:.035,duration:.46},.1)
    .from('.hero-bottom',{y:12,opacity:.85,duration:.55},.36);
  gsap.utils.toArray('.manifesto-copy>p, .manifesto-note, .section-head, .why>h2, .why-grid article, .steps article, .service, .audience>p, .contact-copy, #project-form').forEach(el => {
    gsap.from(el, { y: desktop ? 22 : 10, duration: .65, ease: 'power2.out', clearProps: 'transform', scrollTrigger: { trigger: el, start: 'top 96%', once: true } });
  });
  if (desktop) gsap.to('.orb', { y: 80, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .6 } });
  return () => {
    if (tick) gsap.ticker.remove(tick);
    lenis?.destroy();
    thread.remove();
    document.documentElement.classList.remove('motion-scroll');
    if(fragments[0]?.parentNode===heading){
      heading.replaceChildren(...fragments.flatMap((line,index)=>[
        ...(index?[document.createElement('br')]:[]),...line.firstChild.childNodes
      ]));
    }
  };
});
document.fonts.ready.then(() => ScrollTrigger.refresh());
document.addEventListener('labresize',()=>requestAnimationFrame(()=>ScrollTrigger.refresh()));
document.addEventListener('languagechange',()=>requestAnimationFrame(()=>ScrollTrigger.refresh()));
import {mountPoster} from './poster.js';
mountPoster();

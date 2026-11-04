import {gsap} from 'gsap';

export function mountPoster(){
 const poster=document.querySelector('.poster');
 const words=[...poster.querySelectorAll('.poster-type span')];
 const controls=poster.querySelector('.poster-controls');
 const play=controls.querySelector('[data-play]');
 const next=controls.querySelector('[data-next]');
 const meter=controls.querySelector('i');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let current=0, paused=reduced.matches, visible=false, clock, slide, touchX;
 controls.hidden=false;
 poster.classList.add('mounted');
 function labels(){
  const english=document.documentElement.lang==='en';
  play.textContent=paused?'▶':'Ⅱ';
  play.setAttribute('aria-label',paused?(english?'Play':'Reproducir'):(english?'Pause':'Pausar'));
  next.setAttribute('aria-label',english?'Next category':'Siguiente categoría');
  controls.querySelector('output').textContent=String(current+1).padStart(2,'0')+' / 05';
  words.forEach((word,i)=>word.setAttribute('aria-hidden',String(i!==current)));
 }
 function timer(){
  clock?.kill();
  gsap.set(meter,{scaleX:0});
  if(!paused && visible && !document.hidden) clock=gsap.to(meter,{scaleX:1,duration:2.8,ease:'none',onComplete:()=>advance(1)});
 }
 function advance(direction){
  slide?.progress(1).kill();
  const previous=words[current];
  current=(current+direction+words.length)%words.length;
  const word=words[current];
  gsap.set(word,{visibility:'visible'});
  slide=gsap.timeline({defaults:{duration:reduced.matches?0:.52,ease:'power3.inOut'}});
  slide.to(previous,{xPercent:-direction*104,opacity:.25},0)
       .fromTo(word,{xPercent:direction*104,opacity:.5,scale:.97},{xPercent:0,opacity:1,scale:1},0)
       .set(previous,{visibility:'hidden'});
  labels();timer();
 }
 function pause(){paused=true;labels();timer();}
 next.onclick=()=>{pause();advance(1)};
 play.onclick=()=>{paused=!paused;labels();timer()};
 poster.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')clock?.pause()});
 poster.addEventListener('pointerleave',()=>{if(!paused)clock?.resume()});
 poster.addEventListener('focusin',()=>clock?.pause());
 poster.addEventListener('focusout',e=>{if(!poster.contains(e.relatedTarget)&&!paused)clock?.resume()});
 poster.addEventListener('touchstart',e=>{touchX=e.touches[0].clientX},{passive:true});
 poster.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-touchX;if(Math.abs(dx)>40){pause();advance(dx<0?1:-1)}},{passive:true});
 new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;timer()}).observe(poster);
 document.addEventListener('visibilitychange',timer);
 document.addEventListener('languagechange',labels);
 reduced.addEventListener('change',()=>{slide?.progress(1);pause()});
 labels();
}

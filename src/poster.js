import {gsap} from 'gsap';

// The second group is an inaccessible visual copy. Travel equals one exact group width.
export function mountBand(){
 const band=document.querySelector('.audience-band');
 const track=band.querySelector('.band-track');
 const group=track.firstElementChild;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 let tween, stopped=false, visible=false, hovered=false;
 function sync(){
  const pause=stopped || reduce.matches || !visible || document.hidden || hovered || band.contains(document.activeElement);
  tween?.paused(pause);
 }
 function rebuild(){
  tween?.kill();
  track.querySelector('.band-clone')?.remove();
  gsap.set(track,{x:0});
  band.classList.toggle('band-ready',!reduce.matches);
  if(reduce.matches)return;
  const clone=group.cloneNode(true);
  clone.classList.add('band-clone');
  clone.setAttribute('aria-hidden','true');
  track.append(clone);
  const distance=group.getBoundingClientRect().width;
  tween=gsap.to(track,{x:-distance,duration:distance/(innerWidth<600?36:50),repeat:-1,ease:'none',paused:true});
  sync();
 }
 const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync()});
 observer.observe(band);
 const resize=new ResizeObserver(rebuild);
 resize.observe(band);
 const enter=()=>{hovered=true;sync()};
 const leave=()=>{hovered=false;sync()};
 const focusOut=()=>queueMicrotask(sync);
 const escape=event=>{if(event.key==='Escape'){stopped=true;sync()}};
 band.addEventListener('pointerenter',enter);
 band.addEventListener('pointerleave',leave);
 band.addEventListener('focusin',sync);
 band.addEventListener('focusout',focusOut);
 band.addEventListener('keydown',escape);
 document.addEventListener('visibilitychange',sync);
 document.addEventListener('languagechange',rebuild);
 reduce.addEventListener('change',rebuild);
 let alive=true;
 document.fonts.ready.then(()=>{if(alive)rebuild()});
 rebuild();
 return ()=>{
  alive=false;tween?.kill();observer.disconnect();resize.disconnect();
  band.removeEventListener('pointerenter',enter);band.removeEventListener('pointerleave',leave);
  band.removeEventListener('focusin',sync);band.removeEventListener('focusout',focusOut);band.removeEventListener('keydown',escape);
  document.removeEventListener('visibilitychange',sync);document.removeEventListener('languagechange',rebuild);
  reduce.removeEventListener('change',rebuild);track.querySelector('.band-clone')?.remove();
  gsap.set(track,{clearProps:'transform'});band.classList.remove('band-ready');
 };
}

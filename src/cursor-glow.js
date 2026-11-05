const halo=document.querySelector('.cursor-glow');
const enabled=matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)');
let frame=0,previous=0,x=0,y=0,aimX=0,aimY=0,lit=false;
function hide(){
 lit=false;halo.classList.remove('is-lit');
 cancelAnimationFrame(frame);frame=0;previous=0;
}
function paint(time){
 const weight=previous?1-Math.exp(-Math.min(time-previous,64)/55):1;
 previous=time;
 x+=(aimX-x)*weight;y+=(aimY-y)*weight;
 halo.style.transform='translate3d('+x+'px,'+y+'px,0)';
 frame=Math.abs(aimX-x)+Math.abs(aimY-y)>.25?requestAnimationFrame(paint):0;
}
function move(event){
 if(event.pointerType!=='mouse'){hide();return}
 aimX=event.clientX;aimY=event.clientY;
 if(!lit){lit=true;halo.classList.add('is-lit')}
 if(!frame){
  if(previous)previous=performance.now();
  frame=requestAnimationFrame(paint);
 }
}
function visibility(){if(document.hidden)hide()}
function configure(){
 hide();
 if(enabled.matches){
  window.addEventListener('pointermove',move,{passive:true});
  document.documentElement.addEventListener('pointerleave',hide);
  window.addEventListener('blur',hide);
  document.addEventListener('visibilitychange',visibility);
 }else{
  window.removeEventListener('pointermove',move);
  document.documentElement.removeEventListener('pointerleave',hide);
  window.removeEventListener('blur',hide);
  document.removeEventListener('visibilitychange',visibility);
 }
}
enabled.addEventListener('change',configure);
window.addEventListener('pagehide',hide);
configure();


(() => {
 const header=document.querySelector('.nav');
 const chapters=document.querySelector('.story-chapters');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let engine;
 let cancelNavigation=()=>{};
 for(const event of ["wheel","touchstart","pointerdown","keydown"])window.addEventListener(event,()=>cancelNavigation(),{passive:true});
 let navigationInset;
 function measureBars(){
  const height=header.offsetHeight;
  const pinned=chapters && getComputedStyle(chapters).position==='sticky';
  navigationInset=height+(pinned?chapters.offsetHeight:0)+8;
  const root=document.documentElement.style;
  root.setProperty('--header-height',height+'px');
  root.setProperty('--navigation-inset',navigationInset+'px');
 }
 const barSizes=new ResizeObserver(measureBars);
 barSizes.observe(header);
 if(chapters)barSizes.observe(chapters);
 matchMedia('(max-width:800px)').addEventListener('change',measureBars);
 measureBars();
 function inset(){return navigationInset}
 function layoutTop(target){
  let top=0;
  for(let node=target;node;node=node.offsetParent)top+=node.offsetTop;
  return top;
 }
 function navigate(target,{focus=target,hash,nearest=false}={}){
  if(!target)return;
  const topInset=inset();
  const rect=target.getBoundingClientRect();
  if(hash && location.hash!==hash)history.pushState(null,'',hash);
  if(focus){
   if(!focus.matches('a[href],input,button,select,textarea,[tabindex]'))focus.tabIndex=-1;
   focus.focus({preventScroll:true});
  }
  if(nearest && rect.top>=topInset && rect.bottom<=innerHeight)return;
  cancelNavigation();
  const destination=()=>target.id==='inicio'?0:Math.max(0,layoutTop(target)-inset());
  let y=destination();
  const move=()=>{
   if(engine)engine.scrollTo(y,{duration:.55,easing:t=>1-Math.pow(1-t,3),immediate:reduced.matches});
   else window.scrollTo({top:y,behavior:reduced.matches?'instant':'smooth'});
  };
  move();
  // Responsive text and hover/focus transitions can change layout during a trip.
  // Follow the destination briefly, and release immediately on user input.
  const observer=new ResizeObserver(()=>{
   const next=destination();
   if(Math.abs(next-y)>1){y=next;move();}
  });
  document.querySelectorAll('main>section,.nav').forEach(el=>observer.observe(el));
  const settle=()=>{
   const next=destination();
   if(Math.abs(scrollY-next)>1){
    y=next;
    if(engine)engine.scrollTo(y,{immediate:true});
    else window.scrollTo({top:y,behavior:'instant'});
   }
  };
  window.addEventListener('scrollend',settle);
  const stop=()=>{observer.disconnect();window.removeEventListener('scrollend',settle)};
  const timer=setTimeout(stop,2200);
  cancelNavigation=()=>{stop();clearTimeout(timer)};

 }
 document.addEventListener('click',event=>{
  if(event.defaultPrevented || event.button!==0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)return;
  const link=event.target.closest('a[href^="#"]');
  if(!link || link.target==='_blank')return;
  const target=document.getElementById(link.hash.slice(1));
  if(target){event.preventDefault();navigate(target,{hash:link.hash})}
 });
 window.studiosScroll={navigate,setEngine(value){engine=value},inset,layoutTop};
})();

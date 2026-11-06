export function renderPrototype(state,lang){
 const en=lang==='en';
 const web=state.web!=='none';
 const count=5+Math.max(0,Math.min(50,Number(state.units)||0));
 const pieces=({essential:8,growth:12,integral:16})[state.plan]||0;
 const kind=state.web==='corporate'?(en?'pages':'páginas'):(en?'sections':'secciones');
 const caption=web?count+' '+kind:'';
 const language=state.bilingual?'ES / EN':lang.toUpperCase();
 return '<div class="project-prototype" data-web="'+state.web+'" data-plan="'+state.plan+'" data-bilingual="'+state.bilingual+'">'+
 '<div class="prototype-label"><b>S.</b><span>'+(en?'YOUR PROJECT / CONCEPT':'TU PROYECTO / CONCEPTO')+'</span></div>'+
 (web?'<div class="prototype-browser"><div class="prototype-nav"><span>● ● ●</span><b>'+language+'</b></div><div class="prototype-hero"><div><b>'+(en?'Your next chapter.':'Tu siguiente capítulo.')+'</b><i></i><span><svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg></span></div><div class="prototype-shape"></div></div><div class="prototype-pages" aria-hidden="true">'+Array.from({length:Math.min(count,12)},(_,i)=>'<i><small>'+String(i+1).padStart(2,'0')+'</small><span></span></i>').join('')+'</div><p>'+caption+(count>12?' · '+(en?'simplified view':'vista simplificada'):'')+'</p></div>':'')+
 (pieces?'<div class="prototype-social"><p>'+pieces+' '+(en?'pieces / month':'piezas / mes')+'</p><div aria-hidden="true">'+Array.from({length:pieces},(_,i)=>'<i class="format-'+i%3+'">'+(i%3===0?'<svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg>':i%3===1?'▶':'S.')+'</i>').join('')+'</div></div>':'')+
 (!web&&!pieces?'<p>'+(en?'Select a service to shape your project.':'Elige un servicio para darle forma a tu proyecto.')+'</p>':'')+
 '<div class="prototype-tags">'+(web&&state.bilingual?'<span>ES ↔ EN</span>':'')+(web&&state.copy?'<span>'+(en?'Copywriting':'Redacción')+'</span>':'')+(web&&state.motion?'<span>'+(en?'Motion design':'Diseño animado')+'</span>':'')+'</div></div>';
}

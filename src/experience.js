import {renderPrototype} from './prototype.js';
import {booking,prices,estimate} from './pricing.js';
const initial={goal:'leads',presence:'none',web:'landing',plan:'none',units:0,bilingual:false,copy:false,motion:false,custom:false};
const state={...initial};
const content=(lang,s)=> {
 const t=(es,en)=>lang==='en'?en:es;
 const money=n=>new Intl.NumberFormat(lang==='en'?'en-US':'es-MX',{style:'currency',currency:'MXN',currencyDisplay:'code',maximumFractionDigits:0}).format(n);
 const q=estimate(s);
 const options=(key,items)=>items.map(([value,label])=>'<option value="'+value+'" '+(s[key]===value?'selected':'')+'>'+label+'</option>').join('');
 const select=(key,label,items)=>'<label>'+label+'<select data-field="'+key+'">'+options(key,items)+'</select></label>';
 const check=(key,label)=>'<label class="check"><input type="checkbox" data-field="'+key+'" '+(s[key]?'checked':'')+'>'+label+'</label>';
 const book=renderBook(lang);
 const services={landing:t('Página de captación','Landing page'),corporate:t('Sitio corporativo','Corporate website'),social:t('Redes sociales','Social media')};
 const recommendation=s.goal==='leads'?'landing':s.goal==='catalog'?'corporate':'social';
 const reason={landing:t('Una oferta y una acción clara ayudan a que una visita se convierta en consulta.','One offer and a clear next step give visitors a direct path to an enquiry.'),corporate:t('Las páginas independientes dan a cada servicio el contexto que necesita.','Separate pages give each service room for detail.'),social:t('Un calendario editorial da continuidad a la conversación con tu audiencia.','An editorial calendar keeps the conversation with your audience going.')}[recommendation];
 const webScope=s.web==='corporate'?t('Hasta cinco páginas con estructura de servicios y contacto.','Up to five pages covering services and contact.'):t('Una página con hasta cinco secciones y una acción principal.','One page with up to five sections and one primary action.');
 const plans={essential:t('Esencial · una red, ocho piezas y reporte mensual básico.','Essential · one network, eight pieces and a basic monthly report.'),growth:t('Crecimiento · hasta dos redes, doce piezas originales y hasta dos reels sencillos con tu material. Calendario y reporte mensual.','Growth · up to two networks, twelve original pieces and up to two simple reels using your footage. Editorial calendar and monthly report.'),integral:t('Integral · hasta dos redes, dieciséis piezas originales, hasta cuatro reels con tu material, seguimiento estratégico y reporte.','Comprehensive · up to two networks, sixteen original pieces, up to four reels using your footage, strategic follow-up and reporting.')};
 const rows=[[t('Base web','Website base'),q.base],[t('Estructura adicional','Additional structure'),q.structure],[t('Redacción','Copywriting'),q.writing],[t('Segundo idioma','Second language'),q.language],[t('Animación adicional · desde','Additional motion · from'),q.motion]];
 const notice=t('Estimación orientativa, sujeta a revisión. IVA por determinar según corresponda. Dominio, hosting, licencias y gastos externos se cotizan aparte.','Indicative estimate subject to scope review. Applicable VAT to be confirmed. Domain, hosting, licences and external expenses are quoted separately.');
 const summary=[services[s.web]||'',...rows.filter(x=>x[1]).map(x=>x[0]+': '+money(x[1])),t('Pago único','One-time')+': '+money(q.once),t('Mensual','Monthly')+': '+money(q.monthly),plans[s.plan]||'',s.web!=='none'&&s.custom?t('Funciones especiales pendientes de cotización.','Custom features require a separate quote.'):'',notice].filter(Boolean).join('\n');
 const faqs=[
 [t('¿Qué es Studios.Bit?','What is Studios.Bit?'),t('Una agencia de soluciones digitales, marketing y redes sociales. Trabajamos con negocios que necesitan explicar su oferta y facilitar el contacto.','A digital solutions, marketing and social media agency for businesses that need to explain their offer and make it easy to get in touch.')],
 [t('¿Cuándo conviene una landing o un sitio corporativo?','When should I choose a landing page or a corporate website?'),t('Una landing presenta una oferta y guía hacia una acción. Un sitio corporativo distribuye varias líneas de servicio en páginas propias.','A landing page focuses on one offer and action. A corporate site gives each service its own page.')],
 [t('¿Cuánto cuesta una web y cómo se cotiza?','How much does a website cost and how is it estimated?'),t('El punto de partida para una landing es ','Landing pages start at ')+money(prices.landing)+t(' y para un sitio corporativo, ',' and corporate websites at ')+money(prices.corporate)+t('. Ajusta estructura, idiomas y extras en el cotizador y solicita la revisión del alcance.','. Adjust structure, languages and extras in the estimator, then request a scope review.')],
 [t('¿Qué incluye la gestión de redes?','What does social media management include?'),t('Planeación, diseño, redacción, programación y reporte. El número de redes, piezas y reels depende del plan. Producción presencial, anuncios y atención intensiva de mensajes requieren otro alcance.','Planning, design, writing, scheduling and reporting. Channels, content volume and reels depend on the plan. On-site production, advertising and intensive inbox management require a separate scope.')],
 [t('¿Cómo agendo y qué preparo?','How do I book and what should I prepare?'),t('Reserva una asesoría web en Setmore. Ten a mano tus objetivos, oferta, materiales disponibles y fecha deseada.','Book a web consultation through Setmore. Bring your goals, offer, available assets and desired timing.')]];
 return {summary,book,html:`<div class="project-inner"><p class="mono eyebrow">STUDIOS.BIT / ${t('LABORATORIO DE PROYECTO','PROJECT LAB')}</p><h2>${t('Construye tu proyecto','Build your project')}<em>.</em></h2><p>${t('Una visita sin un siguiente paso es una conversación que puede perderse. Empieza por lo que quieres que suceda.','A visit without a next step can become a missed conversation. Start with what you want to happen.')}</p>
 <div class="lab-grid"><div><section data-panel="0"><h3>01 / ${t('Encuentra tu punto de partida','Find your starting point')}</h3>
 ${select('goal',t('Mi objetivo principal','My primary goal'),[['leads',t('Generar consultas','Generate enquiries')],['catalog',t('Explicar varios servicios','Explain several services')],['community',t('Mantener una comunidad','Engage my community')]])}
 ${select('presence',t('Presencia actual','Current presence'),[['none',t('Empiezo desde cero','Starting from scratch')],['existing',t('Ya tengo canales activos','Existing channels')]])}
 <div class="concept"><small>${t('PROYECTO CONCEPTUAL','CONCEPT PROJECT')}</small><h4>${services[recommendation]}</h4><b>${t('Tu oferta','Your offer')} → ${t('Contexto','Context')} → ${t('Conversación','Conversation')}</b><p>${reason} ${s.presence==='existing'?t('Partiríamos de una revisión de tus canales actuales.','We would first review your existing channels.'):t('Empezaríamos definiendo tu oferta y audiencia.','We would start by defining your offer and audience.')}</p><button type="button" data-action="apply">${t('Usar esta recomendación','Use this recommendation')} <svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg></button></div>
 </section><section data-panel="1"><h3>02 / ${t('Define el alcance','Shape the scope')}</h3>
 ${select('web',t('Desarrollo web','Web development'),[['none',t('Sin desarrollo web','No website')],['landing',services.landing],['corporate',services.corporate]])}
 ${s.web!=='none'?`<p>${webScope} ${t('Diseño adaptable, SEO técnico básico, contacto acordado y dos rondas de revisión. El enlace a Setmore puede incluirse.','Responsive design, basic technical SEO, agreed contact integration and two revision rounds. A Setmore link can be included.')}</p>
 <label>${s.web==='landing'?t('Secciones adicionales','Extra sections'):t('Páginas adicionales','Extra pages')}<input type="number" min="0" max="50" value="${s.units}" data-field="units"></label>
 ${check('copy',t('Redacción comercial','Commercial copywriting'))}${check('bilingual',t('Segundo idioma (+'+Math.round(prices.bilingual*100)+'% sobre base y estructura adicional)','Second language (+'+Math.round(prices.bilingual*100)+'% of base and additional structure)'))}${check('motion',t('Animaciones adicionales','Additional motion'))}${check('custom',t('CMS, CRM, tienda, reservas especiales o desarrollo a medida · cotización aparte','CMS, CRM, shop, advanced bookings or custom development · separate quote'))}` : ''}
 ${select('plan',t('Gestión mensual de redes','Monthly social media'),[['none',t('Sin plan mensual','No monthly plan')],...Object.entries(plans).map(([k,v])=>[k,v.split(' · ')[0]])])}
 <p>${plans[s.plan]||''}</p></section></div>
 <aside><small>03 / ${t('INVERSIÓN ESTIMADA','ESTIMATED INVESTMENT')}</small><dl>${rows.filter(x=>x[1]).map(([label,n])=>'<div><dt>'+label+'</dt><dd>'+money(n)+'</dd></div>').join('')}</dl><p>${t('Subtotal · pago único','Subtotal · one-time')}</p><strong>${money(q.once)}</strong><p>${t('Subtotal · mensualidad','Subtotal · monthly')}</p><strong>${money(q.monthly)}</strong><dl><div><dt>IVA</dt><dd>${t('Por confirmar','To be confirmed')}</dd></div></dl><p>${notice}</p>
 <h3>04 / ${t('Siguiente paso','Next step')}</h3><button type="button" data-action="proposal">${t('Solicitar propuesta personalizada','Request a tailored proposal')} <svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg></button><button type="button" data-action="copy">${t('Copiar mi estimación','Copy my estimate')}</button>${book}<p role="status" id="lab-status"></p></aside></div>
 <h3>${t('Antes de empezar','Before you start')}</h3>${faqs.map(([q,a])=>'<details><summary>'+q+'</summary><p>'+a+'</p></details>').join('')}</div>`};
};
export function renderLab(lang){return content(lang,initial).html;}
export function renderBook(lang){
 const label=lang==='en'?'Book a free web consultation':'Agendar asesoría gratuita';
 return '<a class="book-link" target="_blank" rel="noopener noreferrer" href="'+booking+'">'+label+' <svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg></a>';
}
const drawings={
 leads:'<rect x="16" y="16" width="78" height="7"/><rect x="16" y="34" width="144" height="5"/><rect x="16" y="52" width="64" height="17" fill="currentColor"/><circle cx="202" cy="43" r="26" fill="currentColor"/>',
 catalog:'<rect x="16" y="14" width="100" height="7"/><path d="M16 30h208" stroke="white"/><path d="M16 40h58v28H16z M84 40h58v28H84z" fill="#9ca3af"/><rect x="152" y="40" width="70" height="28" fill="currentColor"/>',
 community:'<rect x="16" y="14" width="57" height="57" fill="currentColor"/><circle cx="44" cy="43" r="15" fill="#0b0b0d"/><rect x="88" y="14" width="57" height="57"/><path d="M90 69l30-46 24 46z" fill="#0b0b0d"/><rect x="160" y="14" width="57" height="57" fill="currentColor"/>'
};
if(typeof document!=='undefined'){
 const lab=document.querySelector('#proyecto');
 let step=0;
 const sessionKey='studios.project.v2';
 try{
  const draft=JSON.parse(sessionStorage.getItem(sessionKey)||'{}');
  for(const [key,allowed] of Object.entries({web:['none','landing','corporate'],plan:['none','essential','growth','integral'],goal:['leads','catalog','community'],presence:['none','existing']}))if(allowed.includes(draft[key]))state[key]=draft[key];
  for(const key of ['copy','motion','custom','bilingual'])state[key]=draft[key]===true;
  state.units=Math.min(50,Math.max(0,Math.floor(Number(draft.units)||0)));
  if([0,1,2].includes(draft.step))step=draft.step;
 }catch{}
 function save(){try{sessionStorage.setItem(sessionKey,JSON.stringify({...state,step,lang:document.documentElement.lang}));}catch{}}
 function brief(lang,s){
  const en=lang==='en';
  const goals=en?{leads:'Generate enquiries',catalog:'Explain services',community:'Engage a community'}:{leads:'Generar consultas',catalog:'Explicar servicios',community:'Mantener una comunidad'};
  return ['Studios.Bit · '+lang.toUpperCase(),goals[s.goal],s.presence==='existing'?(en?'Existing channels':'Canales activos'):(en?'Starting from scratch':'Presencia nueva'),s.web!=='none'&&s.units?(en?'Additional units: ':'Unidades adicionales: ')+s.units:'',content(lang,s).summary].filter(Boolean).join('\n');
 }
 function go(value){
  if(value===2 && step!==2 && (state.web!=='none'||state.plan!=='none')) document.dispatchEvent(new Event('studios:quote-complete'));
  step=value;refresh();
  const nav=lab.querySelector('.lab-steps');window.studiosScroll.navigate(nav,{focus:nav.querySelector('[aria-current=step]')});
 }
 function enhance(){
  const lang=document.documentElement.lang,en=lang==='en';
  const names=en?['Direction','Scope','Project brief']:['Dirección','Alcance','Resumen'];
  const grid=lab.querySelector('.lab-grid');
  grid.insertAdjacentHTML('beforebegin','<nav class="lab-steps" aria-label="'+(en?'Project steps':'Pasos del proyecto')+'">'+names.map((name,i)=>'<button type="button" data-step="'+i+'" '+(step===i?'aria-current="step"':'')+'>0'+(i+1)+' / '+name+'</button>').join('')+'</nav>');
  grid.dataset.stage=step;
  lab.querySelectorAll('[data-panel]').forEach(panel=>panel.hidden=Number(panel.dataset.panel)!==step);
  for(const select of lab.querySelectorAll('select[data-field]')){
   const deck=document.createElement('fieldset');deck.className='choice-deck';
   const legend=document.createElement('legend');legend.textContent=select.parentNode.firstChild.textContent;deck.append(legend);
   select.parentElement.hidden=true;select.parentElement.after(deck);
   for(const option of select.options){
    const button=document.createElement('button');button.type='button';button.dataset.pick=select.dataset.field;button.dataset.value=option.value;button.setAttribute('aria-pressed',String(option.selected));button.textContent=option.textContent;
    button.onclick=()=>{select.value=option.value;select.dispatchEvent(new Event('change',{bubbles:true}));};deck.append(button);
   }
  }

  lab.querySelector('[data-panel="1"]').insertAdjacentHTML('beforeend','<div class="scope-art">'+renderPrototype(state,lang)+'</div><button type="button" data-step="2">'+(en?'Review my project':'Revisar mi proyecto')+' <svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg></button>');
  const caption=document.createElement('p');
  caption.className='scope-caption';
  const describeScope=()=>{
   const parts=[];
   if(state.web!=='none'){
    parts.push((5+state.units)+' '+(state.web==='landing'?(en?'sections':'secciones'):(en?'pages':'páginas')));
    parts.push(state.bilingual?'ES / EN':(en?'One language':'Un idioma'));
    if(state.motion)parts.push(en?'Motion design':'Diseño animado');
   }
   if(state.plan!=='none')parts.push(({essential:8,growth:12,integral:16})[state.plan]+' '+(en?'pieces / month':'piezas / mes'));
   return parts.join(' · ');
  };
  caption.textContent=describeScope();
  lab.querySelector('.scope-art').append(caption);
  const quantity=lab.querySelector('[data-field=units]');
  quantity?.addEventListener('input',()=>queueMicrotask(()=>{
   caption.textContent=describeScope();
   lab.querySelector('.project-prototype').outerHTML=renderPrototype(state,lang);
  }));
  if(step===2){
   const preview=document.createElement('pre');preview.className='final-brief';preview.textContent=brief(lang,state);grid.firstElementChild.append(preview);
   lab.querySelector('[data-action=copy]').insertAdjacentHTML('afterend','<button type="button" data-action="download">'+(en?'Download brief':'Descargar resumen')+'</button>');
   lab.querySelector('aside .book-link').insertAdjacentHTML('afterend','<p>'+(en?'Bring your brief to the call. Setmore opens the booking calendar only.':'Lleva tu resumen a la asesoría. Setmore solo abre el calendario.')+'</p>');
  }
  save();
 }
 const refresh=()=>{lab.innerHTML=content(document.documentElement.lang,state).html;
 lab.querySelector('.concept h4').insertAdjacentHTML('afterend','<svg aria-hidden="true" viewBox="0 0 240 84" fill="#f5f5f5"><rect width="240" height="84" fill="#0b0b0d"/>'+drawings[state.goal]+'</svg>');
 enhance();document.dispatchEvent(new CustomEvent('labchange',{detail:estimate(state)}));document.dispatchEvent(new Event('labresize'));};
 lab.addEventListener('input',event=>{
  if(event.target.dataset.field!=='units')return;
  state.units=Math.min(50,Math.max(0,Math.floor(Number(event.target.value)||0)));
  const calculated=document.createElement('template');
  calculated.innerHTML=content(document.documentElement.lang,state).html;
  lab.querySelector('aside').replaceWith(calculated.content.querySelector('aside'));save();document.dispatchEvent(new CustomEvent('labchange',{detail:estimate(state)}));
 });
 lab.addEventListener('change',event=>{const el=event.target,key=el.dataset.field;if(!key)return;state[key]=el.type==='checkbox'?el.checked:key==='units'?Math.min(50,Math.max(0,Math.floor(Number(el.value)||0))):el.value;refresh();(lab.querySelector('[data-pick="'+key+'"][aria-pressed=true]')||lab.querySelector('[data-field="'+key+'"]'))?.focus({preventScroll:true});});
 lab.addEventListener('click',async event=>{
 const next=event.target.closest('button[data-step]');if(next){go(Number(next.dataset.step));return;}
 const action=event.target.closest('button')?.dataset.action;if(!action)return;
 const lang=document.documentElement.lang;
 if(action==='apply'){state.web=state.goal==='community'?'none':state.goal==='catalog'?'corporate':'landing';state.plan=state.goal==='community'?'essential':'none';go(1);return;}
 const summary=brief(lang,state);
 if(action==='download'){const url=URL.createObjectURL(new Blob([summary],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='StudiosBit-'+lang+'.txt';link.click();document.dispatchEvent(new Event('studios:brief-download'));setTimeout(()=>URL.revokeObjectURL(url),3000);return;}
 if(action==='copy'){try{await navigator.clipboard.writeText(summary);lab.querySelector('#lab-status').textContent=lang==='es'?'Estimación copiada.':'Estimate copied.';}catch{lab.querySelector('#lab-status').textContent=summary;}return;}
 const details=document.querySelector('#details');
 const notes=details.dataset.lastQuote?details.value.replace(details.dataset.lastQuote,'').trim():details.value.trim();
 details.value=[notes,summary].filter(Boolean).join('\n\n');
 details.dataset.lastQuote=summary;
 details.dataset.quoteState=JSON.stringify(state);
 document.querySelector('#service').value=state.web!=='none'?state.web:state.plan!=='none'?'social':'other';details.dispatchEvent(new Event('input',{bubbles:true}));window.studiosScroll.navigate(document.querySelector('#contacto'),{focus:document.querySelector('#name')});
 });
 document.addEventListener('languagechange',()=>{
  document.querySelectorAll('[data-book]').forEach(el=>el.innerHTML=renderBook(document.documentElement.lang));
  refresh();
  const details=document.querySelector('#details');
  if(details.dataset.lastQuote && details.value.includes(details.dataset.lastQuote)){
   const translated=brief(document.documentElement.lang,JSON.parse(details.dataset.quoteState));
   details.value=details.value.replace(details.dataset.lastQuote,translated);
   details.dataset.lastQuote=translated;
   if(!document.querySelector('.message-result').hidden)document.dispatchEvent(new Event('refreshdraft'));
  }
 });refresh();
}

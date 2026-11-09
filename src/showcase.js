const range=document.querySelector('#compare-range');
const demo=document.querySelector('.compare-demo');
const help=document.querySelector('#compare-help');

function updateComparison(){
  if(!range||!demo)return;
  const value=Number(range.value);
  demo.style.setProperty('--progress',String(value/100));
  demo.dataset.compareState=value===0?'before':value===100?'after':'balanced';
  const en=document.documentElement.lang==='en';
  range.setAttribute('aria-valuetext',en?`${value}% improved`:`${value}% mejorada`);
  help.textContent=en?`Use arrow keys or drag. ${value}% improved.`:`Usa las flechas del teclado o desliza. ${value}% mejorada.`;
}

range?.addEventListener('input',updateComparison);
document.addEventListener('languagechange',updateComparison);
updateComparison();

const conceptDetails={
 coffee:{es:['En móvil, el empaque abre la historia y la reserva permanece a un toque.','Demuestra narrativa de producto, jerarquía y microinteracciones de comercio.'],en:['On mobile, the pack opens the story and reservation remains one tap away.','Shows product storytelling, hierarchy and commerce microinteractions.']},
 architecture:{es:['En móvil, la retícula se transforma en un índice vertical siempre orientado.','Demuestra arquitectura de información, galería y continuidad entre proyectos.'],en:['On mobile, the grid becomes a vertical index that stays oriented.','Shows information architecture, gallery design and continuity between projects.']},
 social:{es:['En móvil, el formato del día lidera sin perder la secuencia semanal.','Demuestra dirección de contenido, consistencia y adaptación multiformato.'],en:['On mobile, today’s format leads without losing the weekly sequence.','Shows content direction, consistency and multi-format adaptation.']}
};
document.querySelectorAll('.case').forEach((item,index)=>{
 const key=['coffee','architecture','social'][index];
 const panel=document.createElement('div');
 panel.className='case-expanded';panel.id='case-detail-'+key;panel.hidden=true;
 const button=document.createElement('button');
 button.type='button';button.className='case-open';button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls',panel.id);
 function translate(){
  const en=document.documentElement.lang==='en',copy=conceptDetails[key][en?'en':'es'];
  button.textContent=panel.hidden?(en?'EXPLORE CONCEPT':'EXPLORAR CONCEPTO'):(en?'CLOSE STUDY':'CERRAR ESTUDIO');
  panel.innerHTML='<p><b>'+(en?'MOBILE VIEW':'VISTA MÓVIL')+'</b>'+copy[0]+'</p><p><b>'+(en?'CAPABILITY SHOWN':'CAPACIDAD DEMOSTRADA')+'</b>'+copy[1]+'</p>';
 }
 button.addEventListener('click',()=>{panel.hidden=!panel.hidden;button.setAttribute('aria-expanded',String(!panel.hidden));translate();if(!panel.hidden)panel.focus({preventScroll:true})});
 panel.tabIndex=-1;item.querySelector('.case-story').append(button,panel);translate();
 document.addEventListener('languagechange',translate);
});

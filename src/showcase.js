const range=document.querySelector('#compare-range');
const demo=document.querySelector('.compare-demo');
const help=document.querySelector('#compare-help');

function updateComparison(){
  if(!range||!demo)return;
  const value=Number(range.value);
  demo.style.setProperty('--split',value+'%');
  const en=document.documentElement.lang==='en';
  range.setAttribute('aria-valuetext',en?`${value}% improved`:`${value}% mejorada`);
  help.textContent=en?`Use arrow keys or drag. ${value}% improved.`:`Usa las flechas del teclado o desliza. ${value}% mejorada.`;
}

range?.addEventListener('input',updateComparison);
document.addEventListener('languagechange',updateComparison);
updateComparison();

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; });

const services = [...document.querySelectorAll('.service')];
services.forEach(service => service.addEventListener('mouseenter', () => {
  services.forEach(item => item.classList.remove('active'));
  service.classList.add('active');
}));

const form = document.querySelector('#project-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const button = form.querySelector('button');
  const note = form.querySelector('.form-note');
  button.innerHTML = 'MENSAJE LISTO <span>✓</span>';
  note.textContent = 'GRACIAS. CONECTAREMOS CONTIGO MUY PRONTO.';
  form.reset();
});

document.querySelector('#year').textContent = new Date().getFullYear();


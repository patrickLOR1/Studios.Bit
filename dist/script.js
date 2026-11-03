const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; });

const services = [...document.querySelectorAll('.service')];
services.forEach(service => {
  const activate = () => {
    services.forEach(item => item.classList.remove('active'));
    service.classList.add('active');
  };
  service.addEventListener('mouseenter', activate);
  service.addEventListener('focusin', activate);
});

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');
const closeMenu = () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
  menuToggle.querySelector('.sr-only').textContent = 'Abrir menú';
};
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  document.body.classList.toggle('menu-open', !open);
  menuToggle.querySelector('.sr-only').textContent = open ? 'Abrir menú' : 'Cerrar menú';
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

document.querySelectorAll('.service-select').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#service').value = button.dataset.service;
  document.querySelector('#contacto').scrollIntoView({ behavior: 'smooth' });
  document.querySelector('#name').focus({ preventScroll: true });
}));

const form = document.querySelector('#project-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const data = new FormData(form);
  const message = `Hola Studios.Bit, soy ${data.get('name')}.\n\nMe interesa: ${data.get('service')}.\n\nProyecto: ${data.get('details')}\n\nMi correo de contacto es: ${data.get('email')}`;
  document.querySelector('#message-preview').textContent = message;
  document.querySelector('.message-result').hidden = false;
  document.querySelector('.message-result').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

document.querySelector('#copy-message').addEventListener('click', async () => {
  const status = document.querySelector('.copy-status');
  try {
    await navigator.clipboard.writeText(document.querySelector('#message-preview').textContent);
    status.textContent = 'MENSAJE COPIADO ✓';
  } catch {
    status.textContent = 'SELECCIONA EL TEXTO Y CÓPIALO MANUALMENTE.';
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();


const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => { if (matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; } }, { passive: true });

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
  menuToggle.querySelector('.sr-only').textContent = translate('Abrir menú','Open menu');
};
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  document.body.classList.toggle('menu-open', !open);
  menuToggle.querySelector('.sr-only').textContent = open ? translate('Abrir menú','Open menu') : translate('Cerrar menú','Close menu');
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

document.querySelectorAll('.service-select').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#service').value = button.dataset.service;
  document.querySelector('#contacto').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  document.querySelector('#name').focus({ preventScroll: true });
}));

const form = document.querySelector('#project-form');
const error = document.createElement('p');
error.id='form-error'; error.setAttribute('role','alert'); form.append(error);
const fields=[...form.querySelectorAll('input,select,textarea')];
fields.forEach(field=>field.setAttribute('aria-describedby','form-error'));
function validate() {
 fields.forEach(field=>field.setAttribute('aria-invalid',String(!field.validity.valid || !field.value.trim())));
 const invalid=fields.find(field=>!field.validity.valid || !field.value.trim());
 error.textContent=invalid ? translate('Completa todos los campos e introduce un correo electrónico válido.','Complete all fields and enter a valid email address.') : '';
 return invalid;
}
function prepare() {
 const data=new FormData(form);
 const service=document.querySelector('#service').selectedOptions[0].textContent;
 document.querySelector('#message-preview').textContent=translate(`Hola Studios.Bit, soy ${data.get('name')}.\n\nMe interesa: ${service}.\n\nProyecto: ${data.get('details')}\n\nMi correo: ${data.get('email')}`,`Hello Studios.Bit, I’m ${data.get('name')}.\n\nI’m interested in: ${service}.\n\nProject: ${data.get('details')}\n\nMy email: ${data.get('email')}`);
}
document.addEventListener('languagechange',()=>{if(error.textContent)validate(); if(!document.querySelector('.message-result').hidden)prepare();document.querySelector('.copy-status').textContent='';});
form.addEventListener('input',()=>{if(error.textContent)validate();document.querySelector('.message-result').hidden=true;});
form.addEventListener('submit', e => {
  e.preventDefault();
  const invalid=validate();
  if (invalid) {
    invalid.focus();
    return;
  }
  const data = new FormData(form);
  const message = `Hola Studios.Bit, soy ${data.get('name')}.\n\nMe interesa: ${data.get('service')}.\n\nProyecto: ${data.get('details')}\n\nMi correo de contacto es: ${data.get('email')}`;
  prepare();
  document.querySelector('.message-result').hidden = false;
  document.querySelector('.message-result').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest' });
});

document.querySelector('#copy-message').addEventListener('click', async () => {
  const status = document.querySelector('.copy-status');
  try {
    await navigator.clipboard.writeText(document.querySelector('#message-preview').textContent);
    status.textContent = translate('MENSAJE COPIADO ✓','MESSAGE COPIED ✓');
  } catch {
    status.textContent = translate('SELECCIONA EL TEXTO Y CÓPIALO MANUALMENTE.','SELECT THE TEXT AND COPY IT MANUALLY.');
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();

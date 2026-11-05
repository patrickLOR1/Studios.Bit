const services = [...document.querySelectorAll('.service')];
services.forEach(service => {
  const activate = () => {
    services.forEach(item => item.classList.remove('active'));
    service.classList.add('active');
  };
  service.addEventListener('mouseenter', activate);
  service.addEventListener('focusin', activate);
});

document.querySelectorAll('.service-select').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#service').value = button.dataset.service;
  document.querySelector('#service').dispatchEvent(new Event('input', { bubbles: true }));
  window.studiosScroll.navigate(document.querySelector('#contacto'),{focus:document.querySelector('#name')});
}));

const form = document.querySelector('#project-form');
const error = document.createElement('p');
error.id='form-error'; error.setAttribute('role','alert'); form.append(error);
const fields=[...form.querySelectorAll('[required]')];
fields.forEach(field=>field.setAttribute('aria-describedby','form-error'));
function validate() {
 fields.forEach(field=>field.setAttribute('aria-invalid',String(!field.validity.valid || !field.value.trim())));
 const invalid=fields.find(field=>!field.validity.valid || !field.value.trim());
 error.textContent=invalid ? translate('Completa todos los campos e introduce un correo electrónico válido.','Complete all fields and enter a valid email address.') : '';
 return invalid;
}
function readEnquiry() {
 return Object.fromEntries(new FormData(form));
}
function prepare() {
 const data=readEnquiry();
 const service=document.querySelector('#service').selectedOptions[0].textContent;
 document.querySelector('#message-preview').textContent=translate(`Hola Studios.Bit, soy ${data.name}.\n\nMe interesa: ${service}.\n\nProyecto: ${data.details}\n\nMi correo: ${data.email}`,`Hello Studios.Bit, I’m ${data.name}.\n\nI’m interested in: ${service}.\n\nProject: ${data.details}\n\nMy email: ${data.email}`);
}
document.addEventListener('refreshdraft',prepare);
document.addEventListener('languagechange',()=>{if(error.textContent)validate(); if(!document.querySelector('.message-result').hidden)prepare();document.querySelector('.copy-status').textContent='';});
form.addEventListener('input',()=>{if(error.textContent)validate();document.querySelector('.message-result').hidden=true;});
form.addEventListener('submit', e => {
  e.preventDefault();
  const invalid=validate();
  if (invalid) {
    invalid.focus();
    return;
  }
  prepare();
  document.querySelector('.message-result').hidden = false;
  window.studiosScroll.navigate(document.querySelector('.message-result'),{nearest:true,focus:null});
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

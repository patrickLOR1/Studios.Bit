import {estimate,booking} from './pricing.js';

const config=window.studiosLaunch;
const form=document.querySelector('#project-form');
const endpoint='https://formspree.io/f/mljjzngl';
const language=()=>document.documentElement.lang;
const label=(es,en)=>language()==='en'?en:es;

// Local event contract. No third-party SDK or personal fields are included.
function track(event){
 (window.dataLayer ||= []).push({event,language:language()});
}
let started=false;
function start(){if(!started){track('diagnostic_started');started=true;}}
const lab=document.querySelector('#proyecto');
lab.addEventListener('click',event=>{
 const button=event.target.closest('button');
 if(!button)return;
 if(button.matches('[data-pick=goal],[data-pick=presence],[data-action=apply]'))start();
});
document.addEventListener('studios:quote-complete',()=>track('quote_completed'));
document.addEventListener('studios:brief-download',()=>track('brief_download_requested'));
document.addEventListener('click',event=>{
 const link=event.target.closest('a[href]');
 if(link?.href===booking)track('setmore_clicked');
});

if(config.leadEnabled && config.privacyUrl && config.privacyVersion && window.isSecureContext){
 const panel=document.createElement('div');
 panel.innerHTML='<label><input type="checkbox" data-consent style="display:inline;width:auto;margin-right:.6em"><span></span></label><a target="_blank" rel="noopener noreferrer"></a><button type="button"></button><p role="status" aria-live="polite"></p>';
 form.append(panel);
 const consent=panel.querySelector('input');
 const notice=panel.querySelector('a');
 const send=panel.querySelector('button');
 const status=panel.querySelector('[role=status]');
 notice.href=config.privacyUrl;
 let pending=false, result='';
 const messages={
  missing:['Revisa los campos obligatorios y tu correo.','Check the required fields and email.'],
  consent:['Lee el aviso y marca el consentimiento para enviar.','Review the notice and give consent to send.'],
  waiting:['Enviando solicitud…','Sending your enquiry…'],
  success:['Formspree recibió tu solicitud.','Formspree received your enquiry.'],
  rejected:['El servicio rechazó la solicitud. Revisa los datos y vuelve a intentarlo.','The service rejected the enquiry. Check your details and try again.'],
  unknown:['No pudimos confirmar la recepción. Tus datos siguen aquí.','Receipt could not be confirmed. Your details are still here.']
 };
 function render(){
  panel.querySelector('label span').textContent=label('Acepto el tratamiento de mis datos para responder a esta solicitud.','I consent to the processing of my data to respond to this enquiry.');
  notice.textContent=label('Leer aviso de privacidad','Read privacy notice');
  send.textContent=label('Enviar solicitud a Studios.Bit','Send enquiry to Studios.Bit');
  send.disabled=pending;
  status.textContent=result?label(...messages[result]):'';
 }
 document.addEventListener('languagechange',render);
 form.addEventListener('input',()=>{if(!pending){result='';render();}});
 send.addEventListener('click',async()=>{
  if(pending)return;
  const bad=[...form.querySelectorAll('[required]')].find(el=>!el.validity.valid||!el.value.trim());
  if(bad || !consent.checked){result=bad?'missing':'consent';render();(bad||consent).focus();return;}
  const data=Object.fromEntries(new FormData(form));
  const details=form.elements.details;
  const quote=details.dataset.quoteState?JSON.parse(details.dataset.quoteState):null;
  const payload={name:data.name.trim(),email:data.email.trim(),company:data.company.trim(),service:data.service,description:data.details,language:language(),consent:true,privacy_version:config.privacyVersion,privacy_url:config.privacyUrl};
  if(quote){
   const q=estimate(quote);
   Object.assign(payload,{project_summary:details.dataset.lastQuote,goal:quote.goal,web:quote.web,social_plan:quote.plan,scope:JSON.stringify(quote),estimated_once_mxn:q.once,estimated_monthly_mxn:q.monthly,vat_rate:q.vatRate,estimated_vat_once_mxn:q.vatOnce,estimated_vat_monthly_mxn:q.vatMonthly,estimated_total_once_mxn:q.totalOnce,estimated_total_monthly_mxn:q.totalMonthly});
  }
  pending=true;result='waiting';render();
  try{
   const response=await fetch(endpoint,{method:'POST',redirect:'error',credentials:'omit',referrerPolicy:'no-referrer',headers:{Accept:'application/json','Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(20000)});
   if(!response.ok){result='rejected';}
   else {const receipt=await response.json();result=receipt.ok===true?'success':'unknown';}
  }catch{result='unknown';}finally{pending=false;render();}
 });
 render();
}

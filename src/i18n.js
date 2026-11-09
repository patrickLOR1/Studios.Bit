// Central translation catalog: selector => [Spanish, English]. Only trusted copy uses HTML.
const copy = {
 'label[for=company]':['Empresa (opcional)','Company (optional)'],
 '.decision-label':['EL PUNTO DE DECISIÓN','THE DECISION POINT'],
 '#decision-title':['Alguien te encuentra.<br>¿Qué pasa después?','Someone finds you.<br>What happens next?'],
 '.decision-copy':['Si cuesta entender tu oferta o encontrar cómo contactarte, una visita puede terminar ahí. Diseñamos ese siguiente paso contigo: una consulta sobre un producto, una explicación clara de tus servicios o una conversación que continúa en redes.','When your offer or contact details are hard to find, a visit can end there. We design the next step with you: a product enquiry, a clear introduction to your services or a conversation that continues on social media.'],
 '.decision-link':['Descubre lo que tu negocio necesita <svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg>','Discover what your business needs <svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg>'],
 '.skip-link':['Saltar al contenido','Skip to content'],
 '#main-nav a':['Servicios|Portafolio|Proceso|Equipo|Contacto','Services|Portfolio|Process|Team|Contact'],
 '.nav-close':['Cerrar <span aria-hidden="true">×</span>','Close <span aria-hidden="true">×</span>'],
 '.nav-cta':['Iniciar proyecto <svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg>','Start a project <svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg>'],
 '.hero-kicker':['<span class="pulse"></span> CREATIVIDAD · DIGITAL · TECNOLOGÍA','<span class="pulse"></span> CREATIVE · DIGITAL · TECHNOLOGY'],
 '.hero h1':['Ideas que<br><span>conectan.</span><br>Soluciones que<br>transforman.','Ideas that<br><span>connect.</span><br>Solutions that<br>transform.'],
 '.hero-bottom p':['Páginas de captación, sitios web y redes sociales para explicar tu oferta, fortalecer tu presencia digital y facilitar el contacto con nuevos prospectos.','Landing pages, websites and social media that clarify your offer, strengthen your digital presence and help potential customers get in touch.'],
 '.hero-cta':['INICIAR UN PROYECTO <span><svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg></span>','START A PROJECT <span><svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg></span>'],
 '.hero-index':['ESTUDIO CREATIVO / 2026<br>MÉXICO · REMOTO','CREATIVE STUDIO / 2026<br>MEXICO · REMOTE'],
 '.manifesto .section-label':['<span>01</span> ¿QUIÉNES SOMOS?','<span>01</span> WHO WE ARE'],
 '.manifesto-copy>p':['Somos una agencia creativa especializada en <em>páginas de captación, sitios web corporativos y gestión estratégica de redes sociales.</em>','We are a creative agency specializing in <em>landing pages, corporate websites and strategic social media management.</em>'],
 '.manifesto-note p':['No solo creamos presencia digital. Construimos herramientas para hacer crecer las ideas.','We build more than a digital presence. We create tools that help ideas grow.'],
 '.services .section-label':['<span>02</span> SERVICIOS','<span>02</span> SERVICES'],
 '.section-head>p':['TRES SOLUCIONES.<br>UNA MISMA VISIÓN.','THREE SOLUTIONS.<br>ONE SHARED VISION.'],
 '.service h2':['Páginas de captación|Sitios web corporativos|Gestión de redes sociales','Landing Pages|Corporate Websites|Social Media Management'],
 '.service>div:nth-of-type(2)>p':['Una página centrada en tu oferta y en una acción: solicitar información o iniciar contacto. Diseñada para facilitar la captación de prospectos.|Un sitio web que presenta tus servicios con claridad, refuerza el posicionamiento de tu marca y facilita que tus clientes encuentren cómo contactarte.|Estrategia, contenido y diseño para mantener una comunicación de marca coherente y explicar tu oferta a tu audiencia.','A focused page built around your offer and one next step: requesting information or getting in touch.|A website that clearly presents your services, strengthens your brand positioning and makes it easy for customers to contact you.|Strategy, content and design that keep your brand communication consistent and help your audience understand your offer.'],
 '.service-select':['EXPLORAR SERVICIO <span><svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg></span>','EXPLORE SERVICE <span><svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg></span>'],
 '.services-note':['¿TIENES OTRO TIPO DE PROYECTO? LO EVALUAMOS CONTIGO CASO POR CASO.','HAVE A DIFFERENT PROJECT IN MIND? LET’S EXPLORE IT TOGETHER.'],
 '.why .section-label':['<span>03</span> POR QUÉ STUDIOS.BIT','<span>03</span> WHY STUDIOS.BIT'],
 '.why>h2':['Diseño que se siente.<br>Tecnología que <span>funciona.</span>','Design you can feel.<br>Technology that <span>works.</span>'],
 '.why-grid h3':['Hecho a la medida|Visión integral|Claridad siempre|Evolución continua','Made for you|A connected approach|Clarity at every step|Continuous improvement'],
 '.why-grid p':['Entendemos el objetivo antes de definir la solución. Nada de fórmulas genéricas.|Conectamos diseño, marketing, contenido y tecnología en una experiencia coherente.|Alcances, avances y entregables claros para trabajar con confianza.|Medimos, aprendemos y optimizamos para que cada solución siga avanzando.','We understand the goal before shaping the solution. Every project gets an individual approach.|We bring design, marketing, content and technology together in one coherent experience.|Clear scope, progress and deliverables so we can work together with confidence.|We measure, learn and refine to keep every solution moving forward.'],
 '#portfolio-title':['Tres ideas.<br>Tres sistemas<br><em>con intención.</em>','Three ideas.<br>Three intentional<br><em>systems.</em>'],
 '.coffee-copy b':['Café para<br>la pausa.','Coffee for<br>the pause.'],
 '#comparison-title':['La claridad también<br><em>se diseña.</em>','Clarity is<br><em>designed.</em>'],
 '.ui-after h3':['Arquitectura<br>que respira.','Architecture<br>that breathes.'],
 '#team-title':['Dos socios.<br>Una práctica<br><em>compartida.</em>','Two partners.<br>One shared<br><em>practice.</em>'],
 '.process .section-label':['<span>04</span> NUESTRO PROCESO','<span>04</span> OUR PROCESS'],
 '.process h2':['De una idea<br>a una solución<br><em>digital.</em>','From an idea<br>to a digital<br><em>solution.</em>'],
 '.steps h3':['Brief|Dirección creativa|Prototipo|Desarrollo|Pruebas|Entrega','Brief|Creative direction|Prototype|Development|Testing|Delivery'],
 '.steps small':['CONTEXTO|CRITERIO|EXPERIENCIA|CONSTRUCCIÓN|CALIDAD|CONTINUIDAD','CONTEXT|CRITERIA|EXPERIENCE|BUILD|QUALITY|CONTINUITY'],
 '.steps p':['Entendemos el objetivo, la audiencia, las restricciones y cómo debe avanzar el visitante.|Definimos concepto, jerarquía, tono y un sistema visual propio para el proyecto.|Convertimos la dirección en pantallas navegables y validamos las decisiones clave.|Construimos la solución responsive con movimiento intencional y componentes sólidos.|Revisamos contenido, accesibilidad, rendimiento, dispositivos y recorridos críticos.|Preparamos el lanzamiento, documentamos y dejamos una base lista para evolucionar.','We understand the goal, audience, constraints and how the visitor should move forward.|We define the concept, hierarchy, tone and a distinct visual system for the project.|We turn the direction into navigable screens and validate key decisions.|We build the responsive solution with intentional motion and robust components.|We review content, accessibility, performance, devices and critical journeys.|We prepare the launch, document the work and leave a foundation ready to evolve.'],
 '.audience .section-label':['<span>05</span> CON QUIÉN TRABAJAMOS','<span>05</span> WHO WE WORK WITH'],
 '.band-group:first-child span':['EMPRENDEDORES|PYMES|NEGOCIOS LOCALES|MARCAS|EMPRESAS','ENTREPRENEURS|SMALL BUSINESSES|LOCAL BUSINESSES|BRANDS|COMPANIES'],
 '.band-help':['La animación se pausa al enfocar. Pulsa Escape para detenerla.','Animation pauses on focus. Press Escape to stop it.'],
 '.audience>p':['Colaboramos con personas y equipos que quieren fortalecer su presencia digital, profesionalizar su marca o modernizar su forma de trabajar.','We work with people and teams looking to strengthen their digital presence, develop their brand or modernize the way they work.'],
 '.contact .section-label':['<span>06</span> CONTACTO','<span>06</span> CONTACT'],
 '.contact h2':['Hagamos realidad<br>tu próximo<br><em>proyecto.</em>',"Let’s build<br>something<br><em>great.</em>"],
 '.contact-copy>p':['Cuéntanos tu objetivo, qué necesitas y cuándo te gustaría empezar. Si usaste el cotizador, revisa el resumen de tu proyecto antes de solicitar una propuesta.','Tell us your goal, what you need and when you would like to start. If you used the estimator, review your project brief before requesting a proposal.'],
 'label[for=name]':['Nombre','Name'], 'label[for=email]':['Correo electrónico','Email'],
 'label[for=service]':['¿Qué necesitas?','What do you need?'], 'label[for=details]':['Cuéntanos sobre tu proyecto','Tell us about your project'],
 '#service option':['Selecciona un servicio|Páginas de captación|Sitios web corporativos|Gestión de redes sociales|Otro proyecto','Select a service|Landing Pages|Corporate Websites|Social Media Management|Other project'],
 '#project-form>button':['PREPARAR MENSAJE <span><svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg></span>','PREPARE MESSAGE <span><svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg></span>'],
 '.form-note':['TU CONSULTA NO SE HA ENVIADO. PREPARA EL MENSAJE Y ENVÍALO POR INSTAGRAM.','YOUR ENQUIRY HAS NOT BEEN SENT. PREPARE YOUR MESSAGE AND SEND IT VIA INSTAGRAM.'],
 '.message-result>p':['Tu mensaje está listo, pero no se ha enviado. Cópialo y envíalo por Instagram.','Your message is ready, but has not been sent. Copy it and send it via Instagram.'],
 '#copy-message':['COPIAR MENSAJE','COPY MESSAGE'], '.message-actions a':['ABRIR INSTAGRAM <svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg>','OPEN INSTAGRAM <svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg>'],
 'footer>p':['Creatividad. Estrategia. Tecnología.','Creativity. Strategy. Technology.']
};
const serviceIds = ['', 'landing', 'corporate', 'social', 'other'];
document.querySelectorAll('#service option').forEach((el,i)=>el.value=serviceIds[i]);
document.querySelectorAll('.service-select').forEach((el,i)=>el.dataset.service=serviceIds[i+1]);
const languages = document.createElement('div');
languages.className='languages'; languages.innerHTML='<button type="button" data-lang="es">ES</button><span aria-hidden="true">/</span><button type="button" data-lang="en">EN</button>';
document.querySelectorAll('.languages').forEach(el=>el.remove());
document.querySelector('.nav').insertBefore(languages,document.querySelector('.menu-toggle'));
const mobileLayout=matchMedia('(max-width: 900px)');
function placeLanguages(){
 languages.classList.toggle('mobile-languages',mobileLayout.matches);
 if(mobileLayout.matches)document.querySelector('#main-nav').append(languages);
 else document.querySelector('.nav').insertBefore(languages,document.querySelector('.menu-toggle'));
}
mobileLayout.addEventListener('change',placeLanguages);
placeLanguages();
window.siteLanguage='es';
window.translate = (es,en)=>window.siteLanguage==='en'?en:es;
function setLanguage(lang) {
 window.siteLanguage=lang; const n=lang==='en'?1:0;
 document.documentElement.lang=lang;
 document.querySelectorAll('[data-es][data-en]').forEach(el=>el.textContent=el.dataset[lang]);
 for(const [selector,values] of Object.entries(copy)) { const parts=values[n].split('|'); document.querySelectorAll(selector).forEach((el,i)=>el.innerHTML=parts.length===1?parts[0]:parts[i]); }
 const attrs=[['#navigation-dialog','aria-label','Navegación principal','Main navigation'],['#name','placeholder','Tu nombre','Your name'],['#email','placeholder','tu@correo.com','you@example.com'],['#details','placeholder','Objetivos, retos, tiempos...','Goals, challenges, timeline...'],['#main-nav','aria-label','Navegación principal','Main navigation'],['.circle-link','aria-label','Explorar servicios','Explore services'],['.brand','aria-label','Studios.Bit, inicio','Studios.Bit, home'],['.brand img','alt','Studios.Bit — Agencia Digital','Studios.Bit — Digital Agency'],['.audience-band','aria-label','Emprendedores, pymes, negocios locales, marcas y empresas','Entrepreneurs, small businesses, local businesses, brands and companies'],['.portrait-patrick img','alt','Retrato de Patrick, socio de Studios.Bit','Portrait of Patrick, Studios.Bit partner'],['.portrait-emiliano img','alt','Retrato de Emiliano, socio de Studios.Bit','Portrait of Emiliano, Studios.Bit partner']];
 attrs.forEach(([selector,attr,es,en])=>document.querySelectorAll(selector).forEach(el=>el.setAttribute(attr,n?en:es)));
 document.querySelectorAll('[data-lang]').forEach(el=>{el.setAttribute('aria-pressed',String(el.dataset.lang===lang));el.setAttribute('aria-label',el.dataset.lang==='es'?'Español':'English');});
 document.querySelectorAll('.languages').forEach(el=>el.setAttribute('aria-label',n?'Language':'Idioma'));
 const open=document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='true'; document.querySelector('.menu-toggle .sr-only').textContent=n?(open?'Close menu':'Open menu'):(open?'Cerrar menú':'Abrir menú');
 document.title=n?'Studios.Bit — Ideas that connect':'Studios.Bit — Ideas que conectan';
 const description=n?'Landing pages, corporate websites and social media management for brands ready to move forward.':'Páginas de captación, sitios web corporativos y gestión de redes sociales para marcas que quieren avanzar.';
 document.querySelector('meta[name=description]').content=description;
 document.querySelector('meta[property="og:description"]').content=description;
 document.querySelector('meta[property="og:title"]').content=document.title;
 document.querySelector('meta[name="twitter:title"]').content=document.title;
 document.querySelector('meta[name="twitter:description"]').content=description;
 document.querySelector('meta[property="og:locale"]').content=n?'en_US':'es_MX';
 const url=document.querySelector('link[hreflang="'+lang+'"]').getAttribute('href');
 document.querySelector('link[rel=canonical]').href=url;
 document.querySelector('meta[property="og:url"]').content=url;
 const schema=document.querySelector('script[type="application/ld+json"]');
 const structured=JSON.parse(schema.textContent);
 if(structured['@graph']){
   const titles=[...document.querySelectorAll('.service h2')];
   structured['@graph'].filter(item=>item['@type']==='Service').forEach((item,i)=>{
     item.name=titles[i].textContent;
     item.url=url+'#servicios';
   });
   schema.textContent=JSON.stringify(structured);
 }
 try {localStorage.setItem('studios-language',lang);} catch {}
 document.dispatchEvent(new Event('languagechange'));
}
document.querySelectorAll('[data-lang]').forEach(el=>el.addEventListener('click',()=>{setLanguage(el.dataset.lang);history.replaceState(null,'','/'+el.dataset.lang+'/'+location.hash);}));
let saved='es';try {if(localStorage.getItem('studios-language')==='en')saved='en';}catch{}
if(location.pathname.startsWith('/en/'))saved='en';
if(location.pathname.startsWith('/es/'))saved='es';
setLanguage(saved);


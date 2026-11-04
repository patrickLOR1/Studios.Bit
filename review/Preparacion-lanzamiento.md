# Preparación de lanzamiento · Studios.Bit

## Bloqueantes de activación

- Confirmar dominio HTTPS, alojamiento, destinatario de notificaciones, tarifas e impuestos aplicables. El IVA permanece sin definir en pricing.js.
- Aprobar y proporcionar la URL HTTPS y la versión del aviso. La opción de envío requiere ambas. El borrador de este documento requiere revisión del responsable.
- En Formspree, buscar el registro «Studios.Bit QA» con correo qa@example.test y confirmar que llegó su notificación al destinatario esperado. El POST de prueba respondió HTTP 200 y ok=true. El panel exigió iniciar sesión.
- Repetir Chrome DevTools → Security en la URL y perfil afectados. Revisar cada origen afectado y Network → Security del recurso exacto. La versión provisional devolvió 401. En localhost Google Fonts cargó sin errores. La captura del panel Security o un listado de orígenes con error, sin cookies ni tokens, permitirá continuar.
- Revisión final de la vista con consentimiento, prueba con el aviso aprobado y autorización de publicación.

## Activación cuando exista aprobación

1. Configurar dominio, HTTPS, redirección de HTTP a HTTPS y certificado completo en el alojamiento. Mantener las vistas previas separadas y restringidas con autenticación.
2. Introducir en el entorno del build SITE_ENV=production, SITE_URL con el origen HTTPS definitivo, APPROVED_PRIVACY_URL con la dirección aprobada, PRIVACY_VERSION con su versión, LEADS_ENABLED=true y SITE_INDEXABLE=true. Para toda vista previa usar SITE_ENV=preview y SITE_INDEXABLE=false. Para desactivar captación usar LEADS_ENABLED=false.
3. Desde la carpeta del proyecto ejecutar npm ci y npm run build. Revisar dist/es/index.html, dist/en/index.html, dist/robots.txt, dist/sitemap.xml y dist/launch-config.js. Confirmar que canonical, Open Graph y hreflang apuntan al dominio correcto. Ejecutar node src/audit-static.mjs.
4. Tras autorización servir dist con HTTPS, revisar ambas rutas, el origen de recursos y la recepción de una solicitud identificada en panel y buzón. Verificar robots y sitemap sobre la URL pública y enviar el sitemap al buscador.
5. Si falla la recepción, reconstruir con LEADS_ENABLED=false. Se conserva el flujo de preparación manual para Instagram.

## Aviso breve para revisión (borrador)

ES — Studios.Bit utiliza tu nombre, correo, empresa si la proporcionas, descripción y alcance estimado para responder a tu solicitud y preparar una propuesta. Al elegir enviar, estos datos se transmiten a Formspree. Puedes preparar el mensaje localmente o abrir Instagram por tu cuenta. Setmore gestiona las reservas en su propio sitio. El clic para abrirlo no confirma una cita.

EN — Studios.Bit uses your name, email, optional company, description and estimated scope to answer your enquiry and prepare a proposal. Choosing to send transmits these details to Formspree. You can also prepare a local message or open Instagram yourself. Setmore handles bookings on its own site. Opening it does not confirm an appointment.

Antes de aprobar: completar identidad y domicilio del responsable, contacto y procedimiento para ejercer derechos o retirar consentimiento, conservación y eliminación, encargados y transferencias que correspondan y mecanismo de actualización. Confirmar que las prácticas del buzón y de Formspree coinciden con el aviso.

## Auditoría local y pendientes opcionales

- HTML estático ES/EN, un H1 por ruta, tres servicios en datos estructurados, cinco FAQ por idioma, destinos internos, canonical, hreflang y sitemap verificados. La indexación real depende del dominio publicado.
- Lighthouse móvil ES en localhost: rendimiento 71, accesibilidad automatizada 100, SEO 69. LCP 1.6 s, CLS 0, bloqueo total 1260 ms. La auditoría detecta noindex en la vista previa. Prioridad posterior: perfilar ejecución de JavaScript y trabajo en el hilo principal en un dispositivo físico. Este análisis no acredita accesibilidad integral.
- Los eventos diagnostic_started, quote_completed, brief_download_requested y setmore_clicked se agregan a dataLayer con el idioma. La descarga mide su inicio. El destino externo de analítica y su consentimiento quedan pendientes de selección. No se envían datos del formulario en esos eventos.
- El contrato de precios está en src/pricing.js. El resumen conserva inversión única y mensual estimadas en MXN y las opciones que dieron lugar al cálculo. QA prueba cuatro combinaciones y la transferencia del resumen en ES/EN.

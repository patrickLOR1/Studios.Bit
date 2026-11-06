# Seguridad y captación — RC
## APROBADO en las pruebas indicadas
- Dominio público: Chrome aceptó cadena TLS sin excepciones; TLS 1.3, emisor YR2, sujeto www.studiosbit.org. Security informó secure.
- HTTP apex y HTTPS apex terminan en HTTPS www. Vercel confirma redirect apex 308 y dominios verified.
- No requestfailed ni error de certificado en las cuatro navegaciones registradas en security.json. La producción sigue noindex.
- Experimento de fuentes locales retirado por regresión en laboratorio. Se conserva Google Fonts por HTTPS; no se atribuye la advertencia histórica a ese proveedor.
- Formspree: pruebas interceptadas ES/EN de validación, consentimiento desmarcado, errores 422/red, éxito ok=true, doble clic y payload con resumen/alcance/importes. Endpoint HTTPS fijo; redirect:error, sin credenciales ni datos en logs.
- Producción y Preview mantienen leads desactivados. No se cambió la cuenta Formspree ni se enviaron solicitudes reales en esta auditoría.

## PENDIENTE
- Recurso exacto de la antigua advertencia “active content with certificate errors”: no reproducido en Chrome actual; no hay evidencia que permita atribuirlo a un host concreto. Para cerrarlo se necesita captura/trace del perfil afectado y URL exacta.
- Notificaciones y destinatario Formspree: búsqueda acotada en el correo conectado sin coincidencias; no equivale a demostrar fallo de recepción. No se dispone de validación del panel.
- Aviso de privacidad: borrador separado pendiente de datos legales y aprobación.
- Prueba real única identificada cuando privacidad/destinatario estén aprobados; validar panel y buzón, no solo HTTP.
- Safari/iPhone y Chrome/Android físicos; pruebas actuales de motores/perfiles emulados.
- Revisión manual con lector de pantalla y Core Web Vitals de usuarios reales.
No se desactivó TLS ni se instalaron excepciones. No se activó CSP estricta.

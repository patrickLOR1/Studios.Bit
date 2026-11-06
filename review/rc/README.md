# Release candidate — Studios.Bit
Rama: release/launch-preview. No es autorización de lanzamiento.
No se ejecutaron cambios de producción ni main. La consulta final de producción difiere del snapshot inicial del conector; ver Activacion.md. Captación e indexación desactivadas.

## APROBADO — evidencia disponible
| Área | Qué se comprobó | Evidencia |
|---|---|---|
| Fuentes y build | npm ci, 0 vulnerabilidades; build desde src con dist apartado previamente; no hay dist versionado en rama actual | salida de comandos y audit-static.mjs |
| Responsive | 320, 375, 390, 768, 1024, 1440 y 1920 px; ES/EN, ancho sin overflow, formularios y persistencia | qa.mjs; capturas |
| Navegación | Inicio tras ES↔EN, normal/reduced-motion, menú, teclado, Escape, indicador y resize | qa-language-home.mjs, qa-navigation.mjs |
| Identidad y motion | glow, header, banda en movimiento/alternativa reducida, escenas, servicios, esfera conservados | qa-header-glow.mjs, qa-poster.mjs, qa-immersive.mjs |
| Iconos | SVG inline en CTA y controles; sin flechas diagonales emoji tras cambiar idioma o paso | qa-arrows.mjs; WebKit/Chromium emulados |
| Cotizador | cuatro casos de cálculo, recomendaciones, alcance, ES/EN, persistencia, descarga y transferencia | qa-lab.mjs |
| Contacto | consentimiento, validación, rechazo 422, red, éxito simulado y doble clic | qa-launch.mjs; endpoint interceptado |
| Seguridad pública | HTTPS/TLS aceptado, redirecciones a www, sin recursos fallidos en Chrome observado | security.json |
| Setmore | enlace oficial, asesorías gratuitas, CTA ES/EN; clic no se presenta como reserva confirmada | captura ../setmore-2026-11-06.png y pruebas del cotizador |
| SEO técnico | canonical/hreflang, x-default, title/description ES/EN, OG, Twitter, sitemap, WebSite/Organization/Service | audit-static.mjs, SEO-AEO.md |
| Protección de entorno | Preview mantiene noindex aun con flags erróneos; leads sin aviso aprobado se rechaza | qa-build-config.mjs |

## Correcciones técnicas
- Integración en el RC de SVG diagonales ya corregidos; también sustituidos iconos decorativos de bajada, retorno y reproducción, preservando dirección/función.
- Twitter title/description sincronizados por idioma, imagen y alt; entidad WebSite vinculada a Organization.
- Validación HTTPS del origen de compilación.
- Normalización trailingSlash y cabeceras nosniff/referrer-policy en Vercel.
- Minificación de CSS y módulos/scripts servidos en el build; fuentes legibles en src. Se conserva el orden de ejecución y la solución de navegación aprobada. Los experimentos de arranque diferido se retiraron al no mejorar la medición.
- Prueba de cotizador actualizada para cerrar el menú móvil después de cambiar idioma, sin alterar su lógica.
- Experimento de fuentes locales descartado al no mejorar rendimiento.
- Sin cambios de tarifas, IVA, fórmulas, planes, envío de formularios, Setmore o copy comercial.

## PENDIENTE — bloqueantes comerciales
1. Aprobar aviso completo y versión/URL; completar identidad, domicilio, ARCO y conservación.
2. Confirmar destinatario y configuración de notificaciones en Formspree; comprobar recepción real en panel y buzón.
3. Confirmar IVA. Se mantiene “por confirmar” y cifras existentes.
4. Aprobar o rechazar copy final propuesto. Eslogan oficial intacto.
5. Autorizar commit, variables e indexación antes de lanzamiento. Ver Activacion.md.
6. Verificar Safari iPhone/Chrome Android físicos y lector de pantalla; no sustituir por emulación.
7. Medir INP y Core Web Vitals reales tras contar con tráfico y configuración de medición aprobada.

## PENDIENTE — verificación externa / opcionales
- Advertencia histórica de certificados: no reproducida; recurso culpable desconocido, requiere evidencia del perfil afectado.
- Biblioteca independiente: solo README en el HEAD inspeccionado; no retirar la skill de la landing todavía.
- Analítica: eventos locales dataLayer existentes; destino externo y política de consentimiento pendientes. setmore_clicked no significa cita confirmada.
- Search Console y indexación efectiva solo después de publicación autorizada.

## ERROR / objetivo no demostrado
El rendimiento debe leerse en Rendimiento.md: no se declara alcanzado ≥90 ni INP≤200 ms sin evidencia. No hay confirmación de recepción real de Formspree en esta auditoría. Los estados simulados prueban el código, no el buzón.

## Documentos para aprobación
- [Copy final](Copy-final-propuesto.md) y [comparación detallada](../Auditoria-copy-2026-11-06.md).
- [Privacidad, borrador](Privacidad-borrador.md).
- [Checklist de activación](Activacion.md).
- [SEO/AEO](SEO-AEO.md).
- [Seguridad/captación](Seguridad-captacion.md).
- Video recorrido.mp4 y capturas del directorio rc.


## Preview verificado
https://studiosbit-dist-kxazxyzzy-patricklor1s-projects.vercel.app/es/
EN: https://studiosbit-dist-kxazxyzzy-patricklor1s-projects.vercel.app/en/
Proyecto studios.bit-dist, target Preview (null), READY. Commit de código 8e680387f2f74cc4257aba3cc12884991de699bb.
HTTP autenticado mediante conector Vercel: ES/EN 200 con noindex, Twitter y WebSite; robots Disallow:/; sitemap 200; launch-config leads=false; URL inexistente 404/noindex; cabeceras nosniff y strict-origin-when-cross-origin.
El Preview requiere acceso Vercel. La comprobación remota fue HTTP mediante conector; las pruebas funcionales de navegador se ejecutaron sobre el build local del mismo código, no sobre un iPhone real.
Logs: npm ci --include=dev, npm run build, Build Completed en 2 s, 0 vulnerabilidades. Advertencias npm cache-dir y allowScripts esbuild no bloquearon el build.
Código principal RC: 8e68038. Corrección SVG previa integrada: c91de7e. Consultar el commit de documentación para la evidencia.

## Suite final del build minificado
Todas las entradas de tests.txt terminaron exit 0: auditoría estática, cuatro escenarios de configuración y rechazos de activación insegura, responsive 7 anchos ES/EN, cotizador, Formspree interceptado, ocho regresiones inicio/idioma, navegación y flechas en tres perfiles.
Se añadió prueba de correo inválido y respuesta HTTP 200 sin ok=true: no confirman recepción.
SHA256 de src/pricing.js: E23A822855B0E2261F3915C72ADA3767DF2446130469C37A6EF3FBCB7B4692BD. Sin diff contra el inicio de esta auditoría.
Las pruebas físicas y de recepción real NO están incluidas en “APROBADO”.
Capturas finales: desktop-es.png, desktop-en.png, mobile-es.png, mobile-en.png. El video recorre hero, servicios, proceso, diagnóstico/cotizador, resumen, contacto y cambio a inglés sin enviar datos.

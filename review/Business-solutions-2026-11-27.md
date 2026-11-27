# Studios.Bit — soluciones digitales para negocios

## Alcance y auditoría

Base local: `e77ffc2`; rama de revisión: `codex/business-solutions-2026-11-27`. La rama previa `codex/commercial-clarity-2026-11-22` no recibió estos cambios. Se conservan todos los archivos locales previos sin seguimiento.

El sitio es HTML/CSS/JS estático con esbuild y generación ES/EN mediante linkedom. No utiliza TypeScript. `i18n.js` aplica traducciones y metadatos; `experience.js` controla el diagnóstico/cotizador; `pricing.js` mantiene las tarifas y Setmore; `launch.js` controla Formspree según la configuración de captación/privacidad. La configuración activa no se modifica. GSAP/Lenis y el sistema de navegación se conservan; en motion.js solo cambian etiquetas del recorrido.

Vercel sigue identificando como producción el despliegue `dpl_Gvd1Ubo6ojBRE1imt4AoDvPKybcj`, del commit `0228eb1`, rama `codex/commercial-clarity-2026-11-22`. La respuesta del conector no expone la configuración de la rama de producción para futuros despliegues. Se usa una nueva rama exclusivamente para revisión, sin merge ni promoción.

## Cambios comerciales y visuales

- Hero: «Tecnología que trabaja para tu negocio», propuesta concreta y CTA «Cuéntanos tu proyecto».
- Seis soluciones principales: software, CRM, automatización, plataformas/web, dashboards y marketing como complemento.
- Cuatro casos de uso explícitamente ilustrativos: inmobiliarias, salones, servicios y negocios en crecimiento. No representan clientes ni productos terminados.
- Se conservan páginas industriales, concepto AXIAL, ejemplos de portafolio, servicios web/redes, precios, reservas y formulario manual.
- Se amplía el contacto con opciones para las nuevas soluciones; se elimina una opción vacía preexistente del selector generado.
- Identidad: tipografía, blanco/negro/naranja y movimiento existentes. Guía creativa aplicada: SB-02 (acento para acciones), manteniendo la profundidad ya existente; no se copian referencias de terceros.
- Metadatos ES/EN, Open Graph/Twitter y seis entidades Service alineados con el contenido visible. Canonical, hreflang y sitemap conservan las cuatro rutas y la protección noindex de Preview.

## Diagnóstico y propuesta

Ocho opciones, con «No estoy seguro» como inicio. Las soluciones personalizadas preguntan por necesidad, usuarios, conexión con herramientas y prioridad. La pregunta inicial depende de la solución; la pregunta de herramientas solo aparece cuando se requiere una integración.

Web y marketing conservan sus estimaciones existentes. CRM/software/automatización/plataforma/dashboard/orientación no muestran precios numéricos; generan un resumen para propuesta personalizada. Se conservan navegación de pasos, sesión, notas, cambio de idioma, copia, descarga y transferencia al contacto. El envío para proyectos personalizados omite los campos monetarios del estimador web, incluso si existía una selección web previa.

## Pruebas

- Build: PASS.
- `npm test`: 3 pruebas unitarias PASS: separación de precios personalizados, escape de texto y conservación de tarifas/IVA.
- `npm run test:business`: PASS en 320, 375, 768, 1024 y 1440 px, ES/EN. Movimiento normal en 1024 y reducido en los otros tamaños. Verifica hero, seis soluciones, cuatro ejemplos, ocho opciones, anclas, schema, overflow, CRM con preguntas condicionales, persistencia, descarga, contacto, validación, mensaje manual, idiomas, regreso a cotización web y todas las ramas de servicio.
- Envío Formspree interceptado localmente: PASS. Sin solicitudes reales ni reservas. Verifica servicio y ausencia de importes automáticos para software.
- `node src/qa-commercial.mjs`: PASS con PREVIEW_URL=puerto 4296.
- `node src/audit-static.mjs`: PASS; `node src/qa-build-config.mjs`: PASS, incluyendo rechazo de captación sin privacidad y noindex de Preview.
- Sintaxis Node de los archivos modificados y `git diff --check`: PASS.
- No hay configuración de lint ni TypeScript en este proyecto. `npm run lint --if-present` y `npm run typecheck --if-present` no ejecutan analizadores; no se reportan como pruebas aprobadas. No se añade TypeScript ni una migración de herramientas para esta actualización.
- Accesibilidad básica: etiquetas, selección con aria-pressed, foco visible, enlace de salto, anclas existentes y movimiento reducido. No es una auditoría WCAG completa.
- Resultado detallado: `business-solutions-2026-11-27/results.json`.

## Capturas antes/después

Estado anterior: commit e77ffc2, reposicionamiento industrial. Capturas nuevas a igual viewport, movimiento reducido.

| Tamaño | Antes | Después |
| --- | --- | --- |
| 375 × 960 | [Antes móvil](business-solutions-2026-11-27/before-375.png) | [Después móvil](business-solutions-2026-11-27/after-es-375.png) |
| 1440 × 960 | [Antes escritorio](business-solutions-2026-11-27/before-1440.png) | [Después escritorio](business-solutions-2026-11-27/after-es-1440.png) |

## Archivos

`package.json`; `src/solutions.js`; `src/solutions.css`; `src/project-intake.js`; `src/project-intake.test.mjs`; `src/qa-business.mjs`; `src/build-locales.js`; `src/experience.js`; `src/i18n.js`; `src/launch.js`; `src/motion.js`; `src/audit-static.mjs`; `src/qa-commercial.mjs`; `src/qa-industry.mjs`; este informe y cuatro capturas comparativas/resultados nuevos. Los archivos generados dist permanecen ignorados.

## Revisión y pendientes

Local: `npm run build`, `npm run preview`, abrir http://127.0.0.1:4295/es/ y `/en/`. Para ejecutar E2E en ese puerto: configurar PREVIEW_URL=http://127.0.0.1:4295 antes de `npm run test:business`; su valor por defecto es 4296.

Pendiente aprobación del contenido y alcance comercial de la nueva oferta, validación real de recepción/privacidad antes de habilitar captación si corresponde, y publicación autorizada. No se probaron entrega real de correo, reserva real, carga sostenida ni Core Web Vitals. La disponibilidad de Preview remoto depende del flujo de Vercel y puede requerir autenticación. Ningún producto propio, resultado, cliente o certificación se presenta como hecho nuevo.

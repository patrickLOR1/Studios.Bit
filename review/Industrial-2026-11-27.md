# Reposicionamiento industrial — 27 noviembre 2026

Implementado sobre `codex/commercial-clarity-2026-11-22`, base `0228eb1168359cafb5f4756d710855ea4034b56a`. Sin despliegue ni push.

## Auditoría y producción

Vercel resolvió `www.studiosbit.org` al despliegue `dpl_Gvd1Ubo6ojBRE1imt4AoDvPKybcj`, READY, target production, source redeploy. Sus metadatos identifican la misma rama y commit base. La consulta confirma el origen del despliegue servido; no confirma qué rama está configurada para futuros despliegues automáticos. No se modifica configuración remota.

Arquitectura: HTML/CSS/JS estático, esbuild y linkedom para renderizado ES/EN; GSAP/Lenis para movimiento. `i18n.js` controla textos y metadatos; `experience.js` genera diagnóstico/cotizador y resumen; `pricing.js` mantiene precios y Setmore; `launch.js` conserva Formspree y la activación condicionada por privacidad. README describe el modo manual, pero el código también admite envío con configuración aprobada. Los archivos previos sin seguimiento permanecen intactos y fuera del commit.

## Resultado

- Hero industrial, CTA de diagnóstico y enlace de especialización bilingüe; servicios y animaciones existentes conservados.
- `/es/industria/` y `/en/industry/`: problemas, soluciones, cinco sectores, proceso, siete FAQ, CTA y Setmore.
- AXIAL: vista conceptual original con hero, capacidades, maquinaria/materiales, galería geométrica y recorrido ilustrativo. No tiene formulario simulado ni clientes inventados. Próximo paso opcional: convertir el concepto en prototipo independiente con información real autorizada.
- Categoría industrial en el diagnóstico, persistida en sesión y en el resumen de propuesta. No cambia cálculos ni tarifas.
- Titles, descriptions, Open Graph, Twitter, canonical, hreflang, sitemap y schema Service/WebPage/FAQPage. Se conservan las protecciones noindex de revisión.
- Dirección creativa: SB-02 (acento semántico) y SB-03 (profundidad ligera). Identidad existente; geometría CSS original sin imágenes de terceros ni dependencias adicionales.

## Investigación de intención

La búsqueda exploratoria «diseño web empresas industriales maquinados CNC México» devuelve también fabricantes, por ejemplo https://www.inteccadcam.com/ y https://www.sdfm.mx/. Esto sugiere separar claramente el servicio de diseño web de las solicitudes de fabricación. No se validaron volúmenes ni dificultad. Mapa: homepage = diseño web industrial en México; landing = páginas web para talleres de maquinado, manufactura y proveedores industriales; secciones = capacidades, maquinaria, contacto y presencia local. No se crean páginas repetitivas por municipio.

## Verificación

- `npm run build`: PASS.
- `node src/qa-industry.mjs`: PASS en 320/390/768/1440, ES/EN, cuatro rutas; h1, canonical, idioma, FAQ, anclas, overflow, diagnóstico → propuesta, sector en resumen, aviso de contacto, Setmore y cambio de idioma; cero pageerror.
- `node src/audit-static.mjs`: PASS.
- `node src/qa-build-config.mjs`: PASS en cuatro configuraciones; rechaza origen HTTP y activación sin privacidad. Solo simulaciones locales.
- Sintaxis Node de industry/i18n/experience y `git diff --check`: PASS.
- El repositorio no define lint ni typecheck; `npm run lint --if-present` y `npm run typecheck --if-present` no ejecutan un analizador. No se presenta su ausencia como una validación de lint.
- Capturas nuevas en `review/industrial-2026-11-27/`, fuera del commit. Inspección visual de landing móvil y homepage escritorio. Las capturas largas no sustituyen mediciones de rendimiento.

## Límites y pendientes antes de publicar

Revisión del titular y concepto por el propietario; validar configuración real de privacidad/captación y realizar un envío autorizado de extremo a extremo si corresponde. No se enviaron formularios reales ni se hicieron reservas. No se validó una entrega de correo, el calendario externo completo, Lighthouse/Core Web Vitals ni todos los scripts históricos (algunos usan puertos fijos y sobrescriben evidencias previas). La prueba nueva usa movimiento reducido; se conserva el código GSAP/Lenis sin cambios. La revisión de accesibilidad es básica, no una certificación WCAG.

## Revisar localmente

Desde este checkout: `npm run build` y `npm run preview`. Abrir http://127.0.0.1:4295/es/ y http://127.0.0.1:4295/es/industria/ (inglés: `/en/` y `/en/industry/`). Aprobación de publicación pendiente; no hacer push sin revisar la automatización de Vercel.

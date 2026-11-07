# Studios.Bit — cierre de ajustes para aprobación
Fecha: 7 de noviembre de 2026. Rama: `release/launch-preview`.
Producción, main, indexación y captación real permanecen fuera de esta entrega.

## Cambios realizados
- Inicio más ligero: escenas GSAP preparadas cerca del viewport; banda tipográfica inicializada al entrar en pantalla. Se conservan esfera, halo del cursor, navegación flotante, storytelling, interacciones y reduced-motion.
- Fondo crítico oscuro inline antes de cargar hojas externas. Prueba de carga sin caché con CSS retrasado en ES/EN, 390 y 1440 px. Esto cubre el documento del sitio; no puede cambiar el lienzo vacío del navegador antes de recibir HTML.
- Copy de bajo riesgo: apoyo del hero, descripciones de servicios, “Explorar servicio / Explore service”, instrucciones de contacto, “Recomendación inicial / Initial recommendation”, vocabulario de la FAQ y alojamiento web, CTA de asesoría EN. Eslogan oficial y nombres de servicios intactos. No se implementan propuestas de seguimiento continuo, contratación ni nuevas promesas.
- Precios y cálculos sin cambios. SHA256 de src/pricing.js: `E23A822855B0E2261F3915C72ADA3767DF2446130469C37A6EF3FBCB7B4692BD`.

## Rendimiento
[Resultados completos y método](Rendimiento.md), [métricas](metrics.json).
Tres ejecuciones antes y tres después: mediana Lighthouse móvil **81 → 83**, TBT **710 → 614 ms**. LCP **1590 → 1622 ms**. Se informa la dispersión y el intervalo de un día entre las mediciones; no es una garantía de rendimiento en todos los dispositivos.

## Verificación
La salida reproducible queda en [tests.txt](tests.txt), mediante `node src/qa-final.mjs`.
- Build de ES/EN, canonical, hreflang, sitemap, metadatos y contenido HTML sin ejecutar JavaScript.
- 320, 375, 390, 768, 1024, 1440 y 1920 px; persistencia de idioma y datos, sin overflow horizontal en los casos comprobados.
- Regreso al inicio después de cambiar idioma, menú, teclado, Escape, resize y reduced-motion.
- Cotizador: cuatro casos de cálculo, recomendaciones, extras, idioma, descarga y resumen transferido a contacto.
- Formspree interceptado: consentimiento, validación, payload, errores 422/red/respuesta inválida, éxito y bloqueo de duplicados. No son envíos reales.
- SVG: WebKit con perfil iPhone 13, Chromium con perfil Pixel 7 y Chrome escritorio; decorativos aria-hidden y sin flechas Unicode al cambiar idioma o paso.
- Banda, header y cursor glow; recorrido de escenas después de inicialización diferida.
- Lighthouse accesibilidad automatizada: 100 en las seis ejecuciones. No sustituye auditoría manual con lectores de pantalla ni garantiza accesibilidad completa.
- [Enlaces externos](external-links.json): Setmore e Instagram HTTP 200 sobre TLS 1.3, sin recursos fallidos observados. [Captura Setmore](setmore.png): asesorías y diagnóstico inicial gratuitos. No se creó cita ni se modificó cuenta.

## SEO/AEO
La auditoría estática comprueba rutas separadas, un H1, title/description/OG/Twitter coherentes, canonical por idioma, hreflang recíprocos y x-default, ambos idiomas en sitemap, anclas válidas y recursos locales existentes. JSON-LD contiene Organization, WebSite y tres Service concordantes con nombres visibles. Hay cinco preguntas con respuestas rastreables en HTML y precios del archivo central.
Preview conserva noindex/nofollow y robots restrictivo. El build rechaza origen HTTP y activación de leads sin privacidad aprobada; la protección de Preview se prueba incluso con flags de producción erróneos. SEO Lighthouse 69 refleja el entorno no indexable y no debe corregirse activando indexación.
Rastreo real del dominio, Search Console y señales de buscadores requieren publicación autorizada y verificación posterior. No se prometen rankings ni menciones AEO.

## Bloqueantes para lanzamiento
1. Aprobar esta versión y los textos finales. Confirmar si el seguimiento comercial de las frases existentes requiere acotación; esas propuestas de riesgo medio no se cambiaron.
2. Completar y aprobar aviso ES/EN, responsable, domicilio, derechos, retención, proveedores, URL y versión. [Lista concreta](Privacidad-Formspree-IVA.md).
3. Confirmar destinatario Formspree y realizar prueba real autorizada con verificación de panel y notificación; integración sigue desactivada.
4. Confirmar tarifas y decisión fiscal: IVA incluido o adicional, tratamiento, tasa y redondeo. Actualmente pendiente, sin cálculo automático.
5. Confirmar dominio y rama de producción en Vercel; autorización expresa para merge/promoción y activación de indexación.
6. Verificación física en Safari iPhone y Chrome Android: carga en frío, teclado del formulario, scroll y animaciones. La emulación de esta ronda no sustituye esos dispositivos.

## Pendientes opcionales
Prueba manual con VoiceOver/TalkBack, observación de Core Web Vitals con tráfico real y revisión de nuevos cuellos de layout tras lanzamiento. Conectar analítica a un proveedor solo después de aprobar su tratamiento de datos; eventos locales no prueban citas confirmadas.

## Pasos posteriores a aprobación
Seguir [Privacidad, Formspree e IVA](Privacidad-Formspree-IVA.md) y [configuración de activación](../rc/Activacion.md). Aprobar commit exacto, completar pruebas legales/comerciales, configurar flags solo en el entorno autorizado, compilar desde src, revisar ES/EN y después autorizar promoción. Nada de esto se ejecuta automáticamente por aprobar el aspecto visual.

## Corrección adicional detectada al revisar las capturas
La regla `.concept svg` destinada a ilustraciones también ampliaba la flecha del CTA del diagnóstico. Se limita a SVG que no sean `.icon-arrow`, conservando el tamaño y color heredado de los iconos. Se amplió qa-arrows para comprobar dimensiones de flechas visibles en botones/enlaces en cada paso, idioma y motor. No se modificó la composición de las ilustraciones.

## Evidencias visuales
- [Escritorio ES](hero-1440-es.png) · [Escritorio EN](hero-1440-en.png)
- [Móvil ES](hero-390-es.png) · [Móvil EN](hero-390-en.png)
- [Diagnóstico ES móvil](project-390-es.png) · [Diagnóstico EN móvil](project-390-en.png)
- [Recorrido de la experiencia](tour-final.mp4)
- [Carga en frío y escenas](cold-scenes.json) · [Muestreo de carga](filmstrip-analysis.json)

## Preview de revisión
[Español](https://studiosbit-dist-git-release-launch-0acbc0-patricklor1s-projects.vercel.app/es/) · [English](https://studiosbit-dist-git-release-launch-0acbc0-patricklor1s-projects.vercel.app/en/)
Alias de la rama de revisión, protegido por autenticación Vercel. El identificador del commit y la URL inmutable del despliegue final se entregan con la verificación. No es el dominio de producción.

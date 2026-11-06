# SEO/AEO — evidencia y pendientes
## Implementado / comprobado
- HTML estático ES/EN generado desde src: title y description por idioma, canonical, hreflang recíproco, x-default y sitemap.
- Una H1 por documento; enlaces internos apuntan a IDs existentes.
- Organization y tres Service existentes; añadido WebSite vinculado al mismo Organization sin duplicar la empresa.
- Twitter Cards ahora incluye title/description sincronizados con ES/EN e imagen oficial; Open Graph conserva URL, imagen y texto.
- Imagen social y SVG oficiales en assets. No se agregan reseñas, direcciones ni cifras inventadas.
- Guard de SITE_URL rechaza HTTP; Preview no se indexa incluso con flags de producción activados por error.
- trailingSlash en Vercel normaliza /es y /en; 404 generado con noindex.
- Cabeceras nosniff y referrer-policy; no se instala CSP restrictiva sin prueba.
- Experimento de fuentes locales retirado por regresión en laboratorio. Se conserva Google Fonts por HTTPS; no se atribuye la advertencia histórica a ese proveedor.

## FAQ y AEO
Las cinco preguntas son HTML rastreable. No se añade FAQPage: Google retiró la función de resultados enriquecidos FAQ en mayo de 2026 y su documentación en junio.
Referencia: https://developers.google.com/search/updates
No se promete visibilidad en ChatGPT, Google AI ni rankings. Las dos respuestas adicionales de contratación/cotización están en Copy-final-propuesto.md y requieren aprobación comercial.

## Pendiente de lanzamiento
SITE_INDEXABLE=true solo con autorización. Search Console, sitemap público indexable, inspección de URL y métricas de usuarios reales se verifican tras publicar.
Las páginas de prueba deben seguir noindex; por ello Lighthouse SEO penaliza rastreabilidad y no se debe retirar esa protección para mejorar la puntuación.
Revisión final de copy y consistencia de FAQ si se aprueba una modificación.

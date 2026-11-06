# Corrección de navegación — 6 de noviembre de 2026

## Causa reproducida
El informe anterior atribuía el timeout al regreso al inicio después de cambiar de idioma. La instrumentación por paso demuestra que esa atribución era incorrecta: el timeout ocurría en la espera de alineación del CTA del cotizador, antes de cambiar idioma en el caso móvil.
Se observó top=94.3125 px frente a inset=88 px en 390 px. El destino se calculaba una sola vez. Las variaciones de layout durante el recorrido (incluidas transiciones de padding de tarjetas que cambian el ajuste del texto) podían modificar su posición después del cálculo. Sustituir getBoundingClientRect por offsetTop, por sí solo, no resolvió el fallo; la prueba volvió a fallar con el mismo desfase.
El regreso al inicio se reprodujo con scrollY=0 y sin sección activa tanto ES→EN como EN→ES en 1440 y 390 px.

## Corrección
scroll.js calcula la posición de documento mediante offsetTop/offsetParent, independiente de los transforms de entrada. navigation.js usa esa misma medida para el indicador activo. Además, un ResizeObserver temporal recalcula el destino cuando cambia el layout durante el recorrido. Al terminar el scroll se verifica también la alineación, porque el desplazamiento nativo puede finalizar unos píxeles antes del destino solicitado. El seguimiento se desconecta a los 2.2 segundos o inmediatamente ante rueda, toque, teclado o puntero. No impide la navegación manual. Se conserva la animación y se explicita el easing de los desplazamientos por enlace.
La prueba espera el cierre completo del diálogo móvil antes de activar otro control. No se relajó la tolerancia de alineación de 4 px.

## Alcance
Conservados cursor glow, header flotante, GSAP, ScrollTrigger, Lenis y reduced-motion.
Sin cambios de copy comercial, eslogan, precios, cotizador, formularios, Formspree, Setmore ni SEO.
Los cambios previos de navegación ordenan Estudio → Servicios → Proceso → Contacto y evitan competir entre hover e indicador activo.

## Evidencia de rendimiento
Las muestras de rueda anteriores muestran menor cola de interpolación, pero las trazas varían entre ejecuciones. No se afirma una mejora de FPS ni ausencia total de latencia. La validación principal de esta corrección es funcional y geométrica.

## Resultado de pruebas finales
- npm run build: correcto; dist regenerado desde fuentes.
- qa-wheel.mjs after: recorrido completo ES/EN, 1440 y 390 px, enlaces en ambos sentidos, cotizador, idioma e inicio; tolerancia de alineación de 4 px sin relajar.
- qa-header-glow.mjs: ES/EN a 375, 390, 768, 1024, 1440 y 1920 px; glow, header/barra, alineación y reduced-motion correctos.
- qa-navigation.mjs: seis anchos, seguimiento de secciones, teclado, Escape, CTA, reduced-motion y resize correctos.
- audit-static.mjs: ambas rutas y noindex de prueba correctos.
- No se reservaron citas ni se enviaron formularios.
- No se probó hardware físico móvil; los casos móviles son emulación de Chrome.
- qa-language-home.mjs: 8/8 combinaciones ES→EN/EN→ES, 390/1440 px, reduce/no-preference; retorno a scrollY=0, sin sección activa ni errores JavaScript.

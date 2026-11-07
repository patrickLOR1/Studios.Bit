# Rendimiento — ronda final

Lighthouse 13.6.0, Chrome headless, URL local `/es/`, móvil 412×823, CPU 4×, simulación de red estándar (RTT 150 ms, 1638.4 Kbps). Tres ejecuciones secuenciales por versión; sin otras pruebas de navegador simultáneas. Misma máquina y comando. La referencia se tomó el 6 de noviembre; el después el 7: no es un experimento controlado de laboratorio y la carga del sistema introduce variación. No equivalen a datos de usuarios reales ni a un teléfono físico.

| Ejecución | Antes: score | Antes: TBT ms | Después: score | Después: TBT ms |
|---|---:|---:|---:|---:|
| 1 | 82 | 330 | 83 | 614 |
| 2 | 81 | 710 | 83 | 547 |
| 3 | 79 | 789 | 80 | 667 |
| Mediana | **81** | **710** | **83** | **614** |

Mediana TBT −13.5%; puntuación +2. La referencia histórica del RC fue una ejecución 80/638; frente a ella la mediana actual reduce TBT aproximadamente 4%, pero la comparación principal usa las tres repeticiones. No todas las ejecuciones mejoraron: el mejor TBT anterior fue 330 ms. LCP mediano 1590 → 1622 ms (+32 ms, alrededor de 2%); CLS mediano 0.00988 → 0. Accesibilidad Lighthouse 100 en las seis pruebas. SEO 69 conserva intencionadamente noindex; no se activó indexación para subir la puntuación.

## Causa y corrección
En la referencia 2, Style & Layout consume 1868 ms y evaluación de scripts 683 ms. Las tareas largas incluyen scroll.js (580 ms) y motion.js (286 y 195 ms). Los tiempos atribuidos a un script incluyen trabajo de layout provocado por él, no solo ejecución de sus instrucciones.
Se evita inicializar y medir simultáneamente todas las escenas GSAP al arrancar: IntersectionObserver prepara escenas a 700 px del viewport y revierte contextos al cambiar reduced-motion. El hero, esfera y navegación conservan sus efectos. La banda crea su copia y mide recorrido al entrar en pantalla; conserva pausa fuera de pantalla, foco y Escape. No se quitaron librerías ni se ocultó contenido para mejorar la prueba.

El trabajo de layout inicial sigue siendo una oportunidad futura; no se afirma TBT resuelto en todos los equipos. Se prioriza conservar la experiencia aprobada sobre perseguir una puntuación.

## Reproducción y evidencia
`npm run build`, servidor `PORT=4395 node src/preview.mjs`, luego tres veces:
`npx --yes lighthouse http://127.0.0.1:4395/es/ --output=json --output-path=review/final-round/after-N.json --chrome-flags="--headless" --quiet`

before-1/2/3.json y after-1/2/3.json contienen los informes originales; metrics.json resume tiempos, configuración y fecha. unavailable-server.json documenta un intento fallido cuando el servidor estaba cerrado: no entra en los resultados.

## Carga inicial: alcance de la comprobación
No se reprodujo una pantalla blanca del documento en esta ronda ni en los fotogramas muestreados de la referencia. `filmstrip-analysis.json` cuenta píxeles casi blancos en los fotogramas Lighthouse: ninguno corresponde a un lienzo blanco. El muestreo no descarta destellos entre fotogramas ni la pantalla vacía previa a recibir HTML.
El estilo crítico oscuro es preventivo; no se atribuye sin evidencia el blanco del video anterior a una causa concreta. `cold-scenes.json` y las capturas cold-* documentan la prueba adicional con caché desactivada y CSS retrasado.

## Serie intermedia, no usada como resultado final
Antes de corregir la regla SVG del diagnóstico, tres ejecuciones dieron 89/84/83 y TBT 383/465/547 ms (archivos pre-svg-fix-*). Se repitió la serie tras esa corrección y se publica la mediana final, aunque sea menos favorable. La dispersión no permite atribuir esa diferencia a una única regla CSS.

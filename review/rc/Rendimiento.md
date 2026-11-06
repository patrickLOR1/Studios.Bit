# Rendimiento — laboratorio, no datos de usuarios

| Variante | Performance | LCP (s) | TBT (ms) | CLS |
|---|---:|---:|---:|---:|
| Inicial actual | 84 | 1.60 | 502 | 0.0000 |
| Fuentes locales (retirado) | 77 | 1.50 | 965 | 0.0095 |
| Arranque diferido (retirado) | 77 | 2.18 | 753 | 0.0099 |
| Preload fuentes (retirado) | 74 | 1.51 | 1042 | 0.0000 |
| Fuentes externas + defer (retirado) | 71 | 1.86 | 1215 | 0.0000 |
| Candidato minificado | 80 | 1.60 | 638 | 0.0000 |

Lighthouse 13.6.0, URL local /es/, perfil móvil 412×823, red simulada RTT 150 ms / 1638.4 Kbps y CPU 4×. Misma máquina y comando. Son ejecuciones individuales, no una muestra estadística; variación de CPU y red afecta resultados.
El dato histórico 71/100, TBT 1260 ms no es una medición actual de producción y no se usa como control comparable.
Resultado: LCP y CLS cumplen objetivos de laboratorio; objetivo ≥90 NO alcanzado. TBT no es INP. INP≤200 ms y Core Web Vitals reales no verificados sin datos de usuarios.
Accesibilidad automatizada 100, buenas prácticas 100 y SEO 69 en el candidato. SEO penaliza noindex intencional; no se retira para mejorar la nota.
Los experimentos de fuentes locales y arranque diferido se retiraron. Se conserva minificación de salida CSS/JS, manteniendo fuentes src legibles y animaciones aprobadas. No se afirma que minificar haya mejorado la puntuación.
Pendiente: perfilado en dispositivo móvil real de inicialización GSAP/ScrollTrigger y layout. Cualquier ajuste adicional debe conservar motion y navegación; no ocultar contenido para optimizar la prueba.

Evidencias completas: ../rc-before.json y ../rc-candidate.json.
Minificación verificable de los 12 CSS/JS copiados: 100,319 → 93,826 bytes sin compresión HTTP (6.5% menos). Motion conserva su bundle esbuild. Esta reducción de bytes no equivale a una mejora de INP.

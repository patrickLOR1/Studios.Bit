# Fluidez de la navegación

Comparación local en Chrome, con la misma secuencia Playwright y grabación de vídeo, en 1440 × 850 y 390 × 850. Antes corresponde a 88cccf3. Cada dato procede de una ejecución por variante y tamaño. El móvil es una ventana emulada.

| Medición | Escritorio antes → después | Móvil antes → después |
|---|---:|---:|
| Layouts | 142 → 77 | 159 → 81 |
| Tiempo de layout | 222 → 166 ms | 194 → 138 ms |
| Recálculos de estilo | 711 → 569 | 802 → 612 |
| Tiempo de estilo | 245 → 239 ms | 300 → 265 ms |
| Layouts anidados en una llamada JS | 127 → 65 | 145 → 68 |
| Tareas largas observadas | 3 → 1 | 2 → 1 |
| Eventos DroppedFrame en la traza | 54 → 39 | 23 → 14 |
| Intervalos requestAnimationFrame superiores a 33,5 ms | 12 → 7 | 4 → 2 |
| Mayor intervalo requestAnimationFrame | 200 → 250 ms | 167 → 50 ms |
| Mayor llamada registrada del selector de idioma | 183 → 70 ms | 150 → 54 ms |
| Eventos Paint | 462 → 461 | 399 → 382 |

Los layouts anidados en FunctionCall son indicios de cálculo síncrono. La traza no identifica la línea responsable de cada uno. Los eventos DroppedFrame incluyen el recorrido completo, con grabación y redimensionamiento. No se aisló una causa de GPU para el intervalo de 250 ms.

El código anterior permitía desplazamiento mediante anclas de Lenis, CSS smooth y llamadas nativas separadas. Las anclas acababan aplicando scroll-padding y, en algunos destinos, scroll-margin adicional. El cambio de idioma destruía Lenis, sus timelines y la navegación de capítulos y los reconstruía durante el mismo evento. El cotizador solicitaba un refresh después de reconstruirse incluso cuando su altura no cambiaba.

El sitio ahora usa un solo coordinador para anclas y acciones internas. Calcula el espacio real bajo las barras sticky, transfiere el foco con preventScroll y elige Lenis o desplazamiento nativo según el dispositivo y el movimiento reducido. La navegación reutiliza posiciones medidas cuando cambia el layout. El cambio de idioma conserva el motor de scroll y los triggers. Un ResizeObserver detecta cambios de tamaño del cotizador, agrupa los refrescos y espera a que termine el scroll. La entrada de la esfera y su parallax actúan sobre elementos distintos.

Las grabaciones incluyen rueda lenta y rápida, enlaces consecutivos del menú, cotizador, etapas, idioma, menú móvil, movimiento reducido, regreso al inicio y cambio de ancho. En pruebas funcionales adicionales se verificaron las tres anclas de storytelling, la selección de servicio y el foco de contacto. En ambos tamaños los destinos se verificaron al alcanzar una distancia menor de 3 px del margen calculado.

Las carpetas before y after contienen métricas, vídeos y trazas de Chrome comprimidas. Para inspeccionar una traza, descomprimir el archivo json.gz y cargar el JSON en el panel Performance de Chrome DevTools.

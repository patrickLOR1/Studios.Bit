# Dirección de movimiento · Studios.Bit
Concepto visual: una idea naranja se convierte en estructura, interfaz y proyecto.
- Protagonistas: hero, transformación visual y cierre. Duraciones de 700–1100 ms, power3.out y power3.inOut.
- Navegación y acciones: 180–320 ms; recorridos máximos de 5 px para CTA y 14 px para el elemento reactivo.
- Revelados: máscaras sobre elementos decorativos y tipografía; el contenido semántico permanece en el HTML.
- Scroll: secuencias ligadas a la posición con scrub moderado. Sin secuestro de rueda ni pinning en móvil.
- Banda: velocidad constante de 50 px/s escritorio y 36 px/s móvil, medida a partir de la longitud real; pausa fuera de pantalla, al enfocar, al pasar el puntero y con Escape.
- Cotizador: el resultado exacto está disponible inmediatamente. Una capa decorativa numérica interpola durante 320 ms y se retira al terminar.
- Móvil: narrativa vertical, menor distancia, interacción por selección y tacto. La transformación gráfica recorre su propio progreso sin bloquear el desplazamiento.
- Movimiento reducido: gráficos en su estado final, banda legible sin animación, controles y cálculos completos.
- Ciclo de vida: matchMedia y contextos GSAP se revierten antes de rehacer la tipografía por idioma. Observadores y listeners se limpian al abandonar la página y se restablecen desde bfcache.

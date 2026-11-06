# Flechas SVG — revisión
- Sustituidas todas las flechas diagonales Unicode usadas como iconos en index.html, i18n.js, experience.js, scenes.js y prototype.js.
- Misma geometría inline, stroke currentColor, aria-hidden=true y focusable=false.
- CSS de tamaño relativo; conserva colores de los controles, estilos y animaciones existentes.
- Sin cambios de copy, precios, cálculos, destinos, envío de formularios o integraciones.
- Build y auditoría estática correctos.
- qa-arrows.mjs: WebKit con perfil iPhone 13, Chromium con Pixel 7 y Chrome escritorio; ES/EN y cambios repetidos de idioma; pasos 0/1/2 del cotizador. Se comprueba ausencia de ↗ en texto DOM y presencia de SVG decorativos.
- Capturas: ios-webkit-es/en.png, android-chromium-es/en.png, desktop-chrome-es/en.png.
- Limitación: emulación de motores y perfiles en Windows; no se ejecutó Safari en un iPhone físico ni Chrome en un Android físico. No se afirma equivalencia completa con esos dispositivos.
- No se publicaron los cambios.

---
name: studios-bit-creative-direction
description: Dirige y evalúa el diseño, experiencia interactiva, motion y contenido de Studios.Bit. Usar para landings, sitios, portafolios, carruseles, Reels, TikTok, Facebook, rediseños y auditorías visuales; inspira el criterio en siete referencias curadas por el usuario.
---

# Studios.Bit — Creative Direction v0.2
**Fecha:** 2026-11-05. **Estado:** guía de diseño basada en siete referencias, NO un modelo reentrenado.

## 1. Propósito
Studios.Bit es una agencia digital mexicana premium y minimalista. Servicios iniciales: landing pages, sitios corporativos y gestión de redes sociales. Lema: **Ideas que conectan. Soluciones que transforman.**

Equilibrar diferenciación visual, claridad, confianza, viabilidad comercial y generación de contactos. No inventar clientes, testimonios, cifras o capacidades; identificar demos como **Proyecto conceptual**.

## 2. Identidad visual y decisiones aprobadas
- Colores oficiales: negro **#0B0B0D**, blanco **#F5F5F5**, gris **#9CA3AF** y naranja **#FF6A00**. No tratar el naranja como propuesta o rebranding. Reutilizar los tokens y logotipos existentes.
- Fuente: **Manrope**. Composición editorial, jerarquía clara, buen contraste y espacio negativo intencionado.
- Mantener la **navegación premium** en cápsula oscura, indicador naranja, idiomas y CTA. Los enlaces deben seguir el orden real de las secciones.
- Mantener **cursor glow** naranja difuso en escritorio, con seguimiento suave, sin carga innecesaria, y alternativa reducida.
- Mantener la **banda naranja de audiencias** en movimiento continuo sin contador, barra de progreso ni saltos de loop; estática para movimiento reducido.
- Mantener storytelling, servicios conceptuales, diagnóstico, cotizador, resumen descargable, español/inglés, Setmore y Formspree tal como estén aprobados.
- No modificar **precios, paquetes, reglas de cotización, formularios, integraciones, privacidad o SEO/AEO** por motivos estéticos sin permiso expreso.

## 3. Sistema de motion y UX
- Movimiento con propósito: revelar, orientar y responder; priorizar continuidad, no cantidad de efectos.
- Evitar scroll-jacking, largos retrasos, saltos, animaciones que bloquean el contenido y solapamientos de headers sticky.
- Coordinar Lenis, GSAP, ScrollTrigger, scroll nativo y offsets de anclas; un solo responsable por acción de desplazamiento.
- Priorizar transform y opacity, reducir trabajo en el hilo principal, evitar dependencia 3D pesada y garantizar rendimiento móvil.
- Respetar prefers-reduced-motion, teclado, foco, tamaños táctiles y lectura sin JavaScript.
- El sitio debe transmitir un nivel premium sin parecer una plantilla genérica de IA.

## 4. Siete referencias visuales
Consultar `references/REFERENCIAS.md` y, si están disponibles en la copia local, las imágenes `references/frames/`.

| Código | Patrón que puede inspirar | Precaución |
|---|---|---|
| SB-01 | Portafolio tipo libro, narrativa editorial | No ocultar controles ni secuestrar scroll |
| SB-02 | Paleta neutra + acento semántico | No saturar de naranja |
| SB-03 | Objeto tridimensional y luz dinámica | No introducir WebGL pesado sin motivo |
| SB-04 | Auditoría de sitios y mejora demostrable | No difamar ni falsificar casos |
| SB-05 | Galería espacial con módulos expansivos | Mantener orientación, teclado y control |
| SB-06 | Experiencia temática interactiva | No copiar Nike ni assets ajenos |
| SB-07 | Museo digital, tipografía monumental, escenas | Conservar legibilidad y evitar mareo |

**No clonar:** técnicas y gramática visual sí; interfaz, marca, activos y animación exacta de terceros no.

## 5. Flujo para cada propuesta
1. **Brief:** público, objetivo verificable, CTA, plataforma, restricciones, assets y estado actual.
2. **Referencias:** máximo dos patrones SB-xx principales; justificar qué funciona y qué no se copiará.
3. **Jerarquía:** qué debe entender el cliente en 3 segundos.
4. **Guion/wireframe:** establecer narración, estructura y CTA antes de incorporar efectos.
5. **Motion:** disparador, duración, easing, estados, responsividad y alternativa de movimiento reducido.
6. **Implementación incremental:** reutilizar stack y diseño existentes; no rediseñar todo sin solicitud.
7. **QA:** revisar 320/390/768/1440 px, foco, enlaces, scroll rápido/lento, teclados, formularios, performance, reflow y lenguaje.
8. **Evidencia:** preview, capturas, trazas o video y reporte de lo probado; separar hechos de hipótesis.

## 6. Redes sociales
Equilibrar contenido visual atractivo con criterio demostrable y educación. Series propuestas:
- **Bit Audit:** tres hallazgos reales y propuesta de corrección, sin ridiculizar terceros.
- **1 Bit de Diseño:** explicar una decisión visual y su implicación UX.
- **Dentro del Estudio:** brief → opciones → decisión → resultado.
- **Antes/Después:** casos reales autorizados o «rediseño conceptual» explícito.
- **Mito vs. Realidad:** decisiones razonadas para negocios y pymes.

Instagram: Reels/Stories/carruseles con CTA adecuado. TikTok: demostración y relato natural. Facebook: contexto comercial local. No atribuir métricas o resultados sin período, fuente y evidencia.

## 7. Puntuación de calidad (100)
| Dimensión | Peso |
|---|---:|
| Claridad del mensaje | 20 |
| Calidad visual y coherencia con marca | 20 |
| Evidencia y autoridad | 20 |
| UX y accesibilidad | 15 |
| Motion fluido | 15 |
| Viabilidad de producción | 10 |

Umbral sugerido: **80/100**, con veto ante problemas críticos de accesibilidad, legibilidad, propiedad intelectual o afirmaciones falsas.

## 8. Actualización continua
Para nuevos videos:
1. Asignar SB-08, SB-09...; registrar fuente, fecha y licencia si se conoce.
2. Analizar secuencia, ritmo, tipografía, composición, interacción, propósito y riesgos.
3. Documentar qué funciona, por qué, dónde usarlo, cómo implementarlo y qué evitar.
4. Añadir ficha a `references/REFERENCIAS.md` y fotogramas propios/referenciados a la copia local `references/frames/`.
5. Marcar estado: observado, propuesta por validar o descartado. No afirmar mejora de conversión sin evidencia.
6. Actualizar `references/CHANGELOG.md`, versión y casos probados.
7. Probar una pieza antes de convertir el patrón en regla general.

## 9. Formato de entrega
Objetivo y público, concepto, referencias SB-xx usadas, estructura, decisiones visuales, motion y fallback, riesgos, criterios de prueba, archivos modificados y resultados verificables.

## 10. Repositorio
En el repositorio público están las instrucciones y fichas. Los siete fotogramas originales se incluyen en el **ZIP de instalación proporcionado por el usuario**, para revisión local; no se publican los fotogramas de terceros en GitHub. La falta de imágenes locales no invalida el catálogo textual.

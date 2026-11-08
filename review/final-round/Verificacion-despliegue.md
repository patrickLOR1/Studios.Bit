# Verificación de despliegue

## Código probado y Preview
Commit `3134f0ed1c3f95e37e49edd05ec9491811f3b3fc`, rama release/launch-preview.
Preview `dpl_4fmyCz6rdGSVFTv6WN8FxrH6m1H2`, READY, source=git, target=null.
URL: https://studiosbit-dist-e86dhc1cp-patricklor1s-projects.vercel.app
ES/EN responden 200, contienen el copy aprobado y noindex; project.css contiene la corrección SVG; robots indica Disallow: /; launch-config.js indica leadEnabled=false.

## Cambio observado en producción y decisión del usuario
Snapshot inicial: `dpl_8dv49vg5pdQzYwtvkqPCmQadR6Tf`, commit 515c5d3.
Consulta final: `dpl_3yjpdHsDvi8Qmvr6bqa5XHQjg4Zm`, commit 3134f0e, READY, source=redeploy, target=production, alias www.studiosbit.org.
Esta ronda no ejecutó promoción ni creación de un despliegue de producción. El registro se reporta sin atribuir su origen a una persona o automatización no verificada.
Al consultar la discrepancia, el usuario respondió: **“Conservar el despliegue actual”**. No se efectuó rollback.
Verificación del dominio público después del cambio: /es/ y /en/ HTTP 200 y noindex; robots Disallow: /; leadEnabled=false, privacyUrl y privacyVersion vacíos. No se activó captación ni indexación.
main remoto sigue en d28975d28cb16f7df5fa49d4eac9f94adda390b0.

Esta autorización de conservación no completa privacidad, recepción real, IVA ni pruebas en dispositivos físicos. Esos pendientes se mantienen en el checklist. El commit de cierre posterior solo añade esta documentación y actualiza el enlace del reporte, sin modificar el código probado.

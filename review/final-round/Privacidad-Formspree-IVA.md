# Privacidad, recepción e IVA — pendientes para aprobación
Fecha: 2026-11-07. No se ha activado captación ni indexación.

## Datos que debe confirmar Studios.Bit
- Nombre o razón social del responsable y domicilio para el aviso.
- Canal real para solicitudes de derechos, revocación y limitación; responsable interno, procedimiento y plazos que se aprobarán.
- Finalidades aprobadas: responder consultas, evaluar alcance y preparar propuestas. Publicidad requiere una decisión separada; no está activada.
- Plazo o criterio de conservación, eliminación y acceso del equipo a prospectos.
- Cuenta titular de Formspree, destinatario real y personas autorizadas; condiciones aplicables del proveedor, encargados y transferencias para revisión legal.
- URL HTTPS del aviso ES/EN, versión, fecha y mecanismo de actualización; aprobación del texto y consentimiento sin marcar.

El borrador anterior está en ../rc/Privacidad-borrador.md. Sigue siendo borrador, no un aviso aprobado. No inventar correos ni completar datos legales con suposiciones.

## Verificación real de Formspree, pendiente de autorización
1. Con el aviso aprobado, revisar en la cuenta oficial el formulario `mljjzngl`, destinatario verificado, notificaciones y restricciones de dominio.
2. Activar captación únicamente en un Preview de prueba autorizado, con `LEADS_ENABLED=true`, `APPROVED_PRIVACY_URL` HTTPS y `PRIVACY_VERSION` aprobada. Mantener `SITE_INDEXABLE=false`.
3. Una persona autorizada utiliza datos de prueba bajo su control, completa el cotizador, revisa resumen y consentimiento y envía una sola solicitud identificada como prueba.
4. Verificar en red POST HTTPS al endpoint oficial, respuesta correcta y confirmación solo con `ok:true`. Un clic o HTTP 200 por sí solo no acredita recepción.
5. Correlacionar hora e identificador en panel Formspree; revisar nombre, correo, empresa, servicio, descripción, objetivo, servicios, extras, inversión estimada, idioma y consentimiento. Revisar separadamente notificación en bandeja del destinatario y spam.
6. Registrar resultado sin publicar datos personales; eliminar datos de prueba según política aprobada. Desactivar captación de prueba al terminar si no se autorizó conservarla activa.

Las pruebas automatizadas interceptan respuestas: éxito, errores, caída de red y duplicados. No acreditan entrega en panel o correo. No se ha enviado una solicitud real en esta ronda.

## Decisión exacta sobre IVA
Confirmar por escrito si las tarifas base publicadas incluyen impuestos o se muestran antes de impuestos; tratamiento y tasa aplicables, validados por el responsable fiscal; presentación del desglose y regla de redondeo. Después autorizar cualquier modificación de cálculo y repetir pruebas.
Hasta entonces: `vat:null`, precios y fórmulas intactos, aviso de estimación preliminar e IVA por determinar. No añadir automáticamente 16% ni tratar lo pendiente como exento.

## Activación posterior
Aprobar commit/Preview, aviso y recepción, tarifas/IVA y dominio. Revisar la rama que Vercel considera producción. Solo con autorización separada configurar producción, integrar/promover el commit aprobado y comprobar ES/EN, flags, canonical, sitemap y recepción. Este trabajo no autoriza merge ni despliegue de producción.

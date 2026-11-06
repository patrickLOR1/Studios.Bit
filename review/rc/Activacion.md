# Configuración y activación — revisión, no ejecutar producción todavía
## Estado actual
Proyecto Vercel studios.bit-dist / prj_wfwgnrgd8RenJfRizFIeeDbPgLZ1, equipo patricklor1s-projects.
Consulta del conector: ninguna variable de proyecto; los defaults del build mantienen noindex y leads desactivados.
Dominios www.studiosbit.org y studiosbit.org verificados. Apex redirige 308 a www.
Snapshot inicial del conector: ea9735a / dpl_4ujL1Wj8HbVbxnMPcyDXZ1vUgm2p. Consulta final: 515c5d3 / dpl_8dv49vg5pdQzYwtvkqPCmQadR6Tf, READY, source=redeploy, con alias www.studiosbit.org. Se registra la discrepancia sin atribuirle causa. Esta tarea no ejecutó operaciones de producción.
Preview observado al iniciar: 8a2dada / dpl_EiYSJ2PY29Z3E86kYc5owiiKbY8Y.
main permanece d28975d; no es el commit que está sirviendo producción. No inferir el estado desplegado solo desde main.
Producción contiene experiencia bilingüe, GSAP/Lenis, diagnóstico, cotizador y enlaces comerciales; la consulta final de producción incluye la corrección de navegación 515c5d3, pero no los SVG ni los ajustes del RC. La captación activa y la indexación deben verificarse por configuración generada, no por presencia del código de integración.

## Matriz que se debe configurar tras aprobación
| Variable | Preview | Producción preparada | Activación autorizada |
|---|---|---|---|
| SITE_ENV | preview | production | production |
| SITE_URL | https://www.studiosbit.org | https://www.studiosbit.org | igual |
| SITE_INDEXABLE | false | false | true |
| LEADS_ENABLED | false | false | true, solo con privacidad y destinatario aprobados |
| APPROVED_PRIVACY_URL | vacío | vacío | URL HTTPS aprobada |
| PRIVACY_VERSION | vacío | vacío | identificador aprobado |
VERCEL_ENV=preview impide indexación incluso si SITE_ENV y SITE_INDEXABLE se configuran mal. No cambiar variables de producción en esta revisión.
El endpoint oficial ya está en código. No requiere inventar claves. El flag es una condición de compilación: cualquier cambio requiere rebuild.
No subir .env con credenciales. Preview protegido por Vercel Authentication, además de noindex.

## Pasos exactos de lanzamiento
1. Aprobar copy final si se desea cambiarlo, privacidad ES/EN, responsable, destinatario Formspree, tarifas e IVA. Mantener las cifras hasta entonces.
2. Revisar y aprobar commit RC exacto, informe, video y Preview.
3. Verificar recepción en panel y correo de una sola solicitud identificada, únicamente tras autorización de activar captación.
4. Configurar variables de producción con valores aprobados. No activar ambas funciones por mera promoción de un Preview.
5. Con autorización explícita, integrar en la rama de producción acordada y compilar desde src: npm ci; npm run build.
6. Revisar ambas rutas, canonical/hreflang, robots, sitemap, 404, seguridad y formulario en el build destinado a producción.
7. Promover exclusivamente con autorización; revalidar dominio, respuesta del formulario y notificación.
8. Verificar propiedad de Search Console y enviar sitemap. No garantizar indexación, rankings o menciones en IA.
9. Si captación falla, reconstruir con LEADS_ENABLED=false; preservar el flujo manual Instagram. Para rollback seleccionar un despliegue conocido y volver a comprobar flags.
Pendiente confirmar la rama de producción configurada en Vercel antes de cualquier merge: el historial observado incluye producción desde release/launch-preview.

## Skill independiente
HEAD remoto studiosbit-design accesible: 4565afe084809cbba26f6f6df6e8990ac3b4a4d9. No se modificó.
No borrar .agents ni AGENTS.md de esta landing todavía. Para desacoplar: comparar inventario y versiones, instalar la skill desde el repositorio independiente en el entorno compartido, comprobar descubrimiento desde esta landing y otro proyecto, luego proponer una eliminación separada dejando enlace/versionado y guía de recuperación.
`nComprobación adicional: clon de solo lectura del HEAD citado contiene únicamente README.md (git ls-tree). Faltan SKILL.md y references/ aunque README los enumera. Desacoplar ahora perdería la guía: bloqueado hasta completar y validar la biblioteca independiente, sin modificarla en esta tarea.

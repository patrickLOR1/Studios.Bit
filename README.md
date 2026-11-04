# Studios.Bit

Landing estática de Studios.Bit. La oferta visible de lanzamiento se concentra en landing pages, sitios corporativos y gestión de redes sociales.

## Previsualización local

Desde la raíz del proyecto:

```powershell
npm ci
npm run build
python -m http.server 4294 --bind 127.0.0.1 --directory dist
```

Abre `http://127.0.0.1:4294/es/` o `/en/`. Edita los archivos de `src/`. El build regenera `dist/`, incluido el HTML estático de cada idioma.

La configuración `SITE_URL` establece el origen de canonical, hreflang, Open Graph y sitemap. Las compilaciones de revisión generan `noindex,nofollow`. Solo una compilación definitiva con `SITE_INDEXABLE=true` permite indexar.

Con la vista previa activa, ejecuta `node src/qa.mjs` para probar ambas rutas en Edge y guardar las capturas en `review/`. Puedes configurar `EDGE_PATH` y `PREVIEW_URL`.

## Contacto

El formulario no transmite ni almacena datos. Prepara un mensaje local que el visitante puede copiar y enviar manualmente por Instagram. Antes de habilitar recepción automática se debe definir correo, CRM o endpoint y publicar el aviso de privacidad correspondiente.

## Pendientes operativos

- Confirmar dominio oficial antes de migrar canonical y metadatos sociales.
- Definir correo o CRM, aviso de privacidad y datos legales.
- Revisar disponibilidad y uso comercial de la marca.

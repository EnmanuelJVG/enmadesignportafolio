# Enma Designs | Portafolio de Enmanuel Valera

Todo se edita en **`js/config.js`**. No hay que tocar el HTML.

- **Datos de contacto:** `telefono`, `email`, `instagram`, `mensajeWhatsapp`
- **Nombre y etiqueta:** `nombre`, `disponible` (pon "" para ocultarla)
- **Proyecto nuevo:** crea `assets/mi-proyecto/`, mete las imágenes y copia un bloque dentro de `proyectos`. Campos opcionales `reto`, `solucion`, `resultado` para mostrar un mini caso de estudio.
- **Galería en movimiento:** una línea por pieza en `muestras`.
- **Paquetes, testimonios, proceso y preguntas:** `paquetes`, `testimonios`, `proceso`, `faq`. Si una lista está vacía, esa sección no se muestra.
- **Portafolio en PDF:** sube el PDF a `assets/` y escribe la ruta en `pdf`.

- **Marcas con las que he trabajado:** `marcas` (solo nombre, o `{ nombre, logo }` con logo en PNG/SVG transparente)
- **Formulario de cotización:** las opciones salen de `servicios`; los plazos se editan en `plazos`

## Enlace directo a cada proyecto
Se forma con el título: `https://tu-dominio/#proyecto-cochi-dark-kitchen` (minúsculas, sin tildes, con guiones). Dentro de cada proyecto hay un botón para compartir o copiar el enlace. Si cambias el título de un proyecto, su enlace cambia.

## Código QR y guardar contacto
Se generan solos con la dirección real de la página. Descarga el QR desde tu dominio final antes de imprimirlo.

## Estadísticas
En Vercel: tu proyecto, Analytics, Enable. Luego haz un nuevo deploy.

## Reglas de archivos
Minúsculas, sin espacios ni tildes (`cochi-flyer-1.webp`). Imágenes en `.webp` o `.jpg` de máximo 1600 px de lado.

## Vista previa en WhatsApp
En `index.html`, cambia `TU-DOMINIO.vercel.app` (en `og:image`) por tu dirección real.

## Publicar
Sube la carpeta a GitHub. Vercel se actualiza solo.

## Agregar páginas web al portafolio

La sección **Páginas web** aparece automáticamente cuando agregas al menos un sitio válido en `sitiosWeb` dentro de `js/config.js`. No tienes que modificar el HTML. Cada sitio puede tener una portada, una descripción, etiquetas y capturas adicionales que se pueden deslizar en teléfonos. También incluye una vista rápida interactiva y un botón para abrir el sitio completo en otra pestaña.

1. Abre el sitio publicado y guarda una captura representativa (idealmente `.webp`, de unos 1400–1800 px de ancho). Para una captura de página completa en Chrome o Edge, abre las herramientas de desarrollador (`F12`), pulsa `Ctrl + Shift + P`, busca **Capture full size screenshot** y guarda la imagen.
2. Dentro de la carpeta del portafolio, crea `assets/websites/` y copia allí la portada y capturas. Usa nombres simples sin espacios ni tildes, por ejemplo `catalogo-portada.webp` y `catalogo-movil.webp`.
3. Abre `js/config.js` y añade un objeto dentro de `sitiosWeb`, siguiendo el ejemplo incluido en ese archivo. Coloca la URL pública completa, comenzando con `https://`.
4. Guarda los cambios y súbelos al repositorio conectado a Vercel. Cuando termine el despliegue, la sección aparecerá en tu portafolio.

**Importante:** utiliza enlaces públicos para mostrar páginas a posibles clientes. No agregues enlaces a paneles administrativos privados ni datos de inicio de sesión. Algunas webs bloquean las vistas dentro de un `iframe`; cuando eso ocurra, el portafolio seguirá ofreciendo el botón **Abrir sitio completo** y la galería de capturas.

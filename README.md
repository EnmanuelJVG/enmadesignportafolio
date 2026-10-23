# Enma Designs: Portafolio

Todo se edita en **`js/config.js`**. No hay que tocar el HTML.

## Agregar un proyecto nuevo
1. Crea una carpeta dentro de `assets/`, por ejemplo `assets/mi-proyecto/`.
2. Mete ahí las imágenes y videos del proyecto.
3. En `js/config.js`, dentro de `proyectos: [ ... ]`, copia este bloque (con una coma al final del bloque anterior):

```js
{ titulo: "Nombre del proyecto", categoria: "Flyers", anio: "2026",
  portada: "assets/mi-proyecto/portada.png",
  galeria: ["assets/mi-proyecto/1.png", "assets/mi-proyecto/2.png", "assets/mi-proyecto/video.mp4"],
  enlace: "",
  descripcion: "Qué necesitaba el cliente, qué hiciste y el resultado." },
```

## Galería en movimiento
Agrega una línea en `muestras: [ ... ]` por cada pieza (imagen o .mp4). Se muestran en dos carruseles en bucle (la fila de abajo va al revés). Al pasar el cursor o tocar, se detienen.

## Reglas para los nombres de archivos
- Usa minúsculas, sin espacios, sin tildes ni ñ: `cochi-flyer-1.png`.
- Escribe la ruta exactamente igual que el archivo. `Foto.png` y `foto.png` son distintos en Vercel.

## Publicar
Sube la carpeta a GitHub. En Vercel: Add New, Project, elige el repositorio y Deploy.

## Animación de entrada
Está en `js/intro.js`. Para quitarla, pon `animacionInicio: false` en `js/config.js`.

## Textos en movimiento
Las cintas diagonales usan `frases` en `js/config.js`. La palabra que cambia en el inicio sale de los títulos de `servicios`.

## Galería (tocar para ampliar)
En `muestras` puedes poner solo la ruta, o un bloque con título y texto que se ve al tocar la pieza:
`{ src: "assets/flyer.webp", titulo: "Título", texto: "Qué hiciste." }`

## Vista previa en WhatsApp
En `index.html` cambia `TU-DOMINIO.vercel.app` (en `og:image`) por tu dirección real de Vercel. Así WhatsApp muestra tu logo al enviar el enlace.

## Imágenes ligeras para celular
Usa `.webp` o `.jpg` de máximo 1600 px de lado. Las imágenes pesadas hacen lenta la web con datos móviles.

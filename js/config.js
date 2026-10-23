/* ===== EDITA AQUÍ TUS DATOS Y PROYECTOS ===== */
window.CONFIG = {
  marca: "Enma Designs",
  nombre: "Enmanuel Valera",
  disponible: "Disponible para nuevos proyectos",   // pon "" para ocultar la etiqueta
  pdf: "",                                          // ej: "assets/portafolio.pdf" (si lo pones, aparece el botón de descarga)
  animacionInicio: true,               // true = animación de entrada al abrir la web; false = sin animación
  telefono: "+58 412 550 0298",        // cambia por tu número con código de país
  mensajeWhatsapp: "Hola, vi tu portafolio y quiero hablar de un proyecto.",
  email: "enmajvg1406@gmail.com",
  instagram: "enmajvgdesign",              // sin @
  foto: "assets/foto.webp",                            // tu foto, ej: "assets/foto.jpg" (vertical 4:5 se ve mejor)
  frases: ["Diseño con identidad", "Marcas que se recuerdan", "Creatividad en movimiento"],  // texto de las cintas en movimiento
  intro: "Una imagen vale más que mil palabras. Haz que tus ideas cobren vida.",

  sobre: [
    "Soy Enmanuel Valera, diseñador gráfico, y le doy forma visual a marcas y negocios.",
    "Trabajo con la creación de logotipos, identidad visual, branding y flyers. También estoy empezando en diseño web. Me importa que cada pieza se vea bien, diga con claridad quién eres y transmita lo que muchas palabras a veces no alcanzan a decir."
  ],

  servicios: [
    { titulo: "Logotipos", texto: "Un símbolo y un nombre que se reconocen a la primera." },
    { titulo: "Identidad visual", texto: "Colores, tipografías y reglas para que tu marca se vea igual en todas partes." },
    { titulo: "Branding", texto: "Qué eres, cómo hablas y cómo te ves, reunido en un solo sistema." },
    { titulo: "Flyers y redes", texto: "Piezas para promocionar, listas para imprimir o publicar." },
    { titulo: "Páginas web", texto: "Páginas simples y claras. Es un servicio nuevo para mí.", nuevo: true }
  ],

  /* PROYECTOS. Al tocar uno, se abre completo para tus clientes.
     portada:     imagen o video de la tarjeta (ej: "assets/cochi/portada.jpg")
     descripcion: cuenta qué necesitaba el cliente, qué hiciste y el resultado
     galeria:     lista de imágenes o videos que se ven al abrirlo
                  ej: ["assets/cochi/1.jpg", "assets/cochi/2.jpg", "assets/cochi/video.mp4"]
     enlace:      opcional, botón "Ver proyecto en línea"
     reto, solucion, resultado: opcionales. Si los llenas, se muestran como mini caso de estudio. */
  proyectos: [
    { titulo: "Cochi Dark Kitchen", categoria: "Identidad visual", anio: "", portada: "assets/cochiportada.png", galeria: ["assets/cochilogo.png", "assets/cochiflyer1.webp", "assets/cochiflyer2.webp", "assets/cochiflyer3.webp", "assets/cochiflyer4.webp", "assets/cochiportada.png"], enlace: "",
      descripcion: "Cochi Dark Kitchen es un proyecto que nace a partir de una idea familiar para llevar el amor a cada mesa, a cada hogar y a cada persona, eso fue lo que se intentó lograr con el branding de este negocio." },
    { titulo: "Cochi Dulce", categoria: "Identidad visual", anio: "", portada: "assets/cochidulceportada.png", galeria: ["assets/cochidulceportada.png", "assets/cochidulceiso.png", "assets/cochi_dulce_animado.mp4", "assets/logo-animado.mp4"], enlace: "",
      descripcion: "Cochi Dulce es la submarca de Cochi Dark Kitchen para brindarle un poco de dulzura a tu día. " },
    { titulo: "Tanquetuy", categoria: "Flyers", anio: "", portada: "assets/tanquetuy/tanquetuy.webp", galeria: ["assets/tanquetuy/tanquetuy1.webp", "assets/tanquetuy/tanquetuy2.webp", "assets/tanquetuy/tanquetuy3.webp", "assets/tanquetuy/tanquetuy4.webp"], enlace: "",
      descripcion: "Tanquetuy es la solución para la familia y el hogar cuando a tanques para almacenar agua se refiere, y eso es lo que queremos transmitir en cada diseño." },
    { titulo: "Aquito", categoria: "Branding", anio: "", portada: "assets/aquito/aquito1.webp", galeria: ["assets/aquito/aquito2.webp", "assets/aquito/aquito3.webp", "assets/aquito/aquito4.webp", "assets/aquito/aquito5.webp", "assets/aquito/aquito6.webp", "assets/aquito/aquito7.webp", "assets/aquito/aquito8.webp"], enlace: "",
      descripcion: "Branding y piezas gráficas para Aquito." },
  ],

  /* PÁGINAS WEB PUBLICADAS.
     Agrega una entrada por cada web que quieras mostrar en el portafolio.
     titulo: nombre del proyecto.
     categoria: por ejemplo "Catálogo web", "Landing page" o "Web para restaurante".
     descripcion: explicación breve del objetivo del sitio.
     url: dirección pública completa, incluyendo https:// (no uses enlaces a paneles privados).
     portada: captura/imagen que se verá en la tarjeta, dentro de assets/.
     capturas: lista opcional de capturas adicionales para deslizar en la vista rápida.
     etiquetas: lista opcional de funciones, por ejemplo ["Responsive", "Pedidos por WhatsApp"].
     La sección aparece automáticamente cuando haya al menos un sitio con título y URL válida.
     Ejemplo para copiar y adaptar:
     {
       titulo: "Nombre del proyecto",
       categoria: "Catálogo web",
       descripcion: "Una descripción breve de lo que permite hacer la página.",
       url: "https://tu-sitio.vercel.app",
       portada: "assets/websites/mi-sitio-portada.webp",
       capturas: ["assets/websites/mi-sitio-desktop.webp", "assets/websites/mi-sitio-movil.webp"],
       etiquetas: ["Diseño responsive", "WhatsApp"]
     }
  */
  sitiosWeb: [
    // Agrega aquí tus páginas web publicadas usando el formato del ejemplo anterior.
    {
    titulo: "Tanquetuy Catálogo",
    categoria: "Catálogo web",
    descripcion: "Nuestro cliente confío en nosotros para mostrar su catálogo de una manera mas organizada ocn pagina web sencilla, pero funcional.",
    url: "https://tutanquetuy.vercel.app/",
    portada: "assets/tanquetuy/web/portadawebtanquetuy.png",
    capturas: [
      "assets/tanquetuy/web/tanquetuycap1.png",
      "assets/tanquetuy/web/tanquetuycap2.png"
    ],
    etiquetas: ["Catálogo, Pedidos por Whatsapp"]
  }
  ],

  /* GALERÍA EN MOVIMIENTO: piezas que van apareciendo solas al bajar (no hay que tocarlas).
     Agrega una línea por pieza: imagen (.png .jpg .webp) o video (.mp4). Se acomodan solas. */
  /* Para que al tocar una pieza se muestre un título y un texto, usa este formato en lugar del texto simple:
     { src: "assets/flyer.webp", titulo: "Flyer de apertura", texto: "Qué hice en esta pieza." } */
  muestras: [
    "assets/flyers/blink1.png",
    "assets/flyers/blink2.webp",
    "assets/flyers/flyer1.webp",
    "assets/flyers/flyer2.webp",
    "assets/flyers/flyer3.webp",
    "assets/flyers/flyer4.webp",
    "assets/tanquetuy/tanquetuy1.webp",
    "assets/tanquetuy/tanquetuy2.webp",
    "assets/flyers/risus1.webp",
    "assets/flyers/risus2.webp",
    "assets/cochiflyer3.webp",
    "assets/flyers/polloasado.webp",
    "assets/cochi_dulce_animado.mp4",
    "assets/logo-animado.mp4",
    "assets/flyers/camisaepj1.webp",
    "assets/flyers/camisaepj2.webp",
    "assets/flyers/camisaepj3.webp"
  ],

  /* PAQUETES. desde: precio (ej: "$50"). Si lo dejas vacío dice "Consultar precio".
     etiqueta (opcional): ej "Más pedido". Borra todo el bloque paquetes: [...] para ocultar la sección. */
  paquetes: [
    { nombre: "Logotipo", desde: "", etiqueta: "Logotipo", incluye: ["Logotipo principal", "Versiones para fondo claro y oscuro", "Archivos para redes e impresión"] },
    { nombre: "Identidad visual", desde: "", etiqueta: "Identidad", incluye: ["Logotipo y variantes", "Paleta de colores y tipografías", "Guía básica de uso de la marca"] },
    { nombre: "Pack de flyers", desde: "", etiqueta: "Flyers", incluye: ["Piezas para redes o impresión", "Mismo estilo de tu marca", "Archivos listos para publicar"] }
  ],

  /* TESTIMONIOS. Pídele a un cliente una frase por WhatsApp (con su permiso). Mientras esté vacío, la sección no se muestra.
     Ejemplo: { texto: "Qué dijo el cliente.", nombre: "Nombre", negocio: "Cochi Dark Kitchen" } */
  testimonios: [],

  /* CÓMO TRABAJO. tiempo (opcional): ej "1 a 2 días" */
  proceso: [
    { titulo: "Conversamos", texto: "Me cuentas tu idea, tu negocio y lo que necesitas.", tiempo: "" },
    { titulo: "Propuesta", texto: "Te explico qué incluye, el tiempo estimado y el precio.", tiempo: "" },
    { titulo: "Diseño", texto: "Creo tu propuesta y la ajustamos juntos con tus comentarios.", tiempo: "" },
    { titulo: "Entrega", texto: "Recibes tus archivos listos para redes, impresión o web.", tiempo: "" }
  ],

  /* PREGUNTAS FRECUENTES. Cambia las respuestas por tus condiciones reales (tiempos, pagos, revisiones). */
  faq: [
    { p: "¿Cuánto tarda un proyecto?", r: "Depende de lo que necesites. Después de conversar contigo te doy un tiempo estimado." },
    { p: "¿Cómo se paga?", r: "Lo acordamos antes de empezar, junto con la propuesta." },
    { p: "¿Cuántas revisiones incluye?", r: "Cada propuesta incluye ajustes. Te explico cuántos al enviarte el presupuesto." },
    { p: "¿Qué necesito para empezar?", r: "Solo contarme sobre tu negocio y, si tienes, enviarme referencias que te gusten." }
  ],

  /* MARCAS con las que has trabajado. Puedes poner solo el nombre, o con logo (PNG/SVG con fondo transparente):
     { nombre: "Cochi", logo: "assets/marcas/cochi.webp" }. Si lo dejas vacío, la franja no se muestra. */
  marcas: ["Cochi Darkitchen", "Cochi Dulce", "Tanquetuy", "Aquito", "Qrico", "Risus Boutique", "Blink Comunity"],

  /* Opciones de "¿Para cuándo lo necesitas?" en el formulario de cotización */
  plazos: ["Lo antes posible", "Esta semana", "Este mes", "Sin prisa"]
};

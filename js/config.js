/* ===== EDITA AQUÍ TUS DATOS Y PROYECTOS ===== */
window.CONFIG = {
  marca: "Enma Designs",
  animacionInicio: true,               // true = animación de entrada al abrir la web; false = sin animación
  telefono: "+58 412 550 0298",        // cambia por tu número con código de país
  mensajeWhatsapp: "Hola, vi tu portafolio y quiero hablar de un proyecto.",
  email: "enmajvg1406@gmail.com",
  instagram: "enmajvgdesign",              // sin @
  foto: "assets/foto.webp",                            // tu foto, ej: "assets/foto.jpg" (vertical 4:5 se ve mejor)
  frases: ["Diseño con identidad", "Marcas que se recuerdan", "Creatividad en movimiento"],  // texto de las cintas en movimiento
  intro: "Una imagen vale mas que mil palabras. Haz que tus ideas cobren vida.",

  sobre: [
    "Soy Enmanuel Valera diseñador grafico y le doy forma visual a marcas y negocios.",
    "Trabajo con la creación de logotipos, identidad visual, branding y flyers. También estoy empezando en diseño web. Me importa que cada pieza se vea bien, diga con claridad quién eres y transmita lo que muchas palabras aveces no alcanzan a decir."
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
     enlace:      opcional, botón "Ver proyecto en línea" */
  proyectos: [
    { titulo: "Cochi Dark Kitchen", categoria: "Identidad visual", anio: "", portada: "assets/cochiportada.png", galeria: ["assets/cochilogo.png", "assets/cochiflyer1.webp", "assets/cochiflyer2.webp", "assets/cochiflyer3.webp", "assets/cochiflyer4.webp", "assets/cochiportada.png"], enlace: "",
      descripcion: "Cochi Darkitchen es un proyecto que nace apartir de una idea familiar para llevar el amor a cada mesa, a cada hogar y a cada persona, eso fue lo que se intento lograr con el branding de este negocio." },
    { titulo: "Cochi Dulce", categoria: "Identidad visual", anio: "", portada: "assets/cochidulceportada.png", galeria: ["assets/cochidulceportada.png", "assets/cochidulceiso.png", "assets/cochi_dulce_animado.mp4", "assets/logo-animado.mp4"], enlace: "",
      descripcion: "Cochi Dulce es la submarca de *Cochi Dartkitchen* para brindarle un poco de dulzura a tu día. " },
    { titulo: "Tanquetuy", categoria: "Flyers", anio: "", portada: "assets/tanquetuy/tanquetuy.png", galeria: ["assets/tanquetuy/tanquetuy1.png", "assets/tanquetuy/tanquetuy2.png", "assets/tanquetuy/tanquetuy3.png", "assets/tanquetuy/tanquetuy4.png"], enlace: "",
      descripcion: "Tanquetuy es la solución para la familia y el hogar cuando a tanques para almacenar agua se refiere y eso es lo que queremos transmitir en los diseños que le realizamos" },
    { titulo: "Aquito", categoria: "Branding", anio: "", portada: "assets/aquito/aquito1.png", galeria: ["assets/aquito/aquito2.png", "assets/aquito/aquito3.png", "assets/aquito/aquito4.png", "assets/aquito/aquito5.png", "assets/aquito/aquito6.png", "assets/aquito/aquito7.png", "assets/aquito/aquito8.png"], enlace: "",
      descripcion: "Descripción de ejemplo. Cámbiala por tu proyecto real." }
    
  ],

  /* GALERÍA EN MOVIMIENTO: piezas que van apareciendo solas al bajar (no hay que tocarlas).
     Agrega una línea por pieza: imagen (.png .jpg .webp) o video (.mp4). Se acomodan solas. */
  /* Para que al tocar una pieza se muestre un título y un texto, usa este formato en lugar del texto simple:
     { src: "assets/flyer.webp", titulo: "Flyer de apertura", texto: "Qué hice en esta pieza." } */
  muestras: [
    "assets/flyers/blink1.png",
    "assets/flyers/blink2.png",
    "assets/flyers/flyer1.png",
    "assets/flyers/flyer2.png",
    "assets/flyers/flyer3.png",
    "assets/flyers/flyer4.png",
    "assets/tanquetuy/tanquetuy1.png",
    "assets/tanquetuy/tanquetuy2.png",
    "assets/flyers/risus1.png",
    "assets/flyers/risus2.png",
    "assets/cochiflyer3.webp",
    "assets/flyers/polloasado.png",
    "assets/cochi_dulce_animado.mp4",
    "assets/logo-animado.mp4",
    "assets/flyers/camisaepj1.png",
    "assets/flyers/camisaepj2.png",
    "assets/flyers/camisaepj3.png"
  ]
};

/* Panel /admin: edita el mismo contenido de js/config.js y lo guarda en Supabase. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const clone = o => JSON.parse(JSON.stringify(o));
  const get = (o, p) => p.split(".").reduce((a, k) => a?.[k], o);
  const set = (o, p, v) => { const k = p.split("."), l = k.pop(); k.reduce((a, x) => a[x], o)[l] = v; };
  const S = window.SUPABASE || {}, BUCKET = S.bucket || "portafolio";

  if (!S.url || !S.anonKey) {
    $("#login").hidden = false; $("#lf").hidden = true;
    $("#login").insertAdjacentHTML("beforeend", "<p class='err'>Falta conectar Supabase. Sigue ADMIN-SETUP.md y completa js/supabase-config.js.</p>");
    return;
  }
  const sb = supabase.createClient(S.url, S.anonKey);

  /* ---------- Qué se puede editar ---------- */
  const f = (k, l, t = "text", o = {}) => ({ k, l, t, ...o });
  const L = (h, list, add, label, fields, blank, o = {}) => ({ h, list, add, label, fields, blank, ...o });
  const P = {
    proyectos: L("Proyectos", "proyectos", "Nuevo proyecto", ["titulo"], [f("titulo", "Título"), f("categoria", "Categoría (Branding, Flyers…)"), f("anio", "Año"), f("portada", "Portada (imagen o video)", "img"), f("galeria", "Galería (se ve al abrir el proyecto)", "imgs"), f("descripcion", "Descripción", "area"), f("enlace", "Enlace en línea (opcional)"), f("reto", "El reto (opcional)", "area"), f("solucion", "Lo que hice (opcional)", "area"), f("resultado", "El resultado (opcional)", "area")], { titulo: "", categoria: "", anio: "", portada: "", galeria: [], enlace: "", descripcion: "", reto: "", solucion: "", resultado: "" }),
    sitiosWeb: L("Páginas web", "sitiosWeb", "Nueva página web", ["titulo"], [f("titulo", "Título"), f("categoria", "Categoría (Catálogo web, Landing…)"), f("descripcion", "Descripción", "area"), f("url", "Dirección (https://…)"), f("portada", "Portada", "img"), f("capturas", "Capturas adicionales", "imgs"), f("etiquetas", "Etiquetas", "strs")], { titulo: "", categoria: "", descripcion: "", url: "", portada: "", capturas: [], etiquetas: [] }),
    muestras: L("Galería en movimiento", "muestras", "Nueva pieza", ["titulo", "src"], [f("src", "Imagen o video", "img"), f("titulo", "Título (opcional)"), f("texto", "Texto al tocarla (opcional)", "area")], { src: "", titulo: "", texto: "" }, { bulk: true }),
    marcas: L("Marcas y clientes", "marcas", "Nuevo cliente", ["nombre"], [f("nombre", "Nombre del cliente"), f("logo", "Logo (opcional, PNG/SVG transparente)", "img", { acc: "image/*" })], { nombre: "", logo: "" }),
    testimonios: L("Opiniones de clientes", "testimonios", "Nueva opinión", ["nombre"], [f("texto", "Lo que dijo", "area"), f("nombre", "Nombre"), f("negocio", "Negocio (opcional)")], { texto: "", nombre: "", negocio: "" }),
    paquetes: L("Paquetes y precios", "paquetes", "Nuevo paquete", ["nombre"], [f("nombre", "Nombre del paquete"), f("desde", "Precio desde (ej. $50). Vacío = «Consultar precio»"), f("etiqueta", "Etiqueta (ej. Más pedido)"), f("incluye", "Qué incluye", "strs")], { nombre: "", desde: "", etiqueta: "", incluye: [] }),
    servicios: L("Servicios", "servicios", "Nuevo servicio", ["titulo"], [f("titulo", "Nombre"), f("texto", "Descripción", "area"), f("nuevo", "Mostrar etiqueta «Nuevo»", "check")], { titulo: "", texto: "", nuevo: false }),
    proceso: L("Cómo trabajo", "proceso", "Nuevo paso", ["titulo"], [f("titulo", "Paso"), f("texto", "Descripción", "area"), f("tiempo", "Tiempo (opcional)")], { titulo: "", texto: "", tiempo: "" }),
    faq: L("Preguntas frecuentes", "faq", "Nueva pregunta", ["p"], [f("p", "Pregunta"), f("r", "Respuesta", "area")], { p: "", r: "" })
  };
  const TABS = [
    { n: "Proyectos", parts: [P.proyectos] },
    { n: "Webs", parts: [P.sitiosWeb] },
    { n: "Galería", parts: [P.muestras] },
    { n: "Clientes", parts: [P.marcas, P.testimonios] },
    { n: "Precios", parts: [P.paquetes] },
    { n: "Servicios", parts: [P.servicios] },
    { n: "Textos", parts: [{ h: "Datos principales", fields: [f("marca", "Nombre de la marca"), f("nombre", "Tu nombre"), f("disponible", "Etiqueta de disponibilidad (vacío = ocultar)"), f("intro", "Frase de portada", "area"), f("foto", "Tu foto", "img", { acc: "image/*" }), f("sobre", "Sobre mí (un párrafo por casilla)", "strs", { area: 1 }), f("frases", "Frases de las cintas", "strs")] }] },
    { n: "Contacto", parts: [{ h: "Contacto", fields: [f("telefono", "WhatsApp con código de país (+58…)"), f("email", "Correo"), f("instagram", "Instagram (sin @)"), f("mensajeWhatsapp", "Mensaje inicial de WhatsApp", "area"), f("pdf", "Portafolio en PDF (opcional)", "img", { acc: "application/pdf" })] }] },
    { n: "Proceso", parts: [P.proceso, P.faq] },
    { n: "Ajustes", parts: [{ h: "Ajustes", fields: [f("animacionInicio", "Animación de entrada al abrir la web", "check"), f("plazos", "Opciones de «¿Para cuándo lo necesitas?»", "strs"), f("herramientas", "Herramientas que usas", "strs")] }] }
  ];
  const BLANK = Object.fromEntries(Object.values(P).map(p => [p.list, p.blank]));

  /* ---------- Estado ---------- */
  let data = {}, tab = 0, isDirty = false, tt;
  const open = new Set();
  const toast = (m, err) => { const t = $("#toast"); t.textContent = m; t.className = "show" + (err ? " err" : ""); clearTimeout(tt); if (err !== 0) tt = setTimeout(() => t.className = "", 3500); };
  const dirty = (v = true) => { isDirty = v; $("#save").textContent = v ? "Guardar y publicar ●" : "Todo guardado ✓"; };
  addEventListener("beforeunload", e => { if (isDirty) { e.preventDefault(); e.returnValue = ""; } });

  function normalize() {
    ["frases", "sobre", "servicios", "proyectos", "sitiosWeb", "muestras", "paquetes", "testimonios", "proceso", "faq", "marcas", "plazos", "herramientas"].forEach(k => data[k] = Array.isArray(data[k]) ? data[k] : []);
    data.marcas = data.marcas.map(m => typeof m === "string" ? { nombre: m, logo: "" } : m);
    data.muestras = data.muestras.map(m => typeof m === "string" ? { src: m } : m);
    data.proyectos.forEach(p => p.galeria = p.galeria || []);
    data.sitiosWeb.forEach(w => { w.capturas = w.capturas || []; w.etiquetas = w.etiquetas || []; });
    data.paquetes.forEach(p => p.incluye = p.incluye || []);
    data.animacionInicio = data.animacionInicio !== false;
  }
  async function load() {
    const { data: row, error } = await sb.from("site_content").select("data").eq("id", 1).maybeSingle();
    if (error) toast("No pude leer los datos. ¿Ejecutaste supabase/setup.sql? " + error.message, 1);
    data = Object.assign(clone(window.CONFIG), row?.data || {});
    normalize();
  }

  /* ---------- Dibujo ---------- */
  const src = u => /^(https?:)?\/\//.test(u) || u.startsWith("/") ? u : "/" + u;
  const media = u => /\.(mp4|webm|mov)(\?|$)/i.test(u) ? `<video src="${esc(src(u))}" muted playsinline preload="metadata"></video>` : /\.(png|jpe?g|webp|gif|svg|avif)(\?|$)/i.test(u) ? `<img src="${esc(src(u))}" alt="" loading="lazy">` : `<span class="doc">📄</span>`;
  const thumbs = (arr, path, multi) => arr.length ? `<div class="ths">${arr.map((u, i) => `<div class="th">${media(u)}<div class="tb">${multi ? `<button type="button" data-mv="${path}.${i}:-1">◀</button><button type="button" data-mv="${path}.${i}:1">▶</button><button type="button" class="d" data-del="${path}.${i}">✕</button>` : `<button type="button" class="d" data-clr="${path}">Quitar</button>`}</div></div>`).join("")}</div>` : "";
  function fieldHTML(fd, path, val) {
    const lab = `<label class="lb">${esc(fd.l)}</label>`, acc = esc(fd.acc || "image/*,video/mp4,video/webm");
    if (fd.t === "area") return `<div class="fd">${lab}<textarea rows="4" data-p="${path}">${esc(val)}</textarea></div>`;
    if (fd.t === "check") return `<label class="ck"><input type="checkbox" data-p="${path}" ${val ? "checked" : ""}> ${esc(fd.l)}</label>`;
    if (fd.t === "img") return `<div class="fd">${lab}${thumbs(val ? [val] : [], path, false)}<div class="row"><button type="button" class="b" data-up="${path}" data-acc="${acc}">${val ? "Cambiar archivo" : "Subir archivo"}</button></div><input data-p="${path}" value="${esc(val)}" placeholder="o escribe la ruta / dirección"></div>`;
    if (fd.t === "imgs") return `<div class="fd">${lab}${thumbs(val || [], path, true)}<button type="button" class="b" data-up="${path}" data-multi="1" data-acc="${acc}">+ Subir archivos</button></div>`;
    if (fd.t === "strs") return `<div class="fd">${lab}${(val || []).map((s, i) => `<div class="row">${fd.area ? `<textarea rows="4" data-p="${path}.${i}">${esc(s)}</textarea>` : `<input data-p="${path}.${i}" value="${esc(s)}">`}<button type="button" class="b d" data-del="${path}.${i}">✕</button></div>`).join("")}<button type="button" class="b" data-add="${path}">+ Agregar</button></div>`;
    return `<div class="fd">${lab}<input data-p="${path}" value="${esc(val)}"></div>`;
  }
  const label = (it, p) => it[p.label[0]] || (p.label[1] && String(it[p.label[1]] || "").split("/").pop()) || "Sin título";
  function listHTML(p) {
    return data[p.list].map((it, i) => { const k = `${p.list}.${i}`; return `<details class="it" data-k="${k}" ${open.has(k) ? "open" : ""}><summary><span>${esc(label(it, p))}</span><span class="mv"><button type="button" data-mv="${k}:-1">↑</button><button type="button" data-mv="${k}:1">↓</button><button type="button" class="d" data-del="${k}">🗑</button></span></summary><div class="bd">${p.fields.map(fd => fieldHTML(fd, `${k}.${fd.k}`, it[fd.k])).join("")}</div></details>`; }).join("")
      + `<button type="button" class="add" data-add="${p.list}">+ ${p.add}</button>` + (p.bulk ? `<button type="button" class="add" data-up="${p.list}" data-bulk="1" data-multi="1" data-acc="image/*,video/mp4,video/webm">+ Subir varias piezas de una vez</button>` : "");
  }
  function render(keepScroll = true) {
    const y = scrollY, t = TABS[tab];
    $("#tabs").innerHTML = TABS.map((x, i) => `<button class="${i === tab ? "on" : ""}" data-tab="${i}">${x.n}</button>`).join("");
    $("#main").innerHTML = t.parts.map(p => `<h2>${p.h}</h2>` + (p.list ? listHTML(p) : p.fields.map(fd => fieldHTML(fd, fd.k, data[fd.k])).join(""))).join("")
      + (t.n === "Ajustes" ? `<h2>Zona delicada</h2><button type="button" class="b d" id="reset">Restaurar contenido original (js/config.js)</button>` : "");
    scrollTo(0, keepScroll ? y : 0);
  }

  /* ---------- Subir archivos ---------- */
  async function upload(file) {
    let blob = file, ext = (file.name.split(".").pop() || "bin").toLowerCase(), type = file.type;
    if (/^image\/(jpeg|png|webp)$/.test(type)) {
      try {
        const bmp = await createImageBitmap(file), k = Math.min(1, 1600 / Math.max(bmp.width, bmp.height)), c = document.createElement("canvas");
        c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
        c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
        const w = await new Promise(r => c.toBlob(r, "image/webp", .86));
        if (w) { blob = w; ext = "webp"; type = "image/webp"; }
      } catch (_) {}
    }
    const name = file.name.replace(/\.[^.]+$/, "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "archivo";
    const path = `${new Date().getFullYear()}/${Date.now()}-${name}.${ext}`;
    const { error } = await sb.storage.from(BUCKET).upload(path, blob, { contentType: type || "application/octet-stream", cacheControl: "31536000" });
    if (error) throw error;
    return sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
  }
  function pick(d) {
    const inp = Object.assign(document.createElement("input"), { type: "file", multiple: !!d.multi, accept: d.acc });
    inp.onchange = async () => {
      const files = [...inp.files]; if (!files.length) return;
      try {
        const urls = [];
        for (let i = 0; i < files.length; i++) { toast(`Subiendo ${i + 1} de ${files.length}…`, 0); urls.push(await upload(files[i])); }
        if (d.bulk) urls.forEach(u => data[d.up].push({ src: u, titulo: "", texto: "" }));
        else if (d.multi) get(data, d.up).push(...urls);
        else set(data, d.up, urls[0]);
        dirty(); render(); toast("Archivo subido ✓ Recuerda guardar");
      } catch (err) { toast("No se pudo subir: " + (err.message || err), 1); }
    };
    inp.click();
  }

  /* ---------- Eventos ---------- */
  const arrOp = (p, fn) => { const k = p.split("."), i = +k.pop(); fn(get(data, k.join(".")), i); };
  const main = $("#main");
  main.addEventListener("input", e => { const p = e.target.dataset.p; if (p) { set(data, p, e.target.type === "checkbox" ? e.target.checked : e.target.value); dirty(); } });
  main.addEventListener("toggle", e => { const k = e.target.dataset?.k; if (k) e.target.open ? open.add(k) : open.delete(k); }, true);
  main.addEventListener("click", async e => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.closest("summary")) e.preventDefault();
    const d = b.dataset;
    if (d.up) return pick(d);
    if (b.id === "reset") {
      if (!confirm("Esto borra lo guardado en la nube y vuelve al contenido de js/config.js. ¿Seguro?")) return;
      const { error } = await sb.from("site_content").delete().eq("id", 1);
      if (error) return toast("No se pudo restaurar: " + error.message, 1);
      data = clone(window.CONFIG); normalize(); dirty(false); render(false); return toast("Contenido original restaurado ✓");
    }
    if (d.del) { if (!confirm("¿Eliminar?")) return; arrOp(d.del, (a, i) => a.splice(i, 1)); }
    else if (d.mv) { const [p, s] = d.mv.split(":"); arrOp(p, (a, i) => { const j = i + +s; if (j >= 0 && j < a.length) [a[i], a[j]] = [a[j], a[i]]; }); }
    else if (d.add) { const a = get(data, d.add); a.push(BLANK[d.add] ? clone(BLANK[d.add]) : ""); if (BLANK[d.add]) open.add(`${d.add}.${a.length - 1}`); }
    else if (d.clr) set(data, d.clr, "");
    else return;
    dirty(); render();
  });
  $("#tabs").addEventListener("click", e => { const b = e.target.closest("[data-tab]"); if (b) { tab = +b.dataset.tab; render(false); } });

  $("#save").onclick = async () => {
    const btn = $("#save"); btn.disabled = true; btn.textContent = "Guardando…";
    const { error } = await sb.from("site_content").upsert({ id: 1, data, updated_at: new Date().toISOString() });
    btn.disabled = false;
    if (error) { dirty(true); return toast("No se pudo guardar: " + error.message, 1); }
    dirty(false); toast("Publicado ✓ Ya está en tu web");
  };

  /* ---------- Sesión ---------- */
  const showLogin = () => { $("#app").hidden = true; $("#login").hidden = false; };
  async function start() { $("#login").hidden = true; $("#app").hidden = false; await load(); render(false); }
  $("#lf").onsubmit = async e => {
    e.preventDefault(); $("#login-err").textContent = "";
    const { error } = await sb.auth.signInWithPassword({ email: $("#em").value.trim(), password: $("#pw").value });
    if (error) $("#login-err").textContent = "Correo o contraseña incorrectos."; else { $("#pw").value = ""; start(); }
  };
  $("#out").onclick = async () => { await sb.auth.signOut(); showLogin(); };
  sb.auth.getSession().then(({ data: { session } }) => session ? start() : showLogin());
})();

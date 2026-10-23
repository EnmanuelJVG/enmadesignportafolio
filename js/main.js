const C = window.CONFIG, $ = s => document.querySelector(s);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
document.title = C.nombre + " | " + C.marca + ", diseñador gráfico";
document.querySelectorAll("[data-c]").forEach(e => e.textContent = C[e.dataset.c]);
$("#anio").textContent = new Date().getFullYear();

const n = C.telefono.replace(/\D/g, "");
const L = { wa: `https://wa.me/${n}?text=${encodeURIComponent(C.mensajeWhatsapp)}`, tel: "tel:+" + n, mail: "mailto:" + C.email, ig: "https://instagram.com/" + C.instagram };
document.querySelectorAll("[data-l]").forEach(e => e.href = L[e.dataset.l]);

const words = C.servicios.map(s => s.titulo).join(" ✱ ") + " ✱ ";
$("#marquee").innerHTML = `<span>${words.repeat(4)}</span><span>${words.repeat(4)}</span>`;
$("#sobre").innerHTML = C.sobre.map(t => `<p>${t}</p>`).join("");

$("#servicios-lista").innerHTML = C.servicios.map((s, i) =>
  `<div class="rv" style="--i:${i}"><article class="card tilt"><h3>${s.titulo}${s.nuevo ? '<small>Nuevo</small>' : ""}</h3><p>${s.texto}</p></article></div>`).join("");

const P = C.proyectos, isV = f => /\.(mp4|webm|mov)$/i.test(f);
const ph = '<div class="ph"><img src="assets/asterisco.png" alt=""></div>';
$("#foto").innerHTML = C.foto ? `<img src="${C.foto}" alt="Foto de ${C.marca}">` : `<div class="ph"><img src="assets/asterisco.png" alt=""><p>Tu foto aquí</p></div>`;
$("#proyectos-lista").innerHTML = P.map((p, i) => {
  const c = p.portada || p.galeria[0] || "";
  const media = !c ? ph : isV(c) ? `<video src="${c}" muted loop playsinline autoplay preload="metadata"></video>` : `<img src="${c}" alt="" loading="lazy">`;
  return `<button class="proj rv" style="--i:${i % 2}" data-i="${i}" aria-label="Abrir ${p.titulo}"><div class="media">${media}<span class="plus">+</span></div><div class="meta"><h3>${p.titulo}</h3><span>${[p.categoria, p.anio].filter(Boolean).join(" · ")}</span></div></button>`;
}).join("");

/* ---- páginas web: portada, vista interactiva y capturas deslizables ---- */
const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[ch]));
const validWebURL = value => {
  try {
    const u = new URL(String(value || ""));
    return ["http:", "https:"].includes(u.protocol) ? u.href : "";
  } catch { return ""; }
};
const W = (Array.isArray(C.sitiosWeb) ? C.sitiosWeb : [])
  .map(w => ({ ...w, url: validWebURL(w.url), capturas: Array.isArray(w.capturas) ? w.capturas : [], etiquetas: Array.isArray(w.etiquetas) ? w.etiquetas : [] }))
  .filter(w => w.titulo && w.url);
const webSection = $("#sitios-web"), webNav = $("#nav-sitios-web"), webList = $("#sitios-web-lista");
if (W.length) {
  webSection.hidden = false;
  webNav.hidden = false;
  webList.innerHTML = W.map((w, i) => {
    const cover = w.portada ? (isV(w.portada)
      ? `<video src="${escapeHTML(w.portada)}" muted loop playsinline autoplay preload="metadata"></video>`
      : `<img src="${escapeHTML(w.portada)}" alt="Vista previa de ${escapeHTML(w.titulo)}" loading="lazy" decoding="async">`)
      : `<div class="web-cover-placeholder"><span>WEB</span><b>${escapeHTML(w.titulo)}</b></div>`;
    const tags = w.etiquetas.map(t => `<span class="web-tag">${escapeHTML(t)}</span>`).join("");
    return `<article class="web-card rv" style="--i:${i % 2}">
      <div class="web-card-media">${cover}<span class="web-card-mark">${escapeHTML(w.categoria || "Proyecto web")}</span></div>
      <div class="web-card-content"><div class="web-card-heading"><h3>${escapeHTML(w.titulo)}</h3><span class="web-external-mark" aria-hidden="true">↗</span></div>
      <p>${escapeHTML(w.descripcion || "Explora este proyecto web.")}</p>${tags ? `<div class="web-tags">${tags}</div>` : ""}
      <div class="web-card-actions"><button class="btn o web-quick" type="button" data-web-i="${i}">Vista rápida <span aria-hidden="true">↗</span></button><a class="btn" href="${escapeHTML(w.url)}" target="_blank" rel="noopener noreferrer">Visitar sitio <span aria-hidden="true">↗</span></a></div></div>
    </article>`;
  }).join("");
  if (reduce) webList.querySelectorAll(".rv").forEach(e => e.classList.add("in"));
  else {
    const webIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); webIO.unobserve(e.target); } }), { threshold: .15 });
    webList.querySelectorAll(".rv").forEach(e => webIO.observe(e));
  }
}
const webDlg = $("#web-modal"), webBody = $("#web-modal-body");
function openWebProject(i) {
  const w = W[i];
  if (!w) return;
  const coverTitle = escapeHTML(w.titulo);
  const screenshotItems = w.capturas.filter(Boolean);
  const screenshots = screenshotItems.length ? `<section class="web-captures" aria-label="Capturas del proyecto"><h3>Más detalles del diseño</h3><p>Desliza para ver otras pantallas.</p><div class="web-capture-track">${screenshotItems.map((src, j) => isV(src)
    ? `<figure class="web-shot"><video src="${escapeHTML(src)}" controls playsinline preload="metadata" aria-label="Captura ${j + 1} de ${coverTitle}"></video></figure>`
    : `<figure class="web-shot"><img src="${escapeHTML(src)}" alt="Captura ${j + 1} de ${coverTitle}" loading="lazy" decoding="async"></figure>`).join("")}</div></section>` : "";
  const tags = w.etiquetas.map(t => `<span class="web-tag">${escapeHTML(t)}</span>`).join("");
  webBody.innerHTML = `<div class="web-modal-intro"><span>${escapeHTML(w.categoria || "Proyecto web")}</span><h2>${coverTitle}</h2><p>${escapeHTML(w.descripcion || "Explora este proyecto web.")}</p>${tags ? `<div class="web-tags">${tags}</div>` : ""}<div class="cta"><a class="btn" href="${escapeHTML(w.url)}" target="_blank" rel="noopener noreferrer">Abrir sitio completo ↗</a></div></div>
    <section class="web-live" aria-label="Vista interactiva"><div class="web-live-heading"><div><h3>Vista interactiva</h3><p>Prueba la página aquí. Algunos sitios no permiten mostrarse dentro de otra web.</p></div><a href="${escapeHTML(w.url)}" target="_blank" rel="noopener noreferrer">Abrir aparte ↗</a></div><div class="web-frame"><iframe src="${escapeHTML(w.url)}" title="Vista interactiva de ${coverTitle}" loading="lazy" referrerpolicy="no-referrer" sandbox="allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox" allowfullscreen></iframe></div><p class="web-frame-note">¿No carga o se ve en blanco? Es una restricción del sitio visitado; usa el botón «Abrir sitio completo».</p></section>${screenshots}`;
  if (!webDlg.open) { webDlg.showModal(); document.body.classList.add("lock"); }
  webDlg.scrollTop = 0;
}
webList.addEventListener("click", e => {
  const b = e.target.closest("[data-web-i]");
  if (b) openWebProject(Number(b.dataset.webI));
});
webDlg.addEventListener("click", e => { if (e.target === webDlg || e.target.closest(".x")) webDlg.close(); });
webDlg.addEventListener("close", () => { document.body.classList.remove("lock"); webBody.innerHTML = ""; });

/* ---- galería en movimiento: dos filas en bucle + ampliar al tocar ---- */
const reel = $("#reel"), lb = $("#lb"), lbBody = $("#lb-body"), M = C.muestras.map(x => typeof x === "string" ? { src: x } : x);
let lc = 0;
if (M.length) {
  const mk = i => { const f = M[i].src; return isV(f) ? `<video class="pc" data-i="${i}" src="${f}" muted loop playsinline autoplay preload="metadata"></video>` : `<img class="pc" data-i="${i}" src="${f}" alt="${M[i].titulo || ""}" loading="lazy" decoding="async">`; };
  const idx = [...M.keys()], h = Math.ceil(M.length / 2), lists = [idx, idx.slice(h).concat(idx.slice(0, h)), idx.slice().reverse()];  reel.innerHTML = lists.map((l, k) => {
    const set = Array.from({ length: Math.ceil(10 / l.length) }, () => l.map(mk).join("")).join("");
    return `<div class="row${k % 2 ? " b" : ""} rv" style="--from:${k % 2 ? -14 : 14}vw"><div class="track">${set}${set}</div></div>`;
  }).join("");
  if (!reduce) {
    const isTouch = matchMedia("(hover: none), (pointer: coarse)").matches;
    const rows = [...reel.children].map((el, k) => ({
      el, t: el.firstChild, dir: k % 2 ? 1 : -1,
      x: k % 2 ? -1 : 0, sp: 1, hov: false, w: 0
    }));

    // Mide la pista cuando cambia su tamaño, no en cada fotograma.
    const measureTracks = () => rows.forEach(r => { r.w = r.t.scrollWidth / 2; });
    measureTracks();
    if ("ResizeObserver" in window) {
      const trackSizer = new ResizeObserver(measureTracks);
      rows.forEach(r => trackSizer.observe(r.t));
    } else {
      addEventListener("resize", measureTracks, { passive: true });
      reel.querySelectorAll("img,video").forEach(m => {
        m.addEventListener("load", measureTracks);
        m.addEventListener("loadedmetadata", measureTracks);
      });
    }

    if (!isTouch) {
      rows.forEach(r => {
        r.el.addEventListener("pointerenter", () => { r.hov = true; });
        r.el.addEventListener("pointerleave", () => { r.hov = false; });
      });
    }

    let visible = false, rafId = 0, lastFrame = 0, last = scrollY, vel = 0;
    const stop = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0; lastFrame = 0; vel = 0;
    };
    const tick = now => {
      rafId = 0;
      if (!visible || document.hidden) return;
      // Ajusta la velocidad a la frecuencia de pantalla (60/90/120 Hz).
      const dt = lastFrame ? Math.min((now - lastFrame) / 16.667, 2) : 1;
      lastFrame = now;
      const currentScroll = scrollY;
      if (!isTouch) vel += (currentScroll - last - vel) * .12;
      last = currentScroll;
      const sk = isTouch ? 0 : Math.max(-7, Math.min(7, -vel * .3));

      rows.forEach(r => {
        const target = (!isTouch && r.hov && !lb.open) ? 0 : 1;
        r.sp += (target - r.sp) * Math.min(1, .07 * dt);
        if (!r.w) return;
        r.x += r.dir * (.7 * r.sp + (isTouch ? 0 : Math.min(Math.abs(vel), 60) * .12)) * dt;
        if (r.x <= -r.w) r.x += r.w;
        if (r.x > 0) r.x -= r.w;
        r.t.style.transform = isTouch
          ? `translate3d(${r.x.toFixed(2)}px,0,0)`
          : `translate3d(${r.x.toFixed(2)}px,0,0) skewX(${sk.toFixed(2)}deg)`;
      });
      rafId = requestAnimationFrame(tick);
    };
    const start = () => {
      if (visible && !document.hidden && !rafId) {
        last = scrollY; lastFrame = 0;
        rafId = requestAnimationFrame(tick);
      }
    };
    const reelObserver = new IntersectionObserver(entries => {
      visible = entries.some(e => e.isIntersecting);
      if (visible) start(); else stop();
    }, { rootMargin: "120px 0px" });
    reelObserver.observe(reel);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop(); else start();
    });
  }
}
function openLb(i, from, dir = 0) {
  lc = (i + M.length) % M.length; const it = M[lc];
  lbBody.innerHTML = (isV(it.src) ? `<video class="lb-m" src="${it.src}" controls autoplay muted loop playsinline></video>` : `<img class="lb-m" src="${it.src}" alt="${it.titulo || ""}">`) + (it.titulo || it.texto ? `<div class="lb-t">${it.titulo ? `<h3>${it.titulo}</h3>` : ""}${it.texto ? `<p>${it.texto}</p>` : ""}</div>` : "");
  if (!lb.open) { lb.showModal(); document.body.classList.add("lock"); }
  if (reduce) return;
  const m = lbBody.firstElementChild, ease = "cubic-bezier(.2,.8,.2,1)";
  if (from && m.tagName === "IMG") m.decode().then(() => { const a = from.getBoundingClientRect(), b = m.getBoundingClientRect(); m.animate([{ transform: `translate(${a.left - b.left}px,${a.top - b.top}px) scale(${a.width / b.width},${a.height / b.height})`, opacity: .4 }, { transform: "none", opacity: 1 }], { duration: 650, easing: ease }); }).catch(() => {});
  else m.animate([{ opacity: 0, transform: `translateX(${dir * 50}px) scale(.94)` }, { opacity: 1, transform: "none" }], { duration: 500, easing: ease });
}
function closeLb() {
  if (!lb.open || lb.classList.contains("out")) return;
  if (reduce) return lb.close();
  lb.classList.add("out");
  setTimeout(() => { lb.classList.remove("out"); lb.close(); }, 380);
}
reel.addEventListener("click", e => { const p = e.target.closest(".pc"); if (p) openLb(+p.dataset.i, p); });
lb.addEventListener("click", e => { if (e.target === lb || e.target === lbBody || e.target.closest(".x")) return closeLb(); const d = e.target.closest("[data-d]"); if (d) openLb(lc + +d.dataset.d, null, +d.dataset.d); });
lb.addEventListener("cancel", e => { e.preventDefault(); closeLb(); });
lb.addEventListener("close", () => { document.body.classList.remove("lock"); lbBody.innerHTML = ""; });
let sx0 = 0;
lb.addEventListener("pointerdown", e => sx0 = e.clientX);
lb.addEventListener("pointerup", e => { const dx = e.clientX - sx0; if (Math.abs(dx) > 70) openLb(lc + (dx < 0 ? 1 : -1), null, dx < 0 ? 1 : -1); });
addEventListener("keydown", e => { if (lb.open && /^Arrow(Left|Right)$/.test(e.key)) openLb(lc + (e.key === "ArrowRight" ? 1 : -1), null, e.key === "ArrowRight" ? 1 : -1); });

/* ---- títulos: letras que giran al aparecer y flotan suave ---- */
document.querySelectorAll("h2").forEach(t => {
  const txt = t.textContent.trim(), ws = txt.split(" "); let n = 0;
  t.setAttribute("aria-label", txt);
  t.innerHTML = ws.map((w, k) => `<span class="w${k === ws.length - 1 ? " hl" : ""}" aria-hidden="true">${[...w].map(ch => `<span class="c" style="--n:${n++}">${ch}</span>`).join("")}</span>`).join(" ");
});

/* ---- secciones nuevas: paquetes, testimonios, proceso y preguntas ---- */
const wa = t => `https://wa.me/${n}?text=${encodeURIComponent(t)}`, L2 = k => C[k] || [];
const show = (id, list, html) => { if (list.length) { $(id).hidden = false; $(id + "-lista").innerHTML = html; } };
const caso = p => { const x = [["El reto", p.reto], ["Lo que hice", p.solucion], ["El resultado", p.resultado]].filter(a => a[1]).map(a => `<div class="caso"><b>${a[0]}</b><p>${a[1]}</p></div>`).join(""); return x ? `<div class="casos">${x}</div>` : ""; };
$("#avail").hidden = !C.disponible;
if (C.pdf) { const b = $("#pdfbtn"); b.href = C.pdf; b.hidden = false; }
show("#paquetes", L2("paquetes"), L2("paquetes").map((p, i) => `<div class="rv" style="--i:${i}"><article class="card tilt pk${p.etiqueta ? " top" : ""}"><h3>${p.nombre}${p.etiqueta ? `<small>${p.etiqueta}</small>` : ""}</h3><b class="price">${p.desde ? "Desde " + p.desde : "Consultar precio"}</b><ul>${(p.incluye || []).map(x => `<li>${x}</li>`).join("")}</ul><a class="btn" href="${wa(`Hola, me interesa el paquete ${p.nombre}.`)}" target="_blank" rel="noopener">Cotizar por WhatsApp</a></article></div>`).join(""));
show("#testimonios", L2("testimonios"), L2("testimonios").map((t, i) => `<figure class="card rv" style="--i:${i}"><blockquote>“${t.texto}”</blockquote><figcaption><b>${t.nombre}</b>${t.negocio ? " · " + t.negocio : ""}</figcaption></figure>`).join(""));
show("#proceso", L2("proceso"), L2("proceso").map((s, i) => `<div class="rv" style="--i:${i}"><article class="card step"><span>${String(i + 1).padStart(2, "0")}</span><h3>${s.titulo}</h3><p>${s.texto}</p>${s.tiempo ? `<em>${s.tiempo}</em>` : ""}</article></div>`).join(""));
$("#faq").hidden = !L2("faq").length;
$("#faq-lista").innerHTML = L2("faq").map(f => `<details><summary>${f.p}</summary><p>${f.r}</p></details>`).join("");

const burger = $(".burger");
burger.onclick = () => { const o = document.body.classList.toggle("menu"); burger.setAttribute("aria-expanded", o); };
document.querySelectorAll("#menu a").forEach(a => a.addEventListener("click", () => { document.body.classList.remove("menu"); burger.setAttribute("aria-expanded", false); }));

if (reduce) document.querySelectorAll(".rv").forEach(e => e.classList.add("in"));
else {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15 });
  document.querySelectorAll(".rv").forEach(e => io.observe(e));
  let t = false;
  addEventListener("scroll", () => { if (t) return; t = true; requestAnimationFrame(() => { document.documentElement.style.setProperty("--rot", scrollY * .12 + "deg"); t = false; }); }, { passive: true });
}

const dlg = $("#modal"), body = $("#modal-body");
let cur = 0;
function openProject(i) {
  cur = (i + P.length) % P.length;
  const p = P[cur], items = p.galeria.length ? p.galeria : [p.portada].filter(Boolean);
  body.innerHTML = `<div class="m-info"><span>${[p.categoria, p.anio].filter(Boolean).join(" · ")}</span><h3>${p.titulo}</h3><p>${p.descripcion || ""}</p>${caso(p)}<div class="cta"><a class="btn" href="${wa(`Hola, vi el proyecto ${p.titulo} en tu portafolio y quiero algo parecido.`)}" target="_blank" rel="noopener">Quiero algo así</a>${p.enlace ? `<a class="btn o" href="${p.enlace}" target="_blank" rel="noopener">Ver proyecto en línea</a>` : ""}</div></div><div class="m-media">${items.length ? items.map(f => isV(f) ? `<video src="${f}" controls playsinline preload="metadata"></video>` : `<img src="${f}" alt="${p.titulo}" loading="lazy">`).join("") : ph}</div>`;
  dlg.scrollTop = 0;
  if (!dlg.open) { dlg.showModal(); document.body.classList.add("lock"); }
}
$("#proyectos-lista").addEventListener("click", e => { const b = e.target.closest(".proj"); if (b) openProject(+b.dataset.i); });
dlg.addEventListener("click", e => { if (e.target === dlg || e.target.closest(".x")) dlg.close(); const d = e.target.closest("[data-d]"); if (d) openProject(cur + +d.dataset.d); });
dlg.addEventListener("close", () => { document.body.classList.remove("lock"); body.innerHTML = ""; });
addEventListener("keydown", e => { if (dlg.open && (e.key === "ArrowRight" || e.key === "ArrowLeft")) openProject(cur + (e.key === "ArrowRight" ? 1 : -1)); });
document.addEventListener("pointermove", e => { const c = e.target.closest(".card"); if (c) { const r = c.getBoundingClientRect(); c.style.setProperty("--mx", e.clientX - r.left + "px"); c.style.setProperty("--my", e.clientY - r.top + "px"); } });

/* ---- texto en movimiento ---- */
const sw = $("#swap"), swapWords = C.servicios.map(s => s.titulo.toLowerCase());
sw.innerHTML = swapWords.map(w => `<b>${w}</b>`).join("");
const bs = [...sw.children]; let wk = 0; bs[0].className = "on";
if (!reduce && bs.length > 1) setInterval(() => { const p = wk; bs[p].className = "off"; wk = (wk + 1) % bs.length; bs[wk].className = "on"; setTimeout(() => bs[p].className = "", 700); }, 2200);
const fr = k => { const t = (k ? C.frases.slice().reverse() : C.frases).join(" ✱ ") + " ✱ "; return `<span>${t.repeat(3)}</span><span>${t.repeat(3)}</span>`; };
$("#rbA").innerHTML = fr(0); $("#rbB").innerHTML = fr(1);

/* ---- efectos 3D con el cursor ---- */
if (!reduce) {
  let tl = null;
  const untilt = () => { if (tl) { tl.style.transform = ""; tl = null; } };
  document.addEventListener("pointermove", e => {
    if (e.pointerType === "touch") return;
    const t = e.target.closest(".tilt,.media");
    if (t !== tl) untilt();
    if (!t) return;
    tl = t; const r = t.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    t.style.transform = `perspective(900px) rotateX(${(-y * 10).toFixed(1)}deg) rotateY(${(x * 12).toFixed(1)}deg) scale(1.02)`;
  });
  const hc = $(".hero-card");
  hc.addEventListener("pointermove", e => { const r = hc.getBoundingClientRect(); hc.style.setProperty("--ty", ((e.clientX - r.left) / r.width - .5) * 26 + "deg"); hc.style.setProperty("--tx", -((e.clientY - r.top) / r.height - .5) * 20 + "deg"); });
  hc.addEventListener("pointerleave", () => { hc.style.setProperty("--ty", "0deg"); hc.style.setProperty("--tx", "0deg"); });
}

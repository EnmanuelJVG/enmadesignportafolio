const C = window.CONFIG, $ = s => document.querySelector(s);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
document.title = C.marca + " | Portafolio de diseño gráfico";
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
    const rows = [...reel.children].map((el, k) => ({ el, t: el.firstChild, dir: k % 2 ? 1 : -1, x: k % 2 ? -1 : 0, sp: 1, hov: false }));
    rows.forEach(r => { r.el.onpointerenter = () => r.hov = true; r.el.onpointerleave = () => r.hov = false; });
    let vis = false, last = scrollY, vel = 0;
    new IntersectionObserver(e => vis = e[0].isIntersecting).observe(reel);
    (function tick() {
      if (vis) {
        vel += (scrollY - last - vel) * .12; last = scrollY;
        const sk = Math.max(-7, Math.min(7, -vel * .3));
        rows.forEach(r => {
          r.sp += (((r.hov && !lb.open) ? 0 : 1) - r.sp) * .07;
          const w = r.t.scrollWidth / 2;
          r.x += r.dir * (.7 * r.sp + Math.min(Math.abs(vel), 60) * .12);
          if (r.x <= -w) r.x += w;
          if (r.x > 0) r.x -= w;
          r.t.style.transform = `translate3d(${r.x}px,0,0) skewX(${sk}deg)`;
        });
      } else last = scrollY;
      requestAnimationFrame(tick);
    })();
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
  body.innerHTML = `<div class="m-info"><span>${[p.categoria, p.anio].filter(Boolean).join(" · ")}</span><h3>${p.titulo}</h3><p>${p.descripcion || ""}</p>${p.enlace ? `<a class="btn" href="${p.enlace}" target="_blank" rel="noopener">Ver proyecto en línea</a>` : ""}</div><div class="m-media">${items.length ? items.map(f => isV(f) ? `<video src="${f}" controls playsinline preload="metadata"></video>` : `<img src="${f}" alt="${p.titulo}" loading="lazy">`).join("") : ph}</div>`;
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

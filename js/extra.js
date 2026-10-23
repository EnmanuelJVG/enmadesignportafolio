/* Extras: enlaces por proyecto, cotización, marcas, QR y contacto */
(() => {
  const slug = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const base = location.href.split(/[?#]/)[0];

  /* 1. enlace directo a cada proyecto */
  const hashOf = i => "#proyecto-" + slug(P[i].titulo), _open = openProject;
  openProject = i => {
    _open(i);
    history.replaceState(null, "", hashOf((i + P.length) % P.length));
    const c = body.querySelector(".cta");
    if (c) c.insertAdjacentHTML("beforeend", `<button class="btn o" data-share>${navigator.share ? "Compartir" : "Copiar enlace"}</button>`);
  };
  body.addEventListener("click", async e => {
    const b = e.target.closest("[data-share]"); if (!b) return;
    const url = base + hashOf(cur);
    try {
      if (navigator.share) await navigator.share({ title: P[cur].titulo + " | " + C.marca, text: "Mira este proyecto de " + C.nombre, url });
      else { await navigator.clipboard.writeText(url); b.textContent = "¡Enlace copiado!"; setTimeout(() => b.textContent = "Copiar enlace", 2000); }
    } catch (_) {}
  });
  dlg.addEventListener("close", () => { if (location.hash.startsWith("#proyecto-")) history.replaceState(null, "", base); });
  const fromHash = () => { const i = P.findIndex((p, k) => hashOf(k) === location.hash); if (i >= 0) openProject(i); };
  fromHash(); addEventListener("hashchange", fromHash);

  /* 2. cotización por WhatsApp */
  $("#cot-chips").innerHTML = C.servicios.map(s => s.titulo).concat("Otro").map(t => `<label class="chip"><input type="checkbox" value="${t}"><span>${t}</span></label>`).join("");
  $("#cot-plazo").innerHTML = (C.plazos || ["Lo antes posible", "Esta semana", "Este mes", "Sin prisa"]).map(t => `<option>${t}</option>`).join("");
  $("#cot").addEventListener("submit", e => {
    e.preventDefault();
    const f = e.target, v = k => f.elements[k].value.trim(), sel = [...f.querySelectorAll(".chip input:checked")].map(x => x.value), err = $("#cot-err");
    if (!v("nombre") || !sel.length) { err.textContent = v("nombre") ? "Elige al menos un servicio." : "Escribe tu nombre."; err.hidden = false; return; }
    err.hidden = true;
    window.open(wa(`Hola ${C.nombre.split(" ")[0]}, soy ${v("nombre")}${v("negocio") ? " de " + v("negocio") : ""}. Necesito: ${sel.join(", ")}. Lo necesito: ${v("plazo").toLowerCase()}.${v("detalle") ? " " + v("detalle") : ""}`), "_blank", "noopener");
  });

  /* 4. marcas con las que he trabajado */
  const MK = C.marcas || [];
  if (MK.length) {
    $("#marcas").hidden = false;
    $("#marcas-lista").innerHTML = MK.map(m => { const o = typeof m === "string" ? { nombre: m } : m; return o.logo ? `<img class="marca-logo" src="${o.logo}" alt="${o.nombre}">` : `<span class="marca">${o.nombre}</span>`; }).join("");
  }

  /* 3. código QR y guardar contacto */
  const q = new QRCode(-1, QRErrorCorrectLevel.M); q.addData(base); q.make();
  const cv = $("#qr"), g = cv.getContext("2d"), N = q.getModuleCount(), m = 4, cell = Math.floor(1024 / (N + 2 * m));
  cv.width = cv.height = cell * (N + 2 * m); g.fillStyle = "#fff"; g.fillRect(0, 0, cv.width, cv.height); g.fillStyle = "#04201d";
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) if (q.isDark(r, c)) g.fillRect((c + m) * cell, (r + m) * cell, cell, cell);
  $("#qrdl").onclick = () => cv.toBlob(b => { const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "qr-" + slug(C.marca) + ".png"; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 5000); });
  const np = C.nombre.split(" ");
  const vcf = ["BEGIN:VCARD", "VERSION:3.0", "N:" + np.slice(1).join(" ") + ";" + np[0] + ";;;", "FN:" + C.nombre, "ORG:" + C.marca, "TITLE:Diseñador gráfico", "TEL;TYPE=CELL:+" + n, "EMAIL:" + C.email, "URL:" + base, "END:VCARD"].join("\r\n");
  const a = $("#vcf"); a.href = "data:text/vcard;charset=utf-8," + encodeURIComponent(vcf); a.download = slug(C.nombre) + ".vcf";
})();

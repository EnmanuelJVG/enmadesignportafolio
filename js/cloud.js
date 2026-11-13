/* Carga el contenido editado desde /admin (Supabase) y luego arranca el sitio.
   Si Supabase no está configurado o falla, usa js/config.js (o la última copia guardada en el teléfono). */
(async () => {
  const S = window.SUPABASE || {}, K = "enma_cfg_v1";
  let remote = null;
  if (S.url && S.anonKey) {
    try {
      const ac = new AbortController(), t = setTimeout(() => ac.abort(), 2500);
      const h = { apikey: S.anonKey };
      if (S.anonKey.startsWith("eyJ")) h.Authorization = "Bearer " + S.anonKey;
      const r = await fetch(S.url + "/rest/v1/site_content?id=eq.1&select=data", { headers: h, cache: "no-store", signal: ac.signal });
      clearTimeout(t);
      if (!r.ok) throw 0;
      const j = await r.json();
      remote = j[0] && j[0].data;
      try { remote ? localStorage.setItem(K, JSON.stringify(remote)) : localStorage.removeItem(K); } catch (_) {}
    } catch (_) { try { remote = JSON.parse(localStorage.getItem(K)); } catch (_) {} }
  }
  const C = window.CONFIG = Object.assign({}, window.CONFIG, remote || {});
  ["servicios", "muestras", "frases", "sobre", "proyectos"].forEach(k => C[k] = Array.isArray(C[k]) ? C[k] : []);
  C.proyectos.forEach(p => p.galeria = Array.isArray(p.galeria) ? p.galeria : []);
  C.muestras = C.muestras.filter(m => typeof m === "string" ? m : m && m.src);
  if (Array.isArray(C.marcas)) C.marcas = C.marcas.filter(m => typeof m === "string" ? m : m && m.nombre);
  for (const f of ["main", "intro", "qr", "extra"])
    await new Promise(ok => { const s = document.createElement("script"); s.src = "js/" + f + ".js"; s.onload = s.onerror = ok; document.head.appendChild(s); });
})();

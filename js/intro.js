/* Animación de entrada con el isotipo */
(() => {
  const root = document.documentElement, el = document.getElementById("intro");
  if (!el || !root.classList.contains("intro")) return;
  if (window.CONFIG && CONFIG.animacionInicio === false) { root.classList.remove("intro"); el.remove(); return; }
  const cnt = document.getElementById("cnt"), w = el.querySelector(".i-svg").getBoundingClientRect().width;
  const r0 = 174.0 * w / 512, R = Math.hypot(innerWidth, innerHeight) / 2 + 60;
  el.style.setProperty("--r0", r0 + "px"); el.style.setProperty("--R", R + "px"); el.style.setProperty("--S", R / r0);
  let done = false;
  const t0 = performance.now();
  (function count(t) { const p = Math.min(1, (t - t0) / 2300); if (!done) cnt.textContent = String(Math.round(p * 100)).padStart(2, "0"); if (p < 1 && !done) requestAnimationFrame(count); })(t0);
  const exit = () => {
    if (done) return; done = true; cnt.textContent = "100"; el.classList.add("out");
    setTimeout(() => { el.classList.add("go"); root.classList.remove("intro"); }, 380);
    setTimeout(() => el.remove(), 2200);
  };
  el.addEventListener("animationend", e => { if (e.animationName === "iris") el.remove(); });
  document.getElementById("skip").onclick = exit;
  Promise.all([new Promise(r => setTimeout(r, 2400)), new Promise(r => document.readyState === "complete" ? r() : addEventListener("load", r))]).then(exit);
  setTimeout(exit, 6000);
})();

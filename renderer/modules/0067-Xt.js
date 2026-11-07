
function Xt(e, n, i, s) {
  if (i === void 0) return (e.textContent = "");
  const l = s || document.createTextNode("");
  if (n.length) {
    let a = !1;
    for (let c = n.length - 1; c >= 0; c--) {
      const d = n[c];
      if (l !== d) {
        const f = d.parentNode === e;
        !a && !c ? (f ? e.replaceChild(l, d) : e.insertBefore(l, i)) : f && d.remove();
      } else a = !0;
    }
  } else e.insertBefore(l, i);
  return [l];
}
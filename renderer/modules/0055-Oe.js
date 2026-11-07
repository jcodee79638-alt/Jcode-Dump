
function Oe(e, n = window.document) {
  const i = n[Vr] || (n[Vr] = new Set());
  for (let s = 0, l = e.length; s < l; s++) {
    const a = e[s];
    i.has(a) || (i.add(a), n.addEventListener(a, _a));
  }
}
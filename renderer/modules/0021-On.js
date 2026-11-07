
function On(e) {
  if (e.state === 0) return;
  if (e.state === zn) return Un(e);
  if (e.suspense && Ze(e.suspense.inFallback)) return e.suspense.effects.push(e);
  const n = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < Wn);) e.state && n.push(e);
  for (let i = n.length - 1; i >= 0; i--)
    if (((e = n[i]), e.state === Nt)) mn(e);
    else if (e.state === zn) {
      const s = et;
      ((et = null), $n(() => Un(e, n[0]), !1), (et = s));
    }
}
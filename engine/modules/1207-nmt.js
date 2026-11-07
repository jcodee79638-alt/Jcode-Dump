
function nmt(e, t) {
  let r = Object.entries(t).filter(([, s]) => s !== void 0);
  if (r.length === 0) throw Error("No values to set");
  return Object.fromEntries(r.map(([s, a]) => [s, vi(a, pH) || vi(a, Kl) ? a : new My(a, VU(e)[s])]));
}
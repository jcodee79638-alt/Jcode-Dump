
function Mdt(e, t) {
  let r = Object.entries(t)
    .filter(([, s]) => s !== void 0)
    .map(([s, a]) => {
      if (vi(a, pH) || vi(a, Kl)) return [s, a];
      else return [s, new My(a, e[TH.Symbol.Columns][s])];
    });
  if (r.length === 0) throw Error("No values to set");
  return Object.fromEntries(r);
}
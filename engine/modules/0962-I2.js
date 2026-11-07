
function I2(e, t, r) {
  return Object.entries(e).reduce((s, [a, H]) => {
    if (typeof a !== "string") return s;
    let u = t ? [...t, a] : [a];
    if (vi(H, Kl))
      s.push({ path: u, field: H, codec: r?.get(H, "normalize"), arrayDimensions: H.dimensions });
    else if (vi(H, Kl) || vi(H, pH) || vi(H, pH.Aliased) || vi(H, X_)) s.push({ path: u, field: H });
    else if (vi(H, TH)) s.push(...I2(H[TH.Symbol.Columns], u, r));
    else s.push(...I2(H, u, r));
    return s;
  }, []);
}
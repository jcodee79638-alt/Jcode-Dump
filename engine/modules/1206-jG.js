
function jG(e, t) {
  return Object.entries(e).flatMap(([r, s]) => {
    let a = t ? [...t, r] : [r];
    if (vi(s, Kl) || vi(s, pH) || vi(s, pH.Aliased) || vi(s, X_)) return [{ path: a, field: s }];
    if (vi(s, TH)) return jG(VU(s), a);
    return jG(s, a);
  });
}
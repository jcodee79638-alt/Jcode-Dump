
function btr(e, t, r) {
  let s = {},
    a = e.reduce((H, { path: u, field: f, codec: d, arrayDimensions: _ }, L) => {
      let I;
      if (vi(f, Kl)) I = f;
      else if (vi(f, pH)) I = f.decoder;
      else if (vi(f, X_)) I = f._.sql.decoder;
      else I = f.sql.decoder;
      let D = H;
      for (let [S, T] of u.entries())
        if (S < u.length - 1) {
          if (!(T in D)) D[T] = {};
          D = D[T];
        } else {
          let C = t[L],
            O = (D[T] = C === null ? null : I.mapFromDriverValue(d ? d(C, _) : C));
          if (r && vi(f, Kl) && u.length === 2) {
            let B = u[0];
            if (!(B in s)) s[B] = O === null ? iV(f.table) : !1;
            else if (typeof s[B] === "string" && s[B] !== iV(f.table)) s[B] = !1;
          }
        }
      return H;
    }, {});
  if (r && Object.keys(s).length > 0) {
    for (let [H, u] of Object.entries(s)) if (typeof u === "string" && !r[u]) a[H] = null;
  }
  return a;
}

function Ztr(e, t, r) {
  let s = {},
    a = {};
  return (
    e.forEach((H, u) => {
      let f = vi(H.field, Kl)
          ? H.field
          : vi(H.field, pH)
            ? H.field.decoder
            : vi(H.field, X_)
              ? H.field._.sql.decoder
              : H.field.sql.decoder,
        d = t[u],
        _ = d === null ? null : f.mapFromDriverValue(d),
        L = H.path[0],
        I = a;
      if (
        (H.path.forEach((D, S) => {
          if (S === H.path.length - 1) {
            I[D] = _;
            return;
          }
          ((I[D] = I[D] ?? {}), (I = I[D]));
        }),
        r && vi(H.field, Kl) && H.path.length === 2 && L)
      ) {
        let D = iV(ydn(H.field));
        s[L] = !(L in s) && _ === null ? D : typeof s[L] === "string" && s[L] !== D ? !1 : s[L];
      }
    }),
    Object.entries(s).forEach(([H, u]) => {
      if (typeof u === "string" && !r?.[u]) a[H] = null;
    }),
    a
  );
}
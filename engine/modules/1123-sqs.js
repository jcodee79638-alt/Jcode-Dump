
function sqs(e, t, r, s, a = !1, H = !1) {
  let u = t ? 1 : e.length,
    f = r.map(({ field: _, codec: L, arrayDimensions: I }) => {
      let D;
      if (vi(_, Kl)) D = _;
      else if (vi(_, pH)) D = _.decoder;
      else if (vi(_, pH.Aliased)) D = _.sql.decoder;
      else if (vi(_, TH) || vi(_, xy)) D = lse;
      else D = _.getSQL().decoder;
      return D.mapFromDriverValue.isNoop
        ? L
          ? (S) => L(S, I)
          : void 0
        : L
          ? (S) => D.mapFromDriverValue(L(S, I))
          : (S) => D.mapFromDriverValue(S);
    }),
    d = Array.from({ length: u });
  for (let _ = 0; _ < u; ++_) {
    let L = t ? e : e[_],
      I = {};
    for (let D = 0; D < r.length; ++D) {
      let S = r[D],
        T = L[D];
      if (S.selection) {
        if (T === null) {
          I[S.key] = null;
          continue;
        }
        if (a) {
          if (((T = JSON.parse(T)), T === null)) {
            I[S.key] = null;
            continue;
          }
        } else if (H && typeof T === "string") T = JSON.parse(T);
        if (S.isArray) E3e(T, !1, S.selection, s, !1, H);
        else E3e(T, !0, S.selection, s, !1, H);
        I[S.key] = T;
        continue;
      }
      if (s) T = s(T);
      if (T === null) {
        I[S.key] = null;
        continue;
      }
      let C = f[D];
      I[S.key] = C ? C(T) : T;
    }
    d[_] = I;
  }
  return t ? d[0] : d;
}
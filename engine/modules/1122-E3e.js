
function E3e(e, t, r, s, a = !1, H = !1, u = !0) {
  let f = t ? 1 : e.length,
    d = r.map(({ field: _, codec: L, arrayDimensions: I }) => {
      let D;
      if (vi(_, Kl)) {
        if (u && _.mapFromJsonValue) return (S) => _.mapFromJsonValue(S);
        D = _;
      } else if (vi(_, pH)) D = _.decoder;
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
    });
  for (let _ = 0; _ < f; ++_) {
    let L = t ? e : e[_];
    for (let I = 0; I < r.length; ++I) {
      let D = r[I];
      if (D.selection) {
        if (L[D.key] === null) continue;
        if (a) {
          if (((L[D.key] = JSON.parse(L[D.key])), L[D.key] === null)) continue;
        } else if (H && typeof L[D.key] === "string") L[D.key] = JSON.parse(L[D.key]);
        if (D.isArray) {
          E3e(L[D.key], !1, D.selection, s, !1, H);
          continue;
        }
        E3e(L[D.key], !0, D.selection, s, !1, H);
        continue;
      }
      if (s) L[D.key] = s(L[D.key]);
      if (L[D.key] === null) continue;
      let S = d[I];
      if (!S) continue;
      L[D.key] = S(L[D.key]);
    }
  }
  return e;
}
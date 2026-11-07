
function S_n(e, t, r, s, a, H = e) {
  let u = Ndt(a),
    f = new L3e(e, s, H),
    d = typeof t === "function" ? t(M_n()) : t,
    _ = Object.fromEntries(
      Object.entries(d).map(([D, S]) => {
        let T = S;
        T.setName(D, u);
        let C = T.build(f).postBuild();
        return (f[Otr].push(...T.buildForeignKeys(C, f)), [D, C]);
      }),
    ),
    L = Object.fromEntries(
      Object.entries(d).map(([D, S]) => {
        let T = S;
        return (T.setName(D, u), [D, T.buildExtraConfigColumn(f)]);
      }),
    ),
    I = Object.assign(f, _);
  if (((I[TH.Symbol.Columns] = _), (I[TH.Symbol.ExtraConfigColumns] = L), r))
    I[L3e.Symbol.ExtraConfigBuilder] = r;
  return Object.assign(I, { enableRLS: () => ((I[L3e.Symbol.EnableRLS] = !0), I) });
}
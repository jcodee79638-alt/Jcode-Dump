
function _hn(e, t, r, s, a, H = e) {
  let u = Ndt(a),
    f = new ED(e, s, H),
    d = typeof t === "function" ? t(dhn()) : t,
    _ = Object.fromEntries(
      Object.entries(d).map(([I, D]) => {
        let S = D;
        S.setName(I, u);
        let T = S.build(f).postBuild();
        return (f[Kdt].push(...S.buildForeignKeys(T, f)), [I, T]);
      }),
    ),
    L = Object.assign(f, _);
  if (((L[TH.Symbol.Columns] = _), (L[TH.Symbol.ExtraConfigColumns] = _), r))
    L[ED.Symbol.ExtraConfigBuilder] = r;
  return L;
}

function w_n(e, t) {
  if (Object.keys(e).length === 1 && "default" in e && !vi(e.default, TH)) e = e.default;
  let r = {},
    s = {},
    a = {};
  for (let [H, u] of Object.entries(e))
    if (vi(u, TH)) {
      let f = pde(u),
        d = s[f];
      ((r[f] = H),
        (a[H] = {
          tsName: H,
          dbName: u[TH.Symbol.Name],
          schema: u[TH.Symbol.Schema],
          columns: u[TH.Symbol.Columns],
          relations: d?.relations ?? {},
          primaryKey: d?.primaryKey ?? [],
        }));
      for (let L of Object.values(u[TH.Symbol.Columns])) if (L.primary) a[H].primaryKey.push(L);
      let _ = u[TH.Symbol.ExtraConfigBuilder]?.(u[TH.Symbol.ExtraConfigColumns]);
      if (_) {
        for (let L of Object.values(_)) if (vi(L, v_n)) a[H].primaryKey.push(...L.columns);
      }
    } else if (vi(u, Y4s)) {
      let f = pde(u.table),
        d = r[f],
        _ = u.config(t(u.table));
      for (let [L, I] of Object.entries(_))
        if (d) {
          let D = a[d];
          D.relations[L] = I;
        } else {
          if (!(f in s)) s[f] = { relations: {} };
          s[f].relations[L] = I;
        }
    }
  return { tables: a, tableNamesMap: r };
}
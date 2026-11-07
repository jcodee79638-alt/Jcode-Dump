
function Fdt(e, t, r, s, a = (H) => H) {
  let H = {};
  for (let [u, f] of s.entries())
    if (f.isJson) {
      let d = t.relations[f.tsKey],
        _ = r[u],
        L = typeof _ === "string" ? JSON.parse(_) : _;
      H[f.tsKey] = vi(d, aMe)
        ? L && Fdt(e, e[f.relationTableTsKey], L, f.selection, a)
        : L.map((I) => Fdt(e, e[f.relationTableTsKey], I, f.selection, a));
    } else {
      let d = a(r[u]),
        _ = f.field,
        L;
      if (vi(_, Kl)) L = _;
      else if (vi(_, pH)) L = _.decoder;
      else L = _.sql.decoder;
      H[f.tsKey] = d === null ? null : L.mapFromDriverValue(d);
    }
  return H;
}
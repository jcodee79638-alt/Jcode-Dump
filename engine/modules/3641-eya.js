
function eya(e) {
  let t = new Map();
  for (let s of e.seen.values()) if (s.def && !t.has(s.schema)) t.set(s.schema, s);
  let r = new Map();
  for (let s of zEr.get(e) ?? []) {
    let a = e.seen.get(s),
      H = (a?.def ?? a?.schema)?.propertyNames;
    if (!H || H === !0 || r.has(H)) continue;
    let u = KEr(t, H, new Set());
    if (u !== H) r.set(H, u);
  }
  if (!r.size) return;
  for (let s of e.seen.values())
    for (let a of [s.schema, s.def]) {
      let H = a && r.get(a.propertyNames);
      if (H) a.propertyNames = H;
    }
}
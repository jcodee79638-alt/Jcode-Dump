
function QNs(e) {
  let t = Yon.get(e);
  if (t) return t;
  t = {};
  for (let r of e) {
    let s = ME(r);
    if (VNs(s)) continue;
    let a = Ian(s),
      H = vBe(s);
    t.byType ??= {};
    for (let u of a) (t.byType[u] ??= []).push(r);
    if (H.length > 0) {
      t.bySentinel ??= new Map();
      for (let { key: u, literal: f } of H) {
        let d = t.bySentinel.get(u);
        if (!d) t.bySentinel.set(u, (d = new Map()));
        let _ = d.get(f);
        if (!_) d.set(f, (_ = []));
        _.push(r);
      }
    } else {
      t.otherwise ??= {};
      for (let u of a) (t.otherwise[u] ??= []).push(r);
    }
  }
  return (Yon.set(e, t), t);
}
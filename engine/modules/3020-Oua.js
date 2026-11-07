
function Oua(e, t) {
  let r = new Set(e.map((u) => u.key)),
    s = new Map();
  for (let u of e) {
    if (u._tag === "Unavailable") continue;
    let f = mLr(t, u.key);
    if (!f) continue;
    let d = u.compare(f.value);
    if (d._tag === "Incompatible") return { _tag: "Replace" };
    s.set(u.key, d);
  }
  for (let u of Object.keys(t).sort()) {
    if (r.has(QV.make(u))) continue;
    if (t[u].removed === void 0) return { _tag: "Replace" };
  }
  let a = {},
    H = [];
  for (let u of e) {
    let f = mLr(t, u.key);
    if (u._tag === "Unavailable") {
      if (f) a[u.key] = f;
      continue;
    }
    if (!f) {
      let L = u.baseline();
      (H.push(L.text), (a[u.key] = L.snapshot));
      continue;
    }
    let d = s.get(u.key);
    if (!d || d._tag === "Incompatible") throw Error(`Missing comparison for system context source ${u.key}`);
    if (d._tag === "Unchanged") {
      a[u.key] = f;
      continue;
    }
    let _ = d.render();
    (H.push(_.text), (a[u.key] = _.snapshot));
  }
  for (let u of Object.keys(t).sort()) {
    if (r.has(QV.make(u))) continue;
    let f = t[u].removed;
    if (f === void 0) throw Error(`Missing removal rendering for system context source ${u}`);
    H.push(f);
  }
  if (H.length === 0) return { _tag: "Unchanged" };
  return { _tag: "Updated", text: YEi(H), snapshot: a };
}

function XPi(e) {
  let t = e.anyOf;
  if (!Array.isArray(t) || t.length === 0 || e.type !== void 0) return;
  let r = [];
  for (let s of t) {
    if (!s || typeof s !== "object") return;
    XPi(s);
    let a = Object.keys(s);
    if (a.length !== 1 || a[0] !== "type") return;
    let H = s.type;
    for (let u of Array.isArray(H) ? H : [H]) {
      if (typeof u !== "string") return;
      if (!r.includes(u)) r.push(u);
    }
  }
  (delete e.anyOf, (e.type = r.length === 1 ? r[0] : r));
}
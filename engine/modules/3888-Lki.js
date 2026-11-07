
function Lki(e, t, r) {
  if (r.length === 0) return (t.push(e), !1);
  let s = e,
    a = _ki,
    H = !1;
  for (let [u, f] of r.entries()) {
    let { index: d, items: _ } = f;
    if ((_.push(s), (a = f(s, d, _)), (f.index += 1), a.hasNext)) {
      if (a.hasMany ?? !1) {
        for (let L of a.next) if (Lki(L, t, r.slice(u + 1))) return !0;
        return H;
      }
      s = a.next;
    }
    if (!a.hasNext) break;
    a.done && (H = !0);
  }
  return (a.hasNext && t.push(s), H);
}
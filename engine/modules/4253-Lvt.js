
function Lvt(e) {
  if (_vt(e)) {
    let H = e._zod?.def;
    if (H) {
      if (H.value !== void 0) return H.value;
      if (Array.isArray(H.values) && H.values.length > 0) return H.values[0];
    }
  }
  let r = e._def;
  if (r) {
    if (r.value !== void 0) return r.value;
    if (Array.isArray(r.values) && r.values.length > 0) return r.values[0];
  }
  let s = e.value;
  if (s !== void 0) return s;
  return;
}

function hvt(e) {
  if (!e) return;
  let t;
  if (_vt(e)) t = e._zod?.def?.shape;
  else t = e.shape;
  if (!t) return;
  if (typeof t === "function")
    try {
      return t();
    } catch {
      return;
    }
  return t;
}

function Nsr(e) {
  if (e === null || e === void 0) return e;
  if (typeof e !== "object") return e;
  if (Array.isArray(e)) return e.map(Nsr);
  let t = {};
  for (let [r, s] of Object.entries(e)) {
    let a = r.replace(/_([a-z])/g, (H, u) => u.toUpperCase());
    t[a] = Nsr(s);
  }
  return t;
}

function Iwi(e) {
  let t = JSON.parse(e);
  if (t === null || typeof t !== "object") return t;
  if (K1a.test(e) === !1 && z1a.test(e) === !1) return t;
  return Q1a(t);
}
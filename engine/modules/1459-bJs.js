
function bJs(e, t, r, s) {
  let a = e.split(/\.\./),
    H = [];
  if (a[0] === void 0 || a[1] === void 0) return H;
  let u = Hnr(a[0]),
    f = Hnr(a[1]),
    d = Math.max(a[0].length, a[1].length),
    _ = a.length === 3 && a[2] !== void 0 ? Math.max(Math.abs(Hnr(a[2])), 1) : 1,
    L = TJs;
  if (f < u) ((_ *= -1), (L = vJs));
  let D = a.some(SJs),
    S = 0;
  for (let T = u; L(T, f) && H.length < r; T += _) {
    let C;
    if (t) {
      if (((C = String.fromCharCode(T)), C === "\\")) C = "";
    } else if (((C = String(T)), D)) {
      let O = d - C.length;
      if (O > 0) {
        let B = Array(O + 1).join("0");
        if (T < 0) C = "-" + B + C.slice(1);
        else C = B + C;
      }
    }
    if (S + C.length > s) break;
    (H.push(C), (S += C.length));
  }
  return H;
}
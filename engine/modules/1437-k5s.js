
function k5s(e, t, r, s) {
  let a = e.split(/\.\./),
    H = [];
  if (a[0] === void 0 || a[1] === void 0) return H;
  let u = wrr(a[0]),
    f = wrr(a[1]),
    d = Math.max(a[0].length, a[1].length),
    _ = a.length === 3 && a[2] !== void 0 ? Math.max(Math.abs(wrr(a[2])), 1) : 1,
    L = C5s;
  f < u && ((_ *= -1), (L = w5s));
  let I = a.some(P5s),
    D = 0;
  for (let S = u; L(S, f) && H.length < r; S += _) {
    let T;
    if (t) ((T = String.fromCharCode(S)), T === "\\" && (T = ""));
    else if (((T = String(S)), I)) {
      let C = d - T.length;
      if (C > 0) {
        let O = Array(C + 1).join("0");
        S < 0 ? (T = "-" + O + T.slice(1)) : (T = O + T);
      }
    }
    if (D + T.length > s) break;
    (H.push(T), (D += T.length));
  }
  return H;
}
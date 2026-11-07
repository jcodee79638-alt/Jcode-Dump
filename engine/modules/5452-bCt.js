
function bCt(e, t, r, s, a) {
  if (a) {
    let H = e.length - t.length;
    if (H >= r) {
      let u = !0;
      for (let f = 0; f < t.length; f++)
        if (!s(e[H + f], t[f])) {
          u = !1;
          break;
        }
      if (u) return H;
    }
  }
  for (let H = r; H <= e.length - t.length; H++) {
    let u = !0;
    for (let f = 0; f < t.length; f++)
      if (!s(e[H + f], t[f])) {
        u = !1;
        break;
      }
    if (u) return H;
  }
  return -1;
}
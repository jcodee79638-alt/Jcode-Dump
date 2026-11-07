
function H$r(e, t, r, s = !1) {
  if (t.length === 0) return -1;
  for (let a of [$ma, gma, Ema, Ima]) {
    if (s) {
      let H = e.length - t.length;
      if (H >= r && GDi(e, t, H, a)) return H;
    }
    for (let H = r; H <= e.length - t.length; H++) if (GDi(e, t, H, a)) return H;
  }
  return -1;
}

function $je(e, t, r, s, a) {
  var H,
    u,
    f,
    d,
    _ = 1,
    L = e.precision,
    I = Math.ceil(L / Cl);
  ((Uf = !1), (d = r.times(r)), (f = new e(s)));
  for (;;) {
    if (
      ((u = yg(f.times(d), new e(t++ * t++), L, 1)),
      (f = a ? s.plus(u) : s.minus(u)),
      (s = yg(u.times(d), new e(t++ * t++), L, 1)),
      (u = f.plus(s)),
      u.d[I] !== void 0)
    ) {
      for (H = I; u.d[H] === f.d[H] && H--;);
      if (H == -1) break;
    }
    ((H = f), (f = s), (s = u), (u = H), _++);
  }
  return ((Uf = !0), (u.d.length = I + 1), u);
}
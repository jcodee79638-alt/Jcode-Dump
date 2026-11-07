
function tyr(e, t) {
  var r,
    s,
    a,
    H,
    u,
    f,
    d,
    _ = 0,
    L = 0,
    I = 0,
    D = e.constructor,
    { rounding: S, precision: T } = D;
  if (!e.d || !e.d[0] || e.e > 17)
    return new D(e.d ? (!e.d[0] ? 1 : e.s < 0 ? 0 : 1 / 0) : e.s ? (e.s < 0 ? 0 : e) : NaN);
  if (t == null) ((Uf = !1), (d = T));
  else d = t;
  f = new D(0.03125);
  while (e.e > -2) ((e = e.times(f)), (I += 5));
  ((s = ((Math.log(lx(2, I)) / Math.LN10) * 2 + 5) | 0), (d += s), (r = H = u = new D(1)), (D.precision = d));
  for (;;) {
    if (
      ((H = Wu(H.times(e), d, 1)),
      (r = r.times(++L)),
      (f = u.plus(yg(H, r, d, 1))),
      fb(f.d).slice(0, d) === fb(u.d).slice(0, d))
    ) {
      a = I;
      while (a--) u = Wu(u.times(u), d, 1);
      if (t == null)
        if (_ < 3 && oXe(u.d, d - s, S, _)) ((D.precision = d += 10), (r = H = f = new D(1)), (L = 0), _++);
        else return Wu(u, (D.precision = T), S, (Uf = !0));
      else return ((D.precision = T), u);
    }
    u = f;
  }
}
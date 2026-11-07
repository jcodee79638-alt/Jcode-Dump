
function MHe(e, t) {
  var r,
    s,
    a,
    H,
    u,
    f,
    d,
    _,
    L,
    I,
    D,
    S = 1,
    T = 10,
    C = e,
    O = C.d,
    B = C.constructor,
    { rounding: V, precision: q } = B;
  if (C.s < 0 || !O || !O[0] || (!C.e && O[0] == 1 && O.length == 1))
    return new B(O && !O[0] ? -1 / 0 : C.s != 1 ? NaN : O ? 0 : C);
  if (t == null) ((Uf = !1), (L = q));
  else L = t;
  if (((B.precision = L += T), (r = fb(O)), (s = r.charAt(0)), Math.abs((H = C.e)) < 1500000000000000)) {
    while ((s < 7 && s != 1) || (s == 1 && r.charAt(1) > 3))
      ((C = C.times(e)), (r = fb(C.d)), (s = r.charAt(0)), S++);
    if (((H = C.e), s > 1)) ((C = new B("0." + r)), H++);
    else C = new B(s + "." + r.slice(1));
  } else
    return (
      (_ = ovt(B, L + 2, q).times(H + "")),
      (C = MHe(new B(s + "." + r.slice(1)), L - T).plus(_)),
      (B.precision = q),
      t == null ? Wu(C, q, V, (Uf = !0)) : C
    );
  ((I = C), (d = u = C = yg(C.minus(1), C.plus(1), L, 1)), (D = Wu(C.times(C), L, 1)), (a = 3));
  for (;;) {
    if (
      ((u = Wu(u.times(D), L, 1)),
      (_ = d.plus(yg(u, new B(a), L, 1))),
      fb(_.d).slice(0, L) === fb(d.d).slice(0, L))
    ) {
      if (((d = d.times(2)), H !== 0)) d = d.plus(ovt(B, L + 2, q).times(H + ""));
      if (((d = yg(d, new B(S), L, 1)), t == null))
        if (oXe(d.d, L - T, V, f))
          ((B.precision = L += T),
            (_ = u = C = yg(I.minus(1), I.plus(1), L, 1)),
            (D = Wu(C.times(C), L, 1)),
            (a = f = 1));
        else return Wu(d, (B.precision = q), V, (Uf = !0));
      else return ((B.precision = q), d);
    }
    ((d = _), (a += 2));
  }
}
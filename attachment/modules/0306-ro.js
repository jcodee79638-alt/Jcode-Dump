
var ro = function (c, t) {
    return t + 30 + Rt(c, t + 26) + Rt(c, t + 28);
  },
  ao = function (c, t, e) {
    var s = Rt(c, t + 28),
      i = Rt(c, t + 30),
      n = _n(c.subarray(t + 46, t + 46 + s), !(Rt(c, t + 8) & 2048)),
      r = t + 46 + s,
      a = oo(c, r, i, e, xt(c, t + 20), xt(c, t + 24), xt(c, t + 42)),
      o = a[0],
      l = a[1],
      h = a[2];
    return [Rt(c, t + 10), o, l, n, r + i + Rt(c, t + 32), h];
  },
  oo = function (c, t, e, s, i, n, r) {
    var a = i == 4294967295,
      o = n == 4294967295,
      l = r == 4294967295,
      h = t + e,
      d = a + o + l;
    if (s && d) {
      for (; t + 4 < h; t += 4 + Rt(c, t + 2))
        if (Rt(c, t) == 1)
          return [a ? Ss(c, t + 4 + 8 * o) : i, o ? Ss(c, t + 4) : n, l ? Ss(c, t + 4 + 8 * (o + a)) : r, 1];
      s < 2 && gt(13);
    }
    return [i, n, r, 0];
  };
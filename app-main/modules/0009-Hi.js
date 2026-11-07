
function Hi(e, t) {
  if (!t) t = {};
  var n = {},
    i = [];
  Wi(e, "", n, t);
  var r = 0,
    s = 0;
  for (var o in n) {
    var l = n[o],
      u = l[0],
      p = l[1],
      w = p.level == 0 ? 0 : 8,
      f = Ni(o),
      h = f.length,
      m = p.comment,
      b = m && Ni(m),
      C = b && b.length,
      g = Rr(p.extra);
    if (h > 65535) zn(11);
    var k = w ? ta(u, p) : u,
      a = k.length,
      d = Xo();
    (d.p(u),
      i.push(
        Ji(p, {
          size: u.length,
          crc: d.d(),
          c: k,
          f,
          m: b,
          u: h != o.length || (b && m.length != C),
          o: r,
          compression: w,
        }),
      ),
      (r += 30 + h + g + a),
      (s += 76 + 2 * (h + g) + (C || 0) + a));
  }
  var c = new ke(s + 22),
    y = r,
    v = s - r;
  for (var E = 0; E < i.length; ++E) {
    var f = i[E];
    Oi(c, f.o, f, f.f, f.u, f.c.length);
    var S = 30 + f.f.length + Rr(f.extra);
    (c.set(f.c, f.o + S),
      Oi(c, r, f, f.f, f.u, f.c.length, f.o, f.m),
      (r += 16 + S + (f.m ? f.m.length : 0)));
  }
  return (ia(c, r, i.length, v, y), c);
}
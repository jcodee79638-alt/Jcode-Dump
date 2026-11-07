
function lo(c, t) {
  for (var e = {}, s = c.length - 22; xt(c, s) != 101010256; --s) (!s || c.length - s > 65558) && gt(13);
  var i = Rt(c, s + 8);
  if (!i) return {};
  var n = xt(c, s + 16),
    r = xt(c, s - 20) == 117853008;
  if (r) {
    var a = xt(c, s - 12);
    ((r = xt(c, a) == 101075792), r && ((i = xt(c, a + 32)), (n = xt(c, a + 48))));
  }
  for (var o = t && t.filter, l = 0; l < i; ++l) {
    var h = ao(c, n, r),
      d = h[0],
      u = h[1],
      f = h[2],
      p = h[3],
      g = h[4],
      m = h[5],
      b = ro(c, m);
    ((n = g),
      (!o || o({ name: p, size: u, originalSize: f, compression: d })) &&
        (d
          ? d == 8
            ? (e[p] = so(c.subarray(b, b + u), { out: new At(f) }))
            : gt(14, "unknown compression type " + d)
          : (e[p] = li(c, b, b + u))));
  }
  return e;
}
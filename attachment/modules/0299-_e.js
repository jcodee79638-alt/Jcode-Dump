
var _e = function (c, t, e) {
    for (var s = c.length, i = 0, n = new ce(t); i < s; ++i) c[i] && ++n[c[i] - 1];
    var r = new ce(t);
    for (i = 1; i < t; ++i) r[i] = (r[i - 1] + n[i - 1]) << 1;
    var a;
    if (e) {
      a = new ce(1 << t);
      var o = 15 - t;
      for (i = 0; i < s; ++i)
        if (c[i])
          for (
            var l = (i << 4) | c[i], h = t - c[i], d = r[c[i] - 1]++ << h, u = d | ((1 << h) - 1);
            d <= u;
            ++d
          )
            a[Hs[d] >> o] = l;
    } else for (a = new ce(s), i = 0; i < s; ++i) c[i] && (a[i] = Hs[r[c[i] - 1]++] >> (15 - c[i]));
    return a;
  },
  Fe = new At(288);
for (var K = 0; K < 144; ++K) Fe[K] = 8;
for (var K = 144; K < 256; ++K) Fe[K] = 9;
for (var K = 256; K < 280; ++K) Fe[K] = 7;
for (var K = 280; K < 288; ++K) Fe[K] = 8;
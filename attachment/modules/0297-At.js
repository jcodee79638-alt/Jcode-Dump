
var At = Uint8Array,
  ce = Uint16Array,
  Va = Int32Array,
  An = new At([
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0,
  ]),
  vn = new At([
    0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0,
  ]),
  Wa = new At([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
  wn = function (c, t) {
    for (var e = new ce(31), s = 0; s < 31; ++s) e[s] = t += 1 << c[s - 1];
    for (var i = new Va(e[30]), s = 1; s < 30; ++s)
      for (var n = e[s]; n < e[s + 1]; ++n) i[n] = ((n - e[s]) << 5) | s;
    return { b: e, r: i };
  },
  Sn = wn(An, 2),
  xn = Sn.b,
  Xa = Sn.r;
((xn[28] = 258), (Xa[258] = 28));
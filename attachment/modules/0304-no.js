
var no = function (c) {
  for (var t = "", e = 0; ;) {
    var s = c[e++],
      i = (s > 127) + (s > 223) + (s > 239);
    if (e + i > c.length) return { s: t, r: li(c, e - 1) };
    i
      ? i == 3
        ? ((s = (((s & 15) << 18) | ((c[e++] & 63) << 12) | ((c[e++] & 63) << 6) | (c[e++] & 63)) - 65536),
          (t += String.fromCharCode(55296 | (s >> 10), 56320 | (s & 1023))))
        : i & 1
          ? (t += String.fromCharCode(((s & 31) << 6) | (c[e++] & 63)))
          : (t += String.fromCharCode(((s & 15) << 12) | ((c[e++] & 63) << 6) | (c[e++] & 63)))
      : (t += String.fromCharCode(s));
  }
};
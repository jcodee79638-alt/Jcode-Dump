
function Ni(e, t) {
  if (t) {
    var n = new ke(e.length);
    for (var i = 0; i < e.length; ++i) n[i] = e.charCodeAt(i);
    return n;
  }
  if (zi) return zi.encode(e);
  var r = e.length,
    s = new ke(e.length + (e.length >> 1)),
    o = 0,
    l = function (w) {
      s[o++] = w;
    };
  for (var i = 0; i < r; ++i) {
    if (o + 5 > s.length) {
      var u = new ke(o + 8 + ((r - i) << 1));
      (u.set(s), (s = u));
    }
    var p = e.charCodeAt(i);
    if (p < 128 || t) l(p);
    else if (p < 2048) (l(192 | (p >> 6)), l(128 | (p & 63)));
    else if (p > 55295 && p < 57344)
      ((p = (65536 + (p & 1047552)) | (e.charCodeAt(++i) & 1023)),
        l(240 | (p >> 18)),
        l(128 | ((p >> 12) & 63)),
        l(128 | ((p >> 6) & 63)),
        l(128 | (p & 63)));
    else (l(224 | (p >> 12)), l(128 | ((p >> 6) & 63)), l(128 | (p & 63)));
  }
  return Bi(s, 0, o);
}

function _n(c, t) {
  if (t) {
    for (var e = "", s = 0; s < c.length; s += 16384)
      e += String.fromCharCode.apply(null, c.subarray(s, s + 16384));
    return e;
  } else {
    if (Us) return Us.decode(c);
    var i = no(c),
      n = i.s,
      e = i.r;
    return (e.length && gt(8), n);
  }
}
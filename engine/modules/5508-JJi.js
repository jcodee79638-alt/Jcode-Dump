
var JJi = Ie(function (ZKa) {
  ZKa.GREATEST_LOWER_BOUND = 1;
  ZKa.LEAST_UPPER_BOUND = 2;
  function pPr(e, t, r, s, a, H) {
    var u = Math.floor((t - e) / 2) + e,
      f = a(r, s[u], !0);
    if (f === 0) return u;
    else if (f > 0) {
      if (t - u > 1) return pPr(u, t, r, s, a, H);
      if (H == ZKa.LEAST_UPPER_BOUND) return t < s.length ? t : -1;
      else return u;
    } else {
      if (u - e > 1) return pPr(e, u, r, s, a, H);
      if (H == ZKa.LEAST_UPPER_BOUND) return u;
      else return e < 0 ? -1 : e;
    }
  }
  ZKa.search = function (t, r, s, a) {
    if (r.length === 0) return -1;
    var H = pPr(-1, r.length, t, r, s, a || ZKa.GREATEST_LOWER_BOUND);
    if (H < 0) return -1;
    while (H - 1 >= 0) {
      if (s(r[H], r[H - 1], !0) !== 0) break;
      --H;
    }
    return H;
  };
});
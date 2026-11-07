
function rvt(e, t, r) {
  var s,
    a = [0],
    H,
    u = 0,
    f = e.length;
  for (; u < f;) {
    for (H = a.length; H--;) a[H] *= t;
    a[0] += YDr.indexOf(e.charAt(u++));
    for (s = 0; s < a.length; s++)
      if (a[s] > r - 1) {
        if (a[s + 1] === void 0) a[s + 1] = 0;
        ((a[s + 1] += (a[s] / r) | 0), (a[s] %= r));
      }
  }
  return a.reverse();
}
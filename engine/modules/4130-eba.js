
function eba(e, t) {
  var r,
    s = t.d.length;
  if (s < 3) return t.isZero() ? t : $je(e, 2, t, t);
  ((r = 1.4 * Math.sqrt(s)), (r = r > 16 ? 16 : r | 0), (t = t.times(1 / cvt(5, r))), (t = $je(e, 2, t, t)));
  var a,
    H = new e(5),
    u = new e(16),
    f = new e(20);
  for (; r--;) ((a = t.times(t)), (t = t.times(H.plus(a.times(u.times(a).minus(f))))));
  return t;
}
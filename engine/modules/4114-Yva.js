
function Yva(e, t) {
  var r, s, a;
  if (t.isZero()) return t;
  if (((s = t.d.length), s < 32)) ((r = Math.ceil(s / 3)), (a = (1 / cvt(4, r)).toString()));
  else ((r = 16), (a = "2.3283064365386962890625e-10"));
  ((e.precision += r), (t = $je(e, 1, t.times(a), new e(1))));
  for (var H = r; H--;) {
    var u = t.times(t);
    t = u.times(u).minus(u).times(8).plus(1);
  }
  return ((e.precision -= r), t);
}
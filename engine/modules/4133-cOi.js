
function cOi(e, t) {
  var r,
    s = t.s < 0,
    a = PX(e, e.precision, 1),
    H = a.times(0.5);
  if (((t = t.abs()), t.lte(H))) return ((Hee = s ? 4 : 1), t);
  if (((r = t.divToInt(a)), r.isZero())) Hee = s ? 3 : 2;
  else {
    if (((t = t.minus(r.times(a))), t.lte(H))) return ((Hee = Q8i(r) ? (s ? 2 : 3) : s ? 4 : 1), t);
    Hee = Q8i(r) ? (s ? 1 : 4) : s ? 3 : 2;
  }
  return t.minus(a).abs();
}
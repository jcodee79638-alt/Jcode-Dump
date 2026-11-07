
function kba() {
  var e = 0,
    t = arguments,
    r = new this(t[e]);
  Uf = !1;
  for (; r.s && ++e < t.length;) r = r.plus(t[e]);
  return ((Uf = !0), Wu(r, this.precision, this.rounding));
}
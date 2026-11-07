
function Lba() {
  var e,
    t,
    r = new this(0);
  Uf = !1;
  for (e = 0; e < arguments.length;)
    if (((t = new this(arguments[e++])), !t.d)) {
      if (t.s) return ((Uf = !0), new this(1 / 0));
      r = t;
    } else if (r.d) r = r.plus(t.times(t));
  return ((Uf = !0), r.sqrt());
}
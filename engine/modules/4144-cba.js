
function cba(e, t) {
  ((e = new this(e)), (t = new this(t)));
  var r,
    s = this.precision,
    a = this.rounding,
    H = s + 4;
  if (!e.s || !t.s) r = new this(NaN);
  else if (!e.d && !t.d) ((r = PX(this, H, 1).times(t.s > 0 ? 0.25 : 0.75)), (r.s = e.s));
  else if (!t.d || e.isZero()) ((r = t.s < 0 ? PX(this, s, a) : new this(0)), (r.s = e.s));
  else if (!e.d || t.isZero()) ((r = PX(this, H, 1).times(0.5)), (r.s = e.s));
  else if (t.s < 0)
    ((this.precision = H),
      (this.rounding = 1),
      (r = this.atan(yg(e, t, H, 1))),
      (t = PX(this, H, 1)),
      (this.precision = s),
      (this.rounding = a),
      (r = e.s < 0 ? r.minus(t) : r.plus(t)));
  else r = this.atan(yg(e, t, H, 1));
  return r;
}
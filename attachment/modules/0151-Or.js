
class Or extends Ys {
  constructor(t) {
    (super(),
      (this._type = t[1]),
      (this._bbox = t[2]),
      (this._colorStops = t[3]),
      (this._p0 = t[4]),
      (this._p1 = t[5]),
      (this._r0 = t[6]),
      (this._r1 = t[7]));
  }
  isOriginBased() {
    return (
      this._p0[0] === 0 && this._p0[1] === 0 && (!this.isRadial() || (this._p1[0] === 0 && this._p1[1] === 0))
    );
  }
  isRadial() {
    return this._type === "radial";
  }
  areConic() {
    if (!this.isRadial()) return !1;
    const t = Math.hypot(this._p0[0] - this._p1[0], this._p0[1] - this._p1[1]);
    return t + this._r1 > this._r0 && t + this._r0 > this._r1;
  }
  _createGradient(t, e = null) {
    let s,
      i = this._p0,
      n = this._p1;
    if (
      (e && ((i = i.slice()), (n = n.slice()), T.applyTransform(i, e), T.applyTransform(n, e)),
      this._type === "axial")
    )
      s = t.createLinearGradient(i[0], i[1], n[0], n[1]);
    else if (this._type === "radial") {
      let r = this._r0,
        a = this._r1;
      if (e) {
        const o = new Float32Array(2);
        (T.singularValueDecompose2dScale(e, o), (r *= o[0]), (a *= o[0]));
      }
      s = t.createRadialGradient(i[0], i[1], r, n[0], n[1], a);
    }
    for (const r of this._colorStops) s.addColorStop(r[0], r[1]);
    return s;
  }
  _createReversedGradient(t, e = null) {
    let s = this._p1,
      i = this._p0;
    e && ((s = s.slice()), (i = i.slice()), T.applyTransform(s, e), T.applyTransform(i, e));
    let n = this._r1,
      r = this._r0;
    if (e) {
      const l = new Float32Array(2);
      (T.singularValueDecompose2dScale(e, l), (n *= l[0]), (r *= l[0]));
    }
    const a = t.createRadialGradient(s[0], s[1], n, i[0], i[1], r),
      o = this._colorStops.map(([l, h]) => [1 - l, h]).reverse();
    for (const [l, h] of o) a.addColorStop(l, h);
    return a;
  }
  _createRasterPattern(t, e, s, i, n, r) {
    const a = Math.ceil(i[2] - i[0]) || 1,
      o = Math.ceil(i[3] - i[1]) || 1,
      l = e.canvasFactory.create(a, o),
      h = l.context;
    (h.clearRect(0, 0, a, o),
      h.beginPath(),
      h.rect(0, 0, a, o),
      h.translate(-i[0], -i[1]),
      (s = T.transform(s, [1, 0, 0, 1, i[0], i[1]])),
      h.transform(...n),
      We(h, this._bbox),
      this.areConic() && ((h.fillStyle = this._createReversedGradient(h)), h.fill()),
      (h.fillStyle = this._createGradient(h)),
      h.fill(),
      r?.applyToCanvas(h));
    const d = t.createPattern(l.canvas, "no-repeat");
    return (e.canvasFactory.destroy(l), d.setTransform(new DOMMatrix(s)), d);
  }
  getPattern(t, e, s, i) {
    const n = e.current.transferMapsFallback;
    if (i === ht.STROKE || i === ht.FILL) {
      if (this.isOriginBased() && !n) {
        let o = T.transform(s, e.baseTransform);
        this.matrix && (o = T.transform(o, this.matrix));
        const l = 0.001,
          h = Math.hypot(o[0], o[1]),
          d = Math.hypot(o[2], o[3]),
          u = (o[0] * o[2] + o[1] * o[3]) / (h * d);
        if (Math.abs(u) < l)
          if (this.isRadial()) {
            if (Math.abs(h - d) < l) return this._createGradient(t, o);
          } else return this._createGradient(t, o);
      }
      const r = e.current.getClippedPathBoundingBox(i, V(t)) || [0, 0, 0, 0],
        a = this.matrix ? T.transform(e.baseTransform, this.matrix) : e.baseTransform;
      return this._createRasterPattern(t, e, s, r, a, n);
    }
    return n && s
      ? this._createRasterPattern(t, e, s, e.current.clipBox, V(t), n)
      : (this.areConic() &&
          (t.save(),
          We(t, this._bbox),
          (t.fillStyle = this._createReversedGradient(t)),
          t.fillRect(-1e10, -1e10, 2e10, 2e10),
          t.restore()),
        We(t, this._bbox),
        this._createGradient(t));
  }
}
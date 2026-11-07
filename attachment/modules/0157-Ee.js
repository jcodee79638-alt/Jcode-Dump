
class Ee {
  static MAX_PATTERN_SIZE = 3e3;
  constructor(t, e, s, i) {
    ((this.color = t[1]),
      (this.operatorList = t[2]),
      (this.matrix = t[3]),
      (this.bbox = t[4]),
      (this.xstep = t[5]),
      (this.ystep = t[6]),
      (this.paintType = t[7]),
      (this.tilingType = t[8]),
      (this.needsIsolation = t[9] ?? !0),
      (this.ctx = e),
      (this.canvasGraphicsFactory = s),
      (this.baseTransform = i),
      (this.patternBaseMatrix = this.matrix ? T.transform(i, this.matrix) : i));
  }
  canSkipPatternCanvas([t, e, s, i]) {
    const [n, r, a, o] = this.bbox,
      l = Math.abs(this.xstep),
      h = Math.abs(this.ystep);
    if (t > l + 1e-6 || e > h + 1e-6) return null;
    const d = Math.floor((s - a) / l) + 1,
      u = Math.ceil((s + t - n) / l) - 1,
      f = Math.floor((i - o) / h) + 1,
      p = Math.ceil((i + e - r) / h) - 1;
    return u <= d && p <= f ? [d, f] : null;
  }
  updatePatternDims(t, e) {
    const s = Lt.slice();
    (T.axialAlignedBoundingBox(t, T.inverseTransform(this.patternBaseMatrix), s),
      (e[0] = s[2] - s[0]),
      (e[1] = s[3] - s[1]),
      (e[2] = s[0]),
      (e[3] = s[1]));
  }
  _renderTileCanvas(t, e, s, i) {
    const [n, r, a, o] = this.bbox,
      l = t.canvasFactory.create(s.size, i.size),
      h = l.context,
      d = this.canvasGraphicsFactory.createCanvasGraphics(h, e);
    return (
      (d.groupLevel = t.groupLevel),
      (d.current.transferMapsFallback = t.current.transferMapsFallback),
      this.setFillAndStrokeStyleToContext(d, this.paintType, this.color),
      h.translate(-s.scale * n, -i.scale * r),
      d.transform(0, s.scale, 0, 0, i.scale, 0, 0),
      h.save(),
      d.dependencyTracker?.save(),
      this.clipBbox(d, n, r, a, o),
      (d.baseTransform = V(d.ctx)),
      d.executeOperatorList(this.operatorList),
      d.endDrawing(),
      d.dependencyTracker?.restore(),
      h.restore(),
      l
    );
  }
  _getCombinedScales() {
    const t = new Float32Array(2);
    T.singularValueDecompose2dScale(this.matrix, t);
    const [e, s] = t;
    return (T.singularValueDecompose2dScale(this.baseTransform, t), [e * t[0], s * t[1]]);
  }
  drawPattern(t, e, s = !1, [i, n], r) {
    const [a, o, l, h] = this.bbox,
      d = t.dependencyTracker;
    if (
      (d && (t.dependencyTracker = new ke(d, r)),
      t.save(),
      s ? t.ctx.clip(e, "evenodd") : t.ctx.clip(e),
      t.ctx.setTransform(...this.patternBaseMatrix),
      t.ctx.translate(i * this.xstep, n * this.ystep),
      this.needsIsolation ||
        t.ctx.globalAlpha !== 1 ||
        t.ctx.globalCompositeOperation !== "source-over" ||
        t.inSMaskMode)
    ) {
      const u = l - a,
        f = h - o,
        [p, g] = this._getCombinedScales(),
        m = this.getSizeAndScale(u, this.ctx.canvas.width, p),
        b = this.getSizeAndScale(f, this.ctx.canvas.height, g),
        y = this._renderTileCanvas(t, r, m, b);
      (t.ctx.drawImage(y.canvas, a, o, u, f), t.canvasFactory.destroy(y));
    } else
      (this.setFillAndStrokeStyleToContext(t, this.paintType, this.color),
        this.clipBbox(t, a, o, l, h),
        t.baseTransformStack.push(t.baseTransform),
        (t.baseTransform = V(t.ctx)),
        t.executeOperatorList(this.operatorList),
        (t.baseTransform = t.baseTransformStack.pop()));
    (t.restore(), d && (t.dependencyTracker = d));
  }
  createPatternCanvas(t, e) {
    const [s, i, n, r] = this.bbox,
      a = n - s,
      o = r - i;
    let { xstep: l, ystep: h } = this;
    ((l = Math.abs(l)), (h = Math.abs(h)), ts("TilingType: " + this.tilingType));
    const [d, u] = this._getCombinedScales();
    let f = a,
      p = o,
      g = !1,
      m = !1;
    (Math.ceil(l * d) >= Math.ceil(a * d) ? (f = l) : (g = !0),
      Math.ceil(h * u) >= Math.ceil(o * u) ? (p = h) : (m = !0));
    const b = this.getSizeAndScale(f, this.ctx.canvas.width, d),
      y = this.getSizeAndScale(p, this.ctx.canvas.height, u),
      A = this._renderTileCanvas(t, e, b, y);
    if (g || m) {
      const w = A.canvas;
      (g && (f = l), m && (p = h));
      const v = this.getSizeAndScale(f, this.ctx.canvas.width, d),
        S = this.getSizeAndScale(p, this.ctx.canvas.height, u),
        x = v.size,
        _ = S.size,
        E = t.canvasFactory.create(x, _),
        P = E.context,
        C = g ? Math.min(Math.floor(a / l), Math.ceil(w.width / x)) : 0,
        R = m ? Math.min(Math.floor(o / h), Math.ceil(w.height / _)) : 0;
      let L = w,
        O = null;
      if (m) {
        O = t.canvasFactory.create(w.width, _);
        const W = O.context;
        for (let I = R; I >= 0; I--) W.drawImage(w, 0, _ * I, w.width, _, 0, 0, w.width, _);
        L = O.canvas;
      }
      for (let W = C; W >= 0; W--) P.drawImage(L, x * W, 0, x, _, 0, 0, x, _);
      return (
        O && t.canvasFactory.destroy(O),
        t.canvasFactory.destroy(A),
        { canvas: E.canvas, canvasEntry: E, scaleX: v.scale, scaleY: S.scale, offsetX: s, offsetY: i }
      );
    }
    return { canvas: A.canvas, canvasEntry: A, scaleX: b.scale, scaleY: y.scale, offsetX: s, offsetY: i };
  }
  getSizeAndScale(t, e, s) {
    const i = Math.max(Ee.MAX_PATTERN_SIZE, e);
    let n = Math.ceil(t * s);
    return (n >= i ? (n = i) : (s = n / t), { scale: s, size: n });
  }
  clipBbox(t, e, s, i, n) {
    const r = i - e,
      a = n - s,
      o = new Path2D();
    (o.rect(e, s, r, a),
      T.axialAlignedBoundingBox([e, s, i, n], V(t.ctx), t.current.minMax),
      t.ctx.clip(o),
      t.current.updateClipFromPath());
  }
  setFillAndStrokeStyleToContext(t, e, s) {
    switch (e) {
      case Ti.COLORED:
        s = "#000000";
        break;
      case Ti.UNCOLORED:
        break;
      default:
        throw new Rn(`Unsupported paint type: ${e}`);
    }
    const { ctx: i, current: n } = t;
    ((n.patternFill = n.patternStroke = !1),
      (i.fillStyle = i.strokeStyle = n.transferMapsFallback?.applyToColor(s) ?? s),
      (n.fillColor = n.strokeColor = s));
  }
  isModifyingCurrentTransform() {
    return !1;
  }
  getPattern(t, e, s, i, n) {
    const r = i !== ht.SHADING ? T.transform(s, this.patternBaseMatrix) : s,
      a = this.createPatternCanvas(e, n);
    let o = new DOMMatrix(r);
    ((o = o.translate(a.offsetX, a.offsetY)), (o = o.scale(1 / a.scaleX, 1 / a.scaleY)));
    const l = t.createPattern(a.canvas, "repeat");
    return (e.canvasFactory.destroy(a.canvasEntry), l.setTransform(o), l);
  }
}
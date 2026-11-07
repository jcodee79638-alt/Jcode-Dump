
class Lr extends Ys {
  constructor(t) {
    (super(),
      (this._posData = t[2]),
      (this._colData = t[3]),
      (this._vertexCount = t[4]),
      (this._bounds = t[5]),
      (this._bbox = t[6]),
      (this._background = t[7]),
      Dr());
  }
  _createMeshCanvas(t, e, s, i = null) {
    const o = Math.floor(this._bounds[0]),
      l = Math.floor(this._bounds[1]),
      h = Math.ceil(this._bounds[2]) - o,
      d = Math.ceil(this._bounds[3]) - l,
      u = Math.min(Math.ceil(Math.abs(h * t[0] * 1.1)), 3e3) || 1,
      f = Math.min(Math.ceil(Math.abs(d * t[1] * 1.1)), 3e3) || 1,
      p = h ? h / u : 1,
      g = d ? d / f : 1,
      m = {
        coords: this._posData,
        colors: this._colData,
        offsetX: -o,
        offsetY: -l,
        scaleX: 1 / p,
        scaleY: 1 / g,
      },
      b = u + 4,
      y = f + 4,
      A = s.create(b, y);
    if (Ir() && this._vertexCount > 48)
      A.context.drawImage(Fr(this._posData, this._colData, this._vertexCount, m, e, b, y, 2), 0, 0);
    else {
      const w = A.context.createImageData(u, f);
      if (e) {
        const v = w.data;
        for (let S = 0, x = v.length; S < x; S += 4)
          ((v[S] = e[0]), (v[S + 1] = e[1]), (v[S + 2] = e[2]), (v[S + 3] = 255));
      }
      for (let v = 0, S = this._vertexCount; v < S; v += 3) Rr(w, m, v, v + 1, v + 2, v, v + 1, v + 2);
      A.context.putImageData(w, 2, 2);
    }
    return (
      i?.applyToCanvas(A.context),
      { canvas: A.canvas, offsetX: o - 2 * p, offsetY: l - 2 * g, scaleX: p, scaleY: g }
    );
  }
  isModifyingCurrentTransform() {
    return !0;
  }
  getPattern(t, e, s, i) {
    We(t, this._bbox);
    const n = new Float32Array(2);
    if (i === ht.SHADING) T.singularValueDecompose2dScale(V(t), n);
    else if (this.matrix) {
      T.singularValueDecompose2dScale(this.matrix, n);
      const [o, l] = n;
      (T.singularValueDecompose2dScale(e.baseTransform, n), (n[0] *= o), (n[1] *= l));
    } else T.singularValueDecompose2dScale(e.baseTransform, n);
    const r = this._createMeshCanvas(
      n,
      i === ht.SHADING ? null : this._background,
      e.canvasFactory,
      e.current.transferMapsFallback,
    );
    (i !== ht.SHADING && (t.setTransform(...e.baseTransform), this.matrix && t.transform(...this.matrix)),
      t.translate(r.offsetX, r.offsetY),
      t.scale(r.scaleX, r.scaleY));
    const a = t.createPattern(r.canvas, "no-repeat");
    return (e.canvasFactory.destroy(r), a);
  }
}
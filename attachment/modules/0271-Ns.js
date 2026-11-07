
class Ns extends M {
  #t;
  #e = null;
  #s;
  constructor(t, e, s, i) {
    (super(), (this.#s = t), (this.#t = e), (this.firstPoint = s), (this.lastPoint = i));
  }
  static build(t, e) {
    const s = new Ls(t, 0.001).getOutlines();
    return ((s.#e = t), (s.focusOutline = new Ls(t, 0.0025, 0.001, e).getOutlines()), s);
  }
  get isFree() {
    return !1;
  }
  get defaultSVGProperties() {
    return bn(this);
  }
  getFocusSVGProperties(t) {
    return yn(this, t);
  }
  updateRotation(t) {
    return { root: { "data-main-rotation": t } };
  }
  serializeQuadPoints([t, e], [s, i]) {
    const n = this.#e,
      r = new Float32Array(n.length * 8);
    let a = 0;
    for (const { x: o, y: l, width: h, height: d } of n) {
      const u = o * s + t,
        f = (1 - l) * i + e;
      ((r[a] = r[a + 4] = u),
        (r[a + 1] = r[a + 3] = f),
        (r[a + 2] = r[a + 6] = u + h * s),
        (r[a + 5] = r[a + 7] = f - d * i),
        (a += 8));
    }
    return r;
  }
  toSVGPath() {
    const t = [];
    for (const e of this.#s) {
      let [s, i] = e;
      t.push(`M${s} ${i}`);
      for (let n = 2; n < e.length; n += 2) {
        const r = e[n],
          a = e[n + 1];
        r === s ? (t.push(`V${a}`), (i = a)) : a === i && (t.push(`H${r}`), (s = r));
      }
      t.push("Z");
    }
    return t.join(" ");
  }
  serialize([t, e, s, i], n) {
    const r = [],
      a = s - t,
      o = i - e;
    for (const l of this.#s) {
      const h = new Array(l.length);
      for (let d = 0; d < l.length; d += 2) ((h[d] = t + l[d] * a), (h[d + 1] = i - l[d + 1] * o));
      r.push(h);
    }
    return r;
  }
  get box() {
    return this.#t;
  }
}
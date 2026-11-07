
class mn extends M {
  #t;
  #e = new Float32Array(4);
  #s;
  #i;
  #n;
  #a;
  #r;
  constructor(t, e, s, i, n, r) {
    (super(),
      (this.#r = t),
      (this.#n = e),
      (this.#t = s),
      (this.#a = i),
      (this.#s = n),
      (this.#i = r),
      (this.firstPoint = [NaN, NaN]),
      (this.lastPoint = [NaN, NaN]),
      this.#o(r));
    const [a, o, l, h] = this.#e;
    for (let d = 0, u = t.length; d < u; d += 2) ((t[d] = (t[d] - a) / l), (t[d + 1] = (t[d + 1] - o) / h));
    for (let d = 0, u = e.length; d < u; d += 2) ((e[d] = (e[d] - a) / l), (e[d + 1] = (e[d + 1] - o) / h));
  }
  toSVGPath() {
    const t = [`M${this.#r[4]} ${this.#r[5]}`];
    for (let e = 6, s = this.#r.length; e < s; e += 6) {
      if (isNaN(this.#r[e])) {
        t.push(`L${this.#r[e + 4]} ${this.#r[e + 5]}`);
        continue;
      }
      t.push(
        `C${this.#r[e]} ${this.#r[e + 1]} ${this.#r[e + 2]} ${this.#r[e + 3]} ${this.#r[e + 4]} ${this.#r[e + 5]}`,
      );
    }
    return (t.push("Z"), t.join(" "));
  }
  serialize([t, e, s, i], n) {
    const r = s - t,
      a = i - e;
    let o, l;
    switch (n) {
      case 0:
        ((o = M._rescale(this.#r, t, i, r, -a)), (l = M._rescale(this.#n, t, i, r, -a)));
        break;
      case 90:
        ((o = M._rescaleAndSwap(this.#r, t, e, r, a)), (l = M._rescaleAndSwap(this.#n, t, e, r, a)));
        break;
      case 180:
        ((o = M._rescale(this.#r, s, e, -r, a)), (l = M._rescale(this.#n, s, e, -r, a)));
        break;
      case 270:
        ((o = M._rescaleAndSwap(this.#r, s, i, -r, -a)), (l = M._rescaleAndSwap(this.#n, s, i, -r, -a)));
        break;
    }
    return { outline: Array.from(o), points: [Array.from(l)] };
  }
  #o(t) {
    const e = this.#r;
    let s = e[4],
      i = e[5];
    const n = [s, i, s, i];
    let r = s,
      a = i,
      o = s,
      l = i;
    const h = t ? Math.max : Math.min,
      d = new Float32Array(4);
    for (let f = 6, p = e.length; f < p; f += 6) {
      const g = e[f + 4],
        m = e[f + 5];
      (isNaN(e[f])
        ? (T.pointBoundingBox(g, m, n),
          a > m ? ((r = g), (a = m)) : a === m && (r = h(r, g)),
          l < m ? ((o = g), (l = m)) : l === m && (o = h(o, g)))
        : (d.set(Lt, 0),
          T.bezierBoundingBox(s, i, ...e.slice(f, f + 6), d),
          T.rectBoundingBox(...d, n),
          a > d[1] ? ((r = d[0]), (a = d[1])) : a === d[1] && (r = h(r, d[0])),
          l < d[3] ? ((o = d[2]), (l = d[3])) : l === d[3] && (o = h(o, d[2]))),
        (s = g),
        (i = m));
    }
    const u = this.#e;
    ((u[0] = n[0] - this.#s),
      (u[1] = n[1] - this.#s),
      (u[2] = n[2] - n[0] + 2 * this.#s),
      (u[3] = n[3] - n[1] + 2 * this.#s),
      (this.firstPoint = [r, a]),
      (this.lastPoint = [o, l]));
  }
  get box() {
    return this.#e;
  }
  newOutliner(t, e, s, i, n, r, a = 0) {
    return new Kt(t, e, s, i, n, r, a);
  }
  updateThickness(t) {
    const e = this.getNewOutline(t);
    return (
      (this.#r = e.#r),
      (this.#n = e.#n),
      this.#e.set(e.#e),
      (this.firstPoint = e.firstPoint),
      (this.lastPoint = e.lastPoint),
      this.#e
    );
  }
  getNewOutline(t, e) {
    const [s, i, n, r] = this.#e,
      [a, o, l, h] = this.#t,
      d = n * l,
      u = r * h,
      f = s * l + a,
      p = i * h + o,
      g = this.#n,
      m = this.newOutliner(g[0] * d + f, g[1] * u + p, this.#t, this.#a, t, this.#i, e ?? this.#s);
    for (let b = 2, y = g.length; b < y; b += 2) m.add(g[b] * d + f, g[b + 1] * u + p);
    return m.getOutlines();
  }
}
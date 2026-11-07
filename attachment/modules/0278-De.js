
class De extends M {
  #t;
  #e = 0;
  #s;
  #i;
  #n;
  #a;
  #r;
  #o;
  #l;
  build(t, e, s, i, n, r, a) {
    ((this.#n = e),
      (this.#a = s),
      (this.#r = i),
      (this.#o = n),
      (this.#l = r),
      (this.#s = a ?? 0),
      (this.#i = t),
      this.#d());
  }
  get thickness() {
    return this.#l;
  }
  setLastElement(t) {
    return (this.#i.push(t), { path: { d: this.toSVGPath() } });
  }
  removeLastElement() {
    return (this.#i.pop(), { path: { d: this.toSVGPath() } });
  }
  toSVGPath() {
    const t = [];
    for (const { line: e } of this.#i) {
      if ((t.push(`M${M.svgRound(e[4])} ${M.svgRound(e[5])}`), e.length === 6)) {
        t.push("Z");
        continue;
      }
      if (e.length === 12 && isNaN(e[6])) {
        t.push(`L${M.svgRound(e[10])} ${M.svgRound(e[11])}`);
        continue;
      }
      for (let s = 6, i = e.length; s < i; s += 6) {
        const [n, r, a, o, l, h] = e.subarray(s, s + 6).map(M.svgRound);
        t.push(`C${n} ${r} ${a} ${o} ${l} ${h}`);
      }
    }
    return t.join("");
  }
  serialize([t, e, s, i], n) {
    const r = [],
      a = [],
      [o, l, h, d] = this.#u();
    let u, f, p, g, m, b, y, A, w;
    switch (this.#o) {
      case 0:
        ((w = M._rescale),
          (u = t),
          (f = e + i),
          (p = s),
          (g = -i),
          (m = t + o * s),
          (b = e + (1 - l - d) * i),
          (y = t + (o + h) * s),
          (A = e + (1 - l) * i));
        break;
      case 90:
        ((w = M._rescaleAndSwap),
          (u = t),
          (f = e),
          (p = s),
          (g = i),
          (m = t + l * s),
          (b = e + o * i),
          (y = t + (l + d) * s),
          (A = e + (o + h) * i));
        break;
      case 180:
        ((w = M._rescale),
          (u = t + s),
          (f = e),
          (p = -s),
          (g = i),
          (m = t + (1 - o - h) * s),
          (b = e + l * i),
          (y = t + (1 - o) * s),
          (A = e + (l + d) * i));
        break;
      case 270:
        ((w = M._rescaleAndSwap),
          (u = t + s),
          (f = e + i),
          (p = -s),
          (g = -i),
          (m = t + (1 - l - d) * s),
          (b = e + (1 - o - h) * i),
          (y = t + (1 - l) * s),
          (A = e + (1 - o) * i));
        break;
    }
    for (const { line: v, points: S } of this.#i)
      (r.push(w(v, u, f, p, g, n ? new Array(v.length) : null)),
        a.push(w(S, u, f, p, g, n ? new Array(S.length) : null)));
    return { lines: r, points: a, rect: [m, b, y, A] };
  }
  static deserialize(t, e, s, i, n, { paths: { lines: r, points: a }, rotation: o, thickness: l }) {
    const h = [];
    let d, u, f, p, g;
    switch (o) {
      case 0:
        ((g = M._rescale), (d = -t / s), (u = e / i + 1), (f = 1 / s), (p = -1 / i));
        break;
      case 90:
        ((g = M._rescaleAndSwap), (d = -e / i), (u = -t / s), (f = 1 / i), (p = 1 / s));
        break;
      case 180:
        ((g = M._rescale), (d = t / s + 1), (u = -e / i), (f = -1 / s), (p = 1 / i));
        break;
      case 270:
        ((g = M._rescaleAndSwap), (d = e / i + 1), (u = t / s + 1), (f = -1 / i), (p = -1 / s));
        break;
    }
    if (!r) {
      r = [];
      for (const b of a) {
        const y = b.length;
        if (y === 2) {
          r.push(new Float32Array([NaN, NaN, NaN, NaN, b[0], b[1]]));
          continue;
        }
        if (y === 4) {
          r.push(new Float32Array([NaN, NaN, NaN, NaN, b[0], b[1], NaN, NaN, NaN, NaN, b[2], b[3]]));
          continue;
        }
        const A = new Float32Array(3 * (y - 2));
        r.push(A);
        let [w, v, S, x] = b.subarray(0, 4);
        A.set([NaN, NaN, NaN, NaN, w, v], 0);
        for (let _ = 4; _ < y; _ += 2) {
          const E = b[_],
            P = b[_ + 1];
          (A.set(M.createBezierPoints(w, v, S, x, E, P), (_ - 2) * 3), ([w, v, S, x] = [S, x, E, P]));
        }
      }
    }
    for (let b = 0, y = r.length; b < y; b++)
      h.push({
        line: g(
          r[b].map((A) => A ?? NaN),
          d,
          u,
          f,
          p,
        ),
        points: g(
          a[b].map((A) => A ?? NaN),
          d,
          u,
          f,
          p,
        ),
      });
    const m = new this.prototype.constructor();
    return (m.build(h, s, i, 1, o, l, n), m);
  }
  #h(t = this.#l) {
    const e = this.#s + (t / 2) * this.#r;
    return this.#o % 180 === 0 ? [e / this.#n, e / this.#a] : [e / this.#a, e / this.#n];
  }
  #u() {
    const [t, e, s, i] = this.#t,
      [n, r] = this.#h(0);
    return [t + n, e + r, s - 2 * n, i - 2 * r];
  }
  #d() {
    const t = (this.#t = Yt.slice());
    for (const { line: i } of this.#i) {
      if (i.length <= 12) {
        for (let a = 4, o = i.length; a < o; a += 6) T.pointBoundingBox(i[a], i[a + 1], t);
        continue;
      }
      let n = i[4],
        r = i[5];
      for (let a = 6, o = i.length; a < o; a += 6) {
        const [l, h, d, u, f, p] = i.subarray(a, a + 6);
        (T.bezierBoundingBox(n, r, l, h, d, u, f, p, t), (n = f), (r = p));
      }
    }
    const [e, s] = this.#h();
    ((t[0] = Y(t[0] - e, 0, 1)),
      (t[1] = Y(t[1] - s, 0, 1)),
      (t[2] = Y(t[2] + e, 0, 1)),
      (t[3] = Y(t[3] + s, 0, 1)),
      (t[2] -= t[0]),
      (t[3] -= t[1]));
  }
  get box() {
    return this.#t;
  }
  updateProperty(t, e) {
    return t === "stroke-width" ? this.#f(e) : null;
  }
  #f(t) {
    const [e, s] = this.#h();
    this.#l = t;
    const [i, n] = this.#h(),
      [r, a] = [i - e, n - s],
      o = this.#t;
    return ((o[0] -= r), (o[1] -= a), (o[2] += 2 * r), (o[3] += 2 * a), o);
  }
  updateParentDimensions([t, e], s) {
    const [i, n] = this.#h();
    ((this.#n = t), (this.#a = e), (this.#r = s));
    const [r, a] = this.#h(),
      o = r - i,
      l = a - n,
      h = this.#t;
    return ((h[0] -= o), (h[1] -= l), (h[2] += 2 * o), (h[3] += 2 * l), h);
  }
  updateRotation(t) {
    return ((this.#e = t), { path: { transform: this.rotationTransform } });
  }
  get viewBox() {
    return this.#t.map(M.svgRound).join(" ");
  }
  get defaultProperties() {
    const [t, e] = this.#t;
    return {
      root: { viewBox: this.viewBox },
      path: { "transform-origin": `${M.svgRound(t)} ${M.svgRound(e)}` },
    };
  }
  get rotationTransform() {
    const [, , t, e] = this.#t;
    let s = 0,
      i = 0,
      n = 0,
      r = 0,
      a = 0,
      o = 0;
    switch (this.#e) {
      case 90:
        ((i = e / t), (n = -t / e), (a = t));
        break;
      case 180:
        ((s = -1), (r = -1), (a = t), (o = e));
        break;
      case 270:
        ((i = -e / t), (n = t / e), (o = e));
        break;
      default:
        return "";
    }
    return `matrix(${s} ${i} ${n} ${r} ${M.svgRound(a)} ${M.svgRound(o)})`;
  }
  getPathResizingSVGProperties([t, e, s, i]) {
    const [n, r] = this.#h(),
      [a, o, l, h] = this.#t;
    if (Math.abs(l - n) <= M.PRECISION || Math.abs(h - r) <= M.PRECISION) {
      const g = t + s / 2 - (a + l / 2),
        m = e + i / 2 - (o + h / 2);
      return {
        path: {
          "transform-origin": `${M.svgRound(t)} ${M.svgRound(e)}`,
          transform: `${this.rotationTransform} translate(${g} ${m})`,
        },
      };
    }
    const d = (s - 2 * n) / (l - 2 * n),
      u = (i - 2 * r) / (h - 2 * r),
      f = l / s,
      p = h / i;
    return {
      path: {
        "transform-origin": `${M.svgRound(a)} ${M.svgRound(o)}`,
        transform: `${this.rotationTransform} scale(${f} ${p}) translate(${M.svgRound(n)} ${M.svgRound(r)}) scale(${d} ${u}) translate(${M.svgRound(-n)} ${M.svgRound(-r)})`,
      },
    };
  }
  getPathResizedSVGProperties([t, e, s, i]) {
    const [n, r] = this.#h(),
      a = this.#t,
      [o, l, h, d] = a;
    if (
      ((a[0] = t),
      (a[1] = e),
      (a[2] = s),
      (a[3] = i),
      Math.abs(h - n) <= M.PRECISION || Math.abs(d - r) <= M.PRECISION)
    ) {
      const m = t + s / 2 - (o + h / 2),
        b = e + i / 2 - (l + d / 2);
      for (const { line: y, points: A } of this.#i) (M._translate(y, m, b, y), M._translate(A, m, b, A));
      return {
        root: { viewBox: this.viewBox },
        path: {
          "transform-origin": `${M.svgRound(t)} ${M.svgRound(e)}`,
          transform: this.rotationTransform || null,
          d: this.toSVGPath(),
        },
      };
    }
    const u = (s - 2 * n) / (h - 2 * n),
      f = (i - 2 * r) / (d - 2 * r),
      p = -u * (o + n) + t + n,
      g = -f * (l + r) + e + r;
    if (u !== 1 || f !== 1 || p !== 0 || g !== 0)
      for (const { line: m, points: b } of this.#i)
        (M._rescale(m, p, g, u, f, m), M._rescale(b, p, g, u, f, b));
    return {
      root: { viewBox: this.viewBox },
      path: {
        "transform-origin": `${M.svgRound(t)} ${M.svgRound(e)}`,
        transform: this.rotationTransform || null,
        d: this.toSVGPath(),
      },
    };
  }
  getPathTranslatedSVGProperties([t, e], s) {
    const [i, n] = s,
      r = this.#t,
      a = t - r[0],
      o = e - r[1];
    if (this.#n === i && this.#a === n)
      for (const { line: l, points: h } of this.#i) (M._translate(l, a, o, l), M._translate(h, a, o, h));
    else {
      const l = this.#n / i,
        h = this.#a / n;
      ((this.#n = i), (this.#a = n));
      for (const { line: d, points: u } of this.#i)
        (M._rescale(d, a, o, l, h, d), M._rescale(u, a, o, l, h, u));
      ((r[2] *= l), (r[3] *= h));
    }
    return (
      (r[0] = t),
      (r[1] = e),
      {
        root: { viewBox: this.viewBox },
        path: { d: this.toSVGPath(), "transform-origin": `${M.svgRound(t)} ${M.svgRound(e)}` },
      }
    );
  }
  get defaultSVGProperties() {
    const t = this.#t;
    return {
      root: { viewBox: this.viewBox },
      rootClass: { draw: !0 },
      path: {
        d: this.toSVGPath(),
        "transform-origin": `${M.svgRound(t[0])} ${M.svgRound(t[1])}`,
        transform: this.rotationTransform || null,
      },
      bbox: t,
    };
  }
}
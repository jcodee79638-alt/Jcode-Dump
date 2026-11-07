
class T {
  static get hexNums() {
    return k(
      this,
      "hexNums",
      Array.from({ length: 256 }, (t, e) => e.toString(16).padStart(2, "0")),
    );
  }
  static makeHexColor(t, e, s) {
    return `#${this.hexNums[t]}${this.hexNums[e]}${this.hexNums[s]}`;
  }
  static transform(t, e) {
    return [
      t[0] * e[0] + t[2] * e[1],
      t[1] * e[0] + t[3] * e[1],
      t[0] * e[2] + t[2] * e[3],
      t[1] * e[2] + t[3] * e[3],
      t[0] * e[4] + t[2] * e[5] + t[4],
      t[1] * e[4] + t[3] * e[5] + t[5],
    ];
  }
  static multiplyByDOMMatrix(t, e) {
    return [
      t[0] * e.a + t[2] * e.b,
      t[1] * e.a + t[3] * e.b,
      t[0] * e.c + t[2] * e.d,
      t[1] * e.c + t[3] * e.d,
      t[0] * e.e + t[2] * e.f + t[4],
      t[1] * e.e + t[3] * e.f + t[5],
    ];
  }
  static applyTransform(t, e, s = 0) {
    const i = t[s],
      n = t[s + 1];
    ((t[s] = i * e[0] + n * e[2] + e[4]), (t[s + 1] = i * e[1] + n * e[3] + e[5]));
  }
  static applyTransformToBezier(t, e, s = 0) {
    const i = e[0],
      n = e[1],
      r = e[2],
      a = e[3],
      o = e[4],
      l = e[5];
    for (let h = 0; h < 6; h += 2) {
      const d = t[s + h],
        u = t[s + h + 1];
      ((t[s + h] = d * i + u * r + o), (t[s + h + 1] = d * n + u * a + l));
    }
  }
  static applyInverseTransform(t, e) {
    const s = t[0],
      i = t[1],
      n = e[0] * e[3] - e[1] * e[2];
    ((t[0] = (s * e[3] - i * e[2] + e[2] * e[5] - e[4] * e[3]) / n),
      (t[1] = (-s * e[1] + i * e[0] + e[4] * e[1] - e[5] * e[0]) / n));
  }
  static axialAlignedBoundingBox(t, e, s) {
    const i = e[0],
      n = e[1],
      r = e[2],
      a = e[3],
      o = e[4],
      l = e[5],
      h = t[0],
      d = t[1],
      u = t[2],
      f = t[3];
    let p = i * h + o,
      g = p,
      m = i * u + o,
      b = m,
      y = a * d + l,
      A = y,
      w = a * f + l,
      v = w;
    if (n !== 0 || r !== 0) {
      const S = n * h,
        x = n * u,
        _ = r * d,
        E = r * f;
      ((p += _), (b += _), (m += E), (g += E), (y += S), (v += S), (w += x), (A += x));
    }
    ((s[0] = Math.min(s[0], p, m, g, b)),
      (s[1] = Math.min(s[1], y, w, A, v)),
      (s[2] = Math.max(s[2], p, m, g, b)),
      (s[3] = Math.max(s[3], y, w, A, v)));
  }
  static inverseTransform(t) {
    const e = t[0] * t[3] - t[1] * t[2];
    return [
      t[3] / e,
      -t[1] / e,
      -t[2] / e,
      t[0] / e,
      (t[2] * t[5] - t[4] * t[3]) / e,
      (t[4] * t[1] - t[5] * t[0]) / e,
    ];
  }
  static singularValueDecompose2dScale(t, e) {
    const s = t[0],
      i = t[1],
      n = t[2],
      r = t[3],
      a = s ** 2 + i ** 2,
      o = s * n + i * r,
      l = n ** 2 + r ** 2,
      h = (a + l) / 2,
      d = Math.sqrt(h ** 2 - (a * l - o ** 2));
    ((e[0] = Math.sqrt(h + d || 1)), (e[1] = Math.sqrt(h - d || 1)));
  }
  static normalizeRect(t) {
    const e = t.slice(0);
    return (t[0] > t[2] && ((e[0] = t[2]), (e[2] = t[0])), t[1] > t[3] && ((e[1] = t[3]), (e[3] = t[1])), e);
  }
  static intersect(t, e) {
    const s = Math.max(Math.min(t[0], t[2]), Math.min(e[0], e[2])),
      i = Math.min(Math.max(t[0], t[2]), Math.max(e[0], e[2]));
    if (s > i) return null;
    const n = Math.max(Math.min(t[1], t[3]), Math.min(e[1], e[3])),
      r = Math.min(Math.max(t[1], t[3]), Math.max(e[1], e[3]));
    return n > r ? null : [s, n, i, r];
  }
  static pointBoundingBox(t, e, s) {
    ((s[0] = Math.min(s[0], t)),
      (s[1] = Math.min(s[1], e)),
      (s[2] = Math.max(s[2], t)),
      (s[3] = Math.max(s[3], e)));
  }
  static rectBoundingBox(t, e, s, i, n) {
    ((n[0] = Math.min(n[0], t, s)),
      (n[1] = Math.min(n[1], e, i)),
      (n[2] = Math.max(n[2], t, s)),
      (n[3] = Math.max(n[3], e, i)));
  }
  static #t(t, e, s, i, n, r, a, o, l, h) {
    if (l <= 0 || l >= 1) return;
    const d = 1 - l,
      u = l * l,
      f = u * l,
      p = d * (d * (d * t + 3 * l * e) + 3 * u * s) + f * i,
      g = d * (d * (d * n + 3 * l * r) + 3 * u * a) + f * o;
    ((h[0] = Math.min(h[0], p)),
      (h[1] = Math.min(h[1], g)),
      (h[2] = Math.max(h[2], p)),
      (h[3] = Math.max(h[3], g)));
  }
  static #e(t, e, s, i, n, r, a, o, l, h, d, u) {
    if (Math.abs(l) < 1e-12) {
      Math.abs(h) >= 1e-12 && this.#t(t, e, s, i, n, r, a, o, -d / h, u);
      return;
    }
    const f = h ** 2 - 4 * d * l;
    if (f < 0) return;
    const p = Math.sqrt(f),
      g = 2 * l;
    (this.#t(t, e, s, i, n, r, a, o, (-h + p) / g, u), this.#t(t, e, s, i, n, r, a, o, (-h - p) / g, u));
  }
  static bezierBoundingBox(t, e, s, i, n, r, a, o, l) {
    ((l[0] = Math.min(l[0], t, a)),
      (l[1] = Math.min(l[1], e, o)),
      (l[2] = Math.max(l[2], t, a)),
      (l[3] = Math.max(l[3], e, o)),
      this.#e(t, s, n, a, e, i, r, o, 3 * (-t + 3 * (s - n) + a), 6 * (t - 2 * s + n), 3 * (s - t), l),
      this.#e(t, s, n, a, e, i, r, o, 3 * (-e + 3 * (i - r) + o), 6 * (e - 2 * i + r), 3 * (i - e), l));
  }
}
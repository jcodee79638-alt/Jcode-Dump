
class Ye {
  #t;
  #e;
  #s = 4;
  #i = 0;
  #n = new Ye.#a(this.#s * 6);
  static #a = j.isFloat16ArraySupported ? Float16Array : Float32Array;
  constructor(t) {
    ((this.#t = t.width), (this.#e = t.height));
  }
  record(t, e, s, i) {
    if (this.#i === this.#s) {
      this.#s *= 2;
      const a = new Ye.#a(this.#s * 6);
      (a.set(this.#n), (this.#n = a));
    }
    const n = V(t);
    let r;
    if (i[0] !== 1 / 0) {
      const a = Lt.slice();
      T.axialAlignedBoundingBox([0, -s, e, 0], n, a);
      const o = T.intersect(i, a);
      if (!o) return;
      const [l, h, d, u] = o;
      if (l !== a[0] || h !== a[1] || d !== a[2] || u !== a[3]) {
        const f = Math.atan2(n[1], n[0]),
          p = Math.abs(Math.sin(f)),
          g = Math.abs(Math.cos(f));
        if (p < 1e-6 || g < 1e-6 || Math.abs(p - g) < 1e-6) r = [l, h, l, u, d, h];
        else {
          const m = d - l,
            b = u - h,
            y = p * p,
            A = g * g,
            w = g * p,
            v = A - y,
            S = (b * A - m * w) / v,
            x = (b * w - m * y) / v;
          r = [l + x, h, l, h + S, d, u - S];
        }
      }
    }
    (r ||
      ((r = [0, -s, 0, 0, e, -s]),
      T.applyTransform(r, n, 0),
      T.applyTransform(r, n, 2),
      T.applyTransform(r, n, 4)),
      (r[0] /= this.#t),
      (r[1] /= this.#e),
      (r[2] /= this.#t),
      (r[3] /= this.#e),
      (r[4] /= this.#t),
      (r[5] /= this.#e),
      this.#n.set(r, this.#i * 6),
      this.#i++);
  }
  take() {
    return this.#n.subarray(0, this.#i * 6);
  }
}
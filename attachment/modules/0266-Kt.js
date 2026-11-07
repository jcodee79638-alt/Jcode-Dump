
class Kt {
  #t;
  #e = [];
  #s;
  #i;
  #n = [];
  #a = new Float32Array(18);
  #r;
  #o;
  #l;
  #h;
  #u;
  #d;
  #f = [];
  static #g = 8;
  static #m = 2;
  static #c = Kt.#g + Kt.#m;
  constructor(t, e, s, i, n, r, a = 0) {
    ((this.#t = s),
      (this.#d = n * i),
      (this.#i = r),
      this.#a.set([NaN, NaN, NaN, NaN, t, e], 6),
      (this.#s = a),
      (this.#h = Kt.#g * i),
      (this.#l = Kt.#c * i),
      (this.#u = i),
      this.#f.push(t, e));
  }
  isEmpty() {
    return isNaN(this.#a[8]);
  }
  isCancellable() {
    return this.#f.length <= 10;
  }
  removeLastElement() {
    return (this.#a.fill(NaN), (this.#n.length = this.#e.length = this.#f.length = 0), { path: { d: "" } });
  }
  #p() {
    const t = this.#a.subarray(4, 6),
      e = this.#a.subarray(16, 18),
      [s, i, n, r] = this.#t;
    return [
      (this.#r + (t[0] - e[0]) / 2 - s) / n,
      (this.#o + (t[1] - e[1]) / 2 - i) / r,
      (this.#r + (e[0] - t[0]) / 2 - s) / n,
      (this.#o + (e[1] - t[1]) / 2 - i) / r,
    ];
  }
  add(t, e) {
    ((this.#r = t), (this.#o = e));
    const [s, i, n, r] = this.#t;
    let [a, o, l, h] = this.#a.subarray(8, 12);
    const d = t - l,
      u = e - h,
      f = Math.hypot(d, u);
    if (f < this.#l) return !1;
    const p = f - this.#h,
      g = p / f,
      m = g * d,
      b = g * u;
    let y = a,
      A = o;
    ((a = l), (o = h), (l += m), (h += b), this.#f?.push(t, e));
    const w = -b / p,
      v = m / p,
      S = w * this.#d,
      x = v * this.#d;
    return (
      this.#a.set(this.#a.subarray(2, 8), 0),
      this.#a.set([l + S, h + x], 4),
      this.#a.set(this.#a.subarray(14, 18), 12),
      this.#a.set([l - S, h - x], 16),
      isNaN(this.#a[6])
        ? (this.#n.length === 0 &&
            (this.#a.set([a + S, o + x], 2),
            this.#n.push(NaN, NaN, NaN, NaN, (a + S - s) / n, (o + x - i) / r),
            this.#a.set([a - S, o - x], 14),
            this.#e.push(NaN, NaN, NaN, NaN, (a - S - s) / n, (o - x - i) / r)),
          this.#a.set([y, A, a, o, l, h], 6),
          !this.isEmpty())
        : (this.#a.set([y, A, a, o, l, h], 6),
          Math.abs(Math.atan2(A - o, y - a) - Math.atan2(b, m)) < Math.PI / 2
            ? (([a, o, l, h] = this.#a.subarray(2, 6)),
              this.#n.push(NaN, NaN, NaN, NaN, ((a + l) / 2 - s) / n, ((o + h) / 2 - i) / r),
              ([a, o, y, A] = this.#a.subarray(14, 18)),
              this.#e.push(NaN, NaN, NaN, NaN, ((y + a) / 2 - s) / n, ((A + o) / 2 - i) / r),
              !0)
            : (([y, A, a, o, l, h] = this.#a.subarray(0, 6)),
              this.#n.push(
                ((y + 5 * a) / 6 - s) / n,
                ((A + 5 * o) / 6 - i) / r,
                ((5 * a + l) / 6 - s) / n,
                ((5 * o + h) / 6 - i) / r,
                ((a + l) / 2 - s) / n,
                ((o + h) / 2 - i) / r,
              ),
              ([l, h, a, o, y, A] = this.#a.subarray(12, 18)),
              this.#e.push(
                ((y + 5 * a) / 6 - s) / n,
                ((A + 5 * o) / 6 - i) / r,
                ((5 * a + l) / 6 - s) / n,
                ((5 * o + h) / 6 - i) / r,
                ((a + l) / 2 - s) / n,
                ((o + h) / 2 - i) / r,
              ),
              !0))
    );
  }
  toSVGPath() {
    if (this.isEmpty()) return "";
    const t = this.#n,
      e = this.#e;
    if (isNaN(this.#a[6]) && !this.isEmpty()) return this.#b();
    const s = [];
    s.push(`M${t[4]} ${t[5]}`);
    for (let i = 6; i < t.length; i += 6)
      isNaN(t[i])
        ? s.push(`L${t[i + 4]} ${t[i + 5]}`)
        : s.push(`C${t[i]} ${t[i + 1]} ${t[i + 2]} ${t[i + 3]} ${t[i + 4]} ${t[i + 5]}`);
    this.#A(s);
    for (let i = e.length - 6; i >= 6; i -= 6)
      isNaN(e[i])
        ? s.push(`L${e[i + 4]} ${e[i + 5]}`)
        : s.push(`C${e[i]} ${e[i + 1]} ${e[i + 2]} ${e[i + 3]} ${e[i + 4]} ${e[i + 5]}`);
    return (this.#y(s), s.join(" "));
  }
  #b() {
    const [t, e, s, i] = this.#t,
      [n, r, a, o] = this.#p();
    return `M${(this.#a[2] - t) / s} ${(this.#a[3] - e) / i} L${(this.#a[4] - t) / s} ${(this.#a[5] - e) / i} L${n} ${r} L${a} ${o} L${(this.#a[16] - t) / s} ${(this.#a[17] - e) / i} L${(this.#a[14] - t) / s} ${(this.#a[15] - e) / i} Z`;
  }
  #y(t) {
    const e = this.#e;
    t.push(`L${e[4]} ${e[5]} Z`);
  }
  #A(t) {
    const [e, s, i, n] = this.#t,
      r = this.#a.subarray(4, 6),
      a = this.#a.subarray(16, 18),
      [o, l, h, d] = this.#p();
    t.push(`L${(r[0] - e) / i} ${(r[1] - s) / n} L${o} ${l} L${h} ${d} L${(a[0] - e) / i} ${(a[1] - s) / n}`);
  }
  newFreeDrawOutline(t, e, s, i, n, r) {
    return new mn(t, e, s, i, n, r);
  }
  getOutlines() {
    const t = this.#n,
      e = this.#e,
      s = this.#a,
      [i, n, r, a] = this.#t,
      o = new Float32Array((this.#f?.length ?? 0) + 2);
    for (let d = 0, u = o.length - 2; d < u; d += 2)
      ((o[d] = (this.#f[d] - i) / r), (o[d + 1] = (this.#f[d + 1] - n) / a));
    if (
      ((o[o.length - 2] = (this.#r - i) / r),
      (o[o.length - 1] = (this.#o - n) / a),
      isNaN(s[6]) && !this.isEmpty())
    )
      return this.#v(o);
    const l = new Float32Array(this.#n.length + 24 + this.#e.length);
    let h = t.length;
    for (let d = 0; d < h; d += 2) {
      if (isNaN(t[d])) {
        l[d] = l[d + 1] = NaN;
        continue;
      }
      ((l[d] = t[d]), (l[d + 1] = t[d + 1]));
    }
    h = this.#x(l, h);
    for (let d = e.length - 6; d >= 6; d -= 6)
      for (let u = 0; u < 6; u += 2) {
        if (isNaN(e[d + u])) {
          ((l[h] = l[h + 1] = NaN), (h += 2));
          continue;
        }
        ((l[h] = e[d + u]), (l[h + 1] = e[d + u + 1]), (h += 2));
      }
    return (this.#w(l, h), this.newFreeDrawOutline(l, o, this.#t, this.#u, this.#s, this.#i));
  }
  #v(t) {
    const e = this.#a,
      [s, i, n, r] = this.#t,
      [a, o, l, h] = this.#p(),
      d = new Float32Array(36);
    return (
      d.set(
        [
          NaN,
          NaN,
          NaN,
          NaN,
          (e[2] - s) / n,
          (e[3] - i) / r,
          NaN,
          NaN,
          NaN,
          NaN,
          (e[4] - s) / n,
          (e[5] - i) / r,
          NaN,
          NaN,
          NaN,
          NaN,
          a,
          o,
          NaN,
          NaN,
          NaN,
          NaN,
          l,
          h,
          NaN,
          NaN,
          NaN,
          NaN,
          (e[16] - s) / n,
          (e[17] - i) / r,
          NaN,
          NaN,
          NaN,
          NaN,
          (e[14] - s) / n,
          (e[15] - i) / r,
        ],
        0,
      ),
      this.newFreeDrawOutline(d, t, this.#t, this.#u, this.#s, this.#i)
    );
  }
  #w(t, e) {
    const s = this.#e;
    return (t.set([NaN, NaN, NaN, NaN, s[4], s[5]], e), (e += 6));
  }
  #x(t, e) {
    const s = this.#a.subarray(4, 6),
      i = this.#a.subarray(16, 18),
      [n, r, a, o] = this.#t,
      [l, h, d, u] = this.#p();
    return (
      t.set(
        [
          NaN,
          NaN,
          NaN,
          NaN,
          (s[0] - n) / a,
          (s[1] - r) / o,
          NaN,
          NaN,
          NaN,
          NaN,
          l,
          h,
          NaN,
          NaN,
          NaN,
          NaN,
          d,
          u,
          NaN,
          NaN,
          NaN,
          NaN,
          (i[0] - n) / a,
          (i[1] - r) / o,
        ],
        e,
      ),
      (e += 24)
    );
  }
}
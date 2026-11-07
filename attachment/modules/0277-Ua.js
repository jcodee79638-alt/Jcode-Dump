
class Ua {
  #t = new Float64Array(6);
  #e = new Float64Array(2);
  #s;
  #i;
  #n;
  #a;
  #r;
  #o = "";
  #l = 0;
  #h = new De();
  #u;
  #d;
  constructor(t, e, s, i, n, r) {
    ((this.#u = s), (this.#d = i), (this.#n = n), (this.#a = r), ([t, e] = this.#f(t, e)));
    const a = (this.#s = [NaN, NaN, NaN, NaN, t, e]);
    ((this.#r = [t, e]),
      (this.#i = [{ line: a, points: this.#r }]),
      this.#t.set(a, 0),
      this.#e.set([t, e], 0));
  }
  updateProperty(t, e) {
    t === "stroke-width" && (this.#a = e);
  }
  #f(t, e) {
    return M._normalizePoint(t, e, this.#u, this.#d, this.#n);
  }
  isEmpty() {
    return !this.#i?.length;
  }
  isCancellable() {
    return this.#r.length <= 10;
  }
  add(t, e) {
    return (this.#g(t, e) && this.toSVGPath(), { path: { d: this.#m() } });
  }
  addPoints(t) {
    let e = !1;
    for (let s = 0, i = t.length; s < i; s += 2)
      this.#g(t[s], t[s + 1]) && ((e = !0), this.#r.length <= 6 && (this.toSVGPath(), (e = !1)));
    return (e && this.toSVGPath(), { path: { d: this.#m() } });
  }
  #g(t, e) {
    (([t, e] = this.#f(t, e)), this.#e.set([t, e], 0));
    const [s, i, n, r] = this.#t.subarray(2, 6),
      a = t - n,
      o = e - r;
    return Math.hypot(this.#u * a, this.#d * o) <= 2
      ? !1
      : (this.#r.push(t, e),
        isNaN(s)
          ? (this.#t.set([n, r, t, e], 2), this.#s.push(NaN, NaN, NaN, NaN, t, e), !0)
          : (isNaN(this.#t[0]) && this.#s.splice(6, 6),
            this.#t.set([s, i, n, r, t, e], 0),
            this.#s.push(...M.createBezierPoints(s, i, n, r, t, e)),
            !0));
  }
  end(t, e) {
    return t !== void 0 && this.#g(t, e)
      ? { path: { d: this.toSVGPath() } }
      : this.#r.length === 2
        ? { path: { d: this.toSVGPath() } }
        : { path: { d: this.#o } };
  }
  startNew(t, e, s, i, n) {
    ((this.#u = s), (this.#d = i), (this.#n = n), ([t, e] = this.#f(t, e)));
    const r = (this.#s = [NaN, NaN, NaN, NaN, t, e]);
    ((this.#r = [t, e]), this.#e.set([t, e], 0));
    const a = this.#i.at(-1);
    return (
      a && ((a.line = new Float32Array(a.line)), (a.points = new Float32Array(a.points))),
      this.#i.push({ line: r, points: this.#r }),
      this.#t.set(r, 0),
      (this.#l = 0),
      this.toSVGPath(),
      null
    );
  }
  getLastElement() {
    return this.#i.at(-1);
  }
  setLastElement(t) {
    return this.#i
      ? (this.#i.push(t),
        (this.#s = t.line),
        (this.#r = t.points),
        (this.#l = 0),
        { path: { d: this.toSVGPath() } })
      : this.#h.setLastElement(t);
  }
  removeLastElement() {
    if (!this.#i) return this.#h.removeLastElement();
    (this.#i.pop(), (this.#o = ""));
    for (let t = 0, e = this.#i.length; t < e; t++) {
      const { line: s, points: i } = this.#i[t];
      ((this.#s = s), (this.#r = i), (this.#l = 0), this.toSVGPath());
    }
    return { path: { d: this.#o } };
  }
  #m() {
    const t = M.svgRound(this.#e[0]),
      e = M.svgRound(this.#e[1]);
    if (this.#r.length === 2) {
      const s = M.svgRound(this.#s[4]),
        i = M.svgRound(this.#s[5]);
      return `${this.#o} M ${s} ${i} L ${t} ${e}`;
    }
    return `${this.#o} L ${t} ${e}`;
  }
  toSVGPath() {
    const t = M.svgRound(this.#s[4]),
      e = M.svgRound(this.#s[5]);
    if (this.#r.length === 2) return ((this.#o = `${this.#o} M ${t} ${e} Z`), this.#o);
    if (this.#r.length <= 6) {
      const i = this.#o.lastIndexOf("M");
      ((this.#o = `${this.#o.slice(0, i)} M ${t} ${e}`), (this.#l = 6));
    }
    if (this.#r.length === 4) {
      const i = M.svgRound(this.#s[10]),
        n = M.svgRound(this.#s[11]);
      return ((this.#o = `${this.#o} L ${i} ${n}`), (this.#l = 12), this.#o);
    }
    const s = [];
    this.#l === 0 && (s.push(`M ${t} ${e}`), (this.#l = 6));
    for (let i = this.#l, n = this.#s.length; i < n; i += 6) {
      const [r, a, o, l, h, d] = this.#s.slice(i, i + 6).map(M.svgRound);
      s.push(`C${r} ${a} ${o} ${l} ${h} ${d}`);
    }
    return ((this.#o += s.join(" ")), (this.#l = this.#s.length), this.#o);
  }
  getOutlines(t, e, s, i) {
    const n = this.#i.at(-1);
    return (
      (n.line = new Float32Array(n.line)),
      (n.points = new Float32Array(n.points)),
      this.#h.build(this.#i, t, e, s, this.#n, this.#a, i),
      (this.#t = null),
      (this.#s = null),
      (this.#i = null),
      (this.#o = null),
      this.#h
    );
  }
  get defaultSVGProperties() {
    return { root: { viewBox: "0 0 10000 10000" }, rootClass: { draw: !0 }, bbox: [0, 0, 1, 1] };
  }
}
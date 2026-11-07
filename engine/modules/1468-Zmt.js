
class Zmt {
  pattern;
  options;
  #e;
  #r;
  #t;
  #n;
  #i;
  #s = !1;
  #a;
  #c;
  #H = !1;
  #f = 0;
  #l = 1 / 0;
  #A = [];
  #o = [];
  #m;
  #L;
  #$ = !1;
  #p;
  #h;
  constructor(e, t = {}) {
    if (e.includes("/")) throw Error("can only match a single path portion, got pattern: " + e);
    ((this.pattern = e), (this.options = t));
    let { nocase: r = !1, noext: s = !1, normalize: a } = t;
    this.#h = a === !0 ? "NFC" : a || void 0;
    let H = /^[?*+@]\(\)$/.test(e),
      u = wJs(e, r, s || H, this.#h),
      [f] = z0n(u, kJs(u), 0, u.length, !0);
    if (this.#h) f = Q0n(f, this.#h);
    let [d, _] = OJs(f, r);
    if (((this.#e = d), (this.#r = _), f.every((L) => L.t === "lit")))
      ((this.#i = f.map((L) => L.ch).join("")), (this.#s = r));
    else {
      let L = (S) => (S.t !== "lit" ? void 0 : r ? { ch: S.ch, re: K0n(S.ch) } : { ch: S.ch });
      for (let S of f) {
        let T = L(S);
        if (!T) break;
        this.#A.push(T);
      }
      for (let S = f.length - 1; S >= 0; S--) {
        let T = L(f[S]);
        if (!T) break;
        this.#o.unshift(T);
      }
      if (((this.#$ = !!(this.#A.length || this.#o.length)), !r))
        ((this.#m = this.#A.map((S) => S.ch).join("")), (this.#L = this.#o.map((S) => S.ch).join("")));
      ((this.#c = FJs(this.#e)?.slice(this.#A.length, -this.#o.length || void 0)),
        (this.#H = !!this.#c?.every((S) => S.t === "star" || S.t === "any")));
      let [I, D] = rEn(f);
      ((this.#f = I), (this.#l = D));
    }
  }
  test(e) {
    if (this.#h) return (X0n(e), this.#_(e.normalize(this.#h)));
    if (WJs.test(e)) return (X0n(e), this.#_(e, [...e]));
    return this.#_(e, e);
  }
  testUnchecked(e) {
    return this.#_(this.#h ? e.normalize(this.#h) : e);
  }
  #_(e, t) {
    if (this.#i !== void 0) return this.#s ? (this.#a ??= J0n(this.#i)).test(e) : e === this.#i;
    let r = this.#f,
      s = this.#l;
    if (t === void 0) {
      let _ = e.length,
        L = (_ + 1) >> 1;
      if (_ < r || L > s) return !1;
      if (L < r || _ > s) t = Qmt(e);
    }
    if (t !== void 0 && (t.length < r || t.length > s)) return !1;
    let a = this.#A.length;
    if (this.#$)
      if (this.#m !== void 0 && this.#L !== void 0) {
        if (!e.startsWith(this.#m) || !e.endsWith(this.#L)) return !1;
      } else {
        t ??= Qmt(e);
        let _ = t.length - this.#o.length;
        if (!G0n(this.#A, t, 0) || !G0n(this.#o, t, _)) return !1;
      }
    let H = !this.options.dot && e.startsWith(".");
    if (this.#c) {
      if (e === "." || e === "..") return !1;
      if (H && !a) return !1;
      if (this.#H) return !0;
      t ??= Qmt(e);
      let _ = t.length - this.#o.length;
      return BJs(this.#c, t, a, _);
    }
    if (((t ??= Qmt(e)), e === "." || e === "..")) {
      this.#t ??= q0n(this.#r);
      let _ = (this.#n ??= new Ymt(!0, !1, this.#t)),
        L = _.state();
      _.add(L, this.#e, 0, !0);
      let I = _.done(L);
      for (let D = 0; D < t.length; D++) I = _.step(I, t[D], D, !0);
      return I.match;
    }
    this.#t ??= q0n(this.#r);
    let u = (this.#p ??= new tEn(this.#e, this.#t)),
      f = u.start(H),
      d = t === e;
    for (let _ = 0; _ < t.length; _++) {
      if (f.dead) return !1;
      let L = d ? e.charCodeAt(_) : t[_].charCodeAt(0);
      f = f.ascii?.[L] ?? u.next(f, t[_]);
    }
    return f.match;
  }
  toString() {
    return UJs(this.#e);
  }
}
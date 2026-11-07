
var n0n = (e, t, r) => {
    let s = e instanceof RegExp ? bgn(e, r) : e,
      a = t instanceof RegExp ? bgn(t, r) : t,
      H = s !== null && a != null && f5s(s, a, r);
    return (
      H && {
        start: H[0],
        end: H[1],
        pre: r.slice(0, H[0]),
        body: r.slice(H[0] + s.length, H[1]),
        post: r.slice(H[1] + a.length),
      }
    );
  },
  bgn = (e, t) => {
    let r = t.match(e);
    return r ? r[0] : null;
  },
  f5s = (e, t, r) => {
    let s,
      a,
      H,
      u,
      f,
      d = r.indexOf(e),
      _ = r.indexOf(t, d + 1),
      L = d;
    if (d >= 0 && _ > 0) {
      if (e === t) return [d, _];
      for (s = [], H = r.length; L >= 0 && !f;) {
        if (L === d) (s.push(L), (d = r.indexOf(e, L + 1)));
        else if (s.length === 1) {
          let I = s.pop();
          I !== void 0 && (f = [I, _]);
        } else ((a = s.pop()), a !== void 0 && a < H && ((H = a), (u = _)), (_ = r.indexOf(t, L + 1)));
        L = d < _ && d >= 0 ? d : _;
      }
      s.length && u !== void 0 && (f = [H, u]);
    }
    return f;
  },
  i0n,
  s0n,
  rnr,
  o0n,
  a0n,
  p5s,
  d5s,
  m5s,
  _5s,
  h5s,
  L5s,
  $5s,
  g5s,
  E5s,
  I5s,
  D5s = 1e5,
  y5s = 4000000,
  M5s = 1000,
  x5s = 1000,
  O5s,
  U3e = (e) => e.replace(/[[\]\\-]/g, "\\$&"),
  Orr,
  U5s = (e, t, r = !1, s) => {
    let a = (B) => {
        let V = s ? B.normalize(s) : B;
        return [...V].length === 1 ? V : B;
      },
      H = t;
    if (e.charAt(H) !== "[") throw Error("not in a brace expression");
    let u = [],
      f = [],
      d = H + 1,
      _ = !1,
      L = !1,
      I = !1,
      D = H,
      S = "";
    e: for (; d < e.length;) {
      let B = String.fromCodePoint(e.codePointAt(d));
      if ((B === "!" || B === "^") && d === H + 1) {
        ((I = !0), d++);
        continue;
      }
      if (B === "]" && _ && !L) {
        D = d + 1;
        break;
      }
      if (((_ = !0), B === "\\" && !L)) {
        ((L = !0), d++);
        continue;
      }
      if (B === "[" && !L) {
        for (let [q, [Z, se]] of Object.entries(O5s))
          if (e.startsWith(q, d)) {
            if (S) return [Orr, e.length - H];
            ((d += q.length), se ? f.push(Z) : u.push(Z));
            continue e;
          }
      }
      L = !1;
      let V = a(B);
      if (S) {
        (V.codePointAt(0) > S.codePointAt(0) ? u.push(U3e(S) + "-" + U3e(V)) : V === S && u.push(U3e(V)),
          (S = ""),
          (d += B.length));
        continue;
      }
      if (e.startsWith("-]", d + B.length)) {
        (u.push(U3e(V + "-")), (d += B.length + 1));
        continue;
      }
      if (e.startsWith("-", d + B.length)) {
        ((S = V), (d += B.length + 1));
        continue;
      }
      (u.push(U3e(V)), (d += B.length));
    }
    if (D < d) return [Orr, 0];
    if (!u.length && !f.length) return [Orr, e.length - H];
    let T = "[" + (I ? "^" : "") + u.join("") + "]",
      C = "[" + (I ? "" : "^") + f.join("") + "]",
      O = "^" + (u.length && f.length ? "(" + T + "|" + C + ")" : u.length ? T : C);
    return [new RegExp(O, r ? "iu" : "u"), D - H];
  },
  zrr,
  N5s = "!?+*@",
  Tde = (e) => ({ t: "lit", ch: e }),
  F5s = (e) => e.replace(/[\\^$.*+?()[\]{}|/]/g, "\\$&"),
  Qrr = (e) => new RegExp(`^${F5s(e)}$`, "iu"),
  nnr = (e, t) => {
    if (t === e.ch) return !0;
    if (!e.re) return !1;
    let r = t.charCodeAt(0);
    if (r >= 128) return e.re.test(t);
    let s = (e.ascii ??= new Uint8Array(128));
    return ((s[r] ||= e.re.test(t) ? 1 : 2), s[r] === 1);
  },
  B5s = (e, t, r, s) => {
    let a = [];
    for (let H = 0; H < e.length;) {
      let u = String.fromCodePoint(e.codePointAt(H));
      if (u === "\\") {
        let f = e.codePointAt(H + 1),
          d = f === void 0 ? u : String.fromCodePoint(f);
        (a.push(Tde(d)), (H += 1 + d.length));
        continue;
      }
      if (u === "[") {
        let [f, d] = U5s(e, H, t, s);
        if (d) {
          (a.push({ t: "class", re: f }), (H += d));
          continue;
        }
      }
      if (!r && N5s.includes(u) && e[H + 1] === "(") {
        (a.push({ t: "open", type: u }), (H += 2));
        continue;
      }
      (a.push(
        !r && u === "|"
          ? { t: "bar" }
          : !r && u === ")"
            ? { t: "close" }
            : u === "*"
              ? { t: "star" }
              : u === "?"
                ? { t: "any" }
                : Tde(u),
      ),
        (H += u.length));
    }
    return a;
  },
  R5s = (e) => {
    let t = new Map(),
      r = [];
    return (
      e.forEach((s, a) => {
        s.t === "open" ? r.push(a) : s.t === "close" && r.length && t.set(r.pop(), a);
      }),
      t
    );
  },
  H0n = (e, t, r, s, a) => {
    let H = [],
      u = [H];
    for (let f = r; f < s; f++) {
      let d = e[f],
        _ = t.get(f);
      if (d.t === "open" && _ !== void 0) {
        let L = H0n(e, t, f + 1, _, !1);
        (H.push({ t: "ext", type: d.type, alts: L }), (f = _));
      } else
        d.t === "bar" && !a
          ? u.push((H = []))
          : d.t === "open"
            ? H.push(Tde(d.type), Tde("("))
            : d.t === "bar"
              ? H.push(Tde("|"))
              : d.t === "close"
                ? H.push(Tde(")"))
                : H.push(d);
    }
    return u;
  },
  c0n = (e, t) => {
    let r = [],
      s = "",
      a = () => {
        for (let H of s.normalize(t)) r.push(Tde(H));
        s = "";
      };
    for (let H of e) {
      if (H.t === "lit") {
        s += H.ch;
        continue;
      }
      (a(), r.push(H.t === "ext" ? { ...H, alts: H.alts.map((u) => c0n(u, t)) } : H));
    }
    return (a(), r);
  },
  W5s = (e, t) => {
    let r = 1,
      s = (u) => ({ t: "split", id: r++, out: u }),
      a = (u, f) => u.reduceRight((d, _) => H(_, d), f),
      H = (u, f) => {
        switch (u.t) {
          case "lit":
            let I = t ? Qrr(u.ch) : void 0;
            return { t: "lit", id: r++, ch: u.ch, re: I, next: f };
          case "any":
          case "star":
            return { t: u.t, id: r++, next: f };
          case "class":
            return { t: "class", id: r++, re: u.re, next: f };
        }
        let d = (I) => u.alts.map((D) => a(D, I));
        switch (u.type) {
          case "@":
            return s(d(f));
          case "?":
            return s([f, ...d(f)]);
          case "!":
            return { t: "neg", id: r++, sub: s(d(zrr)), next: f };
        }
        let _ = s([]),
          L = s(d(_));
        return (_.out.push(f, L), u.type === "*" ? _ : L);
      };
    return [a(e, zrr), r];
  },
  V5s = (e) => {
    let t = [],
      r = new Set(),
      s = (H) => (H.t === "match" ? "match" : String(H.id)),
      a = (H, u) => {
        if (H.t === "match" || r.has(H)) return;
        r.add(H);
        let f = (d) => t.push(`${u}${H.id}: ${d}`);
        switch (H.t) {
          case "split":
            f(`split -> ${H.out.map(s).join(", ")}`);
            for (let d of H.out) a(d, u);
            return;
          case "neg":
            return (f(`!(${s(H.sub)}) -> ${s(H.next)}`), a(H.sub, u + "  "), a(H.next, u));
          case "lit":
            f(`${JSON.stringify(H.ch)} -> ${s(H.next)}`);
            break;
          case "class":
            f(`${H.re} -> ${s(H.next)}`);
            break;
          default:
            f(`${H.t === "any" ? "?" : "*"} -> ${s(H.next)}`);
        }
        a(H.next, u);
      };
    return (
      a(e, ""),
      [`start -> ${s(e)}`, ...t].join(`
`)
    );
  },
  q5s = class {
    gen;
    threads = [];
    match = !1;
    runs = [];
    ids = [];
    constructor(e) {
      this.gen = e;
    }
    get dead() {
      return !this.threads.length && !this.match && !this.runs.length;
    }
  },
  A0n = (e, t) =>
    e.ids.length !== t.ids.length || e.runs.length !== t.runs.length || e.ids.some((r, s) => r !== t.ids[s])
      ? !1
      : e.runs.every((r) => t.runs.some((s) => s.neg === r.neg && A0n(s.state, r.state))),
  jgn = (e) => ({ has: new Float64Array(e), seen: new Float64Array(e), gen: 0 }),
  Yrr = class {
    dots;
    dotStart;
    #e;
    constructor(e, t, r) {
      ((this.dots = e), (this.dotStart = t), (this.#e = r));
    }
    state() {
      return new q5s(++this.#e.gen);
    }
    done(e) {
      return (
        (e.ids = e.threads.map((t) => t.id).sort((t, r) => t - r)),
        e.match && e.ids.unshift(zrr.id),
        e
      );
    }
    #r(e, t) {
      let { seen: r } = this.#e;
      return r[t.id] === e.gen ? !1 : ((r[t.id] = e.gen), !0);
    }
    #t(e, t) {
      let { has: r } = this.#e;
      return r[t.id] === e.gen ? !1 : ((r[t.id] = e.gen), e.threads.push(t), !0);
    }
    restricted(e, t) {
      return t && (this.dots || (this.dotStart && e === 0));
    }
    add(e, t, r, s) {
      switch (t.t) {
        case "split":
          if (!this.#r(e, t)) return;
          for (let H of t.out) this.add(e, H, r, s);
          return;
        case "neg":
          if (!this.#r(e, t)) return;
          let a = this.state();
          return (
            this.add(a, t.sub, r, !1),
            this.done(a),
            this.addRun(e, { t: "run", neg: t, state: a }, r, s)
          );
        case "star":
          if (this.restricted(r, s)) return;
          this.#t(e, t) && this.add(e, t.next, r, s);
          return;
        case "match":
          e.match = !0;
          return;
        default:
          this.#t(e, t);
      }
    }
    addRun(e, t, r, s) {
      for (let a of e.runs) if (a.neg === t.neg && A0n(a.state, t.state)) return;
      (e.runs.push(t), t.state.match || this.add(e, t.neg.next, r, s));
    }
    step(e, t, r, s) {
      let a = this.state();
      for (let H of e.threads)
        switch (H.t) {
          case "lit":
            nnr(H, t) && this.add(a, H.next, r + 1, s);
            break;
          case "any":
            this.restricted(r, s) || this.add(a, H.next, r + 1, s);
            break;
          case "class":
            !this.restricted(r, s) && H.re.test(t) && this.add(a, H.next, r + 1, s);
            break;
          case "star":
            this.restricted(r, s) || this.add(a, H, r + 1, s);
        }
      if (!this.restricted(r, s))
        for (let H of e.runs) {
          if (H.state.dead) {
            this.addRun(a, H, r + 1, s);
            continue;
          }
          let u = this.step(H.state, t, r, !1);
          this.addRun(a, { t: "run", neg: H.neg, state: u }, r + 1, s);
        }
      return this.done(a);
    }
  },
  u0n = (e) => {
    let t = e.ids.join();
    if (!e.runs.length) return t;
    let r = e.runs.map((s) => `${s.neg.id}(${u0n(s.state)})`);
    return `${t}|${r.sort().join("|")}`;
  },
  G5s = 262144,
  X5s = class {
    #e;
    #r = new Map();
    #t = 0;
    #n;
    #i;
    #s;
    #a;
    constructor(e, t) {
      ((this.#e = e), (this.#s = new Yrr(!1, !1, t)), (this.#a = new Yrr(!1, !0, t)));
    }
    #c(e) {
      return { state: e, match: e.match, dead: e.dead, next: new Map() };
    }
    #H(e) {
      let t = u0n(e),
        r = this.#r.get(t);
      if (r) return r;
      this.#t > G5s && this.#f();
      let s = this.#c(e);
      return (this.#r.set(t, s), (this.#t += t.length + 1), s);
    }
    #f() {
      (this.#r.clear(), (this.#t = 0), (this.#n = void 0), (this.#i = void 0));
    }
    start(e) {
      if (e) {
        if (this.#i) return this.#i;
        let r = this.#a.state();
        return (this.#a.add(r, this.#e, 0, !0), (this.#i = this.#c(this.#a.done(r))));
      }
      if (this.#n) return this.#n;
      let t = this.#s.state();
      return (this.#s.add(t, this.#e, 0, !0), (this.#n = this.#H(this.#s.done(t))));
    }
    next(e, t) {
      let r = t.charCodeAt(0),
        s = r < 128 ? void 0 : e.next.get(t);
      if (s) return s;
      let a =
        e === this.#i ? this.#H(this.#a.step(e.state, t, 0, !0)) : this.#H(this.#s.step(e.state, t, 1, !0));
      return (
        r < 128
          ? (e.ascii || ((e.ascii = Array(128)), (this.#t += 128)), (e.ascii[r] = a))
          : e.next.set(t, a),
        this.#t++,
        a
      );
    }
  },
  J5s = (e) => {
    let t = [];
    for (let r = e; r.t !== "match"; r = r.next) {
      if (r.t === "split" || r.t === "neg") return;
      t.push(r);
    }
    return t;
  },
  K5s = (e, t, r, s) => {
    let a = 0,
      H = r,
      u = -1,
      f = 0;
    for (; H < s;) {
      let d = e[a];
      if (d?.t === "star") {
        ((u = a++), (f = H));
        continue;
      }
      let _ = t[H];
      if (d && (d.t === "any" || (d.t === "lit" && nnr(d, _)) || (d.t === "class" && d.re.test(_)))) {
        (a++, H++);
        continue;
      }
      if (u === -1) return !1;
      ((a = u + 1), (H = ++f));
    }
    for (; e[a]?.t === "star";) a++;
    return a === e.length;
  },
  l0n = (e) => {
    let t = 0,
      r = 0;
    for (let s of e) {
      let [a, H] = z5s(s);
      ((t += a), (r += H));
    }
    return [t, r];
  },
  z5s = (e) => {
    if (e.t === "star") return [0, 1 / 0];
    if (e.t !== "ext") return [1, 1];
    if (e.type === "!") return [0, 1 / 0];
    let t = e.alts.map(l0n),
      r = Math.min(...t.map((H) => H[0])),
      s = Math.max(...t.map((H) => H[1])),
      a = s === 0 ? 0 : 1 / 0;
    return e.type === "@" ? [r, s] : e.type === "?" ? [0, s] : e.type === "*" ? [0, a] : [r, a];
  },
  Pgn = (e, t, r) => {
    for (let s = 0; s < e.length; s++) if (!nnr(e[s], t[r + s])) return !1;
    return !0;
  },
  Q5s,
  Y5s,
  Smt = (e) => (Y5s.test(e) ? [...e] : e),
  Cgn = (e) => {
    if (e.includes("/")) throw Error("can only match a single path portion, got: " + e);
  },
  wgn = class {
    pattern;
    options;
    #e;
    #r;
    #t;
    #n;
    #i;
    #s;
    #a;
    #c = !1;
    #H = 0;
    #f = 1 / 0;
    #l = [];
    #A = [];
    #o;
    #m;
    #L = !1;
    #$;
    #p;
    constructor(e, t = {}) {
      if (e.includes("/")) throw Error("can only match a single path portion, got pattern: " + e);
      ((this.pattern = e), (this.options = t));
      let { nocase: r = !1, noext: s = !1, normalize: a } = t;
      this.#p = a === !0 ? "NFC" : a || void 0;
      let H = /^[?*+@]\(\)$/.test(e),
        u = B5s(e, r, s || H, this.#p),
        [f] = H0n(u, R5s(u), 0, u.length, !0);
      this.#p && (f = c0n(f, this.#p));
      let [d, _] = W5s(f, r);
      if (((this.#e = d), (this.#r = _), f.every((L) => L.t === "lit")))
        ((this.#i = f.map((L) => L.ch).join("")), r && (this.#s = Qrr(this.#i)));
      else {
        let L = (S) => (S.t !== "lit" ? void 0 : r ? { ch: S.ch, re: Qrr(S.ch) } : { ch: S.ch });
        for (let S of f) {
          let T = L(S);
          if (!T) break;
          this.#l.push(T);
        }
        for (let S = f.length - 1; S >= 0; S--) {
          let T = L(f[S]);
          if (!T) break;
          this.#A.unshift(T);
        }
        ((this.#L = !!(this.#l.length || this.#A.length)),
          r || ((this.#o = this.#l.map((S) => S.ch).join("")), (this.#m = this.#A.map((S) => S.ch).join(""))),
          (this.#a = J5s(this.#e)?.slice(this.#l.length, -this.#A.length || void 0)),
          (this.#c = !!this.#a?.every((S) => S.t === "star" || S.t === "any")));
        let [I, D] = l0n(f);
        ((this.#H = I), (this.#f = D));
      }
    }
    test(e) {
      return this.#p
        ? (Cgn(e), this.#h(e.normalize(this.#p)))
        : Q5s.test(e)
          ? (Cgn(e), this.#h(e, [...e]))
          : this.#h(e, e);
    }
    testUnchecked(e) {
      return this.#h(this.#p ? e.normalize(this.#p) : e);
    }
    #h(e, t) {
      if (this.#i !== void 0) return this.#s ? this.#s.test(e) : e === this.#i;
      let r = this.#H,
        s = this.#f;
      if (t === void 0) {
        let _ = e.length,
          L = (_ + 1) >> 1;
        if (_ < r || L > s) return !1;
        (L < r || _ > s) && (t = Smt(e));
      }
      if (t !== void 0 && (t.length < r || t.length > s)) return !1;
      let a = this.#l.length;
      if (this.#L)
        if (this.#o !== void 0 && this.#m !== void 0) {
          if (!e.startsWith(this.#o) || !e.endsWith(this.#m)) return !1;
        } else {
          t ??= Smt(e);
          let _ = t.length - this.#A.length;
          if (!Pgn(this.#l, t, 0) || !Pgn(this.#A, t, _)) return !1;
        }
      let H = !this.options.dot && e.startsWith(".");
      if (this.#a) {
        if (e === "." || e === ".." || (H && !a)) return !1;
        if (this.#c) return !0;
        t ??= Smt(e);
        let _ = t.length - this.#A.length;
        return K5s(this.#a, t, a, _);
      }
      if (((t ??= Smt(e)), e === "." || e === "..")) {
        this.#t ??= jgn(this.#r);
        let _ = (this.#n ??= new Yrr(!0, !1, this.#t)),
          L = _.state();
        _.add(L, this.#e, 0, !0);
        let I = _.done(L);
        for (let D = 0; D < t.length; D++) I = _.step(I, t[D], D, !0);
        return I.match;
      }
      this.#t ??= jgn(this.#r);
      let u = (this.#$ ??= new X5s(this.#e, this.#t)),
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
      return V5s(this.#e);
    }
  },
  Rmt = (e) => {
    if (typeof e != "string") throw TypeError("invalid pattern");
    if (e.length > 65536) throw TypeError("pattern is too long");
  },
  inr = (e, { windowsPathsNoEscape: t = !1, magicalBraces: r = !1 } = {}) =>
    r
      ? t
        ? e.replace(/[?*()[\]{}]/g, "[$&]")
        : e.replace(/[?*()[\]\\{}]/g, "\\$&")
      : t
        ? e.replace(/[?*()[\]]/g, "[$&]")
        : e.replace(/[?*()[\]\\]/g, "\\$&"),
  f0n = (e, { windowsPathsNoEscape: t = !1, magicalBraces: r = !0 } = {}) =>
    r
      ? t
        ? e.replace(/\[([^/\\])\]/g, "$1")
        : e.replace(/((?!\\).|^)\[([^/\\])\]/g, "$1$2").replace(/\\([^/])/g, "$1")
      : t
        ? e.replace(/\[([^/\\{}])\]/g, "$1")
        : e.replace(/((?!\\).|^)\[([^/\\{}])\]/g, "$1$2").replace(/\\([^/{}])/g, "$1"),
  XU = (e, t, r = {}) => (Rmt(t), !r.nocomment && t.charAt(0) === "#" ? !1 : new vde(t, r).match(e)),
  p0n,
  kgn,
  Z5s,
  yD,
  eXs =
    (e, t = {}) =>
    (r) =>
      XU(r, e, t),
  pY = (e, t = {}) => Object.assign({}, e, t),
  tXs = (e) => {
    if (!e || typeof e != "object" || !Object.keys(e).length) return XU;
    let t = XU;
    return Object.assign((r, s, a = {}) => t(r, s, pY(e, a)), {
      Minimatch: class extends t.Minimatch {
        constructor(r, s = {}) {
          super(r, pY(e, s));
        }
        static defaults(r) {
          return t.defaults(pY(e, r)).Minimatch;
        }
      },
      unescape: (r, s = {}) => t.unescape(r, pY(e, s)),
      escape: (r, s = {}) => t.escape(r, pY(e, s)),
      filter: (r, s = {}) => t.filter(r, pY(e, s)),
      defaults: (r) => t.defaults(pY(e, r)),
      braceExpand: (r, s = {}) => t.braceExpand(r, pY(e, s)),
      match: (r, s, a = {}) => t.match(r, s, pY(e, a)),
      sep: t.sep,
      GLOBSTAR: yD,
    });
  },
  d0n = (e, t = {}) => (
    Rmt(e),
    t.nobrace || !/\{(?:(?!\{).)*\}/.test(e) ? [e] : b5s(e, { max: t.braceExpandMax })
  ),
  rXs = (e, t, r = {}) => {
    let s = new vde(t, r);
    return ((e = e.filter((a) => s.match(a))), s.options.nonull && !e.length && e.push(t), e);
  },
  Ogn,
  m0n = (e, t) => {
    let r = t + 1;
    (e.charAt(r) === "!" || e.charAt(r) === "^") && r++;
    let s = !1;
    for (; r < e.length; r++) {
      let a = e.charAt(r);
      if (a === "]" && s) return r;
      ((s = !0), a === "\\" && r++);
    }
    return -1;
  },
  nXs = (e, t) => {
    if (!t && (e === "+()" || e === "@()")) return e;
    let r = "";
    for (let s = 0; s < e.length; s++) {
      let a = e.charAt(s);
      if (a === "\\") r += e.charAt(++s) || a;
      else {
        if (a === "*" || a === "?") return;
        if (a === "[") {
          let H = m0n(e, s);
          if (H === -1) {
            r += a;
            continue;
          }
          let u = e.slice(s + 1, H);
          if ((u.startsWith("\\") && (u = u.slice(1)), [...u].length !== 1 || "!^".includes(e.charAt(s + 1))))
            return;
          ((r += u), (s = H));
        } else {
          if (!t && "+@!".includes(a) && e.charAt(s + 1) === "(" && e.includes(")", s + 2)) return;
          r += a;
        }
      }
    }
    return r;
  },
  iXs = (e) => {
    if (/^[?*+@]\(\)$/.test(e) || e.includes("[:")) return !1;
    let t = 0;
    for (let r = 0; r < e.length; r++) {
      let s = e.charAt(r);
      if (s === "\\") {
        if (++r === e.length) return !1;
      } else if (s === "[") {
        let a = m0n(e, r);
        a !== -1 && (r = a);
      } else if ("+@!?*".includes(s) && e.charAt(r + 1) === "(") (t++, r++);
      else if (s === ")") {
        if (!t--) return !1;
      } else if (s === "|" && !t) return !1;
    }
    return !t;
  },
  Urr,
  Ugn,
  Mse = (e, t) => (typeof e == "string" ? t === e : t !== "" && e.testUnchecked(t)),
  Ngn = (e, t, r, s, a) => (Mse(e, t) ? r : s !== void 0 && Mse(e, s) ? a : -1),
  Zrr = (e) => e === "." || e === "..",
  Nrr = (e) => typeof e == "string" && /^[a-z]:$/i.test(e),
  Nmt = (e) => typeof e == "string" && /^unc$/i.test(e),
  Frr = (e) => {
    if (e[0] !== "" || e[1] !== "") return -1;
    let t = e[2] !== "?" ? 2 : Nmt(e[3]) ? 4 : -1,
      r = e[t],
      s = e[t + 1];
    return t !== -1 && r !== void 0 && r !== "" && r !== yD && s !== void 0 && s !== "" && s !== yD ? t : -1;
  },
  Tmt = (e, t) => !Zrr(e) && (t || !e.startsWith(".")),
  N3e = (e, t, r, s, a) => {
    for (let H = t; H < r;) {
      if (e.charCodeAt(H) === 46) {
        if (!s) return !0;
        let f = e.charCodeAt(H + 1) === 46 ? H + 2 : H + 1;
        if (f >= r || Wmt(e.charCodeAt(f), a)) return !0;
      }
      let u = enr(e, H, a);
      if (u === -1) return !1;
      for (H = u + 1; H < r && Wmt(e.charCodeAt(H), a);) H++;
    }
    return !1;
  },
  Wmt = (e, t) => (t === "/" ? e === 47 : t === "\\" ? e === 92 : e === 47 || e === 92),
  enr = (e, t, r) => {
    if (r !== "both") return e.indexOf(r, t);
    let s = e.indexOf("/", t),
      a = e.indexOf("\\", t);
    return s === -1 ? a : a === -1 ? s : Math.min(s, a);
  },
  Fgn = (e, t, r) =>
    r !== "both" ? e.lastIndexOf(r, t) : Math.max(e.lastIndexOf("/", t), e.lastIndexOf("\\", t)),
  vde = class {
    options;
    set;
    pattern;
    windowsPathsNoEscape;
    nonegate;
    negate;
    comment;
    empty;
    preserveMultipleSlashes;
    partial;
    globSet;
    globParts;
    nocase;
    isWindows;
    platform;
    windowsNoMagicRoot;
    maxGlobstarRecursion;
    #e;
    #r;
    #t;
    #n;
    #i = [];
    #s = [];
    #a = [];
    #c = new Map();
    #H = new WeakMap();
    constructor(e, t = {}) {
      (Rmt(e),
        (t = t || {}),
        (this.options = t),
        (this.maxGlobstarRecursion = t.maxGlobstarRecursion ?? 200),
        (this.pattern = e),
        (this.platform = t.platform || p0n),
        (this.isWindows = this.platform === "win32"));
      let r = "allowWindowsEscape";
      ((this.windowsPathsNoEscape = !!t.windowsPathsNoEscape || t[r] === !1),
        this.windowsPathsNoEscape && (this.pattern = this.pattern.replace(/\\/g, "/")),
        (this.preserveMultipleSlashes = !!t.preserveMultipleSlashes),
        (this.negate = !1),
        (this.nonegate = !!t.nonegate),
        (this.comment = !1),
        (this.empty = !1),
        (this.partial = !!t.partial),
        (this.nocase = !!this.options.nocase),
        (this.windowsNoMagicRoot =
          t.windowsNoMagicRoot !== void 0 ? t.windowsNoMagicRoot : !!(this.isWindows && this.nocase)),
        (this.globSet = []),
        (this.globParts = []),
        (this.set = []),
        (this.#e = !this.preserveMultipleSlashes),
        (this.#t = (t.optimizationLevel ?? 1) >= 2));
      let s = t.normalize;
      ((this.#n = s === !0 ? "NFC" : s || void 0), this.make());
      let a = this.set.map((H) => this.#l(H));
      ((this.#a = this.set.map((H, u) => this.#e && H.length - 1 > a[u])),
        (this.#i = this.set.map((H, u) => {
          let f = this.#a[u] ? H.length - 1 : H.length,
            d = H.slice(a[u] + 1, f).filter((_) => typeof _ == "string" && !!_);
          return [...new Set(d)];
        })),
        (this.#r = this.#i.some((H) => H.length)),
        (this.#s = this.set.map((H, u) => {
          let [f, d, _] = H;
          if (this.#a[u] && H.length === 2 && f === yD && d !== yD) return "tail";
          if (this.#a[u] && t.matchBase && H.length === 1 && f !== yD && f !== "") return "base";
          if (!(!this.#e || a[u] !== -1)) {
            if (
              H.length === 3 &&
              f === yD &&
              _ === yD &&
              d !== yD &&
              d !== "" &&
              this.maxGlobstarRecursion > 0
            )
              return "mid";
            if (H.length === 2 && d === yD && f !== yD && f !== "") return "head";
          }
        })));
    }
    #f(e) {
      return this.#n ? e.normalize(this.#n) : e;
    }
    #l(e) {
      if (!this.isWindows) return -1;
      if (Nrr(e[0])) return 0;
      if (e[0] === "" && e[1] === "" && e[2] === "?" && Nrr(e[3])) return 3;
      let t = Frr(e);
      return t === -1 ? -1 : t + 1;
    }
    hasMagic() {
      if (this.options.magicalBraces && this.set.length > 1) return !0;
      for (let e of this.set) for (let t of e) if (typeof t != "string") return !0;
      return !1;
    }
    make() {
      let e = this.pattern,
        t = this.options;
      if (!t.nocomment && e.charAt(0) === "#") {
        this.comment = !0;
        return;
      }
      if (!e) {
        this.empty = !0;
        return;
      }
      (this.parseNegate(), (this.globSet = [...new Set(this.braceExpand())]));
      let r = this.globSet.map((a) => this.#E(a));
      this.globParts = this.preprocess(r);
      let s = this.globParts.map((a, H, u) => {
        if (this.isWindows && this.windowsNoMagicRoot) {
          let f = a[2] === "?" && Nmt(a[3]) ? 6 : 4,
            d =
              a[0] === "" &&
              a[1] === "" &&
              (a[2] === "?" || !Ogn.test(a[2])) &&
              a.slice(3, f).every((L) => !Ogn.test(L)),
            _ = /^[a-z]:/i.test(a[0]);
          if (d) return [...a.slice(0, f).map((L) => this.#f(L)), ...a.slice(f).map((L) => this.parse(L))];
          if (_) return [this.#f(a[0]), ...a.slice(1).map((L) => this.parse(L))];
        }
        return a.map((f) => this.parse(f));
      });
      if (((this.set = s.filter((a) => a.indexOf(!1) === -1)), this.isWindows))
        for (let a = 0; a < this.set.length; a++) {
          let H = this.set[a];
          H[0] === "" &&
            H[1] === "" &&
            this.globParts[a][2] === "?" &&
            (Nrr(H[3]) || Nmt(this.globParts[a][3])) &&
            (Nmt(this.globParts[a][3]) && (H[3] = "UNC"), (H[2] = "?"));
        }
      t.noext || this.mergeRows();
    }
    mergeRows() {
      let e = !0;
      for (; e;) {
        e = !1;
        let t = Math.max(0, ...this.set.map((r) => r.length));
        for (let r = 0; r < t; r++) {
          let s = new Map();
          this.set.forEach((H, u) => {
            if (!(H[r] instanceof wgn) || !iXs(this.globParts[u][r])) return;
            let f = [...this.globParts[u]];
            f[r] = "";
            let d = `${H.length}/${f.join("/")}`,
              _ = s.get(d);
            _ ? _.push(u) : s.set(d, [u]);
          });
          let a = new Set();
          for (let H of s.values()) {
            if (H.length < 2) continue;
            let [u, ...f] = H,
              d = `@(${H.map((_) => this.globParts[_][r]).join("|")})`;
            ((this.globParts[u][r] = d), (this.set[u][r] = this.parse(d)));
            for (let _ of f) a.add(_);
          }
          a.size &&
            ((e = !0),
            (this.set = this.set.filter((H, u) => !a.has(u))),
            (this.globParts = this.globParts.filter((H, u) => !a.has(u))));
        }
      }
    }
    preprocess(e) {
      if (this.options.noglobstar)
        for (let r of e) for (let s = 0; s < r.length; s++) r[s] === "**" && (r[s] = "*");
      let { optimizationLevel: t = 1 } = this.options;
      return (
        t >= 2
          ? ((e = this.firstPhasePreProcess(e)), (e = this.secondPhasePreProcess(e)))
          : t >= 1
            ? (e = this.levelOneOptimize(e))
            : (e = this.adjascentGlobstarOptimize(e)),
        e
      );
    }
    adjascentGlobstarOptimize(e) {
      return e.map((t) => {
        let r = -1;
        for (; (r = t.indexOf("**", r + 1)) !== -1;) {
          let s = r;
          for (; t[s + 1] === "**";) s++;
          s !== r && t.splice(r, s - r);
        }
        return t;
      });
    }
    levelOneOptimize(e) {
      return e.map((t) => {
        let r = this.#l(t) + 1;
        return (
          (t = t.reduce((s, a) => {
            let H = s[s.length - 1];
            return a === "**" && H === "**"
              ? s
              : a === ".." && s.length > r && H && H !== ".." && H !== "." && H !== "**"
                ? (s.pop(), s)
                : (s.push(a), s);
          }, [])),
          t.length === 0 ? [""] : t
        );
      });
    }
    #A(e) {
      let t = !this.isWindows || !e.includes("\\") ? "/" : e.includes("/") ? "both" : "\\",
        r = this.#e ? 0 : -1,
        s = "",
        a = 0,
        H,
        u = 0,
        f = !!this.options.dot;
      e: for (let d = 0; d < this.set.length; d++) {
        let _ = this.set[d],
          L = _[_.length - 1],
          I = r !== -1 && this.#a[d] && L !== yD;
        if (I && r === 0) {
          let T = Fgn(e, e.length, t);
          if (((a = T + 1), (s = e.slice(a)), s === "" && T >= 0)) {
            let O = T;
            for (; O > 0 && Wmt(e.charCodeAt(O - 1), t);) O--;
            ((u = O === 0 ? 0 : Fgn(e, O - 1, t) + 1), (H = e.slice(u, O)));
          }
          let C = this.#t && (Zrr(s) || (s === "" && H !== void 0 && Zrr(H)));
          ((r = C ? -1 : 1), (I = !C));
        }
        let D = -1;
        if (I && typeof L == "string" && ((D = Ngn(L, s, a, H, u)), D === -1)) continue;
        if (this.#r) {
          for (let T of this.#i[d]) if (!e.includes(T)) continue e;
        }
        if (I && typeof L == "object" && ((D = Ngn(L, s, a, H, u)), D === -1)) continue;
        let S = this.#s[d];
        if (S === "base" && I) return "yes";
        if (S === "tail" && I) {
          if (this.#t && N3e(e, 0, D, !0, t)) return "maybe";
          if (!N3e(e, 0, D, f, t)) return "yes";
          continue;
        }
        if (S === "mid" || S === "head") {
          let T = this.#m(e, _, S === "head", f, t);
          if (T !== "no") return T;
          continue;
        }
        return "maybe";
      }
      return "no";
    }
    #o(e, t, r) {
      let s = !!this.options.dot,
        a = e.length;
      if (r === "head") {
        if (a < 2 || !Mse(t[0], e[0])) return !1;
        for (let u = 1; u < a; u++) if (!Tmt(e[u], s)) return !1;
        return !0;
      }
      let H = t[1];
      if (r === "tail") {
        let u = a - 1;
        if (!Mse(H, e[u]) && (e[u] !== "" || a === 1 || !Mse(H, e[--u]))) return !1;
        for (let f = 0; f < u; f++) if (!Tmt(e[f], s)) return !1;
        return !0;
      }
      for (let u = 0; u < a; u++) {
        if (Mse(H, e[u]) && u + 1 < a) {
          let f = u + 1;
          for (; f < a && Tmt(e[f], s);) f++;
          if (f === a) return !0;
        }
        if (!Tmt(e[u], s)) return !1;
      }
      return !1;
    }
    #m(e, t, r, s, a) {
      if (this.#t && N3e(e, 0, e.length, !0, a)) return "maybe";
      let H = t[r ? 0 : 1],
        u = 0;
      for (let f = enr(e, u, a); f !== -1; f = enr(e, u, a)) {
        let d = f + 1;
        for (; d < e.length && Wmt(e.charCodeAt(d), a);) d++;
        if (
          (typeof H == "string"
            ? f - u === H.length && e.startsWith(H, u)
            : f > u && H.testUnchecked(e.slice(u, f))) &&
          !N3e(e, d, e.length, s, a)
        )
          return "yes";
        if (r || N3e(e, u, d, s, a)) return "no";
        u = d;
      }
      return "no";
    }
    #L(e) {
      let t = Urr;
      return t?.f === e &&
        t.isWindows === this.isWindows &&
        t.preserveMultipleSlashes === this.preserveMultipleSlashes &&
        t.normalize === this.#n
        ? t
        : void 0;
    }
    #$(e) {
      let { isWindows: t, preserveMultipleSlashes: r } = this,
        s = this.#E(t ? e.split("\\").join("/") : e),
        a = this.#n;
      return (
        a && (s = s.map((H) => H.normalize(a))),
        (Urr = { f: e, isWindows: t, preserveMultipleSlashes: r, normalize: a, parts: s }),
        Urr
      );
    }
    #p(e) {
      let t = [...e],
        r = !1;
      do {
        if (((r = !1), !this.preserveMultipleSlashes)) {
          for (let H = 1; H < t.length - 1; H++) {
            let u = t[H];
            (H === 1 && u === "" && t[0] === "") ||
              ((u === "." || u === "") && ((r = !0), t.splice(H, 1), H--));
          }
          t[0] === "." && t.length === 2 && (t[1] === "." || t[1] === "") && ((r = !0), t.pop());
        }
        let s = this.#l(t) + 1,
          a = s;
        for (; (a = t.indexOf("..", a + 1)) !== -1;) {
          let H = t[a - 1];
          H &&
            H !== "." &&
            H !== ".." &&
            H !== "**" &&
            ((r = !0), t.splice(a - 1, 2), (a = Math.max(a - 2, s)));
        }
      } while (r);
      return t.length === 0 ? [""] : t;
    }
    firstPhasePreProcess(e) {
      let { braceExpandMax: t = 1e5 } = this.options,
        r = !1;
      do {
        r = !1;
        for (let s of e) {
          let a = -1;
          for (; (a = s.indexOf("**", a + 1)) !== -1;) {
            let f = a;
            for (; s[f + 1] === "**";) f++;
            f > a && s.splice(a + 1, f - a);
            let d = s[a + 1],
              _ = s[a + 2],
              L = s[a + 3];
            if (d !== ".." || !_ || _ === "." || _ === ".." || !L || L === "." || L === ".." || e.length >= t)
              continue;
            ((r = !0), s.splice(a, 1));
            let I = s.slice(0);
            ((I[a] = "**"), e.push(I), a--);
          }
          if (!this.preserveMultipleSlashes) {
            for (let f = 1; f < s.length - 1; f++) {
              let d = s[f];
              (f === 1 && d === "" && s[0] === "") ||
                ((d === "." || d === "") && ((r = !0), s.splice(f, 1), f--));
            }
            s[0] === "." && s.length === 2 && (s[1] === "." || s[1] === "") && ((r = !0), s.pop());
          }
          let H = this.#l(s) + 1,
            u = H;
          for (; (u = s.indexOf("..", u + 1)) !== -1;) {
            let f = s[u - 1];
            if (f && f !== "." && f !== ".." && f !== "**") {
              r = !0;
              let d = u === 1 && s[u + 1] === "**" ? ["."] : [];
              (s.splice(u - 1, 2, ...d), s.length === 0 && s.push(""), (u = Math.max(u - 2, H)));
            }
          }
        }
      } while (r);
      return e;
    }
    secondPhasePreProcess(e) {
      if (e.length > 1000) return e;
      for (let t = 0; t < e.length - 1; t++)
        for (let r = t + 1; r < e.length; r++) {
          let s = this.partsMatch(e[t], e[r], !this.preserveMultipleSlashes);
          if (s) {
            ((e[t] = []), (e[r] = s));
            break;
          }
        }
      return e.filter((t) => t.length);
    }
    partsMatch(e, t, r = !1) {
      let s = 0,
        a = 0,
        H = [],
        u = "";
      for (; s < e.length && a < t.length;)
        if (e[s] === t[a]) (H.push(u === "b" ? t[a] : e[s]), s++, a++);
        else if (r && e[s] === "**" && t[a] === e[s + 1]) (H.push(e[s]), s++);
        else if (r && t[a] === "**" && e[s] === t[a + 1]) (H.push(t[a]), a++);
        else if (e[s] === "*" && t[a] && (this.options.dot || !t[a].startsWith(".")) && t[a] !== "**") {
          if (u === "b") return !1;
          ((u = "a"), H.push(e[s]), s++, a++);
        } else if (t[a] === "*" && e[s] && (this.options.dot || !e[s].startsWith(".")) && e[s] !== "**") {
          if (u === "a") return !1;
          ((u = "b"), H.push(t[a]), s++, a++);
        } else return !1;
      return e.length === t.length && H;
    }
    parseNegate() {
      if (this.nonegate) return;
      let e = this.pattern,
        t = !1,
        r = 0;
      for (let s = 0; s < e.length && e.charAt(s) === "!"; s++) ((t = !t), r++);
      (r && (this.pattern = e.slice(r)), (this.negate = t));
    }
    #h(e, t, r, s) {
      let a = 0,
        H = 0,
        u = this.isWindows ? Frr(t) : -1,
        f = u === -1 ? -1 : Frr(r);
      if (f !== -1) {
        let d = r[f],
          _ = r[f + 1];
        typeof d != "string" || typeof _ != "string"
          ? ((a = u), (H = f))
          : t[u].toLowerCase() === d.toLowerCase() &&
            t[u + 1].toLowerCase() === _.toLowerCase() &&
            ((a = u + 2), (H = f + 2));
      } else if (this.isWindows) {
        let d = typeof e[0] == "string" && /^[a-z]:$/i.test(e[0]),
          _ = !d && e[0] === "" && e[1] === "" && e[2] === "?" && /^[a-z]:$/i.test(e[3]),
          L = typeof r[0] == "string" && /^[a-z]:$/i.test(r[0]),
          I =
            !L &&
            r[0] === "" &&
            r[1] === "" &&
            r[2] === "?" &&
            typeof r[3] == "string" &&
            /^[a-z]:$/i.test(r[3]),
          D = _ ? 3 : d ? 0 : void 0,
          S = I ? 3 : L ? 0 : void 0;
        if (typeof D == "number" && typeof S == "number") {
          let [T, C] = [e[D], r[S]];
          T.toLowerCase() === C.toLowerCase() && ((H = S + 1), (a = D + 1));
        }
      }
      return ((e = t), r.includes(yD) ? this.#_(e, r, s, a, H) : this.#g(e, r, s, a, H));
    }
    #_(e, t, r, s, a) {
      let { head: H, body: u, tail: f, segments: d } = this.#y(t, r, a);
      if (H.length) {
        let L = s + H.length;
        if (!this.#g(e, H, r, s, 0, L)) return !1;
        ((s += H.length), (a += H.length));
      }
      let _ = 0;
      if (f.length) {
        if (f.length + s > e.length) return !1;
        let L = e.length - f.length;
        if (this.#g(e, f, r, L, 0)) _ = f.length;
        else {
          if (e[e.length - 1] !== "" || s + f.length === e.length || (L--, !this.#g(e, f, r, L, 0)))
            return !1;
          _ = f.length + 1;
        }
      }
      if (!u.length) {
        let L = !!_;
        for (let I = s; I < e.length - _; I++) {
          let D = String(e[I]);
          if (((L = !0), D === "." || D === ".." || (!this.options.dot && D.startsWith(".")))) return !1;
        }
        return r || L;
      }
      return !!this.#I(e, d, e.length - _, s, 0, r, 0, !!_, new Set());
    }
    #y(e, t, r) {
      let s = this.#H.get(e);
      s || ((s = []), this.#H.set(e, s));
      let a = r * 2 + (t ? 1 : 0),
        H = s[a];
      if (H) return H;
      let u = e.indexOf(yD, r),
        f = e.lastIndexOf(yD),
        d = e.slice(r, u),
        _ = e.slice(u + 1, t ? void 0 : f),
        L = t ? [] : e.slice(f + 1),
        I = [[[], 0]],
        D = I[0],
        S = 0,
        T = [0];
      for (let O of _) O === yD ? (T.push(S), (D = [[], 0]), I.push(D)) : (D[0].push(O), S++);
      I.forEach((O, B) => {
        O[1] = S - T[B];
      });
      let C = { head: d, body: _, tail: L, segments: I };
      return ((s[a] = C), C);
    }
    #I(e, t, r, s, a, H, u, f, d) {
      let _ = t[a];
      if (!_) {
        if (H) return s >= r || (s === r - 1 && e[s] === "");
        for (let S = s; S < r; S++) {
          f = !0;
          let T = e[S];
          if (T === "." || T === ".." || (!this.options.dot && T.startsWith("."))) return !1;
        }
        return f;
      }
      let [L, I] = _,
        D = H ? r : r - I;
      for (; s <= D;) {
        let S = a * (e.length + 1) + s;
        if (d.has(S)) return !1;
        if ((d.add(S), this.#g(e, L, H, s, 0, s + L.length) && u < this.maxGlobstarRecursion)) {
          let C = this.#I(e, t, r, s + L.length, a + 1, H, u + 1, f, d);
          if (C !== !1) return C;
        }
        if (s === D) break;
        let T = e[s];
        if (T === "." || T === ".." || (!this.options.dot && T.startsWith("."))) return !1;
        s++;
      }
      return H || null;
    }
    #g(e, t, r, s, a, H = e.length) {
      let u, f, d, _;
      for (u = s, f = a, _ = Math.min(H, e.length), d = t.length; u < _ && f < d; u++, f++) {
        let L = t[f],
          I = e[u];
        if (L === !1 || L === yD || !Mse(L, I)) return !1;
      }
      if (u === _ && f === d) return !0;
      if (u === _) return r;
      if (f === d) return u === _ - 1 && e[u] === "";
      throw Error("wtf?");
    }
    braceExpand() {
      return d0n(this.pattern, this.options);
    }
    parse(e) {
      Rmt(e);
      let t = this.options;
      if (e === "**") return yD;
      if (e === "") return "";
      let { nocase: r, nocaseMagicOnly: s, noext: a = !1, dot: H, normalize: u } = t,
        f = nXs(e, a);
      if (f !== void 0 && !(r && !s && e.toUpperCase() !== e.toLowerCase())) return this.#f(f);
      let d = this.#c.get(e);
      return (d || ((d = new wgn(e, { nocase: r, noext: a, dot: H, normalize: u })), this.#c.set(e, d)), d);
    }
    #E(e) {
      return this.preserveMultipleSlashes
        ? e.split("/")
        : this.isWindows && /^\/\/[^/]+/.test(e)
          ? ["", ...e.split(/\/+/)]
          : e.split(/\/+/);
    }
    match(e, t = this.partial) {
      if (this.comment) return !1;
      if (this.empty) return e === "";
      if (e === "/" && t) return !0;
      let r = this.options,
        s = this.#L(e);
      if (!s) {
        if (!t && !this.#n && (this.#e || this.#r) && Ugn !== e) {
          Ugn = e;
          let d = this.#A(e);
          if (d === "no") return r.flipNegate ? !1 : this.negate;
          if (d === "yes") return r.flipNegate ? !0 : !this.negate;
        }
        s = this.#$(e);
      }
      let a = s.parts,
        H = this.#t ? (s.resolved ??= this.#p(a)) : a,
        u = this.set,
        f = a[a.length - 1];
      if (!f) for (let d = a.length - 2; !f && d >= 0; d--) f = a[d];
      for (let d = 0; d < u.length; d++) {
        let _ = u[d],
          L = t ? void 0 : this.#s[d];
        if (
          L === "base"
            ? Mse(_[0], f)
            : L
              ? this.#o(H, _, L)
              : r.matchBase && _.length === 1
                ? this.#h([f], [f], _, t)
                : this.#h(a, H, _, t)
        )
          return r.flipNegate ? !0 : !this.negate;
      }
      return r.flipNegate ? !1 : this.negate;
    }
    static defaults(e) {
      return XU.defaults(e).Minimatch;
    }
  },
  qv,
  q3e,
  HXs,
  Brr = () => qv.hasSubscribers || q3e.hasSubscribers,
  _0n,
  Bgn,
  cXs = (e, t, r, s) => {
    typeof Bgn.emitWarning == "function" ? Bgn.emitWarning(e, t, r, s) : console.error(`[${r}] ${t}: ${e}`);
  },
  AXs = (e) => !_0n.has(e),
  yse = (e) => !!e && e === Math.floor(e) && e > 0 && isFinite(e),
  h0n = (e) =>
    yse(e)
      ? e <= Math.pow(2, 8)
        ? Uint8Array
        : e <= Math.pow(2, 16)
          ? Uint16Array
          : e <= Math.pow(2, 32)
            ? Uint32Array
            : e <= Number.MAX_SAFE_INTEGER
              ? Fmt
              : null
      : null,
  Fmt,
  uXs = class e {
    heap;
    length;
    static #e = !1;
    static create(t) {
      let r = h0n(t);
      if (!r) return [];
      e.#e = !0;
      let s = new e(t, r);
      return ((e.#e = !1), s);
    }
    constructor(t, r) {
      if (!e.#e) throw TypeError("instantiate Stack using Stack.create(n)");
      ((this.heap = new r(t)), (this.length = 0));
    }
    push(t) {
      this.heap[this.length++] = t;
    }
    pop() {
      return this.heap[--this.length];
    }
  },
  Gmt,
  Rgn,
  yXs = (e) => !!e && typeof e == "object" && (e instanceof Vmt || e instanceof L0n || MXs(e) || xXs(e)),
  MXs = (e) =>
    !!e &&
    typeof e == "object" &&
    e instanceof snr &&
    typeof e.pipe == "function" &&
    e.pipe !== L0n.Writable.prototype.pipe,
  xXs = (e) =>
    !!e &&
    typeof e == "object" &&
    e instanceof snr &&
    typeof e.write == "function" &&
    typeof e.end == "function",
  dY,
  mY,
  Dse,
  vmt,
  F3e,
  bmt,
  Wgn,
  jmt,
  Vgn,
  lV,
  _Me,
  WS,
  B3e,
  hMe,
  VS,
  fw,
  qS,
  Rrr,
  Pmt,
  Rj,
  Ty,
  Wrr,
  Vrr,
  qgn,
  qrr,
  PG,
  Grr,
  Cmt,
  R3e,
  xde,
  GU,
  W3e = (e) => Promise.resolve().then(e),
  SXs = (e) => e(),
  TXs = (e) => e === "end" || e === "finish" || e === "prefinish",
  vXs = (e) =>
    e instanceof ArrayBuffer ||
    (!!e &&
      typeof e == "object" &&
      e.constructor &&
      e.constructor.name === "ArrayBuffer" &&
      e.byteLength >= 0),
  bXs = (e) => !Buffer.isBuffer(e) && ArrayBuffer.isView(e),
  $0n = class {
    src;
    dest;
    opts;
    ondrain;
    constructor(e, t, r) {
      ((this.src = e),
        (this.dest = t),
        (this.opts = r),
        (this.ondrain = () => e[hMe]()),
        this.dest.on("drain", this.ondrain));
    }
    unpipe() {
      this.dest.removeListener("drain", this.ondrain);
    }
    proxyErrors(e) {}
    end() {
      (this.unpipe(), this.opts.end && this.dest.end());
    }
  },
  jXs,
  PXs = (e) => !!e.objectMode,
  CXs = (e) => !e.objectMode && !!e.encoding && e.encoding !== "buffer",
  Vmt,
  wXs,
  G3e,
  g0n = (e) =>
    !e || e === G3e || e === LXs ? G3e : { ...G3e, ...e, promises: { ...G3e.promises, ...e.promises } },
  kXs,
  OXs,
  UXs,
  Ggn = (e) => e.replace(/\//g, "\\").replace(kXs, "$1\\").replace(OXs, "\\\\$1\\").replace(UXs, "$&\\"),
  NXs,
  FXs,
  BXs,
  RXs,
  y2 = 0,
  E0n = 1,
  I0n = 2,
  CG = 4,
  D0n = 6,
  y0n = 8,
  Sde = 10,
  M0n = 12,
  D2 = 15,
  V3e,
  Xrr = 16,
  Xgn = 32,
  X3e = 64,
  fV = 128,
  wmt = 256,
  Bmt = 512,
  Jgn,
  WXs = 1023,
  Jrr = (e) =>
    e.isFile()
      ? y0n
      : e.isDirectory()
        ? CG
        : e.isSymbolicLink()
          ? Sde
          : e.isCharacterDevice()
            ? I0n
            : e.isBlockDevice()
              ? D0n
              : e.isSocket()
                ? M0n
                : e.isFIFO()
                  ? E0n
                  : y2,
  Kgn,
  J3e = (e) => {
    let t = Kgn.get(e);
    if (t) return t;
    let r = e.normalize("NFKD");
    return (Kgn.set(e, r), r);
  },
  zgn,
  kmt = (e) => {
    let t = zgn.get(e);
    if (t) return t;
    let r = J3e(e.toLowerCase());
    return (zgn.set(e, r), r);
  },
  Qgn,
  VXs,
  x0n,
  V6,
  qXs,
  GXs,
  S0n,
  onr,
  T0n,
  XXs,
  JXs,
  KXs = (e) => e.length >= 1,
  zXs = (e) => e.length >= 1,
  QXs,
  v0n,
  YXs,
  Ygn = class {
    relative;
    relativeChildren;
    absolute;
    absoluteChildren;
    platform;
    mmopts;
    slashRoot;
    constructor(
      e,
      {
        nobrace: t,
        nocase: r,
        noext: s,
        noglobstar: a,
        normalize: H,
        platform: u = YXs,
        root: f,
        windowsPathsNoEscape: d,
        allowWindowsEscape: _,
      },
      L,
    ) {
      ((this.relative = []),
        (this.absolute = []),
        (this.relativeChildren = []),
        (this.absoluteChildren = []),
        (this.platform = u),
        (d = !!d || _ === !1),
        (this.mmopts = {
          dot: !0,
          nobrace: t,
          nocase: r,
          noext: s,
          noglobstar: a,
          normalize: H,
          optimizationLevel: 2,
          platform: u,
          nocomment: !0,
          nonegate: !0,
          windowsPathsNoEscape: d,
        }));
      let I = L?.resolve(f ?? "/").fullpath() ?? "/";
      this.slashRoot = inr(I.replace(/\\/g, "/").replace(/\/$/, ""), { windowsPathsNoEscape: d });
      for (let D of e) this.add(D);
    }
    add(e) {
      let t = new vde(e, this.mmopts);
      for (let r = 0; r < t.set.length; r++) {
        let s = t.set[r],
          a = t.globParts[r];
        if (!s || !a) throw Error("invalid pattern object");
        for (; s[0] === "." && a[0] === ".";) (s.shift(), a.shift());
        let H = new v0n(s, a, 0, this.platform),
          u = H.root() === "/" ? `${this.slashRoot}/${H.rest()?.globString() ?? ""}` : H.globString(),
          f = new vde(u, this.mmopts),
          d = a[a.length - 1] === "**",
          _ = H.isAbsolute();
        (_ ? this.absolute.push(f) : this.relative.push(f),
          d && (_ ? this.absoluteChildren.push(f) : this.relativeChildren.push(f)));
      }
    }
    ignored(e) {
      let t = e.fullpath(),
        r = `${t}/`,
        s = e.relative() || ".",
        a = `${s}/`;
      for (let H of this.relative) if (H.match(s) || H.match(a)) return !0;
      for (let H of this.absolute) if (H.match(t) || H.match(r)) return !0;
      return !1;
    }
    childrenIgnored(e) {
      let t = `${e.fullpath()}/`,
        r = `${e.relative() || "."}/`;
      for (let s of this.relativeChildren) if (s.match(r)) return !0;
      for (let s of this.absoluteChildren) if (s.match(t)) return !0;
      return !1;
    }
  },
  ZXs = class e {
    parent;
    store;
    constructor(t) {
      this.parent = t;
    }
    copy() {
      return new e(this);
    }
    #e(t) {
      let r = this.store?.get(t);
      return r || !this.parent ? r : this.parent.#e(t);
    }
    hasWalked(t, r) {
      return !!this.#e(t.fullpath())?.has(r.globString());
    }
    storeWalked(t, r) {
      let s = t.fullpath(),
        a = this.#e(s);
      a ? a.add(r.globString()) : (this.store ??= new Map()).set(s, new Set([r.globString()]));
    }
  },
  b0n = class e {
    static ABSOLUTE = 2;
    static IF_DIR = 1;
    store = new Map();
    add(t, r, s) {
      let a = (r ? e.ABSOLUTE : 0) | (s ? e.IF_DIR : 0),
        H = this.store.get(t);
      this.store.set(t, H === void 0 ? a : a & H);
    }
  },
  eJs = class {
    store = new Map();
    add(e, t) {
      if (!e.canReaddir()) return;
      let r = this.store.get(e);
      r ? r.find((s) => s.globString() === t.globString()) || r.push(t) : this.store.set(e, [t]);
    }
    get(e) {
      let t = this.store.get(e);
      if (!t) throw Error("attempting to walk unknown path");
      return t;
    }
    entries() {
      return this.keys().map((e) => [e, this.store.get(e)]);
    }
    keys() {
      return [...this.store.keys()].filter((e) => e.canReaddir());
    }
  },
  Zgn = class e {
    hasWalkedCache;
    matches = new b0n();
    subwalks = new eJs();
    patterns;
    follow;
    dot;
    opts;
    constructor(t, r) {
      ((this.opts = t),
        (this.follow = !!t.follow),
        (this.dot = !!t.dot),
        (this.hasWalkedCache = r ? r.copy() : new ZXs()));
    }
    processPatterns(t, r) {
      this.patterns = r;
      let s = r.map((a) => [t, a]);
      for (let [a, H] of s) {
        this.hasWalkedCache.storeWalked(a, H);
        let u = H.root(),
          f = H.isAbsolute() && this.opts.absolute !== !1;
        if (u) {
          a = a.resolve(u === "/" && this.opts.root !== void 0 ? this.opts.root : u);
          let I = H.rest();
          if (I) H = I;
          else {
            this.matches.add(a, !0, !1);
            continue;
          }
        }
        if (a.isENOENT()) continue;
        let d,
          _,
          L = !1;
        for (; typeof (d = H.pattern()) == "string" && (_ = H.rest());)
          ((a = a.resolve(d)), (H = _), (L = !0));
        if (((d = H.pattern()), (_ = H.rest()), L)) {
          if (this.hasWalkedCache.hasWalked(a, H)) continue;
          this.hasWalkedCache.storeWalked(a, H);
        }
        if (typeof d == "string") {
          let I = d === ".." || d === "" || d === ".";
          this.matches.add(a.resolve(d), f, I);
          continue;
        } else if (d === yD) {
          (!a.isSymbolicLink() || this.follow || H.checkFollowGlobstar()) && this.subwalks.add(a, H);
          let I = _?.pattern(),
            D = _?.rest();
          if (!_ || ((I === "" || I === ".") && !D)) this.matches.add(a, f, I === "" || I === ".");
          else if (I === "..") {
            let S = a.parent || a;
            D ? this.hasWalkedCache.hasWalked(S, D) || this.subwalks.add(S, D) : this.matches.add(S, f, !0);
          }
        } else typeof d == "object" && this.subwalks.add(a, H);
      }
      return this;
    }
    subwalkTargets() {
      return this.subwalks.keys();
    }
    child() {
      return new e(this.opts, this.hasWalkedCache);
    }
    filterEntries(t, r) {
      let s = this.subwalks.get(t),
        a = this.child();
      for (let H of r)
        for (let u of s) {
          let f = u.isAbsolute(),
            d = u.pattern(),
            _ = u.rest();
          d === yD
            ? a.testGlobstar(H, u, _, f)
            : typeof d == "object"
              ? a.testMatcher(H, d, _, f)
              : a.testString(H, d, _, f);
        }
      return a;
    }
    testGlobstar(t, r, s, a) {
      if (
        ((this.dot || !t.name.startsWith(".")) &&
          (r.hasMore() || this.matches.add(t, a, !1),
          t.canReaddir() &&
            (this.follow || !t.isSymbolicLink()
              ? this.subwalks.add(t, r)
              : t.isSymbolicLink() &&
                (s && r.checkFollowGlobstar()
                  ? this.subwalks.add(t, s)
                  : r.markFollowGlobstar() && this.subwalks.add(t, r)))),
        s)
      ) {
        let H = s.pattern();
        if (typeof H == "string" && H !== ".." && H !== "" && H !== ".") this.testString(t, H, s.rest(), a);
        else if (H === "..") {
          let u = t.parent || t;
          this.subwalks.add(u, s);
        } else typeof H == "object" && this.testMatcher(t, H, s.rest(), a);
      }
    }
    testMatcher(t, r, s, a) {
      r.testUnchecked(t.name) && (s ? this.subwalks.add(t, s) : this.matches.add(t, a, !1));
    }
    testString(t, r, s, a) {
      t.isNamed(r) && (s ? this.subwalks.add(t, s) : this.matches.add(t, a, !1));
    }
  },
  Omt,
  Umt,
  tJs = (e, t, r) => (typeof e == "string" ? new Ygn([e], t, r) : Array.isArray(e) ? new Ygn(e, t, r) : e),
  j0n = class {
    path;
    patterns;
    opts;
    seen = new Set();
    paused = !1;
    aborted = !1;
    #e = [];
    #r;
    #t;
    signal;
    maxDepth;
    includeChildMatches;
    constructor(e, t, r) {
      if (
        ((this.patterns = e),
        (this.path = t),
        (this.opts = r),
        (this.#t = !r.posix && r.platform === "win32" ? "\\" : "/"),
        (this.includeChildMatches = r.includeChildMatches !== !1),
        (r.ignore || !this.includeChildMatches) &&
          ((this.#r = tJs(r.ignore ?? [], r, t)),
          !this.includeChildMatches && typeof this.#r.add != "function"))
      )
        throw Error("cannot ignore child matches, ignore lacks add() method.");
      ((this.maxDepth = r.maxDepth || 1 / 0),
        r.signal &&
          ((this.signal = r.signal),
          this.signal.addEventListener("abort", () => {
            this.#e.length = 0;
          })));
    }
    #n(e) {
      return this.seen.has(e) || !!this.#r?.ignored?.(e);
    }
    #i(e) {
      return !!this.#r?.childrenIgnored?.(e);
    }
    pause() {
      this.paused = !0;
    }
    resume() {
      if (this.signal?.aborted) return;
      this.paused = !1;
      let e;
      for (; !this.paused && (e = this.#e.shift());) e();
    }
    onResume(e) {
      this.paused ? this.#e.push(e) : e();
    }
    async matchCheck(e, t) {
      if (t && this.opts.nodir) return;
      let r, s;
      if (this.opts.realpath) {
        if (((r = e.realpathCached() || (await e.realpath())), !r)) return;
        s = r;
      } else s = e;
      let a = s.isUnknown() || this.opts.stat ? await s.lstat() : s;
      if (this.opts.follow && this.opts.nodir && a?.isSymbolicLink()) {
        let H = await a.realpath();
        H && (H.isUnknown() || this.opts.stat) && (await H.lstat());
      }
      return this.matchCheckTest(a, t);
    }
    matchCheckTest(e, t) {
      return e &&
        (this.maxDepth === 1 / 0 || e.depth() <= this.maxDepth) &&
        (!t || e.canReaddir()) &&
        (!this.opts.nodir || !e.isDirectory()) &&
        (!this.opts.nodir ||
          !this.opts.follow ||
          !e.isSymbolicLink() ||
          !e.realpathCached()?.isDirectory()) &&
        !this.#n(e)
        ? e
        : void 0;
    }
    matchCheckSync(e, t) {
      if (t && this.opts.nodir) return;
      let r, s;
      if (this.opts.realpath) {
        if (((r = e.realpathCached() || e.realpathSync()), !r)) return;
        s = r;
      } else s = e;
      let a = s.isUnknown() || this.opts.stat ? s.lstatSync() : s;
      if (this.opts.follow && this.opts.nodir && a?.isSymbolicLink()) {
        let H = a.realpathSync();
        H && (H?.isUnknown() || this.opts.stat) && H.lstatSync();
      }
      return this.matchCheckTest(a, t);
    }
    matchFinish(e, t) {
      this.#n(e) || this.#s(e, t);
    }
    #s(e, t) {
      if (!this.includeChildMatches && this.#r?.add) {
        let a = `${e.relativePosix()}/**`;
        this.#r.add(a);
      }
      let r = this.opts.absolute === void 0 ? t : this.opts.absolute;
      this.seen.add(e);
      let s = this.opts.mark && e.isDirectory() ? this.#t : "";
      if (this.opts.withFileTypes) this.matchEmit(e);
      else if (r) {
        let a = this.opts.posix ? e.fullpathPosix() : e.fullpath();
        this.matchEmit(a + s);
      } else {
        let a = this.opts.posix ? e.relativePosix() : e.relative(),
          H = this.opts.dotRelative && !a.startsWith(`..${this.#t}`) ? `.${this.#t}` : "";
        this.matchEmit(a ? H + a + s : `.${s}`);
      }
    }
    async match(e, t, r) {
      let s = await this.matchCheck(e, r);
      s && this.matchFinish(s, t);
    }
    matchSync(e, t, r) {
      let s = this.matchCheckSync(e, r);
      s && this.#s(s, t);
    }
    walkCB(e, t, r) {
      if (this.signal?.aborted) return r();
      this.walkCB2(e, t, new Zgn(this.opts), r);
    }
    walkCB2(e, t, r, s) {
      if (this.#i(e) || this.signal?.aborted) return s();
      if (this.paused) {
        this.onResume(() => this.walkCB2(e, t, r, s));
        return;
      }
      r.processPatterns(e, t);
      let a = 1,
        H = () => {
          --a === 0 && s();
        };
      for (let [u, f] of r.matches.store)
        this.#n(u) || (a++, this.match(u, !!(f & Omt), !!(f & Umt)).then(() => H()));
      for (let u of r.subwalkTargets()) {
        if (this.maxDepth !== 1 / 0 && u.depth() >= this.maxDepth) continue;
        a++;
        let f = u.readdirCached();
        u.calledReaddir() ? this.walkCB3(u, f, r, H) : u.readdirCB((d, _) => this.walkCB3(u, _, r, H), !0);
      }
      H();
    }
    walkCB3(e, t, r, s) {
      let a = r.filterEntries(e, t),
        H = 1,
        u = () => {
          --H === 0 && s();
        };
      for (let [f, d] of a.matches.store)
        this.#n(f) || (H++, this.match(f, !!(d & Omt), !!(d & Umt)).then(() => u()));
      for (let [f, d] of a.subwalks.entries()) (H++, this.walkCB2(f, d, a.child(), u));
      u();
    }
    walkCBSync(e, t, r) {
      if (this.signal?.aborted) return r();
      this.walkCB2Sync(e, t, new Zgn(this.opts), r);
    }
    walkCB2Sync(e, t, r, s) {
      if (this.#i(e) || this.signal?.aborted) return s();
      if (this.paused) {
        this.onResume(() => this.walkCB2Sync(e, t, r, s));
        return;
      }
      r.processPatterns(e, t);
      let a = 1,
        H = () => {
          --a === 0 && s();
        };
      for (let [u, f] of r.matches.store) this.#n(u) || this.matchSync(u, !!(f & Omt), !!(f & Umt));
      for (let u of r.subwalkTargets()) {
        if (this.maxDepth !== 1 / 0 && u.depth() >= this.maxDepth) continue;
        a++;
        let f = u.readdirSync();
        this.walkCB3Sync(u, f, r, H);
      }
      H();
    }
    walkCB3Sync(e, t, r, s) {
      let a = r.filterEntries(e, t),
        H = 1,
        u = () => {
          --H === 0 && s();
        };
      for (let [f, d] of a.matches.store) this.#n(f) || this.matchSync(f, !!(d & Omt), !!(d & Umt));
      for (let [f, d] of a.subwalks.entries()) (H++, this.walkCB2Sync(f, d, a.child(), u));
      u();
    }
  },
  e0n,
  t0n,
  rJs,
  bde,
  nJs = (e, t = {}) => {
    for (let r of Array.isArray(e) ? e : [e]) if (new vde(r, t).hasMagic()) return !0;
    return !1;
  },
  iJs,
  sJs,
  oJs,
  aJs,
  HJs,
  qmt;
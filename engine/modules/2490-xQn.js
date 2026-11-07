
var xQn = Ie(function (yQn) {
  Object.defineProperty(yQn, "__esModule", { value: !0 });
  yQn.Matcher = void 0;
  var pQn = AQn(),
    zAr = { t: "match", id: 0 },
    r8o = "!?+*@",
    Gme = (e) => ({ t: "lit", ch: e }),
    n8o = (e) => e.replace(/[\\^$.*+?()[\]{}|/]/g, "\\$&"),
    dQn = (e) => new RegExp(`^${n8o(e)}$`, "iu"),
    V0t = new Map(),
    mQn = (e) => {
      let t = V0t.get(e);
      if (!t) {
        if (((t = dQn(e)), V0t.size >= 1000)) V0t.clear();
        V0t.set(e, t);
      }
      return t;
    },
    QAr = (e, t) => {
      if (t === e.ch) return !0;
      if (!e.re) return !1;
      let r = t.charCodeAt(0);
      if (r >= 128) return e.re.test(t);
      let s = (e.ascii ??= new Uint8Array(128));
      return ((s[r] ||= e.re.test(t) ? 1 : 2), s[r] === 1);
    },
    i8o = (e, t, r, s) => {
      let a = [];
      for (let H = 0; H < e.length;) {
        let u = String.fromCodePoint(e.codePointAt(H));
        if (u === "\\") {
          let f = e.codePointAt(H + 1),
            d = f === void 0 ? u : String.fromCodePoint(f);
          (a.push(Gme(d)), (H += 1 + d.length));
          continue;
        }
        if (u === "[") {
          let [f, d] = pQn.parseClass(e, H, t, s);
          if (d) {
            (a.push({ t: "class", re: f }), (H += d));
            continue;
          }
        }
        if (!r && r8o.includes(u) && e[H + 1] === "(") {
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
                  : Gme(u),
        ),
          (H += u.length));
      }
      return a;
    },
    s8o = (e) => {
      let t = new Map(),
        r = [];
      return (
        e.forEach((s, a) => {
          if (s.t === "open") r.push(a);
          else if (s.t === "close" && r.length) t.set(r.pop(), a);
        }),
        t
      );
    },
    _Qn = (e, t, r, s, a) => {
      let H = [],
        u = [H];
      for (let f = r; f < s; f++) {
        let d = e[f],
          _ = t.get(f);
        if (d.t === "open" && _ !== void 0) {
          let L = _Qn(e, t, f + 1, _, !1);
          (H.push({ t: "ext", type: d.type, alts: L }), (f = _));
        } else if (d.t === "bar" && !a) u.push((H = []));
        else if (d.t === "open") H.push(Gme(d.type), Gme("("));
        else if (d.t === "bar") H.push(Gme("|"));
        else if (d.t === "close") H.push(Gme(")"));
        else H.push(d);
      }
      return u;
    },
    hQn = (e, t) => {
      let r = [],
        s = "",
        a = () => {
          for (let H of s.normalize(t)) r.push(Gme(H));
          s = "";
        };
      for (let H of e) {
        if (H.t === "lit") {
          s += H.ch;
          continue;
        }
        (a(), r.push(H.t === "ext" ? { ...H, alts: H.alts.map((u) => hQn(u, t)) } : H));
      }
      return (a(), r);
    },
    o8o = (e, t) => {
      let r = 1,
        s = (f) => ({ t: "split", id: r++, out: f }),
        a = (f, d) => f.reduceRight((_, L) => H(L, _), d),
        H = (f, d) => {
          switch (f.t) {
            case "lit":
              let D = t ? mQn(f.ch) : void 0;
              return { t: "lit", id: r++, ch: f.ch, re: D, next: d };
            case "any":
            case "star":
              return { t: f.t, id: r++, next: d };
            case "class":
              return { t: "class", id: r++, re: f.re, next: d };
          }
          let _ = (D) => f.alts.map((S) => a(S, D));
          switch (f.type) {
            case "@":
              return s(_(d));
            case "?":
              return s([d, ..._(d)]);
            case "!":
              return { t: "neg", id: r++, sub: s(_(zAr)), next: d };
          }
          let L = s([]),
            I = s(_(L));
          return (L.out.push(d, I), f.type === "*" ? L : I);
        };
      return [a(e, zAr), r];
    },
    a8o = (e) => {
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
    };
  class LQn {
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
  }
  var $Qn = (e, t) => {
      if (e.ids.length !== t.ids.length) return !1;
      if (e.runs.length !== t.runs.length) return !1;
      if (e.ids.some((r, s) => r !== t.ids[s])) return !1;
      return e.runs.every((r) => t.runs.some((s) => s.neg === r.neg && $Qn(s.state, r.state)));
    },
    uQn = (e) => ({ has: new Float64Array(e), seen: new Float64Array(e), gen: 0 });
  class G0t {
    dots;
    dotStart;
    #e;
    constructor(e, t, r) {
      ((this.dots = e), (this.dotStart = t), (this.#e = r));
    }
    state() {
      return new LQn(++this.#e.gen);
    }
    done(e) {
      if (((e.ids = e.threads.map((t) => t.id).sort((t, r) => t - r)), e.match)) e.ids.unshift(zAr.id);
      return e;
    }
    #r(e, t) {
      let { seen: r } = this.#e;
      if (r[t.id] === e.gen) return !1;
      return ((r[t.id] = e.gen), !0);
    }
    #t(e, t) {
      let { has: r } = this.#e;
      if (r[t.id] === e.gen) return !1;
      return ((r[t.id] = e.gen), e.threads.push(t), !0);
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
          if (this.#t(e, t)) this.add(e, t.next, r, s);
          return;
        case "match":
          e.match = !0;
          return;
        default:
          this.#t(e, t);
      }
    }
    addRun(e, t, r, s) {
      for (let a of e.runs) if (a.neg === t.neg && $Qn(a.state, t.state)) return;
      if ((e.runs.push(t), !t.state.match)) this.add(e, t.neg.next, r, s);
    }
    step(e, t, r, s) {
      let a = this.state();
      for (let H of e.threads)
        switch (H.t) {
          case "lit":
            if (QAr(H, t)) this.add(a, H.next, r + 1, s);
            break;
          case "any":
            if (!this.restricted(r, s)) this.add(a, H.next, r + 1, s);
            break;
          case "class":
            if (!this.restricted(r, s) && H.re.test(t)) this.add(a, H.next, r + 1, s);
            break;
          case "star":
            if (!this.restricted(r, s)) this.add(a, H, r + 1, s);
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
  }
  var gQn = (e) => {
      let t = e.ids.join();
      if (!e.runs.length) return t;
      let r = e.runs.map((s) => `${s.neg.id}(${gQn(s.state)})`);
      return `${t}|${r.sort().join("|")}`;
    },
    H8o = 262144;
  class EQn {
    #e;
    #r = new Map();
    #t = 0;
    #n;
    #i;
    #s;
    #a;
    constructor(e, t) {
      ((this.#e = e), (this.#s = new G0t(!1, !1, t)), (this.#a = new G0t(!1, !0, t)));
    }
    #c(e) {
      return { state: e, match: e.match, dead: e.dead, next: new Map() };
    }
    #H(e) {
      let t = gQn(e),
        r = this.#r.get(t);
      if (r) return r;
      if (this.#t > H8o) this.#f();
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
      if (r < 128) {
        if (!e.ascii) ((e.ascii = Array(128)), (this.#t += 128));
        e.ascii[r] = a;
      } else e.next.set(t, a);
      return (this.#t++, a);
    }
  }
  var c8o = (e) => {
      let t = [];
      for (let r = e; r.t !== "match"; r = r.next) {
        if (r.t === "split" || r.t === "neg") return;
        t.push(r);
      }
      return t;
    },
    A8o = (e, t, r, s) => {
      let a = 0,
        H = r,
        u = -1,
        f = 0;
      while (H < s) {
        let d = e[a];
        if (d?.t === "star") {
          ((u = a++), (f = H));
          continue;
        }
        let _ = t[H];
        if (d && (d.t === "any" || (d.t === "lit" && QAr(d, _)) || (d.t === "class" && d.re.test(_)))) {
          (a++, H++);
          continue;
        }
        if (u === -1) return !1;
        ((a = u + 1), (H = ++f));
      }
      while (e[a]?.t === "star") a++;
      return a === e.length;
    },
    IQn = (e) => {
      let t = 0,
        r = 0;
      for (let s of e) {
        let [a, H] = u8o(s);
        ((t += a), (r += H));
      }
      return [t, r];
    },
    u8o = (e) => {
      if (e.t === "star") return [0, 1 / 0];
      if (e.t !== "ext") return [1, 1];
      if (e.type === "!") return [0, 1 / 0];
      let t = e.alts.map(IQn),
        r = Math.min(...t.map((H) => H[0])),
        s = Math.max(...t.map((H) => H[1])),
        a = s === 0 ? 0 : 1 / 0;
      return e.type === "@" ? [r, s] : e.type === "?" ? [0, s] : e.type === "*" ? [0, a] : [r, a];
    },
    lQn = (e, t, r) => {
      for (let s = 0; s < e.length; s++) if (!QAr(e[s], t[r + s])) return !1;
      return !0;
    },
    l8o = /[/\ud800-\udfff]/,
    f8o = /[\ud800-\udfff]/,
    q0t = (e) => (f8o.test(e) ? [...e] : e),
    fQn = (e) => {
      if (e.includes("/")) throw Error("can only match a single path portion, got: " + e);
    };
  class DQn {
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
        u = i8o(e, r, s || H, this.#h),
        [f] = _Qn(u, s8o(u), 0, u.length, !0);
      if (this.#h) f = hQn(f, this.#h);
      let [d, _] = o8o(f, r);
      if (((this.#e = d), (this.#r = _), f.every((L) => L.t === "lit")))
        ((this.#i = f.map((L) => L.ch).join("")), (this.#s = r));
      else {
        let L = (S) => (S.t !== "lit" ? void 0 : r ? { ch: S.ch, re: mQn(S.ch) } : { ch: S.ch });
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
        ((this.#c = c8o(this.#e)?.slice(this.#A.length, -this.#o.length || void 0)),
          (this.#H = !!this.#c?.every((S) => S.t === "star" || S.t === "any")));
        let [I, D] = IQn(f);
        ((this.#f = I), (this.#l = D));
      }
    }
    test(e) {
      if (this.#h) return (fQn(e), this.#_(e.normalize(this.#h)));
      if (l8o.test(e)) return (fQn(e), this.#_(e, [...e]));
      return this.#_(e, e);
    }
    testUnchecked(e) {
      return this.#_(this.#h ? e.normalize(this.#h) : e);
    }
    #_(e, t) {
      if (this.#i !== void 0) return this.#s ? (this.#a ??= dQn(this.#i)).test(e) : e === this.#i;
      let r = this.#f,
        s = this.#l;
      if (t === void 0) {
        let _ = e.length,
          L = (_ + 1) >> 1;
        if (_ < r || L > s) return !1;
        if (L < r || _ > s) t = q0t(e);
      }
      if (t !== void 0 && (t.length < r || t.length > s)) return !1;
      let a = this.#A.length;
      if (this.#$)
        if (this.#m !== void 0 && this.#L !== void 0) {
          if (!e.startsWith(this.#m) || !e.endsWith(this.#L)) return !1;
        } else {
          t ??= q0t(e);
          let _ = t.length - this.#o.length;
          if (!lQn(this.#A, t, 0) || !lQn(this.#o, t, _)) return !1;
        }
      let H = !this.options.dot && e.startsWith(".");
      if (this.#c) {
        if (e === "." || e === "..") return !1;
        if (H && !a) return !1;
        if (this.#H) return !0;
        t ??= q0t(e);
        let _ = t.length - this.#o.length;
        return A8o(this.#c, t, a, _);
      }
      if (((t ??= q0t(e)), e === "." || e === "..")) {
        this.#t ??= uQn(this.#r);
        let _ = (this.#n ??= new G0t(!0, !1, this.#t)),
          L = _.state();
        _.add(L, this.#e, 0, !0);
        let I = _.done(L);
        for (let D = 0; D < t.length; D++) I = _.step(I, t[D], D, !0);
        return I.match;
      }
      this.#t ??= uQn(this.#r);
      let u = (this.#p ??= new EQn(this.#e, this.#t)),
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
      return a8o(this.#e);
    }
  }
  yQn.Matcher = DQn;
});
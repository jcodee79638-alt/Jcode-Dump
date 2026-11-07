
class n_t {
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
  #H = !1;
  #f = new WeakMap();
  constructor(e, t = {}) {
    (Q3e(e),
      (t = t || {}),
      (this.options = t),
      (this.maxGlobstarRecursion = t.maxGlobstarRecursion ?? 200),
      (this.pattern = e),
      (this.platform = t.platform || cEn),
      (this.isWindows = this.platform === "win32"));
    let r = "allowWindowsEscape";
    if (((this.windowsPathsNoEscape = !!t.windowsPathsNoEscape || t[r] === !1), this.windowsPathsNoEscape))
      this.pattern = this.pattern.replace(/\\/g, "/");
    ((this.preserveMultipleSlashes = !!t.preserveMultipleSlashes),
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
    let a = this.set.map((H) => this.#A(H));
    ((this.#a = this.set.map((H, u) => this.#e && H.length - 1 > a[u])),
      (this.#i = this.set.map((H, u) => {
        let f = this.#a[u] ? H.length - 1 : H.length,
          d = H.slice(a[u] + 1, f).filter((_) => typeof _ === "string" && !!_);
        return [...new Set(d)];
      })),
      (this.#r = this.#i.some((H) => H.length)),
      (this.#s = this.set.map((H, u) => {
        let [f, d, _] = H;
        if (this.#a[u] && H.length === 2) {
          if (f === QM && d !== QM) return "tail";
        }
        if (this.#a[u] && t.matchBase && H.length === 1 && f !== QM && f !== "") return "base";
        if (!this.#e || a[u] !== -1) return;
        if (H.length === 3 && f === QM && _ === QM && d !== QM && d !== "" && this.maxGlobstarRecursion > 0)
          return "mid";
        if (H.length === 2 && d === QM && f !== QM && f !== "") return "head";
        return;
      })));
  }
  #l(e) {
    return this.#n ? e.normalize(this.#n) : e;
  }
  #A(e) {
    if (!this.isWindows) return -1;
    if (hnr(e[0])) return 0;
    if (e[0] === "" && e[1] === "" && e[2] === "?" && hnr(e[3])) return 3;
    let r = Lnr(e);
    return r === -1 ? -1 : r + 1;
  }
  hasMagic() {
    if (this.options.magicalBraces && this.set.length > 1) return !0;
    for (let e of this.set) for (let t of e) if (typeof t !== "string") return !0;
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
    let r = this.globSet.map((a) => this.#D(a));
    ((this.globParts = this.preprocess(r)), (this.#H = !0));
    let s = this.globParts.map((a, H, u) => {
      if (this.isWindows && this.windowsNoMagicRoot) {
        let f = a[2] === "?" && t_t(a[3]) ? 6 : 4,
          d =
            a[0] === "" &&
            a[1] === "" &&
            (a[2] === "?" || !sEn.test(a[2])) &&
            a.slice(3, f).every((L) => !sEn.test(L)),
          _ = /^[a-z]:/i.test(a[0]);
        if (d) return [...a.slice(0, f).map((L) => this.#l(L)), ...a.slice(f).map((L) => this.parse(L))];
        else if (_) return [this.#l(a[0]), ...a.slice(1).map((L) => this.parse(L))];
      }
      return a.map((f) => this.parse(f));
    });
    if (((this.set = s.filter((a) => a.indexOf(!1) === -1)), this.isWindows))
      for (let a = 0; a < this.set.length; a++) {
        let H = this.set[a];
        if (
          H[0] === "" &&
          H[1] === "" &&
          this.globParts[a][2] === "?" &&
          (hnr(H[3]) || t_t(this.globParts[a][3]))
        ) {
          if (t_t(this.globParts[a][3])) H[3] = "UNC";
          H[2] = "?";
        }
      }
    if (!t.noext) this.mergeRows();
    ((this.#H = !1),
      this.set.forEach((a, H) => {
        for (let u = 0; u < a.length; u++) if (a[u] === $nr) a[u] = this.parse(this.globParts[H][u]);
      }));
  }
  mergeRows() {
    let e = !0;
    while (e) {
      e = !1;
      let t = Math.max(0, ...this.set.map((r) => r.length));
      for (let r = 0; r < t; r++) {
        let s = new Map();
        this.set.forEach((H, u) => {
          if (!(H[r] instanceof Zmt || H[r] === $nr) || !YJs(this.globParts[u][r])) return;
          let f = [...this.globParts[u]];
          f[r] = "";
          let d = `${H.length}/${f.join("/")}`,
            _ = s.get(d);
          if (_) _.push(u);
          else s.set(d, [u]);
        });
        let a = new Set();
        for (let H of s.values()) {
          if (H.length < 2) continue;
          let [u, ...f] = H,
            _ = `@(${H.map((L) => this.globParts[L][r]).join("|")})`;
          ((this.globParts[u][r] = _), (this.set[u][r] = this.parse(_)));
          for (let L of f) a.add(L);
        }
        if (a.size)
          ((e = !0),
            (this.set = this.set.filter((H, u) => !a.has(u))),
            (this.globParts = this.globParts.filter((H, u) => !a.has(u))));
      }
    }
  }
  preprocess(e) {
    if (this.options.noglobstar) {
      for (let r of e) for (let s = 0; s < r.length; s++) if (r[s] === "**") r[s] = "*";
    }
    let { optimizationLevel: t = 1 } = this.options;
    if (t >= 2) ((e = this.firstPhasePreProcess(e)), (e = this.secondPhasePreProcess(e)));
    else if (t >= 1) e = this.levelOneOptimize(e);
    else e = this.adjascentGlobstarOptimize(e);
    return e;
  }
  adjascentGlobstarOptimize(e) {
    return e.map((t) => {
      let r = -1;
      while ((r = t.indexOf("**", r + 1)) !== -1) {
        let s = r;
        while (t[s + 1] === "**") s++;
        if (s !== r) t.splice(r, s - r);
      }
      return t;
    });
  }
  levelOneOptimize(e) {
    return e.map((t) => {
      let r = this.#A(t) + 1;
      return (
        (t = t.reduce((s, a) => {
          let H = s[s.length - 1];
          if (a === "**" && H === "**") return s;
          if (a === "..") {
            if (s.length > r && H && H !== ".." && H !== "." && H !== "**") return (s.pop(), s);
          }
          return (s.push(a), s);
        }, [])),
        t.length === 0 ? [""] : t
      );
    });
  }
  #o(e) {
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
        I = r !== -1 && this.#a[d] && L !== QM;
      if (I && r === 0) {
        let T = HEn(e, e.length, t);
        if (((a = T + 1), (s = e.slice(a)), s === "" && T >= 0)) {
          let O = T;
          while (O > 0 && r_t(e.charCodeAt(O - 1), t)) O--;
          ((u = O === 0 ? 0 : HEn(e, O - 1, t) + 1), (H = e.slice(u, O)));
        }
        let C = this.#t && (gnr(s) || (s === "" && H !== void 0 && gnr(H)));
        ((r = C ? -1 : 1), (I = !C));
      }
      let D = -1;
      if (I && typeof L === "string") {
        if (((D = aEn(L, s, a, H, u)), D === -1)) continue;
      }
      if (this.#r) {
        for (let T of this.#i[d]) if (!e.includes(T)) continue e;
      }
      if (I && typeof L === "object") {
        if (((D = aEn(L, s, a, H, u)), D === -1)) continue;
      }
      let S = this.#s[d];
      if (S === "base" && I) return "yes";
      if (S === "tail" && I) {
        if (this.#t && Y3e(e, 0, D, !0, t)) return "maybe";
        if (!Y3e(e, 0, D, f, t)) return "yes";
        continue;
      }
      if (S === "mid" || S === "head") {
        let T = this.#L(e, _, S === "head", f, t);
        if (T !== "no") return T;
        continue;
      }
      return "maybe";
    }
    return "no";
  }
  #m(e, t, r) {
    let s = !!this.options.dot,
      a = e.length;
    if (r === "head") {
      if (a < 2 || !xse(t[0], e[0])) return !1;
      for (let u = 1; u < a; u++) if (!e_t(e[u], s)) return !1;
      return !0;
    }
    let H = t[1];
    if (r === "tail") {
      let u = a - 1;
      if (!xse(H, e[u])) {
        if (e[u] !== "" || a === 1 || !xse(H, e[--u])) return !1;
      }
      for (let f = 0; f < u; f++) if (!e_t(e[f], s)) return !1;
      return !0;
    }
    for (let u = 0; u < a; u++) {
      if (xse(H, e[u]) && u + 1 < a) {
        let f = u + 1;
        while (f < a && e_t(e[f], s)) f++;
        if (f === a) return !0;
      }
      if (!e_t(e[u], s)) return !1;
    }
    return !1;
  }
  #L(e, t, r, s, a) {
    if (this.#t && Y3e(e, 0, e.length, !0, a)) return "maybe";
    let H = t[r ? 0 : 1],
      u = 0;
    for (let f = Enr(e, u, a); f !== -1; f = Enr(e, u, a)) {
      let d = f + 1;
      while (d < e.length && r_t(e.charCodeAt(d), a)) d++;
      if (
        (typeof H === "string"
          ? f - u === H.length && e.startsWith(H, u)
          : f > u && H.testUnchecked(e.slice(u, f))) &&
        !Y3e(e, d, e.length, s, a)
      )
        return "yes";
      if (r || Y3e(e, u, d, s, a)) return "no";
      u = d;
    }
    return "no";
  }
  #$(e) {
    let t = _nr;
    return t?.f === e &&
      t.isWindows === this.isWindows &&
      t.preserveMultipleSlashes === this.preserveMultipleSlashes &&
      t.normalize === this.#n
      ? t
      : void 0;
  }
  #p(e) {
    let { isWindows: t, preserveMultipleSlashes: r } = this,
      s = this.#D(t ? e.split("\\").join("/") : e),
      a = this.#n;
    if (a) s = s.map((H) => H.normalize(a));
    return ((_nr = { f: e, isWindows: t, preserveMultipleSlashes: r, normalize: a, parts: s }), _nr);
  }
  #h(e) {
    let t = [...e],
      r = !1;
    do {
      if (((r = !1), !this.preserveMultipleSlashes)) {
        for (let H = 1; H < t.length - 1; H++) {
          let u = t[H];
          if (H === 1 && u === "" && t[0] === "") continue;
          if (u === "." || u === "") ((r = !0), t.splice(H, 1), H--);
        }
        if (t[0] === "." && t.length === 2 && (t[1] === "." || t[1] === "")) ((r = !0), t.pop());
      }
      let s = this.#A(t) + 1,
        a = s;
      while ((a = t.indexOf("..", a + 1)) !== -1) {
        let H = t[a - 1];
        if (H && H !== "." && H !== ".." && H !== "**")
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
        while ((a = s.indexOf("**", a + 1)) !== -1) {
          let f = a;
          while (s[f + 1] === "**") f++;
          if (f > a) s.splice(a + 1, f - a);
          let d = s[a + 1],
            _ = s[a + 2],
            L = s[a + 3];
          if (d !== "..") continue;
          if (!_ || _ === "." || _ === ".." || !L || L === "." || L === ".." || e.length >= t) continue;
          ((r = !0), s.splice(a, 1));
          let I = s.slice(0);
          ((I[a] = "**"), e.push(I), a--);
        }
        if (!this.preserveMultipleSlashes) {
          for (let f = 1; f < s.length - 1; f++) {
            let d = s[f];
            if (f === 1 && d === "" && s[0] === "") continue;
            if (d === "." || d === "") ((r = !0), s.splice(f, 1), f--);
          }
          if (s[0] === "." && s.length === 2 && (s[1] === "." || s[1] === "")) ((r = !0), s.pop());
        }
        let H = this.#A(s) + 1,
          u = H;
        while ((u = s.indexOf("..", u + 1)) !== -1) {
          let f = s[u - 1];
          if (f && f !== "." && f !== ".." && f !== "**") {
            r = !0;
            let _ = u === 1 && s[u + 1] === "**" ? ["."] : [];
            if ((s.splice(u - 1, 2, ..._), s.length === 0)) s.push("");
            u = Math.max(u - 2, H);
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
    while (s < e.length && a < t.length)
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
    if (r) this.pattern = e.slice(r);
    this.negate = t;
  }
  #_(e, t, r, s) {
    let a = 0,
      H = 0,
      u = this.isWindows ? Lnr(t) : -1,
      f = u === -1 ? -1 : Lnr(r);
    if (f !== -1) {
      let d = r[f],
        _ = r[f + 1];
      if (typeof d !== "string" || typeof _ !== "string") ((a = u), (H = f));
      else if (t[u].toLowerCase() === d.toLowerCase() && t[u + 1].toLowerCase() === _.toLowerCase())
        ((a = u + 2), (H = f + 2));
    } else if (this.isWindows) {
      let d = typeof e[0] === "string" && /^[a-z]:$/i.test(e[0]),
        _ = !d && e[0] === "" && e[1] === "" && e[2] === "?" && /^[a-z]:$/i.test(e[3]),
        L = typeof r[0] === "string" && /^[a-z]:$/i.test(r[0]),
        I =
          !L &&
          r[0] === "" &&
          r[1] === "" &&
          r[2] === "?" &&
          typeof r[3] === "string" &&
          /^[a-z]:$/i.test(r[3]),
        D = _ ? 3 : d ? 0 : void 0,
        S = I ? 3 : L ? 0 : void 0;
      if (typeof D === "number" && typeof S === "number") {
        let [T, C] = [e[D], r[S]];
        if (T.toLowerCase() === C.toLowerCase()) ((H = S + 1), (a = D + 1));
      }
    }
    if (((e = t), r.includes(QM))) return this.#y(e, r, s, a, H);
    return this.#E(e, r, s, a, H);
  }
  #y(e, t, r, s, a) {
    let { head: H, body: u, tail: f, segments: d } = this.#I(t, r, a);
    if (H.length) {
      let L = s + H.length;
      if (!this.#E(e, H, r, s, 0, L)) return !1;
      ((s += H.length), (a += H.length));
    }
    let _ = 0;
    if (f.length) {
      if (f.length + s > e.length) return !1;
      let L = e.length - f.length;
      if (this.#E(e, f, r, L, 0)) _ = f.length;
      else {
        if (e[e.length - 1] !== "" || s + f.length === e.length) return !1;
        if ((L--, !this.#E(e, f, r, L, 0))) return !1;
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
    return !!this.#g(e, d, e.length - _, s, 0, r, 0, !!_, new Set());
  }
  #I(e, t, r) {
    let s = this.#f.get(e);
    if (!s) ((s = []), this.#f.set(e, s));
    let a = r * 2 + (t ? 1 : 0),
      H = s[a];
    if (H) return H;
    let u = e.indexOf(QM, r),
      f = e.lastIndexOf(QM),
      d = e.slice(r, u),
      _ = e.slice(u + 1, t ? void 0 : f),
      L = t ? [] : e.slice(f + 1),
      I = [[[], 0]],
      D = I[0],
      S = 0,
      T = [0];
    for (let O of _)
      if (O === QM) (T.push(S), (D = [[], 0]), I.push(D));
      else (D[0].push(O), S++);
    I.forEach((O, B) => {
      O[1] = S - T[B];
    });
    let C = { head: d, body: _, tail: L, segments: I };
    return ((s[a] = C), C);
  }
  #g(e, t, r, s, a, H, u, f, d) {
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
    while (s <= D) {
      let S = a * (e.length + 1) + s;
      if (d.has(S)) return !1;
      if ((d.add(S), this.#E(e, L, H, s, 0, s + L.length) && u < this.maxGlobstarRecursion)) {
        let O = this.#g(e, t, r, s + L.length, a + 1, H, u + 1, f, d);
        if (O !== !1) return O;
      }
      if (s === D) break;
      let C = e[s];
      if (C === "." || C === ".." || (!this.options.dot && C.startsWith("."))) return !1;
      s++;
    }
    return H || null;
  }
  #E(e, t, r, s, a, H = e.length) {
    let u, f, d, _;
    for (u = s, f = a, _ = Math.min(H, e.length), d = t.length; u < _ && f < d; u++, f++) {
      let L = t[f],
        I = e[u];
      if (L === !1 || L === QM) return !1;
      if (!xse(L, I)) return !1;
    }
    if (u === _ && f === d) return !0;
    else if (u === _) return r;
    else if (f === d) return u === _ - 1 && e[u] === "";
    else throw Error("wtf?");
  }
  braceExpand() {
    return AEn(this.pattern, this.options);
  }
  parse(e) {
    Q3e(e);
    let t = this.options;
    if (e === "**") return QM;
    if (e === "") return "";
    let { nocase: r, nocaseMagicOnly: s, noext: a = !1, dot: H, normalize: u } = t,
      f = QJs(e, a);
    if (f !== void 0 && !(r && !s && e.toUpperCase() !== e.toLowerCase())) return this.#l(f);
    if (this.#H) return $nr;
    let d = this.#c.get(e);
    if (!d) ((d = new Zmt(e, { nocase: r, noext: a, dot: H, normalize: u })), this.#c.set(e, d));
    return d;
  }
  #D(e) {
    if (this.preserveMultipleSlashes) return e.split("/");
    else if (this.isWindows && /^\/\/[^/]+/.test(e)) return ["", ...e.split(/\/+/)];
    else return e.split(/\/+/);
  }
  match(e, t = this.partial) {
    if (this.comment) return !1;
    if (this.empty) return e === "";
    if (e === "/" && t) return !0;
    let r = this.options,
      s = this.#$(e);
    if (!s) {
      if (!t && !this.#n && (this.#e || this.#r) && oEn !== e) {
        oEn = e;
        let d = this.#o(e);
        if (d === "no") return r.flipNegate ? !1 : this.negate;
        if (d === "yes") return r.flipNegate ? !0 : !this.negate;
      }
      s = this.#p(e);
    }
    let a = s.parts,
      H = this.#t ? (s.resolved ??= this.#h(a)) : a,
      u = this.set,
      f = a[a.length - 1];
    if (!f) for (let d = a.length - 2; !f && d >= 0; d--) f = a[d];
    for (let d = 0; d < u.length; d++) {
      let _ = u[d],
        L = t ? void 0 : this.#s[d];
      if (
        L === "base"
          ? xse(_[0], f)
          : L
            ? this.#m(H, _, L)
            : r.matchBase && _.length === 1
              ? this.#_([f], [f], _, t)
              : this.#_(a, H, _, t)
      ) {
        if (r.flipNegate) return !0;
        return !this.negate;
      }
    }
    if (r.flipNegate) return !1;
    return this.negate;
  }
  static defaults(e) {
    return pw.defaults(e).Minimatch;
  }
}
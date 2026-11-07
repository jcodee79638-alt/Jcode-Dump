
var pw = (e, t, r = {}) => {
    if ((Q3e(t), !r.nocomment && t.charAt(0) === "#")) return !1;
    return GJs(t, r).match(e);
  },
  LMe,
  qJs = 256,
  GJs = (e, t) => {
    let r = e + "\x00" + JSON.stringify(t),
      s = LMe.get(r);
    if (s) LMe.delete(r);
    else if (((s = new n_t(e, { ...t })), LMe.size >= qJs)) LMe.delete(LMe.keys().next().value);
    return (LMe.set(r, s), s);
  },
  cEn,
  iEn,
  XJs,
  QM,
  JJs =
    (e, t = {}) =>
    (r) =>
      pw(r, e, t),
  _Y = (e, t = {}) => Object.assign({}, e, t),
  KJs = (e) => {
    if (!e || typeof e !== "object" || !Object.keys(e).length) return pw;
    let t = pw;
    return Object.assign((s, a, H = {}) => t(s, a, _Y(e, H)), {
      Minimatch: class extends t.Minimatch {
        constructor(a, H = {}) {
          super(a, _Y(e, H));
        }
        static defaults(a) {
          return t.defaults(_Y(e, a)).Minimatch;
        }
      },
      unescape: (s, a = {}) => t.unescape(s, _Y(e, a)),
      escape: (s, a = {}) => t.escape(s, _Y(e, a)),
      filter: (s, a = {}) => t.filter(s, _Y(e, a)),
      defaults: (s) => t.defaults(_Y(e, s)),
      braceExpand: (s, a = {}) => t.braceExpand(s, _Y(e, a)),
      match: (s, a, H = {}) => t.match(s, a, _Y(e, H)),
      sep: t.sep,
      GLOBSTAR: QM,
    });
  },
  AEn = (e, t = {}) => {
    if ((Q3e(e), t.nobrace || !/\{(?:(?!\{).)*\}/.test(e))) return [e];
    return B0n(e, { max: t.braceExpandMax });
  },
  zJs = (e, t, r = {}) => {
    let s = new n_t(t, r);
    if (((e = e.filter((a) => s.match(a))), s.options.nonull && !e.length)) e.push(t);
    return e;
  },
  sEn,
  uEn = (e, t) => {
    let r = t + 1;
    if (e.charAt(r) === "!" || e.charAt(r) === "^") r++;
    let s = !1;
    for (; r < e.length; r++) {
      let a = e.charAt(r);
      if (a === "]" && s) return r;
      if (((s = !0), a === "\\")) r++;
    }
    return -1;
  },
  QJs = (e, t) => {
    if (!t && (e === "+()" || e === "@()")) return e;
    let r = "";
    for (let s = 0; s < e.length; s++) {
      let a = e.charAt(s);
      if (a === "\\") r += e.charAt(++s) || a;
      else if (a === "*" || a === "?") return;
      else if (a === "[") {
        let H = uEn(e, s);
        if (H === -1) {
          r += a;
          continue;
        }
        let u = e.slice(s + 1, H);
        if (u.startsWith("\\")) u = u.slice(1);
        if ([...u].length !== 1 || "!^".includes(e.charAt(s + 1))) return;
        ((r += u), (s = H));
      } else if (!t && "+@!".includes(a) && e.charAt(s + 1) === "(" && e.includes(")", s + 2)) return;
      else r += a;
    }
    return r;
  },
  YJs = (e) => {
    if (/^[?*+@]\(\)$/.test(e) || e.includes("[:")) return !1;
    let t = 0;
    for (let r = 0; r < e.length; r++) {
      let s = e.charAt(r);
      if (s === "\\") {
        if (++r === e.length) return !1;
      } else if (s === "[") {
        let a = uEn(e, r);
        if (a !== -1) r = a;
      } else if ("+@!?*".includes(s) && e.charAt(r + 1) === "(") (t++, r++);
      else if (s === ")") {
        if (!t--) return !1;
      } else if (s === "|" && !t) return !1;
    }
    return !t;
  },
  _nr,
  oEn,
  xse = (e, t) => (typeof e === "string" ? t === e : t !== "" && e.testUnchecked(t)),
  aEn = (e, t, r, s, a) => (xse(e, t) ? r : s !== void 0 && xse(e, s) ? a : -1),
  gnr = (e) => e === "." || e === "..",
  hnr = (e) => typeof e === "string" && /^[a-z]:$/i.test(e),
  t_t = (e) => typeof e === "string" && /^unc$/i.test(e),
  Lnr = (e) => {
    if (e[0] !== "" || e[1] !== "") return -1;
    let t = e[2] !== "?" ? 2 : t_t(e[3]) ? 4 : -1,
      r = e[t],
      s = e[t + 1];
    return t !== -1 && r !== void 0 && r !== "" && r !== QM && s !== void 0 && s !== "" && s !== QM ? t : -1;
  },
  e_t = (e, t) => !gnr(e) && (t || !e.startsWith(".")),
  Y3e = (e, t, r, s, a) => {
    for (let H = t; H < r;) {
      if (e.charCodeAt(H) === 46) {
        if (!s) return !0;
        let f = e.charCodeAt(H + 1) === 46 ? H + 2 : H + 1;
        if (f >= r || r_t(e.charCodeAt(f), a)) return !0;
      }
      let u = Enr(e, H, a);
      if (u === -1) return !1;
      H = u + 1;
      while (H < r && r_t(e.charCodeAt(H), a)) H++;
    }
    return !1;
  },
  r_t = (e, t) => (t === "/" ? e === 47 : t === "\\" ? e === 92 : e === 47 || e === 92),
  Enr = (e, t, r) => {
    if (r !== "both") return e.indexOf(r, t);
    let s = e.indexOf("/", t),
      a = e.indexOf("\\", t);
    return s === -1 ? a : a === -1 ? s : Math.min(s, a);
  },
  HEn = (e, t, r) =>
    r !== "both" ? e.lastIndexOf(r, t) : Math.max(e.lastIndexOf("/", t), e.lastIndexOf("\\", t)),
  $nr;
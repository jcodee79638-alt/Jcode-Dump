
var WSn = Ie(function (sXH, RSn) {
  var BSn = cr("path"),
    pio = wSn(),
    HLt = FSn(),
    mxe = VWe(),
    dio = WWe(),
    mio = (e) => e && typeof e === "object" && !Array.isArray(e),
    jy = (e, t, r = !1) => {
      if (Array.isArray(e)) {
        let L = e.map((D) => jy(D, t, r));
        return (D) => {
          for (let S of L) {
            let T = S(D);
            if (T) return T;
          }
          return !1;
        };
      }
      let s = mio(e) && e.tokens && e.input;
      if (e === "" || (typeof e !== "string" && !s))
        throw TypeError("Expected pattern to be a non-empty string");
      let a = t || {},
        H = mxe.isWindows(t),
        u = s ? jy.compileRe(e, t) : jy.makeRe(e, t, !1, !0),
        f = u.state;
      delete u.state;
      let d = () => !1;
      if (a.ignore) {
        let L = { ...t, ignore: null, onMatch: null, onResult: null };
        d = jy(a.ignore, L, r);
      }
      let _ = (L, I = !1) => {
        let { isMatch: D, match: S, output: T } = jy.test(L, u, t, { glob: e, posix: H }),
          C = { glob: e, state: f, regex: u, posix: H, input: L, output: T, match: S, isMatch: D };
        if (typeof a.onResult === "function") a.onResult(C);
        if (D === !1) return ((C.isMatch = !1), I ? C : !1);
        if (d(L)) {
          if (typeof a.onIgnore === "function") a.onIgnore(C);
          return ((C.isMatch = !1), I ? C : !1);
        }
        if (typeof a.onMatch === "function") a.onMatch(C);
        return I ? C : !0;
      };
      if (r) _.state = f;
      return _;
    };
  jy.test = (e, t, r, { glob: s, posix: a } = {}) => {
    if (typeof e !== "string") throw TypeError("Expected input to be a string");
    if (e === "") return { isMatch: !1, output: "" };
    let H = r || {},
      u = H.format || (a ? mxe.toPosixSlashes : null),
      f = e === s,
      d = f && u ? u(e) : e;
    if (f === !1) ((d = u ? u(e) : e), (f = d === s));
    if (f === !1 || H.capture === !0)
      if (H.matchBase === !0 || H.basename === !0) f = jy.matchBase(e, t, r, a);
      else f = t.exec(d);
    return { isMatch: Boolean(f), match: f, output: d };
  };
  jy.matchBase = (e, t, r, s = mxe.isWindows(r)) =>
    (t instanceof RegExp ? t : jy.makeRe(t, r)).test(BSn.basename(e));
  jy.isMatch = (e, t, r) => jy(t, r)(e);
  jy.parse = (e, t) => {
    if (Array.isArray(e)) return e.map((r) => jy.parse(r, t));
    return HLt(e, { ...t, fastpaths: !1 });
  };
  jy.scan = (e, t) => pio(e, t);
  jy.compileRe = (e, t, r = !1, s = !1) => {
    if (r === !0) return e.output;
    let a = t || {},
      H = a.contains ? "" : "^",
      u = a.contains ? "" : "$",
      f = `${H}(?:${e.output})${u}`;
    if (e && e.negated === !0) f = `^(?!${f}).*$`;
    let d = jy.toRegex(f, t);
    if (s === !0) d.state = e;
    return d;
  };
  jy.makeRe = (e, t = {}, r = !1, s = !1) => {
    if (!e || typeof e !== "string") throw TypeError("Expected a non-empty string");
    let a = { negated: !1, fastpaths: !0 };
    if (t.fastpaths !== !1 && (e[0] === "." || e[0] === "*")) a.output = HLt.fastpaths(e, t);
    if (!a.output) a = HLt(e, t);
    return jy.compileRe(a, t, r, s);
  };
  jy.toRegex = (e, t) => {
    try {
      let r = t || {};
      return new RegExp(e, r.flags || (r.nocase ? "i" : ""));
    } catch (r) {
      if (t && t.debug === !0) throw r;
      return /$^/;
    }
  };
  jy.constants = dio;
  RSn.exports = jy;
});
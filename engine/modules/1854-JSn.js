
var JSn = Ie(function (oXH, XSn) {
  var cLt = cr("util"),
    qSn = ISn(),
    X6 = WSn(),
    _xe = VWe(),
    VSn = (e) => e === "" || e === "./",
    GSn = (e) => {
      let t = e.indexOf("{");
      return t > -1 && e.indexOf("}", t) > -1;
    },
    Z0 = (e, t, r) => {
      ((t = [].concat(t)), (e = [].concat(e)));
      let s = new Set(),
        a = new Set(),
        H = new Set(),
        u = 0,
        f = (L) => {
          if ((H.add(L.output), r && r.onResult)) r.onResult(L);
        };
      for (let L = 0; L < t.length; L++) {
        let I = X6(String(t[L]), { ...r, onResult: f }, !0),
          D = I.state.negated || I.state.negatedExtglob;
        if (D) u++;
        for (let S of e) {
          let T = I(S, !0);
          if (!(D ? !T.isMatch : T.isMatch)) continue;
          if (D) s.add(T.output);
          else (s.delete(T.output), a.add(T.output));
        }
      }
      let _ = (u === t.length ? [...H] : [...a]).filter((L) => !s.has(L));
      if (r && _.length === 0) {
        if (r.failglob === !0) throw Error(`No matches found for "${t.join(", ")}"`);
        if (r.nonull === !0 || r.nullglob === !0) return r.unescape ? t.map((L) => L.replace(/\\/g, "")) : t;
      }
      return _;
    };
  Z0.match = Z0;
  Z0.matcher = (e, t) => X6(e, t);
  Z0.isMatch = (e, t, r) => X6(t, r)(e);
  Z0.any = Z0.isMatch;
  Z0.not = (e, t, r = {}) => {
    t = [].concat(t).map(String);
    let s = new Set(),
      a = [],
      u = new Set(
        Z0(e, t, {
          ...r,
          onResult: (f) => {
            if (r.onResult) r.onResult(f);
            a.push(f.output);
          },
        }),
      );
    for (let f of a) if (!u.has(f)) s.add(f);
    return [...s];
  };
  Z0.contains = (e, t, r) => {
    if (typeof e !== "string") throw TypeError(`Expected a string: "${cLt.inspect(e)}"`);
    if (Array.isArray(t)) return t.some((s) => Z0.contains(e, s, r));
    if (typeof t === "string") {
      if (VSn(e) || VSn(t)) return !1;
      if (e.includes(t) || (e.startsWith("./") && e.slice(2).includes(t))) return !0;
    }
    return Z0.isMatch(e, t, { ...r, contains: !0 });
  };
  Z0.matchKeys = (e, t, r) => {
    if (!_xe.isObject(e)) throw TypeError("Expected the first argument to be an object");
    let s = Z0(Object.keys(e), t, r),
      a = {};
    for (let H of s) a[H] = e[H];
    return a;
  };
  Z0.some = (e, t, r) => {
    let s = [].concat(e);
    for (let a of [].concat(t)) {
      let H = X6(String(a), r);
      if (s.some((u) => H(u))) return !0;
    }
    return !1;
  };
  Z0.every = (e, t, r) => {
    let s = [].concat(e);
    for (let a of [].concat(t)) {
      let H = X6(String(a), r);
      if (!s.every((u) => H(u))) return !1;
    }
    return !0;
  };
  Z0.all = (e, t, r) => {
    if (typeof e !== "string") throw TypeError(`Expected a string: "${cLt.inspect(e)}"`);
    return [].concat(t).every((s) => X6(s, r)(e));
  };
  Z0.capture = (e, t, r) => {
    let s = _xe.isWindows(r),
      H = X6.makeRe(String(e), { ...r, capture: !0 }).exec(s ? _xe.toPosixSlashes(t) : t);
    if (H) return H.slice(1).map((u) => (u === void 0 ? "" : u));
  };
  Z0.makeRe = (...e) => X6.makeRe(...e);
  Z0.scan = (...e) => X6.scan(...e);
  Z0.parse = (e, t) => {
    let r = [];
    for (let s of [].concat(e || [])) for (let a of qSn(String(s), t)) r.push(X6.parse(a, t));
    return r;
  };
  Z0.braces = (e, t) => {
    if (typeof e !== "string") throw TypeError("Expected a string");
    if ((t && t.nobrace === !0) || !GSn(e)) return [e];
    return qSn(e, t);
  };
  Z0.braceExpand = (e, t) => {
    if (typeof e !== "string") throw TypeError("Expected a string");
    return Z0.braces(e, { ...t, expand: !0 });
  };
  Z0.hasBraces = GSn;
  XSn.exports = Z0;
});
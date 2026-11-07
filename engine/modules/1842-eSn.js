
var eSn = Ie(function (X5H, Zxn) {
  /*!
   * to-regex-range <https://github.com/micromatch/to-regex-range>
   *
   * Copyright (c) 2015-present, Jon Schlinkert.
   * Released under the MIT License.
   */ var Gxn = qxn(),
    rme = (e, t, r) => {
      if (Gxn(e) === !1) throw TypeError("toRegexRange: expected the first argument to be a number");
      if (t === void 0 || e === t) return String(e);
      if (Gxn(t) === !1) throw TypeError("toRegexRange: expected the second argument to be a number.");
      let s = { relaxZeros: !0, ...r };
      if (typeof s.strictZeros === "boolean") s.relaxZeros = s.strictZeros === !1;
      let a = String(s.relaxZeros),
        H = String(s.shorthand),
        u = String(s.capture),
        f = String(s.wrap),
        d = e + ":" + t + "=" + a + H + u + f;
      if (rme.cache.hasOwnProperty(d)) return rme.cache[d].result;
      let _ = Math.min(e, t),
        L = Math.max(e, t);
      if (Math.abs(_ - L) === 1) {
        let C = e + "|" + t;
        if (s.capture) return `(${C})`;
        if (s.wrap === !1) return C;
        return `(?:${C})`;
      }
      let I = Yxn(e) || Yxn(t),
        D = { min: e, max: t, a: _, b: L },
        S = [],
        T = [];
      if (I) ((D.isPadded = I), (D.maxLen = String(D.max).length));
      if (_ < 0) {
        let C = L < 0 ? Math.abs(L) : 1;
        ((T = Xxn(C, Math.abs(_), D, s)), (_ = D.a = 0));
      }
      if (L >= 0) S = Xxn(_, L, D, s);
      if (((D.negatives = T), (D.positives = S), (D.result = rno(T, S, s)), s.capture === !0))
        D.result = `(${D.result})`;
      else if (s.wrap !== !1 && S.length + T.length > 1) D.result = `(?:${D.result})`;
      return ((rme.cache[d] = D), D.result);
    };
  function rno(e, t, r) {
    let s = zsr(e, t, "-", !1, r) || [],
      a = zsr(t, e, "", !1, r) || [],
      H = zsr(e, t, "-?", !0, r) || [];
    return s.concat(H).concat(a).join("|");
  }
  function nno(e, t) {
    let r = 1,
      s = 1,
      a = Kxn(e, r),
      H = new Set([t]);
    while (e <= a && a <= t) (H.add(a), (r += 1), (a = Kxn(e, r)));
    a = zxn(t + 1, s) - 1;
    while (e < a && a <= t) (H.add(a), (s += 1), (a = zxn(t + 1, s) - 1));
    return ((H = [...H]), H.sort(ono), H);
  }
  function ino(e, t, r) {
    if (e === t) return { pattern: e, count: [], digits: 0 };
    let s = sno(e, t),
      a = s.length,
      H = "",
      u = 0;
    for (let f = 0; f < a; f++) {
      let [d, _] = s[f];
      if (d === _) H += d;
      else if (d !== "0" || _ !== "9") H += ano(d, _, r);
      else u++;
    }
    if (u) H += r.shorthand === !0 ? "\\d" : "[0-9]";
    return { pattern: H, count: [u], digits: a };
  }
  function Xxn(e, t, r, s) {
    let a = nno(e, t),
      H = [],
      u = e,
      f;
    for (let d = 0; d < a.length; d++) {
      let _ = a[d],
        L = ino(String(u), String(_), s),
        I = "";
      if (!r.isPadded && f && f.pattern === L.pattern) {
        if (f.count.length > 1) f.count.pop();
        (f.count.push(L.count[0]), (f.string = f.pattern + Qxn(f.count)), (u = _ + 1));
        continue;
      }
      if (r.isPadded) I = Hno(_, r, s);
      ((L.string = I + L.pattern + Qxn(L.count)), H.push(L), (u = _ + 1), (f = L));
    }
    return H;
  }
  function zsr(e, t, r, s, a) {
    let H = [];
    for (let u of e) {
      let { string: f } = u;
      if (!s && !Jxn(t, "string", f)) H.push(r + f);
      if (s && Jxn(t, "string", f)) H.push(r + f);
    }
    return H;
  }
  function sno(e, t) {
    let r = [];
    for (let s = 0; s < e.length; s++) r.push([e[s], t[s]]);
    return r;
  }
  function ono(e, t) {
    return e > t ? 1 : t > e ? -1 : 0;
  }
  function Jxn(e, t, r) {
    return e.some((s) => s[t] === r);
  }
  function Kxn(e, t) {
    return Number(String(e).slice(0, -t) + "9".repeat(t));
  }
  function zxn(e, t) {
    return e - (e % Math.pow(10, t));
  }
  function Qxn(e) {
    let [t = 0, r = ""] = e;
    if (r || t > 1) return `{${t + (r ? "," + r : "")}}`;
    return "";
  }
  function ano(e, t, r) {
    return `[${e}${t - e === 1 ? "" : "-"}${t}]`;
  }
  function Yxn(e) {
    return /^-?(0+)\d/.test(e);
  }
  function Hno(e, t, r) {
    if (!t.isPadded) return e;
    let s = Math.abs(t.maxLen - String(e).length),
      a = r.relaxZeros !== !1;
    switch (s) {
      case 0:
        return "";
      case 1:
        return a ? "0?" : "0";
      case 2:
        return a ? "0{0,2}" : "00";
      default:
        return a ? `0{0,${s}}` : `0{${s}}`;
    }
  }
  rme.cache = {};
  rme.clearCache = () => (rme.cache = {});
  Zxn.exports = rme;
});

var Zsr = Ie(function (J5H, HSn) {
  /*!
   * fill-range <https://github.com/jonschlinkert/fill-range>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Licensed under the MIT License.
   */ var rSn = cr("util"),
    nSn = eSn(),
    tSn = (e) => e !== null && typeof e === "object" && !Array.isArray(e),
    cno = (e) => (t) => (e === !0 ? Number(t) : String(t)),
    Qsr = (e) => typeof e === "number" || (typeof e === "string" && e !== ""),
    RWe = (e) => Number.isInteger(+e),
    Ysr = (e) => {
      let t = `${e}`,
        r = -1;
      if (t[0] === "-") t = t.slice(1);
      if (t === "0") return !1;
      while (t[++r] === "0");
      return r > 0;
    },
    Ano = (e, t, r) => {
      if (typeof e === "string" || typeof t === "string") return !0;
      return r.stringify === !0;
    },
    uno = (e, t, r) => {
      if (t > 0) {
        let s = e[0] === "-" ? "-" : "";
        if (s) e = e.slice(1);
        e = s + e.padStart(s ? t - 1 : t, "0");
      }
      if (r === !1) return String(e);
      return e;
    },
    iLt = (e, t) => {
      let r = e[0] === "-" ? "-" : "";
      if (r) ((e = e.slice(1)), t--);
      while (e.length < t) e = "0" + e;
      return r ? "-" + e : e;
    },
    lno = (e, t, r) => {
      (e.negatives.sort((f, d) => (f < d ? -1 : f > d ? 1 : 0)),
        e.positives.sort((f, d) => (f < d ? -1 : f > d ? 1 : 0)));
      let s = t.capture ? "" : "?:",
        a = "",
        H = "",
        u;
      if (e.positives.length) a = e.positives.map((f) => iLt(String(f), r)).join("|");
      if (e.negatives.length) H = `-(${s}${e.negatives.map((f) => iLt(String(f), r)).join("|")})`;
      if (a && H) u = `${a}|${H}`;
      else u = a || H;
      if (t.wrap) return `(${s}${u})`;
      return u;
    },
    iSn = (e, t, r, s) => {
      if (r) return nSn(e, t, { wrap: !1, ...s });
      let a = String.fromCharCode(e);
      if (e === t) return a;
      let H = String.fromCharCode(t);
      return `[${a}-${H}]`;
    },
    sSn = (e, t, r) => {
      if (Array.isArray(e)) {
        let s = r.wrap === !0,
          a = r.capture ? "" : "?:";
        return s ? `(${a}${e.join("|")})` : e.join("|");
      }
      return nSn(e, t, r);
    },
    oSn = (...e) => RangeError("Invalid range arguments: " + rSn.inspect(...e)),
    aSn = (e, t, r) => {
      if (r.strictRanges === !0) throw oSn([e, t]);
      return [];
    },
    fno = (e, t) => {
      if (t.strictRanges === !0) throw TypeError(`Expected step "${e}" to be a number`);
      return [];
    },
    pno = (e, t, r = 1, s = {}) => {
      let a = Number(e),
        H = Number(t);
      if (!Number.isInteger(a) || !Number.isInteger(H)) {
        if (s.strictRanges === !0) throw oSn([e, t]);
        return [];
      }
      if (a === 0) a = 0;
      if (H === 0) H = 0;
      let u = a > H,
        f = String(e),
        d = String(t),
        _ = String(r);
      r = Math.max(Math.abs(r), 1);
      let L = Ysr(f) || Ysr(d) || Ysr(_),
        I = L ? Math.max(f.length, d.length, _.length) : 0,
        D = L === !1 && Ano(e, t, s) === !1,
        S = s.transform || cno(D);
      if (s.toRegex && r === 1) return iSn(iLt(e, I), iLt(t, I), !0, s);
      let T = { negatives: [], positives: [] },
        C = (V) => T[V < 0 ? "negatives" : "positives"].push(Math.abs(V)),
        O = [],
        B = 0;
      while (u ? a >= H : a <= H) {
        if (s.toRegex === !0 && r > 1) C(a);
        else O.push(uno(S(a, B), I, D));
        ((a = u ? a - r : a + r), B++);
      }
      if (s.toRegex === !0) return r > 1 ? lno(T, s, I) : sSn(O, null, { wrap: !1, ...s });
      return O;
    },
    dno = (e, t, r = 1, s = {}) => {
      if ((!RWe(e) && e.length > 1) || (!RWe(t) && t.length > 1)) return aSn(e, t, s);
      let a = s.transform || ((D) => String.fromCharCode(D)),
        H = `${e}`.charCodeAt(0),
        u = `${t}`.charCodeAt(0),
        f = H > u,
        d = Math.min(H, u),
        _ = Math.max(H, u);
      if (s.toRegex && r === 1) return iSn(d, _, !1, s);
      let L = [],
        I = 0;
      while (f ? H >= u : H <= u) (L.push(a(H, I)), (H = f ? H - r : H + r), I++);
      if (s.toRegex === !0) return sSn(L, null, { wrap: !1, options: s });
      return L;
    },
    nLt = (e, t, r, s = {}) => {
      if (t == null && Qsr(e)) return [e];
      if (!Qsr(e) || !Qsr(t)) return aSn(e, t, s);
      if (typeof r === "function") return nLt(e, t, 1, { transform: r });
      if (tSn(r)) return nLt(e, t, 0, r);
      let a = { ...s };
      if (a.capture === !0) a.wrap = !0;
      if (((r = r || a.step || 1), !RWe(r))) {
        if (r != null && !tSn(r)) return fno(r, a);
        return nLt(e, t, 1, r);
      }
      if (RWe(e) && RWe(t)) return pno(e, t, r, a);
      return dno(e, t, Math.max(Math.abs(r), 1), a);
    };
  HSn.exports = nLt;
});
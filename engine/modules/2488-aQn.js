
var aQn = Ie(function (nQn) {
  Object.defineProperty(nQn, "__esModule", { value: !0 });
  nQn.EXPANSION_MAX_REWRITES =
    nQn.EXPANSION_MAX_DEPTH =
    nQn.EXPANSION_MAX_LENGTH =
    nQn.EXPANSION_MAX =
      void 0;
  nQn.expand = X6o;
  var W0t = Yzn(),
    Zzn = "\x00SLASH" + Math.random() + "\x00",
    eQn = "\x00OPEN" + Math.random() + "\x00",
    XAr = "\x00CLOSE" + Math.random() + "\x00",
    tQn = "\x00COMMA" + Math.random() + "\x00",
    rQn = "\x00PERIOD" + Math.random() + "\x00",
    C6o = new RegExp(Zzn, "g"),
    w6o = new RegExp(eQn, "g"),
    k6o = new RegExp(XAr, "g"),
    O6o = new RegExp(tQn, "g"),
    U6o = new RegExp(rQn, "g"),
    N6o = /\\\\/g,
    F6o = /\\{/g,
    B6o = /\\}/g,
    R6o = /\\,/g,
    W6o = /\\\./g;
  nQn.EXPANSION_MAX = 1e5;
  nQn.EXPANSION_MAX_LENGTH = 4000000;
  nQn.EXPANSION_MAX_DEPTH = 1000;
  nQn.EXPANSION_MAX_REWRITES = 1000;
  function VAr(e) {
    return !isNaN(e) ? parseInt(e, 10) : e.charCodeAt(0);
  }
  function V6o(e) {
    return e.replace(N6o, Zzn).replace(F6o, eQn).replace(B6o, XAr).replace(R6o, tQn).replace(W6o, rQn);
  }
  function q6o(e) {
    return e.replace(C6o, "\\").replace(w6o, "{").replace(k6o, "}").replace(O6o, ",").replace(U6o, ".");
  }
  function qAr(e, t) {
    for (let r = 0; r < t.length; r++) e.push(t[r]);
  }
  function G6o(e) {
    let t = [],
      r = "";
    for (;;) {
      let s = W0t.balanced("{", "}", e);
      if (!s) {
        let d = e.split(",");
        return ((d[0] = r + d[0]), qAr(t, d), t);
      }
      let { pre: a, body: H, post: u } = s,
        f = a.split(",");
      if (((f[0] = r + f[0]), (f[f.length - 1] += "{" + H + "}"), !u.length)) return (qAr(t, f), t);
      ((r = f.pop()), qAr(t, f), (e = u));
    }
  }
  function X6o(e, t = {}) {
    if (!e) return [];
    let {
      max: r = nQn.EXPANSION_MAX,
      maxLength: s = nQn.EXPANSION_MAX_LENGTH,
      maxDepth: a = nQn.EXPANSION_MAX_DEPTH,
      maxRewrites: H = nQn.EXPANSION_MAX_REWRITES,
    } = t;
    if (e.slice(0, 2) === "{}") e = "\\{\\}" + e.slice(2);
    return GAr(V6o(e), r, s, a, 0, H, !0).map(q6o);
  }
  function J6o(e) {
    return "{" + e + "}";
  }
  function K6o(e) {
    return /^-?0\d/.test(e);
  }
  function z6o(e, t) {
    return e <= t;
  }
  function Q6o(e, t) {
    return e >= t;
  }
  function M7e(e, t, r, s, a, H) {
    let u = [],
      f = 0;
    for (let d = 0; d < e.length; d++)
      for (let _ = 0; _ < r.length; _++) {
        if (u.length >= s) return u;
        let L = e[d] + t + r[_];
        if (H && !L) continue;
        if (f + L.length > a) return u;
        (u.push(L), (f += L.length));
      }
    return u;
  }
  function Y6o(e, t, r, s) {
    let a = e.split(/\.\./),
      H = [];
    if (a[0] === void 0 || a[1] === void 0) return H;
    let u = VAr(a[0]),
      f = VAr(a[1]),
      d = Math.max(a[0].length, a[1].length),
      _ = a.length === 3 && a[2] !== void 0 ? Math.max(Math.abs(VAr(a[2])), 1) : 1,
      L = z6o;
    if (f < u) ((_ *= -1), (L = Q6o));
    let D = a.some(K6o),
      S = 0;
    for (let T = u; L(T, f) && H.length < r; T += _) {
      let C;
      if (t) {
        if (((C = String.fromCharCode(T)), C === "\\")) C = "";
      } else if (((C = String(T)), D)) {
        let O = d - C.length;
        if (O > 0) {
          let B = Array(O + 1).join("0");
          if (T < 0) C = "-" + B + C.slice(1);
          else C = B + C;
        }
      }
      if (S + C.length > s) break;
      (H.push(C), (S += C.length));
    }
    return H;
  }
  function GAr(e, t, r, s, a, H, u) {
    if (a > s) return [e];
    let f = [""],
      d = 0,
      _ = !1,
      L = !0;
    for (;;) {
      let I = W0t.balanced("{", "}", e);
      if (!I) return M7e(f, e, [""], t, r, _);
      let D = I.pre;
      if (/\$$/.test(D)) {
        if (((f = M7e(f, D + "{" + I.body + "}", [""], t, r, _ && !I.post.length)), (L = !1), !I.post.length))
          break;
        e = I.post;
        continue;
      }
      let S = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(I.body),
        T = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(I.body),
        C = S || T,
        O = I.body.indexOf(",") >= 0;
      if (!C && !O) {
        if (d < H && I.post.match(/,(?!,).*\}/)) {
          (d++, (e = I.pre + "{" + I.body + XAr + I.post), (u = !0));
          continue;
        }
        return M7e(f, D + "{" + I.body + "}" + I.post, [""], t, r, _);
      }
      if (L) ((_ = u && !C), (L = !1));
      let B;
      if (C) B = Y6o(I.body, T, t, r);
      else {
        let V = G6o(I.body);
        if (V.length === 1 && V[0] !== void 0) {
          if (((V = GAr(V[0], t, r, s, a + 1, H, !1).map(J6o)), V.length === 1)) {
            if (((f = M7e(f, D + V[0], [""], t, r, _ && !I.post.length)), !I.post.length)) break;
            e = I.post;
            continue;
          }
        }
        let q = _ && !I.post.length && !D;
        for (let se = 0; q && se < f.length; se++) if (f[se]) q = !1;
        B = [];
        let Z = 0;
        e: for (let se = 0; se < V.length; se++) {
          let ae = GAr(V[se], t, r, s, a + 1, H, !1);
          for (let z = 0; z < ae.length; z++) {
            let Ae = ae[z];
            if (q && !Ae) continue;
            if (B.length >= t || Z + Ae.length > r) break e;
            (B.push(Ae), (Z += Ae.length));
          }
        }
      }
      if (((f = M7e(f, D, B, t, r, _ && !I.post.length)), !I.post.length)) break;
      e = I.post;
    }
    return f;
  }
});
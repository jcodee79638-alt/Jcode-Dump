
var tVn = Ie(function (ZWn) {
  Object.defineProperty(ZWn, "__esModule", { value: !0 });
  ZWn.merge = void 0;
  var Mgt = KWn(),
    Lvo = 20;
  function $vo(...e) {
    let t = e.shift(),
      r = new WeakMap();
    while (e.length > 0) t = QWn(t, e.shift(), 0, r);
    return t;
  }
  ZWn.merge = $vo;
  function lcr(e) {
    if (xgt(e)) return e.slice();
    return e;
  }
  function QWn(e, t, r = 0, s) {
    let a;
    if (r > Lvo) return;
    if ((r++, ygt(e) || ygt(t) || YWn(t))) a = lcr(t);
    else if (xgt(e)) {
      if (((a = e.slice()), xgt(t))) for (let H = 0, u = t.length; H < u; H++) a.push(lcr(t[H]));
      else if (YVe(t)) {
        let H = Object.keys(t);
        for (let u = 0, f = H.length; u < f; u++) {
          let d = H[u];
          if (d === "__proto__" || d === "constructor" || d === "prototype") continue;
          a[d] = lcr(t[d]);
        }
      }
    } else if (YVe(e))
      if (YVe(t)) {
        if (!gvo(e, t)) return t;
        a = Object.assign({}, e);
        let H = Object.keys(t);
        for (let u = 0, f = H.length; u < f; u++) {
          let d = H[u];
          if (d === "__proto__" || d === "constructor" || d === "prototype") continue;
          let _ = t[d];
          if (ygt(_))
            if (typeof _ > "u") delete a[d];
            else a[d] = _;
          else {
            let L = a[d],
              I = _;
            if (zWn(e, d, s) || zWn(t, d, s)) delete a[d];
            else {
              if (YVe(L) && YVe(I)) {
                let D = s.get(L) || [],
                  S = s.get(I) || [];
                (D.push({ obj: e, key: d }), S.push({ obj: t, key: d }), s.set(L, D), s.set(I, S));
              }
              a[d] = QWn(a[d], _, r, s);
            }
          }
        }
      } else a = t;
    return a;
  }
  function zWn(e, t, r) {
    let s = r.get(e[t]) || [];
    for (let a = 0, H = s.length; a < H; a++) {
      let u = s[a];
      if (u.key === t && u.obj === e) return !0;
    }
    return !1;
  }
  function xgt(e) {
    return Array.isArray(e);
  }
  function YWn(e) {
    return typeof e === "function";
  }
  function YVe(e) {
    return !ygt(e) && !xgt(e) && !YWn(e) && typeof e === "object";
  }
  function ygt(e) {
    return (
      typeof e === "string" ||
      typeof e === "number" ||
      typeof e === "boolean" ||
      typeof e > "u" ||
      e instanceof Date ||
      e instanceof RegExp ||
      e === null
    );
  }
  function gvo(e, t) {
    if (!Mgt.isPlainObject(e) || !Mgt.isPlainObject(t)) return !1;
    return !0;
  }
});
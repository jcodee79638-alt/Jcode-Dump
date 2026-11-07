
var sAr = Ie(function (wcc, sJn) {
  var { hasOwnProperty: nAr } = Object.prototype,
    iAr = (e, t = {}) => {
      if (typeof t === "string") t = { section: t };
      ((t.align = t.align === !0),
        (t.newline = t.newline === !0),
        (t.sort = t.sort === !0),
        (t.whitespace = t.whitespace === !0 || t.align === !0),
        (t.platform = t.platform || (typeof process < "u" && "win32")),
        (t.bracketedArray = t.bracketedArray !== !1));
      let r =
          t.platform === "win32"
            ? `\r
`
            : `
`,
        s = t.whitespace ? " = " : "=",
        a = [],
        H = t.sort ? Object.keys(e).sort() : Object.keys(e),
        u = 0;
      if (t.align)
        u = GY(
          H.filter((_) => e[_] === null || Array.isArray(e[_]) || typeof e[_] !== "object")
            .map((_) => (Array.isArray(e[_]) ? `${_}[]` : _))
            .concat([""])
            .reduce((_, L) => (GY(_).length >= GY(L).length ? _ : L)),
        ).length;
      let f = "",
        d = t.bracketedArray ? "[]" : "";
      for (let _ of H) {
        let L = e[_];
        if (L && Array.isArray(L)) for (let I of L) f += GY(`${_}${d}`).padEnd(u, " ") + s + GY(I) + r;
        else if (L && typeof L === "object") a.push(_);
        else f += GY(_).padEnd(u, " ") + s + GY(L) + r;
      }
      if (t.section && f.length) f = "[" + GY(t.section) + "]" + (t.newline ? r + r : r) + f;
      for (let _ of a) {
        let L = nJn(_, ".").join("\\."),
          I = (t.section ? t.section + "." : "") + L,
          D = iAr(e[_], { ...t, section: I });
        if (f.length && D.length) f += r;
        f += D;
      }
      return f;
    };
  function nJn(e, t) {
    var r = 0,
      s = 0,
      a = 0,
      H = [];
    do
      if (((a = e.indexOf(t, r)), a !== -1)) {
        if (((r = a + t.length), a > 0 && e[a - 1] === "\\")) continue;
        (H.push(e.slice(s, a)), (s = a + t.length));
      }
    while (a !== -1);
    return (H.push(e.slice(s)), H);
  }
  var rJn = (e, t = {}) => {
      t.bracketedArray = t.bracketedArray !== !1;
      let r = Object.create(null),
        s = r,
        a = null,
        H = /^\[([^\]]*)\]\s*$|^([^=]+)(=(.*))?$/i,
        u = e.split(/[\r\n]+/g),
        f = {};
      for (let _ of u) {
        if (!_ || _.match(/^\s*[;#]/) || _.match(/^\s*$/)) continue;
        let L = _.match(H);
        if (!L) continue;
        if (L[1] !== void 0) {
          if (((a = y0t(L[1])), a === "__proto__")) {
            s = Object.create(null);
            continue;
          }
          s = r[a] = r[a] || Object.create(null);
          continue;
        }
        let I = y0t(L[2]),
          D;
        if (t.bracketedArray) D = I.length > 2 && I.slice(-2) === "[]";
        else ((f[I] = (f?.[I] || 0) + 1), (D = f[I] > 1));
        let S = D && I.endsWith("[]") ? I.slice(0, -2) : I;
        if (S === "__proto__") continue;
        let T = L[3] ? y0t(L[4]) : !0,
          C = T === "true" || T === "false" || T === "null" ? JSON.parse(T) : T;
        if (D) {
          if (!nAr.call(s, S)) s[S] = [];
          else if (!Array.isArray(s[S])) s[S] = [s[S]];
        }
        if (Array.isArray(s[S])) s[S].push(C);
        else s[S] = C;
      }
      let d = [];
      for (let _ of Object.keys(r)) {
        if (!nAr.call(r, _) || typeof r[_] !== "object" || Array.isArray(r[_])) continue;
        let L = nJn(_, ".");
        s = r;
        let I = L.pop(),
          D = I.replace(/\\\./g, ".");
        for (let S of L) {
          if (S === "__proto__") continue;
          if (!nAr.call(s, S) || typeof s[S] !== "object") s[S] = Object.create(null);
          s = s[S];
        }
        if (s === r && D === I) continue;
        ((s[D] = r[_]), d.push(_));
      }
      for (let _ of d) delete r[_];
      return r;
    },
    iJn = (e) => (e.startsWith('"') && e.endsWith('"')) || (e.startsWith("'") && e.endsWith("'")),
    GY = (e) => {
      if (
        typeof e !== "string" ||
        e.match(/[=\r\n]/) ||
        e.match(/^\[/) ||
        (e.length > 1 && iJn(e)) ||
        e !== e.trim()
      )
        return JSON.stringify(e);
      return e.split(";").join("\\;").split("#").join("\\#");
    },
    y0t = (e) => {
      if (((e = (e || "").trim()), iJn(e))) {
        if (e.charAt(0) === "'") e = e.slice(1, -1);
        try {
          e = JSON.parse(e);
        } catch {}
      } else {
        let t = !1,
          r = "";
        for (let s = 0, a = e.length; s < a; s++) {
          let H = e.charAt(s);
          if (t) {
            if ("\\;#".indexOf(H) !== -1) r += H;
            else r += "\\" + H;
            t = !1;
          } else if (";#".indexOf(H) !== -1) break;
          else if (H === "\\") t = !0;
          else r += H;
        }
        if (t) r += "\\";
        return r.trim();
      }
      return e;
    };
  sJn.exports = { parse: rJn, decode: rJn, stringify: iAr, encode: iAr, safe: GY, unsafe: y0t };
});
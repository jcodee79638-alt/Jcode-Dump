
var ZSn = Ie(function (HXH, YSn) {
  /*!
   * is-glob <https://github.com/jonschlinkert/is-glob>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   */ var _io = zSn(),
    QSn = { "{": "}", "(": ")", "[": "]" },
    hio = function (e) {
      if (e[0] === "!") return !0;
      var t = 0,
        r = -2,
        s = -2,
        a = -2,
        H = -2,
        u = -2;
      while (t < e.length) {
        if (e[t] === "*") return !0;
        if (e[t + 1] === "?" && /[\].+)]/.test(e[t])) return !0;
        if (s !== -1 && e[t] === "[" && e[t + 1] !== "]") {
          if (s < t) s = e.indexOf("]", t);
          if (s > t) {
            if (u === -1 || u > s) return !0;
            if (((u = e.indexOf("\\", t)), u === -1 || u > s)) return !0;
          }
        }
        if (a !== -1 && e[t] === "{" && e[t + 1] !== "}") {
          if (((a = e.indexOf("}", t)), a > t)) {
            if (((u = e.indexOf("\\", t)), u === -1 || u > a)) return !0;
          }
        }
        if (H !== -1 && e[t] === "(" && e[t + 1] === "?" && /[:!=]/.test(e[t + 2]) && e[t + 3] !== ")") {
          if (((H = e.indexOf(")", t)), H > t)) {
            if (((u = e.indexOf("\\", t)), u === -1 || u > H)) return !0;
          }
        }
        if (r !== -1 && e[t] === "(" && e[t + 1] !== "|") {
          if (r < t) r = e.indexOf("|", t);
          if (r !== -1 && e[r + 1] !== ")") {
            if (((H = e.indexOf(")", r)), H > r)) {
              if (((u = e.indexOf("\\", r)), u === -1 || u > H)) return !0;
            }
          }
        }
        if (e[t] === "\\") {
          var f = e[t + 1];
          t += 2;
          var d = QSn[f];
          if (d) {
            var _ = e.indexOf(d, t);
            if (_ !== -1) t = _ + 1;
          }
          if (e[t] === "!") return !0;
        } else t++;
      }
      return !1;
    },
    Lio = function (e) {
      if (e[0] === "!") return !0;
      var t = 0;
      while (t < e.length) {
        if (/[*?{}()[\]]/.test(e[t])) return !0;
        if (e[t] === "\\") {
          var r = e[t + 1];
          t += 2;
          var s = QSn[r];
          if (s) {
            var a = e.indexOf(s, t);
            if (a !== -1) t = a + 1;
          }
          if (e[t] === "!") return !0;
        } else t++;
      }
      return !1;
    };
  YSn.exports = function (t, r) {
    if (typeof t !== "string" || t === "") return !1;
    if (_io(t)) return !0;
    var s = hio;
    if (r && r.strict === !1) s = Lio;
    return s(t);
  };
});
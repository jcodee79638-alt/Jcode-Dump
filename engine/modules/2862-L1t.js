
var L1t = Ie(function (ZLc, qhi) {
  /*! https://mths.be/cssesc v3.0.0 by @mathias */ var $ia = {},
    gia = $ia.hasOwnProperty,
    Eia = function (t, r) {
      if (!t) return r;
      var s = {};
      for (var a in r) s[a] = gia.call(t, a) ? t[a] : r[a];
      return s;
    },
    Iia = /[ -,\.\/:-@\[-\^`\{-~]/,
    Dia = /[ -,\.\/:-@\[\]\^`\{-~]/,
    yia = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g,
    g_r = function e(t, r) {
      if (((r = Eia(r, e.options)), r.quotes != "single" && r.quotes != "double")) r.quotes = "single";
      var s = r.quotes == "double" ? '"' : "'",
        a = r.isIdentifier,
        H = t.charAt(0),
        u = "",
        f = 0,
        d = t.length;
      while (f < d) {
        var _ = t.charAt(f++),
          L = _.charCodeAt(),
          I = void 0;
        if (L < 32 || L > 126) {
          if (L >= 55296 && L <= 56319 && f < d) {
            var D = t.charCodeAt(f++);
            if ((D & 64512) == 56320) L = ((L & 1023) << 10) + (D & 1023) + 65536;
            else f--;
          }
          I = "\\" + L.toString(16).toUpperCase() + " ";
        } else if (r.escapeEverything)
          if (Iia.test(_)) I = "\\" + _;
          else I = "\\" + L.toString(16).toUpperCase() + " ";
        else if (/[\t\n\f\r\x0B]/.test(_)) I = "\\" + L.toString(16).toUpperCase() + " ";
        else if (_ == "\\" || (!a && ((_ == '"' && s == _) || (_ == "'" && s == _))) || (a && Dia.test(_)))
          I = "\\" + _;
        else I = _;
        u += I;
      }
      if (a) {
        if (/^-[-\d]/.test(u)) u = "\\-" + u.slice(1);
        else if (/\d/.test(H)) u = "\\3" + H + " " + u.slice(1);
      }
      if (
        ((u = u.replace(yia, function (S, T, C) {
          if (T && T.length % 2) return S;
          return (T || "") + C;
        })),
        !a && r.wrap)
      )
        return s + u + s;
      return u;
    };
  g_r.options = { escapeEverything: !1, isIdentifier: !1, quotes: "single", wrap: !1 };
  g_r.version = "3.0.0";
  qhi.exports = g_r;
});
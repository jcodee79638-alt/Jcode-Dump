
var ZAr = Ie(function (PQn) {
  Object.defineProperty(PQn, "__esModule", { value: !0 });
  PQn.unescape = void 0;
  var _8o = (e, { windowsPathsNoEscape: t = !1, magicalBraces: r = !0 } = {}) => {
    if (r)
      return t
        ? e.replace(/\[([^/\\])\]/g, "$1")
        : e.replace(/((?!\\).|^)\[([^/\\])\]/g, "$1$2").replace(/\\([^/])/g, "$1");
    return t
      ? e.replace(/\[([^/\\{}])\]/g, "$1")
      : e.replace(/((?!\\).|^)\[([^/\\{}])\]/g, "$1$2").replace(/\\([^/{}])/g, "$1");
  };
  PQn.unescape = _8o;
});
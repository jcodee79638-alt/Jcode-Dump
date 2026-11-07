
var YAr = Ie(function (bQn) {
  Object.defineProperty(bQn, "__esModule", { value: !0 });
  bQn.escape = void 0;
  var m8o = (e, { windowsPathsNoEscape: t = !1, magicalBraces: r = !1 } = {}) => {
    if (r) return t ? e.replace(/[?*()[\]{}]/g, "[$&]") : e.replace(/[?*()[\]\\{}]/g, "\\$&");
    return t ? e.replace(/[?*()[\]]/g, "[$&]") : e.replace(/[?*()[\]\\]/g, "\\$&");
  };
  bQn.escape = m8o;
});
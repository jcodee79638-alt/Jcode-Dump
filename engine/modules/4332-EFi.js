
var EFi = Ie(function (gFi) {
  Object.defineProperty(gFi, "__esModule", { value: !0 });
  function $Fi(e) {
    let t = e.length,
      r = 0,
      s = 0,
      a;
    while (s < t)
      if ((r++, (a = e.charCodeAt(s++)), a >= 55296 && a <= 56319 && s < t)) {
        if (((a = e.charCodeAt(s)), (a & 64512) === 56320)) s++;
      }
    return r;
  }
  gFi.default = $Fi;
  $Fi.code = 'require("ajv/dist/runtime/ucs2length").default';
});
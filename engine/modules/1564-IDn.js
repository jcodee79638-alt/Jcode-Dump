
var IDn = Ie(function (Z3H, EDn) {
  var B_t = cr("path"),
    gDn = _Dn(),
    uQs = LDn();
  function $Dn(e, t) {
    let r = e.options.env || process.env,
      s = process.cwd(),
      a = e.options.cwd != null,
      H = a && process.chdir !== void 0 && !process.chdir.disabled;
    if (H)
      try {
        process.chdir(e.options.cwd);
      } catch (f) {}
    let u;
    try {
      u = gDn.sync(e.command, { path: r[uQs({ env: r })], pathExt: t ? B_t.delimiter : void 0 });
    } catch (f) {
    } finally {
      if (H) process.chdir(s);
    }
    if (u) u = B_t.resolve(a ? e.options.cwd : "", u);
    return u;
  }
  function lQs(e) {
    return $Dn(e) || $Dn(e, !0);
  }
  EDn.exports = lQs;
});
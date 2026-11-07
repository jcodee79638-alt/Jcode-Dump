
var Mti = Ie(function (nfc, yti) {
  var { resolve: xlr } = cr("path"),
    { tmpdir: L2o, homedir: $2o } = cr("os");
  yti.exports = (e = !1) => {
    let t = L2o(),
      r = process.getuid ? process.getuid() : process.pid,
      s = $2o() || xlr(t, "npm-" + r),
      a = e || "win32",
      H = a === "win32" ? "npm-cache" : ".npm",
      u = (a === "win32" && process.env.LOCALAPPDATA) || s;
    return { cacache: xlr(u, H, "_cacache"), tufcache: xlr(u, H, "_tuf") };
  };
});
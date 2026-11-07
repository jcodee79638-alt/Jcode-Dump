
var lDn = Ie(function (z3H, uDn) {
  var K3H = cr("fs"),
    Hir;
  Hir = ADn();
  uDn.exports = cir;
  cir.sync = cQs;
  function cir(e, t, r) {
    if (typeof t === "function") ((r = t), (t = {}));
    if (!r) {
      if (typeof Promise !== "function") throw TypeError("callback not provided");
      return new Promise(function (s, a) {
        cir(e, t || {}, function (H, u) {
          if (H) a(H);
          else s(u);
        });
      });
    }
    Hir(e, t || {}, function (s, a) {
      if (s) {
        if (s.code === "EACCES" || (t && t.ignoreErrors)) ((s = null), (a = !1));
      }
      r(s, a);
    });
  }
  function cQs(e, t) {
    try {
      return Hir.sync(e, t || {});
    } catch (r) {
      if ((t && t.ignoreErrors) || r.code === "EACCES") return !1;
      else throw r;
    }
  }
});

var ADn = Ie(function (J3H, cDn) {
  cDn.exports = HDn;
  HDn.sync = HQs;
  var oDn = cr("fs");
  function aQs(e, t) {
    var r = t.pathExt !== void 0 ? t.pathExt : process.env.PATHEXT;
    if (!r) return !0;
    if (((r = r.split(";")), r.indexOf("") !== -1)) return !0;
    for (var s = 0; s < r.length; s++) {
      var a = r[s].toLowerCase();
      if (a && e.substr(-a.length).toLowerCase() === a) return !0;
    }
    return !1;
  }
  function aDn(e, t, r) {
    if (!e.isSymbolicLink() && !e.isFile()) return !1;
    return aQs(t, r);
  }
  function HDn(e, t, r) {
    oDn.stat(e, function (s, a) {
      r(s, s ? !1 : aDn(a, e, t));
    });
  }
  function HQs(e, t) {
    return aDn(oDn.statSync(e), e, t);
  }
});
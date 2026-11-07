
var Jxi = Ie(function (pga) {
  var Vxi = $Ge(),
    qxi = Bxt(),
    gbc = Vgr(),
    Gxi = Wgr();
  pga.createDOMImplementation = function () {
    return new Vxi(null);
  };
  pga.createDocument = function (e, t) {
    if (e || t) {
      var r = new qxi();
      return (r.parse(e || "", !0), r.document());
    }
    return new Vxi(null).createHTMLDocument("");
  };
  pga.createIncrementalHTMLParser = function () {
    var e = new qxi();
    return {
      write: function (t) {
        if (t.length > 0)
          e.parse(t, !1, function () {
            return !0;
          });
      },
      end: function (t) {
        e.parse(t || "", !0, function () {
          return !0;
        });
      },
      process: function (t) {
        return e.parse("", !1, t);
      },
      document: function () {
        return e.document();
      },
    };
  };
  pga.createWindow = function (e, t) {
    var r = pga.createDocument(e);
    if (t !== void 0) r._address = t;
    return new Gxi.Window(r);
  };
  pga.impl = Gxi;
});
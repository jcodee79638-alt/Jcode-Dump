
var $Ge = Ie(function (mbc, wxi) {
  wxi.exports = Cxi;
  var jxi = jxt(),
    Pxi = Cxt(),
    iga = Bxt(),
    Rxt = kD(),
    sga = _xt();
  function Cxi(e) {
    this.contextObject = e;
  }
  var oga = {
    xml: { "": !0, "1.0": !0, "2.0": !0 },
    core: { "": !0, "2.0": !0 },
    html: { "": !0, "1.0": !0, "2.0": !0 },
    xhtml: { "": !0, "1.0": !0, "2.0": !0 },
  };
  Cxi.prototype = {
    hasFeature: function (t, r) {
      var s = oga[(t || "").toLowerCase()];
      return (s && s[r || ""]) || !1;
    },
    createDocumentType: function (t, r, s) {
      if (!sga.isValidQName(t)) Rxt.InvalidCharacterError();
      return new Pxi(this.contextObject, t, r, s);
    },
    createDocument: function (t, r, s) {
      var a = new jxi(!1, null),
        H;
      if (r) H = a.createElementNS(t, r);
      else H = null;
      if (s) a.appendChild(s);
      if (H) a.appendChild(H);
      if (t === Rxt.NAMESPACE.HTML) a._contentType = "application/xhtml+xml";
      else if (t === Rxt.NAMESPACE.SVG) a._contentType = "image/svg+xml";
      else a._contentType = "application/xml";
      return a;
    },
    createHTMLDocument: function (t) {
      var r = new jxi(!0, null);
      r.appendChild(new Pxi(r, "html"));
      var s = r.createElement("html");
      r.appendChild(s);
      var a = r.createElement("head");
      if ((s.appendChild(a), t !== void 0)) {
        var H = r.createElement("title");
        (a.appendChild(H), H.appendChild(r.createTextNode(t)));
      }
      return (s.appendChild(r.createElement("body")), (r.modclock = 1), r);
    },
    mozSetOutputMutationHandler: function (e, t) {
      e.mutationHandler = t;
    },
    mozGetInputMutationHandler: function (e) {
      Rxt.nyi();
    },
    mozHTMLParser: iga,
  };
});
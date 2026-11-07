
var qri = Ie(function (PBo) {
  var Vri = "\uFEFF";
  PBo.PrependBOM = Glr;
  function Glr(e, t) {
    ((this.encoder = e), (this.addBOM = !0));
  }
  Glr.prototype.write = function (e) {
    if (this.addBOM) ((e = Vri + e), (this.addBOM = !1));
    return this.encoder.write(e);
  };
  Glr.prototype.end = function () {
    return this.encoder.end();
  };
  PBo.StripBOM = Xlr;
  function Xlr(e, t) {
    ((this.decoder = e), (this.pass = !1), (this.options = t || {}));
  }
  Xlr.prototype.write = function (e) {
    var t = this.decoder.write(e);
    if (this.pass || !t) return t;
    if (t[0] === Vri) {
      if (((t = t.slice(1)), typeof this.options.stripBOM === "function")) this.options.stripBOM();
    }
    return ((this.pass = !0), t);
  };
  Xlr.prototype.end = function () {
    return this.decoder.end();
  };
});
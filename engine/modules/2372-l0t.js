
var l0t = Ie(function (zGn) {
  Object.defineProperty(zGn, "__esModule", { value: !0 });
  zGn.OTLPExporterError = void 0;
  class KGn extends Error {
    code;
    name = "OTLPExporterError";
    data;
    constructor(e, t, r) {
      super(e);
      ((this.data = r), (this.code = t));
    }
  }
  zGn.OTLPExporterError = KGn;
});

var $dr = Ie(function (TAi) {
  Object.defineProperty(TAi, "__esModule", { value: !0 });
  TAi.MessageSignatureBundleBuilder = void 0;
  var MAi = _dr(),
    xAi = hdr();
  class SAi extends MAi.BaseBundleBuilder {
    constructor(e) {
      super(e);
    }
    async package(e, t) {
      return xAi.toMessageSignatureBundle(e, t);
    }
  }
  TAi.MessageSignatureBundleBuilder = SAi;
});
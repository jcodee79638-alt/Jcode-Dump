
var Ldr = Ie(function (DAi) {
  Object.defineProperty(DAi, "__esModule", { value: !0 });
  DAi.DSSEBundleBuilder = void 0;
  var $Ai = Hae(),
    gAi = _dr(),
    EAi = hdr();
  class IAi extends gAi.BaseBundleBuilder {
    certificateChain;
    constructor(e) {
      super(e);
      this.certificateChain = e.certificateChain ?? !1;
    }
    async prepare(e) {
      let t = LAi(e);
      return $Ai.dsse.preAuthEncoding(t.type, t.data);
    }
    async package(e, t) {
      return EAi.toDSSEBundle(LAi(e), t, this.certificateChain);
    }
  }
  DAi.DSSEBundleBuilder = IAi;
  function LAi(e) {
    return { ...e, type: e.type ?? "" };
  }
});
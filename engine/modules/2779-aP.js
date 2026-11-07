
var aP = Ie(function (wpi) {
  Object.defineProperty(wpi, "__esModule", { value: !0 });
  wpi.PolicyError = wpi.VerificationError = void 0;
  class smr extends Error {
    code;
    cause;
    constructor({ code: e, message: t, cause: r }) {
      super(t);
      ((this.code = e), (this.cause = r), (this.name = this.constructor.name));
    }
  }
  class Ppi extends smr {}
  wpi.VerificationError = Ppi;
  class Cpi extends smr {}
  wpi.PolicyError = Cpi;
});
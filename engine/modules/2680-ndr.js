
var ndr = Ie(function (qHi) {
  Object.defineProperty(qHi, "__esModule", { value: !0 });
  qHi.ValidationError = void 0;
  class VHi extends Error {
    constructor(e, t) {
      super(e);
      this.fields = t;
    }
  }
  qHi.ValidationError = VHi;
});

var rmr = Ie(function (spi) {
  Object.defineProperty(spi, "__esModule", { value: !0 });
  spi.TUFError = void 0;
  class ipi extends Error {
    code;
    cause;
    constructor({ code: e, message: t, cause: r }) {
      super(t);
      ((this.code = e), (this.cause = r), (this.name = this.constructor.name));
    }
  }
  spi.TUFError = ipi;
});
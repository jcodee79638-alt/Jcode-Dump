
var kTe = Ie(function (kAi) {
  Object.defineProperty(kAi, "__esModule", { value: !0 });
  kAi.InternalError = void 0;
  kAi.internalError = bJo;
  var wAi = UDt();
  class gdr extends Error {
    code;
    cause;
    constructor({ code: e, message: t, cause: r }) {
      super(t);
      ((this.name = this.constructor.name), (this.cause = r), (this.code = e));
    }
  }
  kAi.InternalError = gdr;
  function bJo(e, t, r) {
    if (e instanceof wAi.HTTPError) r += ` - ${e.message}`;
    throw new gdr({ code: t, message: r, cause: e });
  }
});
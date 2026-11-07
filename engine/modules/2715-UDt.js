
var UDt = Ie(function (PAi) {
  Object.defineProperty(PAi, "__esModule", { value: !0 });
  PAi.HTTPError = void 0;
  class jAi extends Error {
    statusCode;
    location;
    constructor({ status: e, message: t, location: r }) {
      super(`(${e}) ${t}`);
      ((this.statusCode = e), (this.location = r));
    }
  }
  PAi.HTTPError = jAi;
});
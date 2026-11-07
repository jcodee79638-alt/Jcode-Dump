
var nbt = Ie(function (p9i) {
  Object.defineProperty(p9i, "__esModule", { value: !0 });
  class f9i extends Error {
    constructor(e) {
      super("validation failed");
      ((this.errors = e), (this.ajv = this.validation = !0));
    }
  }
  p9i.default = f9i;
});
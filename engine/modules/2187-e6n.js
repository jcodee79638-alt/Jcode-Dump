
var e6n = Ie(function (Ykn) {
  Object.defineProperty(Ykn, "__esModule", { value: !0 });
  Ykn.NoopContextManager = void 0;
  var zkn = qVe();
  class Qkn {
    active() {
      return zkn.ROOT_CONTEXT;
    }
    with(e, t, r, ...s) {
      return t.call(r, ...s);
    }
    bind(e, t) {
      return t;
    }
    enable() {
      return this;
    }
    disable() {
      return this;
    }
  }
  Ykn.NoopContextManager = Qkn;
});
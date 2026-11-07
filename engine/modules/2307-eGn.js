
var eGn = Ie(function (Yqn) {
  Object.defineProperty(Yqn, "__esModule", { value: !0 });
  Yqn.NoopSpanProcessor = void 0;
  class Qqn {
    onStart(e, t) {}
    onEnd(e) {}
    shutdown() {
      return Promise.resolve();
    }
    forceFlush() {
      return Promise.resolve();
    }
  }
  Yqn.NoopSpanProcessor = Qqn;
});
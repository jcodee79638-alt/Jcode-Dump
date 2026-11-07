
var Mqn = Ie(function (Dqn) {
  Object.defineProperty(Dqn, "__esModule", { value: !0 });
  Dqn.MultiSpanProcessor = void 0;
  var Eqn = bD();
  class Iqn {
    _spanProcessors;
    constructor(e) {
      this._spanProcessors = e;
    }
    forceFlush() {
      let e = [];
      for (let t of this._spanProcessors) e.push(t.forceFlush());
      return new Promise((t) => {
        Promise.all(e)
          .then(() => {
            t();
          })
          .catch((r) => {
            (Eqn.globalErrorHandler(r || Error("MultiSpanProcessor: forceFlush failed")), t());
          });
      });
    }
    onStart(e, t) {
      for (let r of this._spanProcessors) r.onStart(e, t);
    }
    onEnding(e) {
      for (let t of this._spanProcessors) if (t.onEnding) t.onEnding(e);
    }
    onEnd(e) {
      for (let t of this._spanProcessors) t.onEnd(e);
    }
    shutdown() {
      let e = [];
      for (let t of this._spanProcessors) e.push(t.shutdown());
      return new Promise((t, r) => {
        Promise.all(e).then(() => {
          t();
        }, r);
      });
    }
  }
  Dqn.MultiSpanProcessor = Iqn;
});
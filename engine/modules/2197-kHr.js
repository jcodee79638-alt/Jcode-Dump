
var kHr = Ie(function (R6n) {
  Object.defineProperty(R6n, "__esModule", { value: !0 });
  R6n.ProxyTracerProvider = void 0;
  var N6n = wHr(),
    F6n = U6n(),
    Uho = new F6n.NoopTracerProvider();
  class B6n {
    getTracer(e, t, r) {
      var s;
      return (s = this.getDelegateTracer(e, t, r)) !== null && s !== void 0
        ? s
        : new N6n.ProxyTracer(this, e, t, r);
    }
    getDelegate() {
      var e;
      return (e = this._delegate) !== null && e !== void 0 ? e : Uho;
    }
    setDelegate(e) {
      this._delegate = e;
    }
    getDelegateTracer(e, t, r) {
      var s;
      return (s = this._delegate) === null || s === void 0 ? void 0 : s.getTracer(e, t, r);
    }
  }
  R6n.ProxyTracerProvider = B6n;
});
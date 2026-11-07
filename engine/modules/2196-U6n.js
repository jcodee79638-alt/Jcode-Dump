
var U6n = Ie(function (k6n) {
  Object.defineProperty(k6n, "__esModule", { value: !0 });
  k6n.NoopTracerProvider = void 0;
  var C6n = CHr();
  class w6n {
    getTracer(e, t, r) {
      return new C6n.NoopTracer();
    }
  }
  k6n.NoopTracerProvider = w6n;
});
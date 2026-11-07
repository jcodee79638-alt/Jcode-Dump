
var aGn = Ie(function (sGn) {
  Object.defineProperty(sGn, "__esModule", { value: !0 });
  sGn.NodeTracerProvider = void 0;
  var rGn = ZHr(),
    nGn = t0t(),
    p5 = kf(),
    lSe = bD();
  function Sjo(e) {
    if (e === null) return;
    if (e === void 0) {
      let t = new rGn.AsyncLocalStorageContextManager();
      (t.enable(), p5.context.setGlobalContextManager(t));
      return;
    }
    (e.enable(), p5.context.setGlobalContextManager(e));
  }
  function Tjo(e) {
    if (e === null) return;
    if (e === void 0) {
      p5.propagation.setGlobalPropagator(
        new lSe.CompositePropagator({
          propagators: [new lSe.W3CTraceContextPropagator(), new lSe.W3CBaggagePropagator()],
        }),
      );
      return;
    }
    p5.propagation.setGlobalPropagator(e);
  }
  class iGn extends nGn.BasicTracerProvider {
    constructor(e = {}) {
      super(e);
    }
    register(e = {}) {
      (p5.trace.setGlobalTracerProvider(this), Sjo(e.contextManager), Tjo(e.propagator));
    }
  }
  sGn.NodeTracerProvider = iGn;
});
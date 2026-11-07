
var JGn = Ie(function (GGn) {
  Object.defineProperty(GGn, "__esModule", { value: !0 });
  GGn.OTLPExporterBase = void 0;
  class qGn {
    _delegate;
    constructor(e) {
      this._delegate = e;
    }
    export(e, t) {
      this._delegate.export(e, t);
    }
    forceFlush() {
      return this._delegate.forceFlush();
    }
    shutdown() {
      return this._delegate.shutdown();
    }
  }
  GGn.OTLPExporterBase = qGn;
});
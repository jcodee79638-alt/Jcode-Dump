
var qqn = Ie(function (Wqn) {
  Object.defineProperty(Wqn, "__esModule", { value: !0 });
  Wqn.InMemorySpanExporter = void 0;
  var e0t = bD();
  class Rqn {
    _finishedSpans = [];
    _stopped = !1;
    export(e, t) {
      if (this._stopped)
        return t({ code: e0t.ExportResultCode.FAILED, error: Error("Exporter has been stopped") });
      (this._finishedSpans.push(...e), setTimeout(() => t({ code: e0t.ExportResultCode.SUCCESS }), 0));
    }
    shutdown() {
      return ((this._stopped = !0), (this._finishedSpans = []), this.forceFlush());
    }
    forceFlush() {
      return Promise.resolve();
    }
    reset() {
      this._finishedSpans = [];
    }
    getFinishedSpans() {
      return this._finishedSpans;
    }
  }
  Wqn.InMemorySpanExporter = Rqn;
});
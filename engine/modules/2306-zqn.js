
var zqn = Ie(function (Jqn) {
  Object.defineProperty(Jqn, "__esModule", { value: !0 });
  Jqn.SimpleSpanProcessor = void 0;
  var Gqn = kf(),
    yoe = bD();
  class Xqn {
    _exporter;
    _shutdownOnce;
    _pendingExports;
    constructor(e) {
      ((this._exporter = e),
        (this._shutdownOnce = new yoe.BindOnceFuture(this._shutdown, this)),
        (this._pendingExports = new Set()));
    }
    async forceFlush() {
      if ((await Promise.all(Array.from(this._pendingExports)), this._exporter.forceFlush))
        await this._exporter.forceFlush();
    }
    onStart(e, t) {}
    onEnd(e) {
      if (this._shutdownOnce.isCalled) return;
      if ((e.spanContext().traceFlags & Gqn.TraceFlags.SAMPLED) === 0) return;
      let t = this._doExport(e).catch((r) => yoe.globalErrorHandler(r));
      (this._pendingExports.add(t), t.finally(() => this._pendingExports.delete(t)));
    }
    async _doExport(e) {
      if (e.resource.asyncAttributesPending) await e.resource.waitForAsyncAttributes?.();
      let t = await yoe.internal._export(this._exporter, [e]);
      if (t.code !== yoe.ExportResultCode.SUCCESS)
        throw t.error ?? Error(`SimpleSpanProcessor: span export failed (status ${t})`);
    }
    shutdown() {
      return this._shutdownOnce.call();
    }
    _shutdown() {
      return this._exporter.shutdown();
    }
  }
  Jqn.SimpleSpanProcessor = Xqn;
});
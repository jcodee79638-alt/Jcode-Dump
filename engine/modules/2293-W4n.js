
var W4n = Ie(function (B4n) {
  Object.defineProperty(B4n, "__esModule", { value: !0 });
  B4n.BatchSpanProcessorBase = void 0;
  var K2 = kf(),
    rT = bD();
  class F4n {
    _maxExportBatchSize;
    _maxQueueSize;
    _scheduledDelayMillis;
    _exportTimeoutMillis;
    _exporter;
    _isExporting = !1;
    _finishedSpans = [];
    _timer;
    _shutdownOnce;
    _droppedSpansCount = 0;
    constructor(e, t) {
      if (
        ((this._exporter = e),
        (this._maxExportBatchSize =
          typeof t?.maxExportBatchSize === "number"
            ? t.maxExportBatchSize
            : (rT.getNumberFromEnv("OTEL_BSP_MAX_EXPORT_BATCH_SIZE") ?? 512)),
        (this._maxQueueSize =
          typeof t?.maxQueueSize === "number"
            ? t.maxQueueSize
            : (rT.getNumberFromEnv("OTEL_BSP_MAX_QUEUE_SIZE") ?? 2048)),
        (this._scheduledDelayMillis =
          typeof t?.scheduledDelayMillis === "number"
            ? t.scheduledDelayMillis
            : (rT.getNumberFromEnv("OTEL_BSP_SCHEDULE_DELAY") ?? 5000)),
        (this._exportTimeoutMillis =
          typeof t?.exportTimeoutMillis === "number"
            ? t.exportTimeoutMillis
            : (rT.getNumberFromEnv("OTEL_BSP_EXPORT_TIMEOUT") ?? 30000)),
        (this._shutdownOnce = new rT.BindOnceFuture(this._shutdown, this)),
        this._maxExportBatchSize > this._maxQueueSize)
      )
        (K2.diag.warn(
          "BatchSpanProcessor: maxExportBatchSize must be smaller or equal to maxQueueSize, setting maxExportBatchSize to match maxQueueSize",
        ),
          (this._maxExportBatchSize = this._maxQueueSize));
    }
    forceFlush() {
      if (this._shutdownOnce.isCalled) return this._shutdownOnce.promise;
      return this._flushAll();
    }
    onStart(e, t) {}
    onEnd(e) {
      if (this._shutdownOnce.isCalled) return;
      if ((e.spanContext().traceFlags & K2.TraceFlags.SAMPLED) === 0) return;
      this._addToBuffer(e);
    }
    shutdown() {
      return this._shutdownOnce.call();
    }
    _shutdown() {
      return Promise.resolve()
        .then(() => this.onShutdown())
        .then(() => this._flushAll())
        .then(() => this._exporter.shutdown());
    }
    _addToBuffer(e) {
      if (this._finishedSpans.length >= this._maxQueueSize) {
        if (this._droppedSpansCount === 0) K2.diag.debug("maxQueueSize reached, dropping spans");
        this._droppedSpansCount++;
        return;
      }
      if (this._droppedSpansCount > 0)
        (K2.diag.warn(`Dropped ${this._droppedSpansCount} spans because maxQueueSize reached`),
          (this._droppedSpansCount = 0));
      (this._finishedSpans.push(e), this._maybeStartTimer());
    }
    _flushAll() {
      return new Promise((e, t) => {
        let r = [],
          s = Math.ceil(this._finishedSpans.length / this._maxExportBatchSize);
        for (let a = 0, H = s; a < H; a++) r.push(this._flushOneBatch());
        Promise.all(r)
          .then(() => {
            e();
          })
          .catch(t);
      });
    }
    _flushOneBatch() {
      if ((this._clearTimer(), this._finishedSpans.length === 0)) return Promise.resolve();
      return new Promise((e, t) => {
        let r = setTimeout(() => {
          t(Error("Timeout"));
        }, this._exportTimeoutMillis);
        K2.context.with(rT.suppressTracing(K2.context.active()), () => {
          let s;
          if (this._finishedSpans.length <= this._maxExportBatchSize)
            ((s = this._finishedSpans), (this._finishedSpans = []));
          else s = this._finishedSpans.splice(0, this._maxExportBatchSize);
          let a = () =>
              this._exporter.export(s, (u) => {
                if ((clearTimeout(r), u.code === rT.ExportResultCode.SUCCESS)) e();
                else t(u.error ?? Error("BatchSpanProcessor: span export failed"));
              }),
            H = null;
          for (let u = 0, f = s.length; u < f; u++) {
            let d = s[u];
            if (d.resource.asyncAttributesPending && d.resource.waitForAsyncAttributes)
              ((H ??= []), H.push(d.resource.waitForAsyncAttributes()));
          }
          if (H === null) a();
          else
            Promise.all(H).then(a, (u) => {
              (rT.globalErrorHandler(u), t(u));
            });
        });
      });
    }
    _maybeStartTimer() {
      if (this._isExporting) return;
      let e = () => {
        ((this._isExporting = !0),
          this._flushOneBatch()
            .finally(() => {
              if (((this._isExporting = !1), this._finishedSpans.length > 0))
                (this._clearTimer(), this._maybeStartTimer());
            })
            .catch((t) => {
              ((this._isExporting = !1), rT.globalErrorHandler(t));
            }));
      };
      if (this._finishedSpans.length >= this._maxExportBatchSize) return e();
      if (this._timer !== void 0) return;
      if (
        ((this._timer = setTimeout(() => e(), this._scheduledDelayMillis)), typeof this._timer !== "number")
      )
        this._timer.unref();
    }
    _clearTimer() {
      if (this._timer !== void 0) (clearTimeout(this._timer), (this._timer = void 0));
    }
  }
  B4n.BatchSpanProcessorBase = F4n;
});
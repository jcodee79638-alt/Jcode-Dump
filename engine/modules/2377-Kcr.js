
var Kcr = Ie(function (f5n) {
  Object.defineProperty(f5n, "__esModule", { value: !0 });
  f5n.createOtlpExportDelegate = void 0;
  var s8 = bD(),
    f0t = l0t(),
    A5n = c5n(),
    u5n = kf();
  class l5n {
    _diagLogger;
    _transport;
    _serializer;
    _responseHandler;
    _promiseQueue;
    _timeout;
    constructor(e, t, r, s, a) {
      ((this._transport = e),
        (this._serializer = t),
        (this._responseHandler = r),
        (this._promiseQueue = s),
        (this._timeout = a),
        (this._diagLogger = u5n.diag.createComponentLogger({ namespace: "OTLPExportDelegate" })));
    }
    export(e, t) {
      if ((this._diagLogger.debug("items to be sent", e), this._promiseQueue.hasReachedLimit())) {
        t({ code: s8.ExportResultCode.FAILED, error: Error("Concurrent export limit reached") });
        return;
      }
      let r = this._serializer.serializeRequest(e);
      if (r == null) {
        t({ code: s8.ExportResultCode.FAILED, error: Error("Nothing to send") });
        return;
      }
      this._promiseQueue.pushPromise(
        this._transport.send(r, this._timeout).then(
          (s) => {
            if (s.status === "success") {
              if (s.data != null)
                try {
                  this._responseHandler.handleResponse(this._serializer.deserializeResponse(s.data));
                } catch (a) {
                  this._diagLogger.warn(
                    "Export succeeded but could not deserialize response - is the response specification compliant?",
                    a,
                    s.data,
                  );
                }
              t({ code: s8.ExportResultCode.SUCCESS });
              return;
            } else if (s.status === "failure" && s.error) {
              t({ code: s8.ExportResultCode.FAILED, error: s.error });
              return;
            } else if (s.status === "retryable")
              t({
                code: s8.ExportResultCode.FAILED,
                error: s.error ?? new f0t.OTLPExporterError("Export failed with retryable status"),
              });
            else
              t({
                code: s8.ExportResultCode.FAILED,
                error: new f0t.OTLPExporterError("Export failed with unknown error"),
              });
          },
          (s) => t({ code: s8.ExportResultCode.FAILED, error: s }),
        ),
      );
    }
    forceFlush() {
      return this._promiseQueue.awaitAll();
    }
    async shutdown() {
      (this._diagLogger.debug("shutdown started"), await this.forceFlush(), this._transport.shutdown());
    }
  }
  function lPo(e, t) {
    return new l5n(
      e.transport,
      e.serializer,
      A5n.createLoggingPartialSuccessResponseHandler(),
      e.promiseHandler,
      t.timeout,
    );
  }
  f5n.createOtlpExportDelegate = lPo;
});
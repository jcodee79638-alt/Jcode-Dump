
var EXn = Ie(function ($Xn) {
  Object.defineProperty($Xn, "__esModule", { value: !0 });
  $Xn.createOtlpHttpExportDelegate = void 0;
  var mXn = Kcr(),
    _Xn = AXn(),
    hXn = Jcr(),
    LXn = dXn();
  function eCo(e, t) {
    return mXn.createOtlpExportDelegate(
      {
        transport: LXn.createRetryingTransport({ transport: _Xn.createHttpExporterTransport(e) }),
        serializer: t,
        promiseHandler: hXn.createBoundedQueueExportPromiseHandler(e),
      },
      { timeout: e.timeoutMillis },
    );
  }
  $Xn.createOtlpHttpExportDelegate = eCo;
});
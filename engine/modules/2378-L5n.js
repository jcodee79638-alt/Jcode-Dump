
var L5n = Ie(function (_5n) {
  Object.defineProperty(_5n, "__esModule", { value: !0 });
  _5n.createOtlpNetworkExportDelegate = void 0;
  var d5n = Jcr(),
    m5n = Kcr();
  function fPo(e, t, r) {
    return m5n.createOtlpExportDelegate(
      { transport: r, serializer: t, promiseHandler: d5n.createBoundedQueueExportPromiseHandler(e) },
      { timeout: e.timeoutMillis },
    );
  }
  _5n.createOtlpNetworkExportDelegate = fPo;
});
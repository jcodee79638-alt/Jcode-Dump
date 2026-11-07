
var qXn = Ie(function (WXn) {
  Object.defineProperty(WXn, "__esModule", { value: !0 });
  WXn.convertLegacyHttpOptions = void 0;
  var NXn = kf(),
    $0t = _0t(),
    FXn = eAr(),
    BXn = CXn(),
    RXn = UXn();
  function pCo(e) {
    if (typeof e.httpAgentOptions === "function") return e.httpAgentOptions;
    let t = e.httpAgentOptions;
    if (e.keepAlive != null) t = { keepAlive: e.keepAlive, ...t };
    if (t != null) return FXn.httpAgentFactoryFromOptions(t);
    else return;
  }
  function dCo(e, t, r, s) {
    if (e.metadata) NXn.diag.warn("Metadata cannot be set when using http");
    return $0t.mergeOtlpNodeHttpConfigurationWithDefaults(
      {
        url: e.url,
        headers: RXn.convertLegacyHeaders(e),
        concurrencyLimit: e.concurrencyLimit,
        timeoutMillis: e.timeoutMillis,
        compression: e.compression,
        agentFactory: pCo(e),
        userAgent: e.userAgent,
      },
      BXn.getNodeHttpConfigurationFromEnvironment(t, r),
      $0t.getNodeHttpConfigurationDefaults(s, r),
    );
  }
  WXn.convertLegacyHttpOptions = dCo;
});
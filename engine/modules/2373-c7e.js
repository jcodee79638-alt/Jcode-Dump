
var c7e = Ie(function (ZGn) {
  Object.defineProperty(ZGn, "__esModule", { value: !0 });
  ZGn.getSharedConfigurationDefaults =
    ZGn.mergeOtlpSharedConfigurationWithDefaults =
    ZGn.wrapStaticHeadersInFunction =
    ZGn.validateTimeoutMillis =
      void 0;
  function YGn(e) {
    if (Number.isFinite(e) && e > 0) return e;
    throw Error(`Configuration: timeoutMillis is invalid, expected number greater than 0 (actual: '${e}')`);
  }
  ZGn.validateTimeoutMillis = YGn;
  function rPo(e) {
    if (e == null) return;
    return async () => e;
  }
  ZGn.wrapStaticHeadersInFunction = rPo;
  function nPo(e, t, r) {
    return {
      timeoutMillis: YGn(e.timeoutMillis ?? t.timeoutMillis ?? r.timeoutMillis),
      concurrencyLimit: e.concurrencyLimit ?? t.concurrencyLimit ?? r.concurrencyLimit,
      compression: e.compression ?? t.compression ?? r.compression,
    };
  }
  ZGn.mergeOtlpSharedConfigurationWithDefaults = nPo;
  function iPo() {
    return { timeoutMillis: 1e4, concurrencyLimit: 30, compression: "none" };
  }
  ZGn.getSharedConfigurationDefaults = iPo;
});
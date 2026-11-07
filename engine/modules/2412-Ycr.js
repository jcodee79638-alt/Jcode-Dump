
var Ycr = Ie(function (yXn) {
  Object.defineProperty(yXn, "__esModule", { value: !0 });
  yXn.getSharedConfigurationFromEnvironment = void 0;
  var h0t = bD(),
    L0t = kf();
  function IXn(e) {
    let t = h0t.getNumberFromEnv(e);
    if (t != null) {
      if (Number.isFinite(t) && t > 0) return t;
      L0t.diag.warn(`Configuration: ${e} is invalid, expected number greater than 0 (actual: ${t})`);
    }
    return;
  }
  function tCo(e) {
    let t = IXn(`OTEL_EXPORTER_OTLP_${e}_TIMEOUT`),
      r = IXn("OTEL_EXPORTER_OTLP_TIMEOUT");
    return t ?? r;
  }
  function DXn(e) {
    let t = h0t.getStringFromEnv(e)?.trim();
    if (t == null || t === "none" || t === "gzip") return t;
    L0t.diag.warn(`Configuration: ${e} is invalid, expected 'none' or 'gzip' (actual: '${t}')`);
    return;
  }
  function rCo(e) {
    let t = DXn(`OTEL_EXPORTER_OTLP_${e}_COMPRESSION`),
      r = DXn("OTEL_EXPORTER_OTLP_COMPRESSION");
    return t ?? r;
  }
  function nCo(e) {
    return { timeoutMillis: tCo(e), compression: rCo(e) };
  }
  yXn.getSharedConfigurationFromEnvironment = nCo;
});
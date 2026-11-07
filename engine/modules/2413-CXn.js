
var CXn = Ie(function (jXn) {
  Object.defineProperty(jXn, "__esModule", { value: !0 });
  jXn.getNodeHttpConfigurationFromEnvironment = void 0;
  var xXn = cr("fs"),
    SXn = cr("path"),
    j1 = bD(),
    Toe = kf(),
    TXn = Ycr(),
    vXn = c7e(),
    bXn = _0t();
  function iCo(e) {
    let t = j1.getStringFromEnv(`OTEL_EXPORTER_OTLP_${e}_HEADERS`),
      r = j1.getStringFromEnv("OTEL_EXPORTER_OTLP_HEADERS"),
      s = j1.parseKeyPairsIntoRecord(t),
      a = j1.parseKeyPairsIntoRecord(r);
    if (Object.keys(s).length === 0 && Object.keys(a).length === 0) return;
    return Object.assign({}, j1.parseKeyPairsIntoRecord(r), j1.parseKeyPairsIntoRecord(t));
  }
  function sCo(e) {
    try {
      return new URL(e).toString();
    } catch {
      Toe.diag.warn(
        `Configuration: Could not parse environment-provided export URL: '${e}', falling back to undefined`,
      );
      return;
    }
  }
  function oCo(e, t) {
    try {
      new URL(e);
    } catch {
      Toe.diag.warn(
        `Configuration: Could not parse environment-provided export URL: '${e}', falling back to undefined`,
      );
      return;
    }
    if (!e.endsWith("/")) e = e + "/";
    e += t;
    try {
      new URL(e);
    } catch {
      Toe.diag.warn(
        `Configuration: Provided URL appended with '${t}' is not a valid URL, using 'undefined' instead of '${e}'`,
      );
      return;
    }
    return e;
  }
  function aCo(e) {
    let t = j1.getStringFromEnv("OTEL_EXPORTER_OTLP_ENDPOINT");
    if (t === void 0) return;
    return oCo(t, e);
  }
  function HCo(e) {
    let t = j1.getStringFromEnv(`OTEL_EXPORTER_OTLP_${e}_ENDPOINT`);
    if (t === void 0) return;
    return sCo(t);
  }
  function Zcr(e, t, r) {
    let s = j1.getStringFromEnv(e),
      a = j1.getStringFromEnv(t),
      H = s ?? a;
    if (H != null)
      try {
        return xXn.readFileSync(SXn.resolve(process.cwd(), H));
      } catch {
        Toe.diag.warn(r);
        return;
      }
    else return;
  }
  function cCo(e) {
    return Zcr(
      `OTEL_EXPORTER_OTLP_${e}_CLIENT_CERTIFICATE`,
      "OTEL_EXPORTER_OTLP_CLIENT_CERTIFICATE",
      "Failed to read client certificate chain file",
    );
  }
  function ACo(e) {
    return Zcr(
      `OTEL_EXPORTER_OTLP_${e}_CLIENT_KEY`,
      "OTEL_EXPORTER_OTLP_CLIENT_KEY",
      "Failed to read client certificate private key file",
    );
  }
  function uCo(e) {
    return Zcr(
      `OTEL_EXPORTER_OTLP_${e}_CERTIFICATE`,
      "OTEL_EXPORTER_OTLP_CERTIFICATE",
      "Failed to read root certificate file",
    );
  }
  function lCo(e, t) {
    return {
      ...TXn.getSharedConfigurationFromEnvironment(e),
      url: HCo(e) ?? aCo(t),
      headers: vXn.wrapStaticHeadersInFunction(iCo(e)),
      agentFactory: bXn.httpAgentFactoryFromOptions({ keepAlive: !0, ca: uCo(e), cert: cCo(e), key: ACo(e) }),
    };
  }
  jXn.getNodeHttpConfigurationFromEnvironment = lCo;
});
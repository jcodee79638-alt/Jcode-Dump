
var Ucr,
  uN,
  d5,
  SGn = (e) => {
    let t = {
      ...(e.attributes ?? void 0),
      [uN.ATTR_SERVICE_NAME]: e.serviceName,
      [uN.ATTR_TELEMETRY_SDK_NAME]: "@effect/opentelemetry",
      [uN.ATTR_TELEMETRY_SDK_LANGUAGE]:
        typeof globalThis.document > "u"
          ? uN.TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS
          : uN.TELEMETRY_SDK_LANGUAGE_VALUE_WEBJS,
    };
    if (e.serviceVersion) t[uN.ATTR_SERVICE_VERSION] = e.serviceVersion;
    return t;
  },
  TGn = (e) =>
    Es(
      d5,
      ft(function* () {
        let t = yield* dRe(dG("OTEL_SERVICE_NAME")),
          r = yield* dG("OTEL_RESOURCE_ATTRIBUTES").pipe(
            XQ(""),
            GQ((s) => {
              let a = s.split(",");
              return E2e(a, {}, (H, u) => {
                let f = u.split("=");
                if (f.length !== 2) return H;
                return ((H[f[0].trim()] = f[1].trim()), H);
              });
            }),
          );
        if (t._tag === "Some") r[uN.ATTR_SERVICE_NAME] = t.value;
        if (e) Object.assign(r, e);
        return Ucr.resourceFromAttributes(r);
      }).pipe(on),
    );
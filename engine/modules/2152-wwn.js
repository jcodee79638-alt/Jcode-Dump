
var wwn = ne(() => {
  Kft();
  BH();
  FM();
  Ov();
  Pwn = ni(function* (e) {
    let t = yield* Jpe(XW(JAn(re, re)), "OTEL_RESOURCE_ATTRIBUTES"),
      r =
        (yield* Jpe(XW(re), "OTEL_SERVICE_NAME")) ??
        t?.["service.name"] ??
        e?.attributes?.["service.name"] ??
        e?.serviceName ??
        (yield* dG("OTEL_SERVICE_NAME")),
      s =
        (yield* Jpe(XW(re), "OTEL_SERVICE_VERSION")) ??
        t?.["service.version"] ??
        e?.attributes?.["service.version"] ??
        e?.serviceVersion,
      a = { ...e?.attributes, ...t };
    return (
      delete a["service.name"],
      delete a["service.version"],
      S_o({ serviceName: r, serviceVersion: s, attributes: a })
    );
  }, on);
});
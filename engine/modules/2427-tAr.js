
var tAr = ne(() => {
  Gt();
  aHr();
  uw();
  HHr();
  tAr();
  ((E0t = Ad.OTEL_EXPORTER_OTLP_ENDPOINT),
    (QXn = Ad.OTEL_EXPORTER_OTLP_HEADERS
      ? Ad.OTEL_EXPORTER_OTLP_HEADERS.split(",").reduce((e, t) => {
          let [r, ...s] = t.split("=");
          return ((e[r] = s.join("=")), e);
        }, {})
      : void 0));
});
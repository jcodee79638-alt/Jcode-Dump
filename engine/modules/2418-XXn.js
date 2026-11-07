
var XXn = ne(() => {
  P5n();
  ((GXn = Tl(g5n())), (g0t = Tl(eAr())));
  u7e = class u7e extends GXn.OTLPExporterBase {
    constructor(e = {}) {
      super(
        g0t.createOtlpHttpExportDelegate(
          g0t.convertLegacyHttpOptions(e, "TRACES", "v1/traces", { "Content-Type": "application/json" }),
          p0t,
        ),
      );
    }
  };
});
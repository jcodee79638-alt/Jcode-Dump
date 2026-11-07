
var WGn,
  ePo = (e, t) =>
    Es(
      A0t,
      ft(function* () {
        let r = yield* d5;
        return yield* Bd(
          jn(
            () =>
              new WGn.NodeTracerProvider({
                ...(t ?? void 0),
                resource: r,
                spanProcessors: Array.isArray(e) ? e : [e],
              }),
          ),
          (s) =>
            nA(() => s.forceFlush().then(() => s.shutdown())).pipe(FA, S6, PQ(t?.shutdownTimeout ?? 3000)),
        );
      }),
    ),
  tPo = (e) =>
    $ie(
      ft(function* () {
        let t = yield* ug(e) ? e : jn(e),
          r = TGn(t.resource && SGn(t.resource)),
          s = r0t(t.spanProcessor)
            ? ou(FGn, ePo(t.spanProcessor, { ...t.tracerConfig, shutdownTimeout: t.shutdownTimeout }))
            : Lpe,
          a = r0t(t.metricReader)
            ? UGn(ph(t.metricReader), {
                shutdownTimeout: t.shutdownTimeout,
                temporality: t.metricTemporality,
              })
            : Lpe,
          H = r0t(t.logRecordProcessor)
            ? ou(
                vGn({ mergeWithExisting: t.loggerMergeWithExisting }),
                bGn(t.logRecordProcessor, { ...t.loggerProviderConfig, shutdownTimeout: t.shutdownTimeout }),
              )
            : Lpe;
        return VC(s, a, H).pipe(Jm(r));
      }),
    );
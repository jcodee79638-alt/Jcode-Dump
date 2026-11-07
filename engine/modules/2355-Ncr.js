
var Ncr,
  kjo = (e) => {
    switch (e) {
      case "Trace":
        return Yj.TRACE;
      case "Debug":
        return Yj.DEBUG;
      case "Info":
        return Yj.INFO;
      case "Warn":
        return Yj.WARN;
      case "Error":
        return Yj.ERROR;
      case "Fatal":
        return Yj.FATAL;
      default:
        return Yj.UNSPECIFIED;
    }
  },
  Ojo,
  vGn = (e) => Qpt([Ojo], { mergeWithExisting: e.mergeWithExisting ?? !0 }),
  bGn = (e, t) =>
    Es(
      Ncr,
      ft(function* () {
        let r = yield* d5;
        return yield* Bd(
          jn(() => new a0t({ ...(t ?? void 0), processors: Rq(e), resource: r })),
          (s) =>
            nA(() => s.forceFlush().then(() => s.shutdown())).pipe(FA, S6, PQ(t?.shutdownTimeout ?? 3000)),
        );
      }),
    );
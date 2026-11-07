
var Wjo = (e) =>
    ft(function* () {
      let t = yield* d5,
        r = yield* Qg();
      return new Fcr(t, r, e);
    }),
  Vjo = (e, t, r) =>
    Bd(
      jn(() => {
        let s = t(),
          a = Array.isArray(s) ? s : [s];
        return (a.forEach((H) => H.setMetricProducer(e)), a);
      }),
      (s) => nA(() => Promise.all(s.map((a) => a.shutdown()))).pipe(FA, S6, PQ(r?.shutdownTimeout ?? 3000)),
    ),
  UGn = (e, t) => zg(Hi(Wjo(t?.temporality), (r) => Vjo(r, e, t)));
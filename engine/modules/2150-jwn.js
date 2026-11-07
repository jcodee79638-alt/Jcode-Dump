
var jwn = ne(() => {
  Jq();
  YA();
  $6();
  BH();
  ew();
  lQt();
  Hf();
  tBe();
  fD();
  U6();
  cpt();
  T1e();
  spt();
  ((M_o = alt.pipe(
    gpe,
    ysn((e) => {
      if (S1e(e) && e.reason._tag === "StatusCodeError" && e.reason.response.status === 429) {
        let t = l2e(e.reason.response.headers["retry-after"]).pipe(
          f2e($sn),
          uD(() => 5),
        );
        return Jt(Pv(t));
      }
      return Jt(Pv(1));
    }),
  )),
    (bwn = ni(function* (e) {
      let t = yield* Qg(),
        r = Pp(t, y6),
        s = Pp(t, $f),
        a = G0(t),
        H = VKt(Ag(e.exportInterval), xU),
        u = void 0,
        f = RU(Pp(t, gy)).pipe(xRe(IA(QZt, !1)), SRe({ schedule: M_o, times: 3 })),
        d = BU({ "user-agent": `effect-opentelemetry-${e.label}/0.0.0` });
      if (e.headers) d = KQ(SE(e.headers), d);
      let _ = u2(e.url, { headers: d }),
        L = [],
        I = yH(() => {
          if (u !== void 0 && r.currentTimeMillisUnsafe() < u) return ti;
          else if (u !== void 0) u = void 0;
          let D = L;
          if (e.maxBatchSize !== "disabled") {
            if (L.length === 0) return ti;
            L = [];
          }
          return f.execute(yRe(_, e.body(D))).pipe(Qf, Gsn(!1));
        }).pipe(
          jf((D) => {
            if (u !== void 0) return ti;
            return (
              (u = r.currentTimeMillisUnsafe() + 60000),
              (L = []),
              plt("Disabling exporter for 60 seconds", D)
            );
          }),
          wU({ package: "@effect/opentelemetry", module: e.label }),
        );
      return (
        yield* UL(s, I.pipe(FA, S6, PQ(e.shutdownTimeout))),
        yield* Qq(H).pipe(Zu(I), CS, zm(s)),
        {
          push(D) {
            if (u !== void 0) return;
            if ((L.push(D), e.maxBatchSize !== "disabled" && L.length >= e.maxBatchSize)) Pj(a(I), s);
          },
        }
      );
    })));
});
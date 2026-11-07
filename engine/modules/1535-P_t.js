
var P_t = ne(() => {
  Gt();
  Cf();
  GS();
  HWe();
  P_t();
  AWe = class AWe extends _i()("@opencode/LLM/RequestExecutor") {};
  ((PIn = new RegExp(jIn, "i")),
    (Hzs = /^(key|sig)$/i),
    (CIn = new RegExp(`(?:${jIn}|key)`, "i")),
    (czs = new RegExp(`("(?:${CIn.source})"\\s*:\\s*)"[^"]*"`, "gi")),
    (Azs = new RegExp(`((?:${CIn.source})=)[^&\\s"]+`, "gi")),
    (BIn = Es(
      AWe,
      ft(function* () {
        let e = yield* gy,
          t = (r) =>
            ft(function* () {
              let s = yield* x1e;
              return yield* e.execute(r).pipe(Zo(Dzs(s)), Hi(Izs(r, s)));
            });
        return AWe.of({ execute: (r) => FIn(t(r)) });
      }),
    )),
    (YRH = BIn.pipe(ou(Apt))));
});
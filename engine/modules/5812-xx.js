
var xx = ne(() => {
  Vwt();
  Gt();
  Cf();
  $H();
  zwt();
  fes();
  ges();
  tm = class tm extends CZ()("@opencode/ExperimentalHttpApiAuthorization", { error: USi }) {};
  Nwe = class Nwe extends CZ()("@opencode/ExperimentalHttpApiPtyConnectAuthorization", { error: USi }) {};
  ((yes = Cde()(
    ft(function* () {
      let e = yield* AAe;
      if (!QQe(e)) return (t) => t;
      return (t) =>
        ft(function* () {
          let r = yield* Md,
            s = new URL(r.url, "http://localhost");
          if (les(r.method, s.pathname)) return yield* t;
          return yield* WCr(s, r).pipe(Hi((a) => lnH(t, a, e)));
        });
    }),
  )),
    (Mes = Es(
      tm,
      ft(function* () {
        let e = yield* AAe;
        if (!QQe(e)) return tm.of((t) => t);
        return tm.of((t) =>
          ft(function* () {
            let r = yield* Md;
            return yield* unH(r).pipe(Hi((s) => Des(t, s, e)));
          }),
        );
      }),
    )),
    (xes = Es(
      Nwe,
      ft(function* () {
        let e = yield* AAe;
        if (!QQe(e)) return Nwe.of((t) => t);
        return Nwe.of((t) =>
          ft(function* () {
            let r = yield* Md,
              s = new URL(r.url, "http://localhost");
            if (ues(s)) return yield* t;
            return yield* WCr(s, r).pipe(Hi((a) => Des(t, a, e)));
          }),
        );
      }),
    )));
});
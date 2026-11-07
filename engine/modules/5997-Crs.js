
var Crs = ne(async () => {
  Gt();
  $H();
  await Jn([m7(), Jy()]);
  Prs = Kd(ste, "control", (e) =>
    ft(function* () {
      let t = yield* TX,
        r = Ge("ControlHttpApi.authSet")(function* (H) {
          return (yield* t.set(H.params.providerID, H.payload).pipe(on), !0);
        }),
        s = Ge("ControlHttpApi.authRemove")(function* (H) {
          return (yield* t.remove(H.params.providerID).pipe(on), !0);
        }),
        a = Ge("ControlHttpApi.log")(function* (H) {
          return (
            yield* (
              H.payload.level === "debug"
                ? plt
                : H.payload.level === "info"
                  ? fH
                  : H.payload.level === "warn"
                    ? lp
                    : cf
            )(H.payload.message).pipe(wU(H.payload.extra ?? {})),
            !0
          );
        });
      return e.handle("authSet", r).handle("authRemove", s).handle("log", a);
    }),
  );
});
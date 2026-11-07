
var Srs = ne(async () => {
  Ql();
  pW();
  Gt();
  aL();
  Cf();
  $H();
  PMe();
  await Jn([ZL(), fL(), ikt()]);
  xrs = Kd(Wwe, "event", (e) =>
    ft(function* () {
      let t = yield* B$;
      return e.handleRaw(
        "subscribe",
        Ge("EventHttpApi.subscribe")(function* () {
          return yield* coH(t);
        }),
      );
    }),
  );
});
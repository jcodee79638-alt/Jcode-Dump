
var Uns = ne(async () => {
  Gt();
  $H();
  await Jn([KG(), tM(), ak()]);
  Ons = Kd(rm, "server.model", (e) =>
    ft(function* () {
      return e.handle(
        "model.list",
        Ge(function* () {
          let t = yield* MV;
          return yield* Rh(t.model.available());
        }),
      );
    }),
  );
});
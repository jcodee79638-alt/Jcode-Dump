
var Fns = ne(async () => {
  Gt();
  $H();
  Xy();
  await Jn([KG(), tM(), ak()]);
  Nns = Kd(rm, "server.provider", (e) =>
    ft(function* () {
      return e
        .handle(
          "provider.list",
          Ge(function* () {
            let t = yield* MV;
            return yield* Rh(t.provider.available());
          }),
        )
        .handle(
          "provider.get",
          Ge(function* (t) {
            let s = yield* (yield* MV).provider.get(t.params.providerID);
            if (!s)
              return yield* new rYe({
                providerID: t.params.providerID,
                message: `Provider not found: ${t.params.providerID}`,
              });
            return yield* Rh(Jt(s));
          }),
        );
    }),
  );
});
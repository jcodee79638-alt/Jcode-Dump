
var jrs = ne(async () => {
  o0();
  Ql();
  Gt();
  $H();
  await Jn([Vw(), Jy(), Ywe()]);
  brs = Kd(eh, "config", (e) =>
    ft(function* () {
      let t = yield* FN,
        r = yield* Eg,
        s = Ge("ConfigHttpApi.get")(function* () {
          return yield* r.get();
        }),
        a = Ge("ConfigHttpApi.update")(function* (u) {
          return (yield* r.update(u.payload), yield* _kt(yield* Jc), u.payload);
        }),
        H = Ge("ConfigHttpApi.providers")(function* () {
          let u = yield* t.list();
          return { providers: Object.values(u).map(xki), default: Ski(u) };
        });
      return e.handle("get", s).handle("update", a).handle("providers", H);
    }),
  );
});
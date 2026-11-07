
var vwr = ne(async () => {
  pW();
  Gt();
  ZQe();
  await Jn([cR(), vwr()]);
  ((boH = jn(() =>
    g$.emit("event", { directory: "global", payload: { type: Hes.Disposed.type, properties: {} } }),
  )),
    (Twr = Ge("Server.disposeAllInstancesAndEmitGlobalDisposed")(function* (e) {
      let t = yield* HR;
      yield* ft(function* () {
        (yield* e?.swallowErrors
          ? t.disposeAll().pipe(jf((r) => lp("global disposal failed", { cause: r })))
          : t.disposeAll(),
          yield* boH);
      }).pipe(BL);
    })));
});
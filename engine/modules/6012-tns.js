
var tns = ne(async () => {
  o0();
  pW();
  Gt();
  aL();
  Cf();
  $H();
  PMe();
  await Jn([L7(), fL(), UQe(), vwr(), Jy()]);
  ens = Kd(ste, "global", (e) =>
    ft(function* () {
      let t = yield* Eg,
        r = yield* d$e,
        s = yield* lee(),
        a = Ge("GlobalHttpApi.health")(function* () {
          return { healthy: !0, version: VL };
        }),
        H = Ge("GlobalHttpApi.event")(function* () {
          return yield* CoH();
        }),
        u = Ge("GlobalHttpApi.configGet")(function* () {
          return yield* t.getGlobal();
        }),
        f = Ge("GlobalHttpApi.configUpdate")(function* (L) {
          let I = yield* t.updateGlobal(L.payload);
          if (I.changed) s.fork(Twr({ swallowErrors: !0 }));
          return I.info;
        }),
        d = Ge("GlobalHttpApi.dispose")(function* () {
          return (yield* Twr(), !0);
        }),
        _ = Ge("GlobalHttpApi.upgrade")(function* (L) {
          let I = yield* r.method();
          if (I === "unknown")
            return ow({ success: !1, error: "Unknown installation method" }, { status: 400 });
          let D = L.payload.target,
            S = yield* r.upgrade(I, D).pipe(
              eu({ success: !0, version: D }),
              $s((T) => Jt({ success: !1, error: T instanceof Error ? T.message : String(T) })),
            );
          if (!S.success) return ow(S, { status: 500 });
          return (
            g$.emit("event", {
              directory: "global",
              payload: { type: KtH.Updated.type, properties: { version: D } },
            }),
            ow(S)
          );
        });
      return e
        .handle("health", a)
        .handleRaw("event", H)
        .handle("configGet", u)
        .handle("configUpdate", f)
        .handle("dispose", d)
        .handle("upgrade", _);
    }),
  );
});
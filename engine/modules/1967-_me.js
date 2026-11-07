
var _me = ne(async () => {
  Ef();
  Gt();
  OH();
  sVe();
  Ew();
  U2();
  Kj();
  await Jn([_me(), qL(), Bor()]);
  FY = class FY extends _i()("@opencode/v2/SessionStore") {};
  ((DHo = Es(
    FY,
    ft(function* () {
      let { db: e } = yield* Vd,
        t = G_(xY);
      return FY.of({
        get: Ge("SessionStore.get")(function* (r) {
          let s = yield* e.select().from(la).where(Pi(la.id, r)).get().pipe(on);
          return s ? KLt(s) : void 0;
        }),
        context: Ge("SessionStore.context")(function* (r) {
          return yield* EHo(e, r);
        }),
        runnerContext: Ge("SessionStore.runnerContext")(function* (r, s) {
          return yield* IHo(e, r, s);
        }),
        message: Ge("SessionStore.message")(function* (r) {
          let s = yield* e.select().from(dA).where(Pi(dA.id, r)).get().pipe(on);
          return s
            ? {
                sessionID: Jj.make(s.session_id),
                message: yield* t({ ...s.data, id: s.id, type: s.type }).pipe(on),
              }
            : void 0;
        }),
      });
    }),
  )),
    (oVe = iA({ service: FY, layer: DHo, deps: [DD] })));
});
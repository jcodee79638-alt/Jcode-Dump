
var FQe = ne(async () => {
  au();
  Gt();
  await Jn([e$(), FQe()]);
  NQe = class NQe extends _i()("@opencode/SessionShare") {};
  ((irH = Es(
    NQe,
    ft(function* () {
      let e = yield* Mg,
        t = Ge("SessionShare.share")(function* (a) {
          return yield* bn(Error("Session sharing has been discontinued"));
        }),
        r = Ge("SessionShare.unshare")(function* (a) {
          yield* e.setShare({ sessionID: a, share: void 0 });
        }),
        s = Ge("SessionShare.create")(function* (a) {
          return yield* e.create(a);
        });
      return NQe.of({ create: s, share: t, unshare: r });
    }),
  )),
    (EZi = Ll({ service: NQe, layer: irH, deps: [WB] })));
});
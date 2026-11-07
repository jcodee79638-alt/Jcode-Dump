
var ak = ne(async () => {
  BA();
  vV();
  Gt();
  Cf();
  $H();
  await Jn([qd(), jZ()]);
  y$e = class y$e extends CZ()("@opencode/HttpApiLocation") {};
  Ars = Es(
    y$e,
    ft(function* () {
      let e = yield* Xj;
      return y$e.of((t) =>
        ft(function* () {
          let r = yield* Md;
          return yield* t.pipe(vj(e.get(EsH(r))));
        }),
      );
    }),
  );
});
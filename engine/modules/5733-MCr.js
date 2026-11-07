
var MCr = ne(async () => {
  GQe();
  Gt();
  lb();
  await Jn([MCr(), cR()]);
  LrH = Es(
    _$e,
    ft(function* () {
      let e = yield* IT,
        t = yield* HR;
      return _$e.of({
        get: Ge("PtyEnvironment.get")(function* (r) {
          return yield* t.provide(
            { directory: r.directory },
            e.trigger("shell.env", { cwd: r.cwd }, { env: {} }).pipe(Vn((s) => s.env)),
          );
        }),
      });
    }),
  );
});
import $rH from "path";
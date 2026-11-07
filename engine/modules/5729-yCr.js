
var yCr = ne(() => {
  au();
  Gt();
  YM();
  Ql();
  yCr();
  qQe = class qQe extends _i()("@opencode/Env") {};
  ((sCA = vm(qQe)),
    (_rH = Es(
      qQe,
      ft(function* () {
        let e = yield* cx(Ge("Env.state")(() => Jt({ ...process.env }))),
          t = Ge("Env.get")((H) => ODr(e, (u) => u[H])),
          r = Ge("Env.all")(() => Eu(e)),
          s = Ge("Env.set")(function* (H, u) {
            let f = yield* Eu(e);
            f[H] = u;
          }),
          a = Ge("Env.remove")(function* (H) {
            let u = yield* Eu(e);
            delete u[H];
          });
        return qQe.of({ get: t, all: r, set: s, remove: a });
      }),
    )),
    (hrH = Ll({ service: qQe, layer: _rH, deps: [] })));
});
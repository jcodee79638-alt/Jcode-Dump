
var Eee = ne(async () => {
  au();
  Ql();
  Gt();
  _jt();
  await Jn([ZL(), Eee()]);
  ((yBa = Sxr), (J3i = xPe));
  ace = class ace extends _i()("@opencode/SessionStatus") {};
  ((MBa = Es(
    ace,
    ft(function* () {
      let e = yield* B$,
        t = yield* cx(Ge("SessionStatus.state")(() => Jt(new Map()))),
        r = Ge("SessionStatus.get")(function* (H) {
          return (yield* Eu(t)).get(H) ?? { type: "idle" };
        }),
        s = Ge("SessionStatus.list")(function* () {
          return new Map(yield* Eu(t));
        }),
        a = Ge("SessionStatus.set")(function* (H, u) {
          let f = yield* Eu(t);
          if ((yield* e.publish(J3i.Status, { sessionID: H, status: u }), u.type === "idle")) {
            (yield* e.publish(J3i.Idle, { sessionID: H }), f.delete(H));
            return;
          }
          f.set(H, u);
        });
      return ace.of({ get: r, list: s, set: a });
    }),
  )),
    (tJe = Ll({ service: ace, layer: MBa, deps: [q1] })));
});

var ET = ne(async () => {
  au();
  Ql();
  ixe();
  Gt();
  VZ();
  await Jn([ZL(), ET()]);
  X5e = Eyn;
  FB = class FB extends _i()("@opencode/Permission") {};
  zTa = Es(
    FB,
    ft(function* () {
      let e = yield* B$,
        t = yield* cx(
          Ge("Permission.state")(function* (H) {
            let u = { pending: new Map(), approved: [] };
            return (
              yield* sL(() =>
                ft(function* () {
                  for (let f of u.pending.values()) yield* I6(f.deferred, new JGe());
                  u.pending.clear();
                }),
              ),
              u
            );
          }),
        ),
        r = Ge("Permission.ask")(function* (H) {
          let { approved: u, pending: f } = yield* Eu(t),
            { ruleset: d, ..._ } = H,
            L = !1;
          for (let T of _.patterns) {
            let C = IHe(_.permission, T, d, u);
            if (
              (yield* fH("evaluated", { permission: _.permission, pattern: T, action: C }),
              C.action === "deny")
            )
              return yield* new cvi({ ruleset: d.filter((O) => XG(_.permission, O.permission)) });
            if (C.action === "allow") continue;
            L = !0;
          }
          if (!L) return;
          let I = _.id ?? GG.ascending(),
            D = {
              id: I,
              sessionID: _.sessionID,
              permission: _.permission,
              patterns: _.patterns,
              metadata: _.metadata,
              always: _.always,
              tool: _.tool,
            };
          yield* fH("asking", { id: I, permission: D.permission, patterns: D.patterns });
          let S = yield* bU();
          return (
            f.set(I, { info: D, deferred: S }),
            yield* e.publish(X5e.Asked, D),
            yield* up(
              Fl(S),
              jn(() => {
                f.delete(I);
              }),
            )
          );
        }),
        s = Ge("Permission.reply")(function* (H) {
          let { approved: u, pending: f } = yield* Eu(t),
            d = f.get(H.requestID);
          if (!d) return yield* new Avi({ requestID: H.requestID });
          if (
            (f.delete(H.requestID),
            yield* e.publish(X5e.Replied, {
              sessionID: d.info.sessionID,
              requestID: d.info.id,
              reply: H.reply,
            }),
            H.reply === "reject")
          ) {
            yield* I6(d.deferred, H.message ? new Hvi({ feedback: H.message }) : new JGe());
            for (let [_, L] of f.entries()) {
              if (L.info.sessionID !== d.info.sessionID) continue;
              (f.delete(_),
                yield* e.publish(X5e.Replied, {
                  sessionID: L.info.sessionID,
                  requestID: L.info.id,
                  reply: "reject",
                }),
                yield* I6(L.deferred, new JGe()));
            }
            return;
          }
          if ((yield* D6(d.deferred, void 0), H.reply === "once")) return;
          for (let _ of d.info.always) u.push({ permission: d.info.permission, pattern: _, action: "allow" });
          for (let [_, L] of f.entries()) {
            if (L.info.sessionID !== d.info.sessionID) continue;
            if (!L.info.patterns.every((D) => IHe(L.info.permission, D, u).action === "allow")) continue;
            (f.delete(_),
              yield* e.publish(X5e.Replied, {
                sessionID: L.info.sessionID,
                requestID: L.info.id,
                reply: "always",
              }),
              yield* D6(L.deferred, void 0));
          }
        }),
        a = Ge("Permission.list")(function* () {
          let H = (yield* Eu(t)).pending;
          return Array.from(H.values(), (u) => u.info);
        });
      return FB.of({ ask: r, reply: s, list: a });
    }),
  );
  J5e = Ll({ service: FB, layer: zTa, deps: [q1] });
});
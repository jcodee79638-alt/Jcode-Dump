
var ZL = ne(async () => {
  au();
  Gw();
  pW();
  BA();
  Gt();
  await Jn([fL(), qd(), JS(), ZL()]);
  B$ = class B$ extends _i()("@opencode/EventV2Bridge") {};
  ((KTa = Es(
    B$,
    ft(function* () {
      let e = yield* lL,
        t = (s, a, H) =>
          ft(function* () {
            if (H?.location) return yield* e.publish(s, a, H);
            let u = yield* Fh;
            if (!u) return yield* e.publish(s, a, H);
            let f = yield* bI;
            return yield* e.publish(s, a, {
              ...H,
              location: new ode({
                directory: bo.make(u.directory),
                ...(f ? { workspaceID: f } : {}),
                project: { id: z_.make(u.project.id), directory: bo.make(u.worktree) },
              }),
            });
          }),
        r = yield* e.listen((s) =>
          ft(function* () {
            let a = yield* Fh,
              H = (yield* bI) ?? s.location?.workspaceID;
            if (
              (g$.emit("event", {
                directory: s.location?.directory ?? a?.directory,
                project: a?.project.id,
                workspace: H,
                payload: { id: s.id, type: s.type, properties: s.data },
              }),
              s.durable === void 0)
            )
              return;
            g$.emit("event", {
              directory: s.location?.directory ?? a?.directory,
              project: a?.project.id,
              workspace: H,
              payload: {
                type: "sync",
                syncEvent: {
                  id: s.id,
                  type: mht(s.type, s.durable.version),
                  seq: s.durable.seq,
                  aggregateID: s.durable.aggregateID,
                  data: s.data,
                },
              },
            });
          }),
        );
      return (yield* sL(() => r), B$.of({ ...e, publish: t }));
    }),
  )),
    (q1 = Ll({ service: B$, layer: KTa, deps: [zS] })));
});
import XTt from "os";

var dkt = ne(async () => {
  BA();
  Kj();
  vV();
  Ef();
  Gt();
  Cf();
  $H();
  Xy();
  await Jn([qL(), jZ(), qd(), r5()]);
  M$e = class M$e extends CZ()("@opencode/HttpApiSessionLocation", { error: [Sb, Wf] }) {};
  ((DsH = G_(Jj)),
    (urs = Es(
      M$e,
      ft(function* () {
        let { db: e } = yield* Vd,
          t = yield* Xj;
        return M$e.of((r) =>
          ft(function* () {
            let s = yield* eWe,
              a = yield* DsH(s.params.sessionID).pipe(
                Zo(() => new Sb({ message: "Invalid session ID", field: "sessionID" })),
              ),
              H = yield* e
                .select({ directory: la.directory, workspaceID: la.workspace_id })
                .from(la)
                .where(Pi(la.id, a))
                .get()
                .pipe(on);
            if (!H) return yield* new Wf({ sessionID: a, message: `Session not found: ${a}` });
            return yield* r.pipe(
              vj(
                t.get(
                  Rv.make({
                    directory: bo.make(H.directory),
                    workspaceID: H.workspaceID ? YS.make(H.workspaceID) : void 0,
                  }),
                ),
              ),
            );
          }),
        );
      }),
    )));
});
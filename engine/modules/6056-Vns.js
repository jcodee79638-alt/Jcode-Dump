
var Vns = ne(async () => {
  Gt();
  $H();
  Xy();
  await Jn([qd(), S1(), lVe(), tM(), ak()]);
  Wns = Kd(rm, "server.permission", (e) =>
    ft(function* () {
      return e
        .handle(
          "permission.request.list",
          Ge(function* () {
            return yield* Rh((yield* Cy).list());
          }),
        )
        .handle(
          "session.permission.create",
          Ge(function* (t) {
            return {
              data: yield* (yield* Cy)
                .ask({
                  id: t.payload.id,
                  sessionID: t.params.sessionID,
                  action: t.payload.action,
                  resources: t.payload.resources,
                  save: t.payload.save,
                  metadata: t.payload.metadata,
                  source: t.payload.source,
                  agent: t.payload.agent,
                })
                .pipe(
                  EA(
                    "Session.NotFoundError",
                    (s) => new Wf({ sessionID: s.sessionID, message: `Session not found: ${s.sessionID}` }),
                  ),
                ),
            };
          }),
        )
        .handle(
          "session.permission.list",
          Ge(function* (t) {
            return { data: yield* (yield* Cy).forSession(t.params.sessionID) };
          }),
        )
        .handle(
          "session.permission.get",
          Ge(function* (t) {
            let r = yield* (yield* Cy).get(t.params.requestID);
            if (!r || r.sessionID !== t.params.sessionID) return yield* Cwr(t.params.requestID);
            return { data: r };
          }),
        )
        .handle(
          "session.permission.reply",
          Ge(function* (t) {
            let r = yield* Cy,
              s = yield* r.get(t.params.requestID);
            if (!s || s.sessionID !== t.params.sessionID) return yield* Cwr(t.params.requestID);
            return (
              yield* r
                .reply({ requestID: t.params.requestID, reply: t.payload.reply, message: t.payload.message })
                .pipe(EA("PermissionV2.NotFoundError", () => Cwr(t.params.requestID))),
              lf.make()
            );
          }),
        )
        .handle(
          "permission.saved.list",
          Ge(function* (t) {
            let r = yield* bm;
            return { data: yield* (yield* hme).list({ projectID: t.query.projectID ?? r.project.id }) };
          }),
        )
        .handle(
          "permission.saved.remove",
          Ge(function* (t) {
            return (yield* (yield* hme).remove(t.params.id), lf.make());
          }),
        );
    }),
  );
});
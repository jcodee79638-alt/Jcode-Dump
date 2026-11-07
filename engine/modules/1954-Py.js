
function Py(e, t) {
  return ft(function* () {
    let r = (u) => mHo({ ...u.data, id: u.id, type: u.type }),
      s = (u) => {
        if (t.durable === void 0) return No("Durable Session event is missing aggregate sequence");
        let f = YTn(u),
          { id: d, type: _, ...L } = f;
        return e
          .update(dA)
          .set({ type: _, time_created: bj(u.time.created), data: L })
          .where(Gc(Pi(dA.id, wf.make(d)), Pi(dA.session_id, t.data.sessionID)))
          .run()
          .pipe(on);
      },
      H = {
        getCurrentAssistant() {
          return ft(function* () {
            let u = yield* e
              .select()
              .from(dA)
              .where(Gc(Pi(dA.session_id, t.data.sessionID), Pi(dA.type, "assistant")))
              .orderBy(TE(dA.seq))
              .limit(1)
              .get()
              .pipe(on);
            if (!u) return;
            let f = r(u);
            return f.type === "assistant" && !f.time.completed ? f : void 0;
          });
        },
        getAssistant(u) {
          return ft(function* () {
            let f = yield* e
              .select()
              .from(dA)
              .where(Gc(Pi(dA.id, u), Pi(dA.session_id, t.data.sessionID), Pi(dA.type, "assistant")))
              .get()
              .pipe(on);
            if (!f) return;
            let d = r(f);
            return d.type === "assistant" ? d : void 0;
          });
        },
        getCurrentShell(u) {
          return ft(function* () {
            return (yield* e
              .select()
              .from(dA)
              .where(Gc(Pi(dA.session_id, t.data.sessionID), Pi(dA.type, "shell")))
              .orderBy(TE(dA.seq))
              .all()
              .pipe(on))
              .map(r)
              .find((d) => d.type === "shell" && d.callID === u);
          });
        },
        updateAssistant: s,
        updateShell: s,
        appendMessage: (u) => LHo(e, t, u),
      };
    yield* AHo(H, t);
  });
}
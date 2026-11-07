
var Fee = ne(async () => {
  au();
  Gt();
  o0();
  await Jn([ZL(), kX(), e$(), jI(), Fee()]);
  jce = class jce extends _i()("@opencode/SessionSummary") {};
  ((l7a = Es(
    jce,
    ft(function* () {
      let e = yield* Mg,
        t = yield* jHe,
        r = yield* B$,
        s = yield* Eg,
        a = Ge("SessionSummary.computeDiff")(function* (f) {
          let d, _;
          for (let L of f.messages) {
            if (!d) {
              for (let I of L.parts)
                if (I.type === "step-start" && I.snapshot) {
                  d = I.snapshot;
                  break;
                }
            }
            for (let I of L.parts) if (I.type === "step-finish" && I.snapshot) _ = I.snapshot;
          }
          if (d && _) return yield* t.diffFull(d, _);
          return [];
        }),
        H = Ge("SessionSummary.summarize")(function* (f) {
          if (
            (yield* e.setSummary({
              sessionID: f.sessionID,
              summary: { additions: 0, deletions: 0, files: 0 },
            }),
            yield* r.publish(pb.Diff, { sessionID: f.sessionID, diff: [] }),
            (yield* s.get()).snapshot === !1)
          )
            return;
          let d = yield* e.messages({ sessionID: f.sessionID }).pipe(on);
          if (!d.length) return;
          let _ = d.filter(
              (D) =>
                D.info.id === f.messageID || (D.info.role === "assistant" && D.info.parentID === f.messageID),
            ),
            L = _.find((D) => D.info.id === f.messageID);
          if (!L || L.info.role !== "user") return;
          let I = yield* a({ messages: _ });
          ((L.info.summary = { ...L.info.summary, diffs: I }), yield* e.updateMessage(L.info));
        }),
        u = Ge("SessionSummary.diff")(function* (f) {
          if (!f.messageID) return [];
          let d = (yield* e.messages({ sessionID: f.sessionID }).pipe(on)).find(
            (L) => L.info.id === f.messageID,
          );
          if (!d || d.info.role !== "user") return [];
          return (d.info.summary?.diffs ?? []).map((L) => {
            if (L.file === void 0) return L;
            let I = u7a(L.file);
            if (I === L.file) return L;
            return { ...L, file: I };
          });
        });
      return jce.of({ summarize: H, diff: u, computeDiff: a });
    }),
  )),
    (f7a = nt({ sessionID: Ec, messageID: be(Td) })),
    (Bze = Ll({ service: jce, layer: l7a, deps: [WB, Eje, q1, Ab] })));
});
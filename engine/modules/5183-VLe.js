
var VLe = ne(async () => {
  au();
  Gt();
  await Jn([ZL(), kX(), wX(), e$(), jI(), Ace(), Fee(), VLe()]);
  T7a = nt({ sessionID: Ec, messageID: Td, partID: be(Zp) });
  vCe = class vCe extends _i()("@opencode/SessionRevert") {};
  ((v7a = Es(
    vCe,
    ft(function* () {
      let e = yield* Mg,
        t = yield* jHe,
        r = yield* cXe,
        s = yield* B$,
        a = yield* jce,
        H = yield* cce,
        u = Ge("SessionRevert.revert")(function* (_) {
          yield* H.assertNotBusy(_.sessionID);
          let L = yield* e.messages({ sessionID: _.sessionID }).pipe(on),
            I,
            D = yield* e.get(_.sessionID).pipe(on),
            S,
            T = [];
          for (let V of L) {
            if (V.info.role === "user") I = V.info;
            let q = [];
            for (let Z of V.parts) {
              if (S) {
                if (Z.type === "patch") T.push(Z);
                continue;
              }
              if (!S) {
                if ((V.info.id === _.messageID && !_.partID) || Z.id === _.partID) {
                  let se = q.some((ae) => ["text", "tool"].includes(ae.type)) ? _.partID : void 0;
                  S = { messageID: !se && I ? I.id : V.info.id, partID: se };
                }
                q.push(Z);
              }
            }
          }
          if (!S) return D;
          if (((S.snapshot = D.revert?.snapshot ?? (yield* t.track())), D.revert?.snapshot))
            yield* t.restore(D.revert.snapshot);
          if ((yield* t.revert(T), S.snapshot)) S.diff = yield* t.diff(S.snapshot);
          let C = L.findIndex((V) => V.info.id === S.messageID),
            O = C < 0 ? [] : L.slice(C),
            B = yield* a.computeDiff({ messages: O });
          return (
            yield* r.write(["session_diff", _.sessionID], B).pipe(FA),
            yield* s.publish(pb.Diff, { sessionID: _.sessionID, diff: B }),
            yield* e.setRevert({
              sessionID: _.sessionID,
              revert: S,
              summary: {
                additions: B.reduce((V, q) => V + q.additions, 0),
                deletions: B.reduce((V, q) => V + q.deletions, 0),
                files: B.length,
              },
            }),
            yield* e.get(_.sessionID).pipe(on)
          );
        }),
        f = Ge("SessionRevert.unrevert")(function* (_) {
          (yield* fH("unreverting", { sessionID: _.sessionID }), yield* H.assertNotBusy(_.sessionID));
          let L = yield* e.get(_.sessionID).pipe(on);
          if (!L.revert) return L;
          if (L.revert.snapshot) yield* t.restore(L.revert.snapshot);
          return (yield* e.clearRevert(_.sessionID), yield* e.get(_.sessionID).pipe(on));
        }),
        d = Ge("SessionRevert.cleanup")(function* (_) {
          if (!_.revert) return;
          let L = _.id,
            I = yield* e.messages({ sessionID: L }).pipe(on),
            D = _.revert.messageID,
            S = I.findIndex((O) => O.info.id === D),
            T = S < 0 ? void 0 : I[S],
            C = S < 0 ? [] : I.slice(S + (_.revert.partID ? 1 : 0));
          for (let O of C) yield* e.removeMessage({ sessionID: L, messageID: O.info.id });
          if (_.revert.partID && T) {
            let O = _.revert.partID,
              B = T.parts.findIndex((V) => V.id === O);
            if (B >= 0) {
              let V = T.parts.slice(B);
              T.parts = T.parts.slice(0, B);
              for (let q of V) yield* e.removePart({ sessionID: L, messageID: T.info.id, partID: q.id });
            }
          }
          yield* e.clearRevert(L);
        });
      return vCe.of({ revert: u, unrevert: f, cleanup: d });
    }),
  )),
    (wbr = Ll({ service: vCe, layer: v7a, deps: [WB, Eje, syr, q1, Bze, hjt] })));
});
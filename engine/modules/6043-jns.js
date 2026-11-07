
var jns = ne(async () => {
  Ql();
  w3e();
  Ef();
  Ef();
  Ef();
  Ef();
  Ef();
  Ef();
  Gt();
  $H();
  await Jn([rte(), e$(), qL(), ZL(), Jy()]);
  bns = Kd(eh, "sync", (e) =>
    ft(function* () {
      let t = yield* DR,
        r = yield* Mg,
        s = yield* $f,
        a = yield* B$,
        { db: H } = yield* Vd,
        u = Ge("SyncHttpApi.start")(function* () {
          return (yield* t.startWorkspaceSyncing((yield* Jc).project.id).pipe(FA, zm(s)), !0);
        }),
        f = Ge("SyncHttpApi.replay")(function* (L) {
          let I = L.payload.events.map((T) => ({
              id: T.id,
              aggregateID: T.aggregateID,
              seq: T.seq,
              type: T.type,
              data: { ...T.data },
            })),
            D = I[0].aggregateID;
          yield* fH("sync replay requested", {
            sessionID: D,
            events: I.length,
            first: I[0]?.seq,
            last: I.at(-1)?.seq,
            directory: L.payload.directory,
          });
          let S = yield* lje;
          return (
            yield* a.replayAll(I, { ownerID: S, strictOwner: !0 }),
            yield* fH("sync replay complete", {
              sessionID: D,
              events: I.length,
              first: I[0]?.seq,
              last: I.at(-1)?.seq,
            }),
            { sessionID: D }
          );
        }),
        d = Ge("SyncHttpApi.steal")(function* (L) {
          let I = yield* lje;
          if (!I) return yield* new PA({});
          return (
            yield* r.setWorkspace({ sessionID: L.payload.sessionID, workspaceID: I }),
            yield* fH("sync session stolen", { sessionID: L.payload.sessionID, workspaceID: I }),
            { sessionID: L.payload.sessionID }
          );
        }),
        _ = Ge("SyncHttpApi.history")(function* (L) {
          let I = Object.entries(L.payload);
          return yield* H.select()
            .from(E_)
            .where(
              I.length > 0 ? SG(K0(...I.map(([D, S]) => Gc(Pi(E_.aggregate_id, D), TG(E_.seq, S))))) : void 0,
            )
            .orderBy(Qm(E_.seq))
            .all()
            .pipe(on);
        });
      return e.handle("start", u).handle("replay", f).handle("steal", d).handle("history", _);
    }),
  );
});
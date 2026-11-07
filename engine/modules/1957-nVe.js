
var nVe = ne(async () => {
  Ef();
  Gt();
  OH();
  bV();
  N2();
  ILt();
  Ew();
  Oor();
  rVe();
  vV();
  Kj();
  await Jn([nVe(), qL(), fL()]);
  ((mHo = E1(xY)), (YTn = Kie(xY)));
  Nor = class Nor extends Error {};
  (($Ho = zg(
    ft(function* () {
      let e = yield* lL,
        { db: t } = yield* Vd;
      (yield* e.project(XL.Created, (r) =>
        ft(function* () {
          if (
            !(yield* t
              .insert(la)
              .values(QTn(r.data.info))
              .onConflictDoNothing()
              .returning({ sessionID: la.id })
              .get()
              .pipe(on))
          )
            return yield* No(new Nor());
          if (r.data.info.workspaceID)
            yield* t
              .update(x1)
              .set({ time_used: Date.now() })
              .where(Pi(x1.id, r.data.info.workspaceID))
              .run()
              .pipe(on);
        }),
      ),
        yield* e.project(XL.Updated, (r) =>
          t.update(la).set(QTn(r.data.info)).where(Pi(la.id, r.data.sessionID)).run().pipe(on),
        ),
        yield* e.project(iht, (r) =>
          ft(function* () {
            yield* t
              .update(la)
              .set({
                directory: r.data.location.directory,
                path: r.data.subdirectory,
                workspace_id: r.data.location.workspaceID ? YS.make(r.data.location.workspaceID) : null,
                time_updated: bj(r.data.timestamp),
              })
              .where(Pi(la.id, r.data.sessionID))
              .run()
              .pipe(on);
          }),
        ),
        yield* e.project(XL.Deleted, (r) => t.delete(la).where(Pi(la.id, r.data.sessionID)).run().pipe(on)),
        yield* e.project(XL.MessageUpdated, (r) =>
          ft(function* () {
            let s = r.data.info.time.created,
              a = r.data.info.id,
              H = r.data.info.sessionID,
              u = _Ho(r.data.info);
            yield* t
              .insert(tx)
              .values({ id: a, session_id: H, time_created: s, data: u })
              .onConflictDoUpdate({ target: tx.id, set: { data: u } })
              .run()
              .pipe(on);
          }),
        ),
        yield* e.project(XL.MessageRemoved, (r) =>
          ft(function* () {
            let s = yield* t
              .select()
              .from(dg)
              .where(Gc(Pi(dg.message_id, r.data.messageID), Pi(dg.session_id, r.data.sessionID)))
              .all()
              .pipe(on);
            for (let a of s) {
              let H = GLt(a.data);
              if (H) yield* XLt(t, r.data.sessionID, H, -1);
            }
            yield* t
              .delete(tx)
              .where(Gc(Pi(tx.id, r.data.messageID), Pi(tx.session_id, r.data.sessionID)))
              .run()
              .pipe(on);
          }),
        ),
        yield* e.project(XL.PartRemoved, (r) =>
          ft(function* () {
            let s = yield* t
                .select()
                .from(dg)
                .where(Gc(Pi(dg.id, r.data.partID), Pi(dg.session_id, r.data.sessionID)))
                .get()
                .pipe(on),
              a = s && GLt(s.data);
            if (a) yield* XLt(t, r.data.sessionID, a, -1);
            yield* t
              .delete(dg)
              .where(Gc(Pi(dg.id, r.data.partID), Pi(dg.session_id, r.data.sessionID)))
              .run()
              .pipe(on);
          }),
        ),
        yield* e.project(XL.PartUpdated, (r) =>
          ft(function* () {
            let s = r.data.part.id,
              a = r.data.part.messageID,
              H = r.data.part.sessionID,
              u = hHo(r.data.part),
              f = yield* t.select().from(dg).where(Pi(dg.id, s)).get().pipe(on);
            yield* t
              .insert(dg)
              .values({ id: s, message_id: a, session_id: H, time_created: r.data.time, data: u })
              .onConflictDoUpdate({ target: dg.id, set: { data: u } })
              .run()
              .pipe(on);
            let d = f && GLt(f.data),
              _ = GLt(r.data.part);
            if (d) yield* XLt(t, f.session_id, d, -1);
            if (_) yield* XLt(t, H, _);
          }),
        ),
        yield* e.project(rht, (r) =>
          t
            .update(la)
            .set({ agent: r.data.agent, time_updated: bj(r.data.timestamp) })
            .where(Pi(la.id, r.data.sessionID))
            .run()
            .pipe(on, Zu(Py(t, r))),
        ),
        yield* e.project(nht, (r) =>
          ft(function* () {
            (yield* t
              .update(la)
              .set({ model: r.data.model, time_updated: bj(r.data.timestamp) })
              .where(Pi(la.id, r.data.sessionID))
              .run()
              .pipe(on),
              yield* Py(t, r));
          }),
        ),
        yield* e.project(sht, (r) =>
          ft(function* () {
            if (r.durable === void 0) return yield* No("Durable Session event is missing aggregate sequence");
            (yield* fHo(t, {
              id: r.data.messageID,
              sessionID: r.data.sessionID,
              prompt: r.data.prompt,
              delivery: r.data.delivery,
              timeCreated: r.data.timestamp,
              promotedSeq: r.durable.seq,
            }),
              yield* Py(t, r));
          }),
        ),
        yield* e.project(oht, (r) =>
          ft(function* () {
            if (r.durable === void 0) return yield* No("Durable Session event is missing aggregate sequence");
            yield* lHo(t, {
              admittedSeq: r.durable.seq,
              id: r.data.messageID,
              sessionID: r.data.sessionID,
              prompt: r.data.prompt,
              delivery: r.data.delivery,
              timeCreated: r.data.timestamp,
            });
          }),
        ),
        yield* e.project(aht, (r) => Py(t, r)),
        yield* e.project(Tir, (r) => Py(t, r)),
        yield* e.project(Gde.Started, (r) => Py(t, r)),
        yield* e.project(Gde.Ended, (r) => Py(t, r)),
        yield* e.project(QU.Started, (r) => Py(t, r)),
        yield* e.project(QU.Ended, (r) => Py(t, r)),
        yield* e.project(QU.Failed, (r) => Py(t, r)),
        yield* e.project(gV.Started, (r) => Py(t, r)),
        yield* e.project(gV.Ended, (r) => Py(t, r)),
        yield* e.project(GL.Input.Started, (r) => Py(t, r)),
        yield* e.project(GL.Input.Ended, (r) => Py(t, r)),
        yield* e.project(GL.Called, (r) => Py(t, r)),
        yield* e.project(GL.Progress, (r) => Py(t, r)),
        yield* e.project(GL.Success, (r) => Py(t, r)),
        yield* e.project(GL.Failed, (r) => Py(t, r)),
        yield* e.project(EV.Started, (r) => Py(t, r)),
        yield* e.project(EV.Ended, (r) => Py(t, r)),
        yield* e.project(TY.Ended, (r) => Py(t, r)),
        yield* e.project(YU.Staged, (r) =>
          t
            .update(la)
            .set({
              revert: { ...r.data.revert, files: r.data.revert.files ? [...r.data.revert.files] : void 0 },
              time_updated: bj(r.data.timestamp),
            })
            .where(Pi(la.id, r.data.sessionID))
            .run()
            .pipe(on, Qf),
        ),
        yield* e.project(YU.Cleared, (r) =>
          t
            .update(la)
            .set({ revert: null, time_updated: bj(r.data.timestamp) })
            .where(Pi(la.id, r.data.sessionID))
            .run()
            .pipe(on, Qf),
        ),
        yield* e.project(YU.Committed, (r) =>
          ft(function* () {
            let s = yield* t
              .select({ seq: dA.seq })
              .from(dA)
              .where(Gc(Pi(dA.session_id, r.data.sessionID), Pi(dA.id, r.data.messageID)))
              .get()
              .pipe(on);
            if (!s) return yield* No(`Revert boundary message not found: ${r.data.messageID}`);
            (yield* t
              .delete(dA)
              .where(Gc(Pi(dA.session_id, r.data.sessionID), $D(dA.seq, s.seq)))
              .run()
              .pipe(on),
              yield* t
                .delete(Uh)
                .where(
                  Gc(
                    Pi(Uh.session_id, r.data.sessionID),
                    K0($D(Uh.admitted_seq, s.seq), $D(Uh.promoted_seq, s.seq)),
                  ),
                )
                .run()
                .pipe(on),
              yield* t
                .update(la)
                .set({ revert: null, time_updated: bj(r.data.timestamp) })
                .where(Pi(la.id, r.data.sessionID))
                .run()
                .pipe(on));
          }),
        ));
    }),
  )),
    (For = iA({ name: "session-projector", layer: $Ho, deps: [zS, DD] })));
});
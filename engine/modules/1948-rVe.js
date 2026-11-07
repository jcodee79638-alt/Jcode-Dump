
var rVe = ne(() => {
  rVe();
  Ef();
  Gt();
  BLt();
  bV();
  Ew();
  Eor();
  U2();
  Kj();
  ((GTn = E1(q6)),
    (RLt = Kie(q6)),
    (WLt = Ge("SessionInput.find")(function* (e, t) {
      let r = yield* e.select().from(Uh).where(Pi(Uh.id, t)).get().pipe(on);
      return r === void 0 ? void 0 : XTn(r);
    })));
  dme = class dme extends ki()("SessionInput.LifecycleConflict", { id: wf }) {};
  ((uHo = Ge("SessionInput.admit")(function* (e, t, r) {
    let s = yield* WLt(e, r.id);
    if (s !== void 0) return s;
    let a = yield* kU;
    return yield* t
      .publish(oht, {
        messageID: r.id,
        sessionID: r.sessionID,
        timestamp: a,
        prompt: r.prompt,
        delivery: r.delivery,
      })
      .pipe(
        Hi((H) =>
          H.durable === void 0
            ? No("Prompt admission event is missing aggregate sequence")
            : Jt(
                FLt.make({
                  admittedSeq: H.durable.seq,
                  id: r.id,
                  sessionID: r.sessionID,
                  prompt: r.prompt,
                  delivery: r.delivery,
                  timeCreated: a,
                }),
              ),
        ),
        jQ((H) => WLt(e, r.id).pipe(Hi((u) => (u ? Jt(u) : No(H))))),
      );
  })),
    (lHo = Ge("SessionInput.projectAdmitted")(function* (e, t) {
      if ((yield* e.select({ id: dA.id }).from(dA).where(Pi(dA.id, t.id)).get().pipe(on)) !== void 0)
        return yield* No(new dme({ id: t.id }));
      if (
        !(yield* e
          .insert(Uh)
          .values({
            id: t.id,
            session_id: t.sessionID,
            admitted_seq: t.admittedSeq,
            prompt: RLt(t.prompt),
            delivery: t.delivery,
            time_created: bj(t.timeCreated),
          })
          .onConflictDoNothing()
          .returning({ id: Uh.id })
          .get()
          .pipe(on))
      )
        return yield* No(new dme({ id: t.id }));
    })),
    (fHo = Ge("SessionInput.projectPrompted")(function* (e, t) {
      let r = yield* e
        .update(Uh)
        .set({ promoted_seq: t.promotedSeq })
        .where(Gc(Pi(Uh.id, t.id), Pi(Uh.session_id, t.sessionID), FS(Uh.promoted_seq)))
        .returning()
        .get()
        .pipe(on);
      if (r) {
        let a = XTn(r);
        if (!qTn(a, t)) return yield* No(new dme({ id: t.id }));
        return;
      }
      let s = yield* WLt(e, t.id);
      if (s) {
        if (!qTn(s, t) || s.promotedSeq !== t.promotedSeq) return yield* No(new dme({ id: t.id }));
        return;
      }
      yield* e
        .insert(Uh)
        .values({
          id: t.id,
          session_id: t.sessionID,
          prompt: RLt(t.prompt),
          delivery: t.delivery,
          admitted_seq: t.promotedSeq,
          promoted_seq: t.promotedSeq,
          time_created: bj(t.timeCreated),
        })
        .run()
        .pipe(on);
    })),
    (VLt = Ge("SessionInput.hasPending")(function* (e, t, r) {
      return (
        (yield* e
          .select({ id: Uh.id })
          .from(Uh)
          .where(Gc(Pi(Uh.session_id, t), FS(Uh.promoted_seq), Pi(Uh.delivery, r)))
          .limit(1)
          .get()
          .pipe(on)) !== void 0
      );
    })),
    (KTn = Ge("SessionInput.publish")(function* (e, t, r, s) {
      for (let a of s) {
        let H = wf.make(a.id);
        yield* t
          .publish(sht, {
            sessionID: r,
            timestamp: Fye(a.time_created),
            messageID: H,
            prompt: GTn(a.prompt),
            delivery: a.delivery,
          })
          .pipe(
            jQ((u) =>
              u instanceof dme ? WLt(e, H).pipe(Hi((f) => (f?.promotedSeq === void 0 ? No(u) : ti))) : No(u),
            ),
          );
      }
      return s.length;
    })),
    (zTn = Ge("SessionInput.promoteSteers")(function* (e, t, r, s) {
      let a = yield* e
        .select()
        .from(Uh)
        .where(
          Gc(Pi(Uh.session_id, r), FS(Uh.promoted_seq), Pi(Uh.delivery, "steer"), TG(Uh.admitted_seq, s)),
        )
        .orderBy(Qm(Uh.admitted_seq))
        .all()
        .pipe(on);
      return yield* KTn(e, t, r, a);
    })),
    (dHo = Ge("SessionInput.promoteNextQueued")(function* (e, t, r) {
      let s = yield* e
        .select()
        .from(Uh)
        .where(Gc(Pi(Uh.session_id, r), FS(Uh.promoted_seq), Pi(Uh.delivery, "queue")))
        .orderBy(Qm(Uh.admitted_seq))
        .limit(1)
        .get()
        .pipe(on);
      return s === void 0 ? !1 : yield* KTn(e, t, r, [s]).pipe(eu(!0));
    })));
});
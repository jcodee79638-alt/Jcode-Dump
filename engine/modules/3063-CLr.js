
var CLr = ne(async () => {
  Ef();
  Gt();
  MZ();
  iVe();
  bV();
  sVe();
  Ew();
  Kj();
  await Jn([CLr(), fL()]);
  ((sla = ni(function* (e, t, r, s) {
    let [a, H, u] = yield* Km([r, Hla(e, s), Ror(e, s)], { concurrency: "unbounded" });
    if (!H) {
      let L = yield* KEi(a),
        I = yield* $Ii(e, s, L);
      return { baseline: L.baseline, baselineSeq: I };
    }
    let f = yield* G_(wua)(H.snapshot).pipe(Zo((L) => new zLt({ sessionID: s, details: String(L) }))),
      d = u !== void 0 && u.seq > H.baseline_seq ? u.seq : void 0,
      _ = d ? yield* Uua(a, f) : yield* kua(a, f);
    if (_._tag === "Unchanged" || _._tag === "ReplacementBlocked")
      return { baseline: H.baseline, baselineSeq: H.baseline_seq };
    if (_._tag === "ReplacementReady") {
      let L = d ?? (yield* Uir(e, s));
      return (yield* cla(e, s, L, _.generation), { baseline: _.generation.baseline, baselineSeq: L });
    }
    return (
      yield* t.publish(
        aht,
        { sessionID: s, messageID: wf.create(), timestamp: yield* kU, text: _.text },
        { commit: () => Ala(e, s, _.snapshot).pipe(on) },
      ),
      { baseline: H.baseline, baselineSeq: H.baseline_seq }
    );
  })),
    (ola = ni(function* (e, t, r) {
      if (yield* ala(e, r)) return;
      let s = yield* t.pipe(Hi(KEi)),
        a = yield* $Ii(e, r, s);
      return { baseline: s.baseline, baselineSeq: a };
    })),
    (ala = Ge("SessionContextEpoch.exists")(function* (e, t) {
      return (
        (yield* e
          .select({ sessionID: rx.session_id })
          .from(rx)
          .where(Pi(rx.session_id, t))
          .get()
          .pipe(on)) !== void 0
      );
    })),
    (Hla = Ge("SessionContextEpoch.find")(function* (e, t) {
      return yield* e.select().from(rx).where(Pi(rx.session_id, t)).get().pipe(on);
    })),
    (cyc = Ge("SessionContextEpoch.reset")(function* (e, t) {
      yield* e.delete(rx).where(Pi(rx.session_id, t)).run().pipe(on);
    })),
    ($Ii = ni(function* (e, t, r) {
      let s = yield* Uir(e, t);
      return (
        yield* e
          .insert(rx)
          .values({ session_id: t, baseline: r.baseline, snapshot: r.snapshot, baseline_seq: s })
          .run()
          .pipe(on),
        s
      );
    })),
    (cla = ni(function* (e, t, r, s) {
      if (
        !(yield* e
          .update(rx)
          .set({ baseline: s.baseline, snapshot: s.snapshot, baseline_seq: r })
          .where(Pi(rx.session_id, t))
          .returning({ sessionID: rx.session_id })
          .get()
          .pipe(on))
      )
        return yield* No("Context Epoch not found");
    })),
    (Ala = ni(function* (e, t, r) {
      if (
        !(yield* e
          .update(rx)
          .set({ snapshot: r })
          .where(Pi(rx.session_id, t))
          .returning({ sessionID: rx.session_id })
          .get()
          .pipe(on))
      )
        return yield* No("Context Epoch not found");
    })));
});
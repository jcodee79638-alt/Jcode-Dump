
var sVe = ne(() => {
  Ef();
  Gt();
  iVe();
  Ew();
  U2();
  Kj();
  sVe();
  ((gHo = G_(xY)),
    (Ror = ni(function* (e, t) {
      return yield* e
        .select({ seq: dA.seq })
        .from(dA)
        .where(Gc(Pi(dA.session_id, t), Pi(dA.type, "compaction")))
        .orderBy(TE(dA.seq))
        .limit(1)
        .get()
        .pipe(on);
    })),
    (ZTn = ni(function* (e, t, r, s) {
      return yield* e
        .select()
        .from(dA)
        .where(
          Gc(
            Pi(dA.session_id, t),
            r
              ? K0(aV(dA.seq, r.seq), s === void 0 ? void 0 : Gc(Pi(dA.type, "system"), $D(dA.seq, s)))
              : void 0,
            s === void 0 ? void 0 : K0(xG(dA.type, "system"), $D(dA.seq, s)),
          ),
        )
        .orderBy(Qm(dA.seq))
        .all()
        .pipe(on);
    })),
    (EHo = Ge("SessionHistory.load")(function* (e, t) {
      let [r, s] = yield* Km(
        [
          e.select({ baselineSeq: rx.baseline_seq }).from(rx).where(Pi(rx.session_id, t)).get().pipe(on),
          Ror(e, t),
        ],
        { concurrency: "unbounded" },
      );
      return yield* ja(yield* ZTn(e, t, s, r?.baselineSeq), evn);
    })),
    (IHo = Ge("SessionHistory.loadForRunner")(function* (e, t, r) {
      return (yield* tvn(e, t, r)).map((s) => s.message);
    })),
    (tvn = Ge("SessionHistory.entriesForRunner")(function* (e, t, r) {
      let s = yield* ZTn(e, t, yield* Ror(e, t), r);
      return yield* ja(s, (a) => evn(a).pipe(Vn((H) => ({ seq: a.seq, message: H }))));
    })));
});
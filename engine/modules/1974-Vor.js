
var Vor = ne(async () => {
  Ef();
  Gt();
  bV();
  Ew();
  U2();
  Kj();
  await Jn([Vor(), qL(), fL(), cVe()]);
  Wor = class Wor extends ki()("Session.MessageNotFoundError", { sessionID: Jj, messageID: wf }) {};
  ((yHo = Ge("SessionRevert.plan")(function* (e) {
    let t = (yield* Vd).db,
      r = yield* t
        .select({ seq: dA.seq })
        .from(dA)
        .where(Gc(Pi(dA.session_id, e.sessionID), Pi(dA.id, e.messageID)))
        .get()
        .pipe(on);
    if (!r) return yield* new Wor(e);
    let s = yield* t
        .select()
        .from(dA)
        .where(Gc(Pi(dA.session_id, e.sessionID), Pi(dA.type, "assistant"), $D(dA.seq, r.seq)))
        .orderBy(Qm(dA.seq))
        .all()
        .pipe(on),
      a = G_(xY),
      H = new Map();
    for (let u of s) {
      let f = yield* a({ ...u.data, id: u.id, type: u.type }).pipe(on);
      if (f.type !== "assistant" || !f.snapshot?.start) continue;
      for (let d of f.snapshot.files ?? []) if (!H.has(d)) H.set(d, ZLt.make(f.snapshot.start));
    }
    return H;
  })),
    (MHo = Ge("SessionRevert.stage")(function* (e) {
      let t = yield* BY,
        r = yield* lL,
        s = e.session.revert?.snapshot ? ZLt.make(e.session.revert.snapshot) : yield* t.capture(),
        a = yield* yHo({ sessionID: e.session.id, messageID: e.messageID }),
        H = new Map();
      if (s) for (let _ of e.session.revert?.files ?? []) H.set(_.path, s);
      if (e.files !== !1) for (let [_, L] of a) H.set(_, L);
      if (H.size) yield* t.restore({ files: H });
      let u = e.files === !1 ? [] : Array.from(a.keys()),
        f = s ? yield* t.diff({ from: s, to: (yield* t.capture()) ?? s, paths: u }) : [],
        d = {
          messageID: e.messageID,
          snapshot: s,
          diff: f
            .map((_) => _.patch)
            .join("")
            .trim(),
          files: f,
        };
      return (yield* r.publish(YU.Staged, { sessionID: e.session.id, timestamp: yield* kU, revert: d }), d);
    })),
    (xHo = Ge("SessionRevert.clear")(function* (e) {
      if (!e.revert) return;
      let t = yield* BY,
        r = e.revert.snapshot ? ZLt.make(e.revert.snapshot) : void 0;
      if (r) yield* t.restore({ files: new Map((e.revert.files ?? []).map((a) => [a.path, r])) });
      yield* (yield* lL).publish(YU.Cleared, { sessionID: e.id, timestamp: yield* kU });
    })),
    (SHo = Ge("SessionRevert.commit")(function* (e) {
      if (!e.revert) return;
      yield* (yield* lL).publish(YU.Committed, {
        sessionID: e.id,
        messageID: e.revert.messageID,
        timestamp: yield* kU,
      });
    })));
});
import THo from "path";
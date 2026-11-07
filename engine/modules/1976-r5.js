
var r5 = ne(async () => {
  Gt();
  Zse();
  Ef();
  vV();
  zM();
  Ew();
  Eor();
  Kj();
  U2();
  BA();
  N2();
  mme();
  yY();
  aVe();
  OH();
  cme();
  iVe();
  bV();
  rVe();
  exe();
  jA();
  MWe();
  iVe();
  await Jn([r5(), JS(), fL(), qL(), nVe(), Bor(), _me(), Vor()]);
  U2();
  ((qzH = tht),
    (Gor = {
      workspaceID: YS.pipe(be),
      search: re.pipe(be),
      limit: qc.pipe(be),
      order: Jo(["asc", "desc"]).pipe(be),
      anchor: Lor.pipe(be),
    }),
    (vHo = nt({ ...Gor, directory: bo })),
    (bHo = nt({ ...Gor, project: z_, subpath: du.pipe(be) })),
    (jHo = nt(Gor)),
    (GzH = Io([vHo, bHo, jHo])));
  uVe = class uVe extends ki()("Session.NotFoundError", { sessionID: Jj }) {};
  AVe = class AVe extends (
    ki()("Session.OperationUnavailableError", {
      operation: Jo(["move", "shell", "skill", "switchAgent", "compact", "wait"]),
    })
  ) {};
  qor = class qor extends ki()("Session.PromptConflictError", { sessionID: Jj, messageID: wf }) {};
  XzH = Wor;
  Txe = class Txe extends _i()("@opencode/v2/Session") {};
  ((PHo = Es(
    Txe,
    ft(function* () {
      let e = yield* Vd,
        t = e.db,
        r = yield* lL,
        s = yield* MY,
        a = yield* toe,
        H = yield* FY,
        u = yield* Xj,
        f = G_(xY),
        d = Jie(Hht),
        _ = (I) =>
          f({ ...I.data, id: I.id, type: I.type }).pipe(
            Zo(() => new xxe({ sessionID: Jj.make(I.session_id), messageID: wf.make(I.id) })),
          ),
        L = Txe.of({
          create: Ge("V2Session.create")(function* (I) {
            let D = I.id ?? Jj.create(),
              S = yield* H.get(D);
            if (S) return S;
            let T = yield* s.resolve(I.location.directory);
            yield* t
              .insert(If)
              .values({ id: T.id, worktree: T.directory, vcs: T.vcs?.type, sandboxes: [] })
              .onConflictDoNothing()
              .run()
              .pipe(on);
            let C = Date.now(),
              O = EWe.make({
                id: D,
                slug: Yv.create(),
                version: VL,
                projectID: T.id,
                directory: I.location.directory,
                path: THo.relative(T.directory, I.location.directory).replaceAll("\\", "/"),
                workspaceID: I.location.workspaceID ? YS.make(I.location.workspaceID) : void 0,
                title: `New session - ${new Date(C).toISOString()}`,
                agent: I.agent,
                model: I.model
                  ? { id: WL.make(I.model.id), providerID: I.model.providerID, variant: I.model.variant }
                  : void 0,
                cost: 0,
                tokens: { input: 0, output: 0, reasoning: 0, cache: { read: 0, write: 0 } },
                time: { created: C, updated: C },
              }),
              B = yield* r.publish(XL.Created, { sessionID: D, info: O }, { location: I.location }).pipe(
                eu({ type: "created" }),
                jQ((V) => {
                  if (!(V instanceof Nor)) return No(V);
                  return H.get(D).pipe(Hi((q) => (q ? Jt({ type: "existing", session: q }) : No(V))));
                }),
              );
            if (B.type === "existing") return B.session;
            return yield* L.get(D).pipe(on);
          }),
          get: Ge("V2Session.get")(function* (I) {
            let D = yield* H.get(I);
            if (!D) return yield* new uVe({ sessionID: I });
            return D;
          }),
          list: Ge("V2Session.list")(function* (I = {}) {
            let D = I.anchor?.direction ?? "next",
              S = I.order ?? "desc",
              T = D === "previous" ? (S === "asc" ? "desc" : "asc") : S,
              C = la.time_created,
              O = [];
            if ("directory" in I) O.push(Pi(la.directory, I.directory));
            if (I.workspaceID) O.push(Pi(la.workspace_id, I.workspaceID));
            if ("project" in I) O.push(Pi(la.project_id, I.project));
            if (I.search) O.push(g2(la.title, `%${I.search}%`));
            if (I.anchor)
              O.push(
                T === "asc"
                  ? K0($D(C, I.anchor.time), Gc(Pi(C, I.anchor.time), $D(la.id, I.anchor.id)))
                  : K0(cw(C, I.anchor.time), Gc(Pi(C, I.anchor.time), cw(la.id, I.anchor.id))),
              );
            let B = t
                .select()
                .from(la)
                .where(O.length > 0 ? Gc(...O) : void 0)
                .orderBy(T === "asc" ? Qm(C) : TE(C), T === "asc" ? Qm(la.id) : TE(la.id)),
              V = yield* (I.limit === void 0 ? B.all() : B.limit(I.limit).all()).pipe(on);
            return (D === "previous" ? V.toReversed() : V).map((q) => KLt(q));
          }),
          messages: Ge("V2Session.messages")(function* (I) {
            yield* L.get(I.sessionID);
            let D = I.cursor?.direction ?? "next",
              S = I.order ?? "desc",
              T = D === "previous" ? (S === "asc" ? "desc" : "asc") : S,
              C = I.cursor
                ? yield* t
                    .select({ seq: dA.seq })
                    .from(dA)
                    .where(Gc(Pi(dA.session_id, I.sessionID), Pi(dA.id, I.cursor.id)))
                    .get()
                    .pipe(on)
                : void 0;
            if (I.cursor && !C) return [];
            let O = C ? (T === "asc" ? $D(dA.seq, C.seq) : cw(dA.seq, C.seq)) : void 0,
              B = O ? Gc(Pi(dA.session_id, I.sessionID), O) : Pi(dA.session_id, I.sessionID),
              V = t
                .select()
                .from(dA)
                .where(B)
                .orderBy(T === "asc" ? Qm(dA.seq) : TE(dA.seq)),
              q = yield* (I.limit === void 0 ? V.all() : V.limit(I.limit).all()).pipe(on);
            return yield* ja(D === "previous" ? q.toReversed() : q, _);
          }),
          message: Ge("V2Session.message")(function* (I) {
            let D = yield* H.message(I.messageID);
            return D?.sessionID === I.sessionID ? D.message : void 0;
          }),
          context: Ge("V2Session.context")(function* (I) {
            return (yield* L.get(I), yield* H.context(I));
          }),
          events: (I) =>
            hh(L.get(I.sessionID).pipe(eu(r.durable({ aggregateID: I.sessionID, after: I.after })))).pipe(
              aG((D) => d(D)),
            ),
          history: Ge("V2Session.history")(function* (I) {
            return (
              yield* L.get(I.sessionID),
              yield* LYs(t, { ...I, aggregateID: I.sessionID, manifest: Zyn })
            );
          }),
          prompt: Ge("V2Session.prompt")((I) =>
            BL(
              ft(function* () {
                yield* L.get(I.sessionID);
                let D = CHo(I.prompt),
                  S = I.id ?? wf.create(),
                  T = I.delivery ?? "steer",
                  C = { sessionID: I.sessionID, messageID: S, prompt: D, delivery: T },
                  O = yield* uHo(t, r, { id: S, sessionID: I.sessionID, prompt: D, delivery: T }).pipe(
                    jQ((B) => (B instanceof dme ? new qor({ sessionID: I.sessionID, messageID: S }) : No(B))),
                  );
                if (!JTn(O, C)) return yield* new qor({ sessionID: I.sessionID, messageID: S });
                if (I.resume !== !1) yield* a.wake(O.sessionID);
                return O;
              }),
            ),
          ),
          shell: Ge("V2Session.shell")(function* () {
            return yield* new AVe({ operation: "shell" });
          }),
          skill: Ge("V2Session.skill")(function* () {
            return yield* new AVe({ operation: "skill" });
          }),
          switchAgent: Ge("V2Session.switchAgent")(function* (I) {
            (yield* L.get(I.sessionID),
              yield* r.publish(rht, {
                sessionID: I.sessionID,
                messageID: wf.create(),
                timestamp: yield* kU,
                agent: I.agent,
              }));
          }),
          switchModel: Ge("V2Session.switchModel")(function* (I) {
            let D = yield* L.get(I.sessionID);
            if (
              D.model?.providerID === I.model.providerID &&
              D.model.id === I.model.id &&
              (D.model.variant ?? "default") === (I.model.variant ?? "default")
            )
              return;
            yield* r.publish(nht, {
              sessionID: I.sessionID,
              messageID: wf.create(),
              timestamp: yield* kU,
              model: I.model,
            });
          }),
          compact: Ge("V2Session.compact")(function* (I) {
            return (yield* L.get(I.sessionID), yield* new AVe({ operation: "compact" }));
          }),
          wait: Ge("V2Session.wait")(function* (I) {
            return (yield* L.get(I), yield* new AVe({ operation: "wait" }));
          }),
          active: a.active,
          resume: Ge("V2Session.resume")(function* (I) {
            (yield* L.get(I), yield* a.resume(I));
          }),
          interrupt: Ge("V2Session.interrupt")((I) => BL(a.interrupt(I))),
          revert: {
            stage: Ge("V2Session.revert.stage")(function* (I) {
              let D = yield* L.get(I.sessionID);
              return yield* MHo({ session: D, messageID: I.messageID, files: I.files }).pipe(
                IA(Vd, e),
                IA(lL, r),
                vj(u.get(D.location)),
              );
            }),
            clear: Ge("V2Session.revert.clear")(function* (I) {
              let D = yield* L.get(I);
              yield* xHo(D).pipe(IA(lL, r), vj(u.get(D.location)));
            }),
            commit: Ge("V2Session.revert.commit")(function* (I) {
              let D = yield* L.get(I);
              yield* SHo(D).pipe(IA(lL, r));
            }),
          },
        });
      return L;
    }),
  )),
    (wHo = iA({ service: Txe, layer: PHo.pipe(X2e), deps: [DD, zS, hWe, rvn, oVe, Hme, For] })));
});
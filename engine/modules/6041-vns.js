
var vns = ne(async () => {
  OY();
  Gt();
  aL();
  Ql();
  Cf();
  $H();
  Sx();
  jwr();
  await Jn([
    Jw(),
    ZL(),
    $ee(),
    ET(),
    FQe(),
    e$(),
    TCe(),
    vHe(),
    l$e(),
    VLe(),
    Ace(),
    Eee(),
    Fee(),
    oce(),
    Jy(),
    nwr(),
  ]);
  Tns = Kd(eh, "session", (e) =>
    ft(function* () {
      let t = yield* Mg,
        r = yield* NQe,
        s = yield* Ewe,
        a = yield* vCe,
        H = yield* WLe,
        u = yield* cce,
        f = yield* DP,
        d = yield* FB,
        _ = yield* ace,
        L = yield* MPe,
        I = yield* jce,
        D = yield* B$,
        S = yield* $f,
        T = Ge("SessionHttpApi.list")(function* (Et) {
          let tr = Et.query.directory ? yield* xX : void 0;
          return yield* t.list({
            directory: Et.query.scope === "project" ? void 0 : tr,
            scope: Et.query.scope,
            path: Et.query.path,
            roots: Et.query.roots,
            start: Et.query.start,
            search: Et.query.search,
            limit: Et.query.limit,
          });
        }),
        C = Ge("SessionHttpApi.status")(function* () {
          return Object.fromEntries(yield* _.list());
        }),
        O = Ge("SessionHttpApi.requireSession")(function* (Et) {
          return yield* vJ(t.get(Et));
        }),
        B = Ge("SessionHttpApi.get")(function* (Et) {
          return yield* O(Et.params.sessionID);
        }),
        V = Ge("SessionHttpApi.children")(function* (Et) {
          return (yield* O(Et.params.sessionID), yield* t.children(Et.params.sessionID));
        }),
        q = Ge("SessionHttpApi.todo")(function* (Et) {
          return (yield* O(Et.params.sessionID), yield* L.get(Et.params.sessionID));
        }),
        Z = Ge("SessionHttpApi.diff")(function* (Et) {
          return yield* I.diff({ sessionID: Et.params.sessionID, messageID: Et.query.messageID });
        }),
        se = Ge("SessionHttpApi.messages")(function* (Et) {
          if (Et.query.before && Et.query.limit === void 0) return yield* new PA({});
          if (Et.query.before) {
            let Br = Et.query.before;
            yield* ZA({ try: () => cyr.decode(Br), catch: () => new PA({}) });
          }
          if ((yield* O(Et.params.sessionID), Et.query.limit === void 0 || Et.query.limit === 0))
            return yield* vJ(t.messages({ sessionID: Et.params.sessionID }));
          let tr = yield* vJ(
            lXe({ sessionID: Et.params.sessionID, limit: Et.query.limit, before: Et.query.before }),
          );
          if (!tr.cursor) return tr.items;
          let Rr = yield* Md,
            Vt = uD(ger(Rr), () => new URL(Rr.url, "http://localhost"));
          return (
            Vt.searchParams.set("limit", Et.query.limit.toString()),
            Vt.searchParams.set("before", tr.cursor),
            ow(tr.items, {
              headers: {
                "Access-Control-Expose-Headers": "Link, X-Next-Cursor",
                Link: `<${Vt.toString()}>; rel="next"`,
                "X-Next-Cursor": tr.cursor,
              },
            })
          );
        }),
        ae = Ge("SessionHttpApi.message")(function* (Et) {
          return yield* vJ(gOi({ sessionID: Et.params.sessionID, messageID: Et.params.messageID }));
        }),
        z = Ge("SessionHttpApi.create")(function* (Et) {
          return yield* r.create(Et.payload);
        }),
        Ae = Ge("SessionHttpApi.createRaw")(function* (Et) {
          let tr = yield* on(Et.request.text);
          if (tr.trim().length === 0) return yield* z({});
          let Rr = yield* Sns(tr),
            Vt = yield* G_(lyr)(Rr).pipe(Zo(() => new PA({}))),
            Br = Vt ? { ...Vt, permission: Vt.permission ? [...Vt.permission] : void 0 } : Vt;
          return yield* z({ payload: Br });
        }),
        le = Ge("SessionHttpApi.remove")(function* (Et) {
          return (yield* vJ(t.remove(Et.params.sessionID)), !0);
        }),
        Be = Ge("SessionHttpApi.update")(function* (Et) {
          let tr = yield* O(Et.params.sessionID);
          if (Et.payload.title !== void 0)
            yield* t.setTitle({ sessionID: Et.params.sessionID, title: Et.payload.title });
          if (Et.payload.metadata !== void 0)
            yield* t.setMetadata({ sessionID: Et.params.sessionID, metadata: Et.payload.metadata });
          if (Et.payload.permission !== void 0)
            yield* t.setPermission({
              sessionID: Et.params.sessionID,
              permission: gT(tr.permission ?? [], Et.payload.permission),
            });
          if (Et.payload.time?.archived !== void 0)
            yield* t.setArchived({ sessionID: Et.params.sessionID, time: Et.payload.time.archived });
          return yield* O(Et.params.sessionID);
        }),
        Te = Ge("SessionHttpApi.fork")(function* (Et) {
          return yield* vJ(t.fork({ sessionID: Et.params.sessionID, messageID: Et.payload?.messageID }));
        }),
        Lt = Ge("SessionHttpApi.forkRaw")(function* (Et) {
          let tr = yield* on(Et.request.text);
          if (tr.trim().length === 0) return yield* Te({ params: Et.params });
          let Rr = yield* Sns(tr),
            Vt = yield* G_(rwr)(Rr).pipe(Zo(() => new PA({})));
          return yield* Te({ params: Et.params, payload: Vt });
        }),
        Ht = Ge("SessionHttpApi.abort")(function* (Et) {
          return (yield* s.cancel(Et.params.sessionID), !0);
        }),
        Se = Ge("SessionHttpApi.init")(function* (Et) {
          return (
            yield* O(Et.params.sessionID),
            yield* s
              .command({
                sessionID: Et.params.sessionID,
                messageID: Et.payload.messageID,
                model: `${Et.payload.providerID}/${Et.payload.modelID}`,
                command: gPe.INIT,
                arguments: "",
              })
              .pipe(Zo(() => new PA({}))),
            !0
          );
        }),
        _e = Ge("SessionHttpApi.share")(function* (Et) {
          return (
            yield* O(Et.params.sessionID),
            yield* r.share(Et.params.sessionID).pipe(Zo(() => new aX({}))),
            yield* O(Et.params.sessionID)
          );
        }),
        we = Ge("SessionHttpApi.unshare")(function* (Et) {
          return (
            yield* O(Et.params.sessionID),
            yield* r.unshare(Et.params.sessionID).pipe(Zo(() => new aX({}))),
            yield* O(Et.params.sessionID)
          );
        }),
        Pe = Ge("SessionHttpApi.summarize")(function* (Et) {
          yield* a.cleanup(yield* O(Et.params.sessionID));
          let tr = yield* vJ(t.messages({ sessionID: Et.params.sessionID })),
            Rr = yield* f.defaultAgent(),
            Vt = tr.findLast((Br) => Br.info.role === "user")?.info.agent ?? Rr;
          return (
            yield* H.create({
              sessionID: Et.params.sessionID,
              agent: Vt,
              model: { providerID: Et.payload.providerID, modelID: Et.payload.modelID },
              auto: Et.payload.auto ?? !1,
            }),
            yield* s.loop({ sessionID: Et.params.sessionID }),
            !0
          );
        }),
        ye = Ge("SessionHttpApi.prompt")(function* (Et) {
          yield* O(Et.params.sessionID);
          let tr = yield* s
            .prompt({ ...Et.payload, sessionID: Et.params.sessionID })
            .pipe(Zo(() => new PA({})));
          return f2(c2(JSON.stringify(tr)).pipe(HG), { contentType: "application/json" });
        }),
        ot = Ge("SessionHttpApi.promptAsync")(function* (Et) {
          return (
            yield* O(Et.params.sessionID),
            yield* s.prompt({ ...Et.payload, sessionID: Et.params.sessionID }).pipe(
              jf((tr) =>
                ft(function* () {
                  (yield* cf("prompt_async failed", { sessionID: Et.params.sessionID, cause: tr }),
                    yield* D.publish(pb.Error, {
                      sessionID: Et.params.sessionID,
                      error: new ud.Unknown({ message: BC(tr) }).toObject(),
                    }));
                }),
              ),
              zm(S, { startImmediately: !0 }),
            ),
            lf.make()
          );
        }),
        Ee = Ge("SessionHttpApi.command")(function* (Et) {
          return (
            yield* O(Et.params.sessionID),
            yield* s.command({ ...Et.payload, sessionID: Et.params.sessionID }).pipe(Zo(() => new PA({})))
          );
        }),
        Ve = Ge("SessionHttpApi.shell")(function* (Et) {
          return (
            yield* O(Et.params.sessionID),
            yield* dYe(s.shell({ ...Et.payload, sessionID: Et.params.sessionID }))
          );
        }),
        Fe = Ge("SessionHttpApi.revert")(function* (Et) {
          return (
            yield* O(Et.params.sessionID),
            yield* dYe(a.revert({ sessionID: Et.params.sessionID, ...Et.payload }))
          );
        }),
        it = Ge("SessionHttpApi.unrevert")(function* (Et) {
          return (yield* O(Et.params.sessionID), yield* dYe(a.unrevert({ sessionID: Et.params.sessionID })));
        }),
        At = Ge("SessionHttpApi.permissionRespond")(function* (Et) {
          return (
            yield* O(Et.params.sessionID),
            yield* d
              .reply({ requestID: Et.params.permissionID, reply: Et.payload.response })
              .pipe(
                EA("Permission.NotFoundError", (tr) =>
                  bn(
                    new ite({
                      requestID: String(tr.requestID),
                      message: `Permission request not found: ${tr.requestID}`,
                    }),
                  ),
                ),
              ),
            !0
          );
        }),
        et = Ge("SessionHttpApi.deleteMessage")(function* (Et) {
          return (
            yield* O(Et.params.sessionID),
            yield* dYe(u.assertNotBusy(Et.params.sessionID)),
            yield* t.removeMessage(Et.params),
            !0
          );
        }),
        ut = Ge("SessionHttpApi.deletePart")(function* (Et) {
          return (yield* O(Et.params.sessionID), yield* t.removePart(Et.params), !0);
        }),
        ht = Ge("SessionHttpApi.updatePart")(function* (Et) {
          yield* O(Et.params.sessionID);
          let tr = Et.payload;
          if (
            tr.id !== Et.params.partID ||
            tr.messageID !== Et.params.messageID ||
            tr.sessionID !== Et.params.sessionID
          )
            return yield* new PA({});
          return yield* t.updatePart(tr);
        });
      return e
        .handle("list", T)
        .handle("status", C)
        .handle("get", B)
        .handle("children", V)
        .handle("todo", q)
        .handle("diff", Z)
        .handle("messages", se)
        .handle("message", ae)
        .handleRaw("create", Ae)
        .handle("remove", le)
        .handle("update", Be)
        .handleRaw("fork", Lt)
        .handle("abort", Ht)
        .handle("init", Se)
        .handle("share", _e)
        .handle("unshare", we)
        .handle("summarize", Pe)
        .handle("prompt", ye)
        .handle("promptAsync", ot)
        .handle("command", Ee)
        .handle("shell", Ve)
        .handle("revert", Fe)
        .handle("unrevert", it)
        .handle("permissionRespond", At)
        .handle("deleteMessage", et)
        .handle("deletePart", ut)
        .handle("updatePart", ht);
    }),
  );
});
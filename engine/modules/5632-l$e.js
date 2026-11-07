
var l$e = ne(async () => {
  au();
  N2();
  ghe();
  Gfe();
  EHe();
  lb();
  Jzi();
  _w();
  Use();
  aL();
  o0();
  YTt();
  OY();
  Yze();
  jA();
  Ljt();
  Ree();
  Gt();
  Ql();
  Ry();
  zM();
  yy();
  Ef();
  Kj();
  CE();
  await Jn([
    jI(),
    vHe(),
    VLe(),
    e$(),
    Jw(),
    Vw(),
    TCe(),
    kbr(),
    qLe(),
    A$e(),
    xP(),
    ek(),
    $ee(),
    Fee(),
    xCe(),
    ET(),
    Eee(),
    RLe(),
    Zve(),
    SX(),
    Ujr(),
    Ace(),
    ZL(),
    qL(),
    WPr(),
    VPr(),
    l$e(),
  ]);
  globalThis.AI_SDK_LOG_WARNINGS = !1;
  ((HYa = MAn(pht)),
    (cYa = MAn(rxe)),
    (uYa = new Set(["application/pdf", "image/gif", "image/jpeg", "image/png", "image/webp"])));
  Ewe = class Ewe extends _i()("@opencode/SessionPrompt") {};
  ((dYa = Es(
    Ewe,
    ft(function* () {
      let e = yield* ace,
        t = yield* Mg,
        r = yield* DP,
        s = yield* FN,
        a = yield* MCe,
        H = yield* WLe,
        u = yield* IT,
        f = yield* EPe,
        d = yield* Eg,
        _ = yield* FB,
        L = yield* ui.Service,
        I = yield* MP,
        D = yield* fR,
        S = yield* nAe,
        T = yield* RN,
        C = yield* nJe,
        O = yield* kS,
        B = yield* $f,
        V = yield* jCe,
        q = yield* cce,
        Z = yield* vCe,
        se = yield* jce,
        ae = yield* Vze,
        z = yield* bce,
        Ae = yield* B$,
        le = yield* NE,
        Be = yield* Vd,
        { db: Te } = Be,
        Lt = Ge("SessionPrompt.ops")(function* () {
          return {
            cancel: (ht) => Ht(ht),
            resolvePromptParts: (ht) => Se(ht),
            prompt: (ht) => Ve(ht).pipe($s(No)),
          };
        }),
        Ht = Ge("SessionPrompt.cancel")(function* (ht) {
          (yield* fH("cancel", { "session.id": ht }), yield* q.cancel(ht));
        }),
        Se = Ge("SessionPrompt.resolvePromptParts")(function* (ht) {
          let Et = yield* Jc,
            tr = [{ type: "text", text: ht }],
            Rr = kva(ht),
            Vt = new Set();
          return (
            yield* ja(
              Rr,
              ni(function* (Br) {
                let Dt = Br[1];
                if (!Dt) return;
                if (Vt.has(Dt)) return;
                Vt.add(Dt);
                let St = Dt.startsWith("~/")
                    ? HQi.join(oYa.homedir(), Dt.slice(2))
                    : HQi.resolve(Et.worktree, Dt),
                  wt = yield* L.stat(St).pipe(hQt);
                if (vl(wt)) {
                  let Li = yield* r.get(Dt);
                  if (Li) tr.push({ type: "agent", name: Li.name });
                  return;
                }
                let Qr = wt.value;
                tr.push({
                  type: "file",
                  url: aYa(St).href,
                  filename: Dt,
                  mime: Qr.type === "Directory" ? "application/x-directory" : "text/plain",
                });
              }),
              { concurrency: "unbounded", discard: !0 },
            ),
            tr
          );
        }),
        _e = Ge("SessionPrompt.ensureTitle")(function* (ht) {
          if (ht.session.parentID) return;
          if (!SOi(ht.session.title)) return;
          let Et = (Tr) =>
              Tr.info.role === "user" && !Tr.parts.every((Dn) => "synthetic" in Dn && Dn.synthetic),
            tr = ht.history.findIndex(Et);
          if (tr === -1) return;
          if (ht.history.filter(Et).length !== 1) return;
          let Rr = ht.history.slice(0, tr + 1),
            Vt = Rr[tr];
          if (!Vt || Vt.info.role !== "user") return;
          let Br = Vt.info,
            Dt = Vt.parts.filter((Tr) => Tr.type === "subtask"),
            St = Dt.length > 0 && Vt.parts.every((Tr) => Tr.type === "subtask"),
            wt = yield* r.get("title");
          if (!wt) return;
          let Qr =
              ht.providerID === "jaccode"
                ? yield* s.getModel(ht.providerID, ht.modelID)
                : wt.model
                  ? yield* s.getModel(wt.model.providerID, wt.model.modelID)
                  : ((yield* s.getSmallModel(ht.providerID)) ??
                    (yield* s.getModel(ht.providerID, ht.modelID))),
            Li = St
              ? [
                  {
                    role: "user",
                    content: Dt.map((Tr) => Tr.prompt).join(`
`),
                  },
                ]
              : yield* Ayr(Rr, Qr),
            Mt = (yield* z
              .stream({
                agent: wt,
                user: Br,
                system: [],
                small: !0,
                tools: {},
                model: Qr,
                sessionID: ht.session.id,
                retries: 2,
                messages: [
                  {
                    role: "user",
                    content: `Generate a title for this conversation:
`,
                  },
                  ...Li,
                ],
              })
              .pipe(
                aG(tA.is.textDelta),
                xE((Tr) => Tr.text),
                cG,
                on,
              ))
              .replace(/<think>[\s\S]*?<\/think>\s*/g, "")
              .split(
                `
`,
              )
              .map((Tr) => Tr.trim())
              .find((Tr) => Tr.length > 0);
          if (!Mt) return;
          let Lr = Mt.length > 100 ? Mt.substring(0, 97) + "..." : Mt;
          yield* t
            .setTitle({ sessionID: ht.session.id, title: Lr })
            .pipe(jf((Tr) => cf("failed to generate title", { error: hI(Tr) })));
        }),
        we = Ge("SessionPrompt.handleSubtask")(function* (ht) {
          let { task: Et, model: tr, lastUser: Rr, sessionID: Vt, session: Br, msgs: Dt } = ht,
            St = yield* Jc,
            wt = yield* Lt(),
            { task: Qr } = yield* S.named(),
            Li = Et.model ? yield* ye(Et.model.providerID, Et.model.modelID, Vt) : tr,
            sr = yield* t.updateMessage({
              id: Td.ascending(),
              role: "assistant",
              parentID: Rr.id,
              sessionID: Vt,
              mode: Et.agent,
              agent: Et.agent,
              variant: Rr.model.variant,
              path: { cwd: St.directory, root: St.worktree },
              cost: 0,
              tokens: { input: 0, output: 0, reasoning: 0, cache: { read: 0, write: 0 } },
              modelID: Li.id,
              providerID: Li.providerID,
              time: { created: Date.now() },
            }),
            Mt = yield* t.updatePart({
              id: Zp.ascending(),
              messageID: sr.id,
              sessionID: sr.sessionID,
              type: "tool",
              callID: RPr(),
              tool: Xce.id,
              state: {
                status: "running",
                input: {
                  prompt: Et.prompt,
                  description: Et.description,
                  subagent_type: Et.agent,
                  command: Et.command,
                },
                time: { start: Date.now() },
              },
            }),
            Lr = {
              prompt: Et.prompt,
              description: Et.description,
              subagent_type: Et.agent,
              command: Et.command,
            };
          yield* u.trigger(
            "tool.execute.before",
            { tool: Xce.id, sessionID: Vt, callID: Mt.id },
            { args: Lr },
          );
          let Tr = yield* r.get(Et.agent);
          if (!Tr) {
            let Fo = (yield* r.list()).filter((Ei) => !Ei.hidden).map((Ei) => Ei.name),
              en = Fo.length ? ` Available agents: ${Fo.join(", ")}` : "",
              gr = new ud.Unknown({ message: `Agent not found: "${Et.agent}".${en}` });
            throw (yield* Ae.publish(pb.Error, { sessionID: Vt, error: gr.toObject() }), gr);
          }
          let Dn,
            Mn = new AbortController(),
            as = yield* Qr.execute(Lr, {
              agent: Et.agent,
              messageID: sr.id,
              sessionID: Vt,
              abort: Mn.signal,
              callID: Mt.callID,
              extra: { bypassAgentCheck: !0, promptOps: wt },
              messages: Dt,
              metadata: (Fo) =>
                ft(function* () {
                  Mt = yield* t.updatePart({ ...Mt, type: "tool", state: { ...Mt.state, ...Fo } });
                }),
              ask: (Fo) =>
                _.ask({ ...Fo, sessionID: Vt, ruleset: gT(Tr.permission, Br.permission ?? []) }).pipe(on),
            }).pipe(
              jf((Fo) => {
                let en = hI(Fo);
                return (
                  (Dn = en instanceof Error ? en : Error(String(en))),
                  cf("subtask execution failed", { error: Dn, agent: Et.agent, description: Et.description })
                );
              }),
              CU(() =>
                ft(function* () {
                  if (
                    (Mn.abort(),
                    (sr.finish = "tool-calls"),
                    (sr.time.completed = Date.now()),
                    yield* t.updateMessage(sr),
                    Mt.state.status === "running")
                  )
                    yield* t.updatePart({
                      ...Mt,
                      state: {
                        status: "error",
                        error: "Cancelled",
                        time: { start: Mt.state.time.start, end: Date.now() },
                        metadata: Mt.state.metadata,
                        input: Mt.state.input,
                      },
                    });
                }),
              ),
            ),
            xi = as?.attachments?.map((Fo) => ({
              ...Fo,
              id: Zp.ascending(),
              sessionID: Vt,
              messageID: sr.id,
            }));
          if (
            (yield* u.trigger(
              "tool.execute.after",
              { tool: Xce.id, sessionID: Vt, callID: Mt.id, args: Lr },
              as,
            ),
            (sr.finish = "tool-calls"),
            (sr.time.completed = Date.now()),
            yield* t.updateMessage(sr),
            as && Mt.state.status === "running")
          )
            yield* t.updatePart({
              ...Mt,
              state: {
                status: "completed",
                input: Mt.state.input,
                title: as.title,
                metadata: as.metadata,
                output: as.output,
                attachments: xi,
                time: { ...Mt.state.time, end: Date.now() },
              },
            });
          if (!as)
            yield* t.updatePart({
              ...Mt,
              state: {
                status: "error",
                error: Dn ? `Tool execution failed: ${Dn.message}` : "Tool execution failed",
                time: {
                  start: Mt.state.status === "running" ? Mt.state.time.start : Date.now(),
                  end: Date.now(),
                },
                metadata: Mt.state.status === "pending" ? void 0 : Mt.state.metadata,
                input: Mt.state.input,
              },
            });
          if (!Et.command) return;
          let go = {
            id: Td.ascending(),
            sessionID: Vt,
            role: "user",
            time: { created: Date.now() },
            agent: Rr.agent,
            model: Rr.model,
          };
          (yield* t.updateMessage(go),
            yield* t.updatePart({
              id: Zp.ascending(),
              messageID: go.id,
              sessionID: Vt,
              type: "text",
              text: "Summarize the task tool output above and continue with your task.",
              synthetic: !0,
            }));
        }),
        Pe = Ge("SessionPrompt.shellImpl")(function* (ht, Et) {
          return yield* q0((tr) =>
            ft(function* () {
              let Rr = Et ? Et.open.pipe(Qf) : ti,
                {
                  msg: Vt,
                  part: Br,
                  cwd: Dt,
                } = yield* ft(function* () {
                  let Tr = yield* Jc,
                    Dn = yield* t.get(ht.sessionID).pipe(on);
                  if (Dn.revert) yield* Z.cleanup(Dn);
                  let Mn = yield* r.get(ht.agent);
                  if (!Mn) {
                    let Ei = (yield* r.list()).filter((oo) => !oo.hidden).map((oo) => oo.name),
                      kr = Ei.length ? ` Available agents: ${Ei.join(", ")}` : "",
                      Wi = new ud.Unknown({ message: `Agent not found: "${ht.agent}".${kr}` });
                    throw (
                      yield* Ae.publish(pb.Error, { sessionID: ht.sessionID, error: Wi.toObject() }),
                      Wi
                    );
                  }
                  let as = ht.model ?? Mn.model ?? (yield* ot(ht.sessionID)),
                    xi = {
                      id: ht.messageID ?? Td.ascending(),
                      sessionID: ht.sessionID,
                      time: { created: Date.now() },
                      role: "user",
                      agent: ht.agent,
                      model: { providerID: as.providerID, modelID: as.modelID },
                    };
                  yield* t.updateMessage(xi);
                  let go = {
                    type: "text",
                    id: Zp.ascending(),
                    messageID: xi.id,
                    sessionID: ht.sessionID,
                    text: "The following tool was executed by the user",
                    synthetic: !0,
                  };
                  yield* t.updatePart(go);
                  let Fo = {
                    id: Td.ascending(),
                    sessionID: ht.sessionID,
                    parentID: xi.id,
                    mode: ht.agent,
                    agent: ht.agent,
                    cost: 0,
                    path: { cwd: Tr.directory, root: Tr.worktree },
                    time: { created: Date.now() },
                    role: "assistant",
                    tokens: { input: 0, output: 0, reasoning: 0, cache: { read: 0, write: 0 } },
                    modelID: as.modelID,
                    providerID: as.providerID,
                  };
                  yield* t.updateMessage(Fo);
                  let en = Date.now(),
                    gr = {
                      type: "tool",
                      id: Zp.ascending(),
                      messageID: Fo.id,
                      sessionID: ht.sessionID,
                      tool: eCt,
                      callID: RPr(),
                      state: { status: "running", time: { start: en }, input: { command: ht.command } },
                    };
                  return (yield* t.updatePart(gr), { msg: Fo, part: gr, cwd: Tr.directory });
                }).pipe(up(Rr)),
                St = yield* d.get(),
                wt = uMt(St.shell),
                Qr = mua(wt, ht.command, Dt),
                Li = "",
                sr = !1,
                Mt = BL(
                  ft(function* () {
                    if (sr)
                      Li +=
                        `

` +
                        ["<metadata>", "User aborted the command", "</metadata>"].join(`
`);
                    let Tr = Date.now();
                    if (!Vt.time.completed) ((Vt.time.completed = Tr), yield* t.updateMessage(Vt));
                    if (Br.state.status === "running")
                      ((Br.state = {
                        status: "completed",
                        time: { ...Br.state.time, end: Tr },
                        input: Br.state.input,
                        title: "",
                        metadata: { output: Li },
                        output: Li,
                      }),
                        yield* t.updatePart(Br));
                  }),
                ),
                Lr = yield* tr(
                  ft(function* () {
                    let Tr = yield* u.trigger(
                        "shell.env",
                        { cwd: Dt, sessionID: ht.sessionID, callID: Br.callID },
                        { env: {} },
                      ),
                      Dn = Lh(wt, Qr, {
                        cwd: Dt,
                        extendEnv: !0,
                        env: { ...Tr.env, TERM: "dumb" },
                        stdin: "ignore",
                        forceKillAfter: "3 seconds",
                      }),
                      Mn = yield* O.spawn(Dn);
                    (yield* FW(C6(Mn.all), (as) =>
                      ft(function* () {
                        if (((Li += as), Br.state.status === "running"))
                          ((Br.state.metadata = { output: Li }), yield* t.updatePart(Br));
                      }),
                    ),
                      yield* Mn.exitCode);
                  }).pipe(FL, on),
                ).pipe(_h);
              if (LI(Lr) && xW(Lr.cause) && !Oin(Lr.cause)) sr = !0;
              if ((yield* Mt, LI(Lr) && !sr && !d1(Lr.cause))) return yield* NL(Lr.cause);
              return { info: Vt, parts: [Br] };
            }),
          );
        }),
        ye = Ge("SessionPrompt.getModel")(function* (ht, Et, tr) {
          let Rr = yield* s.getModel(ht, Et).pipe(_h);
          if (mh(Rr)) return Rr.value;
          let Vt = hI(Rr.cause);
          if (F5e.isInstance(Vt)) {
            let Br = Vt.suggestions?.length ? ` Did you mean: ${Vt.suggestions.join(", ")}?` : "";
            yield* Ae.publish(pb.Error, {
              sessionID: tr,
              error: new ud.Unknown({
                message: `Model not found: ${Vt.providerID}/${Vt.modelID}.${Br}`,
              }).toObject(),
            });
          }
          return yield* No(Vt);
        }),
        ot = ni(function* (ht) {
          let Et = yield* Te.select({ model: la.model }).from(la).where(Pi(la.id, ht)).get().pipe(on);
          if (Et?.model)
            return {
              providerID: Kp.make(Et.model.providerID),
              modelID: WL.make(Et.model.id),
              ...(Et.model.variant && Et.model.variant !== "default" ? { variant: Et.model.variant } : {}),
            };
          let tr = yield* t.findMessage(ht, (Rr) => Rr.info.role === "user" && !!Rr.info.model).pipe(on);
          if (Nu(tr) && tr.value.info.role === "user") return tr.value.info.model;
          return yield* s.defaultModel().pipe(on);
        }),
        Ee = Ge("SessionPrompt.createUserMessage")(function* (ht) {
          let Et = ht.agent,
            tr = Et ? yield* r.get(Et) : yield* r.defaultInfo();
          if (!tr) {
            let Tr = (yield* r.list()).filter((as) => !as.hidden).map((as) => as.name),
              Dn = Tr.length ? ` Available agents: ${Tr.join(", ")}` : "",
              Mn = new ud.Unknown({ message: `Agent not found: "${Et}".${Dn}` });
            throw (yield* Ae.publish(pb.Error, { sessionID: ht.sessionID, error: Mn.toObject() }), Mn);
          }
          let Rr = ht.model ?? tr.model ?? (yield* ot(ht.sessionID)),
            Vt = tr.model && Rr.providerID === tr.model.providerID && Rr.modelID === tr.model.modelID,
            Br =
              !ht.variant && tr.variant && Vt
                ? yield* s.getModel(Rr.providerID, Rr.modelID).pipe(GM(F5e.isInstance, () => Jt(void 0)))
                : void 0,
            Dt = ht.variant ?? (tr.variant && Br?.variants?.[tr.variant] ? tr.variant : void 0),
            St = {
              id: ht.messageID ?? Td.ascending(),
              role: "user",
              sessionID: ht.sessionID,
              time: { created: Date.now() },
              tools: ht.tools,
              agent: tr.name,
              model: { providerID: Rr.providerID, modelID: Rr.modelID, variant: Dt },
              system: ht.system,
              format: ht.format,
            },
            wt = yield* t.get(ht.sessionID).pipe(on);
          if (
            wt.agent !== St.agent ||
            wt.model?.providerID !== St.model.providerID ||
            wt.model?.id !== St.model.modelID ||
            (wt.model?.variant === "default" ? void 0 : wt.model?.variant) !== St.model.variant
          )
            yield* t.setAgentModel({
              sessionID: ht.sessionID,
              agent: St.agent,
              model: {
                id: St.model.modelID,
                providerID: St.model.providerID,
                variant: St.model.variant ?? "default",
              },
              time: St.time.created,
            });
          yield* sL(() => V.clear(St.id));
          let Qr = (Tr) => ({ ...Tr, id: Tr.id ? Zp.make(Tr.id) : Zp.ascending() }),
            Li = Ge("SessionPrompt.resolveUserPart")(function* (Tr) {
              if (Tr.type === "file") {
                if (Tr.source?.type === "resource") {
                  let { clientName: Mn, uri: as } = Tr.source;
                  yield* fH("mcp resource", { clientName: Mn, uri: as, mime: Tr.mime });
                  let xi = [
                      {
                        messageID: St.id,
                        sessionID: ht.sessionID,
                        type: "text",
                        synthetic: !0,
                        text: `Reading MCP resource: ${Tr.filename} (${as})`,
                      },
                    ],
                    go = yield* I.readResource(Mn, as).pipe(_h);
                  if (mh(go)) {
                    let Fo = go.value;
                    if (!Fo) throw Error(`Resource not found: ${Mn}/${as}`);
                    let en = Array.isArray(Fo.contents) ? Fo.contents : [Fo.contents];
                    for (let gr of en) {
                      if (!gr || typeof gr !== "object") continue;
                      if ("text" in gr && typeof gr.text === "string" && gr.text)
                        xi.push({
                          messageID: St.id,
                          sessionID: ht.sessionID,
                          type: "text",
                          synthetic: !0,
                          text: gr.text,
                        });
                      else if ("blob" in gr && typeof gr.blob === "string" && gr.blob) {
                        let Ei = "mimeType" in gr && typeof gr.mimeType === "string" ? gr.mimeType : Tr.mime,
                          kr = "uri" in gr && typeof gr.uri === "string" ? gr.uri : Tr.filename,
                          Wi = pYa(gr.blob);
                        if (!uYa.has(Ei)) {
                          xi.push({
                            messageID: St.id,
                            sessionID: ht.sessionID,
                            type: "text",
                            synthetic: !0,
                            text: `[Binary MCP resource omitted: ${kr ?? as} (${Ei}, ${GPr(Wi)}) is not a supported attachment type]`,
                          });
                          continue;
                        }
                        if (Wi > cQi) {
                          xi.push({
                            messageID: St.id,
                            sessionID: ht.sessionID,
                            type: "text",
                            synthetic: !0,
                            text: `[Binary MCP resource omitted: ${kr ?? as} (${Ei}, ${GPr(Wi)}) exceeds ${GPr(cQi)}]`,
                          });
                          continue;
                        }
                        (xi.push({
                          messageID: St.id,
                          sessionID: ht.sessionID,
                          type: "text",
                          synthetic: !0,
                          text: `[Binary MCP resource attached: ${kr ?? as} (${Ei})]`,
                        }),
                          xi.push({
                            messageID: St.id,
                            sessionID: ht.sessionID,
                            type: "file",
                            mime: Ei,
                            filename: kr,
                            url: `data:${Ei};base64,${gr.blob}`,
                          }));
                      }
                    }
                  } else {
                    let Fo = hI(go.cause);
                    yield* cf("failed to read MCP resource", { error: Fo, clientName: Mn, uri: as });
                    let en = Fo instanceof Error ? Fo.message : String(Fo);
                    xi.push({
                      messageID: St.id,
                      sessionID: ht.sessionID,
                      type: "text",
                      synthetic: !0,
                      text: `Failed to read MCP resource ${Tr.filename}: ${en}`,
                    });
                  }
                  return xi;
                }
                let Dn = new URL(Tr.url);
                switch (Dn.protocol) {
                  case "data:":
                    if (Tr.mime === "text/plain")
                      return [
                        {
                          messageID: St.id,
                          sessionID: ht.sessionID,
                          type: "text",
                          synthetic: !0,
                          text: `Called the Read tool with the following input: ${JSON.stringify({ filePath: Tr.filename })}`,
                        },
                        {
                          messageID: St.id,
                          sessionID: ht.sessionID,
                          type: "text",
                          synthetic: !0,
                          text: Kzi(Tr.url),
                        },
                        { ...Tr, messageID: St.id, sessionID: ht.sessionID },
                      ];
                    break;
                  case "file:": {
                    yield* fH("file", { mime: Tr.mime });
                    let Mn = qPr(Tr.url),
                      as = (yield* L.isDir(Mn)) ? "application/x-directory" : Tr.mime,
                      { read: xi } = yield* S.named(),
                      go = (Fo, en) => {
                        let gr = new AbortController();
                        return xi
                          .execute(Fo, {
                            sessionID: ht.sessionID,
                            abort: gr.signal,
                            agent: ht.agent,
                            messageID: St.id,
                            extra: { bypassCwdCheck: !0, ...en },
                            messages: [],
                            metadata: () => ti,
                            ask: () => ti,
                          })
                          .pipe(CU(() => jn(() => gr.abort())));
                      };
                    if (as === "text/plain") {
                      let Fo,
                        en,
                        gr = { start: Dn.searchParams.get("start"), end: Dn.searchParams.get("end") };
                      if (gr.start != null) {
                        let oo = Tr.url.split("?")[0],
                          $o = parseInt(gr.start),
                          La = gr.end ? parseInt(gr.end) : void 0;
                        if ($o === La) {
                          let mA = yield* D.documentSymbol(oo).pipe($s(() => Jt([])));
                          for (let Bs of mA) {
                            let iH;
                            if ("range" in Bs) iH = Bs.range;
                            else if ("location" in Bs) iH = Bs.location.range;
                            if (iH?.start?.line && iH?.start?.line === $o) {
                              (($o = iH.start.line), (La = iH?.end?.line ?? $o));
                              break;
                            }
                          }
                        }
                        if (((Fo = Math.max($o, 1)), La)) en = La - (Fo - 1);
                      }
                      let Ei = { filePath: Mn, offset: Fo, limit: en },
                        kr = [
                          {
                            messageID: St.id,
                            sessionID: ht.sessionID,
                            type: "text",
                            synthetic: !0,
                            text: `Called the Read tool with the following input: ${JSON.stringify(Ei)}`,
                          },
                        ],
                        Wi = yield* s.getModel(St.model.providerID, St.model.modelID).pipe(
                          Hi((oo) => go(Ei, { model: oo })),
                          _h,
                        );
                      if (mh(Wi)) {
                        let oo = Wi.value;
                        if (
                          (kr.push({
                            messageID: St.id,
                            sessionID: ht.sessionID,
                            type: "text",
                            synthetic: !0,
                            text: oo.output,
                          }),
                          oo.attachments?.length)
                        )
                          kr.push(
                            ...oo.attachments.map(($o) => ({
                              ...$o,
                              synthetic: !0,
                              filename: $o.filename ?? Tr.filename,
                              messageID: St.id,
                              sessionID: ht.sessionID,
                            })),
                          );
                        else kr.push({ ...Tr, mime: as, messageID: St.id, sessionID: ht.sessionID });
                      } else {
                        let oo = hI(Wi.cause);
                        yield* cf("failed to read file", { error: oo, filepath: Mn });
                        let $o = oo instanceof Error ? oo.message : String(oo);
                        (yield* Ae.publish(pb.Error, {
                          sessionID: ht.sessionID,
                          error: new ud.Unknown({ message: $o }).toObject(),
                        }),
                          kr.push({
                            messageID: St.id,
                            sessionID: ht.sessionID,
                            type: "text",
                            synthetic: !0,
                            text: `Read tool failed to read ${Mn} with the following error: ${$o}`,
                          }));
                      }
                      return kr;
                    }
                    if (as === "application/x-directory") {
                      let Fo = { filePath: Mn },
                        en = yield* go(Fo).pipe(_h);
                      if (LI(en)) {
                        let gr = hI(en.cause);
                        yield* cf("failed to read directory", { error: gr, filepath: Mn });
                        let Ei = gr instanceof Error ? gr.message : String(gr);
                        return (
                          yield* Ae.publish(pb.Error, {
                            sessionID: ht.sessionID,
                            error: new ud.Unknown({ message: Ei }).toObject(),
                          }),
                          [
                            {
                              messageID: St.id,
                              sessionID: ht.sessionID,
                              type: "text",
                              synthetic: !0,
                              text: `Read tool failed to read ${Mn} with the following error: ${Ei}`,
                            },
                          ]
                        );
                      }
                      return [
                        {
                          messageID: St.id,
                          sessionID: ht.sessionID,
                          type: "text",
                          synthetic: !0,
                          text: `Called the Read tool with the following input: ${JSON.stringify(Fo)}`,
                        },
                        {
                          messageID: St.id,
                          sessionID: ht.sessionID,
                          type: "text",
                          synthetic: !0,
                          text: en.value.output,
                        },
                        { ...Tr, mime: as, messageID: St.id, sessionID: ht.sessionID },
                      ];
                    }
                    return [
                      {
                        messageID: St.id,
                        sessionID: ht.sessionID,
                        type: "text",
                        synthetic: !0,
                        text: `Called the Read tool with the following input: {"filePath":"${Mn}"}`,
                      },
                      {
                        id: Tr.id,
                        messageID: St.id,
                        sessionID: ht.sessionID,
                        type: "file",
                        url:
                          `data:${as};base64,` +
                          Buffer.from(yield* L.readFile(Mn).pipe($s(No))).toString("base64"),
                        mime: as,
                        filename: Tr.filename,
                        source: Tr.source,
                      },
                    ];
                  }
                }
              }
              if (Tr.type === "agent") {
                let Mn =
                  IHe("task", Tr.name, tr.permission).action === "deny"
                    ? " . Invoked by user; guaranteed to exist."
                    : "";
                return [
                  { ...Tr, messageID: St.id, sessionID: ht.sessionID },
                  {
                    messageID: St.id,
                    sessionID: ht.sessionID,
                    type: "text",
                    synthetic: !0,
                    text:
                      " Use the above message and context to generate a prompt and call the task tool with subagent: " +
                      Tr.name +
                      Mn,
                  },
                ];
              }
              return [{ ...Tr, messageID: St.id, sessionID: ht.sessionID }];
            }),
            sr = yield* ja(ht.parts, Li, { concurrency: "unbounded" }).pipe(Vn((Tr) => Tr.flat().map(Qr)));
          yield* u.trigger(
            "chat.message",
            {
              sessionID: ht.sessionID,
              agent: ht.agent,
              model: ht.model,
              messageID: ht.messageID,
              variant: ht.variant,
            },
            { message: St, parts: sr },
          );
          let Mt = yield* ja(sr, (Tr) =>
              Tr.type === "file" && Tr.mime.startsWith("image/")
                ? C.normalize(Tr).pipe(
                    GM(
                      (Dn) => Dn instanceof vxr,
                      () => Jt(Tr),
                    ),
                  )
                : Jt(Tr),
            ),
            Lr = HYa(St, { errors: "all", propertyOrder: "original" });
          if (LI(Lr))
            yield* cf("invalid user message before save", {
              sessionID: ht.sessionID,
              messageID: St.id,
              agent: St.agent,
              model: St.model,
              cause: BC(Lr.cause),
            });
          for (let [Tr, Dn] of Mt.entries()) {
            let Mn = cYa(Dn, { errors: "all", propertyOrder: "original" });
            if (mh(Mn)) continue;
            yield* cf("invalid user part before save", {
              sessionID: ht.sessionID,
              messageID: St.id,
              partID: Dn.id,
              partType: Dn.type,
              index: Tr,
              cause: BC(Mn.cause),
              part: Dn,
            });
          }
          yield* t.updateMessage(St);
          for (let Tr of Mt) yield* t.updatePart(Tr);
          return { info: St, parts: Mt };
        }, FL),
        Ve = Ge("SessionPrompt.prompt")(function* (ht) {
          let Et = yield* t.get(ht.sessionID).pipe(on);
          yield* Z.cleanup(Et);
          let tr = yield* Ee(ht);
          yield* t.touch(ht.sessionID);
          let Rr = [];
          for (let [Vt, Br] of Object.entries(ht.tools ?? {}))
            Rr.push({ permission: Vt, action: Br ? "allow" : "deny", pattern: "*" });
          if (Rr.length > 0)
            ((Et.permission = Rr), yield* t.setPermission({ sessionID: Et.id, permission: Rr }));
          if (ht.noReply === !0) return tr;
          return yield* At({ sessionID: ht.sessionID });
        }),
        Fe = ni(function* (ht) {
          let Et = yield* t.findMessage(ht, (Rr) => Rr.info.role !== "user").pipe(on);
          if (Nu(Et)) return Et.value;
          let tr = yield* t.messages({ sessionID: ht, limit: 1 }).pipe(on);
          if (tr.length > 0) return tr[0];
          throw Error("Impossible");
        }),
        it = Ge("SessionPrompt.run")(function* (ht) {
          let Et = yield* Jc,
            tr,
            Rr = 0,
            Vt,
            Br,
            Dt = 0,
            St = yield* t.get(ht).pipe(on);
          while (!0) {
            (yield* e.set(ht, { type: "busy" }), yield* fH("loop", { "session.id": ht, step: Rr }));
            let wt = yield* pja(ht).pipe(IA(Vd, Be)),
              { user: Qr, assistant: Li, finished: sr, tasks: Mt } = dja(wt);
            if (!Qr) throw Error("No user message found in stream. This should never happen.");
            if (Vt !== Qr.id) Vt = void 0;
            if (Br !== Qr.id) Br = void 0;
            let Lr = wt.findLast((kr) => kr.info.role === "assistant" && kr.info.id === Li?.id),
              Tr =
                Lr?.parts.some((kr) => kr.type === "tool" && !kr.metadata?.providerExecuted && !AQi(kr)) ??
                !1;
            if (
              Li?.finish &&
              !["tool-calls", "unknown"].includes(Li.finish) &&
              (!Tr || (Li.providerID === QL && Li.finish === "length")) &&
              !Vt &&
              !Br &&
              Li.parentID === Qr.id
            ) {
              let kr = Lr?.parts.find((Wi) => Wi.type === "tool" && AQi(Wi));
              if (kr)
                yield* lp("loop exit with orphaned interrupted tool", {
                  "session.id": ht,
                  messageID: Li.id,
                  tool: kr.tool,
                  callID: kr.callID,
                });
              yield* fH("exiting loop", { "session.id": ht });
              break;
            }
            if ((Rr++, Rr === 1))
              yield* _e({
                session: St,
                modelID: Qr.model.modelID,
                providerID: Qr.model.providerID,
                history: wt,
              }).pipe(FA, zm(B));
            let Dn = yield* ye(Qr.model.providerID, Qr.model.modelID, ht),
              Mn = Mt.pop();
            if (Mn?.type === "subtask") {
              yield* we({ task: Mn, model: Dn, lastUser: Qr, sessionID: ht, session: St, msgs: wt });
              continue;
            }
            if (Mn?.type === "compaction") {
              if (
                (yield* H.process({
                  messages: wt,
                  parentID: Qr.id,
                  sessionID: ht,
                  auto: Mn.auto && !Vt && !Br,
                  overflow: Mn.overflow,
                })) === "stop"
              )
                break;
              continue;
            }
            if (sr && sr.summary !== !0 && (yield* H.isOverflow({ tokens: sr.tokens, model: Dn }))) {
              let kr = yield* H.create({ sessionID: ht, agent: Qr.agent, model: Qr.model, auto: !0 });
              if (Vt) Vt = kr;
              if (Br) Br = kr;
              continue;
            }
            let as = yield* r.get(Qr.agent);
            if (!as) {
              let kr = (yield* r.list()).filter(($o) => !$o.hidden).map(($o) => $o.name),
                Wi = kr.length ? ` Available agents: ${kr.join(", ")}` : "",
                oo = new ud.Unknown({ message: `Agent not found: "${Qr.agent}".${Wi}` });
              throw (yield* Ae.publish(pb.Error, { sessionID: ht, error: oo.toObject() }), oo);
            }
            let xi = as.steps ?? 1 / 0,
              go = Rr >= xi;
            wt = yield* eYa({ messages: wt, agent: as, session: St }).pipe(
              IA(NE, le),
              IA(ui.Service, L),
              IA(Mg, t),
            );
            let Fo = {
              id: Td.ascending(),
              parentID: Qr.id,
              role: "assistant",
              mode: as.name,
              agent: as.name,
              variant: Qr.model.variant,
              path: { cwd: Et.directory, root: Et.worktree },
              cost: 0,
              tokens: { input: 0, output: 0, reasoning: 0, cache: { read: 0, write: 0 } },
              modelID: Dn.id,
              providerID: Dn.providerID,
              time: { created: Date.now() },
              sessionID: ht,
            };
            yield* t.updateMessage(Fo);
            let en = ft(function* () {
                if (Fo.time.completed) return;
                ((Fo.error ??= EOi(new DOMException("Aborted", "AbortError"), {
                  providerID: Fo.providerID,
                  aborted: !0,
                })),
                  (Fo.time.completed = Date.now()),
                  yield* t.updateMessage(Fo));
              }),
              gr = yield* a.create({ assistantMessage: Fo, sessionID: ht, model: Dn }).pipe(CU(() => en));
            if (
              (yield* ft(function* () {
                let Wi =
                    wt.findLast((b_) => b_.info.role === "user")?.parts.some((b_) => b_.type === "agent") ??
                    !1,
                  oo = yield* Lt(),
                  $o = yield* tYa({
                    agent: as,
                    session: St,
                    model: Dn,
                    processor: gr,
                    bypassAgentCheck: Wi,
                    messages: wt,
                    promptOps: oo,
                  }).pipe(IA(IT, u), IA(FB, _), IA(nAe, S), IA(MP, I), IA(RN, T), IA(NE, le));
                if (Qr.format?.type === "json_schema")
                  $o.StructuredOutput = $Ya({
                    schema: Qr.format.schema,
                    onSuccess(b_) {
                      tr = b_;
                    },
                  });
                if (Rr === 1) yield* se.summarize({ sessionID: ht, messageID: Qr.id }).pipe(FA, zm(B));
                yield* u.trigger("experimental.chat.messages.transform", {}, { messages: wt });
                let [La, mA, Bs, iH, xa] = yield* Km([
                    ae.skills(as),
                    ae.environment(Dn),
                    V.system().pipe(on),
                    ae.mcp(as, St.permission),
                    Ayr(wt, Dn),
                  ]),
                  sH = [...mA, ...Bs, ...(iH ? [iH] : []), ...(La ? [La] : [])],
                  Ys = Qr.format ?? { type: "text" };
                if (Ys.type === "json_schema") sH.push(fYa);
                let i_ = Vt !== void 0,
                  jc = Br !== void 0;
                ((Vt = void 0), (Br = void 0));
                let gH =
                    !St.parentID && Dn.providerID === QL && Ys.type === "text" && !go && Dt < AYa
                      ? Dt + 1
                      : void 0,
                  Yl = yield* gr.process(
                    {
                      user: Qr,
                      agent: as,
                      permission: St.permission,
                      sessionID: ht,
                      parentSessionID: St.parentID,
                      system: sH,
                      messages: [
                        ...xa,
                        ...(jc ? [{ role: "user", content: gZr }] : []),
                        ...(go ? [{ role: "assistant", content: zMt }] : []),
                      ],
                      tools: $o,
                      model: Dn,
                      toolChoice: Ys.type === "json_schema" ? "required" : void 0,
                      ...(i_ ? { continuation: "length" } : {}),
                    },
                    gH,
                  );
                if (gr.resumeRequested) return (Dt++, (Br = Qr.id), "continue");
                if (
                  Dn.providerID === QL &&
                  Ys.type === "text" &&
                  gr.message.finish === "length" &&
                  gr.streamCompleted === !0 &&
                  !gr.message.error &&
                  Yl !== "stop"
                ) {
                  let b_ = yield* uyr(gr.message.id).pipe(IA(Vd, Be));
                  if (
                    b_.some((vx) => vx.type === "text" && !vx.ignored && vx.text.trim()) &&
                    b_.every((vx) => vx.type !== "tool" || vx.state.status === "completed")
                  )
                    Vt = Qr.id;
                }
                if (Dn.providerID === QL && Ys.type === "text" && gr.message.finish === "length" && !Vt)
                  return "break";
                if (tr !== void 0)
                  return (
                    (gr.message.structured = tr),
                    (gr.message.finish = gr.message.finish ?? "stop"),
                    yield* t.updateMessage(gr.message),
                    "break"
                  );
                if (
                  gr.message.finish &&
                  !["tool-calls", "unknown"].includes(gr.message.finish) &&
                  !gr.message.error
                ) {
                  if (gr.message.finish === "content-filter")
                    return (
                      (gr.message.error = new Xao({
                        message: "The response was blocked by the provider's content filter",
                      }).toObject()),
                      yield* t.updateMessage(gr.message),
                      yield* Ae.publish(pb.Error, { sessionID: ht, error: gr.message.error }),
                      "break"
                    );
                  if (Ys.type === "json_schema")
                    return (
                      (gr.message.error = new Gao({
                        message: "Model did not produce structured output",
                        retries: 0,
                      }).toObject()),
                      yield* t.updateMessage(gr.message),
                      "break"
                    );
                }
                if (Yl === "stop") return "break";
                if (Yl === "compact") {
                  let b_ = yield* H.create({
                    sessionID: ht,
                    agent: Qr.agent,
                    model: Qr.model,
                    auto: !0,
                    overflow: !gr.message.finish,
                  });
                  if (Vt) Vt = b_;
                }
                return "continue";
              }).pipe(
                up(V.clear(gr.message.id)),
                CU(() => en),
              )) === "break"
            )
              break;
            continue;
          }
          return (yield* H.prune({ sessionID: ht }).pipe(FA, zm(B)), yield* Fe(ht));
        }),
        At = Ge("SessionPrompt.loop")(function* (ht) {
          return yield* q.ensureRunning(ht.sessionID, Fe(ht.sessionID), it(ht.sessionID));
        }),
        et = Ge("SessionPrompt.shell")(function* (ht) {
          let Et = yield* iYt();
          return yield* q.startShell(ht.sessionID, Fe(ht.sessionID), Pe(ht, Et), Et);
        }),
        ut = Ge("SessionPrompt.command")(function* (ht) {
          yield* fH("command", { "session.id": ht.sessionID, command: ht.command, agent: ht.agent });
          let Et = yield* f.get(ht.command);
          if (!Et) {
            let gr = (yield* f.list()).map((Wi) => Wi.name),
              Ei = gr.length ? ` Available commands: ${gr.join(", ")}` : "",
              kr = new ud.Unknown({ message: `Command not found: "${ht.command}".${Ei}` });
            throw (yield* Ae.publish(pb.Error, { sessionID: ht.sessionID, error: kr.toObject() }), kr);
          }
          let tr = Et.agent ?? ht.agent,
            Vt = (ht.arguments.match(EYa) ?? []).map((gr) => gr.replace(IYa, "")),
            Br = yield* nA(async () => Et.template),
            Dt = Br.match(uQi) ?? [],
            St = 0;
          for (let gr of Dt) {
            let Ei = Number(gr.slice(1));
            if (Ei > St) St = Ei;
          }
          let wt = Br.replaceAll(uQi, (gr, Ei) => {
              let kr = Number(Ei),
                Wi = kr - 1;
              if (Wi >= Vt.length) return "";
              if (kr === St) return Vt.slice(Wi).join(" ");
              return Vt[Wi];
            }),
            Qr = Br.includes("$ARGUMENTS"),
            Li = wt.replaceAll("$ARGUMENTS", ht.arguments);
          if (Dt.length === 0 && !Qr && ht.arguments.trim())
            Li =
              Li +
              `

` +
              ht.arguments;
          let sr = Ova(Li);
          if (sr.length > 0) {
            let gr = yield* d.get(),
              Ei = uMt(gr.shell),
              kr = yield* nA(() =>
                Promise.all(sr.map(async ([, oo]) => (await gjr([oo], { shell: Ei, nothrow: !0 })).text)),
              ),
              Wi = 0;
            Li = Li.replace(gYa, () => kr[Wi++]);
          }
          Li = Li.trim();
          let Mt = yield* ft(function* () {
            if (Et.model) return OTt(Et.model);
            if (Et.agent) {
              let gr = yield* r.get(Et.agent);
              if (gr?.model) return gr.model;
            }
            if (ht.model) return OTt(ht.model);
            return yield* ot(ht.sessionID);
          });
          yield* ye(Mt.providerID, Mt.modelID, ht.sessionID);
          let Lr = tr ? yield* r.get(tr) : yield* r.defaultInfo();
          if (!Lr) {
            let gr = (yield* r.list()).filter((Wi) => !Wi.hidden).map((Wi) => Wi.name),
              Ei = gr.length ? ` Available agents: ${gr.join(", ")}` : "",
              kr = new ud.Unknown({ message: `Agent not found: "${tr}".${Ei}` });
            throw (yield* Ae.publish(pb.Error, { sessionID: ht.sessionID, error: kr.toObject() }), kr);
          }
          let Tr = yield* Se(Li),
            Dn = new Set(
              ht.parts?.filter((gr) => new URL(gr.url).protocol === "file:").map((gr) => qPr(gr.url)),
            ),
            Mn = Tr.filter((gr) => gr.type !== "file" || !Dn.has(qPr(gr.url))),
            as = (Lr.mode === "subagent" && Et.subtask !== !1) || Et.subtask === !0,
            xi = as
              ? [
                  {
                    type: "subtask",
                    agent: Lr.name,
                    description: Et.description ?? "",
                    command: ht.command,
                    model: { providerID: Mt.providerID, modelID: Mt.modelID },
                    prompt: Tr.find((gr) => gr.type === "text")?.text ?? "",
                  },
                ]
              : [...Mn, ...(ht.parts ?? [])],
            go = as ? (ht.agent ?? (yield* r.defaultInfo()).name) : Lr.name,
            Fo = as ? (ht.model ? OTt(ht.model) : yield* ot(ht.sessionID)) : Mt;
          yield* u.trigger(
            "command.execute.before",
            { command: ht.command, sessionID: ht.sessionID, arguments: ht.arguments },
            { parts: xi },
          );
          let en = yield* Ve({
            sessionID: ht.sessionID,
            messageID: ht.messageID,
            model: Fo,
            agent: go,
            parts: xi,
            variant: ht.variant,
          });
          return (
            yield* Ae.publish(y3i.Executed, {
              name: ht.command,
              sessionID: ht.sessionID,
              arguments: ht.arguments,
              messageID: en.info.id,
            }),
            en
          );
        });
      return Ewe.of({ cancel: Ht, prompt: Ve, loop: At, shell: et, command: ut, resolvePromptParts: Se });
    }),
  )),
    (lQi = nt({ providerID: Kp, modelID: WL })),
    (mYa = nt({
      sessionID: Ec,
      messageID: be(Td),
      model: be(lQi),
      agent: be(re),
      noReply: be(Vi),
      tools: be(ks(re, Vi)).annotate({
        description:
          "@deprecated tools and permissions have been merged, you can set permissions on the session itself now",
      }),
      format: be(wir),
      system: be(re),
      variant: be(re),
      parts: On(Io([Kyn, zyn, Qyn, Yyn]).annotate({ discriminator: "type" })),
    })));
  _Ya = class _Ya extends Pa("SessionPrompt.LoopInput")({ sessionID: Ec }) {};
  ((hYa = nt({ sessionID: Ec, messageID: be(Td), agent: re, model: be(lQi), command: re })),
    (LYa = nt({
      messageID: be(Td),
      sessionID: Ec,
      agent: be(re),
      model: be(re),
      arguments: re,
      command: re,
      variant: be(re),
      parts: be(
        On(
          Io([
            nt({ id: be(Zp), type: ri("file"), mime: re, filename: be(re), url: re, source: be(lht) }),
          ]).annotate({ discriminator: "type" }),
        ),
      ),
    })));
  ((gYa = /!`([^`]+)`/g),
    (EYa = /(?:\[Image\s+\d+\]|"[^"]*"|'[^']*'|[^\s"']+)/gi),
    (uQi = /\$(\d+)/g),
    (IYa = /^["']|["']$/g),
    (XPr = Ll({
      service: Ewe,
      layer: dYa,
      deps: [
        tJe,
        WB,
        Mje,
        jhe,
        qPt,
        Cbr,
        bX,
        mxr,
        Ab,
        J5e,
        ui.node,
        $Pe,
        iQe,
        BPr,
        K5e,
        Z3i,
        qMe,
        JPt,
        hjt,
        wbr,
        Bze,
        P7a,
        WPt,
        q1,
        WN,
        DD,
      ],
    })));
});
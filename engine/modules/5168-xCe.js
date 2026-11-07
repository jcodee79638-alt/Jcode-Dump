
var xCe = ne(async () => {
  au();
  VZ();
  Ljt();
  N2();
  Gt();
  aL();
  o0();
  lb();
  Tbr();
  jbr();
  cee();
  iXe();
  CE();
  ghe();
  Gfe();
  await Jn([Jw(), ET(), kX(), e$(), RLe(), vHe(), jI(), Eee(), Fee(), XN(), ZL(), qL(), xCe()]);
  MCe = class MCe extends _i()("@opencode/SessionProcessor") {};
  ((p7a = Es(
    MCe,
    ft(function* () {
      let e = yield* Mg,
        t = yield* Eg,
        r = yield* jHe,
        s = yield* DP,
        a = yield* bce,
        H = yield* FB,
        u = yield* IT,
        f = yield* jce,
        d = yield* $f,
        _ = yield* ace,
        L = yield* nJe,
        I = yield* B$,
        D = yield* Vd,
        S = Ge("SessionProcessor.create")(function* (T) {
          let C = yield* r.track(),
            O = {
              assistantMessage: T.assistantMessage,
              sessionID: T.sessionID,
              model: T.model,
              toolcalls: {},
              shouldBreak: !1,
              snapshot: C,
              blocked: !1,
              needsCompaction: !1,
              currentText: void 0,
              reasoningMap: {},
            },
            B = !1,
            V = !1,
            q,
            Z = !1,
            se = !1,
            ae = (Ee) => EOi(Ee, { providerID: T.model.providerID, aborted: B }),
            z = Ge("SessionProcessor.settleToolCall")(function* (Ee) {
              let Ve = O.toolcalls[Ee]?.done;
              if ((delete O.toolcalls[Ee], Ve)) yield* D6(Ve, void 0).pipe(FA);
            }),
            Ae = Ge("SessionProcessor.readToolCall")(function* (Ee) {
              let Ve = O.toolcalls[Ee];
              if (!Ve) return;
              let Fe = yield* e.getPart({
                partID: Ve.partID,
                messageID: Ve.messageID,
                sessionID: Ve.sessionID,
              });
              if (!Fe || Fe.type !== "tool") {
                delete O.toolcalls[Ee];
                return;
              }
              return { call: Ve, part: Fe };
            }),
            le = Ge("SessionProcessor.updateToolCall")(function* (Ee, Ve) {
              let Fe = yield* Ae(Ee);
              if (!Fe) return;
              let it = yield* e.updatePart(Ve(Fe.part));
              return (
                (O.toolcalls[Ee] = {
                  ...Fe.call,
                  partID: it.id,
                  messageID: it.messageID,
                  sessionID: it.sessionID,
                }),
                it
              );
            }),
            Be = Ge("SessionProcessor.completeToolCall")(function* (Ee, Ve) {
              let Fe = yield* Ae(Ee);
              if (!Fe || Fe.part.state.status !== "running") return;
              (yield* e.updatePart({
                ...Fe.part,
                state: {
                  status: "completed",
                  input: Fe.part.state.input,
                  output: Ve.output,
                  metadata: Ve.metadata,
                  title: Ve.title,
                  time: { start: Fe.part.state.time.start, end: Date.now() },
                  attachments: Ve.attachments,
                },
              }),
                yield* z(Ee));
            }),
            Te = Ge("SessionProcessor.failToolCall")(function* (Ee, Ve) {
              let Fe = yield* Ae(Ee);
              if (!Fe || Fe.part.state.status !== "running") return !1;
              if (
                (yield* e.updatePart({
                  ...Fe.part,
                  state: {
                    status: "error",
                    input: Fe.part.state.input,
                    error: fx(Ve),
                    metadata: Fe.part.state.metadata,
                    time: { start: Fe.part.state.time.start, end: Date.now() },
                  },
                }),
                Ve instanceof JGe || Ve instanceof eJe)
              )
                O.blocked = O.shouldBreak;
              return (yield* z(Ee), !0);
            }),
            Lt = Ge("SessionProcessor.finishReasoning")(function* (Ee) {
              if (!(Ee in O.reasoningMap)) return;
              ((O.reasoningMap[Ee].text = O.reasoningMap[Ee].text),
                (O.reasoningMap[Ee].time = { ...O.reasoningMap[Ee].time, end: Date.now() }),
                yield* e.updatePart(O.reasoningMap[Ee]),
                delete O.reasoningMap[Ee]);
            }),
            Ht = Ge("SessionProcessor.ensureToolCall")(function* (Ee) {
              let Ve = yield* Ae(Ee.id);
              if (Ve) {
                if (!Ee.providerExecuted || Ve.part.metadata?.providerExecuted) return Ve;
                let it = yield* e.updatePart({
                  ...Ve.part,
                  metadata: { ...Ve.part.metadata, providerExecuted: !0 },
                });
                return (
                  (O.toolcalls[Ee.id] = {
                    ...Ve.call,
                    partID: it.id,
                    messageID: it.messageID,
                    sessionID: it.sessionID,
                  }),
                  { call: O.toolcalls[Ee.id], part: it }
                );
              }
              let Fe = yield* e.updatePart({
                id: Zp.ascending(),
                messageID: O.assistantMessage.id,
                sessionID: O.assistantMessage.sessionID,
                type: "tool",
                tool: Ee.name,
                callID: Ee.id,
                state: { status: "pending", input: {}, raw: "" },
                metadata: Ee.providerExecuted ? { providerExecuted: !0 } : void 0,
              });
              return (
                (O.toolcalls[Ee.id] = {
                  done: yield* bU(),
                  partID: Fe.id,
                  messageID: Fe.messageID,
                  sessionID: Fe.sessionID,
                }),
                { call: O.toolcalls[Ee.id], part: Fe }
              );
            }),
            Se = (Ee) => Jie(fht)(Ee),
            _e = (Ee) => {
              if (ux(Ee.result.value) && typeof Ee.result.value.output === "string")
                return {
                  title: typeof Ee.result.value.title === "string" ? Ee.result.value.title : Ee.name,
                  metadata: ux(Ee.result.value.metadata) ? Ee.result.value.metadata : {},
                  output: Ee.result.value.output,
                  attachments: Array.isArray(Ee.result.value.attachments)
                    ? Ee.result.value.attachments.filter(Se)
                    : void 0,
                };
              return {
                title: Ee.name,
                metadata: Ee.result.type === "json" && ux(Ee.result.value) ? Ee.result.value : {},
                output:
                  typeof Ee.result.value === "string"
                    ? Ee.result.value
                    : (JSON.stringify(Ee.result.value) ?? ""),
              };
            },
            we = ni(function* (Ee) {
              if (Ee.type.startsWith("tool-")) Z = !0;
              switch (Ee.type) {
                case "reasoning-start":
                  if (Ee.id in O.reasoningMap) return;
                  ((O.reasoningMap[Ee.id] = {
                    id: Zp.ascending(),
                    messageID: O.assistantMessage.id,
                    sessionID: O.assistantMessage.sessionID,
                    type: "reasoning",
                    text: "",
                    time: { start: Date.now() },
                    metadata: Ee.providerMetadata,
                  }),
                    yield* e.updatePart(O.reasoningMap[Ee.id]));
                  return;
                case "reasoning-delta":
                  if (!(Ee.id in O.reasoningMap)) return;
                  if (((O.reasoningMap[Ee.id].text += Ee.text), Ee.providerMetadata))
                    O.reasoningMap[Ee.id].metadata = Ee.providerMetadata;
                  yield* e.updatePartDelta({
                    sessionID: O.reasoningMap[Ee.id].sessionID,
                    messageID: O.reasoningMap[Ee.id].messageID,
                    partID: O.reasoningMap[Ee.id].id,
                    field: "text",
                    delta: Ee.text,
                  });
                  return;
                case "reasoning-end":
                  if (Ee.providerMetadata && Ee.id in O.reasoningMap)
                    O.reasoningMap[Ee.id].metadata = Ee.providerMetadata;
                  yield* Lt(Ee.id);
                  return;
                case "tool-input-start":
                  if (O.assistantMessage.summary)
                    throw Error(`Tool call not allowed while generating summary: ${Ee.name}`);
                  yield* Ht(Ee);
                  return;
                case "tool-input-delta":
                  yield* Ht(Ee);
                  return;
                case "tool-input-end": {
                  yield* Ht(Ee);
                  return;
                }
                case "tool-call": {
                  if (O.assistantMessage.summary)
                    throw Error(`Tool call not allowed while generating summary: ${Ee.name}`);
                  yield* Ht(Ee);
                  let Ve = ux(Ee.input) ? Ee.input : { value: Ee.input };
                  yield* le(Ee.id, (et) => ({
                    ...et,
                    tool: Ee.name,
                    state:
                      et.state.status === "running"
                        ? { ...et.state, input: Ve }
                        : { status: "running", input: Ve, time: { start: Date.now() } },
                    metadata: et.metadata?.providerExecuted
                      ? { ...Ee.providerMetadata, providerExecuted: !0 }
                      : Ee.providerMetadata,
                  }));
                  let it = (yield* uyr(O.assistantMessage.id).pipe(IA(Vd, D))).slice(-l4i);
                  if (
                    it.length !== l4i ||
                    !it.every(
                      (et) =>
                        et.type === "tool" &&
                        et.tool === Ee.name &&
                        et.state.status !== "pending" &&
                        JSON.stringify(et.state.input) === JSON.stringify(Ve),
                    )
                  )
                    return;
                  let At = yield* s.get(O.assistantMessage.agent);
                  yield* H.ask({
                    permission: "doom_loop",
                    patterns: [Ee.name],
                    sessionID: O.assistantMessage.sessionID,
                    metadata: { tool: Ee.name, input: Ve },
                    always: [Ee.name],
                    ruleset: At.permission,
                  });
                  return;
                }
                case "tool-result": {
                  if (!(yield* Ae(Ee.id)) && Ee.result.type === "error") return;
                  if (Ee.result.type === "error") {
                    yield* Te(Ee.id, Ee.result.value);
                    return;
                  }
                  let Fe = _e(Ee),
                    it = yield* ja(Fe.attachments ?? [], (ht) =>
                      ht.mime.startsWith("image/")
                        ? L.normalize(ht).pipe(
                            GM(
                              (Et) => Et instanceof vxr,
                              () => Jt(ht),
                            ),
                            _h,
                          )
                        : Jt(RC(ht)),
                    ),
                    At = it.filter(LI).length,
                    et = it.filter(mh).map((ht) => ht.value),
                    ut = {
                      ...Fe,
                      output:
                        At === 0
                          ? Fe.output
                          : `${Fe.output}

[${At} image${At === 1 ? "" : "s"} omitted: could not be resized below the image size limit.]`,
                      attachments: et.length ? et : void 0,
                    };
                  yield* Be(Ee.id, ut);
                  return;
                }
                case "tool-error": {
                  yield* Te(Ee.id, Ee.error ?? Error(Ee.message));
                  return;
                }
                case "provider-error":
                  throw Error(Ee.message);
                case "step-start":
                  if (!O.snapshot) O.snapshot = yield* r.track();
                  yield* e.updatePart({
                    id: Zp.ascending(),
                    messageID: O.assistantMessage.id,
                    sessionID: O.sessionID,
                    snapshot: O.snapshot,
                    type: "step-start",
                  });
                  return;
                case "step-finish": {
                  let Ve = yield* r.track();
                  yield* ja(Object.keys(O.reasoningMap), Lt);
                  let Fe = ux(Ee.providerMetadata?.anthropic)
                    ? Ee.providerMetadata.anthropic.inputTransformations
                    : void 0;
                  if (Array.isArray(Fe) && Fe.length > 0)
                    yield* lp("thinking blocks dropped by provider", {
                      sessionID: O.sessionID,
                      messageID: O.assistantMessage.id,
                      model: O.model.id,
                      transformations: JSON.stringify(Fe),
                    });
                  let it = wOi({
                    model: O.model,
                    usage: Ee.usage ?? new Xv({}),
                    metadata: Ee.providerMetadata,
                  });
                  if (
                    ((O.assistantMessage.finish = Ee.reason),
                    (O.assistantMessage.cost += it.cost),
                    (O.assistantMessage.tokens = it.tokens),
                    yield* e.updatePart({
                      id: Zp.ascending(),
                      reason: Ee.reason,
                      snapshot: Ve,
                      messageID: O.assistantMessage.id,
                      sessionID: O.assistantMessage.sessionID,
                      type: "step-finish",
                      tokens: it.tokens,
                      cost: it.cost,
                    }),
                    yield* e.updateMessage(O.assistantMessage),
                    O.snapshot)
                  ) {
                    let At = yield* r.patch(O.snapshot);
                    if (At.files.length)
                      yield* e.updatePart({
                        id: Zp.ascending(),
                        messageID: O.assistantMessage.id,
                        sessionID: O.sessionID,
                        type: "patch",
                        hash: At.hash,
                        files: At.files,
                      });
                    O.snapshot = void 0;
                  }
                  if (
                    (yield* f
                      .summarize({ sessionID: O.sessionID, messageID: O.assistantMessage.parentID })
                      .pipe(FA, zm(d)),
                    !O.assistantMessage.summary &&
                      VPt({ cfg: yield* t.get(), tokens: it.tokens, model: O.model }))
                  )
                    O.needsCompaction = !0;
                  return;
                }
                case "text-start":
                  ((O.currentText = {
                    id: Zp.ascending(),
                    messageID: O.assistantMessage.id,
                    sessionID: O.assistantMessage.sessionID,
                    type: "text",
                    text: "",
                    time: { start: Date.now() },
                    metadata: Ee.providerMetadata,
                  }),
                    yield* e.updatePart(O.currentText));
                  return;
                case "text-delta":
                  if (!O.currentText) return;
                  if (((O.currentText.text += Ee.text), Ee.providerMetadata))
                    O.currentText.metadata = Ee.providerMetadata;
                  yield* e.updatePartDelta({
                    sessionID: O.currentText.sessionID,
                    messageID: O.currentText.messageID,
                    partID: O.currentText.id,
                    field: "text",
                    delta: Ee.text,
                  });
                  return;
                case "text-end":
                  if (!O.currentText) return;
                  ((O.currentText.text = O.currentText.text),
                    (O.currentText.text = (yield* u.trigger(
                      "experimental.text.complete",
                      { sessionID: O.sessionID, messageID: O.assistantMessage.id, partID: O.currentText.id },
                      { text: O.currentText.text },
                    )).text));
                  {
                    let Ve = Date.now();
                    O.currentText.time = { start: O.currentText.time?.start ?? Ve, end: Ve };
                  }
                  if (Ee.providerMetadata) O.currentText.metadata = Ee.providerMetadata;
                  (yield* e.updatePart(O.currentText), (O.currentText = void 0));
                  return;
                case "finish":
                  q = Ee.reason;
                  return;
              }
            }),
            Pe = Ge("SessionProcessor.cleanup")(function* () {
              if (O.snapshot) {
                let Ee = yield* r.patch(O.snapshot);
                if (Ee.files.length)
                  yield* e.updatePart({
                    id: Zp.ascending(),
                    messageID: O.assistantMessage.id,
                    sessionID: O.sessionID,
                    type: "patch",
                    hash: Ee.hash,
                    files: Ee.files,
                  });
                O.snapshot = void 0;
              }
              if (O.currentText) {
                let Ee = Date.now();
                ((O.currentText.time = { start: O.currentText.time?.start ?? Ee, end: Ee }),
                  yield* e.updatePart(O.currentText),
                  (O.currentText = void 0));
              }
              for (let Ee of Object.values(O.reasoningMap)) {
                let Ve = Date.now();
                yield* e.updatePart({ ...Ee, time: { start: Ee.time.start ?? Ve, end: Ve } });
              }
              ((O.reasoningMap = {}),
                yield* ja(Object.values(O.toolcalls), (Ee) => Fl(Ee.done).pipe(vW("250 millis"), FA), {
                  concurrency: "unbounded",
                }));
              for (let Ee of Object.keys(O.toolcalls)) {
                let Ve = yield* Ae(Ee);
                if (!Ve) continue;
                let Fe = Ve.part,
                  it = Date.now(),
                  At = "metadata" in Fe.state && ux(Fe.state.metadata) ? Fe.state.metadata : {};
                yield* e.updatePart({
                  ...Fe,
                  state: {
                    ...Fe.state,
                    status: "error",
                    error: "Tool execution aborted",
                    metadata: { ...At, interrupted: !0 },
                    time: { start: "time" in Fe.state ? Fe.state.time.start : it, end: it },
                  },
                });
              }
              ((O.toolcalls = {}),
                (O.assistantMessage.time.completed = Date.now()),
                yield* e.updateMessage(O.assistantMessage));
            }),
            ye = Ge("SessionProcessor.halt")(function* (Ee) {
              ((V = !1),
                yield* cf("process", {
                  "session.id": T.sessionID,
                  messageID: T.assistantMessage.id,
                  error: fx(Ee),
                  stack: Ee instanceof Error ? Ee.stack : void 0,
                }));
              let Ve = ae(Ee);
              if (yxe.isInstance(Ve)) {
                if ((yield* t.get()).compaction?.auto === !1 && !O.assistantMessage.summary) {
                  ((O.assistantMessage.error = Ve),
                    (O.assistantMessage.finish = "error"),
                    yield* I.publish(pb.Error, { sessionID: O.sessionID, error: Ve }),
                    yield* _.set(O.sessionID, { type: "idle" }));
                  return;
                }
                ((O.needsCompaction = !0), yield* I.publish(pb.Error, { sessionID: O.sessionID, error: Ve }));
                return;
              }
              ((O.assistantMessage.error = Ve),
                yield* I.publish(pb.Error, {
                  sessionID: O.assistantMessage.sessionID,
                  error: O.assistantMessage.error,
                }),
                yield* _.set(O.sessionID, { type: "idle" }));
            }),
            ot = Ge("SessionProcessor.process")(function* (Ee, Ve) {
              return (
                (V = !1),
                (Z = !1),
                (se = !1),
                yield* fH("process", { "session.id": T.sessionID, messageID: T.assistantMessage.id }),
                (O.needsCompaction = !1),
                (O.shouldBreak = (yield* t.get()).experimental?.continue_loop_on_deny !== !0),
                yield* ft(function* () {
                  if (
                    (yield* ft(function* () {
                      ((V = !1),
                        (q = void 0),
                        (O.currentText = void 0),
                        (O.reasoningMap = {}),
                        yield* _.set(O.sessionID, { type: "busy" }),
                        yield* a.stream(Ee).pipe(
                          VYt((it) => we(it)),
                          p1e(
                            () =>
                              O.needsCompaction &&
                              !(O.model.providerID === QL && O.assistantMessage.finish === "length"),
                          ),
                          gcn,
                        ),
                        (V =
                          q !== void 0 &&
                          q === O.assistantMessage.finish &&
                          Object.keys(O.toolcalls).length === 0 &&
                          !O.blocked &&
                          !O.assistantMessage.error));
                    }).pipe(
                      CU(() =>
                        ft(function* () {
                          if (((V = !1), (B = !0), !O.assistantMessage.error))
                            yield* ye(new DOMException("Aborted", "AbortError"));
                        }),
                      ),
                      Fsn(
                        (Fe) => !d1(Fe),
                        (Fe) => bn(hI(Fe)),
                      ),
                      ult(
                        A7a({
                          provider: T.model.providerID,
                          parse: ae,
                          set: (Fe) =>
                            _.set(O.sessionID, {
                              type: "retry",
                              attempt: Fe.attempt,
                              message: Fe.message,
                              action: Fe.action,
                              next: Fe.next,
                            }),
                        }),
                      ),
                      $s(
                        ni(function* (Fe) {
                          let it = ae(Fe);
                          if (
                            !Ve ||
                            T.model.providerID !== QL ||
                            Z ||
                            O.blocked ||
                            B ||
                            !z6.isInstance(it) ||
                            it.data.statusCode !== void 0 ||
                            !DAt(it.data.responseBody)
                          ) {
                            yield* ye(Fe);
                            return;
                          }
                          (yield* _.set(O.sessionID, {
                            type: "retry",
                            attempt: Ve,
                            message: "Continuing from saved progress",
                            next: Date.now() + f4i,
                          }),
                            yield* Qq(f4i).pipe(CU(() => ye(new DOMException("Aborted", "AbortError")))),
                            (O.assistantMessage.finish = "error"),
                            (se = !0));
                        }),
                      ),
                      up(Pe()),
                    ),
                    se)
                  )
                    return "continue";
                  if (O.needsCompaction) return "compact";
                  if (O.blocked || O.assistantMessage.error) return "stop";
                  return "continue";
                })
              );
            });
          return {
            get message() {
              return O.assistantMessage;
            },
            get streamCompleted() {
              return V;
            },
            get resumeRequested() {
              return se;
            },
            updateToolCall: le,
            completeToolCall: Be,
            process: ot,
          };
        });
      return MCe.of({ create: S });
    }),
  )),
    (qPt = Ll({ service: MCe, layer: p7a, deps: [WB, Ab, Eje, Mje, WPt, J5e, bX, Bze, tJe, Z3i, q1, DD] })));
});
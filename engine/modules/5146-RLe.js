
var RLe = ne(async () => {
  au();
  vy();
  VZ();
  YM();
  Gt();
  aL();
  EHe();
  O_t();
  z7i();
  Ohe();
  o0();
  lb();
  Ebr();
  Ry();
  Hf();
  u0t();
  ybr();
  n4i();
  await Jn([Vw(), ET(), ZL(), jI(), m7(), L7(), xbr(), e$(), a4i(), um(), RLe()]);
  E_A = z5e;
  bce = class bce extends _i()("@opencode/LLM") {};
  ((I_A = vm(bce)),
    (GVa = Es(
      bce,
      ft(function* () {
        let e = yield* TX,
          t = yield* Eg,
          r = yield* FN,
          s = yield* IT,
          a = yield* FB,
          H = yield* B$,
          u = yield* JU.Service,
          f = yield* NE,
          d = yield* Mg,
          _ = Ge("LLM.run")(function* (I) {
            if (I.agent.mode === "subagent" && !SPe()) return yield* bn(Error($jt));
            yield* fH("stream", {
              providerID: I.model.providerID,
              modelID: I.model.id,
              "session.id": I.sessionID,
              small: (I.small ?? !1).toString(),
              agent: I.agent.name,
              mode: I.agent.mode,
            });
            let [D, S, T, C] = yield* Km(
                [
                  r.getLanguage(I.model),
                  t.get(),
                  r.getProvider(I.model.providerID),
                  e.get(I.model.providerID),
                ],
                { concurrency: "unbounded" },
              ),
              O = D instanceof RPt,
              B = I.model.providerID === "jaccode" ? yield* o4i(I.sessionID, d.get) : I.sessionID,
              V = yield* RVa({
                ...I,
                rootSessionID: B,
                thinking: yield* nA(() => H4i(qVa.join(uH.state, "kv.json"))),
                provider: T,
                auth: C,
                plugin: s,
                flags: f,
                isWorkflow: O,
              }),
              q = {
                ...V.headers,
                ...(I.continuation === "length" &&
                I.model.providerID === "jaccode" &&
                V.headers["X-Jac-Purpose"] === "chat"
                  ? { "X-Jac-Continuation": "length" }
                  : {}),
              },
              Z = yield* lee();
            if (D instanceof RPt) {
              let z = D;
              ((z.sessionID = I.sessionID),
                (z.systemPrompt = V.system.join(`
`)),
                (z.toolExecutor = async (Be, Te, Lt) => {
                  let Ht = V.tools[Be];
                  if (!Ht || !Ht.execute) return { result: "", error: `Unknown tool: ${Be}` };
                  try {
                    let Se = await Ht.execute(JSON.parse(Te), {
                      toolCallId: Lt,
                      messages: I.messages,
                      abortSignal: I.abort,
                    });
                    return {
                      result: typeof Se === "string" ? Se : (Se?.output ?? JSON.stringify(Se)),
                      metadata: typeof Se === "object" ? Se?.metadata : void 0,
                      title: typeof Se === "object" ? Se?.title : void 0,
                    };
                  } catch (Se) {
                    return { result: "", error: Se.message ?? String(Se) };
                  }
                }));
              let Ae = gT(I.agent.permission ?? [], I.permission ?? []);
              z.sessionPreapprovedTools = Object.keys(V.tools).filter((Be) => {
                let Te = Ae.findLast((Lt) => UVa(Be, Lt.permission));
                return !Te || Te.action !== "ask";
              });
              let le = new Set();
              z.approvalHandler = Z.bind(async (Be) => {
                let Te = [...new Set(Be.map((Se) => Se.name))];
                if (Te.every((Se) => le.has(Se))) return { approved: !0 };
                let Lt = GG.ascending(),
                  Ht;
                try {
                  Ht = await Z.promise(
                    H.listen((we) => {
                      if (we.type !== X5e.Replied.type) return ti;
                      let Pe = we.data;
                      if (Pe.requestID !== Lt) return ti;
                      return (Pe.reply, ti);
                    }),
                  );
                  let Se = Be.map((we) => {
                      try {
                        let Pe = JSON.parse(we.args),
                          ye = Pe?.title ?? Pe?.name ?? "";
                        return ye ? `${we.name}: ${ye}` : we.name;
                      } catch {
                        return we.name;
                      }
                    }),
                    _e = [...new Set(Se)];
                  await Z.promise(
                    a.ask({
                      id: Lt,
                      sessionID: Ec.make(I.sessionID),
                      permission: "workflow_tool_approval",
                      patterns: _e,
                      metadata: { tools: Be },
                      always: _e,
                      ruleset: [],
                    }),
                  );
                  for (let we of Te) le.add(we);
                  return (
                    (z.sessionPreapprovedTools = [...(z.sessionPreapprovedTools ?? []), ...Te]),
                    { approved: !0 }
                  );
                } catch {
                  return { approved: !1 };
                } finally {
                  if (Ht) await Z.promise(Ht);
                }
              });
            }
            let se = S.experimental?.openTelemetry ? OL(yield* x6(Nme)) : void 0,
              ae = se
                ? new Proxy(se, {
                    get(z, Ae, le) {
                      if (Ae !== "startSpan") return Reflect.get(z, Ae, le);
                      return (...Be) => {
                        let Te = z.startSpan(...Be);
                        return (Te.setAttribute("session.id", I.sessionID), Te);
                      };
                    },
                  })
                : void 0;
            if (f.experimentalNativeLlm) {
              let z = r4i.stream({
                model: I.model,
                provider: T,
                auth: C,
                llmClient: u,
                messages: V.messages,
                tools: V.tools,
                toolChoice: I.toolChoice,
                temperature: V.params.temperature,
                topP: V.params.topP,
                topK: V.params.topK,
                maxOutputTokens: V.params.maxOutputTokens,
                providerOptions: V.params.options,
                headers: q,
                abort: I.abort,
              });
              if (z.type === "supported")
                return (
                  yield* fH("llm runtime selected", {
                    "llm.runtime": "native",
                    "llm.provider": I.model.providerID,
                    "llm.model": I.model.id,
                  }),
                  { type: "native", stream: z.stream }
                );
              (yield* fH("llm runtime selected", {
                "llm.runtime": "ai-sdk",
                "llm.provider": I.model.providerID,
                "llm.model": I.model.id,
                "llm.native_unsupported_reason": z.reason,
              }),
                yield* fH("native runtime unavailable; falling back to ai-sdk", {
                  providerID: I.model.providerID,
                  modelID: I.model.id,
                  "session.id": I.sessionID,
                  small: (I.small ?? !1).toString(),
                  agent: I.agent.name,
                  mode: I.agent.mode,
                  reason: z.reason,
                }));
            }
            return (
              yield* fH("llm runtime selected", {
                "llm.runtime": "ai-sdk",
                "llm.provider": I.model.providerID,
                "llm.model": I.model.id,
              }),
              {
                type: "ai-sdk",
                result: Q6i({
                  onError(z) {
                    Z.fork(
                      cf("stream error", {
                        providerID: I.model.providerID,
                        modelID: I.model.id,
                        "session.id": I.sessionID,
                        small: (I.small ?? !1).toString(),
                        agent: I.agent.name,
                        mode: I.agent.mode,
                        error: z,
                      }),
                    );
                  },
                  includeRawChunks: I.model.providerID.includes("github-copilot"),
                  async experimental_repairToolCall(z) {
                    let Ae = z.toolCall.toolName.toLowerCase();
                    if (Ae !== z.toolCall.toolName && V.tools[Ae]) return { ...z.toolCall, toolName: Ae };
                    return {
                      ...z.toolCall,
                      input: JSON.stringify({ tool: z.toolCall.toolName, error: z.error.message }),
                      toolName: "invalid",
                    };
                  },
                  temperature: V.params.temperature,
                  topP: V.params.topP,
                  topK: V.params.topK,
                  providerOptions: D8i(I.model, V.params.options),
                  activeTools: Object.keys(V.tools).filter((z) => z !== "invalid"),
                  tools: V.tools,
                  toolChoice: I.toolChoice,
                  maxOutputTokens: V.params.maxOutputTokens,
                  abortSignal: I.abort,
                  headers: q,
                  maxRetries: I.retries ?? 0,
                  messages: V.messages,
                  model: s8i({
                    model: D,
                    middleware: [
                      {
                        specificationVersion: "v3",
                        async transformParams(z) {
                          if (z.type === "stream") z.params.prompt = ova(z.params.prompt);
                          return z.params;
                        },
                      },
                    ],
                  }),
                  experimental_telemetry: {
                    isEnabled: S.experimental?.openTelemetry,
                    functionId: "session.llm",
                    tracer: ae,
                    metadata: { userId: S.username ?? "unknown", sessionId: I.sessionID },
                  },
                }),
              }
            );
          }),
          L = (I) =>
            mcn(
              hh(
                ft(function* () {
                  let D = yield* Bd(
                      jn(() => new AbortController()),
                      (C) => jn(() => C.abort()),
                    ),
                    S = yield* _({ ...I, abort: D.signal });
                  if (S.type === "native") return S.stream;
                  let T = e4i();
                  return dcn(S.result.fullStream, (C) => (C instanceof Error ? C : Error(String(C)))).pipe(
                    f1e((C) => FVa(T, C)),
                    lft((C) => KBe(C)),
                  );
                }),
              ),
            );
        return bce.of({ stream: L });
      }),
    )),
    (D_A = i4i),
    (WPt = Ll({ service: bce, layer: GVa, deps: [pje, Ab, jhe, bX, J5e, q1, U_t, WN, WB] })));
});
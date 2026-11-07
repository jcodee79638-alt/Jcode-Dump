
var TCe = ne(async () => {
  au();
  N2();
  p4i();
  lb();
  o0();
  Gt();
  Ql();
  Tbr();
  YM();
  Ry();
  PMt();
  GPt();
  ghe();
  await Jn([e$(), jI(), Vw(), vHe(), xCe(), Jw(), wX(), ZL(), TCe()]);
  ((d7a = SCe), (h7a = ["skill"]));
  WLe = class WLe extends _i()("@opencode/SessionCompaction") {};
  ((NhA = vm(WLe)),
    (S7a = Es(
      WLe,
      ft(function* () {
        let e = yield* Eg,
          t = yield* Mg,
          r = yield* DP,
          s = yield* IT,
          a = yield* MCe,
          H = yield* FN,
          u = yield* B$,
          f = yield* NE,
          d = Ge("SessionCompaction.isOverflow")(function* (T) {
            return VPt({
              cfg: yield* e.get(),
              tokens: T.tokens,
              model: T.model,
              outputTokenMax: f.outputTokenMax,
            });
          }),
          _ = Ge("SessionCompaction.estimate")(function* (T) {
            let C = yield* Ayr(T.messages, T.model);
            return obe(JSON.stringify(C));
          }),
          L = Ge("SessionCompaction.select")(function* (T) {
            let C = T.cfg.compaction?.tail_turns;
            if (C !== void 0 && C <= 0) return { head: T.messages, tail_start_id: void 0 };
            let O = y7a({ cfg: T.cfg, model: T.model }),
              B = M7a(T.messages);
            if (!B.length) return { head: T.messages, tail_start_id: void 0 };
            let V = C === void 0 ? B : B.slice(-C),
              q = 0,
              Z;
            for (let se = V.length - 1; se >= 0; se--) {
              let ae = V[se],
                z = yield* _({ messages: T.messages.slice(ae.start, ae.end), model: T.model });
              if (q + z <= O) {
                ((q += z), (Z = { start: ae.start, id: ae.id }));
                continue;
              }
              let Ae = O - q,
                le = yield* x7a({ messages: T.messages, turn: ae, model: T.model, budget: Ae, estimate: _ });
              if (le) Z = le;
              else if (!Z) yield* fH("tail fallback", { budget: O, size: z, total: q });
              break;
            }
            if (!Z || Z.start === 0) return { head: T.messages, tail_start_id: void 0 };
            return { head: T.messages.slice(0, Z.start), tail_start_id: Z.id };
          }),
          I = Ge("SessionCompaction.prune")(function* (T) {
            if (!(yield* e.get()).compaction?.prune) return;
            yield* fH("pruning");
            let O = yield* t.messages({ sessionID: T.sessionID }).pipe(GM(Xw.isInstance, () => Jt(void 0)));
            if (!O) return;
            let B = 0,
              V = 0,
              q = [],
              Z = 0;
            e: for (let se = O.length - 1; se >= 0; se--) {
              let ae = O[se];
              if (ae.info.role === "user") Z++;
              if (Z < 2) continue;
              if (ae.info.role === "assistant" && ae.info.summary) break e;
              for (let z = ae.parts.length - 1; z >= 0; z--) {
                let Ae = ae.parts[z];
                if (Ae.type !== "tool") continue;
                if (Ae.state.status !== "completed") continue;
                if (h7a.includes(Ae.tool)) continue;
                if (Ae.state.time.compacted) break e;
                let le = obe(Ae.state.output);
                if (((B += le), B <= _7a)) continue;
                ((V += le), q.push(Ae));
              }
            }
            if ((yield* fH("found", { pruned: V, total: B }), V > m7a)) {
              for (let se of q)
                if (se.state.status === "completed")
                  ((se.state.time.compacted = Date.now()), yield* t.updatePart(se));
              yield* fH("pruned", { count: q.length });
            }
          }),
          D = Ge("SessionCompaction.process")(function* (T) {
            let C = T.messages.findLast((Ee) => Ee.info.id === T.parentID);
            if (!C || C.info.role !== "user")
              throw Error(`Compaction parent must be a user message: ${T.parentID}`);
            let O = C.info,
              B = C.parts.find((Ee) => Ee.type === "compaction"),
              V = T.messages,
              q;
            if (T.overflow) {
              let Ee = T.messages.findIndex((Fe) => Fe.info.id === T.parentID);
              for (let Fe = Ee - 1; Fe >= 0; Fe--) {
                let it = T.messages[Fe];
                if (it.info.role === "user" && !it.parts.some((At) => At.type === "compaction")) {
                  ((q = { info: it.info, parts: it.parts }), (V = T.messages.slice(0, Fe)));
                  break;
                }
              }
              if (!(
                q &&
                V.some((Fe) => Fe.info.role === "user" && !Fe.parts.some((it) => it.type === "compaction"))
              ))
                ((q = void 0), (V = T.messages));
            }
            let Z = yield* r.get("compaction"),
              se = Z.model
                ? yield* H.getModel(Z.model.providerID, Z.model.modelID).pipe(on)
                : yield* H.getModel(O.model.providerID, O.model.modelID).pipe(on),
              ae = yield* e.get(),
              z = B && V.at(-1)?.info.id === T.parentID ? V.slice(0, -1) : V,
              Ae = D7a(z),
              le = new Set(Ae.flatMap((Ee) => [Ee.userIndex, Ee.assistantIndex])),
              Be = Ae.at(-1)?.summary,
              Te = yield* L({ messages: z.filter((Ee, Ve) => !le.has(Ve)), cfg: ae, model: se }),
              Lt = yield* s.trigger(
                "experimental.session.compacting",
                { sessionID: T.sessionID },
                { context: [], prompt: void 0 },
              ),
              Ht = structuredClone(Te.head);
            yield* s.trigger("experimental.chat.messages.transform", {}, { messages: Ht });
            let Se =
                se.providerID === QL
                  ? ""
                  : Ht.map(Pbr).filter(Boolean).join(`

`),
              _e =
                se.providerID === QL
                  ? E7a({
                      messages: Ht,
                      history: z,
                      previousSummary: Be,
                      prompt: Lt.prompt,
                      context: Lt.context,
                    })
                  : (Lt.prompt ??
                    [jMt({ previousSummary: Be, context: [Se] }), ...Lt.context].filter(Boolean).join(`

`)),
              we = yield* Jc,
              Pe = {
                id: Td.ascending(),
                role: "assistant",
                parentID: T.parentID,
                sessionID: T.sessionID,
                mode: "compaction",
                agent: "compaction",
                variant: O.model.variant,
                summary: !0,
                path: { cwd: we.directory, root: we.worktree },
                cost: 0,
                tokens: { output: 0, input: 0, reasoning: 0, cache: { read: 0, write: 0 } },
                modelID: se.id,
                providerID: se.providerID,
                time: { created: Date.now() },
              };
            yield* t.updateMessage(Pe);
            let ye = yield* a.create({ assistantMessage: Pe, sessionID: T.sessionID, model: se }),
              ot = yield* ye.process({
                user: O,
                agent: Z,
                sessionID: T.sessionID,
                tools: {},
                system: [],
                messages: [
                  {
                    role: "user",
                    content: [
                      {
                        type: "text",
                        text: [
                          _e,
                          ...(Lt.prompt && se.providerID !== QL
                            ? ["The following is the conversation history:", Se]
                            : []),
                        ].filter(Boolean).join(`

`),
                      },
                    ],
                  },
                ],
                model: se,
              });
            if (ot === "compact")
              return (
                (ye.message.error = new yxe({
                  message: q
                    ? "Conversation history too large to compact - exceeds model context limit"
                    : "Session too large to compact - context exceeds model limit even after stripping media",
                }).toObject()),
                (ye.message.finish = "error"),
                yield* t.updateMessage(ye.message),
                "stop"
              );
            if (B && Te.tail_start_id && B.tail_start_id !== Te.tail_start_id)
              yield* t.updatePart({ ...B, tail_start_id: Te.tail_start_id });
            if (ot === "continue" && T.auto) {
              if (q) {
                let Ee = q.info,
                  Ve = yield* t.updateMessage({
                    id: Td.ascending(),
                    role: "user",
                    sessionID: T.sessionID,
                    time: { created: Date.now() },
                    agent: Ee.agent,
                    model: Ee.model,
                    format: Ee.format,
                    tools: Ee.tools,
                    system: Ee.system,
                  });
                for (let Fe of q.parts) {
                  if (Fe.type === "compaction") continue;
                  let it =
                    Fe.type === "file" && uXe(Fe.mime)
                      ? { type: "text", text: `[Attached ${Fe.mime}: ${Fe.filename ?? "file"}]` }
                      : Fe;
                  yield* t.updatePart({
                    ...it,
                    id: Zp.ascending(),
                    messageID: Ve.id,
                    sessionID: T.sessionID,
                  });
                }
              }
              if (!q) {
                let Ee = yield* H.getProvider(O.model.providerID);
                if (
                  (yield* s.trigger(
                    "experimental.compaction.autocontinue",
                    {
                      sessionID: T.sessionID,
                      agent: O.agent,
                      model: yield* H.getModel(O.model.providerID, O.model.modelID).pipe(on),
                      provider: { source: Ee.source, info: Ee, options: Ee.options },
                      message: O,
                      overflow: T.overflow === !0,
                    },
                    { enabled: !0 },
                  )).enabled
                ) {
                  let Ve = yield* t.updateMessage({
                      id: Td.ascending(),
                      role: "user",
                      sessionID: T.sessionID,
                      time: { created: Date.now() },
                      agent: O.agent,
                      model: O.model,
                    }),
                    Fe =
                      (T.overflow
                        ? `The previous request exceeded the provider's size limit due to large media attachments. The conversation was compacted and media files were removed from context. If the user was asking about attached images or files, explain that the attachments were too large to process and suggest they try again with smaller or fewer files.

`
                        : "") +
                      "Continue if you have next steps, or stop and ask for clarification if you are unsure how to proceed.";
                  yield* t.updatePart({
                    id: Zp.ascending(),
                    messageID: Ve.id,
                    sessionID: T.sessionID,
                    type: "text",
                    metadata: { compaction_continue: !0 },
                    synthetic: !0,
                    text: Fe,
                    time: { start: Date.now(), end: Date.now() },
                  });
                }
              }
            }
            if (ye.message.error) return "stop";
            if (ot === "continue") yield* u.publish(d7a.Compacted, { sessionID: T.sessionID });
            return ot;
          }),
          S = Ge("SessionCompaction.create")(function* (T) {
            let C = yield* t.updateMessage({
              id: Td.ascending(),
              role: "user",
              model: T.model,
              sessionID: T.sessionID,
              agent: T.agent,
              time: { created: Date.now() },
            });
            return (
              yield* t.updatePart({
                id: Zp.ascending(),
                messageID: C.id,
                sessionID: C.sessionID,
                type: "compaction",
                auto: T.auto,
                overflow: T.overflow,
              }),
              C.id
            );
          });
        return WLe.of({ isOverflow: d, prune: I, process: D, create: S });
      }),
    )),
    (Cbr = Ll({ service: WLe, layer: S7a, deps: [Ab, WB, Mje, bX, qPt, jhe, q1, WN] })));
});
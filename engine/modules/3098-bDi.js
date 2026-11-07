
var bDi = ne(async () => {
  CE();
  Gt();
  h2();
  zM();
  yy();
  MZ();
  ibe();
  PMt();
  bV();
  sVe();
  rVe();
  CMt();
  MDi();
  TDi();
  OH();
  vy();
  await Jn([Kv(), qL(), fL(), qd(), S1(), rbe(), yMt(), gMt(), lP(), CLr(), _me(), KMt(), cVe()]);
  ((Rda = Es(
    abe,
    ft(function* () {
      let e = yield* lL,
        t = yield* JU.Service,
        r = yield* MG,
        s = yield* sbe,
        a = yield* Jqe,
        H = yield* FY,
        u = yield* bm,
        f = yield* K_e,
        d = yield* Wqe,
        _ = yield* Bqe,
        L = yield* ZM,
        I = yield* BY,
        D = (yield* Vd).db,
        S = $la({ events: e, llm: t, config: yield* L.entries() }),
        T = Ge("SessionRunner.getSession")(function* (Te) {
          let Lt = yield* H.get(Te);
          if (!Lt) return yield* No(`Session not found: ${Te}`);
          return Lt;
        }),
        C = Ge("SessionRunner.getContext")(function* (Te) {
          return yield* H.context(Te);
        }),
        O = Ge("SessionRunner.failInterruptedTools")(function* (Te) {
          for (let Lt of yield* C(Te)) {
            if (Lt.type !== "assistant") continue;
            for (let Ht of Lt.content) {
              if (Ht.type !== "tool" || (Ht.state.status !== "pending" && Ht.state.status !== "running"))
                continue;
              yield* e.publish(GL.Failed, {
                sessionID: Te,
                timestamp: yield* kU,
                assistantMessageID: Lt.id,
                callID: Ht.id,
                error: { type: "unknown", message: "Tool execution interrupted" },
                provider: {
                  executed: Ht.provider?.executed === !0,
                  ...(Ht.provider?.metadata === void 0 ? {} : { metadata: Ht.provider.metadata }),
                },
              });
            }
          }
        }),
        B = (Te) => Yq(hpt(Te), SRs(Te)),
        V = (Te) =>
          Te.reasons.some((Lt) => eQt(Lt) && (Lt.defect instanceof fVe || Lt.defect instanceof LMt));
      class q extends Error {
        transition;
        constructor(Te) {
          super();
          this.transition = Te;
        }
      }
      let Z = (Te) => new q({ _tag: "ContinueAfterCompaction", step: Te }),
        se = (Te) => new q({ _tag: "ContinueAfterOverflowCompaction", step: Te }),
        ae = (Te) => Km([f.load(), d.load(Te), _.load()], { concurrency: "unbounded" }).pipe(Vn(hLr)),
        z = Ge("SessionRunner.runTurn")(function* (Te, Lt, Ht, Se) {
          let _e = yield* T(Te);
          if (_e.location.directory !== u.directory || _e.location.workspaceID !== u.workspaceID)
            return yield* PS;
          let we = yield* r.select(_e.agent),
            Pe = yield* nla(D, ae(we), _e.id),
            ye = yield* _pt(),
            ot = !1,
            Ee = Ht;
          if (Lt) {
            let wt = yield* Uir(D, _e.id),
              Qr = 0;
            if (Lt === "steer") Qr = yield* zTn(D, e, _e.id, wt);
            if (Lt === "queue")
              ((Qr += Number(yield* dHo(D, e, _e.id))), (Qr += yield* zTn(D, e, _e.id, wt)));
            if (Qr > 0) Ee = 1;
          }
          let Ve = Pe ?? (yield* ila(D, e, ae(we), _e.id)),
            Fe = yield* a.resolve(_e),
            it = yield* tvn(D, _e.id, Ve.baselineSeq),
            At = it.map((wt) => wt.message),
            et = we.info?.steps !== void 0 && Ee >= we.info.steps,
            ut = et ? void 0 : yield* s.materialize(we.info?.permissions),
            ht = /^ses_[0-9a-f]{64}$/.test(_e.id) ? _e.id.slice(4) : _e.id,
            Et = DLr({
              model: Fe,
              http: {
                headers: {
                  "x-opencode-session-id": _e.id,
                  ...(_e.parentID ? { "x-opencode-parent-session-id": _e.parentID } : {}),
                  "x-session-affinity": _e.id,
                  "X-Session-Id": _e.id,
                  ...(_e.parentID ? { "x-parent-session-id": _e.parentID } : {}),
                },
              },
              providerOptions: { openai: { promptCacheKey: ht } },
              system: [we.info?.system, Ve.baseline]
                .filter((wt) => wt !== void 0 && wt.length > 0)
                .map(nWe.make),
              messages: [...SDi(At, Fe), ...(et ? [fg.assistant(zMt)] : [])],
              tools: ut?.definitions ?? [],
              toolChoice: et ? "none" : void 0,
            });
          if (yield* S.compactIfNeeded({ sessionID: _e.id, entries: it, model: Fe, request: Et }))
            return yield* No(Z(Ee));
          let tr = yield* I.capture(),
            Rr = yDi(e, {
              sessionID: _e.id,
              agent: we.id,
              model: {
                id: WL.make(Fe.id),
                providerID: Kp.make(Fe.provider),
                ...(_e.model?.variant === void 0 ? {} : { variant: _e.model.variant }),
              },
              snapshot: tr,
            }),
            Vt = j6(1).withPermit,
            Br = (wt, Qr = []) => Vt(Rr.publish(wt, Qr)),
            Dt,
            St = t.stream(Et).pipe(
              FW((wt) =>
                ft(function* () {
                  if (Dt || Rr.hasProviderError()) return;
                  if (tA.is.providerError(wt)) {
                    if (j_t(wt) && !Rr.hasAssistantStarted()) {
                      Dt = wt;
                      return;
                    }
                  }
                  if ((yield* Br(wt), wt.type !== "tool-call" || wt.providerExecuted)) return;
                  if (!ut) {
                    yield* Vt(Rr.failUnsettledTools("Tools are disabled after the maximum agent steps"));
                    return;
                  }
                  ot = !0;
                  let Qr = yield* Rr.assistantMessageID(wt.id);
                  yield* q0((Li) =>
                    Li(ut.settle({ sessionID: _e.id, agent: we.id, assistantMessageID: Qr, call: wt })).pipe(
                      Hi((sr) =>
                        Br(
                          tA.toolResult({ id: wt.id, name: wt.name, result: sr.result, output: sr.output }),
                          sr.outputPaths ?? [],
                        ),
                      ),
                    ),
                  ).pipe(Wun(ye));
                }),
              ),
              up(Vt(Rr.flush())),
            );
          return yield* q0((wt) =>
            ft(function* () {
              let Qr = yield* wt(St).pipe(_h),
                Li = Qr._tag === "Failure" ? OL(kUs(Qr.cause)) : void 0;
              if (
                Se &&
                !Rr.hasAssistantStarted() &&
                j_t(Dt ?? Li) &&
                (yield* wt(Se({ sessionID: _e.id, entries: it, model: Fe, request: Et })))
              )
                return yield* No(se(Ee));
              if (Dt) yield* Br(Dt);
              let sr = Li instanceof MD ? Li : void 0;
              if (sr && !Rr.hasProviderError())
                (yield* Vt(Rr.failUnsettledTools("Provider did not return a tool result", !0)),
                  yield* Vt(Rr.failAssistant(sr.reason.message)));
              if (Qr._tag === "Failure" && xW(Qr.cause)) yield* Aer(ye);
              let Mt = yield* wt(B(ye)).pipe(_h);
              if (Mt._tag === "Failure" && V(Mt.cause))
                return (
                  yield* Aer(ye),
                  yield* Vt(Rr.failUnsettledTools("Tool execution interrupted")),
                  yield* PS
                );
              if ((Qr._tag === "Failure" && xW(Qr.cause)) || (Mt._tag === "Failure" && xW(Mt.cause))) {
                if (
                  (yield* Aer(ye),
                  yield* Vt(Rr.failUnsettledTools("Tool execution interrupted")),
                  Rr.hasActiveAssistant())
                )
                  yield* Vt(Rr.failAssistant("Provider turn interrupted"));
              }
              if (Mt._tag === "Failure" && !xW(Mt.cause)) {
                let Tr = hI(Mt.cause),
                  Dn = Tr instanceof Error ? Tr.message : String(Tr);
                yield* Vt(Rr.failUnsettledTools(`Tool execution failed: ${Dn}`));
              }
              let Lr = Rr.stepSettlement();
              if (Lr && !Rr.hasProviderError()) {
                let Tr = yield* I.capture(),
                  Dn = tr && Tr ? yield* I.files({ from: tr, to: Tr }).pipe($s(() => Jt(void 0))) : void 0;
                yield* Vt(
                  e.publish(QU.Ended, {
                    sessionID: _e.id,
                    timestamp: yield* kU,
                    assistantMessageID: yield* Rr.startAssistant(),
                    finish: Lr.finish,
                    cost: 0,
                    tokens: Lr.tokens,
                    snapshot: Tr,
                    files: Dn,
                  }),
                );
              }
              if (Rr.hasProviderError()) yield* Vt(Rr.failUnsettledTools("Tool execution interrupted"));
              if (Qr._tag === "Success" && !Rr.hasProviderError())
                yield* Vt(Rr.failUnsettledTools("Provider did not return a tool result", !0));
              if (Qr._tag === "Failure") return yield* NL(Qr.cause);
              if (Mt._tag === "Failure" && xW(Mt.cause)) return yield* NL(Mt.cause);
              return { needsContinuation: !Rr.hasProviderError() && ot, step: Ee };
            }),
          );
        }, FL),
        Ae = ni(function* (Te, Lt, Ht) {
          return yield* z(Te, Lt, Ht).pipe(
            jQ(
              ni(function* (Se) {
                if (!(Se instanceof q)) return yield* No(Se);
                if (Se.transition._tag === "ContinueAfterOverflowCompaction")
                  return yield* No("Post-compaction provider attempt cannot recover another overflow");
                return (yield* rBe, yield* Ae(Te, void 0, Se.transition.step));
              }),
            ),
          );
        }),
        le = ni(function* (Te, Lt, Ht) {
          return yield* z(Te, Lt, Ht, S.compactAfterOverflow).pipe(
            jQ(
              ni(function* (Se) {
                if (!(Se instanceof q)) return yield* No(Se);
                if ((yield* rBe, Se.transition._tag === "ContinueAfterOverflowCompaction"))
                  return yield* Ae(Te, void 0, Se.transition.step);
                return yield* le(Te, void 0, Se.transition.step);
              }),
            ),
          );
        }),
        Be = Ge("SessionRunner.run")(function* (Te) {
          let Lt = yield* VLt(D, Te.sessionID, "steer"),
            Ht = Lt ? !1 : yield* VLt(D, Te.sessionID, "queue");
          if (!Te.force && !Lt && !Ht) return;
          yield* O(Te.sessionID);
          let Se = Lt ? "steer" : Ht ? "queue" : void 0,
            _e = Te.force || Lt || Ht;
          while (_e) {
            let we = !0,
              Pe = 1;
            while (we) {
              let ye = yield* le(Te.sessionID, Se, Pe);
              if (((we = ye.needsContinuation), (Pe = ye.step + 1), (Se = "steer"), !we))
                we = yield* VLt(D, Te.sessionID, "steer");
            }
            ((_e = yield* VLt(D, Te.sessionID, "queue")), (Se = _e ? "queue" : void 0));
          }
        });
      return abe.of({ run: Be });
    }),
  )),
    (vDi = Ua({
      service: abe,
      layer: Rda,
      deps: [zS, U_t, s3e, T8, EDi, oVe, KS, DMt, aIi, eIi, PY, ivn, DD],
    })));
});
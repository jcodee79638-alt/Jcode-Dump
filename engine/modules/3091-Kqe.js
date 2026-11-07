
var Kqe = (e) => Math.max(0, Number.isFinite(e) ? (e ?? 0) : 0),
  wda = (e) => {
    let t = Kqe(e?.reasoningTokens),
      r = Kqe(e?.cacheReadInputTokens),
      s = Kqe(e?.cacheWriteInputTokens);
    return {
      input: Kqe(e?.nonCachedInputTokens),
      output: Kqe(e?.visibleOutputTokens),
      reasoning: t,
      cache: { read: r, write: s },
    };
  },
  DDi = (e) => (typeof e === "object" && e !== null && !Array.isArray(e) ? e : { value: e }),
  IDi = (e) => {
    if (typeof e === "string") return e;
    try {
      return JSON.stringify(e) ?? String(e);
    } catch {
      return String(e);
    }
  },
  kda = (e, t) => {
    if (t.type === "error") return { error: { type: "unknown", message: IDi(t.value) } };
    let r = e ?? _V.fromResultValue(t);
    if (!r) throw Error(`Unsupported tool result: ${IDi(t)}`);
    return { structured: DDi(r.structured), content: r.content };
  },
  yDi = (e, t) => {
    let r = new Map(),
      s = kU,
      a,
      H = !1,
      u = !1,
      f = !1,
      d,
      _ = ni(function* () {
        if (a !== void 0) return a;
        return (
          (a = wf.create()),
          (H = !0),
          yield* e.publish(QU.Started, {
            ...t,
            assistantMessageID: a,
            timestamp: yield* s,
            snapshot: t.snapshot,
          }),
          a
        );
      }),
      L = () => (a === void 0 ? No("Tool event before assistant step start") : Jt(a)),
      I = (z, Ae) => {
        let le = new Map(),
          Be = (Se) =>
            yH(() => {
              if (le.has(Se)) return No(`Duplicate ${z} start: ${Se}`);
              return (le.set(Se, []), ti);
            }),
          Te = (Se, _e) =>
            yH(() => {
              let we = le.get(Se);
              if (!we) return No(`${z} delta before start: ${Se}`);
              return (we.push(_e), ti);
            }),
          Lt = ni(function* (Se, _e) {
            let we = le.get(Se);
            if (!we) return yield* No(`${z} end before start: ${Se}`);
            (yield* Ae(Se, we.join(""), _e), le.delete(Se));
          }),
          Ht = ni(function* () {
            for (let Se of le.keys()) yield* Lt(Se);
          });
        return { start: Be, append: Te, end: Lt, flush: Ht };
      },
      D = I("text", (z, Ae) =>
        ft(function* () {
          yield* e.publish(gV.Ended, {
            sessionID: t.sessionID,
            assistantMessageID: yield* L(),
            timestamp: yield* s,
            textID: z,
            text: Ae,
          });
        }),
      ),
      S = I("reasoning", (z, Ae, le) =>
        ft(function* () {
          yield* e.publish(EV.Ended, {
            sessionID: t.sessionID,
            assistantMessageID: yield* L(),
            timestamp: yield* s,
            reasoningID: z,
            text: Ae,
            providerMetadata: le,
          });
        }),
      ),
      T = I("tool input", (z, Ae) =>
        ft(function* () {
          let le = r.get(z);
          if (!le) return yield* No(`Tool input end before start: ${z}`);
          (yield* e.publish(GL.Input.Ended, {
            sessionID: t.sessionID,
            timestamp: yield* s,
            assistantMessageID: le.assistantMessageID,
            callID: z,
            text: Ae,
          }),
            (le.inputEnded = !0));
        }),
      ),
      C = ni(function* () {
        (yield* D.flush(), yield* S.flush(), yield* T.flush());
      }),
      O = ni(function* (z) {
        if (r.has(z.id)) return yield* No(`Duplicate tool input start: ${z.id}`);
        let Ae = yield* _();
        (r.set(z.id, {
          assistantMessageID: Ae,
          name: z.name,
          inputEnded: !1,
          called: !1,
          settled: !1,
          providerExecuted: !1,
        }),
          yield* T.start(z.id),
          yield* e.publish(GL.Input.Started, {
            sessionID: t.sessionID,
            timestamp: yield* s,
            assistantMessageID: Ae,
            callID: z.id,
            name: z.name,
          }));
      }),
      B = ni(function* (z) {
        let Ae = r.get(z.id);
        if (!Ae) return yield* No(`Tool input end before start: ${z.id}`);
        if (Ae.name !== z.name)
          return yield* No(`Tool input name changed for ${z.id}: ${Ae.name} -> ${z.name}`);
        if (Ae.inputEnded) return yield* No(`Duplicate tool input end: ${z.id}`);
        yield* T.end(z.id);
      }),
      V = Ge("SessionRunner.flush")(function* () {
        yield* C();
      }),
      q = ni(function* (z) {
        if (u) return;
        yield* V();
        let Ae = yield* _();
        ((H = !1),
          (u = !0),
          yield* e.publish(QU.Failed, {
            sessionID: t.sessionID,
            timestamp: yield* s,
            assistantMessageID: Ae,
            error: { type: "unknown", message: z },
          }));
      }),
      Z = Ge("SessionRunner.failUnsettledTools")(function* (z, Ae = !1) {
        for (let [le, Be] of r) {
          if (Be.settled || (Ae && !Be.providerExecuted)) continue;
          ((Be.settled = !0),
            yield* e.publish(GL.Failed, {
              sessionID: t.sessionID,
              timestamp: yield* s,
              assistantMessageID: Be.assistantMessageID,
              callID: le,
              error: { type: "unknown", message: z },
              provider: {
                executed: Be.providerExecuted,
                ...(Be.providerMetadata === void 0 ? {} : { metadata: Be.providerMetadata }),
              },
            }));
        }
      }),
      se = (z) => {
        let Ae = r.get(z);
        return Ae ? Jt(Ae.assistantMessageID) : No(`Unknown tool call: ${z}`);
      };
    return {
      publish: Ge("SessionRunner.publishLLMEvent")(function* (z, Ae = []) {
        switch (z.type) {
          case "step-start":
            return;
          case "text-start":
            (yield* D.start(z.id),
              yield* e.publish(gV.Started, {
                sessionID: t.sessionID,
                assistantMessageID: yield* _(),
                timestamp: yield* s,
                textID: z.id,
              }));
            return;
          case "text-delta":
            (yield* D.append(z.id, z.text),
              yield* e.publish(gV.Delta, {
                sessionID: t.sessionID,
                assistantMessageID: yield* L(),
                timestamp: yield* s,
                textID: z.id,
                delta: z.text,
              }));
            return;
          case "text-end":
            yield* D.end(z.id);
            return;
          case "reasoning-start":
            (yield* S.start(z.id),
              yield* e.publish(EV.Started, {
                sessionID: t.sessionID,
                assistantMessageID: yield* _(),
                timestamp: yield* s,
                reasoningID: z.id,
                providerMetadata: z.providerMetadata,
              }));
            return;
          case "reasoning-delta":
            (yield* S.append(z.id, z.text),
              yield* e.publish(EV.Delta, {
                sessionID: t.sessionID,
                assistantMessageID: yield* L(),
                timestamp: yield* s,
                reasoningID: z.id,
                delta: z.text,
              }));
            return;
          case "reasoning-end":
            yield* S.end(z.id, z.providerMetadata);
            return;
          case "tool-input-start":
            yield* O(z);
            return;
          case "tool-input-delta": {
            let le = r.get(z.id);
            if (!le) return yield* No(`Tool input delta before start: ${z.id}`);
            if (le.name !== z.name)
              return yield* No(`Tool input name changed for ${z.id}: ${le.name} -> ${z.name}`);
            if (le.inputEnded) return yield* No(`Tool input delta after end: ${z.id}`);
            (yield* T.append(z.id, z.text),
              yield* e.publish(GL.Input.Delta, {
                sessionID: t.sessionID,
                timestamp: yield* s,
                assistantMessageID: le.assistantMessageID,
                callID: z.id,
                delta: z.text,
              }));
            return;
          }
          case "tool-input-end":
            yield* B(z);
            return;
          case "tool-call": {
            if (!r.has(z.id)) yield* O(z);
            let le = r.get(z.id);
            if (!le.inputEnded) yield* B(z);
            if (le.name !== z.name)
              return yield* No(`Tool call name changed for ${z.id}: ${le.name} -> ${z.name}`);
            if (le.called) return yield* No(`Duplicate tool call: ${z.id}`);
            ((le.called = !0),
              (le.providerExecuted = z.providerExecuted === !0),
              (le.providerMetadata = z.providerMetadata),
              yield* e.publish(GL.Called, {
                sessionID: t.sessionID,
                timestamp: yield* s,
                assistantMessageID: le.assistantMessageID,
                callID: z.id,
                tool: z.name,
                input: DDi(z.input),
                provider: {
                  executed: le.providerExecuted,
                  ...(z.providerMetadata === void 0 ? {} : { metadata: z.providerMetadata }),
                },
              }));
            return;
          }
          case "tool-result": {
            let le = r.get(z.id);
            if (!le?.called) return yield* No(`Tool result before call: ${z.id}`);
            if (le.name !== z.name)
              return yield* No(`Tool result name changed for ${z.id}: ${le.name} -> ${z.name}`);
            if (le.settled) {
              if (z.result.type === "error") return;
              return yield* No(`Duplicate tool result: ${z.id}`);
            }
            le.settled = !0;
            let Be = kda(z.output, z.result),
              Te = {
                executed: z.providerExecuted === !0 || le.providerExecuted,
                ...(z.providerMetadata === void 0 ? {} : { metadata: z.providerMetadata }),
              };
            if ("error" in Be) {
              yield* e.publish(GL.Failed, {
                sessionID: t.sessionID,
                timestamp: yield* s,
                assistantMessageID: le.assistantMessageID,
                callID: z.id,
                error: Be.error,
                result: z.result,
                provider: Te,
              });
              return;
            }
            yield* e.publish(GL.Success, {
              sessionID: t.sessionID,
              timestamp: yield* s,
              assistantMessageID: le.assistantMessageID,
              callID: z.id,
              ...Be,
              outputPaths: Ae,
              ...(Te.executed ? { result: z.result } : {}),
              provider: Te,
            });
            return;
          }
          case "tool-error": {
            let le = r.get(z.id);
            if (!le?.called) return yield* No(`Tool error before call: ${z.id}`);
            if (le.name !== z.name)
              return yield* No(`Tool error name changed for ${z.id}: ${le.name} -> ${z.name}`);
            if (le.settled) return yield* No(`Duplicate tool error: ${z.id}`);
            ((le.settled = !0),
              yield* e.publish(GL.Failed, {
                sessionID: t.sessionID,
                timestamp: yield* s,
                assistantMessageID: le.assistantMessageID,
                callID: z.id,
                error: { type: "unknown", message: z.message },
                provider: {
                  executed: le.providerExecuted,
                  ...(z.providerMetadata === void 0 ? {} : { metadata: z.providerMetadata }),
                },
              }));
            return;
          }
          case "step-finish":
            if ((yield* V(), (H = !1), d)) return yield* No("Duplicate step finish");
            d = { finish: z.reason, tokens: wda(z.usage) };
            return;
          case "finish":
            return;
          case "provider-error":
            ((f = !0), yield* q(z.message));
            return;
        }
      }),
      flush: V,
      failAssistant: q,
      failUnsettledTools: Z,
      hasActiveAssistant: () => H,
      hasAssistantStarted: () => a !== void 0,
      hasProviderError: () => f,
      stepSettlement: () => d,
      startAssistant: _,
      assistantMessageID: se,
    };
  };
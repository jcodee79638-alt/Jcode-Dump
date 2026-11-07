
async function Y6i(e, t) {
  let r = [];
  if (t == null ? void 0 : t.ignoreIncompleteToolCalls)
    e = e.map((s) => ({
      ...s,
      parts: s.parts.filter(
        (a) => !Hje(a) || (a.state !== "input-streaming" && a.state !== "input-available"),
      ),
    }));
  for (let s of e)
    switch (s.role) {
      case "system": {
        let a = s.parts.filter((u) => u.type === "text"),
          H = a.reduce((u, f) => {
            if (f.providerMetadata != null) return { ...u, ...f.providerMetadata };
            return u;
          }, {});
        r.push({
          role: "system",
          content: a.map((u) => u.text).join(""),
          ...(Object.keys(H).length > 0 ? { providerOptions: H } : {}),
        });
        break;
      }
      case "user": {
        r.push({
          role: "user",
          content: s.parts
            .map((a) => {
              var H;
              if (_Dr(a))
                return {
                  type: "text",
                  text: a.text,
                  ...(a.providerMetadata != null ? { providerOptions: a.providerMetadata } : {}),
                };
              if (hDr(a))
                return {
                  type: "file",
                  mediaType: a.mediaType,
                  filename: a.filename,
                  data: a.url,
                  ...(a.providerMetadata != null ? { providerOptions: a.providerMetadata } : {}),
                };
              if (mDr(a)) return (H = t == null ? void 0 : t.convertDataPart) == null ? void 0 : H.call(t, a);
            })
            .filter(Cwi),
        });
        break;
      }
      case "assistant": {
        if (s.parts != null) {
          let a = [];
          async function H() {
            var u, f, d, _, L, I, D;
            if (a.length === 0) return;
            let S = [];
            for (let C of a)
              if (_Dr(C))
                S.push({
                  type: "text",
                  text: C.text,
                  ...(C.providerMetadata != null ? { providerOptions: C.providerMetadata } : {}),
                });
              else if (hDr(C))
                S.push({
                  type: "file",
                  mediaType: C.mediaType,
                  filename: C.filename,
                  data: C.url,
                  ...(C.providerMetadata != null ? { providerOptions: C.providerMetadata } : {}),
                });
              else if (Fki(C))
                S.push({ type: "reasoning", text: C.text, providerOptions: C.providerMetadata });
              else if (Hje(C)) {
                let O = LDr(C);
                if (C.state !== "input-streaming") {
                  if (
                    (S.push({
                      type: "tool-call",
                      toolCallId: C.toolCallId,
                      toolName: O,
                      input:
                        C.state === "output-error"
                          ? (u = C.input) != null
                            ? u
                            : "rawInput" in C
                              ? C.rawInput
                              : void 0
                          : C.input,
                      providerExecuted: C.providerExecuted,
                      ...(C.callProviderMetadata != null ? { providerOptions: C.callProviderMetadata } : {}),
                    }),
                    C.approval != null)
                  )
                    S.push({
                      type: "tool-approval-request",
                      approvalId: C.approval.id,
                      toolCallId: C.toolCallId,
                    });
                  if (
                    C.providerExecuted === !0 &&
                    C.state !== "approval-responded" &&
                    (C.state === "output-available" || C.state === "output-error")
                  ) {
                    let B = (f = C.resultProviderMetadata) != null ? f : C.callProviderMetadata;
                    S.push({
                      type: "tool-result",
                      toolCallId: C.toolCallId,
                      toolName: O,
                      output: await cje({
                        toolCallId: C.toolCallId,
                        input: C.input,
                        output: C.state === "output-error" ? C.errorText : C.output,
                        tool: (d = t == null ? void 0 : t.tools) == null ? void 0 : d[O],
                        errorMode: C.state === "output-error" ? "json" : "none",
                      }),
                      ...(B != null ? { providerOptions: B } : {}),
                    });
                  }
                }
              } else if (mDr(C)) {
                let O = (_ = t == null ? void 0 : t.convertDataPart) == null ? void 0 : _.call(t, C);
                if (O != null) S.push(O);
              } else throw Error(`Unsupported part: ${C}`);
            r.push({ role: "assistant", content: S });
            let T = a.filter((C) => {
              var O;
              return (
                Hje(C) &&
                (C.providerExecuted !== !0 || ((O = C.approval) == null ? void 0 : O.approved) != null)
              );
            });
            if (T.length > 0) {
              let C = [];
              for (let O of T) {
                if (((L = O.approval) == null ? void 0 : L.approved) != null)
                  C.push({
                    type: "tool-approval-response",
                    approvalId: O.approval.id,
                    approved: O.approval.approved,
                    reason: O.approval.reason,
                    providerExecuted: O.providerExecuted,
                  });
                if (O.providerExecuted === !0) continue;
                switch (O.state) {
                  case "output-denied": {
                    C.push({
                      type: "tool-result",
                      toolCallId: O.toolCallId,
                      toolName: LDr(O),
                      output: {
                        type: "error-text",
                        value: (I = O.approval.reason) != null ? I : "Tool execution denied.",
                      },
                      ...(O.callProviderMetadata != null ? { providerOptions: O.callProviderMetadata } : {}),
                    });
                    break;
                  }
                  case "output-error":
                  case "output-available": {
                    let B = LDr(O);
                    C.push({
                      type: "tool-result",
                      toolCallId: O.toolCallId,
                      toolName: B,
                      output: await cje({
                        toolCallId: O.toolCallId,
                        input: O.input,
                        output: O.state === "output-error" ? O.errorText : O.output,
                        tool: (D = t == null ? void 0 : t.tools) == null ? void 0 : D[B],
                        errorMode: O.state === "output-error" ? "text" : "none",
                      }),
                      ...(O.callProviderMetadata != null ? { providerOptions: O.callProviderMetadata } : {}),
                    });
                    break;
                  }
                }
              }
              if (C.length > 0) r.push({ role: "tool", content: C });
            }
            a = [];
          }
          for (let u of s.parts)
            if (_Dr(u) || Fki(u) || hDr(u) || Hje(u) || mDr(u)) a.push(u);
            else if (u.type === "step-start") await H();
          await H();
          break;
        }
        break;
      }
      default: {
        let a = s.role;
        throw new LSa({ originalMessage: s, message: `Unsupported role: ${a}` });
      }
    }
  return r;
}

function vTa({
  tools: e,
  generatorStream: t,
  tracer: r,
  telemetry: s,
  system: a,
  messages: H,
  abortSignal: u,
  repairToolCall: f,
  experimental_context: d,
  generateId: _,
  stepNumber: L,
  model: I,
  onToolCallStart: D,
  onToolCallFinish: S,
}) {
  let T = null,
    C = new ReadableStream({
      start(z) {
        T = z;
      },
    }),
    O = new Set(),
    B = new Map(),
    V = new Map(),
    q = !1,
    Z = void 0;
  function se() {
    if (q && O.size === 0) {
      if (Z != null) T.enqueue(Z);
      T.close();
    }
  }
  let ae = new TransformStream({
    async transform(z, Ae) {
      let le = z.type;
      switch (le) {
        case "stream-start":
        case "text-start":
        case "text-delta":
        case "text-end":
        case "reasoning-start":
        case "reasoning-delta":
        case "reasoning-end":
        case "tool-input-start":
        case "tool-input-delta":
        case "tool-input-end":
        case "source":
        case "response-metadata":
        case "error":
        case "raw": {
          Ae.enqueue(z);
          break;
        }
        case "file": {
          Ae.enqueue({
            type: "file",
            file: new cTa({ data: z.data, mediaType: z.mediaType }),
            ...(z.providerMetadata != null ? { providerMetadata: z.providerMetadata } : {}),
          });
          break;
        }
        case "finish": {
          Z = {
            type: "finish",
            finishReason: z.finishReason.unified,
            rawFinishReason: z.finishReason.raw,
            usage: BTt(z.usage),
            providerMetadata: z.providerMetadata,
          };
          break;
        }
        case "tool-approval-request": {
          let Be = V.get(z.toolCallId);
          if (Be == null) {
            T.enqueue({
              type: "error",
              error: new t6i({ toolCallId: z.toolCallId, approvalId: z.approvalId }),
            });
            break;
          }
          Ae.enqueue({ type: "tool-approval-request", approvalId: z.approvalId, toolCall: Be });
          break;
        }
        case "tool-call": {
          try {
            let Be = await _Ta({ toolCall: z, tools: e, repairToolCall: f, system: a, messages: H });
            if ((V.set(Be.toolCallId, Be), Ae.enqueue(Be), Be.invalid)) {
              T.enqueue({
                type: "tool-error",
                toolCallId: Be.toolCallId,
                toolName: Be.toolName,
                input: Be.input,
                error: C5e(Be.error),
                dynamic: !0,
                title: Be.title,
              });
              break;
            }
            let Te = e == null ? void 0 : e[Be.toolName];
            if (Te == null) break;
            if (Te.onInputAvailable != null)
              await Te.onInputAvailable({
                input: Be.input,
                toolCallId: Be.toolCallId,
                messages: H,
                abortSignal: u,
                experimental_context: d,
              });
            if (await ATa({ tool: Te, toolCall: Be, messages: H, experimental_context: d })) {
              T.enqueue({ type: "tool-approval-request", approvalId: _(), toolCall: Be });
              break;
            }
            if ((B.set(Be.toolCallId, Be.input), Te.execute != null && Be.providerExecuted !== !0)) {
              let Lt = _();
              (O.add(Lt),
                R6i({
                  toolCall: Be,
                  tools: e,
                  tracer: r,
                  telemetry: s,
                  messages: H,
                  abortSignal: u,
                  experimental_context: d,
                  stepNumber: L,
                  model: I,
                  onToolCallStart: D,
                  onToolCallFinish: S,
                  onPreliminaryToolResult: (Ht) => {
                    T.enqueue(Ht);
                  },
                })
                  .then((Ht) => {
                    T.enqueue(Ht);
                  })
                  .catch((Ht) => {
                    T.enqueue({ type: "error", error: Ht });
                  })
                  .finally(() => {
                    (O.delete(Lt), se());
                  }));
            }
          } catch (Be) {
            T.enqueue({ type: "error", error: Be });
          }
          break;
        }
        case "tool-result": {
          let Be = z.toolName;
          if (z.isError)
            T.enqueue({
              type: "tool-error",
              toolCallId: z.toolCallId,
              toolName: Be,
              input: B.get(z.toolCallId),
              providerExecuted: !0,
              error: z.result,
              dynamic: z.dynamic,
              ...(z.providerMetadata != null ? { providerMetadata: z.providerMetadata } : {}),
            });
          else
            Ae.enqueue({
              type: "tool-result",
              toolCallId: z.toolCallId,
              toolName: Be,
              input: B.get(z.toolCallId),
              output: z.result,
              providerExecuted: !0,
              dynamic: z.dynamic,
              ...(z.providerMetadata != null ? { providerMetadata: z.providerMetadata } : {}),
            });
          break;
        }
        default:
          throw Error(`Unhandled chunk type: ${le}`);
      }
    },
    flush() {
      ((q = !0), se());
    },
  });
  return new ReadableStream({
    async start(z) {
      return Promise.all([
        t.pipeThrough(ae).pipeTo(
          new WritableStream({
            write(Ae) {
              z.enqueue(Ae);
            },
            close() {},
          }),
        ),
        C.pipeTo(
          new WritableStream({
            write(Ae) {
              z.enqueue(Ae);
            },
            close() {
              z.close();
            },
          }),
        ),
      ]);
    },
  });
}

var EHe = ne(() => {
  UTt();
  Ih();
  Ih();
  od();
  od();
  od();
  od();
  od();
  od();
  od();
  od();
  od();
  od();
  od();
  od();
  od();
  od();
  od();
  UTt();
  Ih();
  Ih();
  Ih();
  Ih();
  od();
  Ih();
  W1();
  od();
  Ih();
  od();
  Ih();
  W1();
  W1();
  W1();
  W1();
  W1();
  UTt();
  od();
  od();
  Ih();
  Ih();
  Ih();
  od();
  Ih();
  Ih();
  Ih();
  od();
  Ih();
  Ih();
  W1();
  Ih();
  Ih();
  Ih();
  Ih();
  W1();
  Ih();
  od();
  Ih();
  od();
  Ih();
  Ih();
  ((N6i = Tl(kf(), 1)),
    (Aje = Tl(kf(), 1)),
    (vxa = Object.defineProperty),
    (Vki = `vercel.ai.error.${Wki}`),
    (jxa = Symbol.for(Vki)),
    (UE = class extends pc {
      constructor({ parameter: e, value: t, message: r }) {
        super({ name: Wki, message: `Invalid argument for parameter ${e}: ${r}` });
        ((this[qki] = !0), (this.parameter = e), (this.value = t));
      }
      static isInstance(e) {
        return pc.hasMarker(e, Vki);
      }
    }));
  qki = jxa;
  ((Cxa = `vercel.ai.error.${Pxa}`), (wxa = Symbol.for(Cxa)));
  kxa = wxa;
  ((Xki = `vercel.ai.error.${Gki}`),
    (Oxa = Symbol.for(Xki)),
    (Uxa = class extends pc {
      constructor({ approvalId: e }) {
        super({
          name: Gki,
          message: `Tool approval response references unknown approvalId: "${e}". No matching tool-approval-request found in message history.`,
        });
        ((this[Jki] = !0), (this.approvalId = e));
      }
      static isInstance(e) {
        return pc.hasMarker(e, Xki);
      }
    }));
  Jki = Oxa;
  ((zki = `vercel.ai.error.${Kki}`),
    (Nxa = Symbol.for(zki)),
    (DDr = class extends pc {
      constructor({
        toolInput: e,
        toolName: t,
        cause: r,
        message: s = `Invalid input for tool ${t}: ${fW(r)}`,
      }) {
        super({ name: Kki, message: s, cause: r });
        ((this[Qki] = !0), (this.toolInput = e), (this.toolName = t));
      }
      static isInstance(e) {
        return pc.hasMarker(e, zki);
      }
    }));
  Qki = Nxa;
  ((Zki = `vercel.ai.error.${Yki}`),
    (Fxa = Symbol.for(Zki)),
    (t6i = class extends pc {
      constructor({ toolCallId: e, approvalId: t }) {
        super({ name: Yki, message: `Tool call "${e}" not found for approval request "${t}".` });
        ((this[e6i] = !0), (this.toolCallId = e), (this.approvalId = t));
      }
      static isInstance(e) {
        return pc.hasMarker(e, Zki);
      }
    }));
  e6i = Fxa;
  ((n6i = `vercel.ai.error.${r6i}`),
    (Bxa = Symbol.for(n6i)),
    (Pki = class extends pc {
      constructor({ toolCallIds: e }) {
        super({
          name: r6i,
          message: `Tool result${e.length > 1 ? "s are" : " is"} missing for tool call${e.length > 1 ? "s" : ""} ${e.join(", ")}.`,
        });
        ((this[i6i] = !0), (this.toolCallIds = e));
      }
      static isInstance(e) {
        return pc.hasMarker(e, n6i);
      }
    }));
  i6i = Bxa;
  ((Wxa = `vercel.ai.error.${Rxa}`), (Vxa = Symbol.for(Wxa)));
  qxa = Vxa;
  ((o6i = `vercel.ai.error.${s6i}`),
    (Gxa = Symbol.for(o6i)),
    (BN = class extends pc {
      constructor({
        message: e = "No object generated.",
        cause: t,
        text: r,
        response: s,
        usage: a,
        finishReason: H,
      }) {
        super({ name: s6i, message: e, cause: t });
        ((this[a6i] = !0), (this.text = r), (this.response = s), (this.usage = a), (this.finishReason = H));
      }
      static isInstance(e) {
        return pc.hasMarker(e, o6i);
      }
    }));
  a6i = Gxa;
  ((c6i = `vercel.ai.error.${H6i}`),
    (Xxa = Symbol.for(c6i)),
    (Jxa = class extends pc {
      constructor({ message: e = "No output generated.", cause: t } = {}) {
        super({ name: H6i, message: e, cause: t });
        this[A6i] = !0;
      }
      static isInstance(e) {
        return pc.hasMarker(e, c6i);
      }
    }));
  A6i = Xxa;
  ((zxa = `vercel.ai.error.${Kxa}`), (Qxa = Symbol.for(zxa)));
  Yxa = Qxa;
  ((eSa = `vercel.ai.error.${Zxa}`), (tSa = Symbol.for(eSa)));
  rSa = tSa;
  ((iSa = `vercel.ai.error.${nSa}`), (sSa = Symbol.for(iSa)));
  oSa = sSa;
  ((l6i = `vercel.ai.error.${u6i}`),
    (aSa = Symbol.for(l6i)),
    ($Dr = class extends pc {
      constructor({
        toolName: e,
        availableTools: t = void 0,
        message:
          r = `Model tried to call unavailable tool '${e}'. ${t === void 0 ? "No tools are available." : `Available tools: ${t.join(", ")}.`}`,
      }) {
        super({ name: u6i, message: r });
        ((this[f6i] = !0), (this.toolName = e), (this.availableTools = t));
      }
      static isInstance(e) {
        return pc.hasMarker(e, l6i);
      }
    }));
  f6i = aSa;
  ((d6i = `vercel.ai.error.${p6i}`),
    (HSa = Symbol.for(d6i)),
    (cSa = class extends pc {
      constructor({ cause: e, originalError: t, message: r = `Error repairing tool call: ${fW(e)}` }) {
        super({ name: p6i, message: r, cause: e });
        ((this[m6i] = !0), (this.originalError = t));
      }
      static isInstance(e) {
        return pc.hasMarker(e, d6i);
      }
    }));
  m6i = HSa;
  ((ASa = class extends pc {
    constructor(e) {
      super({
        name: "AI_UnsupportedModelVersionError",
        message: `Unsupported model version ${e.version} for provider "${e.provider}" and model "${e.modelId}". AI SDK 5 only supports models that implement specification version "v2".`,
      });
      ((this.version = e.version), (this.provider = e.provider), (this.modelId = e.modelId));
    }
  }),
    (h6i = `vercel.ai.error.${_6i}`),
    (uSa = Symbol.for(h6i)),
    (aje = class extends pc {
      constructor({ chunkType: e, chunkId: t, message: r }) {
        super({ name: _6i, message: r });
        ((this[L6i] = !0), (this.chunkType = e), (this.chunkId = t));
      }
      static isInstance(e) {
        return pc.hasMarker(e, h6i);
      }
    }));
  L6i = uSa;
  ((fSa = `vercel.ai.error.${lSa}`), (pSa = Symbol.for(fSa)));
  dSa = pSa;
  ((g6i = `vercel.ai.error.${$6i}`),
    (mSa = Symbol.for(g6i)),
    (_Sa = class extends pc {
      constructor({
        role: e,
        message: t = `Invalid message role: '${e}'. Must be one of: "system", "user", "assistant", "tool".`,
      }) {
        super({ name: $6i, message: t });
        ((this[E6i] = !0), (this.role = e));
      }
      static isInstance(e) {
        return pc.hasMarker(e, g6i);
      }
    }));
  E6i = mSa;
  ((D6i = `vercel.ai.error.${I6i}`),
    (hSa = Symbol.for(D6i)),
    (LSa = class extends pc {
      constructor({ originalMessage: e, message: t }) {
        super({ name: I6i, message: t });
        ((this[y6i] = !0), (this.originalMessage = e));
      }
      static isInstance(e) {
        return pc.hasMarker(e, D6i);
      }
    }));
  y6i = hSa;
  ((x6i = `vercel.ai.error.${M6i}`),
    ($Sa = Symbol.for(x6i)),
    (Cki = class extends pc {
      constructor({ message: e, reason: t, errors: r }) {
        super({ name: M6i, message: e });
        ((this[S6i] = !0), (this.reason = t), (this.errors = r), (this.lastError = r[r.length - 1]));
      }
      static isInstance(e) {
        return pc.hasMarker(e, x6i);
      }
    }));
  S6i = $Sa;
  TSa = [
    { mediaType: "image/gif", bytesPrefix: [71, 73, 70] },
    { mediaType: "image/png", bytesPrefix: [137, 80, 78, 71] },
    { mediaType: "image/jpeg", bytesPrefix: [255, 216] },
    { mediaType: "image/webp", bytesPrefix: [82, 73, 70, 70, null, null, null, null, 87, 69, 66, 80] },
    { mediaType: "image/bmp", bytesPrefix: [66, 77] },
    { mediaType: "image/tiff", bytesPrefix: [73, 73, 42, 0] },
    { mediaType: "image/tiff", bytesPrefix: [77, 77, 0, 42] },
    { mediaType: "image/avif", bytesPrefix: [0, 0, 0, 32, 102, 116, 121, 112, 97, 118, 105, 102] },
    { mediaType: "image/heic", bytesPrefix: [0, 0, 0, 32, 102, 116, 121, 112, 104, 101, 105, 99] },
  ];
  C6i = Ip([
    lr(),
    fTt(Uint8Array),
    fTt(ArrayBuffer),
    lTt(
      (e) => {
        var t, r;
        return (r = (t = globalThis.Buffer) == null ? void 0 : t.isBuffer(e)) != null ? r : !1;
      },
      { message: "Must be a Buffer" },
    ),
  ]);
  ((W5e = zya(() => Ip([SIr(), lr(), zu(), ru(), M_(lr(), W5e.optional()), Va(W5e)]))),
    (mu = M_(lr(), M_(lr(), W5e.optional()))),
    (k6i = os({ type: Fs("text"), text: lr(), providerOptions: mu.optional() })),
    (BSa = os({
      type: Fs("image"),
      image: Ip([C6i, fTt(URL)]),
      mediaType: lr().optional(),
      providerOptions: mu.optional(),
    })),
    (O6i = os({
      type: Fs("file"),
      data: Ip([C6i, fTt(URL)]),
      filename: lr().optional(),
      mediaType: lr(),
      providerOptions: mu.optional(),
    })),
    (RSa = os({ type: Fs("reasoning"), text: lr(), providerOptions: mu.optional() })),
    (WSa = os({
      type: Fs("tool-call"),
      toolCallId: lr(),
      toolName: lr(),
      input: gl(),
      providerOptions: mu.optional(),
      providerExecuted: ru().optional(),
    })),
    (VSa = ATt("type", [
      os({ type: Fs("text"), value: lr(), providerOptions: mu.optional() }),
      os({ type: Fs("json"), value: W5e, providerOptions: mu.optional() }),
      os({ type: Fs("execution-denied"), reason: lr().optional(), providerOptions: mu.optional() }),
      os({ type: Fs("error-text"), value: lr(), providerOptions: mu.optional() }),
      os({ type: Fs("error-json"), value: W5e, providerOptions: mu.optional() }),
      os({
        type: Fs("content"),
        value: Va(
          Ip([
            os({ type: Fs("text"), text: lr(), providerOptions: mu.optional() }),
            os({ type: Fs("media"), data: lr(), mediaType: lr() }),
            os({
              type: Fs("file-data"),
              data: lr(),
              mediaType: lr(),
              filename: lr().optional(),
              providerOptions: mu.optional(),
            }),
            os({ type: Fs("file-url"), url: lr(), providerOptions: mu.optional() }),
            os({ type: Fs("file-id"), fileId: Ip([lr(), M_(lr(), lr())]), providerOptions: mu.optional() }),
            os({ type: Fs("image-data"), data: lr(), mediaType: lr(), providerOptions: mu.optional() }),
            os({ type: Fs("image-url"), url: lr(), providerOptions: mu.optional() }),
            os({
              type: Fs("image-file-id"),
              fileId: Ip([lr(), M_(lr(), lr())]),
              providerOptions: mu.optional(),
            }),
            os({ type: Fs("custom"), providerOptions: mu.optional() }),
          ]),
        ),
      }),
    ])),
    (U6i = os({
      type: Fs("tool-result"),
      toolCallId: lr(),
      toolName: lr(),
      output: VSa,
      providerOptions: mu.optional(),
    })),
    (qSa = os({ type: Fs("tool-approval-request"), approvalId: lr(), toolCallId: lr() })),
    (GSa = os({
      type: Fs("tool-approval-response"),
      approvalId: lr(),
      approved: ru(),
      reason: lr().optional(),
    })),
    (XSa = os({ role: Fs("system"), content: lr(), providerOptions: mu.optional() })),
    (JSa = os({
      role: Fs("user"),
      content: Ip([lr(), Va(Ip([k6i, BSa, O6i]))]),
      providerOptions: mu.optional(),
    })),
    (KSa = os({
      role: Fs("assistant"),
      content: Ip([lr(), Va(Ip([k6i, O6i, RSa, WSa, U6i, qSa]))]),
      providerOptions: mu.optional(),
    })),
    (zSa = os({ role: Fs("tool"), content: Va(Ip([U6i, GSa])), providerOptions: mu.optional() })),
    (QSa = Ip([XSa, JSa, KSa, zSa])));
  ((YSa = {
    startSpan() {
      return NTt;
    },
    startActiveSpan(e, t, r, s) {
      if (typeof t === "function") return t(NTt);
      if (typeof r === "function") return r(NTt);
      if (typeof s === "function") return s(NTt);
    },
  }),
    (NTt = {
      spanContext() {
        return ZSa;
      },
      setAttribute() {
        return this;
      },
      setAttributes() {
        return this;
      },
      addEvent() {
        return this;
      },
      addLink() {
        return this;
      },
      addLinks() {
        return this;
      },
      setStatus() {
        return this;
      },
      updateName() {
        return this;
      },
      end() {
        return this;
      },
      isRecording() {
        return !1;
      },
      recordException() {
        return this;
      },
    }),
    (ZSa = { traceId: "", spanId: "", traceFlags: 0 }));
  cTa = class extends HTa {
    constructor(e) {
      super(e);
      this.type = "file";
    }
  };
  uTa = {};
  bxa(uTa, { array: () => pTa, choice: () => dTa, json: () => mTa, object: () => fTa, text: () => gDr });
  p3c = DX({ prefix: "aitxt", size: 24 });
  ((X6i = class extends TransformStream {
    constructor() {
      super({
        transform(e, t) {
          t.enqueue(`data: ${JSON.stringify(e)}

`);
        },
        flush(e) {
          e.enqueue(`data: [DONE]

`);
        },
      });
    }
  }),
    (J6i = {
      "content-type": "text/event-stream",
      "cache-control": "no-cache",
      connection: "keep-alive",
      "x-vercel-ai-ui-message-stream": "v1",
      "x-accel-buffering": "no",
    }));
  $3c = CTt(() =>
    nje(
      Ip([
        iE({ type: Fs("text-start"), id: lr(), providerMetadata: mu.optional() }),
        iE({ type: Fs("text-delta"), id: lr(), delta: lr(), providerMetadata: mu.optional() }),
        iE({ type: Fs("text-end"), id: lr(), providerMetadata: mu.optional() }),
        iE({ type: Fs("error"), errorText: lr() }),
        iE({
          type: Fs("tool-input-start"),
          toolCallId: lr(),
          toolName: lr(),
          providerExecuted: ru().optional(),
          providerMetadata: mu.optional(),
          dynamic: ru().optional(),
          title: lr().optional(),
        }),
        iE({ type: Fs("tool-input-delta"), toolCallId: lr(), inputTextDelta: lr() }),
        iE({
          type: Fs("tool-input-available"),
          toolCallId: lr(),
          toolName: lr(),
          input: gl(),
          providerExecuted: ru().optional(),
          providerMetadata: mu.optional(),
          dynamic: ru().optional(),
          title: lr().optional(),
        }),
        iE({
          type: Fs("tool-input-error"),
          toolCallId: lr(),
          toolName: lr(),
          input: gl(),
          providerExecuted: ru().optional(),
          providerMetadata: mu.optional(),
          dynamic: ru().optional(),
          errorText: lr(),
          title: lr().optional(),
        }),
        iE({ type: Fs("tool-approval-request"), approvalId: lr(), toolCallId: lr() }),
        iE({
          type: Fs("tool-output-available"),
          toolCallId: lr(),
          output: gl(),
          providerExecuted: ru().optional(),
          providerMetadata: mu.optional(),
          dynamic: ru().optional(),
          preliminary: ru().optional(),
        }),
        iE({
          type: Fs("tool-output-error"),
          toolCallId: lr(),
          errorText: lr(),
          providerExecuted: ru().optional(),
          providerMetadata: mu.optional(),
          dynamic: ru().optional(),
        }),
        iE({ type: Fs("tool-output-denied"), toolCallId: lr() }),
        iE({ type: Fs("reasoning-start"), id: lr(), providerMetadata: mu.optional() }),
        iE({ type: Fs("reasoning-delta"), id: lr(), delta: lr(), providerMetadata: mu.optional() }),
        iE({ type: Fs("reasoning-end"), id: lr(), providerMetadata: mu.optional() }),
        iE({
          type: Fs("source-url"),
          sourceId: lr(),
          url: lr(),
          title: lr().optional(),
          providerMetadata: mu.optional(),
        }),
        iE({
          type: Fs("source-document"),
          sourceId: lr(),
          mediaType: lr(),
          title: lr(),
          filename: lr().optional(),
          providerMetadata: mu.optional(),
        }),
        iE({ type: Fs("file"), url: lr(), mediaType: lr(), providerMetadata: mu.optional() }),
        iE({
          type: lTt((e) => typeof e === "string" && e.startsWith("data-"), {
            message: 'Type must start with "data-"',
          }),
          id: lr().optional(),
          data: gl(),
          transient: ru().optional(),
        }),
        iE({ type: Fs("start-step") }),
        iE({ type: Fs("finish-step") }),
        iE({ type: Fs("start"), messageId: lr().optional(), messageMetadata: gl().optional() }),
        iE({
          type: Fs("finish"),
          finishReason: ax(["stop", "length", "content-filter", "tool-calls", "error", "other"]).optional(),
          messageMetadata: gl().optional(),
        }),
        iE({ type: Fs("abort"), reason: lr().optional() }),
        iE({ type: Fs("message-metadata"), messageMetadata: gl() }),
      ]),
    ),
  );
  bTa = DX({ prefix: "aitxt", size: 24 });
  ((y3c = CTt(() =>
    nje(
      Va(
        os({
          id: lr(),
          role: ax(["system", "user", "assistant"]),
          metadata: gl().optional(),
          parts: Va(
            Ip([
              os({
                type: Fs("text"),
                text: lr(),
                state: ax(["streaming", "done"]).optional(),
                providerMetadata: mu.optional(),
              }),
              os({
                type: Fs("reasoning"),
                text: lr(),
                state: ax(["streaming", "done"]).optional(),
                providerMetadata: mu.optional(),
              }),
              os({
                type: Fs("source-url"),
                sourceId: lr(),
                url: lr(),
                title: lr().optional(),
                providerMetadata: mu.optional(),
              }),
              os({
                type: Fs("source-document"),
                sourceId: lr(),
                mediaType: lr(),
                title: lr(),
                filename: lr().optional(),
                providerMetadata: mu.optional(),
              }),
              os({
                type: Fs("file"),
                mediaType: lr(),
                filename: lr().optional(),
                url: lr(),
                providerMetadata: mu.optional(),
              }),
              os({ type: Fs("step-start") }),
              os({ type: lr().startsWith("data-"), id: lr().optional(), data: gl() }),
              os({
                type: Fs("dynamic-tool"),
                toolName: lr(),
                toolCallId: lr(),
                state: Fs("input-streaming"),
                input: gl().optional(),
                providerExecuted: ru().optional(),
                callProviderMetadata: mu.optional(),
                output: y_().optional(),
                errorText: y_().optional(),
                approval: y_().optional(),
              }),
              os({
                type: Fs("dynamic-tool"),
                toolName: lr(),
                toolCallId: lr(),
                state: Fs("input-available"),
                input: gl(),
                providerExecuted: ru().optional(),
                output: y_().optional(),
                errorText: y_().optional(),
                callProviderMetadata: mu.optional(),
                approval: y_().optional(),
              }),
              os({
                type: Fs("dynamic-tool"),
                toolName: lr(),
                toolCallId: lr(),
                state: Fs("approval-requested"),
                input: gl(),
                providerExecuted: ru().optional(),
                output: y_().optional(),
                errorText: y_().optional(),
                callProviderMetadata: mu.optional(),
                approval: os({ id: lr(), approved: y_().optional(), reason: y_().optional() }),
              }),
              os({
                type: Fs("dynamic-tool"),
                toolName: lr(),
                toolCallId: lr(),
                state: Fs("approval-responded"),
                input: gl(),
                providerExecuted: ru().optional(),
                output: y_().optional(),
                errorText: y_().optional(),
                callProviderMetadata: mu.optional(),
                approval: os({ id: lr(), approved: ru(), reason: lr().optional() }),
              }),
              os({
                type: Fs("dynamic-tool"),
                toolName: lr(),
                toolCallId: lr(),
                state: Fs("output-available"),
                input: gl(),
                providerExecuted: ru().optional(),
                output: gl(),
                errorText: y_().optional(),
                callProviderMetadata: mu.optional(),
                resultProviderMetadata: mu.optional(),
                preliminary: ru().optional(),
                approval: os({ id: lr(), approved: Fs(!0), reason: lr().optional() }).optional(),
              }),
              os({
                type: Fs("dynamic-tool"),
                toolName: lr(),
                toolCallId: lr(),
                state: Fs("output-error"),
                input: gl(),
                rawInput: gl().optional(),
                providerExecuted: ru().optional(),
                output: y_().optional(),
                errorText: lr(),
                callProviderMetadata: mu.optional(),
                resultProviderMetadata: mu.optional(),
                approval: os({ id: lr(), approved: Fs(!0), reason: lr().optional() }).optional(),
              }),
              os({
                type: Fs("dynamic-tool"),
                toolName: lr(),
                toolCallId: lr(),
                state: Fs("output-denied"),
                input: gl(),
                providerExecuted: ru().optional(),
                output: y_().optional(),
                errorText: y_().optional(),
                callProviderMetadata: mu.optional(),
                approval: os({ id: lr(), approved: Fs(!1), reason: lr().optional() }),
              }),
              os({
                type: lr().startsWith("tool-"),
                toolCallId: lr(),
                state: Fs("input-streaming"),
                providerExecuted: ru().optional(),
                callProviderMetadata: mu.optional(),
                input: gl().optional(),
                output: y_().optional(),
                errorText: y_().optional(),
                approval: y_().optional(),
              }),
              os({
                type: lr().startsWith("tool-"),
                toolCallId: lr(),
                state: Fs("input-available"),
                providerExecuted: ru().optional(),
                input: gl(),
                output: y_().optional(),
                errorText: y_().optional(),
                callProviderMetadata: mu.optional(),
                approval: y_().optional(),
              }),
              os({
                type: lr().startsWith("tool-"),
                toolCallId: lr(),
                state: Fs("approval-requested"),
                input: gl(),
                providerExecuted: ru().optional(),
                output: y_().optional(),
                errorText: y_().optional(),
                callProviderMetadata: mu.optional(),
                approval: os({ id: lr(), approved: y_().optional(), reason: y_().optional() }),
              }),
              os({
                type: lr().startsWith("tool-"),
                toolCallId: lr(),
                state: Fs("approval-responded"),
                input: gl(),
                providerExecuted: ru().optional(),
                output: y_().optional(),
                errorText: y_().optional(),
                callProviderMetadata: mu.optional(),
                approval: os({ id: lr(), approved: ru(), reason: lr().optional() }),
              }),
              os({
                type: lr().startsWith("tool-"),
                toolCallId: lr(),
                state: Fs("output-available"),
                providerExecuted: ru().optional(),
                input: gl(),
                output: gl(),
                errorText: y_().optional(),
                callProviderMetadata: mu.optional(),
                resultProviderMetadata: mu.optional(),
                preliminary: ru().optional(),
                approval: os({ id: lr(), approved: Fs(!0), reason: lr().optional() }).optional(),
              }),
              os({
                type: lr().startsWith("tool-"),
                toolCallId: lr(),
                state: Fs("output-error"),
                providerExecuted: ru().optional(),
                input: gl(),
                rawInput: gl().optional(),
                output: y_().optional(),
                errorText: lr(),
                callProviderMetadata: mu.optional(),
                resultProviderMetadata: mu.optional(),
                approval: os({ id: lr(), approved: Fs(!0), reason: lr().optional() }).optional(),
              }),
              os({
                type: lr().startsWith("tool-"),
                toolCallId: lr(),
                state: Fs("output-denied"),
                providerExecuted: ru().optional(),
                input: gl(),
                output: y_().optional(),
                errorText: y_().optional(),
                callProviderMetadata: mu.optional(),
                approval: os({ id: lr(), approved: Fs(!1), reason: lr().optional() }),
              }),
            ]),
          ).nonempty("Message must contain at least one part"),
        }),
      ).nonempty("Messages array must not be empty"),
    ),
  )),
    (CTa = {
      type: "no-schema",
      jsonSchema: async () => {
        return;
      },
      async validatePartialResult({ value: e, textDelta: t }) {
        return { success: !0, value: { partial: e, textDelta: t } };
      },
      async validateFinalResult(e, t) {
        return e === void 0
          ? {
              success: !1,
              error: new BN({
                message: "No object generated: response did not match schema.",
                text: t.text,
                response: t.response,
                usage: t.usage,
                finishReason: t.finishReason,
              }),
            }
          : { success: !0, value: e };
      },
      createElementStream() {
        throw new gv({ functionality: "element streams in no-schema mode" });
      },
    }));
  UTa = DX({ prefix: "aiobj", size: 24 });
  FTa = DX({ prefix: "aiobj", size: 24 });
  ((j3c = n8i()), (VTa = `vercel.ai.error.${WTa}`), (qTa = Symbol.for(VTa)));
  GTa = qTa;
  P3c = n8i();
});
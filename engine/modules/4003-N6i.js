
var N6i,
  Aje,
  vxa,
  bxa = (e, t) => {
    for (var r in t) vxa(e, r, { get: t[r], enumerable: !0 });
  },
  Wki = "AI_InvalidArgumentError",
  Vki,
  jxa,
  qki,
  UE,
  Pxa = "AI_InvalidStreamPartError",
  Cxa,
  wxa,
  kxa,
  Gki = "AI_InvalidToolApprovalError",
  Xki,
  Oxa,
  Jki,
  Uxa,
  Kki = "AI_InvalidToolInputError",
  zki,
  Nxa,
  Qki,
  DDr,
  Yki = "AI_ToolCallNotFoundForApprovalError",
  Zki,
  Fxa,
  e6i,
  t6i,
  r6i = "AI_MissingToolResultsError",
  n6i,
  Bxa,
  i6i,
  Pki,
  Rxa = "AI_NoImageGeneratedError",
  Wxa,
  Vxa,
  qxa,
  s6i = "AI_NoObjectGeneratedError",
  o6i,
  Gxa,
  a6i,
  BN,
  H6i = "AI_NoOutputGeneratedError",
  c6i,
  Xxa,
  A6i,
  Jxa,
  Kxa = "AI_NoSpeechGeneratedError",
  zxa,
  Qxa,
  Yxa,
  Zxa = "AI_NoTranscriptGeneratedError",
  eSa,
  tSa,
  rSa,
  nSa = "AI_NoVideoGeneratedError",
  iSa,
  sSa,
  oSa,
  u6i = "AI_NoSuchToolError",
  l6i,
  aSa,
  f6i,
  $Dr,
  p6i = "AI_ToolCallRepairError",
  d6i,
  HSa,
  m6i,
  cSa,
  ASa,
  _6i = "AI_UIMessageStreamError",
  h6i,
  uSa,
  L6i,
  aje,
  lSa = "AI_InvalidDataContentError",
  fSa,
  pSa,
  dSa,
  $6i = "AI_InvalidMessageRoleError",
  g6i,
  mSa,
  E6i,
  _Sa,
  I6i = "AI_MessageConversionError",
  D6i,
  hSa,
  y6i,
  LSa,
  M6i = "AI_RetryError",
  x6i,
  $Sa,
  S6i,
  Cki,
  ESa = "AI SDK Warning System: To turn off warning logging, set the AI_SDK_LOG_WARNINGS global to false.",
  wki = !1,
  WTt = (e) => {
    if (e.warnings.length === 0) return;
    let t = globalThis.AI_SDK_LOG_WARNINGS;
    if (t === !1) return;
    if (typeof t === "function") {
      t(e);
      return;
    }
    if (!wki) ((wki = !0), console.info(ESa));
    for (let r of e.warnings) console.warn(gSa({ warning: r, provider: e.provider, model: e.model }));
  },
  TSa,
  vSa = (e) => {
    let t = typeof e === "string" ? IX(e) : e,
      r = ((t[6] & 127) << 21) | ((t[7] & 127) << 14) | ((t[8] & 127) << 7) | (t[9] & 127);
    return t.slice(r + 10);
  },
  j6i = "6.0.168",
  P6i = async ({ url: e, maxBytes: t, abortSignal: r }) => {
    var s;
    let a = e.toString();
    bTt(a);
    try {
      let H = await fetch(a, { headers: gHe({}, `ai-sdk/${j6i}`, YIr()), signal: r });
      if (H.redirected) bTt(H.url);
      if (!H.ok) throw new $T({ url: a, statusCode: H.status, statusText: H.statusText });
      return {
        data: await PTt({ response: H, url: a, maxBytes: t != null ? t : jTt }),
        mediaType: (s = H.headers.get("content-type")) != null ? s : void 0,
      };
    } catch (H) {
      if ($T.isInstance(H)) throw H;
      throw new $T({ url: a, cause: H });
    }
  },
  PSa =
    (e = P6i) =>
    (t) =>
      Promise.all(t.map(async (r) => (r.isUrlSupportedByModel ? null : e(r)))),
  C6i,
  W5e,
  mu,
  k6i,
  BSa,
  O6i,
  RSa,
  WSa,
  VSa,
  U6i,
  qSa,
  GSa,
  XSa,
  JSa,
  KSa,
  zSa,
  QSa,
  YSa,
  NTt,
  ZSa,
  iTa =
    ({ maxRetries: e = 2, initialDelayInMs: t = 2000, backoffFactor: r = 2, abortSignal: s } = {}) =>
    async (a) =>
      B6i(a, { maxRetries: e, delayInMs: t, backoffFactor: r, abortSignal: s }),
  HTa = class {
    constructor({ data: e, mediaType: t }) {
      let r = e instanceof Uint8Array;
      ((this.base64Data = r ? void 0 : e), (this.uint8ArrayData = r ? e : void 0), (this.mediaType = t));
    }
    get base64() {
      if (this.base64Data == null) this.base64Data = tje(this.uint8ArrayData);
      return this.base64Data;
    }
    get uint8Array() {
      if (this.uint8ArrayData == null) this.uint8ArrayData = IX(this.base64Data);
      return this.uint8ArrayData;
    }
  },
  cTa,
  uTa,
  gDr = () => ({
    name: "text",
    responseFormat: Promise.resolve({ type: "text" }),
    async parseCompleteOutput({ text: e }) {
      return e;
    },
    async parsePartialOutput({ text: e }) {
      return { partial: e };
    },
    createElementStreamTransform() {
      return;
    },
  }),
  fTa = ({ schema: e, name: t, description: r }) => {
    let s = Rw(e);
    return {
      name: "object",
      responseFormat: nDr(s.jsonSchema).then((a) => ({
        type: "json",
        schema: a,
        ...(t != null && { name: t }),
        ...(r != null && { description: r }),
      })),
      async parseCompleteOutput({ text: a }, H) {
        let u = await LP({ text: a });
        if (!u.success)
          throw new BN({
            message: "No object generated: could not parse the response.",
            cause: u.error,
            text: a,
            response: H.response,
            usage: H.usage,
            finishReason: H.finishReason,
          });
        let f = await Ww({ value: u.value, schema: s });
        if (!f.success)
          throw new BN({
            message: "No object generated: response did not match schema.",
            cause: f.error,
            text: a,
            response: H.response,
            usage: H.usage,
            finishReason: H.finishReason,
          });
        return f.value;
      },
      async parsePartialOutput({ text: a }) {
        let H = await uje(a);
        switch (H.state) {
          case "failed-parse":
          case "undefined-input":
            return;
          case "repaired-parse":
          case "successful-parse":
            return { partial: H.value };
        }
      },
      createElementStreamTransform() {
        return;
      },
    };
  },
  pTa = ({ element: e, name: t, description: r }) => {
    let s = Rw(e);
    return {
      name: "array",
      responseFormat: nDr(s.jsonSchema).then((a) => {
        let { $schema: H, ...u } = a;
        return {
          type: "json",
          schema: {
            $schema: "http://json-schema.org/draft-07/schema#",
            type: "object",
            properties: { elements: { type: "array", items: u } },
            required: ["elements"],
            additionalProperties: !1,
          },
          ...(t != null && { name: t }),
          ...(r != null && { description: r }),
        };
      }),
      async parseCompleteOutput({ text: a }, H) {
        let u = await LP({ text: a });
        if (!u.success)
          throw new BN({
            message: "No object generated: could not parse the response.",
            cause: u.error,
            text: a,
            response: H.response,
            usage: H.usage,
            finishReason: H.finishReason,
          });
        let f = u.value;
        if (f == null || typeof f !== "object" || !("elements" in f) || !Array.isArray(f.elements))
          throw new BN({
            message: "No object generated: response did not match schema.",
            cause: new dy({ value: f, cause: "response must be an object with an elements array" }),
            text: a,
            response: H.response,
            usage: H.usage,
            finishReason: H.finishReason,
          });
        for (let d of f.elements) {
          let _ = await Ww({ value: d, schema: s });
          if (!_.success)
            throw new BN({
              message: "No object generated: response did not match schema.",
              cause: _.error,
              text: a,
              response: H.response,
              usage: H.usage,
              finishReason: H.finishReason,
            });
        }
        return f.elements;
      },
      async parsePartialOutput({ text: a }) {
        let H = await uje(a);
        switch (H.state) {
          case "failed-parse":
          case "undefined-input":
            return;
          case "repaired-parse":
          case "successful-parse": {
            let u = H.value;
            if (u == null || typeof u !== "object" || !("elements" in u) || !Array.isArray(u.elements))
              return;
            let f =
                H.state === "repaired-parse" && u.elements.length > 0 ? u.elements.slice(0, -1) : u.elements,
              d = [];
            for (let _ of f) {
              let L = await Ww({ value: _, schema: s });
              if (L.success) d.push(L.value);
            }
            return { partial: d };
          }
        }
      },
      createElementStreamTransform() {
        let a = 0;
        return new TransformStream({
          transform({ partialOutput: H }, u) {
            if (H != null) for (; a < H.length; a++) u.enqueue(H[a]);
          },
        });
      },
    };
  },
  dTa = ({ options: e, name: t, description: r }) => ({
    name: "choice",
    responseFormat: Promise.resolve({
      type: "json",
      schema: {
        $schema: "http://json-schema.org/draft-07/schema#",
        type: "object",
        properties: { result: { type: "string", enum: e } },
        required: ["result"],
        additionalProperties: !1,
      },
      ...(t != null && { name: t }),
      ...(r != null && { description: r }),
    }),
    async parseCompleteOutput({ text: s }, a) {
      let H = await LP({ text: s });
      if (!H.success)
        throw new BN({
          message: "No object generated: could not parse the response.",
          cause: H.error,
          text: s,
          response: a.response,
          usage: a.usage,
          finishReason: a.finishReason,
        });
      let u = H.value;
      if (
        u == null ||
        typeof u !== "object" ||
        !("result" in u) ||
        typeof u.result !== "string" ||
        !e.includes(u.result)
      )
        throw new BN({
          message: "No object generated: response did not match schema.",
          cause: new dy({ value: u, cause: "response must be an object that contains a choice value." }),
          text: s,
          response: a.response,
          usage: a.usage,
          finishReason: a.finishReason,
        });
      return u.result;
    },
    async parsePartialOutput({ text: s }) {
      let a = await uje(s);
      switch (a.state) {
        case "failed-parse":
        case "undefined-input":
          return;
        case "repaired-parse":
        case "successful-parse": {
          let H = a.value;
          if (H == null || typeof H !== "object" || !("result" in H) || typeof H.result !== "string") return;
          let u = e.filter((f) => f.startsWith(H.result));
          if (a.state === "successful-parse") return u.includes(H.result) ? { partial: H.result } : void 0;
          else return u.length === 1 ? { partial: u[0] } : void 0;
        }
      }
    },
    createElementStreamTransform() {
      return;
    },
  }),
  mTa = ({ name: e, description: t } = {}) => ({
    name: "json",
    responseFormat: Promise.resolve({
      type: "json",
      ...(e != null && { name: e }),
      ...(t != null && { description: t }),
    }),
    async parseCompleteOutput({ text: r }, s) {
      let a = await LP({ text: r });
      if (!a.success)
        throw new BN({
          message: "No object generated: could not parse the response.",
          cause: a.error,
          text: r,
          response: s.response,
          usage: s.usage,
          finishReason: s.finishReason,
        });
      return a.value;
    },
    async parsePartialOutput({ text: r }) {
      let s = await uje(r);
      switch (s.state) {
        case "failed-parse":
        case "undefined-input":
          return;
        case "repaired-parse":
        case "successful-parse":
          return s.value === void 0 ? void 0 : { partial: s.value };
      }
    },
    createElementStreamTransform() {
      return;
    },
  }),
  hTa = class {
    constructor({
      stepNumber: e,
      model: t,
      functionId: r,
      metadata: s,
      experimental_context: a,
      content: H,
      finishReason: u,
      rawFinishReason: f,
      usage: d,
      warnings: _,
      request: L,
      response: I,
      providerMetadata: D,
    }) {
      ((this.stepNumber = e),
        (this.model = t),
        (this.functionId = r),
        (this.metadata = s),
        (this.experimental_context = a),
        (this.content = H),
        (this.finishReason = u),
        (this.rawFinishReason = f),
        (this.usage = d),
        (this.warnings = _),
        (this.request = L),
        (this.response = I),
        (this.providerMetadata = D));
    }
    get text() {
      return this.content
        .filter((e) => e.type === "text")
        .map((e) => e.text)
        .join("");
    }
    get reasoning() {
      return this.content.filter((e) => e.type === "reasoning");
    }
    get reasoningText() {
      return this.reasoning.length === 0 ? void 0 : this.reasoning.map((e) => e.text).join("");
    }
    get files() {
      return this.content.filter((e) => e.type === "file").map((e) => e.file);
    }
    get sources() {
      return this.content.filter((e) => e.type === "source");
    }
    get toolCalls() {
      return this.content.filter((e) => e.type === "tool-call");
    }
    get staticToolCalls() {
      return this.toolCalls.filter((e) => e.dynamic !== !0);
    }
    get dynamicToolCalls() {
      return this.toolCalls.filter((e) => e.dynamic === !0);
    }
    get toolResults() {
      return this.content.filter((e) => e.type === "tool-result");
    }
    get staticToolResults() {
      return this.toolResults.filter((e) => e.dynamic !== !0);
    }
    get dynamicToolResults() {
      return this.toolResults.filter((e) => e.dynamic === !0);
    }
  },
  p3c,
  X6i,
  J6i,
  $3c,
  bTa,
  PTa = class {
    constructor({
      model: e,
      telemetry: t,
      headers: r,
      settings: s,
      maxRetries: a,
      abortSignal: H,
      stepTimeoutMs: u,
      stepAbortController: f,
      chunkTimeoutMs: d,
      chunkAbortController: _,
      system: L,
      prompt: I,
      messages: D,
      tools: S,
      toolChoice: T,
      transforms: C,
      activeTools: O,
      repairToolCall: B,
      stopConditions: V,
      output: q,
      providerOptions: Z,
      prepareStep: se,
      includeRawChunks: ae,
      now: z,
      generateId: Ae,
      timeout: le,
      stopWhen: Be,
      originalAbortSignal: Te,
      onChunk: Lt,
      onError: Ht,
      onFinish: Se,
      onAbort: _e,
      onStepFinish: we,
      onStart: Pe,
      onStepStart: ye,
      onToolCallStart: ot,
      onToolCallFinish: Ee,
      experimental_context: Ve,
      download: Fe,
      include: it,
    }) {
      ((this._totalUsage = new B8()),
        (this._finishReason = new B8()),
        (this._rawFinishReason = new B8()),
        (this._steps = new B8()),
        (this.outputSpecification = q),
        (this.includeRawChunks = ae),
        (this.tools = S));
      let et = tTa()(t == null ? void 0 : t.integrations),
        ut,
        ht = [],
        Et = [],
        tr = void 0,
        Rr = void 0,
        Vt = void 0,
        Br = {},
        Dt = [],
        St = [],
        wt = new Map(),
        Qr,
        Li = {},
        sr = {},
        Mt = new TransformStream({
          async transform(kr, Wi) {
            var oo, $o, La, mA;
            Wi.enqueue(kr);
            let { part: Bs } = kr;
            if (
              Bs.type === "text-delta" ||
              Bs.type === "reasoning-delta" ||
              Bs.type === "source" ||
              Bs.type === "tool-call" ||
              Bs.type === "tool-result" ||
              Bs.type === "tool-input-start" ||
              Bs.type === "tool-input-delta" ||
              Bs.type === "raw"
            )
              await (Lt == null ? void 0 : Lt({ chunk: Bs }));
            if (Bs.type === "error") await Ht({ error: xDr(Bs.error) });
            if (Bs.type === "text-start")
              ((Li[Bs.id] = { type: "text", text: "", providerMetadata: Bs.providerMetadata }),
                ht.push(Li[Bs.id]));
            if (Bs.type === "text-delta") {
              let iH = Li[Bs.id];
              if (iH == null) {
                Wi.enqueue({
                  part: { type: "error", error: `text part ${Bs.id} not found` },
                  partialOutput: void 0,
                });
                return;
              }
              ((iH.text += Bs.text),
                (iH.providerMetadata = (oo = Bs.providerMetadata) != null ? oo : iH.providerMetadata));
            }
            if (Bs.type === "text-end") {
              let iH = Li[Bs.id];
              if (iH == null) {
                Wi.enqueue({
                  part: { type: "error", error: `text part ${Bs.id} not found` },
                  partialOutput: void 0,
                });
                return;
              }
              ((iH.providerMetadata = ($o = Bs.providerMetadata) != null ? $o : iH.providerMetadata),
                delete Li[Bs.id]);
            }
            if (Bs.type === "reasoning-start")
              ((sr[Bs.id] = { type: "reasoning", text: "", providerMetadata: Bs.providerMetadata }),
                ht.push(sr[Bs.id]));
            if (Bs.type === "reasoning-delta") {
              let iH = sr[Bs.id];
              if (iH == null) {
                Wi.enqueue({
                  part: { type: "error", error: `reasoning part ${Bs.id} not found` },
                  partialOutput: void 0,
                });
                return;
              }
              ((iH.text += Bs.text),
                (iH.providerMetadata = (La = Bs.providerMetadata) != null ? La : iH.providerMetadata));
            }
            if (Bs.type === "reasoning-end") {
              let iH = sr[Bs.id];
              if (iH == null) {
                Wi.enqueue({
                  part: { type: "error", error: `reasoning part ${Bs.id} not found` },
                  partialOutput: void 0,
                });
                return;
              }
              ((iH.providerMetadata = (mA = Bs.providerMetadata) != null ? mA : iH.providerMetadata),
                delete sr[Bs.id]);
            }
            if (Bs.type === "file")
              ht.push({
                type: "file",
                file: Bs.file,
                ...(Bs.providerMetadata != null ? { providerMetadata: Bs.providerMetadata } : {}),
              });
            if (Bs.type === "source") ht.push(Bs);
            if (Bs.type === "tool-call") ht.push(Bs);
            if (Bs.type === "tool-result" && !Bs.preliminary) ht.push(Bs);
            if (Bs.type === "tool-approval-request") ht.push(Bs);
            if (Bs.type === "tool-error") ht.push(Bs);
            if (Bs.type === "start-step")
              ((ht = []), (sr = {}), (Li = {}), (Br = Bs.request), (Dt = Bs.warnings));
            if (Bs.type === "finish-step") {
              let iH = await Nki({ content: ht, tools: S }),
                xa = new hTa({
                  stepNumber: St.length,
                  model: gr,
                  ...Ei,
                  experimental_context: Ve,
                  content: ht,
                  finishReason: Bs.finishReason,
                  rawFinishReason: Bs.rawFinishReason,
                  usage: Bs.usage,
                  warnings: Dt,
                  request: Br,
                  response: { ...Bs.response, messages: [...Et, ...iH] },
                  providerMetadata: Bs.providerMetadata,
                });
              (await Phe({ event: xa, callbacks: [we, et.onStepFinish] }),
                WTt({ warnings: Dt, provider: gr.provider, model: gr.modelId }),
                St.push(xa),
                Et.push(...iH),
                ut.resolve());
            }
            if (Bs.type === "finish")
              ((Vt = Bs.totalUsage), (tr = Bs.finishReason), (Rr = Bs.rawFinishReason));
          },
          async flush(kr) {
            var Wi, oo, $o, La, mA, Bs, iH;
            try {
              if (St.length === 0) {
                let i_ = (H == null ? void 0 : H.aborted)
                  ? H.reason
                  : new Jxa({ message: "No output generated. Check the stream for errors." });
                (en._finishReason.reject(i_),
                  en._rawFinishReason.reject(i_),
                  en._totalUsage.reject(i_),
                  en._steps.reject(i_));
                return;
              }
              let xa = tr != null ? tr : "other",
                sH = Vt != null ? Vt : FTt();
              (en._finishReason.resolve(xa),
                en._rawFinishReason.resolve(Rr),
                en._totalUsage.resolve(sH),
                en._steps.resolve(St));
              let Ys = St[St.length - 1];
              (await Phe({
                event: {
                  stepNumber: Ys.stepNumber,
                  model: Ys.model,
                  functionId: Ys.functionId,
                  metadata: Ys.metadata,
                  experimental_context: Ys.experimental_context,
                  finishReason: Ys.finishReason,
                  rawFinishReason: Ys.rawFinishReason,
                  totalUsage: sH,
                  usage: Ys.usage,
                  content: Ys.content,
                  text: Ys.text,
                  reasoningText: Ys.reasoningText,
                  reasoning: Ys.reasoning,
                  files: Ys.files,
                  sources: Ys.sources,
                  toolCalls: Ys.toolCalls,
                  staticToolCalls: Ys.staticToolCalls,
                  dynamicToolCalls: Ys.dynamicToolCalls,
                  toolResults: Ys.toolResults,
                  staticToolResults: Ys.staticToolResults,
                  dynamicToolResults: Ys.dynamicToolResults,
                  request: Ys.request,
                  response: Ys.response,
                  warnings: Ys.warnings,
                  providerMetadata: Ys.providerMetadata,
                  steps: St,
                },
                callbacks: [Se, et.onFinish],
              }),
                Qr.setAttributes(
                  await qw({
                    telemetry: t,
                    attributes: {
                      "ai.response.finishReason": xa,
                      "ai.response.text": { output: () => Ys.text },
                      "ai.response.reasoning": { output: () => Ys.reasoningText },
                      "ai.response.toolCalls": {
                        output: () => {
                          var i_;
                          return ((i_ = Ys.toolCalls) == null ? void 0 : i_.length)
                            ? JSON.stringify(Ys.toolCalls)
                            : void 0;
                        },
                      },
                      "ai.response.providerMetadata": JSON.stringify(Ys.providerMetadata),
                      "ai.usage.inputTokens": sH.inputTokens,
                      "ai.usage.inputTokenDetails.noCacheTokens":
                        (Wi = sH.inputTokenDetails) == null ? void 0 : Wi.noCacheTokens,
                      "ai.usage.inputTokenDetails.cacheReadTokens":
                        (oo = sH.inputTokenDetails) == null ? void 0 : oo.cacheReadTokens,
                      "ai.usage.inputTokenDetails.cacheWriteTokens":
                        ($o = sH.inputTokenDetails) == null ? void 0 : $o.cacheWriteTokens,
                      "ai.usage.outputTokens": sH.outputTokens,
                      "ai.usage.outputTokenDetails.textTokens":
                        (La = sH.outputTokenDetails) == null ? void 0 : La.textTokens,
                      "ai.usage.outputTokenDetails.reasoningTokens":
                        (mA = sH.outputTokenDetails) == null ? void 0 : mA.reasoningTokens,
                      "ai.usage.totalTokens": sH.totalTokens,
                      "ai.usage.reasoningTokens":
                        (Bs = sH.outputTokenDetails) == null ? void 0 : Bs.reasoningTokens,
                      "ai.usage.cachedInputTokens":
                        (iH = sH.inputTokenDetails) == null ? void 0 : iH.cacheReadTokens,
                    },
                  }),
                ));
            } catch (xa) {
              kr.error(xa);
            } finally {
              Qr.end();
            }
          },
        }),
        Lr = z6i();
      ((this.addStream = Lr.addStream), (this.closeStream = Lr.close));
      let Tr = Lr.stream.getReader(),
        Dn = new ReadableStream({
          async start(kr) {
            kr.enqueue({ type: "start" });
          },
          async pull(kr) {
            function Wi() {
              (_e == null || _e({ steps: St }),
                kr.enqueue({
                  type: "abort",
                  ...((H == null ? void 0 : H.reason) !== void 0 ? { reason: fW(H.reason) } : {}),
                }),
                kr.close());
            }
            try {
              let { done: oo, value: $o } = await Tr.read();
              if (oo) {
                kr.close();
                return;
              }
              if (H == null ? void 0 : H.aborted) {
                Wi();
                return;
              }
              kr.enqueue($o);
            } catch (oo) {
              if ($He(oo) && (H == null ? void 0 : H.aborted)) Wi();
              else kr.error(oo);
            }
          },
          cancel(kr) {
            return Lr.stream.cancel(kr);
          },
        });
      for (let kr of C)
        Dn = Dn.pipeThrough(
          kr({
            tools: S,
            stopStream() {
              Lr.terminate();
            },
          }),
        );
      this.baseStream = Dn.pipeThrough(jTa(q != null ? q : gDr())).pipeThrough(Mt);
      let { maxRetries: Mn, retry: as } = jDr({ maxRetries: a, abortSignal: H }),
        xi = TDr(t),
        go = R5e(s),
        Fo = SDr({ model: e, telemetry: t, headers: r, settings: { ...go, maxRetries: Mn } }),
        en = this,
        gr = { provider: e.provider, modelId: e.modelId },
        Ei = { functionId: t == null ? void 0 : t.functionId, metadata: t == null ? void 0 : t.metadata };
      khe({
        name: "ai.streamText",
        attributes: qw({
          telemetry: t,
          attributes: {
            ...whe({ operationId: "ai.streamText", telemetry: t }),
            ...Fo,
            "ai.prompt": { input: () => JSON.stringify({ system: L, prompt: I, messages: D }) },
          },
        }),
        tracer: xi,
        endWhenDone: !1,
        fn: async (kr) => {
          Qr = kr;
          let Wi = await MDr({ system: L, prompt: I, messages: D });
          await Phe({
            event: {
              model: gr,
              system: L,
              prompt: I,
              messages: D,
              tools: S,
              toolChoice: T,
              activeTools: O,
              maxOutputTokens: go.maxOutputTokens,
              temperature: go.temperature,
              topP: go.topP,
              topK: go.topK,
              presencePenalty: go.presencePenalty,
              frequencyPenalty: go.frequencyPenalty,
              stopSequences: go.stopSequences,
              seed: go.seed,
              maxRetries: Mn,
              timeout: le,
              headers: r,
              providerOptions: Z,
              stopWhen: Be,
              output: q,
              abortSignal: Te,
              include: it,
              ...Ei,
              experimental_context: Ve,
            },
            callbacks: [Pe, et.onStart],
          });
          let oo = Wi.messages,
            $o = [],
            { approvedToolApprovals: La, deniedToolApprovals: mA } = sTa({ messages: oo });
          if (mA.length > 0 || La.length > 0) {
            let iH = La.filter((jc) => !jc.toolCall.providerExecuted),
              xa = mA.filter((jc) => !jc.toolCall.providerExecuted),
              sH = mA.filter((jc) => jc.toolCall.providerExecuted),
              Ys,
              i_ = new ReadableStream({
                start(jc) {
                  Ys = jc;
                },
              });
            en.addStream(i_);
            try {
              for (let gH of [...xa, ...sH])
                Ys == null ||
                  Ys.enqueue({
                    type: "tool-output-denied",
                    toolCallId: gH.toolCall.toolCallId,
                    toolName: gH.toolCall.toolName,
                  });
              let jc = [];
              if (
                (await Promise.all(
                  iH.map(async (gH) => {
                    let Yl = await R6i({
                      toolCall: gH.toolCall,
                      tools: S,
                      tracer: xi,
                      telemetry: t,
                      messages: oo,
                      abortSignal: H,
                      experimental_context: Ve,
                      stepNumber: St.length,
                      model: gr,
                      onToolCallStart: [ot, et.onToolCallStart],
                      onToolCallFinish: [Ee, et.onToolCallFinish],
                      onPreliminaryToolResult: (NP) => {
                        Ys == null || Ys.enqueue(NP);
                      },
                    });
                    if (Yl != null) (Ys == null || Ys.enqueue(Yl), jc.push(Yl));
                  }),
                ),
                jc.length > 0 || xa.length > 0)
              ) {
                let gH = [];
                for (let Yl of jc)
                  gH.push({
                    type: "tool-result",
                    toolCallId: Yl.toolCallId,
                    toolName: Yl.toolName,
                    output: await cje({
                      toolCallId: Yl.toolCallId,
                      input: Yl.input,
                      tool: S == null ? void 0 : S[Yl.toolName],
                      output: Yl.type === "tool-result" ? Yl.output : Yl.error,
                      errorMode: Yl.type === "tool-error" ? "text" : "none",
                    }),
                  });
                for (let Yl of xa)
                  gH.push({
                    type: "tool-result",
                    toolCallId: Yl.toolCall.toolCallId,
                    toolName: Yl.toolCall.toolName,
                    output: { type: "execution-denied", reason: Yl.approvalResponse.reason },
                  });
                $o.push({ role: "tool", content: gH });
              }
            } finally {
              Ys == null || Ys.close();
            }
          }
          Et.push(...$o);
          async function Bs({ currentStep: iH, responseMessages: xa, usage: sH }) {
            var Ys, i_, jc, gH, Yl, NP, b_, vx, th;
            let PT = en.includeRawChunks,
              j_ = u != null ? setTimeout(() => f.abort(), u) : void 0,
              XD = void 0;
            function wA() {
              if (d != null) {
                if (XD != null) clearTimeout(XD);
                XD = setTimeout(() => _.abort(), d);
              }
            }
            function _A() {
              if (XD != null) (clearTimeout(XD), (XD = void 0));
            }
            function hu() {
              if (j_ != null) clearTimeout(j_);
            }
            try {
              ut = new B8();
              let bx = [...oo, ...xa],
                s_ = await (se == null
                  ? void 0
                  : se({
                      model: e,
                      steps: St,
                      stepNumber: St.length,
                      messages: bx,
                      experimental_context: Ve,
                    })),
                JD = VTt((Ys = s_ == null ? void 0 : s_.model) != null ? Ys : e),
                Sa = { provider: JD.provider, modelId: JD.modelId },
                FP = await yDr({
                  prompt: {
                    system: (i_ = s_ == null ? void 0 : s_.system) != null ? i_ : Wi.system,
                    messages: (jc = s_ == null ? void 0 : s_.messages) != null ? jc : bx,
                  },
                  supportedUrls: await JD.supportedUrls,
                  download: Fe,
                }),
                cte = (gH = s_ == null ? void 0 : s_.activeTools) != null ? gH : O,
                { toolChoice: vb, tools: bJ } = await FSa({
                  tools: S,
                  toolChoice: (Yl = s_ == null ? void 0 : s_.toolChoice) != null ? Yl : T,
                  activeTools: cte,
                });
              Ve = (NP = s_ == null ? void 0 : s_.experimental_context) != null ? NP : Ve;
              let R7 = (b_ = s_ == null ? void 0 : s_.messages) != null ? b_ : bx,
                _9 = (vx = s_ == null ? void 0 : s_.system) != null ? vx : Wi.system,
                jJ = bDr(Z, s_ == null ? void 0 : s_.providerOptions);
              await Phe({
                event: {
                  stepNumber: St.length,
                  model: Sa,
                  system: _9,
                  messages: R7,
                  tools: S,
                  toolChoice: vb,
                  activeTools: cte,
                  steps: [...St],
                  providerOptions: jJ,
                  timeout: le,
                  headers: r,
                  stopWhen: Be,
                  output: q,
                  abortSignal: Te,
                  include: it,
                  ...Ei,
                  experimental_context: Ve,
                },
                callbacks: [ye, et.onStepStart],
              });
              let {
                  result: { stream: _Ae, response: W7, request: V7 },
                  doStreamSpan: hH,
                  startTimestampMs: vg,
                } = await as(() =>
                  khe({
                    name: "ai.streamText.doStream",
                    attributes: qw({
                      telemetry: t,
                      attributes: {
                        ...whe({ operationId: "ai.streamText.doStream", telemetry: t }),
                        ...Fo,
                        "ai.model.provider": JD.provider,
                        "ai.model.id": JD.modelId,
                        "ai.prompt.messages": { input: () => vDr(FP) },
                        "ai.prompt.tools": {
                          input: () => (bJ == null ? void 0 : bJ.map((MA) => JSON.stringify(MA))),
                        },
                        "ai.prompt.toolChoice": { input: () => (vb != null ? JSON.stringify(vb) : void 0) },
                        "gen_ai.system": JD.provider,
                        "gen_ai.request.model": JD.modelId,
                        "gen_ai.request.frequency_penalty": go.frequencyPenalty,
                        "gen_ai.request.max_tokens": go.maxOutputTokens,
                        "gen_ai.request.presence_penalty": go.presencePenalty,
                        "gen_ai.request.stop_sequences": go.stopSequences,
                        "gen_ai.request.temperature": go.temperature,
                        "gen_ai.request.top_k": go.topK,
                        "gen_ai.request.top_p": go.topP,
                      },
                    }),
                    tracer: xi,
                    endWhenDone: !1,
                    fn: async (MA) => ({
                      startTimestampMs: z(),
                      doStreamSpan: MA,
                      result: await JD.doStream({
                        ...go,
                        tools: bJ,
                        toolChoice: vb,
                        responseFormat: await (q == null ? void 0 : q.responseFormat),
                        prompt: FP,
                        providerOptions: jJ,
                        abortSignal: H,
                        headers: r,
                        includeRawChunks: PT,
                      }),
                    }),
                  }),
                ),
                nke = vTa({
                  tools: S,
                  generatorStream: _Ae,
                  tracer: xi,
                  telemetry: t,
                  system: L,
                  messages: bx,
                  repairToolCall: B,
                  abortSignal: H,
                  experimental_context: Ve,
                  generateId: Ae,
                  stepNumber: St.length,
                  model: Sa,
                  onToolCallStart: [ot, et.onToolCallStart],
                  onToolCallFinish: [Ee, et.onToolCallFinish],
                }),
                ike = ((th = it == null ? void 0 : it.requestBody) != null ? th : !0)
                  ? V7 != null
                    ? V7
                    : {}
                  : { ...V7, body: void 0 },
                XE = [],
                h9 = [],
                Ja,
                CT = {},
                Ta = "other",
                rM = void 0,
                Ds = FTt(),
                EH,
                kA = !0,
                r$ = { id: Ae(), timestamp: new Date(), modelId: gr.modelId },
                wT = "";
              en.addStream(
                nke.pipeThrough(
                  new TransformStream({
                    async transform(MA, CH) {
                      var TR, q7, kI, vH, ed;
                      if ((wA(), MA.type === "stream-start")) {
                        Ja = MA.warnings;
                        return;
                      }
                      if (kA) {
                        let bg = z() - vg;
                        ((kA = !1),
                          hH.addEvent("ai.stream.firstChunk", { "ai.response.msToFirstChunk": bg }),
                          hH.setAttributes({ "ai.response.msToFirstChunk": bg }),
                          CH.enqueue({ type: "start-step", request: ike, warnings: Ja != null ? Ja : [] }));
                      }
                      let gL = MA.type;
                      switch (gL) {
                        case "tool-approval-request":
                        case "text-start":
                        case "text-end": {
                          CH.enqueue(MA);
                          break;
                        }
                        case "text-delta": {
                          if (MA.delta.length > 0)
                            (CH.enqueue({
                              type: "text-delta",
                              id: MA.id,
                              text: MA.delta,
                              providerMetadata: MA.providerMetadata,
                            }),
                              (wT += MA.delta));
                          break;
                        }
                        case "reasoning-start":
                        case "reasoning-end": {
                          CH.enqueue(MA);
                          break;
                        }
                        case "reasoning-delta": {
                          CH.enqueue({
                            type: "reasoning-delta",
                            id: MA.id,
                            text: MA.delta,
                            providerMetadata: MA.providerMetadata,
                          });
                          break;
                        }
                        case "tool-call": {
                          (CH.enqueue(MA), XE.push(MA));
                          break;
                        }
                        case "tool-result": {
                          if ((CH.enqueue(MA), !MA.preliminary)) h9.push(MA);
                          break;
                        }
                        case "tool-error": {
                          (CH.enqueue(MA), h9.push(MA));
                          break;
                        }
                        case "response-metadata": {
                          r$ = {
                            id: (TR = MA.id) != null ? TR : r$.id,
                            timestamp: (q7 = MA.timestamp) != null ? q7 : r$.timestamp,
                            modelId: (kI = MA.modelId) != null ? kI : r$.modelId,
                          };
                          break;
                        }
                        case "finish": {
                          ((Ds = MA.usage),
                            (Ta = MA.finishReason),
                            (rM = MA.rawFinishReason),
                            (EH = MA.providerMetadata));
                          let bg = z() - vg;
                          (hH.addEvent("ai.stream.finish"),
                            hH.setAttributes({
                              "ai.response.msToFinish": bg,
                              "ai.response.avgOutputTokensPerSecond":
                                (1000 * ((vH = Ds.outputTokens) != null ? vH : 0)) / bg,
                            }));
                          break;
                        }
                        case "file": {
                          CH.enqueue(MA);
                          break;
                        }
                        case "source": {
                          CH.enqueue(MA);
                          break;
                        }
                        case "tool-input-start": {
                          CT[MA.id] = MA.toolName;
                          let bg = S == null ? void 0 : S[MA.toolName];
                          if ((bg == null ? void 0 : bg.onInputStart) != null)
                            await bg.onInputStart({
                              toolCallId: MA.id,
                              messages: bx,
                              abortSignal: H,
                              experimental_context: Ve,
                            });
                          CH.enqueue({
                            ...MA,
                            dynamic:
                              (ed = MA.dynamic) != null ? ed : (bg == null ? void 0 : bg.type) === "dynamic",
                            title: bg == null ? void 0 : bg.title,
                          });
                          break;
                        }
                        case "tool-input-end": {
                          (delete CT[MA.id], CH.enqueue(MA));
                          break;
                        }
                        case "tool-input-delta": {
                          let bg = CT[MA.id],
                            EL = S == null ? void 0 : S[bg];
                          if ((EL == null ? void 0 : EL.onInputDelta) != null)
                            await EL.onInputDelta({
                              inputTextDelta: MA.delta,
                              toolCallId: MA.id,
                              messages: bx,
                              abortSignal: H,
                              experimental_context: Ve,
                            });
                          CH.enqueue(MA);
                          break;
                        }
                        case "error": {
                          (CH.enqueue(MA), (Ta = "error"));
                          break;
                        }
                        case "raw": {
                          if (PT) CH.enqueue(MA);
                          break;
                        }
                        default:
                          throw Error(`Unknown chunk type: ${gL}`);
                      }
                    },
                    async flush(MA) {
                      var CH, TR, q7, kI, vH, ed, gL;
                      let bg = XE.length > 0 ? JSON.stringify(XE) : void 0;
                      try {
                        hH.setAttributes(
                          await qw({
                            telemetry: t,
                            attributes: {
                              "ai.response.finishReason": Ta,
                              "ai.response.toolCalls": { output: () => bg },
                              "ai.response.id": r$.id,
                              "ai.response.model": r$.modelId,
                              "ai.response.timestamp": r$.timestamp.toISOString(),
                              "ai.usage.inputTokens": Ds.inputTokens,
                              "ai.usage.inputTokenDetails.noCacheTokens":
                                (CH = Ds.inputTokenDetails) == null ? void 0 : CH.noCacheTokens,
                              "ai.usage.inputTokenDetails.cacheReadTokens":
                                (TR = Ds.inputTokenDetails) == null ? void 0 : TR.cacheReadTokens,
                              "ai.usage.inputTokenDetails.cacheWriteTokens":
                                (q7 = Ds.inputTokenDetails) == null ? void 0 : q7.cacheWriteTokens,
                              "ai.usage.outputTokens": Ds.outputTokens,
                              "ai.usage.outputTokenDetails.textTokens":
                                (kI = Ds.outputTokenDetails) == null ? void 0 : kI.textTokens,
                              "ai.usage.outputTokenDetails.reasoningTokens":
                                (vH = Ds.outputTokenDetails) == null ? void 0 : vH.reasoningTokens,
                              "ai.usage.totalTokens": Ds.totalTokens,
                              "ai.usage.reasoningTokens":
                                (ed = Ds.outputTokenDetails) == null ? void 0 : ed.reasoningTokens,
                              "ai.usage.cachedInputTokens":
                                (gL = Ds.inputTokenDetails) == null ? void 0 : gL.cacheReadTokens,
                              "gen_ai.response.finish_reasons": [Ta],
                              "gen_ai.response.id": r$.id,
                              "gen_ai.response.model": r$.modelId,
                              "gen_ai.usage.input_tokens": Ds.inputTokens,
                              "gen_ai.usage.output_tokens": Ds.outputTokens,
                            },
                          }),
                        );
                      } catch (Pc) {}
                      MA.enqueue({
                        type: "finish-step",
                        finishReason: Ta,
                        rawFinishReason: rM,
                        usage: Ds,
                        providerMetadata: EH,
                        response: { ...r$, headers: W7 == null ? void 0 : W7.headers },
                      });
                      let EL = rTa(sH, Ds);
                      await ut.promise;
                      let OI = St[St.length - 1];
                      try {
                        hH.setAttributes(
                          await qw({
                            telemetry: t,
                            attributes: {
                              "ai.response.text": { output: () => OI.text },
                              "ai.response.reasoning": { output: () => OI.reasoningText },
                              "ai.response.providerMetadata": JSON.stringify(OI.providerMetadata),
                            },
                          }),
                        );
                      } catch (Pc) {
                      } finally {
                        hH.end();
                      }
                      let kT = XE.filter((Pc) => Pc.providerExecuted !== !0),
                        b$e = h9.filter((Pc) => Pc.providerExecuted !== !0);
                      for (let Pc of XE) {
                        if (Pc.providerExecuted !== !0) continue;
                        let OT = S == null ? void 0 : S[Pc.toolName];
                        if ((OT == null ? void 0 : OT.type) === "provider" && OT.supportsDeferredResults) {
                          if (
                            !h9.some(
                              (G7) =>
                                (G7.type === "tool-result" || G7.type === "tool-error") &&
                                G7.toolCallId === Pc.toolCallId,
                            )
                          )
                            wt.set(Pc.toolCallId, { toolName: Pc.toolName });
                        }
                      }
                      for (let Pc of h9)
                        if (Pc.type === "tool-result" || Pc.type === "tool-error") wt.delete(Pc.toolCallId);
                      if (
                        (hu(),
                        _A(),
                        ((kT.length > 0 && b$e.length === kT.length) || wt.size > 0) &&
                          !(await $Ta({ stopConditions: V, steps: St })))
                      ) {
                        xa.push(...(await Nki({ content: St[St.length - 1].content, tools: S })));
                        try {
                          await Bs({ currentStep: iH + 1, responseMessages: xa, usage: EL });
                        } catch (Pc) {
                          (MA.enqueue({ type: "error", error: Pc }), en.closeStream());
                        }
                      } else
                        (MA.enqueue({
                          type: "finish",
                          finishReason: Ta,
                          rawFinishReason: rM,
                          totalUsage: EL,
                        }),
                          en.closeStream());
                    },
                  }),
                ),
              );
            } finally {
              (hu(), _A());
            }
          }
          await Bs({ currentStep: 0, responseMessages: $o, usage: FTt() });
        },
      }).catch((kr) => {
        (en.addStream(
          new ReadableStream({
            start(Wi) {
              (Wi.enqueue({ type: "error", error: kr }), Wi.close());
            },
          }),
        ),
          en.closeStream());
      });
    }
    get steps() {
      return (this.consumeStream(), this._steps.promise);
    }
    get finalStep() {
      return this.steps.then((e) => e[e.length - 1]);
    }
    get content() {
      return this.finalStep.then((e) => e.content);
    }
    get warnings() {
      return this.finalStep.then((e) => e.warnings);
    }
    get providerMetadata() {
      return this.finalStep.then((e) => e.providerMetadata);
    }
    get text() {
      return this.finalStep.then((e) => e.text);
    }
    get reasoningText() {
      return this.finalStep.then((e) => e.reasoningText);
    }
    get reasoning() {
      return this.finalStep.then((e) => e.reasoning);
    }
    get sources() {
      return this.finalStep.then((e) => e.sources);
    }
    get files() {
      return this.finalStep.then((e) => e.files);
    }
    get toolCalls() {
      return this.finalStep.then((e) => e.toolCalls);
    }
    get staticToolCalls() {
      return this.finalStep.then((e) => e.staticToolCalls);
    }
    get dynamicToolCalls() {
      return this.finalStep.then((e) => e.dynamicToolCalls);
    }
    get toolResults() {
      return this.finalStep.then((e) => e.toolResults);
    }
    get staticToolResults() {
      return this.finalStep.then((e) => e.staticToolResults);
    }
    get dynamicToolResults() {
      return this.finalStep.then((e) => e.dynamicToolResults);
    }
    get usage() {
      return this.finalStep.then((e) => e.usage);
    }
    get request() {
      return this.finalStep.then((e) => e.request);
    }
    get response() {
      return this.finalStep.then((e) => e.response);
    }
    get totalUsage() {
      return (this.consumeStream(), this._totalUsage.promise);
    }
    get finishReason() {
      return (this.consumeStream(), this._finishReason.promise);
    }
    get rawFinishReason() {
      return (this.consumeStream(), this._rawFinishReason.promise);
    }
    teeStream() {
      let [e, t] = this.baseStream.tee();
      return ((this.baseStream = t), e);
    }
    get textStream() {
      return tee(
        this.teeStream().pipeThrough(
          new TransformStream({
            transform({ part: e }, t) {
              if (e.type === "text-delta") t.enqueue(e.text);
            },
          }),
        ),
      );
    }
    get fullStream() {
      return tee(
        this.teeStream().pipeThrough(
          new TransformStream({
            transform({ part: e }, t) {
              t.enqueue(e);
            },
          }),
        ),
      );
    }
    async consumeStream(e) {
      var t;
      try {
        await TTa({ stream: this.fullStream, onError: e == null ? void 0 : e.onError });
      } catch (r) {
        (t = e == null ? void 0 : e.onError) == null || t.call(e, r);
      }
    }
    get experimental_partialOutputStream() {
      return this.partialOutputStream;
    }
    get partialOutputStream() {
      return tee(
        this.teeStream().pipeThrough(
          new TransformStream({
            transform({ partialOutput: e }, t) {
              if (e != null) t.enqueue(e);
            },
          }),
        ),
      );
    }
    get elementStream() {
      var e, t, r;
      let s = (e = this.outputSpecification) == null ? void 0 : e.createElementStreamTransform();
      if (s == null)
        throw new gv({
          functionality: `element streams in ${(r = (t = this.outputSpecification) == null ? void 0 : t.name) != null ? r : "text"} mode`,
        });
      return tee(this.teeStream().pipeThrough(s));
    }
    get output() {
      return this.finalStep.then((e) => {
        var t;
        return ((t = this.outputSpecification) != null ? t : gDr()).parseCompleteOutput(
          { text: e.text },
          { response: e.response, usage: e.usage, finishReason: e.finishReason },
        );
      });
    }
    toUIMessageStream({
      originalMessages: e,
      generateMessageId: t,
      onFinish: r,
      messageMetadata: s,
      sendReasoning: a = !0,
      sendSources: H = !1,
      sendStart: u = !0,
      sendFinish: f = !0,
      onError: d = fW,
    } = {}) {
      let _ = t != null ? ITa({ originalMessages: e, responseMessageId: t }) : void 0,
        L = (D) => {
          var S;
          let T = (S = this.tools) == null ? void 0 : S[D.toolName];
          if (T == null) return D.dynamic;
          return (T == null ? void 0 : T.type) === "dynamic" ? !0 : void 0;
        },
        I = this.fullStream.pipeThrough(
          new TransformStream({
            transform: async (D, S) => {
              let T = s == null ? void 0 : s({ part: D }),
                C = D.type;
              switch (C) {
                case "text-start": {
                  S.enqueue({
                    type: "text-start",
                    id: D.id,
                    ...(D.providerMetadata != null ? { providerMetadata: D.providerMetadata } : {}),
                  });
                  break;
                }
                case "text-delta": {
                  S.enqueue({
                    type: "text-delta",
                    id: D.id,
                    delta: D.text,
                    ...(D.providerMetadata != null ? { providerMetadata: D.providerMetadata } : {}),
                  });
                  break;
                }
                case "text-end": {
                  S.enqueue({
                    type: "text-end",
                    id: D.id,
                    ...(D.providerMetadata != null ? { providerMetadata: D.providerMetadata } : {}),
                  });
                  break;
                }
                case "reasoning-start":
                case "reasoning-end": {
                  if (a)
                    S.enqueue({
                      type: C,
                      id: D.id,
                      ...(D.providerMetadata != null ? { providerMetadata: D.providerMetadata } : {}),
                    });
                  break;
                }
                case "reasoning-delta": {
                  if (a)
                    S.enqueue({
                      type: "reasoning-delta",
                      id: D.id,
                      delta: D.text,
                      ...(D.providerMetadata != null ? { providerMetadata: D.providerMetadata } : {}),
                    });
                  break;
                }
                case "file": {
                  S.enqueue({
                    type: "file",
                    mediaType: D.file.mediaType,
                    url: `data:${D.file.mediaType};base64,${D.file.base64}`,
                    ...(D.providerMetadata != null ? { providerMetadata: D.providerMetadata } : {}),
                  });
                  break;
                }
                case "source": {
                  if (H && D.sourceType === "url")
                    S.enqueue({
                      type: "source-url",
                      sourceId: D.id,
                      url: D.url,
                      title: D.title,
                      ...(D.providerMetadata != null ? { providerMetadata: D.providerMetadata } : {}),
                    });
                  if (H && D.sourceType === "document")
                    S.enqueue({
                      type: "source-document",
                      sourceId: D.id,
                      mediaType: D.mediaType,
                      title: D.title,
                      filename: D.filename,
                      ...(D.providerMetadata != null ? { providerMetadata: D.providerMetadata } : {}),
                    });
                  break;
                }
                case "tool-input-start": {
                  let O = L(D);
                  S.enqueue({
                    type: "tool-input-start",
                    toolCallId: D.id,
                    toolName: D.toolName,
                    ...(D.providerExecuted != null ? { providerExecuted: D.providerExecuted } : {}),
                    ...(D.providerMetadata != null ? { providerMetadata: D.providerMetadata } : {}),
                    ...(O != null ? { dynamic: O } : {}),
                    ...(D.title != null ? { title: D.title } : {}),
                  });
                  break;
                }
                case "tool-input-delta": {
                  S.enqueue({ type: "tool-input-delta", toolCallId: D.id, inputTextDelta: D.delta });
                  break;
                }
                case "tool-call": {
                  let O = L(D);
                  if (D.invalid)
                    S.enqueue({
                      type: "tool-input-error",
                      toolCallId: D.toolCallId,
                      toolName: D.toolName,
                      input: D.input,
                      ...(D.providerExecuted != null ? { providerExecuted: D.providerExecuted } : {}),
                      ...(D.providerMetadata != null ? { providerMetadata: D.providerMetadata } : {}),
                      ...(O != null ? { dynamic: O } : {}),
                      errorText: d(D.error),
                      ...(D.title != null ? { title: D.title } : {}),
                    });
                  else
                    S.enqueue({
                      type: "tool-input-available",
                      toolCallId: D.toolCallId,
                      toolName: D.toolName,
                      input: D.input,
                      ...(D.providerExecuted != null ? { providerExecuted: D.providerExecuted } : {}),
                      ...(D.providerMetadata != null ? { providerMetadata: D.providerMetadata } : {}),
                      ...(O != null ? { dynamic: O } : {}),
                      ...(D.title != null ? { title: D.title } : {}),
                    });
                  break;
                }
                case "tool-approval-request": {
                  S.enqueue({
                    type: "tool-approval-request",
                    approvalId: D.approvalId,
                    toolCallId: D.toolCall.toolCallId,
                  });
                  break;
                }
                case "tool-result": {
                  let O = L(D);
                  S.enqueue({
                    type: "tool-output-available",
                    toolCallId: D.toolCallId,
                    output: D.output,
                    ...(D.providerExecuted != null ? { providerExecuted: D.providerExecuted } : {}),
                    ...(D.providerMetadata != null ? { providerMetadata: D.providerMetadata } : {}),
                    ...(D.preliminary != null ? { preliminary: D.preliminary } : {}),
                    ...(O != null ? { dynamic: O } : {}),
                  });
                  break;
                }
                case "tool-error": {
                  let O = L(D);
                  S.enqueue({
                    type: "tool-output-error",
                    toolCallId: D.toolCallId,
                    errorText: D.providerExecuted
                      ? typeof D.error === "string"
                        ? D.error
                        : JSON.stringify(D.error)
                      : d(D.error),
                    ...(D.providerExecuted != null ? { providerExecuted: D.providerExecuted } : {}),
                    ...(D.providerMetadata != null ? { providerMetadata: D.providerMetadata } : {}),
                    ...(O != null ? { dynamic: O } : {}),
                  });
                  break;
                }
                case "tool-output-denied": {
                  S.enqueue({ type: "tool-output-denied", toolCallId: D.toolCallId });
                  break;
                }
                case "error": {
                  S.enqueue({ type: "error", errorText: d(D.error) });
                  break;
                }
                case "start-step": {
                  S.enqueue({ type: "start-step" });
                  break;
                }
                case "finish-step": {
                  S.enqueue({ type: "finish-step" });
                  break;
                }
                case "start": {
                  if (u)
                    S.enqueue({
                      type: "start",
                      ...(T != null ? { messageMetadata: T } : {}),
                      ...(_ != null ? { messageId: _ } : {}),
                    });
                  break;
                }
                case "finish": {
                  if (f)
                    S.enqueue({
                      type: "finish",
                      finishReason: D.finishReason,
                      ...(T != null ? { messageMetadata: T } : {}),
                    });
                  break;
                }
                case "abort": {
                  S.enqueue(D);
                  break;
                }
                case "tool-input-end":
                  break;
                case "raw":
                  break;
                default:
                  throw Error(`Unknown chunk type: ${C}`);
              }
              if (T != null && C !== "start" && C !== "finish")
                S.enqueue({ type: "message-metadata", messageMetadata: T });
            },
          }),
        );
      return tee(
        xTa({
          stream: I,
          messageId: _ != null ? _ : t == null ? void 0 : t(),
          originalMessages: e,
          onFinish: r,
          onError: d,
        }),
      );
    }
    pipeUIMessageStreamToResponse(
      e,
      {
        originalMessages: t,
        generateMessageId: r,
        onFinish: s,
        messageMetadata: a,
        sendReasoning: H,
        sendSources: u,
        sendFinish: f,
        sendStart: d,
        onError: _,
        ...L
      } = {},
    ) {
      STa({
        response: e,
        stream: this.toUIMessageStream({
          originalMessages: t,
          generateMessageId: r,
          onFinish: s,
          messageMetadata: a,
          sendReasoning: H,
          sendSources: u,
          sendFinish: f,
          sendStart: d,
          onError: _,
        }),
        ...L,
      });
    }
    pipeTextStreamToResponse(e, t) {
      G6i({ response: e, textStream: this.textStream, ...t });
    }
    toUIMessageStreamResponse({
      originalMessages: e,
      generateMessageId: t,
      onFinish: r,
      messageMetadata: s,
      sendReasoning: a,
      sendSources: H,
      sendFinish: u,
      sendStart: f,
      onError: d,
      ..._
    } = {}) {
      return ETa({
        stream: this.toUIMessageStream({
          originalMessages: e,
          generateMessageId: t,
          onFinish: r,
          messageMetadata: s,
          sendReasoning: a,
          sendSources: H,
          sendFinish: u,
          sendStart: f,
          onError: d,
        }),
        ..._,
      });
    }
    toTextStreamResponse(e) {
      return V6i({ textStream: this.textStream, ...e });
    }
  },
  y3c,
  CTa,
  wTa = (e) => ({
    type: "object",
    jsonSchema: async () => await e.jsonSchema,
    async validatePartialResult({ value: t, textDelta: r }) {
      return { success: !0, value: { partial: t, textDelta: r } };
    },
    async validateFinalResult(t) {
      return Ww({ value: t, schema: e });
    },
    createElementStream() {
      throw new gv({ functionality: "element streams in object mode" });
    },
  }),
  kTa = (e) => ({
    type: "array",
    jsonSchema: async () => {
      let { $schema: t, ...r } = await e.jsonSchema;
      return {
        $schema: "http://json-schema.org/draft-07/schema#",
        type: "object",
        properties: { elements: { type: "array", items: r } },
        required: ["elements"],
        additionalProperties: !1,
      };
    },
    async validatePartialResult({ value: t, latestObject: r, isFirstDelta: s, isFinalDelta: a }) {
      var H;
      if (!FFe(t) || !vJt(t.elements))
        return {
          success: !1,
          error: new dy({ value: t, cause: "value must be an object that contains an array of elements" }),
        };
      let u = t.elements,
        f = [];
      for (let L = 0; L < u.length; L++) {
        let I = u[L],
          D = await Ww({ value: I, schema: e });
        if (L === u.length - 1 && !a) continue;
        if (!D.success) return D;
        f.push(D.value);
      }
      let d = (H = r == null ? void 0 : r.length) != null ? H : 0,
        _ = "";
      if (s) _ += "[";
      if (d > 0) _ += ",";
      if (
        ((_ += f
          .slice(d)
          .map((L) => JSON.stringify(L))
          .join(",")),
        a)
      )
        _ += "]";
      return { success: !0, value: { partial: f, textDelta: _ } };
    },
    async validateFinalResult(t) {
      if (!FFe(t) || !vJt(t.elements))
        return {
          success: !1,
          error: new dy({ value: t, cause: "value must be an object that contains an array of elements" }),
        };
      let r = t.elements;
      for (let s of r) {
        let a = await Ww({ value: s, schema: e });
        if (!a.success) return a;
      }
      return { success: !0, value: r };
    },
    createElementStream(t) {
      let r = 0;
      return tee(
        t.pipeThrough(
          new TransformStream({
            transform(s, a) {
              switch (s.type) {
                case "object": {
                  let H = s.object;
                  for (; r < H.length; r++) a.enqueue(H[r]);
                  break;
                }
                case "text-delta":
                case "finish":
                case "error":
                  break;
                default:
                  throw Error(`Unsupported chunk type: ${s}`);
              }
            },
          }),
        ),
      );
    },
  }),
  OTa = (e) => ({
    type: "enum",
    jsonSchema: async () => ({
      $schema: "http://json-schema.org/draft-07/schema#",
      type: "object",
      properties: { result: { type: "string", enum: e } },
      required: ["result"],
      additionalProperties: !1,
    }),
    async validateFinalResult(t) {
      if (!FFe(t) || typeof t.result !== "string")
        return {
          success: !1,
          error: new dy({
            value: t,
            cause: 'value must be an object that contains a string in the "result" property.',
          }),
        };
      let r = t.result;
      return e.includes(r)
        ? { success: !0, value: r }
        : { success: !1, error: new dy({ value: t, cause: "value must be a string in the enum" }) };
    },
    async validatePartialResult({ value: t, textDelta: r }) {
      if (!FFe(t) || typeof t.result !== "string")
        return {
          success: !1,
          error: new dy({
            value: t,
            cause: 'value must be an object that contains a string in the "result" property.',
          }),
        };
      let s = t.result,
        a = e.filter((H) => H.startsWith(s));
      if (t.result.length === 0 || a.length === 0)
        return { success: !1, error: new dy({ value: t, cause: "value must be a string in the enum" }) };
      return { success: !0, value: { partial: a.length > 1 ? s : a[0], textDelta: r } };
    },
    createElementStream() {
      throw new gv({ functionality: "element streams in enum mode" });
    },
  }),
  UTa,
  NTa = class {
    constructor(e) {
      ((this.object = e.object),
        (this.finishReason = e.finishReason),
        (this.usage = e.usage),
        (this.warnings = e.warnings),
        (this.providerMetadata = e.providerMetadata),
        (this.response = e.response),
        (this.request = e.request),
        (this.reasoning = e.reasoning));
    }
    toJsonResponse(e) {
      var t;
      return new Response(JSON.stringify(this.object), {
        status: (t = e == null ? void 0 : e.status) != null ? t : 200,
        headers: V5e(e == null ? void 0 : e.headers, { "content-type": "application/json; charset=utf-8" }),
      });
    }
  },
  FTa,
  BTa = class {
    constructor({
      model: e,
      headers: t,
      telemetry: r,
      settings: s,
      maxRetries: a,
      abortSignal: H,
      outputStrategy: u,
      system: f,
      prompt: d,
      messages: _,
      schemaName: L,
      schemaDescription: I,
      providerOptions: D,
      repairText: S,
      onError: T,
      onFinish: C,
      download: O,
      generateId: B,
      currentDate: V,
      now: q,
    }) {
      ((this._object = new B8()),
        (this._usage = new B8()),
        (this._providerMetadata = new B8()),
        (this._warnings = new B8()),
        (this._request = new B8()),
        (this._response = new B8()),
        (this._finishReason = new B8()));
      let Z = VTt(e),
        { maxRetries: se, retry: ae } = jDr({ maxRetries: a, abortSignal: H }),
        z = R5e(s),
        Ae = SDr({ model: Z, telemetry: r, headers: t, settings: { ...z, maxRetries: se } }),
        le = TDr(r),
        Be = this,
        Te = z6i(),
        Lt = new TransformStream({
          transform(Ht, Se) {
            if ((Se.enqueue(Ht), Ht.type === "error")) T({ error: xDr(Ht.error) });
          },
        });
      ((this.baseStream = Te.stream.pipeThrough(Lt)),
        khe({
          name: "ai.streamObject",
          attributes: qw({
            telemetry: r,
            attributes: {
              ...whe({ operationId: "ai.streamObject", telemetry: r }),
              ...Ae,
              "ai.prompt": { input: () => JSON.stringify({ system: f, prompt: d, messages: _ }) },
              "ai.schema": { input: async () => JSON.stringify(await u.jsonSchema()) },
              "ai.schema.name": L,
              "ai.schema.description": I,
              "ai.settings.output": u.type,
            },
          }),
          tracer: le,
          endWhenDone: !1,
          fn: async (Ht) => {
            let Se = await MDr({ system: f, prompt: d, messages: _ }),
              _e = {
                responseFormat: { type: "json", schema: await u.jsonSchema(), name: L, description: I },
                ...R5e(s),
                prompt: await yDr({ prompt: Se, supportedUrls: await Z.supportedUrls, download: O }),
                providerOptions: D,
                abortSignal: H,
                headers: t,
                includeRawChunks: !1,
              },
              we = {
                transform: (Qr, Li) => {
                  switch (Qr.type) {
                    case "text-delta":
                      Li.enqueue(Qr.delta);
                      break;
                    case "response-metadata":
                    case "finish":
                    case "error":
                    case "stream-start":
                      Li.enqueue(Qr);
                      break;
                  }
                },
              },
              {
                result: { stream: Pe, response: ye, request: ot },
                doStreamSpan: Ee,
                startTimestampMs: Ve,
              } = await ae(() =>
                khe({
                  name: "ai.streamObject.doStream",
                  attributes: qw({
                    telemetry: r,
                    attributes: {
                      ...whe({ operationId: "ai.streamObject.doStream", telemetry: r }),
                      ...Ae,
                      "ai.prompt.messages": { input: () => vDr(_e.prompt) },
                      "gen_ai.system": Z.provider,
                      "gen_ai.request.model": Z.modelId,
                      "gen_ai.request.frequency_penalty": z.frequencyPenalty,
                      "gen_ai.request.max_tokens": z.maxOutputTokens,
                      "gen_ai.request.presence_penalty": z.presencePenalty,
                      "gen_ai.request.temperature": z.temperature,
                      "gen_ai.request.top_k": z.topK,
                      "gen_ai.request.top_p": z.topP,
                    },
                  }),
                  tracer: le,
                  endWhenDone: !1,
                  fn: async (Qr) => ({
                    startTimestampMs: q(),
                    doStreamSpan: Qr,
                    result: await Z.doStream(_e),
                  }),
                }),
              );
            Be._request.resolve(ot != null ? ot : {});
            let Fe,
              it = FTt(),
              At,
              et,
              ut,
              ht,
              Et = "",
              tr = "",
              Rr = { id: B(), timestamp: V(), modelId: Z.modelId },
              Vt = void 0,
              Br = void 0,
              Dt = !0,
              St = !0,
              wt = Pe.pipeThrough(new TransformStream(we)).pipeThrough(
                new TransformStream({
                  async transform(Qr, Li) {
                    var sr, Mt, Lr;
                    if (typeof Qr === "object" && Qr.type === "stream-start") {
                      Fe = Qr.warnings;
                      return;
                    }
                    if (Dt) {
                      let Tr = q() - Ve;
                      ((Dt = !1),
                        Ee.addEvent("ai.stream.firstChunk", { "ai.stream.msToFirstChunk": Tr }),
                        Ee.setAttributes({ "ai.stream.msToFirstChunk": Tr }));
                    }
                    if (typeof Qr === "string") {
                      ((Et += Qr), (tr += Qr));
                      let { value: Tr, state: Dn } = await uje(Et);
                      if (Tr !== void 0 && !RTt(Vt, Tr)) {
                        let Mn = await u.validatePartialResult({
                          value: Tr,
                          textDelta: tr,
                          latestObject: Br,
                          isFirstDelta: St,
                          isFinalDelta: Dn === "successful-parse",
                        });
                        if (Mn.success && !RTt(Br, Mn.value.partial))
                          ((Vt = Tr),
                            (Br = Mn.value.partial),
                            Li.enqueue({ type: "object", object: Br }),
                            Li.enqueue({ type: "text-delta", textDelta: Mn.value.textDelta }),
                            (tr = ""),
                            (St = !1));
                      }
                      return;
                    }
                    switch (Qr.type) {
                      case "response-metadata": {
                        Rr = {
                          id: (sr = Qr.id) != null ? sr : Rr.id,
                          timestamp: (Mt = Qr.timestamp) != null ? Mt : Rr.timestamp,
                          modelId: (Lr = Qr.modelId) != null ? Lr : Rr.modelId,
                        };
                        break;
                      }
                      case "finish": {
                        if (tr !== "") Li.enqueue({ type: "text-delta", textDelta: tr });
                        ((At = Qr.finishReason.unified),
                          (it = BTt(Qr.usage)),
                          (et = Qr.providerMetadata),
                          Li.enqueue({
                            ...Qr,
                            finishReason: Qr.finishReason.unified,
                            usage: it,
                            response: Rr,
                          }),
                          WTt({ warnings: Fe != null ? Fe : [], provider: Z.provider, model: Z.modelId }),
                          Be._usage.resolve(it),
                          Be._providerMetadata.resolve(et),
                          Be._warnings.resolve(Fe),
                          Be._response.resolve({ ...Rr, headers: ye == null ? void 0 : ye.headers }),
                          Be._finishReason.resolve(At != null ? At : "other"));
                        try {
                          ((ut = await e8i(Et, u, S, { response: Rr, usage: it, finishReason: At })),
                            Be._object.resolve(ut));
                        } catch (Tr) {
                          ((ht = Tr), Be._object.reject(Tr));
                        }
                        break;
                      }
                      default: {
                        Li.enqueue(Qr);
                        break;
                      }
                    }
                  },
                  async flush(Qr) {
                    try {
                      let Li =
                        it != null ? it : { promptTokens: NaN, completionTokens: NaN, totalTokens: NaN };
                      (Ee.setAttributes(
                        await qw({
                          telemetry: r,
                          attributes: {
                            "ai.response.finishReason": At,
                            "ai.response.object": { output: () => JSON.stringify(ut) },
                            "ai.response.id": Rr.id,
                            "ai.response.model": Rr.modelId,
                            "ai.response.timestamp": Rr.timestamp.toISOString(),
                            "ai.response.providerMetadata": JSON.stringify(et),
                            "ai.usage.inputTokens": Li.inputTokens,
                            "ai.usage.outputTokens": Li.outputTokens,
                            "ai.usage.totalTokens": Li.totalTokens,
                            "ai.usage.reasoningTokens": Li.reasoningTokens,
                            "ai.usage.cachedInputTokens": Li.cachedInputTokens,
                            "gen_ai.response.finish_reasons": [At],
                            "gen_ai.response.id": Rr.id,
                            "gen_ai.response.model": Rr.modelId,
                            "gen_ai.usage.input_tokens": Li.inputTokens,
                            "gen_ai.usage.output_tokens": Li.outputTokens,
                          },
                        }),
                      ),
                        Ee.end(),
                        Ht.setAttributes(
                          await qw({
                            telemetry: r,
                            attributes: {
                              "ai.usage.inputTokens": Li.inputTokens,
                              "ai.usage.outputTokens": Li.outputTokens,
                              "ai.usage.totalTokens": Li.totalTokens,
                              "ai.usage.reasoningTokens": Li.reasoningTokens,
                              "ai.usage.cachedInputTokens": Li.cachedInputTokens,
                              "ai.response.object": { output: () => JSON.stringify(ut) },
                              "ai.response.providerMetadata": JSON.stringify(et),
                            },
                          }),
                        ),
                        await (C == null
                          ? void 0
                          : C({
                              usage: Li,
                              object: ut,
                              error: ht,
                              response: { ...Rr, headers: ye == null ? void 0 : ye.headers },
                              warnings: Fe,
                              providerMetadata: et,
                            })));
                    } catch (Li) {
                      Qr.enqueue({ type: "error", error: Li });
                    } finally {
                      Ht.end();
                    }
                  },
                }),
              );
            Te.addStream(wt);
          },
        })
          .catch((Ht) => {
            Te.addStream(
              new ReadableStream({
                start(Se) {
                  (Se.enqueue({ type: "error", error: Ht }), Se.close());
                },
              }),
            );
          })
          .finally(() => {
            Te.close();
          }),
        (this.outputStrategy = u));
    }
    get object() {
      return this._object.promise;
    }
    get usage() {
      return this._usage.promise;
    }
    get providerMetadata() {
      return this._providerMetadata.promise;
    }
    get warnings() {
      return this._warnings.promise;
    }
    get request() {
      return this._request.promise;
    }
    get response() {
      return this._response.promise;
    }
    get finishReason() {
      return this._finishReason.promise;
    }
    get partialObjectStream() {
      return tee(
        this.baseStream.pipeThrough(
          new TransformStream({
            transform(e, t) {
              switch (e.type) {
                case "object":
                  t.enqueue(e.object);
                  break;
                case "text-delta":
                case "finish":
                case "error":
                  break;
                default:
                  throw Error(`Unsupported chunk type: ${e}`);
              }
            },
          }),
        ),
      );
    }
    get elementStream() {
      return this.outputStrategy.createElementStream(this.baseStream);
    }
    get textStream() {
      return tee(
        this.baseStream.pipeThrough(
          new TransformStream({
            transform(e, t) {
              switch (e.type) {
                case "text-delta":
                  t.enqueue(e.textDelta);
                  break;
                case "object":
                case "finish":
                case "error":
                  break;
                default:
                  throw Error(`Unsupported chunk type: ${e}`);
              }
            },
          }),
        ),
      );
    }
    get fullStream() {
      return tee(this.baseStream);
    }
    pipeTextStreamToResponse(e, t) {
      G6i({ response: e, textStream: this.textStream, ...t });
    }
    toTextStreamResponse(e) {
      return V6i({ textStream: this.textStream, ...e });
    }
  },
  j3c,
  s8i = ({ model: e, middleware: t, modelId: r, providerId: s }) =>
    [...Che(t)].reverse().reduce((a, H) => RTa({ model: a, middleware: H, modelId: r, providerId: s }), e),
  RTa = ({
    model: e,
    middleware: {
      transformParams: t,
      wrapGenerate: r,
      wrapStream: s,
      overrideProvider: a,
      overrideModelId: H,
      overrideSupportedUrls: u,
    },
    modelId: f,
    providerId: d,
  }) => {
    var _, L, I;
    async function D({ params: S, type: T }) {
      return t ? await t({ params: S, type: T, model: e }) : S;
    }
    return {
      specificationVersion: "v3",
      provider: (_ = d != null ? d : a == null ? void 0 : a({ model: e })) != null ? _ : e.provider,
      modelId: (L = f != null ? f : H == null ? void 0 : H({ model: e })) != null ? L : e.modelId,
      supportedUrls: (I = u == null ? void 0 : u({ model: e })) != null ? I : e.supportedUrls,
      async doGenerate(S) {
        let T = await D({ params: S, type: "generate" }),
          C = async () => e.doGenerate(T);
        return r ? r({ doGenerate: C, doStream: async () => e.doStream(T), params: T, model: e }) : C();
      },
      async doStream(S) {
        let T = await D({ params: S, type: "stream" }),
          C = async () => e.doGenerate(T),
          O = async () => e.doStream(T);
        return s ? s({ doGenerate: C, doStream: O, params: T, model: e }) : O();
      },
    };
  },
  WTa = "AI_NoSuchProviderError",
  VTa,
  qTa,
  GTa,
  P3c;
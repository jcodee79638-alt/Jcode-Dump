
var zMa,
  U5e,
  O5e,
  exa = class {
    constructor(e, t) {
      this.specificationVersion = "v3";
      var r, s;
      ((this.modelId = e), (this.config = t));
      let a = (r = t.errorStructure) != null ? r : U5e;
      ((this.chunkSchema = nxa(a.errorSchema)),
        (this.failedResponseHandler = ZZ(a)),
        (this.supportsStructuredOutputs = (s = t.supportsStructuredOutputs) != null ? s : !1));
    }
    get provider() {
      return this.config.provider;
    }
    get providerOptionsName() {
      return this.config.provider.split(".")[0].trim();
    }
    get supportedUrls() {
      var e, t, r;
      return (r = (t = (e = this.config).supportedUrls) == null ? void 0 : t.call(e)) != null ? r : {};
    }
    transformRequestBody(e) {
      var t, r, s;
      return (s = (r = (t = this.config).transformRequestBody) == null ? void 0 : r.call(t, e)) != null
        ? s
        : e;
    }
    async getArgs({
      prompt: e,
      maxOutputTokens: t,
      temperature: r,
      topP: s,
      topK: a,
      frequencyPenalty: H,
      presencePenalty: u,
      providerOptions: f,
      stopSequences: d,
      responseFormat: _,
      seed: L,
      toolChoice: I,
      tools: D,
    }) {
      var S, T, C, O, B;
      let V = [],
        q = await NB({ provider: "openai-compatible", providerOptions: f, schema: O5e });
      if (q != null)
        V.push({
          type: "other",
          message:
            "The 'openai-compatible' key in providerOptions is deprecated. Use 'openaiCompatible' instead.",
        });
      let Z = Object.assign(
          q != null ? q : {},
          (S = await NB({ provider: "openaiCompatible", providerOptions: f, schema: O5e })) != null ? S : {},
          (T = await NB({ provider: this.providerOptionsName, providerOptions: f, schema: O5e })) != null
            ? T
            : {},
          (C = await NB({ provider: ije(this.providerOptionsName), providerOptions: f, schema: O5e })) != null
            ? C
            : {},
        ),
        se = (O = Z == null ? void 0 : Z.strictJsonSchema) != null ? O : !0;
      if (a != null) V.push({ type: "unsupported", feature: "topK" });
      if ((_ == null ? void 0 : _.type) === "json" && _.schema != null && !this.supportsStructuredOutputs)
        V.push({
          type: "unsupported",
          feature: "responseFormat",
          details: "JSON response format schema is only supported with structuredOutputs",
        });
      let { tools: ae, toolChoice: z, toolWarnings: Ae } = ZMa({ tools: D, toolChoice: I });
      return {
        metadataKey: KMa(this.providerOptionsName, f),
        args: {
          model: this.modelId,
          user: Z.user,
          max_tokens: t,
          temperature: r,
          top_p: s,
          frequency_penalty: H,
          presence_penalty: u,
          response_format:
            (_ == null ? void 0 : _.type) === "json"
              ? this.supportsStructuredOutputs === !0 && _.schema != null
                ? {
                    type: "json_schema",
                    json_schema: {
                      schema: _.schema,
                      strict: se,
                      name: (B = _.name) != null ? B : "response",
                      description: _.description,
                    },
                  }
                : { type: "json_object" }
              : void 0,
          stop: d,
          seed: L,
          ...Object.fromEntries(
            Object.entries({
              ...(f == null ? void 0 : f[this.providerOptionsName]),
              ...(f == null ? void 0 : f[ije(this.providerOptionsName)]),
            }).filter(([Be]) => !Object.keys(O5e.shape).includes(Be)),
          ),
          reasoning_effort: Z.reasoningEffort,
          verbosity: Z.textVerbosity,
          messages: YMa(e),
          tools: ae,
          tool_choice: z,
        },
        warnings: [...V, ...Ae],
      };
    }
    async doGenerate(e) {
      var t, r, s, a, H, u, f, d;
      let { args: _, warnings: L, metadataKey: I } = await this.getArgs({ ...e }),
        D = this.transformRequestBody(_),
        S = JSON.stringify(D),
        {
          responseHeaders: T,
          value: C,
          rawValue: O,
        } = await yX({
          url: this.config.url({ path: "/chat/completions", modelId: this.modelId }),
          headers: l7(this.config.headers(), e.headers),
          body: D,
          failedResponseHandler: this.failedResponseHandler,
          successfulResponseHandler: eee(txa),
          abortSignal: e.abortSignal,
          fetch: this.config.fetch,
        }),
        B = C.choices[0],
        V = [],
        q = B.message.content;
      if (q != null && q.length > 0) V.push({ type: "text", text: q });
      let Z = (t = B.message.reasoning_content) != null ? t : B.message.reasoning;
      if (Z != null && Z.length > 0) V.push({ type: "reasoning", text: Z });
      if (B.message.tool_calls != null)
        for (let z of B.message.tool_calls) {
          let Ae =
            (s = (r = z.extra_content) == null ? void 0 : r.google) == null ? void 0 : s.thought_signature;
          V.push({
            type: "tool-call",
            toolCallId: (a = z.id) != null ? a : rje(),
            toolName: z.function.name,
            input: z.function.arguments,
            ...(Ae ? { providerMetadata: { [I]: { thoughtSignature: Ae } } } : {}),
          });
        }
      let se = {
          [I]: {},
          ...(await ((u = (H = this.config.metadataExtractor) == null ? void 0 : H.extractMetadata) == null
            ? void 0
            : u.call(H, { parsedBody: O }))),
        },
        ae = (f = C.usage) == null ? void 0 : f.completion_tokens_details;
      if ((ae == null ? void 0 : ae.accepted_prediction_tokens) != null)
        se[I].acceptedPredictionTokens = ae == null ? void 0 : ae.accepted_prediction_tokens;
      if ((ae == null ? void 0 : ae.rejected_prediction_tokens) != null)
        se[I].rejectedPredictionTokens = ae == null ? void 0 : ae.rejected_prediction_tokens;
      return {
        content: V,
        finishReason: { unified: Jwi(B.finish_reason), raw: (d = B.finish_reason) != null ? d : void 0 },
        usage: Gwi(C.usage),
        providerMetadata: se,
        request: { body: S },
        response: { ...Xwi(C), headers: T, body: O },
        warnings: L,
      };
    }
    async doStream(e) {
      var t;
      let { args: r, warnings: s, metadataKey: a } = await this.getArgs({ ...e }),
        H = this.transformRequestBody({
          ...r,
          stream: !0,
          stream_options: this.config.includeUsage ? { include_usage: !0 } : void 0,
        }),
        u = (t = this.config.metadataExtractor) == null ? void 0 : t.createStreamExtractor(),
        { responseHeaders: f, value: d } = await yX({
          url: this.config.url({ path: "/chat/completions", modelId: this.modelId }),
          headers: l7(this.config.headers(), e.headers),
          body: H,
          failedResponseHandler: this.failedResponseHandler,
          successfulResponseHandler: wTt(this.chunkSchema),
          abortSignal: e.abortSignal,
          fetch: this.config.fetch,
        }),
        _ = [],
        L = { unified: "other", raw: void 0 },
        I = void 0,
        D = !0,
        S = a,
        T = !1,
        C = !1;
      return {
        stream: d.pipeThrough(
          new TransformStream({
            start(O) {
              O.enqueue({ type: "stream-start", warnings: s });
            },
            transform(O, B) {
              var V, q, Z, se, ae, z, Ae, le, Be, Te, Lt, Ht, Se, _e, we, Pe, ye, ot;
              if (e.includeRawChunks) B.enqueue({ type: "raw", rawValue: O.rawValue });
              if (!O.success) {
                ((L = { unified: "error", raw: void 0 }), B.enqueue({ type: "error", error: O.error }));
                return;
              }
              if ((u == null || u.processChunk(O.rawValue), "error" in O.value)) {
                ((L = { unified: "error", raw: void 0 }), B.enqueue({ type: "error", error: O.value.error }));
                return;
              }
              let Ee = O.value;
              if (D) ((D = !1), B.enqueue({ type: "response-metadata", ...Xwi(Ee) }));
              if (Ee.usage != null) I = Ee.usage;
              let Ve = Ee.choices[0];
              if ((Ve == null ? void 0 : Ve.finish_reason) != null)
                L = { unified: Jwi(Ve.finish_reason), raw: (V = Ve.finish_reason) != null ? V : void 0 };
              if ((Ve == null ? void 0 : Ve.delta) == null) return;
              let Fe = Ve.delta,
                it = (q = Fe.reasoning_content) != null ? q : Fe.reasoning;
              if (it) {
                if (!T) (B.enqueue({ type: "reasoning-start", id: "reasoning-0" }), (T = !0));
                B.enqueue({ type: "reasoning-delta", id: "reasoning-0", delta: it });
              }
              if (Fe.content) {
                if (T) (B.enqueue({ type: "reasoning-end", id: "reasoning-0" }), (T = !1));
                if (!C) (B.enqueue({ type: "text-start", id: "txt-0" }), (C = !0));
                B.enqueue({ type: "text-delta", id: "txt-0", delta: Fe.content });
              }
              if (Fe.tool_calls != null) {
                if (T) (B.enqueue({ type: "reasoning-end", id: "reasoning-0" }), (T = !1));
                for (let At of Fe.tool_calls) {
                  let et = (Z = At.index) != null ? Z : _.length;
                  if (_[et] == null) {
                    if (At.id == null) throw new TAt({ data: At, message: "Expected 'id' to be a string." });
                    if (((se = At.function) == null ? void 0 : se.name) == null)
                      throw new TAt({ data: At, message: "Expected 'function.name' to be a string." });
                    (B.enqueue({ type: "tool-input-start", id: At.id, toolName: At.function.name }),
                      (_[et] = {
                        id: At.id,
                        type: "function",
                        function: {
                          name: At.function.name,
                          arguments: (ae = At.function.arguments) != null ? ae : "",
                        },
                        hasFinished: !1,
                        thoughtSignature:
                          (le =
                            (Ae = (z = At.extra_content) == null ? void 0 : z.google) == null
                              ? void 0
                              : Ae.thought_signature) != null
                            ? le
                            : void 0,
                      }));
                    let ht = _[et];
                    if (
                      ((Be = ht.function) == null ? void 0 : Be.name) != null &&
                      ((Te = ht.function) == null ? void 0 : Te.arguments) != null
                    ) {
                      if (ht.function.arguments.length > 0)
                        B.enqueue({ type: "tool-input-delta", id: ht.id, delta: ht.function.arguments });
                      if (tDr(ht.function.arguments))
                        (B.enqueue({ type: "tool-input-end", id: ht.id }),
                          B.enqueue({
                            type: "tool-call",
                            toolCallId: (Lt = ht.id) != null ? Lt : rje(),
                            toolName: ht.function.name,
                            input: ht.function.arguments,
                            ...(ht.thoughtSignature
                              ? { providerMetadata: { [S]: { thoughtSignature: ht.thoughtSignature } } }
                              : {}),
                          }),
                          (ht.hasFinished = !0));
                    }
                    continue;
                  }
                  let ut = _[et];
                  if (ut.hasFinished) continue;
                  if (((Ht = At.function) == null ? void 0 : Ht.arguments) != null)
                    ut.function.arguments +=
                      (_e = (Se = At.function) == null ? void 0 : Se.arguments) != null ? _e : "";
                  if (
                    (B.enqueue({
                      type: "tool-input-delta",
                      id: ut.id,
                      delta: (we = At.function.arguments) != null ? we : "",
                    }),
                    ((Pe = ut.function) == null ? void 0 : Pe.name) != null &&
                      ((ye = ut.function) == null ? void 0 : ye.arguments) != null &&
                      tDr(ut.function.arguments))
                  )
                    (B.enqueue({ type: "tool-input-end", id: ut.id }),
                      B.enqueue({
                        type: "tool-call",
                        toolCallId: (ot = ut.id) != null ? ot : rje(),
                        toolName: ut.function.name,
                        input: ut.function.arguments,
                        ...(ut.thoughtSignature
                          ? { providerMetadata: { [S]: { thoughtSignature: ut.thoughtSignature } } }
                          : {}),
                      }),
                      (ut.hasFinished = !0));
                }
              }
            },
            flush(O) {
              var B, V, q, Z, se;
              if (T) O.enqueue({ type: "reasoning-end", id: "reasoning-0" });
              if (C) O.enqueue({ type: "text-end", id: "txt-0" });
              for (let z of _.filter((Ae) => !Ae.hasFinished))
                (O.enqueue({ type: "tool-input-end", id: z.id }),
                  O.enqueue({
                    type: "tool-call",
                    toolCallId: (B = z.id) != null ? B : rje(),
                    toolName: z.function.name,
                    input: z.function.arguments,
                    ...(z.thoughtSignature
                      ? { providerMetadata: { [S]: { thoughtSignature: z.thoughtSignature } } }
                      : {}),
                  }));
              let ae = { [S]: {}, ...(u == null ? void 0 : u.buildMetadata()) };
              if (
                ((V = I == null ? void 0 : I.completion_tokens_details) == null
                  ? void 0
                  : V.accepted_prediction_tokens) != null
              )
                ae[S].acceptedPredictionTokens =
                  (q = I == null ? void 0 : I.completion_tokens_details) == null
                    ? void 0
                    : q.accepted_prediction_tokens;
              if (
                ((Z = I == null ? void 0 : I.completion_tokens_details) == null
                  ? void 0
                  : Z.rejected_prediction_tokens) != null
              )
                ae[S].rejectedPredictionTokens =
                  (se = I == null ? void 0 : I.completion_tokens_details) == null
                    ? void 0
                    : se.rejected_prediction_tokens;
              O.enqueue({ type: "finish", finishReason: L, usage: Gwi(I), providerMetadata: ae });
            },
          }),
        ),
        request: { body: H },
        response: { headers: f },
      };
    }
  },
  tki,
  txa,
  rxa,
  nxa = (e) => Ip([rxa, e]),
  Ywi,
  sxa = class {
    constructor(e, t) {
      this.specificationVersion = "v3";
      var r;
      ((this.modelId = e), (this.config = t));
      let s = (r = t.errorStructure) != null ? r : U5e;
      ((this.chunkSchema = axa(s.errorSchema)), (this.failedResponseHandler = ZZ(s)));
    }
    get provider() {
      return this.config.provider;
    }
    get providerOptionsName() {
      return this.config.provider.split(".")[0].trim();
    }
    get supportedUrls() {
      var e, t, r;
      return (r = (t = (e = this.config).supportedUrls) == null ? void 0 : t.call(e)) != null ? r : {};
    }
    async getArgs({
      prompt: e,
      maxOutputTokens: t,
      temperature: r,
      topP: s,
      topK: a,
      frequencyPenalty: H,
      presencePenalty: u,
      stopSequences: f,
      responseFormat: d,
      seed: _,
      providerOptions: L,
      tools: I,
      toolChoice: D,
    }) {
      var S, T;
      let C = [],
        O = Object.assign(
          (S = await NB({ provider: this.providerOptionsName, providerOptions: L, schema: Ywi })) != null
            ? S
            : {},
          (T = await NB({ provider: ije(this.providerOptionsName), providerOptions: L, schema: Ywi })) != null
            ? T
            : {},
        );
      if (a != null) C.push({ type: "unsupported", feature: "topK" });
      if (I == null ? void 0 : I.length) C.push({ type: "unsupported", feature: "tools" });
      if (D != null) C.push({ type: "unsupported", feature: "toolChoice" });
      if (d != null && d.type !== "text")
        C.push({
          type: "unsupported",
          feature: "responseFormat",
          details: "JSON response format is not supported.",
        });
      let { prompt: B, stopSequences: V } = ixa({ prompt: e }),
        q = [...(V != null ? V : []), ...(f != null ? f : [])];
      return {
        args: {
          model: this.modelId,
          echo: O.echo,
          logit_bias: O.logitBias,
          suffix: O.suffix,
          user: O.user,
          max_tokens: t,
          temperature: r,
          top_p: s,
          frequency_penalty: H,
          presence_penalty: u,
          seed: _,
          ...(L == null ? void 0 : L[this.providerOptionsName]),
          ...(L == null ? void 0 : L[ije(this.providerOptionsName)]),
          prompt: B,
          stop: q.length > 0 ? q : void 0,
        },
        warnings: C,
      };
    }
    async doGenerate(e) {
      let { args: t, warnings: r } = await this.getArgs(e),
        {
          responseHeaders: s,
          value: a,
          rawValue: H,
        } = await yX({
          url: this.config.url({ path: "/completions", modelId: this.modelId }),
          headers: l7(this.config.headers(), e.headers),
          body: t,
          failedResponseHandler: this.failedResponseHandler,
          successfulResponseHandler: eee(oxa),
          abortSignal: e.abortSignal,
          fetch: this.config.fetch,
        }),
        u = a.choices[0],
        f = [];
      if (u.text != null && u.text.length > 0) f.push({ type: "text", text: u.text });
      return {
        content: f,
        usage: Kwi(a.usage),
        finishReason: { unified: Qwi(u.finish_reason), raw: u.finish_reason },
        request: { body: t },
        response: { ...zwi(a), headers: s, body: H },
        warnings: r,
      };
    }
    async doStream(e) {
      let { args: t, warnings: r } = await this.getArgs(e),
        s = { ...t, stream: !0, stream_options: this.config.includeUsage ? { include_usage: !0 } : void 0 },
        { responseHeaders: a, value: H } = await yX({
          url: this.config.url({ path: "/completions", modelId: this.modelId }),
          headers: l7(this.config.headers(), e.headers),
          body: s,
          failedResponseHandler: this.failedResponseHandler,
          successfulResponseHandler: wTt(this.chunkSchema),
          abortSignal: e.abortSignal,
          fetch: this.config.fetch,
        }),
        u = { unified: "other", raw: void 0 },
        f = void 0,
        d = !0;
      return {
        stream: H.pipeThrough(
          new TransformStream({
            start(_) {
              _.enqueue({ type: "stream-start", warnings: r });
            },
            transform(_, L) {
              var I;
              if (e.includeRawChunks) L.enqueue({ type: "raw", rawValue: _.rawValue });
              if (!_.success) {
                ((u = { unified: "error", raw: void 0 }), L.enqueue({ type: "error", error: _.error }));
                return;
              }
              let D = _.value;
              if ("error" in D) {
                ((u = { unified: "error", raw: void 0 }), L.enqueue({ type: "error", error: D.error }));
                return;
              }
              if (d)
                ((d = !1),
                  L.enqueue({ type: "response-metadata", ...zwi(D) }),
                  L.enqueue({ type: "text-start", id: "0" }));
              if (D.usage != null) f = D.usage;
              let S = D.choices[0];
              if ((S == null ? void 0 : S.finish_reason) != null)
                u = { unified: Qwi(S.finish_reason), raw: (I = S.finish_reason) != null ? I : void 0 };
              if ((S == null ? void 0 : S.text) != null)
                L.enqueue({ type: "text-delta", id: "0", delta: S.text });
            },
            flush(_) {
              if (!d) _.enqueue({ type: "text-end", id: "0" });
              _.enqueue({ type: "finish", finishReason: u, usage: Kwi(f) });
            },
          }),
        ),
        request: { body: s },
        response: { headers: a },
      };
    }
  },
  rki,
  oxa,
  axa = (e) =>
    Ip([
      os({
        id: lr().nullish(),
        created: zu().nullish(),
        model: lr().nullish(),
        choices: Va(os({ text: lr(), finish_reason: lr().nullish(), index: zu() })),
        usage: rki.nullish(),
      }),
      e,
    ]),
  iDr,
  Hxa = class {
    constructor(e, t) {
      ((this.specificationVersion = "v3"), (this.modelId = e), (this.config = t));
    }
    get provider() {
      return this.config.provider;
    }
    get maxEmbeddingsPerCall() {
      var e;
      return (e = this.config.maxEmbeddingsPerCall) != null ? e : 2048;
    }
    get supportsParallelCalls() {
      var e;
      return (e = this.config.supportsParallelCalls) != null ? e : !0;
    }
    get providerOptionsName() {
      return this.config.provider.split(".")[0].trim();
    }
    async doEmbed({ values: e, headers: t, abortSignal: r, providerOptions: s }) {
      var a, H, u;
      let f = [],
        d = await NB({ provider: "openai-compatible", providerOptions: s, schema: iDr });
      if (d != null)
        f.push({
          type: "other",
          message:
            "The 'openai-compatible' key in providerOptions is deprecated. Use 'openaiCompatible' instead.",
        });
      let _ = Object.assign(
        d != null ? d : {},
        (a = await NB({ provider: "openaiCompatible", providerOptions: s, schema: iDr })) != null ? a : {},
        (H = await NB({ provider: this.providerOptionsName, providerOptions: s, schema: iDr })) != null
          ? H
          : {},
      );
      if (e.length > this.maxEmbeddingsPerCall)
        throw new TJt({
          provider: this.provider,
          modelId: this.modelId,
          maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
          values: e,
        });
      let {
        responseHeaders: L,
        value: I,
        rawValue: D,
      } = await yX({
        url: this.config.url({ path: "/embeddings", modelId: this.modelId }),
        headers: l7(this.config.headers(), t),
        body: {
          model: this.modelId,
          input: e,
          encoding_format: "float",
          dimensions: _.dimensions,
          user: _.user,
        },
        failedResponseHandler: ZZ((u = this.config.errorStructure) != null ? u : U5e),
        successfulResponseHandler: eee(cxa),
        abortSignal: r,
        fetch: this.config.fetch,
      });
      return {
        warnings: f,
        embeddings: I.data.map((S) => S.embedding),
        usage: I.usage ? { tokens: I.usage.prompt_tokens } : void 0,
        providerMetadata: I.providerMetadata,
        response: { headers: L, body: D },
      };
    }
  },
  cxa,
  Axa = class {
    constructor(e, t) {
      ((this.modelId = e),
        (this.config = t),
        (this.specificationVersion = "v3"),
        (this.maxImagesPerCall = 10));
    }
    get provider() {
      return this.config.provider;
    }
    get providerOptionsKey() {
      return this.config.provider.split(".")[0].trim();
    }
    getArgs(e) {
      return { ...e[this.providerOptionsKey], ...e[ije(this.providerOptionsKey)] };
    }
    async doGenerate({
      prompt: e,
      n: t,
      size: r,
      aspectRatio: s,
      seed: a,
      providerOptions: H,
      headers: u,
      abortSignal: f,
      files: d,
      mask: _,
    }) {
      var L, I, D, S, T;
      let C = [];
      if (s != null)
        C.push({
          type: "unsupported",
          feature: "aspectRatio",
          details: "This model does not support aspect ratio. Use `size` instead.",
        });
      if (a != null) C.push({ type: "unsupported", feature: "seed" });
      let O =
          (D =
            (I = (L = this.config._internal) == null ? void 0 : L.currentDate) == null
              ? void 0
              : I.call(L)) != null
            ? D
            : new Date(),
        B = this.getArgs(H);
      if (d != null && d.length > 0) {
        let { value: Z, responseHeaders: se } = await Bwi({
          url: this.config.url({ path: "/images/edits", modelId: this.modelId }),
          headers: l7(this.config.headers(), u),
          formData: xwi({
            model: this.modelId,
            prompt: e,
            image: await Promise.all(d.map((ae) => eki(ae))),
            mask: _ != null ? await eki(_) : void 0,
            n: t,
            size: r,
            ...B,
          }),
          failedResponseHandler: ZZ((S = this.config.errorStructure) != null ? S : U5e),
          successfulResponseHandler: eee(Zwi),
          abortSignal: f,
          fetch: this.config.fetch,
        });
        return {
          images: Z.data.map((ae) => ae.b64_json),
          warnings: C,
          response: { timestamp: O, modelId: this.modelId, headers: se },
        };
      }
      let { value: V, responseHeaders: q } = await yX({
        url: this.config.url({ path: "/images/generations", modelId: this.modelId }),
        headers: l7(this.config.headers(), u),
        body: { model: this.modelId, prompt: e, n: t, size: r, ...B, response_format: "b64_json" },
        failedResponseHandler: ZZ((T = this.config.errorStructure) != null ? T : U5e),
        successfulResponseHandler: eee(Zwi),
        abortSignal: f,
        fetch: this.config.fetch,
      });
      return {
        images: V.data.map((Z) => Z.b64_json),
        warnings: C,
        response: { timestamp: O, modelId: this.modelId, headers: q },
      };
    }
  },
  Zwi,
  uxa = "2.0.41";
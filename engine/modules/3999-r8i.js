
async function r8i(e) {
  let {
      model: t,
      output: r = "object",
      system: s,
      prompt: a,
      messages: H,
      maxRetries: u,
      abortSignal: f,
      headers: d,
      experimental_repairText: _,
      experimental_telemetry: L,
      experimental_download: I,
      providerOptions: D,
      _internal: { generateId: S = UTa, currentDate: T = () => new Date() } = {},
      ...C
    } = e,
    O = VTt(t),
    B = "enum" in e ? e.enum : void 0,
    { schema: V, schemaDescription: q, schemaName: Z } = "schema" in e ? e : {};
  t8i({ output: r, schema: V, schemaName: Z, schemaDescription: q, enumValues: B });
  let { maxRetries: se, retry: ae } = jDr({ maxRetries: u, abortSignal: f }),
    z = Z6i({ output: r, schema: V, enumValues: B }),
    Ae = R5e(C),
    le = gHe(d != null ? d : {}, `ai/${j6i}`),
    Be = SDr({ model: O, telemetry: L, headers: le, settings: { ...Ae, maxRetries: se } }),
    Te = TDr(L),
    Lt = await z.jsonSchema();
  try {
    return await khe({
      name: "ai.generateObject",
      attributes: qw({
        telemetry: L,
        attributes: {
          ...whe({ operationId: "ai.generateObject", telemetry: L }),
          ...Be,
          "ai.prompt": { input: () => JSON.stringify({ system: s, prompt: a, messages: H }) },
          "ai.schema": Lt != null ? { input: () => JSON.stringify(Lt) } : void 0,
          "ai.schema.name": Z,
          "ai.schema.description": q,
          "ai.settings.output": z.type,
        },
      }),
      tracer: Te,
      fn: async (Ht) => {
        var Se;
        let _e,
          we,
          Pe,
          ye,
          ot,
          Ee,
          Ve,
          Fe,
          it = await MDr({ system: s, prompt: a, messages: H }),
          At = await yDr({ prompt: it, supportedUrls: await O.supportedUrls, download: I }),
          et = await ae(() =>
            khe({
              name: "ai.generateObject.doGenerate",
              attributes: qw({
                telemetry: L,
                attributes: {
                  ...whe({ operationId: "ai.generateObject.doGenerate", telemetry: L }),
                  ...Be,
                  "ai.prompt.messages": { input: () => vDr(At) },
                  "gen_ai.system": O.provider,
                  "gen_ai.request.model": O.modelId,
                  "gen_ai.request.frequency_penalty": Ae.frequencyPenalty,
                  "gen_ai.request.max_tokens": Ae.maxOutputTokens,
                  "gen_ai.request.presence_penalty": Ae.presencePenalty,
                  "gen_ai.request.temperature": Ae.temperature,
                  "gen_ai.request.top_k": Ae.topK,
                  "gen_ai.request.top_p": Ae.topP,
                },
              }),
              tracer: Te,
              fn: async (ht) => {
                var Et, tr, Rr, Vt, Br, Dt, St, wt;
                let Qr = await O.doGenerate({
                    responseFormat: { type: "json", schema: Lt, name: Z, description: q },
                    ...R5e(C),
                    prompt: At,
                    providerOptions: D,
                    abortSignal: f,
                    headers: le,
                  }),
                  Li = {
                    id: (tr = (Et = Qr.response) == null ? void 0 : Et.id) != null ? tr : S(),
                    timestamp: (Vt = (Rr = Qr.response) == null ? void 0 : Rr.timestamp) != null ? Vt : T(),
                    modelId: (Dt = (Br = Qr.response) == null ? void 0 : Br.modelId) != null ? Dt : O.modelId,
                    headers: (St = Qr.response) == null ? void 0 : St.headers,
                    body: (wt = Qr.response) == null ? void 0 : wt.body,
                  },
                  sr = aTa(Qr.content),
                  Mt = oTa(Qr.content);
                if (sr === void 0)
                  throw new BN({
                    message: "No object generated: the model did not return a response.",
                    response: Li,
                    usage: BTt(Qr.usage),
                    finishReason: Qr.finishReason.unified,
                  });
                return (
                  ht.setAttributes(
                    await qw({
                      telemetry: L,
                      attributes: {
                        "ai.response.finishReason": Qr.finishReason.unified,
                        "ai.response.object": { output: () => sr },
                        "ai.response.id": Li.id,
                        "ai.response.model": Li.modelId,
                        "ai.response.timestamp": Li.timestamp.toISOString(),
                        "ai.response.providerMetadata": JSON.stringify(Qr.providerMetadata),
                        "ai.usage.promptTokens": Qr.usage.inputTokens.total,
                        "ai.usage.completionTokens": Qr.usage.outputTokens.total,
                        "gen_ai.response.finish_reasons": [Qr.finishReason.unified],
                        "gen_ai.response.id": Li.id,
                        "gen_ai.response.model": Li.modelId,
                        "gen_ai.usage.input_tokens": Qr.usage.inputTokens.total,
                        "gen_ai.usage.output_tokens": Qr.usage.outputTokens.total,
                      },
                    }),
                  ),
                  { ...Qr, objectText: sr, reasoning: Mt, responseData: Li }
                );
              },
            }),
          );
        ((_e = et.objectText),
          (we = et.finishReason.unified),
          (Pe = BTt(et.usage)),
          (ye = et.warnings),
          (Ve = et.providerMetadata),
          (Ee = (Se = et.request) != null ? Se : {}),
          (ot = et.responseData),
          (Fe = et.reasoning),
          WTt({ warnings: ye, provider: O.provider, model: O.modelId }));
        let ut = await e8i(_e, z, _, { response: ot, usage: Pe, finishReason: we });
        return (
          Ht.setAttributes(
            await qw({
              telemetry: L,
              attributes: {
                "ai.response.finishReason": we,
                "ai.response.object": { output: () => JSON.stringify(ut) },
                "ai.response.providerMetadata": JSON.stringify(Ve),
                "ai.usage.promptTokens": Pe.inputTokens,
                "ai.usage.completionTokens": Pe.outputTokens,
              },
            }),
          ),
          new NTa({
            object: ut,
            reasoning: Fe,
            finishReason: we,
            usage: Pe,
            warnings: ye,
            request: Ee,
            response: ot,
            providerMetadata: Ve,
          })
        );
      },
    });
  } catch (Ht) {
    throw xDr(Ht);
  }
}
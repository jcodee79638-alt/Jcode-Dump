
var Dsr = ne(() => {
  Dsr();
  Gt();
  BA();
  ((yZs = Jo(["alpha", "beta", "deprecated", "active"])),
    (aMn = Io([Jo(["reasoning", "reasoning_content", "reasoning_text"]), re])),
    (MZs = Io([
      nt({ type: ri("effort"), values: On(w6(re)) }),
      nt({ type: ri("toggle") }),
      nt({ type: ri("budget_tokens"), min: be(mo), max: be(mo) }),
    ])),
    (xZs = nt({
      id: be(re),
      name: be(re),
      family: be(re),
      release_date: be(re),
      attachment: be(Vi),
      reasoning: be(Vi),
      reasoning_options: be(
        On(MZs).annotate({ description: "Reasoning controls the model accepts, used to build its variants" }),
      ),
      temperature: be(Vi),
      tool_call: be(Vi),
      interleaved: be(Io([Vi, aMn, nt({ field: aMn })])),
      cost: be(
        nt({
          input: mo,
          output: mo,
          cache_read: be(mo),
          cache_write: be(mo),
          context_over_200k: be(nt({ input: mo, output: mo, cache_read: be(mo), cache_write: be(mo) })),
        }),
      ),
      limit: be(nt({ context: mo, input: be(mo), output: mo })),
      modalities: be(
        nt({
          input: be(J0(On(Jo(["text", "audio", "image", "video", "pdf"])))),
          output: be(J0(On(Jo(["text", "audio", "image", "video", "pdf"])))),
        }),
      ),
      experimental: be(Vi),
      status: be(yZs),
      provider: be(nt({ npm: be(re), api: be(re) })),
      options: be(ks(re, e0)),
      headers: be(ks(re, re)),
      variants: be(
        ks(
          re,
          fG(nt({ disabled: be(Vi).annotate({ description: "Disable this variant for the model" }) }), [
            ks(re, e0),
          ]),
        ).annotate({ description: "Variant-specific configuration" }),
      ),
    })),
    (SZs = nt({
      api: be(re),
      name: be(re),
      env: be(J0(On(re))),
      id: be(re),
      npm: be(re),
      whitelist: be(J0(On(re))),
      blacklist: be(J0(On(re))),
      options: be(
        fG(
          nt({
            apiKey: be(re),
            baseURL: be(re),
            enterpriseUrl: be(re).annotate({
              description: "GitHub Enterprise URL for copilot authentication",
            }),
            setCacheKey: be(Vi).annotate({
              description: "Enable promptCacheKey for this provider (default false)",
            }),
            timeout: be(
              Io([qc, ri(!1)]).annotate({
                description:
                  "Timeout in milliseconds for full requests to this provider. Set to false to disable timeout.",
              }),
            ).annotate({
              description:
                "Timeout in milliseconds for full requests to this provider. Set to false to disable timeout.",
            }),
            headerTimeout: be(
              Io([qc, ri(!1)]).annotate({
                description:
                  "Timeout in milliseconds to wait for response headers (default: 300000). Set to false to disable timeout.",
              }),
            ).annotate({
              description:
                "Timeout in milliseconds to wait for response headers (default: 300000). Set to false to disable timeout.",
            }),
            chunkTimeout: be(
              Io([qc, ri(!1)]).annotate({
                description:
                  "Timeout in milliseconds between streamed SSE chunks for this provider (default: 300000). If no chunk arrives within this window, the request is aborted. Set to false to disable timeout.",
              }),
            ).annotate({
              description:
                "Timeout in milliseconds between streamed SSE chunks for this provider (default: 300000). If no chunk arrives within this window, the request is aborted. Set to false to disable timeout.",
            }),
          }),
          [ks(re, e0)],
        ),
      ),
      models: be(ks(re, xZs)),
    }).annotate({ identifier: "ProviderConfig" })));
});
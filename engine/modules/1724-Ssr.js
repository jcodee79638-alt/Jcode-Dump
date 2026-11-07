
var Ssr = ne(() => {
  Ssr();
  ((jZs = {
    provider(e) {
      return { body: Cht(e) };
    },
    request: Cht,
  }),
    (dMn = {
      provider(e) {
        return {
          url: QG(e.baseURL),
          headers: wht({
            Authorization: LMn(e.apiKey),
            "OpenAI-Organization": QG(e.organization),
            "OpenAI-Project": QG(e.project),
            ...kWe(e.headers),
          }),
          body: wWe(e.body),
          settings: cxe(e, ["apiKey", "baseURL", "organization", "project", "headers", "body"]),
        };
      },
      request(e) {
        let t = _Mn(e);
        if (e.reasoningEffort !== void 0 || e.reasoningSummary !== void 0)
          ((t.reasoning = {
            ...(Yde(t.reasoning) ? t.reasoning : {}),
            ...(e.reasoningEffort !== void 0 ? { effort: e.reasoningEffort } : {}),
            ...(e.reasoningSummary !== void 0 ? { summary: e.reasoningSummary } : {}),
          }),
            delete t.reasoning_effort,
            delete t.reasoning_summary);
        if (e.textVerbosity !== void 0)
          ((t.text = { ...(Yde(t.text) ? t.text : {}), verbosity: e.textVerbosity }),
            delete t.text_verbosity);
        return t;
      },
    }),
    (uMn = {
      provider(e) {
        return {
          url: QG(e.baseURL),
          headers: wht({
            "x-api-key": QG(e.apiKey),
            Authorization: e.authToken ? LMn(e.authToken) : void 0,
            ...kWe(e.headers),
          }),
          body: wWe(e.body),
          settings: cxe(e, ["apiKey", "authToken", "baseURL", "headers", "body"]),
        };
      },
      request(e) {
        let t = _Mn(e);
        if (e.effort !== void 0 || e.taskBudget !== void 0)
          ((t.output_config = kZs({ effort: e.effort, task_budget: e.taskBudget })),
            delete t.effort,
            delete t.task_budget);
        if (Yde(e.metadata) && e.metadata.userId !== void 0)
          t.metadata = { ...(Yde(t.metadata) ? t.metadata : {}), user_id: e.metadata.userId };
        return t;
      },
    }),
    (lMn = {
      provider(e) {
        return {
          url: QG(e.baseURL),
          headers: wht({ "x-goog-api-key": QG(e.apiKey), ...kWe(e.headers) }),
          body: wWe(e.body),
          settings: cxe(e, ["apiKey", "baseURL", "headers", "body"]),
        };
      },
      request(e) {
        let t = wZs(e, ["thinkingConfig", "responseModalities", "mediaResolution", "imageConfig"]);
        return {
          ...cxe(e, ["thinkingConfig", "responseModalities", "mediaResolution", "imageConfig"]),
          ...(Object.keys(t).length ? { generationConfig: t } : {}),
        };
      },
    }),
    (PZs = {
      provider(e) {
        return {
          url: QG(e.baseURL),
          headers: wht({ "api-key": QG(e.apiKey), ...kWe(e.headers) }),
          body: wWe(e.body),
          settings: cxe(e, ["apiKey", "baseURL", "headers", "body"]),
        };
      },
      request: dMn.request,
    }),
    (CZs = {
      provider(e) {
        return mMn(e);
      },
      request(e) {
        return { additionalModelRequestFields: Cht(e) };
      },
    }),
    (zG = {
      provider(e) {
        return { ...mMn(e, ["baseURL"]), url: QG(e.baseURL) };
      },
      request(e) {
        let t = Cht(e);
        if (e.reasoningEffort !== void 0)
          ((t.reasoning_effort = e.reasoningEffort), delete t.reasoningEffort);
        return t;
      },
    }),
    (fMn = {
      "@ai-sdk/openai": dMn,
      "@ai-sdk/anthropic": uMn,
      "@ai-sdk/google-vertex/anthropic": uMn,
      "@ai-sdk/google": lMn,
      "@ai-sdk/google-vertex": lMn,
      "@ai-sdk/azure": PZs,
      "@ai-sdk/amazon-bedrock": CZs,
      "@ai-sdk/openai-compatible": zG,
      "@ai-sdk/cerebras": zG,
      "@ai-sdk/deepinfra": zG,
      "@ai-sdk/groq": zG,
      "@ai-sdk/mistral": zG,
      "@ai-sdk/togetherai": zG,
      "@ai-sdk/xai": zG,
      "@openrouter/ai-sdk-provider": zG,
      "ai-gateway-provider": zG,
      "venice-ai-sdk-provider": zG,
    }));
});
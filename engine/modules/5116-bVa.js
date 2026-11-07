
function bVa(e = {}) {
  let t = e.instanceUrl ?? process.env.GITLAB_INSTANCE_URL ?? "https://gitlab.com",
    r = e.name ?? "gitlab",
    s,
    a,
    H,
    u = async () => {
      if (s) return s;
      if (a) return a;
      a = N7i(
        { apiKey: e.apiKey, environmentVariableName: "GITLAB_TOKEN", description: "GitLab" },
        t,
        e.clientId,
      );
      try {
        return ((s = await a), s);
      } finally {
        a = void 0;
      }
    },
    f = async () => {
      if (H) return H;
      H = (async () => {
        ((s = void 0),
          (a = void 0),
          (s = await N7i(
            { apiKey: void 0, environmentVariableName: "GITLAB_TOKEN", description: "GitLab" },
            t,
            e.clientId,
          )));
      })();
      try {
        return await H;
      } finally {
        H = void 0;
      }
    },
    d = () => {
      let T = s || e.apiKey || process.env.GITLAB_TOKEN || "";
      if (!T)
        throw new Ca({
          message:
            "GitLab API key is missing. Pass it as the 'apiKey' parameter, set the GITLAB_TOKEN environment variable, or authenticate with 'opencode auth login gitlab'.",
        });
      return vVa(
        { Authorization: `Bearer ${T}`, "Content-Type": "application/json", ...e.headers },
        `ai-sdk-gitlab/${mbr}`,
      );
    },
    _ = async () => {
      try {
        await u();
      } catch {}
    };
  u().catch(() => {});
  let L = (T, C) => {
      let O = C7i(T);
      if (!O)
        throw new Ca({ message: `Unknown model ID: ${T}. Model must be registered in MODEL_MAPPINGS.` });
      if (C?.providerModel) {
        let se = iVa(O.provider);
        if (!se.includes(C.providerModel))
          throw new Ca({
            message: `Invalid providerModel '${C.providerModel}' for provider '${O.provider}'. Valid models: ${se.join(", ")}`,
          });
      }
      let B = { DuoAgentPlatformNext: !0, ...e.featureFlags, ...C?.featureFlags },
        q = {
          ...{ "User-Agent": `gitlab-ai-provider/${mbr}` },
          ...e.aiGatewayHeaders,
          ...C?.aiGatewayHeaders,
        },
        Z = {
          provider: `${r}.agentic`,
          instanceUrl: t,
          getHeaders: d,
          ensureApiKey: _,
          refreshApiKey: f,
          fetch: e.fetch,
          maxTokens: C?.maxTokens,
          featureFlags: B,
          aiGatewayUrl: e.aiGatewayUrl,
          aiGatewayHeaders: q,
        };
      if (O.provider === "openai")
        return new cVa(T, {
          ...Z,
          openaiModel: C?.providerModel ?? O.model,
          reasoningEffort: C?.reasoningEffort,
        });
      return new nVa(T, { ...Z, anthropicModel: C?.providerModel ?? O.model, thinking: C?.thinking });
    },
    I = (T, C) => {
      let O = C7i(T);
      if (!O || O.provider !== "workflow")
        throw new Ca({
          message: `Unknown workflow model ID: ${T}. Use 'duo-workflow' or a 'duo-workflow-*' model ID.`,
        });
      return new RPt(
        T,
        {
          provider: `${r}.workflow`,
          instanceUrl: t,
          getHeaders: d,
          refreshApiKey: f,
          fetch: e.fetch,
          featureFlags: { ...e.featureFlags, ...C?.featureFlags },
          aiGatewayUrl: e.aiGatewayUrl,
        },
        C,
      );
    },
    D = (T) => {
      if (aVa(T)) return I(T);
      return L(T);
    },
    S = Object.assign((T) => D(T), {
      specificationVersion: "v3",
      languageModel: D,
      chat: D,
      agenticChat: L,
      workflowChat: I,
    });
  return (
    (S.embeddingModel = (T) => {
      throw new Ca({ message: `GitLab provider does not support text embedding models. Model ID: ${T}` });
    }),
    (S.imageModel = (T) => {
      throw new Ca({ message: `GitLab provider does not support image models. Model ID: ${T}` });
    }),
    S
  );
}
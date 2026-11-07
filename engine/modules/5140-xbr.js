
var xbr = ne(async () => {
  Ql();
  Ohe();
  Gt();
  EHe();
  oje();
  WFe();
  await Jn([ET(), xbr()]);
  ((BVa = `jaccode/${VL}`),
    (RVa = Ge("LLMRequestPrep.prepare")(function* (e) {
      let t = e.provider.id === "openai" && e.auth?.type === "oauth",
        r = [],
        s =
          !e.small && e.model.variants && e.user.model.variant ? e.model.variants[e.user.model.variant] : {},
        a = e.small
          ? pva(e.model)
          : fva({ model: e.model, sessionID: e.sessionID, providerOptions: e.provider.options }),
        H = Mbr(Mbr(Mbr(a, e.model.options), e.agent.options), s);
      if (
        e.model.api.npm === "@ai-sdk/azure" &&
        (e.provider.options.useCompletionUrls || e.model.options.useCompletionUrls || H.useCompletionUrls)
      )
        (delete H.reasoningSummary, delete H.include);
      if (t)
        H.instructions = r.join(`
`);
      let u = e.messages,
        f = yield* e.plugin.trigger(
          "chat.params",
          {
            sessionID: e.sessionID,
            agent: e.agent.name,
            model: e.model,
            provider: e.provider,
            message: e.user,
          },
          {
            temperature: e.model.capabilities.temperature ? (e.agent.temperature ?? Ava(e.model)) : void 0,
            topP: e.agent.topP ?? uva(e.model),
            topK: lva(e.model),
            maxOutputTokens: VDr(e.model, e.flags.outputTokenMax),
            options: H,
          },
        ),
        { headers: d } = yield* e.plugin.trigger(
          "chat.headers",
          {
            sessionID: e.sessionID,
            agent: e.agent.name,
            model: e.model,
            provider: e.provider,
            message: e.user,
          },
          { headers: {} },
        ),
        _ = WVa(e);
      if (
        e.model.api.npm === "@ai-sdk/openai" ||
        e.model.api.npm === "@ai-sdk/azure" ||
        e.model.api.npm === "@ai-sdk/amazon-bedrock/mantle"
      )
        for (let D of Object.keys(_)) _[D] = { ..._[D], strict: !1 };
      if (e.model.providerID.includes("github-copilot") && Object.keys(_).length === 0 && i4i(e.messages))
        _._noop = MX({
          description:
            "Do not call this tool. It exists only for API compatibility and must never be invoked.",
          inputSchema: ub({
            type: "object",
            properties: { reason: { type: "string", description: "Unused" } },
          }),
          execute: async () => ({ output: "", title: "", metadata: {} }),
        });
      let L = e.model.providerID.startsWith("opencode") ? (yield* Jc).project.id : void 0,
        I = Ken(e.rootSessionID);
      return {
        system: r,
        messages: u,
        tools: Object.fromEntries(Object.entries(_).toSorted(([D], [S]) => D.localeCompare(S))),
        params: f,
        messageTransformOptions: H,
        headers: {
          "User-Agent": BVa,
          "X-Jac-Purpose": ["title", "summary", "compaction"].includes(e.agent.name) ? e.agent.name : "chat",
          "X-Jac-Conversation": e.rootSessionID,
          "X-Jac-Thinking": e.thinking ?? "off",
          ...(I ? { "X-Jac-Task-Support": I } : {}),
        },
      };
    })));
});
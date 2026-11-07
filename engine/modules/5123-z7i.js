
var z7i = ne(() => {
  JWi();
  OSr();
  S7i();
  OSr();
  Ca = class e extends Error {
    statusCode;
    responseBody;
    constructor(t) {
      super(t.message, { cause: t.cause });
      if (
        ((this.name = "GitLabError"),
        (this.statusCode = t.statusCode),
        (this.responseBody = t.responseBody),
        Error.captureStackTrace)
      )
        Error.captureStackTrace(this, e);
    }
    static fromResponse(t, r) {
      return new e({
        message: `GitLab API error: ${t.status} ${t.statusText}`,
        statusCode: t.status,
        responseBody: r,
      });
    }
    isAuthError() {
      return this.statusCode === 401;
    }
    isRateLimitError() {
      return this.statusCode === 429;
    }
    isForbiddenError() {
      return this.statusCode === 403;
    }
    isServerError() {
      return this.statusCode !== void 0 && this.statusCode >= 500;
    }
    isContextOverflowError() {
      if (this.statusCode !== 400) return !1;
      let t = this.message?.toLowerCase() || "";
      return (
        t.includes("context overflow") ||
        t.includes("prompt is too long") ||
        t.includes("prompt too long") ||
        (t.includes("tokens") && t.includes("maximum"))
      );
    }
  };
  BWa = ["http:", "https:"];
  ((JWa = ["shell_command"]),
    (ECe = {
      READ_WRITE_FILES: 1,
      READ_ONLY_GITLAB: 2,
      READ_WRITE_GITLAB: 3,
      RUN_COMMANDS: 4,
      USE_GIT: 5,
      RUN_MCP_TOOLS: 6,
    }),
    (zWa = [
      ECe.READ_WRITE_FILES,
      ECe.READ_ONLY_GITLAB,
      ECe.READ_WRITE_GITLAB,
      ECe.RUN_COMMANDS,
      ECe.RUN_MCP_TOOLS,
      ECe.USE_GIT,
    ]));
  ((tVa = nVi({ headers: URa(sPt()), token: sPt() })),
    (DCe = {
      "duo-chat-fable-5-1": { provider: "anthropic", model: "claude-fable-5-1" },
      "duo-chat-fable-5": { provider: "anthropic", model: "claude-fable-5" },
      "duo-chat-opus-5-5": { provider: "anthropic", model: "claude-opus-5-5" },
      "duo-chat-opus-5": { provider: "anthropic", model: "claude-opus-5" },
      "duo-chat-opus-4-8": { provider: "anthropic", model: "claude-opus-4-8" },
      "duo-chat-opus-4-7": { provider: "anthropic", model: "claude-opus-4-7" },
      "duo-chat-opus-4-6": { provider: "anthropic", model: "claude-opus-4-6" },
      "duo-chat-sonnet-5-5": { provider: "anthropic", model: "claude-sonnet-5-5" },
      "duo-chat-sonnet-5": { provider: "anthropic", model: "claude-sonnet-5" },
      "duo-chat-sonnet-4-6": { provider: "anthropic", model: "claude-sonnet-4-6" },
      "duo-chat-opus-4-5": { provider: "anthropic", model: "claude-opus-4-5-20251101" },
      "duo-chat-sonnet-4-5": { provider: "anthropic", model: "claude-sonnet-4-5-20250929" },
      "duo-chat-haiku-4-5": { provider: "anthropic", model: "claude-haiku-4-5-20251001" },
      "duo-chat-gpt-6-astra": { provider: "openai", model: "gpt-6-astra", openaiApiType: "responses" },
      "duo-chat-gpt-6-1-sol": { provider: "openai", model: "gpt-6.1-sol", openaiApiType: "responses" },
      "duo-chat-gpt-6-sol": { provider: "openai", model: "gpt-6-sol", openaiApiType: "responses" },
      "duo-chat-gpt-6-luna": { provider: "openai", model: "gpt-6-luna", openaiApiType: "responses" },
      "duo-chat-gpt-5-1": { provider: "openai", model: "gpt-5.1-2025-11-13", openaiApiType: "chat" },
      "duo-chat-gpt-5-2": { provider: "openai", model: "gpt-5.2-2025-12-11", openaiApiType: "chat" },
      "duo-chat-gpt-5-4": { provider: "openai", model: "gpt-5.4-2026-03-05", openaiApiType: "chat" },
      "duo-chat-gpt-5-5": { provider: "openai", model: "gpt-5.5-2026-04-23", openaiApiType: "chat" },
      "duo-chat-gpt-5-mini": { provider: "openai", model: "gpt-5-mini-2025-08-07", openaiApiType: "chat" },
      "duo-chat-gpt-5-4-mini": { provider: "openai", model: "gpt-5.4-mini", openaiApiType: "chat" },
      "duo-chat-gpt-5-4-nano": { provider: "openai", model: "gpt-5.4-nano", openaiApiType: "chat" },
      "duo-chat-gpt-5-6-sol": { provider: "openai", model: "gpt-5.6-sol", openaiApiType: "responses" },
      "duo-chat-gpt-5-6-terra": { provider: "openai", model: "gpt-5.6-terra", openaiApiType: "responses" },
      "duo-chat-gpt-5-6-luna": { provider: "openai", model: "gpt-5.6-luna", openaiApiType: "responses" },
      "duo-chat-gpt-5-codex": { provider: "openai", model: "gpt-5-codex", openaiApiType: "responses" },
      "duo-chat-gpt-5-2-codex": { provider: "openai", model: "gpt-5.2-codex", openaiApiType: "responses" },
      "duo-chat-gpt-5-3-codex": { provider: "openai", model: "gpt-5.3-codex", openaiApiType: "responses" },
      "duo-workflow": { provider: "workflow", model: "default" },
      "duo-workflow-default": { provider: "workflow", model: "default" },
      "duo-workflow-sonnet-4-5": { provider: "workflow", model: "claude_sonnet_4_5_20250929" },
      "duo-workflow-sonnet-5-5": { provider: "workflow", model: "claude_sonnet_5_5" },
      "duo-workflow-sonnet-5": { provider: "workflow", model: "claude_sonnet_5" },
      "duo-workflow-opus-5-5": { provider: "workflow", model: "claude_opus_5_5" },
      "duo-workflow-opus-5": { provider: "workflow", model: "claude_opus_5" },
      "duo-workflow-sonnet-4-6": { provider: "workflow", model: "claude_sonnet_4_6" },
      "duo-workflow-opus-4-5": { provider: "workflow", model: "claude_opus_4_5_20251101" },
      "duo-workflow-haiku-4-5": { provider: "workflow", model: "claude_haiku_4_5_20251001" },
      "duo-workflow-opus-4-6": { provider: "workflow", model: "claude_opus_4_6_20260205" },
    }));
  lmA = Object.fromEntries(
    Object.entries(DCe)
      .filter(([, e]) => e.provider === "anthropic")
      .map(([e, t]) => [e, t.model]),
  );
  ((RPt = class e {
    specificationVersion = "v3";
    modelId;
    supportedUrls = {};
    config;
    workflowOptions;
    tokenClient;
    projectDetector;
    modelDiscovery;
    modelCache;
    detectedProjectPath = null;
    sessionWorkflows = new Map();
    static MAX_SESSION_WORKFLOWS = 50;
    setSessionWorkflow(t, r) {
      (this.sessionWorkflows.delete(t), this.sessionWorkflows.set(t, r));
      while (this.sessionWorkflows.size > e.MAX_SESSION_WORKFLOWS) {
        let s = this.sessionWorkflows.keys().next().value;
        if (s === void 0) break;
        this.sessionWorkflows.delete(s);
      }
    }
    currentWorkflowId = null;
    currentWorkflowDefinition = null;
    persistedAgentEmitted = new Map();
    activeClients = new Set();
    _selectedModelRef;
    _selectedModelName;
    _rootNamespaceId;
    _discoveryPromise;
    get selectedModelRef() {
      return this._selectedModelRef ?? null;
    }
    set selectedModelRef(t) {
      ((this._selectedModelRef = t ?? void 0),
        (this._selectedModelName = void 0),
        this.modelCache.saveSelection(t, null));
    }
    get selectedModelName() {
      return this._selectedModelName ?? null;
    }
    set selectedModelName(t) {
      ((this._selectedModelName = t ?? void 0),
        this.modelCache.saveSelection(this._selectedModelRef ?? null, t));
    }
    _toolExecutor = null;
    onUsageUpdate = null;
    sessionPreapprovedTools = [];
    sessionID = "";
    set approvalHandler(t) {
      this.workflowOptions.approvalHandler = t ?? void 0;
    }
    get approvalHandler() {
      return this.workflowOptions.approvalHandler ?? null;
    }
    onSelectModel = null;
    set systemPrompt(t) {
      this.workflowOptions.systemPrompt = t ?? void 0;
    }
    get systemPrompt() {
      return this.workflowOptions.systemPrompt ?? null;
    }
    get toolExecutor() {
      return this._toolExecutor;
    }
    set toolExecutor(t) {
      if (t)
        try {
          this._toolExecutor = AVa.bind(t);
        } catch {
          this._toolExecutor = t;
        }
      else this._toolExecutor = null;
    }
    constructor(t, r, s = {}) {
      ((this.modelId = t), (this.config = r), (this.workflowOptions = s));
      let a = s.workingDirectory ?? process.cwd();
      this.modelCache = new $Va(a, r.instanceUrl);
      let H = this.modelCache.load();
      if (H?.selectedModelRef) this._selectedModelRef = H.selectedModelRef;
      if (H?.selectedModelName) this._selectedModelName = H.selectedModelName;
      ((this.tokenClient = new eVa({
        instanceUrl: r.instanceUrl,
        getHeaders: r.getHeaders,
        refreshApiKey: r.refreshApiKey,
        fetch: r.fetch,
        featureFlags: r.featureFlags,
      })),
        (this.projectDetector = new fVa({
          instanceUrl: r.instanceUrl,
          getHeaders: r.getHeaders,
          fetch: r.fetch,
        })),
        (this.modelDiscovery = new mVa({
          instanceUrl: r.instanceUrl,
          getHeaders: r.getHeaders,
          fetch: r.fetch,
        })));
    }
    get provider() {
      return this.config.provider;
    }
    async resolveProjectId() {
      if (this.workflowOptions.projectId) return this.workflowOptions.projectId;
      if (this.detectedProjectPath) return this.detectedProjectPath;
      let t = this.workflowOptions.workingDirectory ?? process.cwd(),
        r = await this.projectDetector.detectProject(t);
      if (r) return ((this.detectedProjectPath = r.pathWithNamespace), r.pathWithNamespace);
      return;
    }
    async resolveRootNamespaceId() {
      if (this.workflowOptions.rootNamespaceId) return this.workflowOptions.rootNamespaceId;
      if (this._rootNamespaceId !== void 0) return this._rootNamespaceId;
      let t = this.workflowOptions.workingDirectory ?? process.cwd(),
        r = await this.projectDetector.detectProject(t);
      if (r?.namespaceId) {
        let s = `gid://gitlab/Group/${r.namespaceId}`;
        return ((this._rootNamespaceId = s), s);
      }
      return ((this._rootNamespaceId = null), null);
    }
    async resolveDiscoveryScope() {
      let t = await this.resolveRootNamespaceId(),
        r = this.workflowOptions.workingDirectory ?? process.cwd(),
        s = await this.projectDetector.detectProject(r);
      if (s?.id) return { projectId: `gid://gitlab/Project/${s.id}`, ...(t ? { rootNamespaceId: t } : {}) };
      return t ? { rootNamespaceId: t } : null;
    }
    async resolveModelRef() {
      let t = HVa(this.modelId);
      if (this.modelId !== "duo-workflow") return t ?? "default";
      if (this._selectedModelRef) return this._selectedModelRef;
      if (!this._discoveryPromise)
        ((this._discoveryPromise = this.doResolveModelRef()),
          this._discoveryPromise.finally(() => {
            this._discoveryPromise = void 0;
          }));
      return this._discoveryPromise;
    }
    async doResolveModelRef() {
      let t = await this.resolveDiscoveryScope();
      if (!t) return ((this._selectedModelRef = "default"), "default");
      try {
        let r = await this.modelDiscovery.discover(t);
        if ((this.modelCache.saveDiscovery(r), r.pinnedModel))
          return (
            (this._selectedModelRef = r.pinnedModel.ref),
            (this._selectedModelName = r.pinnedModel.name),
            this.modelCache.saveSelection(r.pinnedModel.ref, r.pinnedModel.name),
            r.pinnedModel.ref
          );
        let s = this.onSelectModel ?? this.workflowOptions.onSelectModel;
        if (r.selectableModels.length > 0 && s) {
          let a = await s(r.selectableModels);
          if (a) {
            let H = r.selectableModels.find((u) => u.ref === a);
            if (H)
              return (
                (this._selectedModelRef = H.ref),
                (this._selectedModelName = H.name),
                this.modelCache.saveSelection(H.ref, H.name),
                H.ref
              );
          }
        }
        if (r.defaultModel)
          return (
            (this._selectedModelRef = r.defaultModel.ref),
            (this._selectedModelName = r.defaultModel.name),
            this.modelCache.saveSelection(r.defaultModel.ref, r.defaultModel.name),
            r.defaultModel.ref
          );
      } catch {
        let r = this.modelCache.load();
        if (r?.selectedModelRef)
          return (
            (this._selectedModelRef = r.selectedModelRef),
            (this._selectedModelName = r.selectedModelName ?? void 0),
            r.selectedModelRef
          );
      }
      return ((this._selectedModelRef = "default"), "default");
    }
    async discoverModels(t) {
      let r = await this.modelDiscovery.discover(t);
      return (this.modelCache.saveDiscovery(r), r);
    }
    getModelCache() {
      return this.modelCache;
    }
    stopWorkflow() {
      for (let t of this.activeClients) if (t.isConnected) t.stop();
    }
    resetWorkflow(t) {
      if (t) this.sessionWorkflows.delete(t);
      else
        (this.sessionWorkflows.clear(), (this.currentWorkflowId = null), this.persistedAgentEmitted.clear());
    }
    get workflowId() {
      return this.currentWorkflowId;
    }
    createUsage(t) {
      return {
        inputTokens: { total: t?.inputTotal, noCache: t?.inputTotal, cacheRead: void 0, cacheWrite: void 0 },
        outputTokens: { total: t?.outputTotal, text: t?.outputTotal, reasoning: void 0 },
      };
    }
    createFinishReason(t, r) {
      return { unified: t, raw: r };
    }
    async doGenerate(t) {
      let { stream: r } = await this.doStream(t),
        s = r.getReader(),
        a = [],
        H = [],
        u = { unified: "other", raw: void 0 },
        f = this.createUsage();
      try {
        while (!0) {
          let { done: L, value: I } = await s.read();
          if (L) break;
          switch (I.type) {
            case "text-delta":
              a.push(I.delta);
              break;
            case "tool-call":
              H.push({ type: "tool-call", toolCallId: I.toolCallId, toolName: I.toolName, input: I.input });
              break;
            case "finish":
              if (((u = I.finishReason), I.usage)) f = I.usage;
              break;
            case "error":
              try {
                await s.cancel();
              } catch {}
              throw I.error;
          }
        }
      } finally {
        s.releaseLock();
      }
      let d = [],
        _ = a.join("");
      if (_) d.push({ type: "text", text: _ });
      return (d.push(...H), { content: d, finishReason: u, usage: f, warnings: [] });
    }
    async doStream(t) {
      let r = this.extractGoalFromPrompt(t.prompt),
        s = await this.resolveModelRef(),
        a = this.extractMcpTools(t),
        H = [
          ...(this.workflowOptions.preapprovedTools ?? a.map((Be) => Be.name)),
          ...this.sessionPreapprovedTools,
        ],
        u = this.buildAdditionalContext(t.prompt),
        f = this.toolExecutor ?? null,
        d = new Set(t.tools?.map((Be) => Be.name) ?? []),
        _ = t.providerOptions?.gitlab,
        L = _?.workflowDefinition ?? this.workflowOptions.workflowDefinition,
        I = _?.flowConfig ?? void 0,
        D = _?.flowConfigSchemaVersion ?? void 0,
        S = _?.aiCatalogItemVersionId ?? void 0;
      await this.tokenClient.getToken(L ?? Oze, this.workflowOptions.rootNamespaceId);
      let T = await this.resolveProjectId(),
        C = I ?? L ?? Oze,
        O = this.sessionID,
        B = this.sessionWorkflows.get(O);
      if (B && B.workflowDefinition !== C) (this.sessionWorkflows.delete(O), (B = void 0));
      let V = O === "";
      if (V && this.currentWorkflowId && this.currentWorkflowDefinition !== C)
        ((this.currentWorkflowId = null), (this.currentWorkflowDefinition = null));
      let q;
      if (B) q = B.workflowId;
      else if (V && this.currentWorkflowId) q = this.currentWorkflowId;
      else if (
        ((q = await this.tokenClient.createWorkflow(r, {
          projectId: T,
          namespaceId: this.workflowOptions.namespaceId,
          workflowDefinition: L,
          agentPrivileges: this.workflowOptions.agentPrivileges,
          aiCatalogItemVersionId: S,
        })),
        V)
      )
        ((this.currentWorkflowId = q), (this.currentWorkflowDefinition = C));
      else
        (this.setSessionWorkflow(O, {
          workflowId: q,
          workflowDefinition: C,
          agentEmitted: new Map(),
          toolEntries: new Set(),
        }),
          (B = this.sessionWorkflows.get(O)));
      let Z = new k7i();
      this.activeClients.add(Z);
      let se = 0,
        ae = {
          streamClosed: !1,
          streamedInputChars: 0,
          streamedOutputChars: 0,
          pendingToolCount: 0,
          approvalPending: !1,
          deferredClose: null,
          activeTextBlockId: null,
          agentMessageEmitted: new Map(B?.agentEmitted ?? this.persistedAgentEmitted),
          currentAgentMessageId: "",
          activeClient: Z,
          processedRequestIDs: new Set(),
          emittedToolEntries: new Set(B?.toolEntries),
          emittedToolKeys: new Set(),
          sessionKey: O,
        };
      for (let Be of t.prompt)
        if (Be.role === "system") ae.streamedInputChars += Be.content.length;
        else if (Be.role === "user") {
          for (let Te of Be.content) if (Te.type === "text") ae.streamedInputChars += Te.text.length;
        }
      let z,
        Ae = new ReadableStream({
          start: async (Be) => {
            try {
              await Z.connect(
                {
                  instanceUrl: this.config.instanceUrl,
                  modelRef: s,
                  headers: this.config.getHeaders(),
                  projectId: this.workflowOptions.projectId,
                  namespaceId: this.workflowOptions.namespaceId,
                  rootNamespaceId: this.workflowOptions.rootNamespaceId,
                  aiCatalogItemVersionId: S,
                  workflowDefinition: L ?? this.workflowOptions.workflowDefinition,
                },
                (Ve) => {
                  this.handleWorkflowEvent(ae, Ve, Be, Z, f, () => `text-${se++}`, d, z, {
                    aiCatalogItemVersionId: S,
                    workflowDefinition: L ?? this.workflowOptions.workflowDefinition,
                  });
                },
              );
              let Te = L ?? Oze,
                Lt = this.workflowOptions.clientCapabilities ?? JWa,
                Ht = await this.buildWorkflowMetadata(),
                Se = JSON.stringify(Ht),
                we =
                  JSON.stringify({
                    workflowID: q,
                    clientVersion: pbr,
                    workflowDefinition: Te,
                    goal: r,
                    workflowMetadata: Se,
                    clientCapabilities: Lt,
                    preapproved_tools: H,
                  }).length + 100,
                Pe = this.trimPayload(a, u, we),
                ye = H.filter((Ve) => Pe.mcpTools.some((Fe) => Fe.name === Ve));
              z = {
                workflowID: q,
                clientVersion: pbr,
                workflowDefinition: Te,
                goal: r,
                workflowMetadata: Se,
                additional_context: Pe.additionalContext,
                clientCapabilities: Lt,
                mcpTools: Pe.mcpTools,
                preapproved_tools: ye,
              };
              let ot = I ?? this.workflowOptions.flowConfig,
                Ee = D ?? this.workflowOptions.flowConfigSchemaVersion;
              if (ot) z.flowConfig = ot;
              if (Ee) z.flowConfigSchemaVersion = Ee;
              else if (z.flowConfig) z.flowConfigSchemaVersion = "v1";
              (Z.sendStartRequest(z),
                Be.enqueue({ type: "stream-start", warnings: [] }),
                Be.enqueue({ type: "response-metadata", id: q, modelId: s }));
            } catch (Te) {
              if (!ae.streamClosed)
                (Be.enqueue({
                  type: "error",
                  error:
                    Te instanceof Ca
                      ? Te
                      : new Ca({ message: `Workflow connection failed: ${ICe(String(Te))}`, cause: Te }),
                }),
                  (ae.streamClosed = !0),
                  Be.close());
            }
          },
          cancel: (Be) => {
            if (le && t.abortSignal) t.abortSignal.removeEventListener("abort", le);
            if (
              (Z.stop(), Z.close(), this.activeClients.delete(Z), (ae.activeClient = null), !ae.streamClosed)
            )
              if (ae.sessionKey) this.sessionWorkflows.delete(ae.sessionKey);
              else this.currentWorkflowId = null;
          },
        }),
        le = null;
      if (t.abortSignal)
        if (
          ((le = () => {
            if (
              (Z.stop(), Z.close(), this.activeClients.delete(Z), (ae.activeClient = null), !ae.streamClosed)
            )
              if (((ae.streamClosed = !0), ae.sessionKey)) this.sessionWorkflows.delete(ae.sessionKey);
              else this.currentWorkflowId = null;
          }),
          t.abortSignal.aborted)
        )
          le();
        else t.abortSignal.addEventListener("abort", le, { once: !0 });
      return { stream: Ae, request: { body: { workflowId: q, modelRef: s, goal: r } } };
    }
    handleWorkflowEvent(t, r, s, a, H, u, f, d, _) {
      if (t.streamClosed) return;
      switch (r.type) {
        case "checkpoint": {
          this.processCheckpoint(t, r.data, s, u);
          break;
        }
        case "tool-request": {
          let { requestID: L, data: I } = r;
          if (t.processedRequestIDs.has(L)) break;
          (t.processedRequestIDs.add(L), t.emittedToolKeys.add(I.name));
          let D;
          try {
            (JSON.parse(I.args), (D = I.args));
          } catch {
            D = I.args || "{}";
          }
          if (t.activeTextBlockId)
            (s.enqueue({ type: "text-end", id: t.activeTextBlockId }), (t.activeTextBlockId = null));
          (s.enqueue({ type: "tool-input-start", id: L, toolName: I.name, providerExecuted: !0 }),
            s.enqueue({ type: "tool-input-delta", id: L, delta: D }),
            s.enqueue({ type: "tool-input-end", id: L }),
            s.enqueue({ type: "tool-call", toolCallId: L, toolName: I.name, input: D, providerExecuted: !0 }),
            this.executeToolAndRespond(t, a, s, L, I.name, D, H).catch(() => {}));
          break;
        }
        case "builtin-tool-request": {
          if (t.processedRequestIDs.has(r.requestID)) break;
          t.processedRequestIDs.add(r.requestID);
          let L = RWa(r.toolName, r.data, f);
          t.emittedToolKeys.add(L.toolName);
          let I = JSON.stringify(L.args);
          if (t.activeTextBlockId)
            (s.enqueue({ type: "text-end", id: t.activeTextBlockId }), (t.activeTextBlockId = null));
          (s.enqueue({
            type: "tool-input-start",
            id: r.requestID,
            toolName: L.toolName,
            providerExecuted: !0,
          }),
            s.enqueue({ type: "tool-input-delta", id: r.requestID, delta: I }),
            s.enqueue({ type: "tool-input-end", id: r.requestID }),
            s.enqueue({
              type: "tool-call",
              toolCallId: r.requestID,
              toolName: L.toolName,
              input: I,
              providerExecuted: !0,
            }),
            this.executeToolAndRespond(t, a, s, r.requestID, L.toolName, I, H).catch(() => {}));
          break;
        }
        case "approval-required": {
          ((t.approvalPending = !0),
            this.approveAndResume(t, r.tools, d, s, H, u, f, _).catch((L) => {
              if (((t.approvalPending = !1), t.deferredClose)) {
                let I = t.deferredClose;
                ((t.deferredClose = null), I());
              }
            }));
          break;
        }
        case "completed": {
          if (t.activeTextBlockId)
            (s.enqueue({ type: "text-end", id: t.activeTextBlockId }), (t.activeTextBlockId = null));
          let L = () => {
            if (t.streamClosed) return;
            let I = Math.ceil(t.streamedInputChars / 4),
              D = Math.ceil(t.streamedOutputChars / 4);
            (s.enqueue({
              type: "finish",
              finishReason: this.createFinishReason("stop", "completed"),
              usage: this.createUsage({ inputTotal: I, outputTotal: D }),
            }),
              (t.streamClosed = !0),
              s.close(),
              this.cleanupClient(t, !1));
          };
          if (t.pendingToolCount > 0 || t.approvalPending) t.deferredClose = L;
          else ((t.deferredClose = null), L());
          break;
        }
        case "failed": {
          if (t.activeTextBlockId)
            (s.enqueue({ type: "text-end", id: t.activeTextBlockId }), (t.activeTextBlockId = null));
          (s.enqueue({
            type: "error",
            error: new Ca({ message: `Workflow failed: ${ICe(r.error.message)}`, cause: r.error }),
          }),
            (t.streamClosed = !0),
            s.close(),
            this.cleanupClient(t, !0));
          break;
        }
        case "closed": {
          if (t.streamClosed) break;
          if (t.activeTextBlockId)
            (s.enqueue({ type: "text-end", id: t.activeTextBlockId }), (t.activeTextBlockId = null));
          let L = () => {
            if (t.streamClosed) return;
            if (r.code !== 1000)
              (s.enqueue({
                type: "error",
                error: new Ca({
                  message: `WebSocket closed unexpectedly: code=${r.code} reason=${ICe(r.reason)}`,
                  statusCode: r.code,
                }),
              }),
                (t.streamClosed = !0),
                s.close(),
                this.cleanupClient(t, !0));
            else {
              let I = Math.ceil(t.streamedInputChars / 4),
                D = Math.ceil(t.streamedOutputChars / 4);
              (s.enqueue({
                type: "finish",
                finishReason: this.createFinishReason("stop", "closed"),
                usage: this.createUsage({ inputTotal: I, outputTotal: D }),
              }),
                (t.streamClosed = !0),
                s.close(),
                this.cleanupClient(t, !1));
            }
          };
          if (t.pendingToolCount > 0 || t.approvalPending) t.deferredClose = L;
          else ((t.deferredClose = null), L());
          break;
        }
      }
    }
    processCheckpoint(t, r, s, a) {
      if (!r.checkpoint) {
        if (r.content) {
          if (!t.activeTextBlockId)
            ((t.activeTextBlockId = a()), s.enqueue({ type: "text-start", id: t.activeTextBlockId }));
          (s.enqueue({ type: "text-delta", id: t.activeTextBlockId, delta: r.content }),
            (t.streamedOutputChars += r.content.length));
        }
        return;
      }
      let H;
      try {
        H = JSON.parse(r.checkpoint);
      } catch (f) {
        return;
      }
      let u = H.channel_values?.ui_chat_log;
      if (!u || !Array.isArray(u) || u.length === 0) return;
      if (
        r.status !== "RUNNING" &&
        r.status !== "INPUT_REQUIRED" &&
        r.status !== "FINISHED" &&
        r.status !== "COMPLETED" &&
        r.status !== "TOOL_CALL_APPROVAL_REQUIRED"
      )
        return;
      for (let f = 0; f < u.length; f++) {
        let d = u[f];
        if (d.message_type === "tool" && d.tool_info) {
          let C = d.message_id || d.correlation_id || `tool-${f}`;
          if (t.emittedToolEntries.has(C)) continue;
          let O = d.tool_info.name,
            B = JSON.stringify(d.tool_info.args ?? {});
          if (t.emittedToolKeys.has(O)) {
            t.emittedToolEntries.add(C);
            let se = this.sessionWorkflows.get(t.sessionKey);
            if (se) se.toolEntries.add(C);
            continue;
          }
          if (t.activeTextBlockId)
            (s.enqueue({ type: "text-end", id: t.activeTextBlockId }), (t.activeTextBlockId = null));
          (s.enqueue({ type: "tool-input-start", id: C, toolName: O, providerExecuted: !0 }),
            s.enqueue({ type: "tool-input-delta", id: C, delta: B }),
            s.enqueue({ type: "tool-input-end", id: C }),
            s.enqueue({
              type: "tool-call",
              toolCallId: C,
              toolName: O,
              input: B,
              providerExecuted: !0,
              dynamic: !0,
            }));
          let V = d.tool_info.tool_response,
            q = typeof V === "string" ? V : V ? V.content : d.content || "";
          (s.enqueue({
            type: "tool-result",
            toolCallId: C,
            toolName: O,
            result: { output: q, title: O, metadata: {} },
            isError: !1,
          }),
            t.emittedToolEntries.add(C));
          let Z = this.sessionWorkflows.get(t.sessionKey);
          if (Z) Z.toolEntries.add(C);
          continue;
        }
        if (d.message_type !== "agent") continue;
        let _ = d.content || "",
          L = d.message_id || `idx-${f}`,
          I = t.agentMessageEmitted.get(L) ?? 0;
        if (_.length <= I) continue;
        let D = _.slice(I);
        if (L !== t.currentAgentMessageId && t.activeTextBlockId)
          (s.enqueue({ type: "text-end", id: t.activeTextBlockId }), (t.activeTextBlockId = null));
        if (!t.activeTextBlockId)
          ((t.activeTextBlockId = a()), s.enqueue({ type: "text-start", id: t.activeTextBlockId }));
        (s.enqueue({ type: "text-delta", id: t.activeTextBlockId, delta: D }),
          (t.streamedOutputChars += D.length),
          t.agentMessageEmitted.set(L, _.length),
          (this.sessionWorkflows.get(t.sessionKey)?.agentEmitted ?? this.persistedAgentEmitted).set(
            L,
            _.length,
          ),
          (t.currentAgentMessageId = L));
      }
    }
    async executeToolAndRespond(t, r, s, a, H, u, f) {
      t.pendingToolCount++;
      let d = (_) => {
        if (t.streamClosed) return;
        try {
          s.enqueue(_);
        } catch {}
      };
      try {
        if (f) {
          let _ = await f(H, u, a);
          if (_.error && /^Unknown tool:/.test(_.error)) {
            let S = WWa(H, u);
            if (S) _ = S;
          }
          (r.sendActionResponse(a, _.result, _.error),
            (t.streamedInputChars += u.length),
            (t.streamedOutputChars += _.result.length));
          let L = _.result,
            I = _.title ?? `${H} result`,
            D = _.metadata ?? { output: _.result };
          if (_.error) {
            let S;
            if (typeof _.error === "string") S = _.error;
            else if (_.error && typeof _.error === "object") S = JSON.stringify(_.error);
            else S = String(_.error);
            d({ type: "tool-result", toolCallId: a, toolName: H, result: S, isError: !0 });
          } else
            d({
              type: "tool-result",
              toolCallId: a,
              toolName: H,
              result: { output: L, title: I, metadata: D },
              isError: !1,
            });
        } else {
          let _ = `Tool executor not configured for tool: ${H}`;
          (r.sendActionResponse(a, "", _),
            d({ type: "tool-result", toolCallId: a, toolName: H, result: _, isError: !0 }));
        }
      } catch (_) {
        let L = _ instanceof Error ? _.message : String(_),
          I = ICe(L);
        (r.sendActionResponse(a, "", I),
          d({ type: "tool-result", toolCallId: a, toolName: H, result: I, isError: !0 }));
      } finally {
        if ((t.pendingToolCount--, this.onUsageUpdate))
          try {
            this.onUsageUpdate({
              inputTokens: Math.ceil(t.streamedInputChars / 4),
              outputTokens: Math.ceil(t.streamedOutputChars / 4),
            });
          } catch {}
        if (t.pendingToolCount <= 0 && t.deferredClose) {
          let _ = t.deferredClose;
          ((t.deferredClose = null), _());
        }
      }
    }
    cleanupClient(t, r = !1) {
      if (t.activeClient)
        (t.activeClient.close(), this.activeClients.delete(t.activeClient), (t.activeClient = null));
      if (r)
        if (t.sessionKey) this.sessionWorkflows.delete(t.sessionKey);
        else ((this.currentWorkflowId = null), this.persistedAgentEmitted.clear());
    }
    async approveAndResume(t, r, s, a, H, u, f, d) {
      let _ = this.workflowOptions.approvalHandler;
      if (!_ || !s) {
        if (((t.approvalPending = !1), t.deferredClose)) {
          let O = t.deferredClose;
          ((t.deferredClose = null), O());
        }
        return;
      }
      let L;
      try {
        L = await _(r);
      } catch (O) {
        if (((t.approvalPending = !1), !t.streamClosed)) a.error(O);
        return;
      }
      ((t.approvalPending = !1), (t.deferredClose = null));
      let I = L.approved
          ? { approval: { tool_name: r[0]?.name, tool_args_json: r[0]?.args } }
          : { rejection: { message: L.message ?? "User rejected" } },
        D = {
          ...s,
          approval: I,
          preapproved_tools: L.approved
            ? [...(s.preapproved_tools ?? []), ...r.map((O) => O.name)]
            : (s.preapproved_tools ?? []),
        },
        S = async () => {
          if (t.streamClosed) return;
          await this.closeClientAndWait(t);
          let O = new k7i();
          (this.activeClients.add(O), (t.activeClient = O));
          let B = await this.resolveModelRef();
          (await O.connect(
            {
              instanceUrl: this.config.instanceUrl,
              modelRef: B,
              headers: this.config.getHeaders(),
              projectId: this.workflowOptions.projectId,
              namespaceId: this.workflowOptions.namespaceId,
              rootNamespaceId: this.workflowOptions.rootNamespaceId,
              aiCatalogItemVersionId: d?.aiCatalogItemVersionId,
              workflowDefinition: d?.workflowDefinition,
            },
            (V) => {
              if (V.type === "closed" && V.code === j7i) {
                C();
                return;
              }
              this.handleWorkflowEvent(t, V, a, O, H, u, f, D, d);
            },
          ),
            O.sendStartRequest(D));
        },
        T = 0,
        C = async () => {
          if (t.streamClosed) return;
          if (++T > XWa) {
            this.failStream(
              t,
              a,
              new Ca({
                message: "Failed to acquire lock on workflow after reconnect retries",
                statusCode: j7i,
              }),
            );
            return;
          }
          (await new Promise((O) => setTimeout(O, GWa * T)),
            await S().catch((O) => this.failStream(t, a, O)));
        };
      await S().catch((O) => this.failStream(t, a, O));
    }
    async closeClientAndWait(t) {
      let r = t.activeClient;
      if (!r) return;
      (this.activeClients.delete(r), (t.activeClient = null), await r.closeAndWait());
    }
    failStream(t, r, s) {
      if ((this.cleanupClient(t, !0), t.streamClosed)) return;
      r.error(s);
    }
    async buildWorkflowMetadata() {
      let t = { extended_logging: !1, tool_approval_for_session_enabled: !0 };
      try {
        let r = this.workflowOptions.workingDirectory ?? process.cwd(),
          s = await this.getGitInfo(r);
        if (s.url) t.git_url = s.url;
        if (s.sha) t.git_sha = s.sha;
        if (s.branch) t.git_branch = s.branch;
      } catch {}
      return t;
    }
    async getGitInfo(t) {
      let { execFile: r } = await import("child_process"),
        { promisify: s } = await import("util"),
        a = s(r),
        H = { cwd: t, timeout: 3000 },
        u = async (L, I) => {
          try {
            let { stdout: D } = await a(L, I, H);
            return D.trim() || void 0;
          } catch {
            return;
          }
        },
        [f, d, _] = await Promise.all([
          u("git", ["remote", "get-url", "origin"]),
          u("git", ["rev-parse", "HEAD"]),
          u("git", ["rev-parse", "--abbrev-ref", "HEAD"]),
        ]);
      return { url: f, sha: d, branch: _ };
    }
    static SYSTEM_REMINDER_RE = /<system-reminder>([\s\S]*?)<\/system-reminder>/g;
    extractGoalFromPrompt(t) {
      for (let r = t.length - 1; r >= 0; r--) {
        let s = t[r];
        if (s.role === "user") {
          let a = s.content.filter((H) => H.type === "text").map((H) => H.text);
          if (a.length > 0) {
            let H = a.join(`
`);
            return H.replace(e.SYSTEM_REMINDER_RE, "").trim() || H;
          }
        }
      }
      return "";
    }
    extractMcpTools(t) {
      if (this.workflowOptions.mcpTools && this.workflowOptions.mcpTools.length > 0)
        return this.workflowOptions.mcpTools;
      if (!t.tools || t.tools.length === 0) return [];
      return t.tools
        .filter((r) => r.type === "function")
        .map((r) => ({
          name: r.name,
          description: r.description || "",
          inputSchema: JSON.stringify(r.inputSchema || { type: "object", properties: {} }),
        }));
    }
    static MAX_START_REQUEST_BYTES = 4194304;
    trimPayload(t, r, s) {
      let a = e.MAX_START_REQUEST_BYTES - s,
        H = JSON.stringify(r);
      if (JSON.stringify(t).length + H.length <= a) return { mcpTools: t, additionalContext: r };
      let d = t.map((S) => ({ name: S.name, description: S.description, inputSchema: gVa(S.inputSchema) }));
      if (JSON.stringify(d).length + H.length <= a) return { mcpTools: d, additionalContext: r };
      let L = d.map((S) => ({ name: S.name, description: S.description, inputSchema: IVa(S.inputSchema) }));
      if (JSON.stringify(L).length + H.length <= a) return { mcpTools: L, additionalContext: r };
      let D = [...L];
      while (D.length > 0) {
        if (JSON.stringify(D).length + H.length <= a) break;
        D.pop();
      }
      return { mcpTools: D, additionalContext: r };
    }
    buildAdditionalContext(t) {
      let r = [];
      if (this.workflowOptions.additionalContext) r.push(...this.workflowOptions.additionalContext);
      for (let s of t)
        if (s.role === "system")
          r.push({
            category: "system_prompt",
            content: s.content,
            metadata: JSON.stringify({ role: "system" }),
          });
        else if (s.role === "assistant") {
          let a = s.content.filter((H) => H.type === "text").map((H) => H.text).join(`
`);
          if (a)
            r.push({ category: "conversation", content: a, metadata: JSON.stringify({ role: "assistant" }) });
        } else if (s.role === "user") {
          for (let a of s.content)
            if (a.type === "text") {
              let u = a.text.matchAll(e.SYSTEM_REMINDER_RE);
              for (let f of u) {
                let d = f[1].trim();
                if (d)
                  r.push({
                    category: "agent_context",
                    content: d,
                    metadata: JSON.stringify({ source: "system-reminder" }),
                  });
              }
            }
        }
      return r;
    }
  }),
    (DVa = nVi({
      access_token: sPt(),
      refresh_token: sPt().optional(),
      expires_in: rVi(),
      created_at: rVi(),
    })),
    (xVa = new Map()));
  fbr = new Map();
  _mA = bVa();
  hmA = new kVa();
});
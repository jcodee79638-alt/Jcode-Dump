
var Ca,
  BWa,
  VWa = 45000,
  b7i = 60000,
  j7i = 1013,
  qWa = 3000,
  GWa = 1500,
  XWa = 8,
  Oze = "chat",
  JWa,
  pbr = "8.51.0",
  KWa = "USER_ACTION_TRIGGERED_STOP",
  ECe,
  zWa,
  QWa = "ide",
  YWa = 1500000,
  P7i = 500,
  ZWa = "__chat_shared__",
  eVa = class {
    config;
    fetchFn;
    tokenCache = new Map();
    constructor(e) {
      ((this.config = e), (this.fetchFn = e.fetch ?? fetch));
    }
    getCacheKey(e, t) {
      let r = e === "chat" ? ZWa : e;
      return t ? `${r}:${t}` : r;
    }
    async getToken(e = Oze, t, r = !1) {
      let s = Date.now(),
        a = this.getCacheKey(e, t),
        H = this.tokenCache.get(a);
      if (!r && H && H.expiresAt > s) return H.token;
      if (r) this.tokenCache.delete(a);
      let u = `${this.config.instanceUrl}/api/v4/ai/duo_workflows/direct_access`,
        f = { workflow_definition: e };
      if (t) f.root_namespace_id = t;
      if (this.config.featureFlags && Object.keys(this.config.featureFlags).length > 0)
        f.feature_flags = this.config.featureFlags;
      try {
        let d = await this.fetchFn(u, {
          method: "POST",
          headers: { ...this.config.getHeaders(), "Content-Type": "application/json" },
          body: JSON.stringify(f),
        });
        if (!d.ok) {
          let L = await d.text(),
            I = dbr(L);
          if (d.status === 401 && this.config.refreshApiKey && !r)
            try {
              return (await this.config.refreshApiKey(), await this.getToken(e, t, !0));
            } catch (D) {
              if (D instanceof Ca) throw D;
              throw new Ca({
                message: `Failed to get workflow token: ${d.status} ${d.statusText} - ${I}`,
                statusCode: d.status,
                responseBody: I,
                cause: D,
              });
            }
          if (d.status === 403)
            throw new Ca({
              message:
                "GitLab Duo Agent Platform access denied. GitLab Duo Agent Platform requires GitLab Ultimate with Duo Enterprise add-on. Ensure: (1) Your instance has GitLab Ultimate, (2) Duo Enterprise add-on is enabled, (3) Your account has access to AI features.",
              statusCode: d.status,
              responseBody: I,
            });
          throw new Ca({
            message: `Failed to get workflow token: ${d.status} ${d.statusText} - ${I}`,
            statusCode: d.status,
            responseBody: I,
          });
        }
        let _ = await d.json();
        return (this.tokenCache.set(a, { token: _, expiresAt: s + YWa }), _);
      } catch (d) {
        if (d instanceof Ca) throw d;
        throw new Ca({ message: `Failed to get workflow token: ${d}`, cause: d });
      }
    }
    async createWorkflow(e, t) {
      if (!e || typeof e !== "string")
        throw new Ca({ message: "goal is required and must be a non-empty string" });
      if (e.length > 1e4) throw new Ca({ message: "goal exceeds maximum length of 10000 characters" });
      let r = `${this.config.instanceUrl}/api/v4/ai/duo_workflows/workflows`,
        s = {
          goal: e,
          project_id: t?.projectId,
          namespace_id: t?.namespaceId,
          workflow_definition: t?.workflowDefinition ?? Oze,
          agent_privileges: t?.agentPrivileges ?? zWa,
          environment: t?.environment ?? QWa,
          allow_agent_to_request_user: t?.allowAgentToRequestUser ?? !0,
          ...(t?.aiCatalogItemVersionId !== void 0 && {
            ai_catalog_item_version_id: t.aiCatalogItemVersionId,
          }),
        };
      try {
        let a = await this.fetchFn(r, {
          method: "POST",
          headers: { ...this.config.getHeaders(), "Content-Type": "application/json" },
          body: JSON.stringify(s),
        });
        if (!a.ok) {
          let u = await a.text(),
            f = dbr(u);
          throw new Ca({
            message: `Failed to create workflow: ${a.status} ${a.statusText} - ${f}`,
            statusCode: a.status,
            responseBody: f,
          });
        }
        return (await a.json()).id.toString();
      } catch (a) {
        if (a instanceof Ca) throw a;
        throw new Ca({ message: `Failed to create workflow: ${a}`, cause: a });
      }
    }
    invalidateToken(e, t) {
      if (e) this.tokenCache.delete(this.getCacheKey(e, t));
      else this.tokenCache.clear();
    }
  },
  tVa,
  rVa = "https://cloud.gitlab.com",
  B7i = class {
    config;
    fetchFn;
    aiGatewayUrl;
    cachedToken = null;
    tokenExpiresAt = 0;
    constructor(e) {
      ((this.config = e),
        (this.fetchFn = e.fetch ?? fetch),
        (this.aiGatewayUrl = e.aiGatewayUrl || process.env.GITLAB_AI_GATEWAY_URL || rVa));
    }
    async getDirectAccessToken(e = !1) {
      let t = Date.now();
      if (!e && this.cachedToken && this.tokenExpiresAt > t) return this.cachedToken;
      if (e) this.invalidateToken();
      let r = `${this.config.instanceUrl}/api/v4/ai/third_party_agents/direct_access`,
        s = {};
      if (this.config.featureFlags && Object.keys(this.config.featureFlags).length > 0)
        s.feature_flags = this.config.featureFlags;
      if (this.config.ensureApiKey) await this.config.ensureApiKey();
      try {
        let a = await this.fetchFn(r, {
          method: "POST",
          headers: { ...this.config.getHeaders(), "Content-Type": "application/json" },
          body: JSON.stringify(s),
        });
        if (!a.ok) {
          let f = await a.text(),
            d = dbr(f);
          if (a.status === 401 && this.config.refreshApiKey && !e)
            try {
              return (await this.config.refreshApiKey(), await this.getDirectAccessToken(!0));
            } catch (_) {
              if (_ instanceof Ca) throw _;
              throw new Ca({
                message: `Failed to get direct access token: ${a.status} ${a.statusText} - ${d}`,
                statusCode: a.status,
                responseBody: d,
                cause: _,
              });
            }
          if (a.status === 403)
            throw new Ca({
              message: `Access denied to GitLab AI features (${this.config.instanceUrl}). This may indicate that: (1) GitLab Duo is not enabled on this instance, (2) Your account does not have access to AI features, or (3) The third-party agents feature is not available. Original error: ${a.status} ${a.statusText} - ${d}`,
              statusCode: a.status,
              responseBody: d,
            });
          throw new Ca({
            message: `Failed to get direct access token: ${a.status} ${a.statusText} - ${d}`,
            statusCode: a.status,
            responseBody: d,
          });
        }
        let H = await a.json(),
          u = tVa.parse(H);
        return ((this.cachedToken = u), (this.tokenExpiresAt = t + 1500000), u);
      } catch (a) {
        if (a instanceof Ca) throw a;
        throw new Ca({ message: `Failed to get direct access token: ${a}`, cause: a });
      }
    }
    getAnthropicProxyUrl() {
      return `${this.aiGatewayUrl.replace(/\/$/, "")}/ai/v1/proxy/anthropic/`;
    }
    getOpenAIProxyUrl() {
      return `${this.aiGatewayUrl.replace(/\/$/, "")}/ai/v1/proxy/openai/v1`;
    }
    invalidateToken() {
      ((this.cachedToken = null), (this.tokenExpiresAt = 0));
    }
  },
  nVa = class {
    specificationVersion = "v3";
    modelId;
    supportedUrls = {};
    config;
    directAccessClient;
    anthropicClient = null;
    constructor(e, t) {
      ((this.modelId = e),
        (this.config = t),
        (this.directAccessClient = new B7i({
          instanceUrl: t.instanceUrl,
          getHeaders: t.getHeaders,
          ensureApiKey: t.ensureApiKey,
          refreshApiKey: t.refreshApiKey,
          fetch: t.fetch,
          featureFlags: t.featureFlags,
          aiGatewayUrl: t.aiGatewayUrl,
        })));
    }
    get provider() {
      return this.config.provider;
    }
    async getAnthropicClient(e = !1) {
      let t = await this.directAccessClient.getDirectAccessToken(e),
        { "x-api-key": r, ...s } = t.headers,
        a = { ...s, ...this.config.aiGatewayHeaders };
      return (
        (this.anthropicClient = new YN({
          apiKey: null,
          authToken: t.token,
          baseURL: this.directAccessClient.getAnthropicProxyUrl(),
          defaultHeaders: a,
        })),
        this.anthropicClient
      );
    }
    isTokenError(e) {
      if (e instanceof YN.APIError) {
        if (e.status === 401) return !0;
        let t = e.message?.toLowerCase() || "";
        if (t.includes("token") && (t.includes("expired") || t.includes("revoked") || t.includes("invalid")))
          return !0;
      }
      return !1;
    }
    isContextOverflowError(e) {
      if (e instanceof YN.APIError) {
        if (e.status === 400) {
          let t = e.message?.toLowerCase() || "";
          if (
            t.includes("prompt is too long") ||
            t.includes("prompt too long") ||
            (t.includes("tokens") && t.includes("maximum"))
          )
            return !0;
        }
      }
      return !1;
    }
    convertTools(e) {
      if (!e || e.length === 0) return;
      return e
        .filter((t) => t.type === "function")
        .map((t) => {
          let r = t.inputSchema;
          return {
            name: t.name,
            description: t.description || "",
            input_schema: { type: "object", properties: r?.properties || {}, required: r?.required || [] },
          };
        });
    }
    convertToolChoice(e) {
      if (!e) return;
      switch (e.type) {
        case "auto":
          return { type: "auto" };
        case "none":
          return;
        case "required":
          return { type: "any" };
        case "tool":
          return { type: "tool", name: e.toolName };
        default:
          return;
      }
    }
    convertPrompt(e) {
      let t,
        r = [];
      for (let H of e) {
        if (H.role === "system") {
          t = t
            ? `${t}
${H.content}`
            : H.content;
          continue;
        }
        if (H.role === "user") {
          let u = [];
          for (let f of H.content)
            if (f.type === "text") u.push({ type: "text", text: f.text });
            else if (f.type === "file");
          if (u.length > 0) r.push({ role: "user", content: u });
        } else if (H.role === "assistant") {
          let u = [];
          for (let f of H.content)
            if (f.type === "reasoning") {
              let d = this.convertReasoningPart(f);
              if (d) u.push(d);
            } else if (f.type === "text") u.push({ type: "text", text: f.text });
            else if (f.type === "tool-call") {
              let d = f.input;
              if (typeof f.input === "string")
                try {
                  d = JSON.parse(f.input);
                } catch {
                  d = {};
                }
              u.push({ type: "tool_use", id: f.toolCallId, name: f.toolName, input: d });
            }
          if (u.length > 0) r.push({ role: "assistant", content: u });
        } else if (H.role === "tool") {
          let u = [];
          for (let f of H.content)
            if (f.type === "tool-result") {
              let d;
              if (f.output.type === "text") d = f.output.value;
              else if (f.output.type === "json") d = JSON.stringify(f.output.value);
              else if (f.output.type === "content") d = JSON.stringify(f.output.value);
              else if (f.output.type === "error-text") d = f.output.value;
              else if (f.output.type === "error-json") d = JSON.stringify(f.output.value);
              else if (f.output.type === "execution-denied") d = f.output.reason ?? "Tool execution denied.";
              else d = JSON.stringify(f.output);
              u.push({
                type: "tool_result",
                tool_use_id: f.toolCallId,
                content: d,
                is_error: f.output.type.startsWith("error"),
              });
            }
          if (u.length > 0) r.push({ role: "user", content: u });
        }
      }
      let s = t ? [{ type: "text", text: t, cache_control: { type: "ephemeral" } }] : void 0,
        a = Math.min(2, r.length);
      for (let H = r.length - a; H < r.length; H++) {
        let u = r[H];
        if (Array.isArray(u.content) && u.content.length > 0) {
          let f = u.content[u.content.length - 1];
          f.cache_control = { type: "ephemeral" };
        }
      }
      return { system: s, messages: r };
    }
    convertFinishReason(e) {
      return {
        unified: (() => {
          switch (e) {
            case "end_turn":
              return "stop";
            case "stop_sequence":
              return "stop";
            case "max_tokens":
              return "length";
            case "tool_use":
              return "tool-calls";
            default:
              return "other";
          }
        })(),
        raw: e ?? void 0,
      };
    }
    createUsage(e) {
      let t = e?.inputTotal,
        r = e?.outputTotal,
        s = e?.cacheRead,
        a = e?.cacheWrite;
      return {
        inputTokens: {
          total: t != null ? t + (s ?? 0) + (a ?? 0) : void 0,
          noCache: t,
          cacheRead: s,
          cacheWrite: a,
        },
        outputTokens: {
          total: r,
          text: r != null ? r - (e?.outputReasoning ?? 0) : void 0,
          reasoning: e?.outputReasoning,
        },
        raw: e?.raw,
      };
    }
    buildThinkingParams(e) {
      if (!e) return {};
      if (e.type === "adaptive")
        return { thinking: { type: "adaptive", display: "summarized" }, output_config: { effort: e.effort } };
      if (e.type === "enabled") return { thinking: { type: "enabled", budget_tokens: e.budgetTokens } };
      return { thinking: { type: "disabled" } };
    }
    resolveThinkingConfig(e) {
      return e.providerOptions?.gitlab?.thinking ?? this.config.thinking;
    }
    validateThinkingConfig(e, t) {
      if (e?.type === "enabled" && e.budgetTokens >= t)
        throw new Ca({
          message: `Anthropic thinking budgetTokens (${e.budgetTokens}) must be less than maxTokens (${t}).`,
          statusCode: 400,
        });
    }
    convertReasoningPart(e) {
      let t = e.providerOptions?.gitlab,
        r = t?.redactedData;
      if (typeof r === "string") return { type: "redacted_thinking", data: r };
      let s = t?.signature;
      if (typeof s !== "string") return;
      return { type: "thinking", thinking: e.text, signature: s };
    }
    isThinkingActive(e) {
      return e?.type === "enabled" || e?.type === "adaptive";
    }
    buildSamplingParams(e, t) {
      let r = {},
        s = this.isThinkingActive(t);
      if (e.temperature != null && !s) r.temperature = e.temperature;
      if (e.topP != null) {
        if (!s || (e.topP >= 0.95 && e.topP <= 1)) r.top_p = e.topP;
      }
      return r;
    }
    async doGenerate(e) {
      return this.doGenerateWithRetry(e, !1);
    }
    async doGenerateWithRetry(e, t) {
      let { system: r, messages: s } = this.convertPrompt(e.prompt),
        a = e.toolChoice?.type === "none",
        H = a ? void 0 : this.convertTools(e.tools),
        u = a ? void 0 : this.convertToolChoice(e.toolChoice),
        f = this.config.anthropicModel || "claude-sonnet-4-5-20250929",
        d = e.maxOutputTokens || this.config.maxTokens || 8192,
        _ = this.resolveThinkingConfig(e);
      this.validateThinkingConfig(_, d);
      let L = await this.getAnthropicClient(t),
        I = {
          model: f,
          max_tokens: d,
          system: r,
          messages: s,
          tools: H,
          tool_choice: H ? u : void 0,
          ...this.buildSamplingParams(e, _),
          stop_sequences: e.stopSequences,
          ...this.buildThinkingParams(_),
        };
      try {
        let D = e.abortSignal
            ? await L.messages.create(I, { signal: e.abortSignal })
            : await L.messages.create(I),
          S = [];
        for (let O of D.content)
          if (O.type === "thinking")
            S.push({
              type: "reasoning",
              text: O.thinking,
              providerMetadata: { gitlab: { signature: O.signature } },
            });
          else if (O.type === "redacted_thinking")
            S.push({ type: "reasoning", text: "", providerMetadata: { gitlab: { redactedData: O.data } } });
          else if (O.type === "text") S.push({ type: "text", text: O.text });
          else if (O.type === "tool_use")
            S.push({ type: "tool-call", toolCallId: O.id, toolName: O.name, input: JSON.stringify(O.input) });
        let T = D.usage,
          C = this.createUsage({
            inputTotal: D.usage.input_tokens,
            outputTotal: D.usage.output_tokens,
            cacheRead: T.cache_read_input_tokens,
            cacheWrite: T.cache_creation_input_tokens,
          });
        return { content: S, finishReason: this.convertFinishReason(D.stop_reason), usage: C, warnings: [] };
      } catch (D) {
        if (this.isContextOverflowError(D))
          throw new Ca({
            message: `Context overflow: ${D.message}. Please start a new session or use /compact to reduce context.`,
            statusCode: 400,
            cause: D,
          });
        if (!t && this.isTokenError(D))
          return (this.directAccessClient.invalidateToken(), this.doGenerateWithRetry(e, !0));
        if (D instanceof YN.APIError)
          throw new Ca({ message: `Anthropic API error: ${D.message}`, statusCode: D.status, cause: D });
        throw D;
      }
    }
    async doStream(e) {
      return this.doStreamWithRetry(e, !1);
    }
    async doStreamWithRetry(e, t) {
      let { system: r, messages: s } = this.convertPrompt(e.prompt),
        a = e.toolChoice?.type === "none",
        H = a ? void 0 : this.convertTools(e.tools),
        u = a ? void 0 : this.convertToolChoice(e.toolChoice),
        f = this.config.anthropicModel || "claude-sonnet-4-5-20250929",
        d = e.maxOutputTokens || this.config.maxTokens || 8192,
        _ = this.resolveThinkingConfig(e);
      this.validateThinkingConfig(_, d);
      let L = await this.getAnthropicClient(t),
        I = {
          model: f,
          max_tokens: d,
          system: r,
          messages: s,
          tools: H,
          tool_choice: H ? u : void 0,
          ...this.buildSamplingParams(e, _),
          stop_sequences: e.stopSequences,
          ...this.buildThinkingParams(_),
          stream: !0,
        },
        D = this,
        S = new AbortController();
      if (e.abortSignal)
        if (e.abortSignal.aborted) S.abort(e.abortSignal.reason);
        else e.abortSignal.addEventListener("abort", () => S.abort(e.abortSignal?.reason));
      let T = !1;
      return {
        stream: new ReadableStream({
          cancel: () => {
            ((T = !0), S.abort());
          },
          start: async (O) => {
            let B = (le) => {
                if (T) return;
                try {
                  O.enqueue(le);
                } catch {
                  T = !0;
                }
              },
              V = () => {
                if (T) return;
                T = !0;
                try {
                  O.close();
                } catch {}
              },
              q = {},
              Z = D.createUsage(),
              se = { unified: "other", raw: void 0 },
              ae = !1,
              z = !1,
              Ae = () => {
                for (let [le, Be] of Object.entries(q)) {
                  if (Be.type === "tool-call")
                    (B({ type: "tool-input-end", id: Be.toolCallId }),
                      B({
                        type: "tool-call",
                        toolCallId: Be.toolCallId,
                        toolName: Be.toolName,
                        input: Be.input === "" ? "{}" : Be.input,
                      }));
                  delete q[Number(le)];
                }
              };
            try {
              let le = L.messages.stream(I, { signal: S.signal });
              if (
                (B({ type: "stream-start", warnings: [] }),
                await new Promise((Be, Te) => {
                  (le.on("streamEvent", (Lt) => {
                    try {
                      switch (Lt.type) {
                        case "message_start":
                          if (Lt.message.usage) {
                            let Ht = Lt.message.usage;
                            Z = D.createUsage({
                              inputTotal: Ht.input_tokens,
                              outputTotal: Z.outputTokens.total,
                              outputReasoning: Z.outputTokens.reasoning,
                              cacheRead: Ht.cache_read_input_tokens,
                              cacheWrite: Ht.cache_creation_input_tokens,
                              raw: Z.raw,
                            });
                          }
                          B({ type: "response-metadata", id: Lt.message.id, modelId: Lt.message.model });
                          break;
                        case "content_block_start":
                          if (((z = !0), Lt.content_block.type === "text")) {
                            let Ht = `text-${Lt.index}`;
                            ((q[Lt.index] = { type: "text", id: Ht }), B({ type: "text-start", id: Ht }));
                          } else if (Lt.content_block.type === "thinking") {
                            let Ht = `reasoning-${Lt.index}`;
                            ((q[Lt.index] = { type: "reasoning", id: Ht }),
                              B({ type: "reasoning-start", id: Ht }));
                          } else if (Lt.content_block.type === "redacted_thinking") {
                            let Ht = `reasoning-${Lt.index}`;
                            ((q[Lt.index] = {
                              type: "reasoning",
                              id: Ht,
                              redactedData: Lt.content_block.data,
                            }),
                              B({ type: "reasoning-start", id: Ht }));
                          } else if (Lt.content_block.type === "tool_use")
                            ((q[Lt.index] = {
                              type: "tool-call",
                              toolCallId: Lt.content_block.id,
                              toolName: Lt.content_block.name,
                              input: "",
                            }),
                              B({
                                type: "tool-input-start",
                                id: Lt.content_block.id,
                                toolName: Lt.content_block.name,
                              }));
                          break;
                        case "content_block_delta": {
                          let Ht = q[Lt.index];
                          if (Lt.delta.type === "text_delta" && Ht?.type === "text")
                            B({ type: "text-delta", id: Ht.id, delta: Lt.delta.text });
                          else if (Lt.delta.type === "thinking_delta" && Ht?.type === "reasoning")
                            B({ type: "reasoning-delta", id: Ht.id, delta: Lt.delta.thinking });
                          else if (Lt.delta.type === "signature_delta" && Ht?.type === "reasoning")
                            Ht.signature = Lt.delta.signature;
                          else if (Lt.delta.type === "input_json_delta" && Ht?.type === "tool-call")
                            ((Ht.input += Lt.delta.partial_json),
                              B({
                                type: "tool-input-delta",
                                id: Ht.toolCallId,
                                delta: Lt.delta.partial_json,
                              }));
                          break;
                        }
                        case "content_block_stop": {
                          let Ht = q[Lt.index];
                          if (Ht?.type === "text") B({ type: "text-end", id: Ht.id });
                          else if (Ht?.type === "reasoning") {
                            let Se =
                              Ht.redactedData != null
                                ? { redactedData: Ht.redactedData }
                                : Ht.signature != null
                                  ? { signature: Ht.signature }
                                  : void 0;
                            B({
                              type: "reasoning-end",
                              id: Ht.id,
                              ...(Se && { providerMetadata: { gitlab: Se } }),
                            });
                          } else if (Ht?.type === "tool-call")
                            (B({ type: "tool-input-end", id: Ht.toolCallId }),
                              B({
                                type: "tool-call",
                                toolCallId: Ht.toolCallId,
                                toolName: Ht.toolName,
                                input: Ht.input === "" ? "{}" : Ht.input,
                              }));
                          delete q[Lt.index];
                          break;
                        }
                        case "message_delta":
                          if (Lt.usage) {
                            let Ht = Lt.usage;
                            Z = D.createUsage({
                              inputTotal: Z.inputTokens.noCache,
                              outputTotal: Ht.output_tokens,
                              outputReasoning: Z.outputTokens.reasoning,
                              cacheRead: Ht.cache_read_input_tokens ?? Z.inputTokens.cacheRead,
                              cacheWrite: Ht.cache_creation_input_tokens ?? Z.inputTokens.cacheWrite,
                              raw: Z.raw,
                            });
                          }
                          if (Lt.delta.stop_reason) se = D.convertFinishReason(Lt.delta.stop_reason);
                          break;
                        case "message_stop": {
                          (Ae(), (ae = !0), B({ type: "finish", finishReason: se, usage: Z }));
                          break;
                        }
                      }
                    } catch (Ht) {
                      B({ type: "error", error: Ht instanceof Error ? Ht : Error(String(Ht)) });
                    }
                  }),
                    le.on("end", () => {
                      Be();
                    }),
                    le.on("error", (Lt) => {
                      Te(Lt);
                    }));
                }),
                Ae(),
                !ae)
              )
                ((ae = !0), B({ type: "finish", finishReason: se, usage: Z }));
              V();
            } catch (le) {
              if ((Ae(), D.isContextOverflowError(le))) {
                (B({
                  type: "error",
                  error: new Ca({
                    message: `Context overflow: ${le.message}. Please start a new session or use /compact to reduce context.`,
                    statusCode: 400,
                    cause: le,
                  }),
                }),
                  V());
                return;
              }
              if (!t && D.isTokenError(le)) {
                if ((D.directAccessClient.invalidateToken(), !z))
                  try {
                    let Te = (await D.doStreamWithRetry(e, !0)).stream.getReader();
                    for (;;) {
                      let { done: Lt, value: Ht } = await Te.read();
                      if (Lt) break;
                      if (Ht.type === "stream-start") continue;
                      B(Ht);
                    }
                    V();
                    return;
                  } catch (Be) {
                    (B({
                      type: "error",
                      error:
                        Be instanceof Ca ? Be : new Ca({ message: "Token refresh retry failed", cause: Be }),
                    }),
                      V());
                    return;
                  }
                (B({ type: "error", error: new Ca({ message: "TOKEN_REFRESH_NEEDED", cause: le }) }), V());
                return;
              }
              if (le instanceof YN.APIError)
                B({
                  type: "error",
                  error: new Ca({
                    message: `Anthropic API error: ${le.message}`,
                    statusCode: le.status,
                    cause: le,
                  }),
                });
              else B({ type: "error", error: le });
              V();
            }
          },
        }),
        request: { body: I },
      };
    }
  },
  DCe,
  lmA,
  cVa = class {
    specificationVersion = "v3";
    modelId;
    supportedUrls = {};
    config;
    directAccessClient;
    useResponsesApi;
    openaiClient = null;
    constructor(e, t) {
      ((this.modelId = e),
        (this.config = t),
        (this.useResponsesApi = t.useResponsesApi ?? oVa(e)),
        (this.directAccessClient = new B7i({
          instanceUrl: t.instanceUrl,
          getHeaders: t.getHeaders,
          ensureApiKey: t.ensureApiKey,
          refreshApiKey: t.refreshApiKey,
          fetch: t.fetch,
          featureFlags: t.featureFlags,
          aiGatewayUrl: t.aiGatewayUrl,
        })));
    }
    get provider() {
      return this.config.provider;
    }
    async getOpenAIClient(e = !1) {
      let t = await this.directAccessClient.getDirectAccessToken(e),
        { "x-api-key": r, ...s } = t.headers,
        a = { ...s, ...this.config.aiGatewayHeaders };
      return (
        (this.openaiClient = new ll({
          apiKey: t.token,
          baseURL: this.directAccessClient.getOpenAIProxyUrl(),
          defaultHeaders: a,
        })),
        this.openaiClient
      );
    }
    isTokenError(e) {
      if (e instanceof ll.APIError) {
        if (e.status === 401) return !0;
        let t = e.message?.toLowerCase() || "";
        if (t.includes("token") && (t.includes("expired") || t.includes("revoked") || t.includes("invalid")))
          return !0;
      }
      return !1;
    }
    isContextOverflowError(e) {
      if (e instanceof ll.APIError) {
        if (e.status === 400) {
          let t = e.message?.toLowerCase() || "";
          if (
            t.includes("prompt is too long") ||
            t.includes("prompt too long") ||
            (t.includes("tokens") && t.includes("maximum"))
          )
            return !0;
        }
      }
      return !1;
    }
    formatOpenAIError(e, t) {
      let r = [`OpenAI API error: ${e.message}`],
        s = e.error;
      if (s) {
        let f = typeof s === "string" ? s : (s.message ?? s.detail ?? s.error);
        if (f && !e.message.includes(String(f)))
          r.push(`detail: ${typeof f === "string" ? f : JSON.stringify(f)}`);
      }
      let a = e.headers,
        H = typeof a?.get === "function" ? (a.get("x-request-id") ?? a.get("x-amzn-requestid")) : void 0;
      if (H) r.push(`request-id: ${H}`);
      let u = e.message?.includes("no body");
      if (e.status != null && e.status >= 400 && u && t != null && t > 20)
        r.push(
          `Hint: the request included ${t} tools; the GitLab AI Gateway may reject large tool sets \u2014 try reducing the number of enabled tools or MCP servers.`,
        );
      return r.join(" | ");
    }
    resolveReasoningEffort(e) {
      return e.providerOptions?.gitlab?.reasoningEffort ?? this.config.reasoningEffort;
    }
    asOpenAIReasoningEffort(e) {
      return e;
    }
    convertTools(e) {
      if (!e || e.length === 0) return;
      return e
        .filter((t) => t.type === "function")
        .map((t) => {
          let r = t.inputSchema;
          return {
            type: "function",
            function: {
              name: t.name,
              description: t.description || "",
              parameters: { type: "object", ...r },
            },
          };
        });
    }
    convertToolChoice(e) {
      if (!e) return;
      switch (e.type) {
        case "auto":
          return "auto";
        case "none":
          return "none";
        case "required":
          return "required";
        case "tool":
          return { type: "function", function: { name: e.toolName } };
        default:
          return;
      }
    }
    convertPrompt(e) {
      let t = [];
      for (let r of e) {
        if (r.role === "system") {
          t.push({ role: "system", content: r.content });
          continue;
        }
        if (r.role === "user") {
          let s = r.content.filter((a) => a.type === "text").map((a) => a.text);
          if (s.length > 0)
            t.push({
              role: "user",
              content: s.join(`
`),
            });
        } else if (r.role === "assistant") {
          let s = [],
            a = [];
          for (let u of r.content)
            if (u.type === "text") s.push(u.text);
            else if (u.type === "tool-call")
              a.push({
                id: u.toolCallId,
                type: "function",
                function: {
                  name: u.toolName,
                  arguments: typeof u.input === "string" ? u.input : JSON.stringify(u.input),
                },
              });
          let H = {
            role: "assistant",
            content:
              s.length > 0
                ? s.join(`
`)
                : null,
          };
          if (a.length > 0) H.tool_calls = a;
          t.push(H);
        } else if (r.role === "tool") {
          for (let s of r.content)
            if (s.type === "tool-result") {
              let a;
              if (s.output.type === "text") a = s.output.value;
              else if (s.output.type === "json") a = JSON.stringify(s.output.value);
              else if (s.output.type === "content") a = JSON.stringify(s.output.value);
              else if (s.output.type === "error-text") a = s.output.value;
              else if (s.output.type === "error-json") a = JSON.stringify(s.output.value);
              else if (s.output.type === "execution-denied") a = s.output.reason ?? "Tool execution denied.";
              else a = JSON.stringify(s.output);
              t.push({ role: "tool", tool_call_id: s.toolCallId, content: a });
            }
        }
      }
      return t;
    }
    convertFinishReason(e) {
      return {
        unified: (() => {
          switch (e) {
            case "stop":
              return "stop";
            case "length":
              return "length";
            case "tool_calls":
              return "tool-calls";
            case "content_filter":
              return "content-filter";
            default:
              return "other";
          }
        })(),
        raw: e ?? void 0,
      };
    }
    createUsage(e) {
      let t = e?.inputTotal,
        r = e?.outputTotal,
        s = e?.cacheRead;
      return {
        inputTokens: {
          total: t,
          noCache: t == null ? void 0 : Math.max(0, t - (s ?? 0)),
          cacheRead: s,
          cacheWrite: void 0,
        },
        outputTokens: {
          total: r,
          text: r != null ? r - (e?.outputReasoning ?? 0) : void 0,
          reasoning: e?.outputReasoning,
        },
        raw: e?.raw,
      };
    }
    convertToolsForResponses(e) {
      if (!e || e.length === 0) return;
      return e
        .filter((t) => t.type === "function")
        .map((t) => {
          let r = { ...t.inputSchema };
          return (
            delete r.$schema,
            {
              type: "function",
              name: t.name,
              description: t.description || "",
              parameters: r,
              strict: t.strict,
            }
          );
        });
    }
    convertPromptForResponses(e) {
      let t = [];
      for (let r of e) {
        if (r.role === "system") continue;
        if (r.role === "user") {
          let s = r.content.filter((a) => a.type === "text").map((a) => a.text);
          if (s.length > 0)
            t.push({
              type: "message",
              role: "user",
              content: s.map((a) => ({ type: "input_text", text: a })),
            });
        } else if (r.role === "assistant") {
          let s = [];
          for (let a of r.content)
            if (a.type === "text") s.push(a.text);
            else if (a.type === "tool-call")
              t.push({
                type: "function_call",
                call_id: a.toolCallId,
                name: a.toolName,
                arguments: typeof a.input === "string" ? a.input : JSON.stringify(a.input),
              });
          if (s.length > 0)
            t.push({
              type: "message",
              role: "assistant",
              content: [
                {
                  type: "output_text",
                  text: s.join(`
`),
                  annotations: [],
                },
              ],
            });
        } else if (r.role === "tool") {
          for (let s of r.content)
            if (s.type === "tool-result") {
              let a;
              if (s.output.type === "text") a = s.output.value;
              else if (s.output.type === "json") a = JSON.stringify(s.output.value);
              else if (s.output.type === "content") a = JSON.stringify(s.output.value);
              else if (s.output.type === "error-text") a = s.output.value;
              else if (s.output.type === "error-json") a = JSON.stringify(s.output.value);
              else if (s.output.type === "execution-denied") a = s.output.reason ?? "Tool execution denied.";
              else a = JSON.stringify(s.output);
              t.push({ type: "function_call_output", call_id: s.toolCallId, output: a });
            }
        }
      }
      return t;
    }
    extractSystemInstructions(e) {
      return (
        e.filter((r) => r.role === "system").map((r) => r.content).join(`
`) || void 0
      );
    }
    convertResponsesStatus(e, t = !1) {
      if (t) return { unified: "tool-calls", raw: e };
      return {
        unified: (() => {
          switch (e) {
            case "completed":
              return "stop";
            case "incomplete":
              return "length";
            case "cancelled":
              return "stop";
            case "failed":
              return "error";
            default:
              return "other";
          }
        })(),
        raw: e,
      };
    }
    async doGenerate(e) {
      if (this.useResponsesApi) return this.doGenerateWithResponsesApi(e, !1);
      return this.doGenerateWithChatApi(e, !1);
    }
    async doGenerateWithChatApi(e, t) {
      let r = await this.getOpenAIClient(t),
        s = this.convertPrompt(e.prompt),
        a = e.toolChoice?.type === "none",
        H = a ? void 0 : this.convertTools(e.tools),
        u = a ? void 0 : this.convertToolChoice(e.toolChoice),
        f = this.config.openaiModel || "gpt-4o",
        d = e.maxOutputTokens || this.config.maxTokens || 8192,
        _ = this.resolveReasoningEffort(e),
        L = {
          model: f,
          max_completion_tokens: d,
          messages: s,
          tools: H,
          tool_choice: H ? u : void 0,
          temperature: e.temperature,
          top_p: e.topP,
          stop: e.stopSequences,
          ...(_ && { reasoning_effort: this.asOpenAIReasoningEffort(_) }),
        };
      try {
        let I = e.abortSignal
            ? await r.chat.completions.create(L, { signal: e.abortSignal })
            : await r.chat.completions.create(L),
          D = I.choices[0],
          S = [];
        if (D?.message.content) S.push({ type: "text", text: D.message.content });
        if (D?.message.tool_calls) {
          for (let C of D.message.tool_calls)
            if (C.type === "function")
              S.push({
                type: "tool-call",
                toolCallId: C.id,
                toolName: C.function.name,
                input: C.function.arguments,
              });
        }
        let T = this.createUsage({
          inputTotal: I.usage?.prompt_tokens,
          outputTotal: I.usage?.completion_tokens,
          cacheRead: I.usage?.prompt_tokens_details?.cached_tokens,
          raw: { total_tokens: I.usage?.total_tokens },
        });
        return {
          content: S,
          finishReason: this.convertFinishReason(D?.finish_reason),
          usage: T,
          warnings: [],
        };
      } catch (I) {
        if (this.isContextOverflowError(I))
          throw new Ca({
            message: `Context overflow: ${I.message}. Please start a new session or use /compact to reduce context.`,
            statusCode: 400,
            cause: I,
          });
        if (!t && this.isTokenError(I))
          return (this.directAccessClient.invalidateToken(), this.doGenerateWithChatApi(e, !0));
        if (I instanceof ll.APIError)
          throw new Ca({ message: this.formatOpenAIError(I, H?.length), statusCode: I.status, cause: I });
        throw I;
      }
    }
    async doGenerateWithResponsesApi(e, t) {
      let r = await this.getOpenAIClient(t),
        s = this.convertPromptForResponses(e.prompt),
        a = e.toolChoice?.type === "none" ? void 0 : this.convertToolsForResponses(e.tools),
        H = this.extractSystemInstructions(e.prompt),
        u = this.config.openaiModel || "gpt-5-codex",
        f = e.maxOutputTokens || this.config.maxTokens || 8192,
        d = this.resolveReasoningEffort(e),
        _ = {
          model: u,
          input: s,
          instructions: H,
          tools: a,
          max_output_tokens: f,
          temperature: e.temperature,
          top_p: e.topP,
          store: !1,
          ...(d && { reasoning: { effort: this.asOpenAIReasoningEffort(d), summary: "auto" } }),
        };
      try {
        let L = e.abortSignal
            ? await r.responses.create(_, { signal: e.abortSignal })
            : await r.responses.create(_),
          I = [],
          D = !1;
        for (let T of L.output || [])
          if (T.type === "message" && T.role === "assistant") {
            for (let C of T.content || [])
              if (C.type === "output_text") I.push({ type: "text", text: C.text });
          } else if (T.type === "function_call")
            ((D = !0),
              I.push({ type: "tool-call", toolCallId: T.call_id, toolName: T.name, input: T.arguments }));
          else if (T.type === "reasoning") {
            for (let C of T.summary || [])
              if (C.type === "summary_text" && C.text) I.push({ type: "reasoning", text: C.text });
          }
        let S = this.createUsage({
          inputTotal: L.usage?.input_tokens,
          outputTotal: L.usage?.output_tokens,
          outputReasoning: L.usage?.output_tokens_details?.reasoning_tokens,
          cacheRead: L.usage?.input_tokens_details?.cached_tokens,
          raw: { total_tokens: L.usage?.total_tokens },
        });
        return { content: I, finishReason: this.convertResponsesStatus(L.status, D), usage: S, warnings: [] };
      } catch (L) {
        if (this.isContextOverflowError(L))
          throw new Ca({
            message: `Context overflow: ${L.message}. Please start a new session or use /compact to reduce context.`,
            statusCode: 400,
            cause: L,
          });
        if (!t && this.isTokenError(L))
          return (this.directAccessClient.invalidateToken(), this.doGenerateWithResponsesApi(e, !0));
        if (L instanceof ll.APIError)
          throw new Ca({ message: this.formatOpenAIError(L, a?.length), statusCode: L.status, cause: L });
        throw L;
      }
    }
    async doStream(e) {
      if (this.useResponsesApi) return this.doStreamWithResponsesApi(e, !1);
      return this.doStreamWithChatApi(e, !1);
    }
    async doStreamWithChatApi(e, t) {
      let r = await this.getOpenAIClient(t),
        s = this.convertPrompt(e.prompt),
        a = e.toolChoice?.type === "none",
        H = a ? void 0 : this.convertTools(e.tools),
        u = a ? void 0 : this.convertToolChoice(e.toolChoice),
        f = this.config.openaiModel || "gpt-4o",
        d = e.maxOutputTokens || this.config.maxTokens || 8192,
        _ = this.resolveReasoningEffort(e),
        L = {
          model: f,
          max_completion_tokens: d,
          messages: s,
          tools: H,
          tool_choice: H ? u : void 0,
          temperature: e.temperature,
          top_p: e.topP,
          stop: e.stopSequences,
          ...(_ && { reasoning_effort: this.asOpenAIReasoningEffort(_) }),
          stream: !0,
          stream_options: { include_usage: !0 },
        },
        I = this,
        D = new AbortController();
      if (e.abortSignal)
        if (e.abortSignal.aborted) D.abort(e.abortSignal.reason);
        else e.abortSignal.addEventListener("abort", () => D.abort(e.abortSignal?.reason));
      let S = !1;
      return {
        stream: new ReadableStream({
          cancel: () => {
            ((S = !0), D.abort());
          },
          start: async (C) => {
            let O = (le) => {
                if (S) return;
                try {
                  C.enqueue(le);
                } catch {
                  S = !0;
                }
              },
              B = () => {
                if (S) return;
                S = !0;
                try {
                  C.close();
                } catch {}
              },
              V = {},
              q = I.createUsage(),
              Z = { unified: "other", raw: void 0 },
              se = !1,
              ae = !1,
              z = !1,
              Ae = "text-0";
            try {
              let le = await r.chat.completions.create({ ...L, stream: !0 }, { signal: D.signal });
              O({ type: "stream-start", warnings: [] });
              for await (let Be of le) {
                let Te = Be.choices?.[0];
                if (Be.id && !ae) ((ae = !0), O({ type: "response-metadata", id: Be.id, modelId: Be.model }));
                if (Te?.delta?.content) {
                  if (((z = !0), !se)) (O({ type: "text-start", id: Ae }), (se = !0));
                  O({ type: "text-delta", id: Ae, delta: Te.delta.content });
                }
                if (Te?.delta?.tool_calls) {
                  z = !0;
                  for (let Lt of Te.delta.tool_calls) {
                    let Ht = Lt.index;
                    if (!V[Ht])
                      ((V[Ht] = { id: Lt.id || "", name: Lt.function?.name || "", arguments: "" }),
                        O({ type: "tool-input-start", id: V[Ht].id, toolName: V[Ht].name }));
                    else {
                      if (Lt.id && !V[Ht].id) V[Ht].id = Lt.id;
                      if (Lt.function?.name && !V[Ht].name) V[Ht].name = Lt.function.name;
                    }
                    if (Lt.function?.arguments)
                      ((V[Ht].arguments += Lt.function.arguments),
                        O({ type: "tool-input-delta", id: V[Ht].id, delta: Lt.function.arguments }));
                  }
                }
                if (Te?.finish_reason) Z = I.convertFinishReason(Te.finish_reason);
                if (Be.usage)
                  q = I.createUsage({
                    inputTotal: Be.usage.prompt_tokens,
                    outputTotal: Be.usage.completion_tokens,
                    cacheRead: Be.usage.prompt_tokens_details?.cached_tokens,
                    raw: { total_tokens: Be.usage.total_tokens },
                  });
              }
              if (se) O({ type: "text-end", id: Ae });
              for (let [, Be] of Object.entries(V))
                (O({ type: "tool-input-end", id: Be.id }),
                  O({
                    type: "tool-call",
                    toolCallId: Be.id,
                    toolName: Be.name,
                    input: Be.arguments || "{}",
                  }));
              (O({ type: "finish", finishReason: Z, usage: q }), B());
            } catch (le) {
              if (I.isContextOverflowError(le)) {
                (O({
                  type: "error",
                  error: new Ca({
                    message: `Context overflow: ${le.message}. Please start a new session or use /compact to reduce context.`,
                    statusCode: 400,
                    cause: le,
                  }),
                }),
                  B());
                return;
              }
              if (!t && I.isTokenError(le)) {
                if ((I.directAccessClient.invalidateToken(), !z))
                  try {
                    let Te = (await I.doStreamWithChatApi(e, !0)).stream.getReader();
                    for (;;) {
                      let { done: Lt, value: Ht } = await Te.read();
                      if (Lt) break;
                      if (Ht.type === "stream-start") continue;
                      O(Ht);
                    }
                    B();
                    return;
                  } catch (Be) {
                    (O({
                      type: "error",
                      error:
                        Be instanceof Ca ? Be : new Ca({ message: "Token refresh retry failed", cause: Be }),
                    }),
                      B());
                    return;
                  }
                (O({ type: "error", error: new Ca({ message: "TOKEN_REFRESH_NEEDED", cause: le }) }), B());
                return;
              }
              if (le instanceof ll.APIError)
                O({
                  type: "error",
                  error: new Ca({
                    message: I.formatOpenAIError(le, H?.length),
                    statusCode: le.status,
                    cause: le,
                  }),
                });
              else O({ type: "error", error: le });
              B();
            }
          },
        }),
        request: { body: L },
      };
    }
    async doStreamWithResponsesApi(e, t) {
      let r = await this.getOpenAIClient(t),
        s = this.convertPromptForResponses(e.prompt),
        a = e.toolChoice?.type === "none" ? void 0 : this.convertToolsForResponses(e.tools),
        H = this.extractSystemInstructions(e.prompt),
        u = this.config.openaiModel || "gpt-5-codex",
        f = e.maxOutputTokens || this.config.maxTokens || 8192,
        d = this.resolveReasoningEffort(e),
        _ = {
          model: u,
          input: s,
          instructions: H,
          tools: a,
          max_output_tokens: f,
          temperature: e.temperature,
          top_p: e.topP,
          store: !1,
          ...(d && { reasoning: { effort: this.asOpenAIReasoningEffort(d), summary: "auto" } }),
          stream: !0,
        },
        L = this,
        I = new AbortController();
      if (e.abortSignal)
        if (e.abortSignal.aborted) I.abort(e.abortSignal.reason);
        else e.abortSignal.addEventListener("abort", () => I.abort(e.abortSignal?.reason));
      let D = !1;
      return {
        stream: new ReadableStream({
          cancel: () => {
            ((D = !0), I.abort());
          },
          start: async (T) => {
            let C = (Se) => {
                if (D) return;
                try {
                  T.enqueue(Se);
                } catch {
                  D = !0;
                }
              },
              O = () => {
                if (D) return;
                D = !0;
                try {
                  T.close();
                } catch {}
              },
              B = {},
              V = new Set(),
              q = new Set(),
              Z = new Set(),
              se = L.createUsage(),
              ae = { unified: "other", raw: void 0 },
              z = !1,
              Ae = !1,
              le = "text-0",
              Be = (Se, _e) => `reasoning-${Se}-${_e}`,
              Te = (Se, _e) => {
                let we = Be(Se, _e);
                if (!q.has(we)) (q.add(we), V.add(we), (Ae = !0), C({ type: "reasoning-start", id: we }));
                return we;
              },
              Lt = (Se, _e, we) => {
                let Pe = Te(Se, _e);
                if (V.has(Pe) && we) (Z.add(Pe), C({ type: "reasoning-delta", id: Pe, delta: we }));
              },
              Ht = (Se, _e) => {
                let we = Be(Se, _e);
                if (V.delete(we)) C({ type: "reasoning-end", id: we });
              };
            try {
              let Se = await r.responses.create({ ..._, stream: !0 }, { signal: I.signal });
              C({ type: "stream-start", warnings: [] });
              for await (let we of Se)
                if (we.type === "response.created")
                  C({ type: "response-metadata", id: we.response.id, modelId: we.response.model });
                else if (we.type === "response.output_item.added") {
                  if (we.item.type === "function_call") {
                    Ae = !0;
                    let Pe = we.output_index,
                      ye = we.item.call_id;
                    ((B[Pe] = { callId: ye, name: we.item.name, arguments: "" }),
                      C({ type: "tool-input-start", id: ye, toolName: we.item.name }));
                  }
                } else if (we.type === "response.reasoning_summary_part.added")
                  Te(we.output_index, we.summary_index);
                else if (we.type === "response.reasoning_summary_text.delta")
                  Lt(we.output_index, we.summary_index, we.delta);
                else if (we.type === "response.reasoning_summary_text.done") {
                  let Pe = Te(we.output_index, we.summary_index);
                  if (!Z.has(Pe)) Lt(we.output_index, we.summary_index, we.text);
                  Ht(we.output_index, we.summary_index);
                } else if (we.type === "response.reasoning_summary_part.done") {
                  let Pe = Te(we.output_index, we.summary_index);
                  if (!Z.has(Pe)) Lt(we.output_index, we.summary_index, we.part.text);
                  Ht(we.output_index, we.summary_index);
                } else if (we.type === "response.output_item.done" && we.item.type === "reasoning") {
                  let Pe = `reasoning-${we.output_index}-`;
                  for (let ye of [...V])
                    if (ye.startsWith(Pe)) (V.delete(ye), C({ type: "reasoning-end", id: ye }));
                } else if (we.type === "response.output_text.delta") {
                  if (((Ae = !0), !z)) (C({ type: "text-start", id: le }), (z = !0));
                  C({ type: "text-delta", id: le, delta: we.delta });
                } else if (we.type === "response.function_call_arguments.delta") {
                  let Pe = we.output_index,
                    ye = B[Pe];
                  if (ye)
                    ((ye.arguments += we.delta),
                      C({ type: "tool-input-delta", id: ye.callId, delta: we.delta }));
                } else if (we.type === "response.function_call_arguments.done") {
                  let Pe = we.output_index,
                    ye = B[Pe];
                  if (ye) ye.arguments = we.arguments;
                } else if (we.type === "response.completed") {
                  let Pe = Object.keys(B).length > 0;
                  if (((ae = L.convertResponsesStatus(we.response.status, Pe)), we.response.usage))
                    se = L.createUsage({
                      inputTotal: we.response.usage.input_tokens,
                      outputTotal: we.response.usage.output_tokens,
                      outputReasoning: we.response.usage.output_tokens_details?.reasoning_tokens,
                      cacheRead: we.response.usage.input_tokens_details?.cached_tokens,
                      raw: { total_tokens: we.response.usage.total_tokens },
                    });
                }
              for (let we of V) C({ type: "reasoning-end", id: we });
              if ((V.clear(), z)) C({ type: "text-end", id: le });
              if (Object.keys(B).length > 0 && ae.unified === "stop")
                ae = { unified: "tool-calls", raw: ae.raw };
              for (let we of Object.values(B))
                (C({ type: "tool-input-end", id: we.callId }),
                  C({
                    type: "tool-call",
                    toolCallId: we.callId,
                    toolName: we.name,
                    input: we.arguments || "{}",
                  }));
              (C({ type: "finish", finishReason: ae, usage: se }), O());
            } catch (Se) {
              if (L.isContextOverflowError(Se)) {
                (C({
                  type: "error",
                  error: new Ca({
                    message: `Context overflow: ${Se.message}. Please start a new session or use /compact to reduce context.`,
                    statusCode: 400,
                    cause: Se,
                  }),
                }),
                  O());
                return;
              }
              if (!t && L.isTokenError(Se)) {
                if ((L.directAccessClient.invalidateToken(), !Ae))
                  try {
                    let we = (await L.doStreamWithResponsesApi(e, !0)).stream.getReader();
                    for (;;) {
                      let { done: Pe, value: ye } = await we.read();
                      if (Pe) break;
                      if (ye.type === "stream-start") continue;
                      C(ye);
                    }
                    O();
                    return;
                  } catch (_e) {
                    (C({
                      type: "error",
                      error:
                        _e instanceof Ca ? _e : new Ca({ message: "Token refresh retry failed", cause: _e }),
                    }),
                      O());
                    return;
                  }
                (C({ type: "error", error: new Ca({ message: "TOKEN_REFRESH_NEEDED", cause: Se }) }), O());
                return;
              }
              if (Se instanceof ll.APIError)
                C({
                  type: "error",
                  error: new Ca({
                    message: L.formatOpenAIError(Se, a?.length),
                    statusCode: Se.status,
                    cause: Se,
                  }),
                });
              else C({ type: "error", error: Se });
              O();
            }
          },
        }),
        request: { body: _ },
      };
    }
  },
  mbr = "6.19.0",
  w7i = 30000,
  k7i = class {
    socket = null;
    keepaliveInterval = null;
    heartbeatInterval = null;
    eventCallback = null;
    closed = !1;
    closedEmitted = !1;
    lastSendTime = 0;
    connect(e, t) {
      return (
        this.validateOptions(e),
        this.disposeSocket(),
        (this.eventCallback = t),
        (this.closed = !1),
        (this.closedEmitted = !1),
        (this.cleanedUp = !1),
        new Promise((r, s) => {
          let a = this.buildWebSocketUrl(e),
            H = this.buildWebSocketHeaders(e);
          this.socket = new oR(a, { headers: H });
          let u = !1,
            f = setTimeout(() => {
              if (u) return;
              u = !0;
              let d = this.socket;
              this.socket = null;
              try {
                d?.close(1000, "Connect timeout");
              } catch {}
              s(new Ca({ message: `WebSocket connect timed out after ${w7i}ms` }));
            }, w7i);
          ((this.socket.onopen = () => {
            if ((clearTimeout(f), u)) return;
            ((u = !0), this.startKeepalive(), this.startHeartbeat(), r());
          }),
            (this.socket.onmessage = (d) => {
              try {
                let _ = this.decodeMessageData(d.data),
                  L = JSON.parse(_);
                if (!L || typeof L !== "object")
                  throw new Ca({ message: "Invalid message structure: expected object" });
                this.handleAction(L);
              } catch (_) {
                this.emit({ type: "failed", error: _ instanceof Error ? _ : Error(String(_)) });
              }
            }),
            (this.socket.onerror = (d) => {
              let _ = new Ca({ message: `WebSocket error: ${d.message || "unknown"}` });
              if (!u) (clearTimeout(f), (u = !0), s(_));
              else this.emit({ type: "failed", error: _ });
            }),
            (this.socket.onclose = (d) => {
              if ((this.cleanup(), !u)) {
                (clearTimeout(f),
                  (u = !0),
                  s(
                    new Ca({
                      message: `WebSocket closed before open: code=${d.code} reason=${d.reason || ""}`,
                    }),
                  ));
                return;
              }
              if (!this.closed) this.emitClosed(d.code, d.reason || "");
            }));
        })
      );
    }
    sendStartRequest(e) {
      this.send({ startRequest: e });
    }
    sendActionResponse(e, t, r) {
      this.sendHeartbeatIfNeeded();
      let s = { requestID: e, plainTextResponse: { response: t, error: r ?? null } };
      this.send({ actionResponse: s });
    }
    stop() {
      (this.send({ stopWorkflow: { reason: KWa } }), (this.closed = !0), this.cleanup());
      let e = this.socket;
      if (((this.socket = null), e && (e.readyState === oR.OPEN || e.readyState === oR.CONNECTING)))
        e.close(1000, "Client stopping");
    }
    close() {
      if (this.closed) return;
      ((this.closed = !0), this.cleanup());
      let e = this.socket;
      if (((this.socket = null), e)) {
        if (e.readyState === oR.OPEN || e.readyState === oR.CONNECTING) e.close(1000, "Client closing");
      }
    }
    closeAndWait(e = qWa) {
      let t = this.socket,
        r = t && (t.readyState === oR.OPEN || t.readyState === oR.CONNECTING);
      if (this.closed || !r) return (this.close(), Promise.resolve());
      return new Promise((s) => {
        let a = !1,
          H = () => {
            if (a) return;
            ((a = !0), clearTimeout(u), s());
          },
          u = setTimeout(H, e),
          f = t.onclose;
        ((t.onclose = (d) => {
          try {
            f?.call(t, d);
          } finally {
            H();
          }
        }),
          this.close());
      });
    }
    get isConnected() {
      return this.socket?.readyState === oR.OPEN;
    }
    validateOptions(e) {
      if (!e.instanceUrl || typeof e.instanceUrl !== "string")
        throw new Ca({ message: "instanceUrl is required" });
      let t = new URL(e.instanceUrl);
      if (t.protocol !== "https:" && t.protocol !== "http:")
        throw new Ca({ message: `Invalid instanceUrl protocol: ${t.protocol}` });
      if (t.username || t.password)
        throw new Ca({
          message: "instanceUrl must not contain authentication credentials (username/password)",
        });
      if (!e.headers || typeof e.headers !== "object") throw new Ca({ message: "headers are required" });
      if (e.modelRef && typeof e.modelRef !== "string")
        throw new Ca({ message: "modelRef must be a string" });
    }
    buildWebSocketUrl(e) {
      let t = new URL(e.instanceUrl.replace(/\/?$/, "/")),
        r = new URL("./api/v4/ai/duo_workflows/ws", t);
      if (((r.protocol = r.protocol === "https:" ? "wss:" : "ws:"), e.modelRef && e.modelRef !== "default"))
        r.searchParams.set("user_selected_model_identifier", e.modelRef);
      if (e.aiCatalogItemVersionId)
        r.searchParams.set("ai_catalog_item_version_id", String(e.aiCatalogItemVersionId));
      if (e.workflowDefinition) r.searchParams.set("workflow_definition", e.workflowDefinition);
      return r.toString();
    }
    buildWebSocketHeaders(e) {
      let t = {};
      for (let [a, H] of Object.entries(e.headers)) t[a.toLowerCase()] = H;
      (delete t["content-type"],
        (t["x-gitlab-client-type"] = "node-websocket"),
        (t["x-gitlab-language-server-version"] = pbr));
      let s = new URL(e.instanceUrl).origin;
      if (((t.origin = s), e.requestId)) t["x-request-id"] = e.requestId;
      if (e.projectId) t["x-gitlab-project-id"] = e.projectId;
      if (e.namespaceId) t["x-gitlab-namespace-id"] = e.namespaceId;
      if (e.rootNamespaceId) t["x-gitlab-root-namespace-id"] = e.rootNamespaceId;
      if (!t["user-agent"]) t["user-agent"] = `gitlab-ai-provider/${mbr}`;
      return t;
    }
    handleAction(e) {
      if (e.newCheckpoint) {
        let r = e.newCheckpoint;
        if ((this.emit({ type: "checkpoint", data: r }), r.status === "FINISHED" || r.status === "COMPLETED"))
          this.emit({ type: "completed" });
        else if (r.status === "FAILED")
          this.emit({ type: "failed", error: Error(r.content || "Workflow failed") });
        else if (r.status === "STOPPED" || r.status === "CANCELLED") this.emit({ type: "completed" });
        else if (r.status === "TOOL_CALL_APPROVAL_REQUIRED")
          this.emit({ type: "approval-required", tools: this.extractApprovalTools(r) });
        else if (r.status === "PLAN_APPROVAL_REQUIRED")
          this.emit({
            type: "failed",
            error: new Ca({
              message: "Workflow requires plan approval, which is not supported by this client",
            }),
          });
        return;
      }
      if (e.runMCPTool) {
        if (!e.requestID) {
          this.emit({
            type: "failed",
            error: new Ca({
              message: "Received runMCPTool action without requestID; workflow cannot continue",
            }),
          });
          return;
        }
        this.emit({ type: "tool-request", requestID: e.requestID, data: e.runMCPTool });
        return;
      }
      let t = [
        ["runReadFile", e.runReadFile],
        ["runReadFiles", e.runReadFiles],
        ["runWriteFile", e.runWriteFile],
        ["runShellCommand", e.runShellCommand],
        ["runEditFile", e.runEditFile],
        ["listDirectory", e.listDirectory],
        ["findFiles", e.findFiles],
        ["grep", e.grep],
        ["mkdir", e.mkdir],
        ["runCommand", e.runCommand],
        ["runGitCommand", e.runGitCommand],
        ["runHTTPRequest", e.runHTTPRequest],
      ];
      for (let [r, s] of t)
        if (s) {
          if (!e.requestID) {
            this.emit({
              type: "failed",
              error: new Ca({ message: `Received ${r} action without requestID; workflow cannot continue` }),
            });
            return;
          }
          this.emit({ type: "builtin-tool-request", requestID: e.requestID, toolName: r, data: s });
          return;
        }
    }
    extractApprovalTools(e) {
      if (!e.checkpoint) return [];
      let t;
      try {
        t = JSON.parse(e.checkpoint);
      } catch {
        return [];
      }
      return (t.channel_values?.ui_chat_log ?? [])
        .filter((r) => r.message_type === "request" && r.tool_info !== null)
        .map((r) => ({ name: r.tool_info.name, args: JSON.stringify(r.tool_info.args) }));
    }
    send(e) {
      if (this.socket?.readyState === oR.OPEN) {
        let t = JSON.stringify(e);
        (this.socket.send(t), (this.lastSendTime = Date.now()));
      }
    }
    sendHeartbeatIfNeeded() {
      if (Date.now() - this.lastSendTime >= b7i / 2) this.send({ heartbeat: { timestamp: Date.now() } });
    }
    emit(e) {
      this.eventCallback?.(e);
    }
    emitClosed(e, t) {
      if (this.closedEmitted) return;
      ((this.closedEmitted = !0), this.emit({ type: "closed", code: e, reason: t }));
    }
    decodeMessageData(e) {
      if (typeof e === "string") return e;
      if (Array.isArray(e)) return Buffer.concat(e).toString("utf8");
      if (e instanceof ArrayBuffer) return Buffer.from(e).toString("utf8");
      return Buffer.from(e).toString("utf8");
    }
    disposeSocket() {
      this.cleanup();
      let e = this.socket;
      if (((this.socket = null), e)) {
        if (
          ((e.onopen = null),
          (e.onmessage = null),
          (e.onerror = null),
          (e.onclose = null),
          e.readyState === oR.OPEN || e.readyState === oR.CONNECTING)
        )
          try {
            e.close(1000, "Reconnecting");
          } catch {}
      }
    }
    startKeepalive() {
      if (this.keepaliveInterval) clearInterval(this.keepaliveInterval);
      this.keepaliveInterval = setInterval(() => {
        if (this.socket?.readyState === oR.OPEN)
          try {
            this.socket.ping();
          } catch {}
      }, VWa);
    }
    startHeartbeat() {
      if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = setInterval(() => {
        this.send({ heartbeat: { timestamp: Date.now() } });
      }, b7i);
    }
    cleanedUp = !1;
    cleanup() {
      if (this.cleanedUp) return;
      if (((this.cleanedUp = !0), this.keepaliveInterval))
        (clearInterval(this.keepaliveInterval), (this.keepaliveInterval = null));
      if (this.heartbeatInterval) (clearInterval(this.heartbeatInterval), (this.heartbeatInterval = null));
    }
  },
  lVa = class {
    cache = new Map();
    defaultTTL;
    constructor(e = 300000) {
      this.defaultTTL = e;
    }
    get(e) {
      let t = this.cache.get(e);
      if (!t) return null;
      if (Date.now() > t.expiresAt) return (this.cache.delete(e), null);
      return t.project;
    }
    set(e, t, r) {
      this.cache.set(e, { project: t, expiresAt: Date.now() + (r ?? this.defaultTTL) });
    }
    has(e) {
      return this.get(e) !== null;
    }
    delete(e) {
      this.cache.delete(e);
    }
    clear() {
      this.cache.clear();
    }
    get size() {
      return this.cache.size;
    }
    cleanup() {
      let e = Date.now();
      for (let [t, r] of this.cache.entries()) if (e > r.expiresAt) this.cache.delete(t);
    }
  },
  fVa = class {
    config;
    fetchFn;
    cache;
    constructor(e) {
      ((this.config = { gitTimeout: 5000, ...e }),
        (this.fetchFn = e.fetch ?? fetch),
        (this.cache = e.cache ?? new lVa()));
    }
    async detectProject(e, t = "origin") {
      let r = `${R7i.resolve(e)}\x00${t}`,
        s = this.cache.get(r);
      if (s) return s;
      try {
        let a = await this.getGitRemoteUrl(e, t);
        if (!a) return null;
        let H = this.parseGitRemoteUrl(a, this.config.instanceUrl);
        if (!H) return null;
        let u = await this.getProjectByPath(H);
        return (this.cache.set(r, u), u);
      } catch (a) {
        throw a instanceof Ca ? a : new Ca({ message: `Project detection failed: ${a}`, cause: a });
      }
    }
    parseGitRemoteUrl(e, t) {
      try {
        let r = new URL(t).hostname;
        if (e.startsWith("ssh://")) {
          try {
            let H = new URL(e);
            if (H.hostname === r) {
              let u = H.pathname.replace(/^\//, "");
              return u.endsWith(".git") ? u.slice(0, -4) : u;
            }
          } catch {}
          return null;
        }
        let s = e.match(/^git@([^:]+):(.+?)(?:\.git)?$/);
        if (s) {
          let [, H, u] = s;
          if (H === r) return u.endsWith(".git") ? u.slice(0, -4) : u;
        }
        let a = e.match(/^(https?):\/\/([^/]+)\/(.+?)(?:\.git)?$/);
        if (a) {
          let [, , H, u] = a;
          if (H.split(":")[0] === r) return u.endsWith(".git") ? u.slice(0, -4) : u;
        }
        return null;
      } catch {
        return null;
      }
    }
    async getGitRemoteUrl(e, t = "origin") {
      return new Promise((r) => {
        let s = uVa("git", ["config", "--get", `remote.${t}.url`], {
            cwd: e,
            timeout: this.config.gitTimeout,
          }),
          a = "";
        (s.stdout?.on("data", (H) => {
          a += H.toString();
        }),
          s.stderr?.resume(),
          s.on("close", (H) => {
            if (H === 0 && a.trim()) r(a.trim());
            else r(null);
          }),
          s.on("error", () => {
            r(null);
          }));
      });
    }
    async getProjectByPath(e) {
      let t = encodeURIComponent(e),
        r = `${this.config.instanceUrl}/api/v4/projects/${t}`;
      try {
        let s = await this.fetchFn(r, { method: "GET", headers: this.config.getHeaders() });
        if (!s.ok) throw new Ca({ message: `Failed to fetch project '${e}': ${s.status} ${s.statusText}` });
        let a = await s.json();
        return {
          id: a.id,
          path: a.path,
          pathWithNamespace: a.path_with_namespace,
          name: a.name,
          namespaceId: a.namespace?.id,
        };
      } catch (s) {
        if (s instanceof Ca) throw s;
        throw new Ca({ message: `Failed to fetch project '${e}': ${s}`, cause: s });
      }
    }
    clearCache() {
      this.cache.clear();
    }
    getCache() {
      return this.cache;
    }
  },
  dVa = `
  query aiChatAvailableModels($projectId: ProjectID, $rootNamespaceId: GroupID) {
    metadata {
      featureFlags(names: ["ai_user_model_switching"]) {
        enabled
        name
      }
      version
    }

    aiChatAvailableModels(projectId: $projectId, rootNamespaceId: $rootNamespaceId) {
      defaultModel {
        name
        ref
      }
      selectableModels {
        name
        ref
      }
      pinnedModel {
        name
        ref
      }
    }
  }
`,
  U7i = 600000,
  mVa = class {
    config;
    fetchFn;
    cache = new Map();
    constructor(e) {
      ((this.config = e), (this.fetchFn = e.fetch ?? fetch));
    }
    async discover(e) {
      let t = pVa(e),
        r = O7i(t),
        s = this.cache.get(r);
      if (s && s.expiresAt > Date.now()) return s.data;
      try {
        let a = await this.query(t);
        return (this.cache.set(r, { data: a, expiresAt: Date.now() + U7i }), a);
      } catch (a) {
        if ("projectId" in t && t.rootNamespaceId) {
          let H = { rootNamespaceId: t.rootNamespaceId },
            u = await this.query(H);
          return (this.cache.set(O7i(H), { data: u, expiresAt: Date.now() + U7i }), u);
        }
        throw a;
      }
    }
    async query(e) {
      let t = `${this.config.instanceUrl}/api/graphql`;
      try {
        let r = await this.fetchFn(t, {
          method: "POST",
          headers: { ...this.config.getHeaders(), "Content-Type": "application/json" },
          body: JSON.stringify({
            query: dVa,
            variables:
              "projectId" in e
                ? { projectId: e.projectId, rootNamespaceId: void 0 }
                : { projectId: void 0, rootNamespaceId: e.rootNamespaceId },
          }),
        });
        if (!r.ok) {
          let d = await r.text();
          throw new Ca({
            message: `Model discovery GraphQL request failed: ${r.status} ${r.statusText} - ${d}`,
            statusCode: r.status,
            responseBody: d,
          });
        }
        let s = await r.json();
        if (s.errors && s.errors.length > 0)
          throw new Ca({
            message: `Model discovery GraphQL errors: ${s.errors.map((d) => d.message).join(", ")}`,
          });
        let a = s.data?.aiChatAvailableModels,
          H = s.data?.metadata,
          u = H?.featureFlags?.find((d) => d.name === "ai_user_model_switching"),
          f = u ? u.enabled : !0;
        return {
          defaultModel: a?.defaultModel ?? null,
          selectableModels: a?.selectableModels ?? [],
          pinnedModel: a?.pinnedModel ?? null,
          modelSwitchingEnabled: f,
          instanceVersion: H?.version ?? null,
        };
      } catch (r) {
        if (r instanceof Ca) throw r;
        throw new Ca({ message: `Model discovery failed: ${r}`, cause: r });
      }
    }
    async getEffectiveModelRef(e, t) {
      let r = await this.discover(e);
      if (r.pinnedModel) return r.pinnedModel.ref;
      if (t && r.modelSwitchingEnabled) {
        if (r.selectableModels.some((a) => a.ref === t)) return t;
      }
      return r.defaultModel?.ref ?? null;
    }
    invalidateCache() {
      this.cache.clear();
    }
  },
  _Va = 600000,
  $Va = class {
    filePath;
    key;
    constructor(e, t, r) {
      ((this.filePath = hVa()), (this.key = LVa(e, t, r)));
    }
    readAll() {
      try {
        if (!i9.existsSync(this.filePath)) return {};
        let e = i9.readFileSync(this.filePath, "utf-8");
        return JSON.parse(e);
      } catch {
        return {};
      }
    }
    writeAll(e) {
      try {
        let t = Uze.dirname(this.filePath);
        i9.mkdirSync(t, { recursive: !0, mode: 448 });
        let r = `${this.filePath}.${process.pid}.${Date.now()}.tmp`;
        (i9.writeFileSync(r, JSON.stringify(e, null, 2), { mode: 384 }), i9.renameSync(r, this.filePath));
      } catch {}
    }
    load() {
      return this.readAll()[this.key] ?? null;
    }
    save(e) {
      let t = this.readAll();
      ((t[this.key] = e), this.writeAll(t));
    }
    isDiscoveryExpired() {
      let e = this.load(),
        t = e?.discoveryUpdatedAt;
      if (!e?.discovery || !t) return !0;
      let r = new Date(t).getTime();
      if (!Number.isFinite(r)) return !0;
      return Date.now() - r > _Va;
    }
    saveDiscovery(e, t) {
      let r = this.load(),
        s = new Date().toISOString();
      this.save({
        discovery: e,
        project: t !== void 0 ? t : (r?.project ?? null),
        selectedModelRef: r?.selectedModelRef ?? null,
        selectedModelName: r?.selectedModelName ?? null,
        updatedAt: s,
        discoveryUpdatedAt: s,
      });
    }
    saveSelection(e, t) {
      let r = this.load(),
        s = t;
      if (!s && e && r?.discovery) {
        let a = r.discovery;
        s =
          (a.pinnedModel?.ref === e
            ? a.pinnedModel
            : (a.selectableModels.find((u) => u.ref === e) ??
              (a.defaultModel?.ref === e ? a.defaultModel : null))
          )?.name ?? null;
      }
      this.save({
        discovery: r?.discovery ?? null,
        project: r?.project ?? null,
        selectedModelRef: e,
        selectedModelName: s,
        updatedAt: new Date().toISOString(),
        discoveryUpdatedAt: r?.discoveryUpdatedAt,
      });
    }
    clear() {
      let e = this.readAll();
      if ((delete e[this.key], Object.keys(e).length === 0))
        try {
          if (i9.existsSync(this.filePath)) i9.unlinkSync(this.filePath);
        } catch {}
      else this.writeAll(e);
    }
    getSelectedModelRef() {
      return this.load()?.selectedModelRef ?? null;
    }
    getSelectedModelName() {
      return this.load()?.selectedModelName ?? null;
    }
    getDiscovery() {
      return this.load()?.discovery ?? null;
    }
  },
  RPt,
  DVa,
  yVa = "1d89f9fdb23ee96d4e603201f6861dab6e143c5c3c00469a018a2d94bdc03d4e",
  q7i = "https://gitlab.com",
  MVa = 300000,
  xVa,
  G7i = class {
    fetch;
    inFlightRefreshes = xVa;
    constructor(e = fetch) {
      this.fetch = e;
    }
    isTokenExpired(e) {
      if (!Number.isFinite(e)) return !0;
      return Date.now() >= e;
    }
    needsRefresh(e) {
      if (!Number.isFinite(e)) return !0;
      return Date.now() >= e - MVa;
    }
    async refreshIfNeeded(e, t) {
      if (!this.needsRefresh(e.expiresAt)) return e;
      if (!e.refreshToken)
        throw new Ca({ message: "OAuth token has expired and no refresh token is available" });
      return this.exchangeRefreshToken({
        instanceUrl: e.instanceUrl,
        refreshToken: e.refreshToken,
        clientId: t,
      });
    }
    async exchangeAuthorizationCode(e) {
      let { instanceUrl: t, code: r, codeVerifier: s, clientId: a, redirectUri: H } = e,
        u = await this.exchangeToken({
          instanceUrl: t,
          grantType: "authorization_code",
          code: r,
          codeVerifier: s,
          clientId: a || this.getClientId(t),
          redirectUri: H,
        });
      return this.createTokensFromResponse(u, t);
    }
    async exchangeRefreshToken(e) {
      let { instanceUrl: t, refreshToken: r, clientId: s } = e,
        a = `${t}:${r}`,
        H = this.inFlightRefreshes.get(a);
      if (H) return H;
      let u = (async () => {
        let f = await this.exchangeToken({
          instanceUrl: t,
          grantType: "refresh_token",
          refreshToken: r,
          clientId: s || this.getClientId(t),
        });
        return this.createTokensFromResponse(f, t, r);
      })();
      this.inFlightRefreshes.set(a, u);
      try {
        return await u;
      } finally {
        this.inFlightRefreshes.delete(a);
      }
    }
    getClientId(e) {
      let t = process.env.GITLAB_OAUTH_CLIENT_ID;
      if (t) return t;
      if (e === q7i) return yVa;
      throw new Ca({
        message: `No OAuth client ID configured for instance ${e}. Please provide a clientId parameter or set GITLAB_OAUTH_CLIENT_ID environment variable.`,
      });
    }
    async exchangeToken(e) {
      let {
          instanceUrl: t,
          grantType: r,
          code: s,
          codeVerifier: a,
          refreshToken: H,
          clientId: u,
          redirectUri: f,
        } = e,
        d = { client_id: u, grant_type: r };
      if (r === "authorization_code") {
        if (!s || !a || !f)
          throw new Ca({
            message:
              "Authorization code, code verifier, and redirect URI are required for authorization_code grant",
          });
        ((d.code = s), (d.code_verifier = a), (d.redirect_uri = f));
      } else if (r === "refresh_token") {
        if (!H) throw new Ca({ message: "Refresh token is required for refresh_token grant" });
        d.refresh_token = H;
      }
      let _ = `${t}/oauth/token`;
      try {
        let L = await this.fetch(_, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(d).toString(),
        });
        if (!L.ok) {
          let S = await L.text();
          throw new Ca({
            message: `OAuth token exchange failed: ${L.status} ${L.statusText}`,
            cause: Error(S),
          });
        }
        let I = await L.json(),
          D = DVa.safeParse(I);
        if (!D.success)
          throw new Ca({ message: `Invalid OAuth token response: ${D.error.message}`, cause: D.error });
        return D.data;
      } catch (L) {
        if (L instanceof Ca) throw L;
        throw new Ca({
          message: `Failed to exchange OAuth token: ${L instanceof Error ? L.message : String(L)}`,
          cause: L instanceof Error ? L : void 0,
        });
      }
    }
    createTokensFromResponse(e, t, r) {
      let s = this.createExpiresTimestamp(e);
      return {
        accessToken: e.access_token,
        refreshToken: e.refresh_token || r || "",
        expiresAt: s,
        instanceUrl: t,
      };
    }
    createExpiresTimestamp(e) {
      let t = e.created_at * 1000,
        r = e.expires_in * 1000;
      return t + r;
    }
  },
  fbr,
  _mA,
  jVa =
    "https://gitlab.com/gitlab-org/modelops/applied-ml/code-suggestions/ai-assist/-/raw/main/ai_gateway/model_selection/models.yml",
  PVa = 86400000,
  Lbr = 200000,
  $br = 64000,
  kVa = class {
    url;
    ttlMs;
    fetchFn;
    memCache = null;
    memExpiresAt = 0;
    pending = null;
    constructor(e) {
      ((this.url = e?.url ?? jVa), (this.ttlMs = e?.ttlMs ?? PVa), (this.fetchFn = e?.fetch ?? fetch));
    }
    async getConfigs() {
      if (this.memCache && Date.now() < this.memExpiresAt) return this.memCache;
      let e = F7i(this.ttlMs);
      if (e) return ((this.memCache = e.configs), (this.memExpiresAt = e.writtenAt + this.ttlMs), e.configs);
      if (this.pending) return this.pending;
      this.pending = this.fetchConfigs();
      try {
        return await this.pending;
      } finally {
        this.pending = null;
      }
    }
    async getConfig(e) {
      return (await this.getConfigs()).get(e) ?? { context: Lbr, output: $br };
    }
    invalidateCache() {
      ((this.memCache = null), (this.memExpiresAt = 0));
      try {
        let e = gbr();
        if (T7.existsSync(e)) T7.unlinkSync(e);
      } catch {}
    }
    async fetchConfigs() {
      try {
        let e = await this.fetchFn(this.url);
        if (!e.ok)
          throw new Ca({ message: `Failed to fetch model configs: HTTP ${e.status}`, statusCode: e.status });
        let t = await e.text(),
          r = OVa(t);
        return ((this.memCache = r), (this.memExpiresAt = Date.now() + this.ttlMs), wVa(r), r);
      } catch (e) {
        return (
          console.warn(
            `gitlab-ai-provider: model config fetch failed (${e instanceof Error ? e.message : String(e)}); falling back to cached or default model limits`,
          ),
          this.memCache ?? F7i(1 / 0)?.configs ?? new Map()
        );
      }
    }
  },
  hmA;
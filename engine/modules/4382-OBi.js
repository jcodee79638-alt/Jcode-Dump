
var OBi = ne(() => {
  hUi();
  g7();
  PBi();
  $vt();
  CBi();
  lMr = class lMr extends l1r {
    constructor(e, t) {
      super(t);
      if (
        ((this._clientInfo = e),
        (this._cachedToolOutputValidators = new Map()),
        (this._cachedKnownTaskTools = new Set()),
        (this._cachedRequiredTaskTools = new Set()),
        (this._listChangedDebounceTimers = new Map()),
        (this._capabilities = t?.capabilities ?? {}),
        (this._jsonSchemaValidator = t?.jsonSchemaValidator ?? new AMr()),
        t?.listChanged)
      )
        this._pendingListChangedConfig = t.listChanged;
    }
    _setupListChangedHandlers(e) {
      if (e.tools && this._serverCapabilities?.tools?.listChanged)
        this._setupListChangedHandler("tools", SXe, e.tools, async () => (await this.listTools()).tools);
      if (e.prompts && this._serverCapabilities?.prompts?.listChanged)
        this._setupListChangedHandler(
          "prompts",
          jyr,
          e.prompts,
          async () => (await this.listPrompts()).prompts,
        );
      if (e.resources && this._serverCapabilities?.resources?.listChanged)
        this._setupListChangedHandler(
          "resources",
          yyr,
          e.resources,
          async () => (await this.listResources()).resources,
        );
    }
    get experimental() {
      if (!this._experimental) this._experimental = { tasks: new uMr(this) };
      return this._experimental;
    }
    registerCapabilities(e) {
      if (this.transport) throw Error("Cannot register capabilities after connecting to transport");
      this._capabilities = _Ui(this._capabilities, e);
    }
    setRequestHandler(e, t) {
      let s = hvt(e)?.method;
      if (!s) throw Error("Schema is missing a method literal");
      let a = Lvt(s);
      if (typeof a !== "string") throw Error("Schema method literal must be a string");
      let H = a;
      if (H === "elicitation/create") {
        let u = async (f, d) => {
          let _ = $7(Oyr, f);
          if (!_.success) {
            let B = _.error instanceof Error ? _.error.message : String(_.error);
            throw new Vu(Wl.InvalidParams, `Invalid elicitation request: ${B}`);
          }
          let { params: L } = _.data;
          L.mode = L.mode ?? "form";
          let { supportsFormMode: I, supportsUrlMode: D } = y9a(this._capabilities.elicitation);
          if (L.mode === "form" && !I)
            throw new Vu(Wl.InvalidParams, "Client does not support form-mode elicitation requests");
          if (L.mode === "url" && !D)
            throw new Vu(Wl.InvalidParams, "Client does not support URL-mode elicitation requests");
          let S = await Promise.resolve(t(f, d));
          if (L.task) {
            let B = $7(Xhe, S);
            if (!B.success) {
              let V = B.error instanceof Error ? B.error.message : String(B.error);
              throw new Vu(Wl.InvalidParams, `Invalid task creation result: ${V}`);
            }
            return B.data;
          }
          let T = $7(Uyr, S);
          if (!T.success) {
            let B = T.error instanceof Error ? T.error.message : String(T.error);
            throw new Vu(Wl.InvalidParams, `Invalid elicitation result: ${B}`);
          }
          let C = T.data,
            O = L.mode === "form" ? L.requestedSchema : void 0;
          if (L.mode === "form" && C.action === "accept" && C.content && O) {
            if (this._capabilities.elicitation?.form?.applyDefaults)
              try {
                bbt(O, C.content);
              } catch {}
          }
          return C;
        };
        return super.setRequestHandler(e, u);
      }
      if (H === "sampling/createMessage") {
        let u = async (f, d) => {
          let _ = $7(Cyr, f);
          if (!_.success) {
            let C = _.error instanceof Error ? _.error.message : String(_.error);
            throw new Vu(Wl.InvalidParams, `Invalid sampling request: ${C}`);
          }
          let { params: L } = _.data,
            I = await Promise.resolve(t(f, d));
          if (L.task) {
            let C = $7(Xhe, I);
            if (!C.success) {
              let O = C.error instanceof Error ? C.error.message : String(C.error);
              throw new Vu(Wl.InvalidParams, `Invalid task creation result: ${O}`);
            }
            return C.data;
          }
          let S = L.tools || L.toolChoice ? kyr : wyr,
            T = $7(S, I);
          if (!T.success) {
            let C = T.error instanceof Error ? T.error.message : String(T.error);
            throw new Vu(Wl.InvalidParams, `Invalid sampling result: ${C}`);
          }
          return T.data;
        };
        return super.setRequestHandler(e, u);
      }
      return super.setRequestHandler(e, t);
    }
    assertCapability(e, t) {
      if (!this._serverCapabilities?.[e]) throw Error(`Server does not support ${e} (required for ${t})`);
    }
    async connect(e, t) {
      if (
        (await super.connect(e),
        (e.onsessionexpired = async () => {
          await this._initialize(e);
        }),
        e.sessionId !== void 0)
      )
        return;
      try {
        await this._initialize(e, t);
      } catch (r) {
        throw (this.close(), r);
      }
    }
    async _initialize(e, t) {
      let r = await this.request(
        {
          method: "initialize",
          params: { protocolVersion: Sje, capabilities: this._capabilities, clientInfo: this._clientInfo },
        },
        Lyr,
        t,
      );
      if (r === void 0) throw Error(`Server sent invalid initialize result: ${r}`);
      if (!JOi.includes(r.protocolVersion))
        throw Error(`Server's protocol version is not supported: ${r.protocolVersion}`);
      if (
        ((this._serverCapabilities = r.capabilities),
        (this._serverVersion = r.serverInfo),
        e.setProtocolVersion)
      )
        e.setProtocolVersion(r.protocolVersion);
      if (
        ((this._instructions = r.instructions),
        await this.notification({ method: "notifications/initialized" }),
        this._pendingListChangedConfig)
      )
        (this._setupListChangedHandlers(this._pendingListChangedConfig),
          (this._pendingListChangedConfig = void 0));
    }
    getServerCapabilities() {
      return this._serverCapabilities;
    }
    getServerVersion() {
      return this._serverVersion;
    }
    getInstructions() {
      return this._instructions;
    }
    assertCapabilityForMethod(e) {
      switch (e) {
        case "logging/setLevel":
          if (!this._serverCapabilities?.logging)
            throw Error(`Server does not support logging (required for ${e})`);
          break;
        case "prompts/get":
        case "prompts/list":
          if (!this._serverCapabilities?.prompts)
            throw Error(`Server does not support prompts (required for ${e})`);
          break;
        case "resources/list":
        case "resources/templates/list":
        case "resources/read":
        case "resources/subscribe":
        case "resources/unsubscribe":
          if (!this._serverCapabilities?.resources)
            throw Error(`Server does not support resources (required for ${e})`);
          if (e === "resources/subscribe" && !this._serverCapabilities.resources.subscribe)
            throw Error(`Server does not support resource subscriptions (required for ${e})`);
          break;
        case "tools/call":
        case "tools/list":
          if (!this._serverCapabilities?.tools)
            throw Error(`Server does not support tools (required for ${e})`);
          break;
        case "completion/complete":
          if (!this._serverCapabilities?.completions)
            throw Error(`Server does not support completions (required for ${e})`);
          break;
        case "initialize":
          break;
        case "ping":
          break;
      }
    }
    assertNotificationCapability(e) {
      switch (e) {
        case "notifications/roots/list_changed":
          if (!this._capabilities.roots?.listChanged)
            throw Error(`Client does not support roots list changed notifications (required for ${e})`);
          break;
        case "notifications/initialized":
          break;
        case "notifications/cancelled":
          break;
        case "notifications/progress":
          break;
      }
    }
    assertRequestHandlerCapability(e) {
      if (!this._capabilities) return;
      switch (e) {
        case "sampling/createMessage":
          if (!this._capabilities.sampling)
            throw Error(`Client does not support sampling capability (required for ${e})`);
          break;
        case "elicitation/create":
          if (!this._capabilities.elicitation)
            throw Error(`Client does not support elicitation capability (required for ${e})`);
          break;
        case "roots/list":
          if (!this._capabilities.roots)
            throw Error(`Client does not support roots capability (required for ${e})`);
          break;
        case "tasks/get":
        case "tasks/list":
        case "tasks/result":
        case "tasks/cancel":
          if (!this._capabilities.tasks)
            throw Error(`Client does not support tasks capability (required for ${e})`);
          break;
        case "ping":
          break;
      }
    }
    assertTaskCapability(e) {
      wBi(this._serverCapabilities?.tasks?.requests, e, "Server");
    }
    assertTaskHandlerCapability(e) {
      if (!this._capabilities) return;
      kBi(this._capabilities.tasks?.requests, e, "Client");
    }
    async ping(e) {
      return this.request({ method: "ping" }, Ghe, e);
    }
    async complete(e, t) {
      return this.request({ method: "completion/complete", params: e }, Nyr, t);
    }
    async setLoggingLevel(e, t) {
      return this.request({ method: "logging/setLevel", params: { level: e } }, Ghe, t);
    }
    async getPrompt(e, t) {
      return this.request({ method: "prompts/get", params: e }, byr, t);
    }
    async listPrompts(e, t) {
      return this.request({ method: "prompts/list", params: e }, Myr, t);
    }
    async listResources(e, t) {
      return this.request({ method: "resources/list", params: e }, gyr, t);
    }
    async listResourceTemplates(e, t) {
      return this.request({ method: "resources/templates/list", params: e }, Eyr, t);
    }
    async readResource(e, t) {
      return this.request({ method: "resources/read", params: e }, Dyr, t);
    }
    async subscribeResource(e, t) {
      return this.request({ method: "resources/subscribe", params: e }, Ghe, t);
    }
    async unsubscribeResource(e, t) {
      return this.request({ method: "resources/unsubscribe", params: e }, Ghe, t);
    }
    async callTool(e, t = NX, r) {
      if (this.isToolTaskRequired(e.name))
        throw new Vu(
          Wl.InvalidRequest,
          `Tool "${e.name}" requires task-based execution. Use client.experimental.tasks.callToolStream() instead.`,
        );
      let s = await this.request({ method: "tools/call", params: e }, t, r),
        a = this.getToolOutputValidator(e.name);
      if (a) {
        if (!s.structuredContent && !s.isError)
          throw new Vu(
            Wl.InvalidRequest,
            `Tool ${e.name} has an output schema but did not return structured content`,
          );
        if (s.structuredContent)
          try {
            let H = a(s.structuredContent);
            if (!H.valid)
              throw new Vu(
                Wl.InvalidParams,
                `Structured content does not match the tool's output schema: ${H.errorMessage}`,
              );
          } catch (H) {
            if (H instanceof Vu) throw H;
            throw new Vu(
              Wl.InvalidParams,
              `Failed to validate structured content: ${H instanceof Error ? H.message : String(H)}`,
            );
          }
      }
      return s;
    }
    isToolTask(e) {
      if (!this._serverCapabilities?.tasks?.requests?.tools?.call) return !1;
      return this._cachedKnownTaskTools.has(e);
    }
    isToolTaskRequired(e) {
      return this._cachedRequiredTaskTools.has(e);
    }
    cacheToolMetadata(e, t = !0) {
      if (t)
        (this._cachedToolOutputValidators.clear(),
          this._cachedKnownTaskTools.clear(),
          this._cachedRequiredTaskTools.clear());
      for (let r of e) {
        if (r.outputSchema) {
          let a = this._jsonSchemaValidator.getValidator(r.outputSchema);
          this._cachedToolOutputValidators.set(r.name, a);
        }
        let s = r.execution?.taskSupport;
        if (s === "required" || s === "optional") this._cachedKnownTaskTools.add(r.name);
        if (s === "required") this._cachedRequiredTaskTools.add(r.name);
      }
    }
    getToolOutputValidator(e) {
      return this._cachedToolOutputValidators.get(e);
    }
    async listTools(e, t) {
      let r = await this.request({ method: "tools/list", params: e }, xXe, t);
      return (this.cacheToolMetadata(r.tools, e?.cursor === void 0), r);
    }
    _setupListChangedHandler(e, t, r, s) {
      let a = AUi.safeParse(r);
      if (!a.success) throw Error(`Invalid ${e} listChanged options: ${a.error.message}`);
      if (typeof r.onChanged !== "function")
        throw Error(`Invalid ${e} listChanged options: onChanged must be a function`);
      let { autoRefresh: H, debounceMs: u } = a.data,
        { onChanged: f } = r,
        d = async () => {
          if (!H) {
            f(null, null);
            return;
          }
          try {
            let L = await s();
            f(null, L);
          } catch (L) {
            let I = L instanceof Error ? L : Error(String(L));
            f(I, null);
          }
        },
        _ = () => {
          if (u) {
            let L = this._listChangedDebounceTimers.get(e);
            if (L) clearTimeout(L);
            let I = setTimeout(d, u);
            this._listChangedDebounceTimers.set(e, I);
          } else d();
        };
      this.setNotificationHandler(t, _);
    }
    async sendRootsListChanged() {
      return this.notification({ method: "notifications/roots/list_changed" });
    }
  };
});
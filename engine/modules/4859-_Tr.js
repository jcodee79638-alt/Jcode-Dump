
var _Tr = ne(() => {
  nR();
  x7();
  SKe();
  yPt();
  PKe = class PKe extends MLe {
    constructor() {
      super(...arguments);
      (Zw.add(this), (this._chatCompletions = []), (this.messages = []));
    }
    _addChatCompletion(e) {
      (this._chatCompletions.push(e), this._emit("chatCompletion", e));
      let t = e.choices[0]?.message;
      if (t) this._addMessage(t);
      return e;
    }
    _addMessage(e, t = !0) {
      if (!("content" in e)) e.content = null;
      if ((this.messages.push(e), t)) {
        if ((this._emit("message", e), uTr(e) && e.content)) this._emit("functionToolCallResult", e.content);
        else if (KPe(e) && e.tool_calls) {
          for (let r of e.tool_calls) if (r.type === "function") this._emit("functionToolCall", r.function);
        }
      }
    }
    async finalChatCompletion() {
      await this.done();
      let e = this._chatCompletions[this._chatCompletions.length - 1];
      if (!e) throw new bc("stream ended without producing a ChatCompletion");
      return e;
    }
    async finalContent() {
      return (await this.done(), us(this, Zw, "m", fTr).call(this));
    }
    async finalMessage() {
      return (await this.done(), us(this, Zw, "m", MPt).call(this));
    }
    async finalFunctionToolCall() {
      return (await this.done(), us(this, Zw, "m", pTr).call(this));
    }
    async finalFunctionToolCallResult() {
      return (await this.done(), us(this, Zw, "m", dTr).call(this));
    }
    async totalUsage() {
      return (await this.done(), us(this, Zw, "m", mTr).call(this));
    }
    allChatCompletions() {
      return [...this._chatCompletions];
    }
    _emitFinal() {
      let e = this._chatCompletions[this._chatCompletions.length - 1];
      if (e) this._emit("finalChatCompletion", e);
      let t = us(this, Zw, "m", MPt).call(this);
      if (t) this._emit("finalMessage", t);
      let r = us(this, Zw, "m", fTr).call(this);
      if (r) this._emit("finalContent", r);
      let s = us(this, Zw, "m", pTr).call(this);
      if (s) this._emit("finalFunctionToolCall", s);
      let a = us(this, Zw, "m", dTr).call(this);
      if (a != null) this._emit("finalFunctionToolCallResult", a);
      if (this._chatCompletions.some((H) => H.usage))
        this._emit("totalUsage", us(this, Zw, "m", mTr).call(this));
    }
    async _createChatCompletion(e, t, r) {
      let s = r?.signal;
      if (s) {
        if (s.aborted) this.controller.abort();
        s.addEventListener("abort", () => this.controller.abort());
      }
      us(this, Zw, "m", JVi).call(this, t);
      let a = await e.chat.completions.create({ ...t, stream: !1 }, { ...r, signal: this.controller.signal });
      return (this._connected(), this._addChatCompletion(xKe(a, t)));
    }
    async _runChatCompletion(e, t, r) {
      for (let s of t.messages) this._addMessage(s, !1);
      return await this._createChatCompletion(e, t, r);
    }
    async _runTools(e, t, r) {
      let { tool_choice: a = "auto", stream: H, ...u } = t,
        f = typeof a !== "string" && a.type === "function" && a?.function?.name,
        { maxChatCompletions: d = f3a } = r || {},
        _ = t.tools.map((D) => {
          if (yLe(D)) {
            if (!D.$callback)
              throw new bc("Tool given to `.runTools()` that does not have an associated function");
            return {
              type: "function",
              function: {
                function: D.$callback,
                name: D.function.name,
                description: D.function.description || "",
                parameters: D.function.parameters,
                parse: D.$parseRaw,
                strict: !0,
              },
            };
          }
          return D;
        }),
        L = {};
      for (let D of _) if (D.type === "function") L[D.function.name || D.function.function.name] = D.function;
      let I =
        "tools" in t
          ? _.map((D) =>
              D.type === "function"
                ? {
                    type: "function",
                    function: {
                      name: D.function.name || D.function.function.name,
                      parameters: D.function.parameters,
                      description: D.function.description,
                      strict: D.function.strict,
                    },
                  }
                : D,
            )
          : void 0;
      for (let D of t.messages) this._addMessage(D, !1);
      for (let D = 0; D < d; ++D) {
        let T = (
          await this._createChatCompletion(
            e,
            { ...u, tool_choice: a, tools: I, messages: [...this.messages] },
            r,
          )
        ).choices[0]?.message;
        if (!T) throw new bc("missing message in ChatCompletion response");
        if (!T.tool_calls?.length) return;
        for (let C of T.tool_calls) {
          if (C.type !== "function") continue;
          let O = C.id,
            { name: B, arguments: V } = C.function,
            q = L[B];
          if (!q) {
            let z = `Invalid tool_call: ${JSON.stringify(B)}. Available options are: ${Object.keys(L)
              .map((Ae) => JSON.stringify(Ae))
              .join(", ")}. Please try again`;
            this._addMessage({ role: "tool", tool_call_id: O, content: z });
            continue;
          } else if (f && f !== B) {
            let z = `Invalid tool_call: ${JSON.stringify(B)}. ${JSON.stringify(f)} requested. Please try again`;
            this._addMessage({ role: "tool", tool_call_id: O, content: z });
            continue;
          }
          let Z;
          try {
            Z = XVi(q) ? await q.parse(V) : V;
          } catch (z) {
            let Ae = z instanceof Error ? z.message : String(z);
            this._addMessage({ role: "tool", tool_call_id: O, content: Ae });
            continue;
          }
          let se = await q.function(Z, this),
            ae = us(this, Zw, "m", KVi).call(this, se);
          if ((this._addMessage({ role: "tool", tool_call_id: O, content: ae }), f)) return;
        }
      }
      return;
    }
  };
  ((Zw = new WeakSet()),
    (fTr = function () {
      return us(this, Zw, "m", MPt).call(this).content ?? null;
    }),
    (MPt = function () {
      let t = this.messages.length;
      while (t-- > 0) {
        let r = this.messages[t];
        if (KPe(r)) return { ...r, content: r.content ?? null, refusal: r.refusal ?? null };
      }
      throw new bc("stream ended without producing a ChatCompletionMessage with role=assistant");
    }),
    (pTr = function () {
      for (let t = this.messages.length - 1; t >= 0; t--) {
        let r = this.messages[t];
        if (KPe(r) && r?.tool_calls?.length)
          return r.tool_calls.filter((s) => s.type === "function").at(-1)?.function;
      }
      return;
    }),
    (dTr = function () {
      for (let t = this.messages.length - 1; t >= 0; t--) {
        let r = this.messages[t];
        if (
          uTr(r) &&
          r.content != null &&
          typeof r.content === "string" &&
          this.messages.some(
            (s) =>
              s.role === "assistant" &&
              s.tool_calls?.some((a) => a.type === "function" && a.id === r.tool_call_id),
          )
        )
          return r.content;
      }
      return;
    }),
    (mTr = function () {
      let t = { completion_tokens: 0, prompt_tokens: 0, total_tokens: 0 };
      for (let { usage: r } of this._chatCompletions)
        if (r)
          ((t.completion_tokens += r.completion_tokens),
            (t.prompt_tokens += r.prompt_tokens),
            (t.total_tokens += r.total_tokens));
      return t;
    }),
    (JVi = function (t) {
      if (t.n != null && t.n > 1)
        throw new bc(
          "ChatCompletion convenience helpers only support n=1 at this time. To use n>1, please use chat.completions.create() directly.",
        );
    }),
    (KVi = function (t) {
      return typeof t === "string" ? t : t === void 0 ? "undefined" : JSON.stringify(t);
    }));
});
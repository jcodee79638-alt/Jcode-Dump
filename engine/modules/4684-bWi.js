
var bWi = ne(() => {
  Iee();
  tSr();
  IJe();
  rSr();
  eSr();
  vJe = class vJe {
    constructor(e, t) {
      (tR.add(this),
        (this.messages = []),
        (this.receivedMessages = []),
        pce.set(this, void 0),
        jPe.set(this, null),
        (this.controller = new AbortController()),
        DJe.set(this, void 0),
        Cjt.set(this, () => {}),
        yJe.set(this, () => {}),
        MJe.set(this, void 0),
        wjt.set(this, () => {}),
        xJe.set(this, () => {}),
        Mee.set(this, {}),
        SJe.set(this, !1),
        kjt.set(this, !1),
        Ojt.set(this, !1),
        pLe.set(this, !1),
        Ujt.set(this, void 0),
        Njt.set(this, void 0),
        TJe.set(this, void 0),
        Fjt.set(this, (r) => {
          if ((Ic(this, kjt, !0, "f"), Dee(r))) r = new SP();
          if (r instanceof SP) return (Ic(this, Ojt, !0, "f"), this._emit("abort", r));
          if (r instanceof Cu) return this._emit("error", r);
          if (r instanceof Error) {
            let s = new Cu(r.message);
            return ((s.cause = r), this._emit("error", s));
          }
          return this._emit("error", new Cu(String(r)));
        }),
        Ic(
          this,
          DJe,
          new Promise((r, s) => {
            (Ic(this, Cjt, r, "f"), Ic(this, yJe, s, "f"));
          }),
          "f",
        ),
        Ic(
          this,
          MJe,
          new Promise((r, s) => {
            (Ic(this, wjt, r, "f"), Ic(this, xJe, s, "f"));
          }),
          "f",
        ),
        Ps(this, DJe, "f").catch(() => {}),
        Ps(this, MJe, "f").catch(() => {}),
        Ic(this, jPe, e, "f"),
        Ic(this, TJe, t?.logger ?? console, "f"));
    }
    get response() {
      return Ps(this, Ujt, "f");
    }
    get request_id() {
      return Ps(this, Njt, "f");
    }
    async withResponse() {
      Ic(this, pLe, !0, "f");
      let e = await Ps(this, DJe, "f");
      if (!e) throw Error("Could not resolve a `Response` object");
      return { data: this, response: e, request_id: e.headers.get("request-id") };
    }
    static fromReadableStream(e) {
      let t = new vJe(null);
      return (t._run(() => t._fromReadableStream(e)), t);
    }
    static createMessage(e, t, r, { logger: s } = {}) {
      let a = new vJe(t, { logger: s });
      for (let H of t.messages) a._addMessageParam(H);
      return (
        Ic(a, jPe, { ...t, stream: !0 }, "f"),
        a._run(() =>
          a._createMessage(
            e,
            { ...t, stream: !0 },
            { ...r, headers: { ...r?.headers, "X-Stainless-Helper-Method": "stream" } },
          ),
        ),
        a
      );
    }
    _run(e) {
      e().then(
        () => {
          (this._emitFinal(), this._emit("end"));
        },
        Ps(this, Fjt, "f"),
      );
    }
    _addMessageParam(e) {
      this.messages.push(e);
    }
    _addMessage(e, t = !0) {
      if ((this.receivedMessages.push(e), t)) this._emit("message", e);
    }
    async _createMessage(e, t, r) {
      let s = r?.signal,
        a;
      if (s) {
        if (s.aborted) this.controller.abort();
        ((a = this.controller.abort.bind(this.controller)), s.addEventListener("abort", a));
      }
      try {
        Ps(this, tR, "m", iSr).call(this);
        let { response: H, data: u } = await e
          .create({ ...t, stream: !0 }, { ...r, signal: this.controller.signal })
          .withResponse();
        this._connected(H);
        for await (let f of u) Ps(this, tR, "m", sSr).call(this, f);
        if (u.controller.signal?.aborted) throw new SP();
        Ps(this, tR, "m", oSr).call(this);
      } finally {
        if (s && a) s.removeEventListener("abort", a);
      }
    }
    _connected(e) {
      if (this.ended) return;
      (Ic(this, Ujt, e, "f"),
        Ic(this, Njt, e?.headers.get("request-id"), "f"),
        Ps(this, Cjt, "f").call(this, e),
        this._emit("connect"));
    }
    get ended() {
      return Ps(this, SJe, "f");
    }
    get errored() {
      return Ps(this, kjt, "f");
    }
    get aborted() {
      return Ps(this, Ojt, "f");
    }
    abort() {
      this.controller.abort();
    }
    on(e, t) {
      return ((Ps(this, Mee, "f")[e] || (Ps(this, Mee, "f")[e] = [])).push({ listener: t }), this);
    }
    off(e, t) {
      let r = Ps(this, Mee, "f")[e];
      if (!r) return this;
      let s = r.findIndex((a) => a.listener === t);
      if (s >= 0) r.splice(s, 1);
      return this;
    }
    once(e, t) {
      return ((Ps(this, Mee, "f")[e] || (Ps(this, Mee, "f")[e] = [])).push({ listener: t, once: !0 }), this);
    }
    emitted(e) {
      return new Promise((t, r) => {
        if ((Ic(this, pLe, !0, "f"), e !== "error")) this.once("error", r);
        this.once(e, t);
      });
    }
    async done() {
      (Ic(this, pLe, !0, "f"), await Ps(this, MJe, "f"));
    }
    get currentMessage() {
      return Ps(this, pce, "f");
    }
    async finalMessage() {
      return (await this.done(), Ps(this, tR, "m", nSr).call(this));
    }
    async finalText() {
      return (await this.done(), Ps(this, tR, "m", MWi).call(this));
    }
    _emit(e, ...t) {
      if (Ps(this, SJe, "f")) return;
      if (e === "end") (Ic(this, SJe, !0, "f"), Ps(this, wjt, "f").call(this));
      let r = Ps(this, Mee, "f")[e];
      if (r) ((Ps(this, Mee, "f")[e] = r.filter((s) => !s.once)), r.forEach(({ listener: s }) => s(...t)));
      if (e === "abort") {
        let s = t[0];
        if (!Ps(this, pLe, "f") && !r?.length) Promise.reject(s);
        (Ps(this, yJe, "f").call(this, s), Ps(this, xJe, "f").call(this, s), this._emit("end"));
        return;
      }
      if (e === "error") {
        let s = t[0];
        if (!Ps(this, pLe, "f") && !r?.length) Promise.reject(s);
        (Ps(this, yJe, "f").call(this, s), Ps(this, xJe, "f").call(this, s), this._emit("end"));
      }
    }
    _emitFinal() {
      if (this.receivedMessages.at(-1)) this._emit("finalMessage", Ps(this, tR, "m", nSr).call(this));
    }
    async _fromReadableStream(e, t) {
      let r = t?.signal,
        s;
      if (r) {
        if (r.aborted) this.controller.abort();
        ((s = this.controller.abort.bind(this.controller)), r.addEventListener("abort", s));
      }
      try {
        (Ps(this, tR, "m", iSr).call(this), this._connected(null));
        let a = zN.fromReadableStream(e, this.controller);
        for await (let H of a) Ps(this, tR, "m", sSr).call(this, H);
        if (a.controller.signal?.aborted) throw new SP();
        Ps(this, tR, "m", oSr).call(this);
      } finally {
        if (r && s) r.removeEventListener("abort", s);
      }
    }
    [((pce = new WeakMap()),
    (jPe = new WeakMap()),
    (DJe = new WeakMap()),
    (Cjt = new WeakMap()),
    (yJe = new WeakMap()),
    (MJe = new WeakMap()),
    (wjt = new WeakMap()),
    (xJe = new WeakMap()),
    (Mee = new WeakMap()),
    (SJe = new WeakMap()),
    (kjt = new WeakMap()),
    (Ojt = new WeakMap()),
    (pLe = new WeakMap()),
    (Ujt = new WeakMap()),
    (Njt = new WeakMap()),
    (TJe = new WeakMap()),
    (Fjt = new WeakMap()),
    (tR = new WeakSet()),
    (nSr = function () {
      if (this.receivedMessages.length === 0)
        throw new Cu("stream ended without producing a Message with role=assistant");
      return this.receivedMessages.at(-1);
    }),
    (MWi = function () {
      if (this.receivedMessages.length === 0)
        throw new Cu("stream ended without producing a Message with role=assistant");
      let t = this.receivedMessages
        .at(-1)
        .content.filter((r) => r.type === "text")
        .map((r) => r.text);
      if (t.length === 0) throw new Cu("stream ended without producing a content block with type=text");
      return t.join(" ");
    }),
    (iSr = function () {
      if (this.ended) return;
      Ic(this, pce, void 0, "f");
    }),
    (sSr = function (t) {
      if (this.ended) return;
      let r = Ps(this, tR, "m", xWi).call(this, t);
      switch ((this._emit("streamEvent", t, r), t.type)) {
        case "content_block_delta": {
          let s = r.content.at(-1);
          switch (t.delta.type) {
            case "text_delta": {
              if (s.type === "text") this._emit("text", t.delta.text, s.text || "");
              break;
            }
            case "citations_delta": {
              if (s.type === "text") this._emit("citation", t.delta.citation, s.citations ?? []);
              break;
            }
            case "input_json_delta": {
              if (TWi(s) && s.input) this._emit("inputJson", t.delta.partial_json, s.input);
              break;
            }
            case "thinking_delta": {
              if (s.type === "thinking") this._emit("thinking", t.delta.thinking, s.thinking);
              break;
            }
            case "signature_delta": {
              if (s.type === "thinking") this._emit("signature", s.signature);
              break;
            }
            default:
              vWi(t.delta);
          }
          break;
        }
        case "message_stop": {
          (this._addMessageParam(r),
            this._addMessage(Yxr(r, Ps(this, jPe, "f"), { logger: Ps(this, TJe, "f") }), !0));
          break;
        }
        case "content_block_stop": {
          this._emit("contentBlock", r.content.at(-1));
          break;
        }
        case "message_start": {
          Ic(this, pce, r, "f");
          break;
        }
        case "content_block_start":
        case "message_delta":
          break;
      }
    }),
    (oSr = function () {
      if (this.ended) throw new Cu("stream has ended, this shouldn't happen");
      let t = Ps(this, pce, "f");
      if (!t) throw new Cu("request ended without sending any chunks");
      return (Ic(this, pce, void 0, "f"), Yxr(t, Ps(this, jPe, "f"), { logger: Ps(this, TJe, "f") }));
    }),
    (xWi = function (t) {
      let r = Ps(this, pce, "f");
      if (t.type === "message_start") {
        if (r) throw new Cu(`Unexpected event order, got ${t.type} before receiving "message_stop"`);
        return t.message;
      }
      if (!r) throw new Cu(`Unexpected event order, got ${t.type} before "message_start"`);
      switch (t.type) {
        case "message_stop":
          return r;
        case "message_delta":
          if (
            ((r.container = t.delta.container),
            (r.stop_reason = t.delta.stop_reason),
            (r.stop_sequence = t.delta.stop_sequence),
            (r.usage.output_tokens = t.usage.output_tokens),
            (r.context_management = t.context_management),
            t.usage.input_tokens != null)
          )
            r.usage.input_tokens = t.usage.input_tokens;
          if (t.usage.cache_creation_input_tokens != null)
            r.usage.cache_creation_input_tokens = t.usage.cache_creation_input_tokens;
          if (t.usage.cache_read_input_tokens != null)
            r.usage.cache_read_input_tokens = t.usage.cache_read_input_tokens;
          if (t.usage.server_tool_use != null) r.usage.server_tool_use = t.usage.server_tool_use;
          return r;
        case "content_block_start":
          return (r.content.push(t.content_block), r);
        case "content_block_delta": {
          let s = r.content.at(t.index);
          switch (t.delta.type) {
            case "text_delta": {
              if (s?.type === "text") r.content[t.index] = { ...s, text: (s.text || "") + t.delta.text };
              break;
            }
            case "citations_delta": {
              if (s?.type === "text")
                r.content[t.index] = { ...s, citations: [...(s.citations ?? []), t.delta.citation] };
              break;
            }
            case "input_json_delta": {
              if (s && TWi(s)) {
                let a = s[SWi] || "";
                a += t.delta.partial_json;
                let H = { ...s };
                if ((Object.defineProperty(H, SWi, { value: a, enumerable: !1, writable: !0 }), a))
                  try {
                    H.input = Pjt(a);
                  } catch (u) {
                    let f = new Cu(
                      `Unable to parse tool parameter JSON from model. Please retry your request or adjust your prompt. Error: ${u}. JSON: ${a}`,
                    );
                    Ps(this, Fjt, "f").call(this, f);
                  }
                r.content[t.index] = H;
              }
              break;
            }
            case "thinking_delta": {
              if (s?.type === "thinking")
                r.content[t.index] = { ...s, thinking: s.thinking + t.delta.thinking };
              break;
            }
            case "signature_delta": {
              if (s?.type === "thinking") r.content[t.index] = { ...s, signature: t.delta.signature };
              break;
            }
            default:
              vWi(t.delta);
          }
          return r;
        }
        case "content_block_stop":
          return r;
      }
    }),
    Symbol.asyncIterator)]() {
      let e = [],
        t = [],
        r = !1;
      return (
        this.on("streamEvent", (s) => {
          let a = t.shift();
          if (a) a.resolve(s);
          else e.push(s);
        }),
        this.on("end", () => {
          r = !0;
          for (let s of t) s.resolve(void 0);
          t.length = 0;
        }),
        this.on("abort", (s) => {
          r = !0;
          for (let a of t) a.reject(s);
          t.length = 0;
        }),
        this.on("error", (s) => {
          r = !0;
          for (let a of t) a.reject(s);
          t.length = 0;
        }),
        {
          next: async () => {
            if (!e.length) {
              if (r) return { value: void 0, done: !0 };
              return new Promise((a, H) => t.push({ resolve: a, reject: H })).then((a) =>
                a ? { value: a, done: !1 } : { value: void 0, done: !0 },
              );
            }
            return { value: e.shift(), done: !1 };
          },
          return: async () => (this.abort(), { value: void 0, done: !0 }),
        }
      );
    }
    toReadableStream() {
      return new zN(this[Symbol.asyncIterator].bind(this), this.controller).toReadableStream();
    }
  };
});
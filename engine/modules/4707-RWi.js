
var RWi = ne(() => {
  Iee();
  IJe();
  rSr();
  tSr();
  RJe = class RJe {
    constructor() {
      (rR.add(this),
        (this.messages = []),
        (this.receivedMessages = []),
        mce.set(this, void 0),
        (this.controller = new AbortController()),
        OJe.set(this, void 0),
        Bjt.set(this, () => {}),
        UJe.set(this, () => {}),
        NJe.set(this, void 0),
        Rjt.set(this, () => {}),
        FJe.set(this, () => {}),
        See.set(this, {}),
        BJe.set(this, !1),
        Wjt.set(this, !1),
        Vjt.set(this, !1),
        _Le.set(this, !1),
        qjt.set(this, void 0),
        Gjt.set(this, void 0),
        _Sr.set(this, (e) => {
          if ((Ic(this, Wjt, !0, "f"), Dee(e))) e = new SP();
          if (e instanceof SP) return (Ic(this, Vjt, !0, "f"), this._emit("abort", e));
          if (e instanceof Cu) return this._emit("error", e);
          if (e instanceof Error) {
            let t = new Cu(e.message);
            return ((t.cause = e), this._emit("error", t));
          }
          return this._emit("error", new Cu(String(e)));
        }),
        Ic(
          this,
          OJe,
          new Promise((e, t) => {
            (Ic(this, Bjt, e, "f"), Ic(this, UJe, t, "f"));
          }),
          "f",
        ),
        Ic(
          this,
          NJe,
          new Promise((e, t) => {
            (Ic(this, Rjt, e, "f"), Ic(this, FJe, t, "f"));
          }),
          "f",
        ),
        Ps(this, OJe, "f").catch(() => {}),
        Ps(this, NJe, "f").catch(() => {}));
    }
    get response() {
      return Ps(this, qjt, "f");
    }
    get request_id() {
      return Ps(this, Gjt, "f");
    }
    async withResponse() {
      Ic(this, _Le, !0, "f");
      let e = await Ps(this, OJe, "f");
      if (!e) throw Error("Could not resolve a `Response` object");
      return { data: this, response: e, request_id: e.headers.get("request-id") };
    }
    static fromReadableStream(e) {
      let t = new RJe();
      return (t._run(() => t._fromReadableStream(e)), t);
    }
    static createMessage(e, t, r) {
      let s = new RJe();
      for (let a of t.messages) s._addMessageParam(a);
      return (
        s._run(() =>
          s._createMessage(
            e,
            { ...t, stream: !0 },
            { ...r, headers: { ...r?.headers, "X-Stainless-Helper-Method": "stream" } },
          ),
        ),
        s
      );
    }
    _run(e) {
      e().then(
        () => {
          (this._emitFinal(), this._emit("end"));
        },
        Ps(this, _Sr, "f"),
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
        Ps(this, rR, "m", hSr).call(this);
        let { response: H, data: u } = await e
          .create({ ...t, stream: !0 }, { ...r, signal: this.controller.signal })
          .withResponse();
        this._connected(H);
        for await (let f of u) Ps(this, rR, "m", LSr).call(this, f);
        if (u.controller.signal?.aborted) throw new SP();
        Ps(this, rR, "m", $Sr).call(this);
      } finally {
        if (s && a) s.removeEventListener("abort", a);
      }
    }
    _connected(e) {
      if (this.ended) return;
      (Ic(this, qjt, e, "f"),
        Ic(this, Gjt, e?.headers.get("request-id"), "f"),
        Ps(this, Bjt, "f").call(this, e),
        this._emit("connect"));
    }
    get ended() {
      return Ps(this, BJe, "f");
    }
    get errored() {
      return Ps(this, Wjt, "f");
    }
    get aborted() {
      return Ps(this, Vjt, "f");
    }
    abort() {
      this.controller.abort();
    }
    on(e, t) {
      return ((Ps(this, See, "f")[e] || (Ps(this, See, "f")[e] = [])).push({ listener: t }), this);
    }
    off(e, t) {
      let r = Ps(this, See, "f")[e];
      if (!r) return this;
      let s = r.findIndex((a) => a.listener === t);
      if (s >= 0) r.splice(s, 1);
      return this;
    }
    once(e, t) {
      return ((Ps(this, See, "f")[e] || (Ps(this, See, "f")[e] = [])).push({ listener: t, once: !0 }), this);
    }
    emitted(e) {
      return new Promise((t, r) => {
        if ((Ic(this, _Le, !0, "f"), e !== "error")) this.once("error", r);
        this.once(e, t);
      });
    }
    async done() {
      (Ic(this, _Le, !0, "f"), await Ps(this, NJe, "f"));
    }
    get currentMessage() {
      return Ps(this, mce, "f");
    }
    async finalMessage() {
      return (await this.done(), Ps(this, rR, "m", mSr).call(this));
    }
    async finalText() {
      return (await this.done(), Ps(this, rR, "m", OWi).call(this));
    }
    _emit(e, ...t) {
      if (Ps(this, BJe, "f")) return;
      if (e === "end") (Ic(this, BJe, !0, "f"), Ps(this, Rjt, "f").call(this));
      let r = Ps(this, See, "f")[e];
      if (r) ((Ps(this, See, "f")[e] = r.filter((s) => !s.once)), r.forEach(({ listener: s }) => s(...t)));
      if (e === "abort") {
        let s = t[0];
        if (!Ps(this, _Le, "f") && !r?.length) Promise.reject(s);
        (Ps(this, UJe, "f").call(this, s), Ps(this, FJe, "f").call(this, s), this._emit("end"));
        return;
      }
      if (e === "error") {
        let s = t[0];
        if (!Ps(this, _Le, "f") && !r?.length) Promise.reject(s);
        (Ps(this, UJe, "f").call(this, s), Ps(this, FJe, "f").call(this, s), this._emit("end"));
      }
    }
    _emitFinal() {
      if (this.receivedMessages.at(-1)) this._emit("finalMessage", Ps(this, rR, "m", mSr).call(this));
    }
    async _fromReadableStream(e, t) {
      let r = t?.signal,
        s;
      if (r) {
        if (r.aborted) this.controller.abort();
        ((s = this.controller.abort.bind(this.controller)), r.addEventListener("abort", s));
      }
      try {
        (Ps(this, rR, "m", hSr).call(this), this._connected(null));
        let a = zN.fromReadableStream(e, this.controller);
        for await (let H of a) Ps(this, rR, "m", LSr).call(this, H);
        if (a.controller.signal?.aborted) throw new SP();
        Ps(this, rR, "m", $Sr).call(this);
      } finally {
        if (r && s) r.removeEventListener("abort", s);
      }
    }
    [((mce = new WeakMap()),
    (OJe = new WeakMap()),
    (Bjt = new WeakMap()),
    (UJe = new WeakMap()),
    (NJe = new WeakMap()),
    (Rjt = new WeakMap()),
    (FJe = new WeakMap()),
    (See = new WeakMap()),
    (BJe = new WeakMap()),
    (Wjt = new WeakMap()),
    (Vjt = new WeakMap()),
    (_Le = new WeakMap()),
    (qjt = new WeakMap()),
    (Gjt = new WeakMap()),
    (_Sr = new WeakMap()),
    (rR = new WeakSet()),
    (mSr = function () {
      if (this.receivedMessages.length === 0)
        throw new Cu("stream ended without producing a Message with role=assistant");
      return this.receivedMessages.at(-1);
    }),
    (OWi = function () {
      if (this.receivedMessages.length === 0)
        throw new Cu("stream ended without producing a Message with role=assistant");
      let t = this.receivedMessages
        .at(-1)
        .content.filter((r) => r.type === "text")
        .map((r) => r.text);
      if (t.length === 0) throw new Cu("stream ended without producing a content block with type=text");
      return t.join(" ");
    }),
    (hSr = function () {
      if (this.ended) return;
      Ic(this, mce, void 0, "f");
    }),
    (LSr = function (t) {
      if (this.ended) return;
      let r = Ps(this, rR, "m", UWi).call(this, t);
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
              if (FWi(s) && s.input) this._emit("inputJson", t.delta.partial_json, s.input);
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
              BWi(t.delta);
          }
          break;
        }
        case "message_stop": {
          (this._addMessageParam(r), this._addMessage(r, !0));
          break;
        }
        case "content_block_stop": {
          this._emit("contentBlock", r.content.at(-1));
          break;
        }
        case "message_start": {
          Ic(this, mce, r, "f");
          break;
        }
        case "content_block_start":
        case "message_delta":
          break;
      }
    }),
    ($Sr = function () {
      if (this.ended) throw new Cu("stream has ended, this shouldn't happen");
      let t = Ps(this, mce, "f");
      if (!t) throw new Cu("request ended without sending any chunks");
      return (Ic(this, mce, void 0, "f"), t);
    }),
    (UWi = function (t) {
      let r = Ps(this, mce, "f");
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
            ((r.stop_reason = t.delta.stop_reason),
            (r.stop_sequence = t.delta.stop_sequence),
            (r.usage.output_tokens = t.usage.output_tokens),
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
          return (r.content.push({ ...t.content_block }), r);
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
              if (s && FWi(s)) {
                let a = s[NWi] || "";
                a += t.delta.partial_json;
                let H = { ...s };
                if ((Object.defineProperty(H, NWi, { value: a, enumerable: !1, writable: !0 }), a))
                  H.input = Pjt(a);
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
              BWi(t.delta);
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
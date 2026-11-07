
var vPt = ne(() => {
  nR();
  YVi();
  x7();
  SKe();
  $Tr();
  _Tr();
  Ece = class Ece extends PKe {
    constructor(e) {
      super();
      (gx.add(this),
        Uee.set(this, void 0),
        QPe.set(this, void 0),
        gce.set(this, void 0),
        wu(this, Uee, e, "f"),
        wu(this, QPe, [], "f"));
    }
    get currentChatCompletionSnapshot() {
      return us(this, gce, "f");
    }
    static fromReadableStream(e) {
      let t = new Ece(null);
      return (t._run(() => t._fromReadableStream(e)), t);
    }
    static createChatCompletion(e, t, r) {
      let s = new Ece(t);
      return (
        s._run(() =>
          s._runChatCompletion(
            e,
            { ...t, stream: !0 },
            { ...r, headers: { ...r?.headers, "X-Stainless-Helper-Method": "stream" } },
          ),
        ),
        s
      );
    }
    async _createChatCompletion(e, t, r) {
      super._createChatCompletion;
      let s = r?.signal;
      if (s) {
        if (s.aborted) this.controller.abort();
        s.addEventListener("abort", () => this.controller.abort());
      }
      us(this, gx, "m", gTr).call(this);
      let a = await e.chat.completions.create({ ...t, stream: !0 }, { ...r, signal: this.controller.signal });
      this._connected();
      for await (let H of a) us(this, gx, "m", ETr).call(this, H);
      if (a.controller.signal?.aborted) throw new hx();
      return this._addChatCompletion(us(this, gx, "m", SPt).call(this));
    }
    async _fromReadableStream(e, t) {
      let r = t?.signal;
      if (r) {
        if (r.aborted) this.controller.abort();
        r.addEventListener("abort", () => this.controller.abort());
      }
      (us(this, gx, "m", gTr).call(this), this._connected());
      let s = r9.fromReadableStream(e, this.controller),
        a;
      for await (let H of s) {
        if (a && a !== H.id) this._addChatCompletion(us(this, gx, "m", SPt).call(this));
        (us(this, gx, "m", ETr).call(this, H), (a = H.id));
      }
      if (s.controller.signal?.aborted) throw new hx();
      return this._addChatCompletion(us(this, gx, "m", SPt).call(this));
    }
    [((Uee = new WeakMap()),
    (QPe = new WeakMap()),
    (gce = new WeakMap()),
    (gx = new WeakSet()),
    (gTr = function () {
      if (this.ended) return;
      wu(this, gce, void 0, "f");
    }),
    (xPt = function (t) {
      let r = us(this, QPe, "f")[t.index];
      if (r) return r;
      return (
        (r = {
          content_done: !1,
          refusal_done: !1,
          logprobs_content_done: !1,
          logprobs_refusal_done: !1,
          done_tool_calls: new Set(),
          current_tool_call_index: null,
        }),
        (us(this, QPe, "f")[t.index] = r),
        r
      );
    }),
    (ETr = function (t) {
      if (this.ended) return;
      let r = us(this, gx, "m", ZVi).call(this, t);
      this._emit("chunk", t, r);
      for (let s of t.choices) {
        let a = r.choices[s.index];
        if (s.delta.content != null && a.message?.role === "assistant" && a.message?.content)
          (this._emit("content", s.delta.content, a.message.content),
            this._emit("content.delta", {
              delta: s.delta.content,
              snapshot: a.message.content,
              parsed: a.message.parsed,
            }));
        if (s.delta.refusal != null && a.message?.role === "assistant" && a.message?.refusal)
          this._emit("refusal.delta", { delta: s.delta.refusal, snapshot: a.message.refusal });
        if (s.logprobs?.content != null && a.message?.role === "assistant")
          this._emit("logprobs.content.delta", {
            content: s.logprobs?.content,
            snapshot: a.logprobs?.content ?? [],
          });
        if (s.logprobs?.refusal != null && a.message?.role === "assistant")
          this._emit("logprobs.refusal.delta", {
            refusal: s.logprobs?.refusal,
            snapshot: a.logprobs?.refusal ?? [],
          });
        let H = us(this, gx, "m", xPt).call(this, a);
        if (a.finish_reason) {
          if ((us(this, gx, "m", DTr).call(this, a), H.current_tool_call_index != null))
            us(this, gx, "m", ITr).call(this, a, H.current_tool_call_index);
        }
        for (let u of s.delta.tool_calls ?? []) {
          if (H.current_tool_call_index !== u.index) {
            if ((us(this, gx, "m", DTr).call(this, a), H.current_tool_call_index != null))
              us(this, gx, "m", ITr).call(this, a, H.current_tool_call_index);
          }
          H.current_tool_call_index = u.index;
        }
        for (let u of s.delta.tool_calls ?? []) {
          let f = a.message.tool_calls?.[u.index];
          if (!f?.type) continue;
          if (f?.type === "function")
            this._emit("tool_calls.function.arguments.delta", {
              name: f.function?.name,
              index: u.index,
              arguments: f.function.arguments,
              parsed_arguments: f.function.parsed_arguments,
              arguments_delta: u.function?.arguments ?? "",
            });
          else t7i(f?.type);
        }
      }
    }),
    (ITr = function (t, r) {
      if (us(this, gx, "m", xPt).call(this, t).done_tool_calls.has(r)) return;
      let a = t.message.tool_calls?.[r];
      if (!a) throw Error("no tool call snapshot");
      if (!a.type) throw Error("tool call snapshot missing `type`");
      if (a.type === "function") {
        let H = us(this, Uee, "f")?.tools?.find((u) => yKe(u) && u.function.name === a.function.name);
        this._emit("tool_calls.function.arguments.done", {
          name: a.function.name,
          index: r,
          arguments: a.function.arguments,
          parsed_arguments: yLe(H)
            ? H.$parseRaw(a.function.arguments)
            : H?.function.strict
              ? JSON.parse(a.function.arguments)
              : null,
        });
      } else t7i(a.type);
    }),
    (DTr = function (t) {
      let r = us(this, gx, "m", xPt).call(this, t);
      if (t.message.content && !r.content_done) {
        r.content_done = !0;
        let s = us(this, gx, "m", yTr).call(this);
        this._emit("content.done", {
          content: t.message.content,
          parsed: s ? s.$parseRaw(t.message.content) : null,
        });
      }
      if (t.message.refusal && !r.refusal_done)
        ((r.refusal_done = !0), this._emit("refusal.done", { refusal: t.message.refusal }));
      if (t.logprobs?.content && !r.logprobs_content_done)
        ((r.logprobs_content_done = !0),
          this._emit("logprobs.content.done", { content: t.logprobs.content }));
      if (t.logprobs?.refusal && !r.logprobs_refusal_done)
        ((r.logprobs_refusal_done = !0),
          this._emit("logprobs.refusal.done", { refusal: t.logprobs.refusal }));
    }),
    (SPt = function () {
      if (this.ended) throw new bc("stream has ended, this shouldn't happen");
      let t = us(this, gce, "f");
      if (!t) throw new bc("request ended without sending any chunks");
      return (wu(this, gce, void 0, "f"), wu(this, QPe, [], "f"), m3a(t, us(this, Uee, "f")));
    }),
    (yTr = function () {
      let t = us(this, Uee, "f")?.response_format;
      if (MKe(t)) return t;
      return null;
    }),
    (ZVi = function (t) {
      var r, s, a, H;
      let u = us(this, gce, "f"),
        { choices: f, ...d } = t;
      if (!u) u = wu(this, gce, { ...d, choices: [] }, "f");
      else Object.assign(u, d);
      for (let { delta: _, finish_reason: L, index: I, logprobs: D = null, ...S } of t.choices) {
        let T = u.choices[I];
        if (!T) T = u.choices[I] = { finish_reason: L, index: I, message: {}, logprobs: D, ...S };
        if (D)
          if (!T.logprobs) T.logprobs = Object.assign({}, D);
          else {
            let { content: se, refusal: ae, ...z } = D;
            if ((e7i(z), Object.assign(T.logprobs, z), se))
              ((r = T.logprobs).content ?? (r.content = []), T.logprobs.content.push(...se));
            if (ae) ((s = T.logprobs).refusal ?? (s.refusal = []), T.logprobs.refusal.push(...ae));
          }
        if (L) {
          if (((T.finish_reason = L), us(this, Uee, "f") && ATr(us(this, Uee, "f")))) {
            if (L === "length") throw new mKe();
            if (L === "content_filter") throw new _Ke();
          }
        }
        if ((Object.assign(T, S), !_)) continue;
        let { content: C, refusal: O, function_call: B, role: V, tool_calls: q, ...Z } = _;
        if ((e7i(Z), Object.assign(T.message, Z), O)) T.message.refusal = (T.message.refusal || "") + O;
        if (V) T.message.role = V;
        if (B)
          if (!T.message.function_call) T.message.function_call = B;
          else {
            if (B.name) T.message.function_call.name = B.name;
            if (B.arguments)
              ((a = T.message.function_call).arguments ?? (a.arguments = ""),
                (T.message.function_call.arguments += B.arguments));
          }
        if (C) {
          if (
            ((T.message.content = (T.message.content || "") + C),
            !T.message.refusal && us(this, gx, "m", yTr).call(this))
          )
            T.message.parsed = LTr(T.message.content);
        }
        if (q) {
          if (!T.message.tool_calls) T.message.tool_calls = [];
          for (let { index: se, id: ae, type: z, function: Ae, ...le } of q) {
            let Be = (H = T.message.tool_calls)[se] ?? (H[se] = {});
            if ((Object.assign(Be, le), ae)) Be.id = ae;
            if (z) Be.type = z;
            if (Ae) Be.function ?? (Be.function = { name: Ae.name ?? "", arguments: "" });
            if (Ae?.name) Be.function.name = Ae.name;
            if (Ae?.arguments) {
              if (((Be.function.arguments += Ae.arguments), WVi(us(this, Uee, "f"), Be)))
                Be.function.parsed_arguments = LTr(Be.function.arguments);
            }
          }
        }
      }
      return u;
    }),
    Symbol.asyncIterator)]() {
      let e = [],
        t = [],
        r = !1;
      return (
        this.on("chunk", (s) => {
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
      return new r9(this[Symbol.asyncIterator].bind(this), this.controller).toReadableStream();
    }
  };
});
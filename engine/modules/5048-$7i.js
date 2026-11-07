
var $7i = ne(() => {
  nR();
  x7();
  yPt();
  zvr();
  UPt = class UPt extends MLe {
    constructor(e) {
      super();
      (mCe.add(this),
        kPt.set(this, void 0),
        Mce.set(this, void 0),
        OPt.set(this, void 0),
        wu(this, kPt, e, "f"));
    }
    static createResponse(e, t, r) {
      let s = new UPt(t);
      return (
        s._run(() =>
          s._createOrRetrieveResponse(e, t, {
            ...r,
            headers: { ...r?.headers, "X-Stainless-Helper-Method": "stream" },
          }),
        ),
        s
      );
    }
    async _createOrRetrieveResponse(e, t, r) {
      let s = r?.signal;
      if (s) {
        if (s.aborted) this.controller.abort();
        s.addEventListener("abort", () => this.controller.abort());
      }
      us(this, mCe, "m", m7i).call(this);
      let a,
        H = null;
      if ("response_id" in t)
        ((a = await e.responses.retrieve(
          t.response_id,
          { stream: !0 },
          { ...r, signal: this.controller.signal, stream: !0 },
        )),
          (H = t.starting_after ?? null));
      else a = await e.responses.create({ ...t, stream: !0 }, { ...r, signal: this.controller.signal });
      this._connected();
      for await (let u of a) us(this, mCe, "m", _7i).call(this, u, H);
      if (a.controller.signal?.aborted) throw new hx();
      return us(this, mCe, "m", h7i).call(this);
    }
    [((kPt = new WeakMap()),
    (Mce = new WeakMap()),
    (OPt = new WeakMap()),
    (mCe = new WeakSet()),
    (m7i = function () {
      if (this.ended) return;
      wu(this, Mce, void 0, "f");
    }),
    (_7i = function (t, r) {
      if (this.ended) return;
      let s = (H, u) => {
          if (r == null || u.sequence_number > r) this._emit(H, u);
        },
        a = us(this, mCe, "m", L7i).call(this, t);
      switch ((s("event", t), t.type)) {
        case "response.output_text.delta": {
          let H = a.output[t.output_index];
          if (!H) throw new bc(`missing output at index ${t.output_index}`);
          if (H.type === "message") {
            let u = H.content[t.content_index];
            if (!u) throw new bc(`missing content at index ${t.content_index}`);
            if (u.type !== "output_text") throw new bc(`expected content to be 'output_text', got ${u.type}`);
            s("response.output_text.delta", { ...t, snapshot: u.text });
          }
          break;
        }
        case "response.function_call_arguments.delta": {
          let H = a.output[t.output_index];
          if (!H) throw new bc(`missing output at index ${t.output_index}`);
          if (H.type === "function_call")
            s("response.function_call_arguments.delta", { ...t, snapshot: H.arguments });
          break;
        }
        default:
          s(t.type, t);
          break;
      }
    }),
    (h7i = function () {
      if (this.ended) throw new bc("stream has ended, this shouldn't happen");
      let t = us(this, Mce, "f");
      if (!t) throw new bc("request ended without sending any events");
      wu(this, Mce, void 0, "f");
      let r = SWa(t, us(this, kPt, "f"));
      return (wu(this, OPt, r, "f"), r);
    }),
    (L7i = function (t) {
      let r = us(this, Mce, "f");
      if (!r) {
        if (t.type !== "response.created")
          throw new bc(`When snapshot hasn't been set yet, expected 'response.created' event, got ${t.type}`);
        return ((r = wu(this, Mce, t.response, "f")), r);
      }
      switch (t.type) {
        case "response.output_item.added": {
          r.output.push(t.item);
          break;
        }
        case "response.content_part.added": {
          let s = r.output[t.output_index];
          if (!s) throw new bc(`missing output at index ${t.output_index}`);
          let a = s.type,
            H = t.part;
          if (a === "message" && H.type !== "reasoning_text") s.content.push(H);
          else if (a === "reasoning" && H.type === "reasoning_text") {
            if (!s.content) s.content = [];
            s.content.push(H);
          }
          break;
        }
        case "response.output_text.delta": {
          let s = r.output[t.output_index];
          if (!s) throw new bc(`missing output at index ${t.output_index}`);
          if (s.type === "message") {
            let a = s.content[t.content_index];
            if (!a) throw new bc(`missing content at index ${t.content_index}`);
            if (a.type !== "output_text") throw new bc(`expected content to be 'output_text', got ${a.type}`);
            a.text += t.delta;
          }
          break;
        }
        case "response.function_call_arguments.delta": {
          let s = r.output[t.output_index];
          if (!s) throw new bc(`missing output at index ${t.output_index}`);
          if (s.type === "function_call") s.arguments += t.delta;
          break;
        }
        case "response.reasoning_text.delta": {
          let s = r.output[t.output_index];
          if (!s) throw new bc(`missing output at index ${t.output_index}`);
          if (s.type === "reasoning") {
            let a = s.content?.[t.content_index];
            if (!a) throw new bc(`missing content at index ${t.content_index}`);
            if (a.type !== "reasoning_text")
              throw new bc(`expected content to be 'reasoning_text', got ${a.type}`);
            a.text += t.delta;
          }
          break;
        }
        case "response.completed": {
          wu(this, Mce, t.response, "f");
          break;
        }
      }
      return r;
    }),
    Symbol.asyncIterator)]() {
      let e = [],
        t = [],
        r = !1;
      return (
        this.on("event", (s) => {
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
    async finalResponse() {
      await this.done();
      let e = us(this, OPt, "f");
      if (!e) throw new bc("stream ended without producing a ChatCompletion");
      return e;
    }
  };
});
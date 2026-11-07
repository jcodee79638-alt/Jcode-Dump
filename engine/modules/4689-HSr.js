
var HSr = ne(() => {
  Iee();
  ZB();
  eR();
  CJe = class CJe {
    constructor(e, t, r) {
      (bJe.add(this),
        (this.client = e),
        PPe.set(this, !1),
        dLe.set(this, !1),
        _x.set(this, void 0),
        jJe.set(this, void 0),
        QN.set(this, void 0),
        xee.set(this, void 0),
        dce.set(this, void 0),
        PJe.set(this, 0),
        Ic(this, _x, { params: { ...t, messages: structuredClone(t.messages) } }, "f"),
        Ic(this, jJe, { ...r, headers: Zf([{ "x-stainless-helper": "BetaToolRunner" }, r?.headers]) }, "f"),
        Ic(this, dce, wWi(), "f"));
    }
    async *[((PPe = new WeakMap()),
    (dLe = new WeakMap()),
    (_x = new WeakMap()),
    (jJe = new WeakMap()),
    (QN = new WeakMap()),
    (xee = new WeakMap()),
    (dce = new WeakMap()),
    (PJe = new WeakMap()),
    (bJe = new WeakSet()),
    (CWi = async function () {
      let t = Ps(this, _x, "f").params.compactionControl;
      if (!t || !t.enabled) return !1;
      let r = 0;
      if (Ps(this, QN, "f") !== void 0)
        try {
          let d = await Ps(this, QN, "f");
          r =
            d.usage.input_tokens +
            (d.usage.cache_creation_input_tokens ?? 0) +
            (d.usage.cache_read_input_tokens ?? 0) +
            d.usage.output_tokens;
        } catch {
          return !1;
        }
      let s = t.contextTokenThreshold ?? jWi;
      if (r < s) return !1;
      let a = t.model ?? Ps(this, _x, "f").params.model,
        H = t.summaryPrompt ?? PWi,
        u = Ps(this, _x, "f").params.messages;
      if (u[u.length - 1].role === "assistant") {
        let d = u[u.length - 1];
        if (Array.isArray(d.content)) {
          let _ = d.content.filter((L) => L.type !== "tool_use");
          if (_.length === 0) u.pop();
          else d.content = _;
        }
      }
      let f = await this.client.beta.messages.create(
        {
          model: a,
          messages: [...u, { role: "user", content: [{ type: "text", text: H }] }],
          max_tokens: Ps(this, _x, "f").params.max_tokens,
        },
        { headers: { "x-stainless-helper": "compaction" } },
      );
      if (f.content[0]?.type !== "text") throw new Cu("Expected text response for compaction");
      return ((Ps(this, _x, "f").params.messages = [{ role: "user", content: f.content }]), !0);
    }),
    Symbol.asyncIterator)]() {
      var e;
      if (Ps(this, PPe, "f")) throw new Cu("Cannot iterate over a consumed stream");
      (Ic(this, PPe, !0, "f"), Ic(this, dLe, !0, "f"), Ic(this, xee, void 0, "f"));
      try {
        while (!0) {
          let t;
          try {
            if (
              Ps(this, _x, "f").params.max_iterations &&
              Ps(this, PJe, "f") >= Ps(this, _x, "f").params.max_iterations
            )
              break;
            (Ic(this, dLe, !1, "f"),
              Ic(this, xee, void 0, "f"),
              Ic(this, PJe, ((e = Ps(this, PJe, "f")), e++, e), "f"),
              Ic(this, QN, void 0, "f"));
            let { max_iterations: r, compactionControl: s, ...a } = Ps(this, _x, "f").params;
            if (a.stream)
              ((t = this.client.beta.messages.stream({ ...a }, Ps(this, jJe, "f"))),
                Ic(this, QN, t.finalMessage(), "f"),
                Ps(this, QN, "f").catch(() => {}),
                yield t);
            else
              (Ic(this, QN, this.client.beta.messages.create({ ...a, stream: !1 }, Ps(this, jJe, "f")), "f"),
                yield Ps(this, QN, "f"));
            if (!(await Ps(this, bJe, "m", CWi).call(this))) {
              if (!Ps(this, dLe, "f")) {
                let { role: f, content: d } = await Ps(this, QN, "f");
                Ps(this, _x, "f").params.messages.push({ role: f, content: d });
              }
              let u = await Ps(this, bJe, "m", aSr).call(this, Ps(this, _x, "f").params.messages.at(-1));
              if (u) Ps(this, _x, "f").params.messages.push(u);
              else if (!Ps(this, dLe, "f")) break;
            }
          } finally {
            if (t) t.abort();
          }
        }
        if (!Ps(this, QN, "f")) throw new Cu("ToolRunner concluded without a message from the server");
        Ps(this, dce, "f").resolve(await Ps(this, QN, "f"));
      } catch (t) {
        throw (
          Ic(this, PPe, !1, "f"),
          Ps(this, dce, "f").promise.catch(() => {}),
          Ps(this, dce, "f").reject(t),
          Ic(this, dce, wWi(), "f"),
          t
        );
      }
    }
    setMessagesParams(e) {
      if (typeof e === "function") Ps(this, _x, "f").params = e(Ps(this, _x, "f").params);
      else Ps(this, _x, "f").params = e;
      (Ic(this, dLe, !0, "f"), Ic(this, xee, void 0, "f"));
    }
    async generateToolResponse() {
      let e = (await Ps(this, QN, "f")) ?? this.params.messages.at(-1);
      if (!e) return null;
      return Ps(this, bJe, "m", aSr).call(this, e);
    }
    done() {
      return Ps(this, dce, "f").promise;
    }
    async runUntilDone() {
      if (!Ps(this, PPe, "f")) for await (let e of this);
      return this.done();
    }
    get params() {
      return Ps(this, _x, "f").params;
    }
    pushMessages(...e) {
      this.setMessagesParams((t) => ({ ...t, messages: [...t.messages, ...e] }));
    }
    then(e, t) {
      return this.runUntilDone().then(e, t);
    }
  };
  aSr = async function (t) {
    if (Ps(this, xee, "f") !== void 0) return Ps(this, xee, "f");
    return (Ic(this, xee, aRa(Ps(this, _x, "f").params, t), "f"), Ps(this, xee, "f"));
  };
});
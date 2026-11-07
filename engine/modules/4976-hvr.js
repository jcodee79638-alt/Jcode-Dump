
var hvr = ne(() => {
  nR();
  $Tr();
  x7();
  yPt();
  pze();
  Dce = class Dce extends MLe {
    constructor() {
      super(...arguments);
      ($b.add(this),
        _vr.set(this, []),
        AJ.set(this, {}),
        bPt.set(this, {}),
        S7.set(this, void 0),
        CLe.set(this, void 0),
        nCe.set(this, void 0),
        jLe.set(this, void 0),
        CPt.set(this, void 0),
        n9.set(this, void 0),
        jPt.set(this, void 0),
        PPt.set(this, void 0),
        _ze.set(this, void 0));
    }
    [((_vr = new WeakMap()),
    (AJ = new WeakMap()),
    (bPt = new WeakMap()),
    (S7 = new WeakMap()),
    (CLe = new WeakMap()),
    (nCe = new WeakMap()),
    (jLe = new WeakMap()),
    (CPt = new WeakMap()),
    (n9 = new WeakMap()),
    (jPt = new WeakMap()),
    (PPt = new WeakMap()),
    (_ze = new WeakMap()),
    ($b = new WeakSet()),
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
    static fromReadableStream(e) {
      let t = new PLe();
      return (t._run(() => t._fromReadableStream(e)), t);
    }
    async _fromReadableStream(e, t) {
      let r = t?.signal;
      if (r) {
        if (r.aborted) this.controller.abort();
        r.addEventListener("abort", () => this.controller.abort());
      }
      this._connected();
      let s = r9.fromReadableStream(e, this.controller);
      for await (let a of s) us(this, $b, "m", dze).call(this, a);
      if (s.controller.signal?.aborted) throw new hx();
      return this._addRun(us(this, $b, "m", mze).call(this));
    }
    toReadableStream() {
      return new r9(this[Symbol.asyncIterator].bind(this), this.controller).toReadableStream();
    }
    static createToolAssistantStream(e, t, r, s) {
      let a = new PLe();
      return (
        a._run(() =>
          a._runToolAssistantStream(e, t, r, {
            ...s,
            headers: { ...s?.headers, "X-Stainless-Helper-Method": "stream" },
          }),
        ),
        a
      );
    }
    async _createToolAssistantStream(e, t, r, s) {
      let a = s?.signal;
      if (a) {
        if (a.aborted) this.controller.abort();
        a.addEventListener("abort", () => this.controller.abort());
      }
      let H = { ...r, stream: !0 },
        u = await e.submitToolOutputs(t, H, { ...s, signal: this.controller.signal });
      this._connected();
      for await (let f of u) us(this, $b, "m", dze).call(this, f);
      if (u.controller.signal?.aborted) throw new hx();
      return this._addRun(us(this, $b, "m", mze).call(this));
    }
    static createThreadAssistantStream(e, t, r) {
      let s = new PLe();
      return (
        s._run(() =>
          s._threadAssistantStream(e, t, {
            ...r,
            headers: { ...r?.headers, "X-Stainless-Helper-Method": "stream" },
          }),
        ),
        s
      );
    }
    static createAssistantStream(e, t, r, s) {
      let a = new PLe();
      return (
        a._run(() =>
          a._runAssistantStream(e, t, r, {
            ...s,
            headers: { ...s?.headers, "X-Stainless-Helper-Method": "stream" },
          }),
        ),
        a
      );
    }
    currentEvent() {
      return us(this, jPt, "f");
    }
    currentRun() {
      return us(this, PPt, "f");
    }
    currentMessageSnapshot() {
      return us(this, S7, "f");
    }
    currentRunStepSnapshot() {
      return us(this, _ze, "f");
    }
    async finalRunSteps() {
      return (await this.done(), Object.values(us(this, AJ, "f")));
    }
    async finalMessages() {
      return (await this.done(), Object.values(us(this, bPt, "f")));
    }
    async finalRun() {
      if ((await this.done(), !us(this, CLe, "f"))) throw Error("Final run was not received.");
      return us(this, CLe, "f");
    }
    async _createThreadAssistantStream(e, t, r) {
      let s = r?.signal;
      if (s) {
        if (s.aborted) this.controller.abort();
        s.addEventListener("abort", () => this.controller.abort());
      }
      let a = { ...t, stream: !0 },
        H = await e.createAndRun(a, { ...r, signal: this.controller.signal });
      this._connected();
      for await (let u of H) us(this, $b, "m", dze).call(this, u);
      if (H.controller.signal?.aborted) throw new hx();
      return this._addRun(us(this, $b, "m", mze).call(this));
    }
    async _createAssistantStream(e, t, r, s) {
      let a = s?.signal;
      if (a) {
        if (a.aborted) this.controller.abort();
        a.addEventListener("abort", () => this.controller.abort());
      }
      let H = { ...r, stream: !0 },
        u = await e.create(t, H, { ...s, signal: this.controller.signal });
      this._connected();
      for await (let f of u) us(this, $b, "m", dze).call(this, f);
      if (u.controller.signal?.aborted) throw new hx();
      return this._addRun(us(this, $b, "m", mze).call(this));
    }
    static accumulateDelta(e, t) {
      for (let [r, s] of Object.entries(t)) {
        if (!e.hasOwnProperty(r)) {
          e[r] = s;
          continue;
        }
        let a = e[r];
        if (a === null || a === void 0) {
          e[r] = s;
          continue;
        }
        if (r === "index" || r === "type") {
          e[r] = s;
          continue;
        }
        if (typeof a === "string" && typeof s === "string") a += s;
        else if (typeof a === "number" && typeof s === "number") a += s;
        else if (hKe(a) && hKe(s)) a = this.accumulateDelta(a, s);
        else if (Array.isArray(a) && Array.isArray(s)) {
          if (a.every((H) => typeof H === "string" || typeof H === "number")) {
            a.push(...s);
            continue;
          }
          for (let H of s) {
            if (!hKe(H)) throw Error(`Expected array delta entry to be an object but got: ${H}`);
            let u = H.index;
            if (u == null)
              throw (console.error(H), Error("Expected array delta entry to have an `index` property"));
            if (typeof u !== "number")
              throw Error(`Expected array delta entry \`index\` property to be a number but got ${u}`);
            let f = a[u];
            if (f == null) a.push(H);
            else a[u] = this.accumulateDelta(f, H);
          }
          continue;
        } else throw Error(`Unhandled record type: ${r}, deltaValue: ${s}, accValue: ${a}`);
        e[r] = a;
      }
      return e;
    }
    _addRun(e) {
      return e;
    }
    async _threadAssistantStream(e, t, r) {
      return await this._createThreadAssistantStream(t, e, r);
    }
    async _runAssistantStream(e, t, r, s) {
      return await this._createAssistantStream(t, e, r, s);
    }
    async _runToolAssistantStream(e, t, r, s) {
      return await this._createToolAssistantStream(t, e, r, s);
    }
  };
  ((PLe = Dce),
    (dze = function (t) {
      if (this.ended) return;
      switch ((wu(this, jPt, t, "f"), us(this, $b, "m", A7i).call(this, t), t.event)) {
        case "thread.created":
          break;
        case "thread.run.created":
        case "thread.run.queued":
        case "thread.run.in_progress":
        case "thread.run.requires_action":
        case "thread.run.completed":
        case "thread.run.incomplete":
        case "thread.run.failed":
        case "thread.run.cancelling":
        case "thread.run.cancelled":
        case "thread.run.expired":
          us(this, $b, "m", p7i).call(this, t);
          break;
        case "thread.run.step.created":
        case "thread.run.step.in_progress":
        case "thread.run.step.delta":
        case "thread.run.step.completed":
        case "thread.run.step.failed":
        case "thread.run.step.cancelled":
        case "thread.run.step.expired":
          us(this, $b, "m", c7i).call(this, t);
          break;
        case "thread.message.created":
        case "thread.message.in_progress":
        case "thread.message.delta":
        case "thread.message.completed":
        case "thread.message.incomplete":
          us(this, $b, "m", H7i).call(this, t);
          break;
        case "error":
          throw Error("Encountered an error event in event processing - errors should be processed earlier");
        default:
          sWa(t);
      }
    }),
    (mze = function () {
      if (this.ended) throw new bc("stream has ended, this shouldn't happen");
      if (!us(this, CLe, "f")) throw Error("Final run has not been received");
      return us(this, CLe, "f");
    }),
    (H7i = function (t) {
      let [r, s] = us(this, $b, "m", l7i).call(this, t, us(this, S7, "f"));
      (wu(this, S7, r, "f"), (us(this, bPt, "f")[r.id] = r));
      for (let a of s) {
        let H = r.content[a.index];
        if (H?.type == "text") this._emit("textCreated", H.text);
      }
      switch (t.event) {
        case "thread.message.created":
          this._emit("messageCreated", t.data);
          break;
        case "thread.message.in_progress":
          break;
        case "thread.message.delta":
          if ((this._emit("messageDelta", t.data.delta, r), t.data.delta.content))
            for (let a of t.data.delta.content) {
              if (a.type == "text" && a.text) {
                let H = a.text,
                  u = r.content[a.index];
                if (u && u.type == "text") this._emit("textDelta", H, u.text);
                else throw Error("The snapshot associated with this text delta is not text or missing");
              }
              if (a.index != us(this, nCe, "f")) {
                if (us(this, jLe, "f"))
                  switch (us(this, jLe, "f").type) {
                    case "text":
                      this._emit("textDone", us(this, jLe, "f").text, us(this, S7, "f"));
                      break;
                    case "image_file":
                      this._emit("imageFileDone", us(this, jLe, "f").image_file, us(this, S7, "f"));
                      break;
                  }
                wu(this, nCe, a.index, "f");
              }
              wu(this, jLe, r.content[a.index], "f");
            }
          break;
        case "thread.message.completed":
        case "thread.message.incomplete":
          if (us(this, nCe, "f") !== void 0) {
            let a = t.data.content[us(this, nCe, "f")];
            if (a)
              switch (a.type) {
                case "image_file":
                  this._emit("imageFileDone", a.image_file, us(this, S7, "f"));
                  break;
                case "text":
                  this._emit("textDone", a.text, us(this, S7, "f"));
                  break;
              }
          }
          if (us(this, S7, "f")) this._emit("messageDone", t.data);
          wu(this, S7, void 0, "f");
      }
    }),
    (c7i = function (t) {
      let r = us(this, $b, "m", u7i).call(this, t);
      switch ((wu(this, _ze, r, "f"), t.event)) {
        case "thread.run.step.created":
          this._emit("runStepCreated", t.data);
          break;
        case "thread.run.step.delta":
          let s = t.data.delta;
          if (
            s.step_details &&
            s.step_details.type == "tool_calls" &&
            s.step_details.tool_calls &&
            r.step_details.type == "tool_calls"
          )
            for (let H of s.step_details.tool_calls)
              if (H.index == us(this, CPt, "f"))
                this._emit("toolCallDelta", H, r.step_details.tool_calls[H.index]);
              else {
                if (us(this, n9, "f")) this._emit("toolCallDone", us(this, n9, "f"));
                if (
                  (wu(this, CPt, H.index, "f"),
                  wu(this, n9, r.step_details.tool_calls[H.index], "f"),
                  us(this, n9, "f"))
                )
                  this._emit("toolCallCreated", us(this, n9, "f"));
              }
          this._emit("runStepDelta", t.data.delta, r);
          break;
        case "thread.run.step.completed":
        case "thread.run.step.failed":
        case "thread.run.step.cancelled":
        case "thread.run.step.expired":
          if ((wu(this, _ze, void 0, "f"), t.data.step_details.type == "tool_calls")) {
            if (us(this, n9, "f")) (this._emit("toolCallDone", us(this, n9, "f")), wu(this, n9, void 0, "f"));
          }
          this._emit("runStepDone", t.data, r);
          break;
        case "thread.run.step.in_progress":
          break;
      }
    }),
    (A7i = function (t) {
      (us(this, _vr, "f").push(t), this._emit("event", t));
    }),
    (u7i = function (t) {
      switch (t.event) {
        case "thread.run.step.created":
          return ((us(this, AJ, "f")[t.data.id] = t.data), t.data);
        case "thread.run.step.delta":
          let r = us(this, AJ, "f")[t.data.id];
          if (!r) throw Error("Received a RunStepDelta before creation of a snapshot");
          let s = t.data;
          if (s.delta) {
            let a = PLe.accumulateDelta(r, s.delta);
            us(this, AJ, "f")[t.data.id] = a;
          }
          return us(this, AJ, "f")[t.data.id];
        case "thread.run.step.completed":
        case "thread.run.step.failed":
        case "thread.run.step.cancelled":
        case "thread.run.step.expired":
        case "thread.run.step.in_progress":
          us(this, AJ, "f")[t.data.id] = t.data;
          break;
      }
      if (us(this, AJ, "f")[t.data.id]) return us(this, AJ, "f")[t.data.id];
      throw Error("No snapshot available");
    }),
    (l7i = function (t, r) {
      let s = [];
      switch (t.event) {
        case "thread.message.created":
          return [t.data, s];
        case "thread.message.delta":
          if (!r)
            throw Error(
              "Received a delta with no existing snapshot (there should be one from message creation)",
            );
          let a = t.data;
          if (a.delta.content)
            for (let H of a.delta.content)
              if (H.index in r.content) {
                let u = r.content[H.index];
                r.content[H.index] = us(this, $b, "m", f7i).call(this, H, u);
              } else ((r.content[H.index] = H), s.push(H));
          return [r, s];
        case "thread.message.in_progress":
        case "thread.message.completed":
        case "thread.message.incomplete":
          if (r) return [r, s];
          else throw Error("Received thread message event with no existing snapshot");
      }
      throw Error("Tried to accumulate a non-message event");
    }),
    (f7i = function (t, r) {
      return PLe.accumulateDelta(r, t);
    }),
    (p7i = function (t) {
      switch ((wu(this, PPt, t.data, "f"), t.event)) {
        case "thread.run.created":
          break;
        case "thread.run.queued":
          break;
        case "thread.run.in_progress":
          break;
        case "thread.run.requires_action":
        case "thread.run.cancelled":
        case "thread.run.failed":
        case "thread.run.completed":
        case "thread.run.expired":
        case "thread.run.incomplete":
          if ((wu(this, CLe, t.data, "f"), us(this, n9, "f")))
            (this._emit("toolCallDone", us(this, n9, "f")), wu(this, n9, void 0, "f"));
          break;
        case "thread.run.cancelling":
          break;
      }
    }));
});
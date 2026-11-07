
var ESr = ne(() => {
  RWi();
  gSr();
  gSr();
  Qxr();
  hLe = class hLe extends PI {
    constructor() {
      super(...arguments);
      this.batches = new WJe(this._client);
    }
    create(e, t) {
      if (e.model in WWi)
        console.warn(`The model '${e.model}' is deprecated and will reach end-of-life on ${WWi[e.model]}
Please migrate to a newer model. Visit https://docs.anthropic.com/en/docs/resources/model-deprecations for more information.`);
      let r = this._client._options.timeout;
      if (!e.stream && r == null) {
        let s = jjt[e.model] ?? void 0;
        r = this._client.calculateNonstreamingTimeout(e.max_tokens, s);
      }
      return this._client.post("/v1/messages", {
        body: e,
        timeout: r ?? 600000,
        ...t,
        stream: e.stream ?? !1,
      });
    }
    stream(e, t) {
      return RJe.createMessage(this, e, t);
    }
    countTokens(e, t) {
      return this._client.post("/v1/messages/count_tokens", { body: e, ...t });
    }
  };
  WWi = {
    "claude-1.3": "November 6th, 2024",
    "claude-1.3-100k": "November 6th, 2024",
    "claude-instant-1.1": "November 6th, 2024",
    "claude-instant-1.1-100k": "November 6th, 2024",
    "claude-instant-1.2": "November 6th, 2024",
    "claude-3-sonnet-20240229": "July 21st, 2025",
    "claude-3-opus-20240229": "January 5th, 2026",
    "claude-2.1": "July 21st, 2025",
    "claude-2.0": "July 21st, 2025",
    "claude-3-7-sonnet-latest": "February 19th, 2026",
    "claude-3-7-sonnet-20250219": "February 19th, 2026",
  };
  hLe.Batches = WJe;
});

var uSr = ne(() => {
  Qxr();
  eR();
  eSr();
  bWi();
  HSr();
  ASr();
  ASr();
  HSr();
  kWi = {
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
  mLe = class mLe extends PI {
    constructor() {
      super(...arguments);
      this.batches = new wJe(this._client);
    }
    create(e, t) {
      let { betas: r, ...s } = e;
      if (s.model in kWi)
        console.warn(`The model '${s.model}' is deprecated and will reach end-of-life on ${kWi[s.model]}
Please migrate to a newer model. Visit https://docs.anthropic.com/en/docs/resources/model-deprecations for more information.`);
      let a = this._client._options.timeout;
      if (!s.stream && a == null) {
        let H = jjt[s.model] ?? void 0;
        a = this._client.calculateNonstreamingTimeout(s.max_tokens, H);
      }
      return this._client.post("/v1/messages?beta=true", {
        body: s,
        timeout: a ?? 600000,
        ...t,
        headers: Zf([
          { ...(r?.toString() != null ? { "anthropic-beta": r?.toString() } : void 0) },
          t?.headers,
        ]),
        stream: e.stream ?? !1,
      });
    }
    parse(e, t) {
      return (
        (t = {
          ...t,
          headers: Zf([
            { "anthropic-beta": [...(e.betas ?? []), "structured-outputs-2025-11-13"].toString() },
            t?.headers,
          ]),
        }),
        this.create(e, t).then((r) => Zxr(r, e, { logger: this._client.logger ?? console }))
      );
    }
    stream(e, t) {
      return vJe.createMessage(this, e, t);
    }
    countTokens(e, t) {
      let { betas: r, ...s } = e;
      return this._client.post("/v1/messages/count_tokens?beta=true", {
        body: s,
        ...t,
        headers: Zf([
          { "anthropic-beta": [...(r ?? []), "token-counting-2024-11-01"].toString() },
          t?.headers,
        ]),
      });
    }
    toolRunner(e, t) {
      return new CJe(this._client, e, t);
    }
  };
  mLe.Batches = wJe;
  mLe.BetaToolRunner = CJe;
});
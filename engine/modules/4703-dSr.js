
var dSr = ne(() => {
  eR();
  kPe = class kPe extends PI {
    create(e, t) {
      let { betas: r, ...s } = e;
      return this._client.post("/v1/complete", {
        body: s,
        timeout: this._client._options.timeout ?? 600000,
        ...t,
        headers: Zf([
          { ...(r?.toString() != null ? { "anthropic-beta": r?.toString() } : void 0) },
          t?.headers,
        ]),
        stream: e.stream ?? !1,
      });
    }
  };
});
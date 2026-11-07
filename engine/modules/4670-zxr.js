
var zxr = ne(() => {
  rJ();
  eR();
  fce();
  EJe = class EJe extends PI {
    retrieve(e, t = {}, r) {
      let { betas: s } = t ?? {};
      return this._client.get(RE`/v1/models/${e}?beta=true`, {
        ...r,
        headers: Zf([
          { ...(s?.toString() != null ? { "anthropic-beta": s?.toString() } : void 0) },
          r?.headers,
        ]),
      });
    }
    list(e = {}, t) {
      let { betas: r, ...s } = e ?? {};
      return this._client.getAPIList("/v1/models?beta=true", y7, {
        query: s,
        ...t,
        headers: Zf([
          { ...(r?.toString() != null ? { "anthropic-beta": r?.toString() } : void 0) },
          t?.headers,
        ]),
      });
    }
  };
});
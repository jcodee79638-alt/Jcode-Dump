
var fSr = ne(() => {
  lSr();
  lSr();
  rJ();
  eR();
  vPe();
  fce();
  wPe = class wPe extends PI {
    constructor() {
      super(...arguments);
      this.versions = new kJe(this._client);
    }
    create(e = {}, t) {
      let { betas: r, ...s } = e ?? {};
      return this._client.post(
        "/v1/skills?beta=true",
        TPe(
          {
            body: s,
            ...t,
            headers: Zf([{ "anthropic-beta": [...(r ?? []), "skills-2025-10-02"].toString() }, t?.headers]),
          },
          this._client,
        ),
      );
    }
    retrieve(e, t = {}, r) {
      let { betas: s } = t ?? {};
      return this._client.get(RE`/v1/skills/${e}?beta=true`, {
        ...r,
        headers: Zf([{ "anthropic-beta": [...(s ?? []), "skills-2025-10-02"].toString() }, r?.headers]),
      });
    }
    list(e = {}, t) {
      let { betas: r, ...s } = e ?? {};
      return this._client.getAPIList("/v1/skills?beta=true", LJe, {
        query: s,
        ...t,
        headers: Zf([{ "anthropic-beta": [...(r ?? []), "skills-2025-10-02"].toString() }, t?.headers]),
      });
    }
    delete(e, t = {}, r) {
      let { betas: s } = t ?? {};
      return this._client.delete(RE`/v1/skills/${e}?beta=true`, {
        ...r,
        headers: Zf([{ "anthropic-beta": [...(s ?? []), "skills-2025-10-02"].toString() }, r?.headers]),
      });
    }
  };
  wPe.Versions = kJe;
});
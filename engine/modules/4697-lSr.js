
var lSr = ne(() => {
  rJ();
  eR();
  vPe();
  fce();
  kJe = class kJe extends PI {
    create(e, t = {}, r) {
      let { betas: s, ...a } = t ?? {};
      return this._client.post(
        RE`/v1/skills/${e}/versions?beta=true`,
        TPe(
          {
            body: a,
            ...r,
            headers: Zf([{ "anthropic-beta": [...(s ?? []), "skills-2025-10-02"].toString() }, r?.headers]),
          },
          this._client,
        ),
      );
    }
    retrieve(e, t, r) {
      let { skill_id: s, betas: a } = t;
      return this._client.get(RE`/v1/skills/${s}/versions/${e}?beta=true`, {
        ...r,
        headers: Zf([{ "anthropic-beta": [...(a ?? []), "skills-2025-10-02"].toString() }, r?.headers]),
      });
    }
    list(e, t = {}, r) {
      let { betas: s, ...a } = t ?? {};
      return this._client.getAPIList(RE`/v1/skills/${e}/versions?beta=true`, LJe, {
        query: a,
        ...r,
        headers: Zf([{ "anthropic-beta": [...(s ?? []), "skills-2025-10-02"].toString() }, r?.headers]),
      });
    }
    delete(e, t, r) {
      let { skill_id: s, betas: a } = t;
      return this._client.delete(RE`/v1/skills/${s}/versions/${e}?beta=true`, {
        ...r,
        headers: Zf([{ "anthropic-beta": [...(a ?? []), "skills-2025-10-02"].toString() }, r?.headers]),
      });
    }
  };
});
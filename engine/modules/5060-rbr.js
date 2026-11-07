
var rbr = ne(() => {
  tbr();
  tbr();
  kl();
  sR();
  uu();
  _Ce = class _Ce extends Ni {
    constructor() {
      super(...arguments);
      this.content = new bze(this._client);
    }
    create(e, t = {}, r) {
      return this._client.post(
        Cn`/skills/${e}/versions`,
        $ce({ body: t, ...r, __security: { bearerAuth: !0 } }, this._client),
      );
    }
    retrieve(e, t, r) {
      let { skill_id: s } = t;
      return this._client.get(Cn`/skills/${s}/versions/${e}`, { ...r, __security: { bearerAuth: !0 } });
    }
    list(e, t = {}, r) {
      return this._client.getAPIList(Cn`/skills/${e}/versions`, Ff, {
        query: t,
        ...r,
        __security: { bearerAuth: !0 },
      });
    }
    delete(e, t, r) {
      let { skill_id: s } = t;
      return this._client.delete(Cn`/skills/${s}/versions/${e}`, { ...r, __security: { bearerAuth: !0 } });
    }
  };
  _Ce.Content = bze;
});
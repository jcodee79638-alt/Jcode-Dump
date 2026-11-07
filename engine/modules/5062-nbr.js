
var nbr = ne(() => {
  ebr();
  ebr();
  rbr();
  rbr();
  kl();
  sR();
  uu();
  Sce = class Sce extends Ni {
    constructor() {
      super(...arguments);
      ((this.content = new vze(this._client)), (this.versions = new _Ce(this._client)));
    }
    create(e = {}, t) {
      return this._client.post(
        "/skills",
        $ce({ body: e, ...t, __security: { bearerAuth: !0 } }, this._client),
      );
    }
    retrieve(e, t) {
      return this._client.get(Cn`/skills/${e}`, { ...t, __security: { bearerAuth: !0 } });
    }
    update(e, t, r) {
      return this._client.post(Cn`/skills/${e}`, { body: t, ...r, __security: { bearerAuth: !0 } });
    }
    list(e = {}, t) {
      return this._client.getAPIList("/skills", Ff, { query: e, ...t, __security: { bearerAuth: !0 } });
    }
    delete(e, t) {
      return this._client.delete(Cn`/skills/${e}`, { ...t, __security: { bearerAuth: !0 } });
    }
  };
  Sce.Content = vze;
  Sce.Versions = _Ce;
});
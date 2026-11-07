
var QTr = ne(() => {
  zTr();
  zTr();
  kl();
  uu();
  eCe = class eCe extends Ni {
    constructor() {
      super(...arguments);
      this.roles = new rze(this._client);
    }
    create(e, t, r) {
      return this._client.post(Cn`/organization/projects/${e}/users`, {
        body: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    retrieve(e, t, r) {
      let { project_id: s } = t;
      return this._client.get(Cn`/organization/projects/${s}/users/${e}`, {
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    update(e, t, r) {
      let { project_id: s, ...a } = t;
      return this._client.post(Cn`/organization/projects/${s}/users/${e}`, {
        body: a,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    list(e, t = {}, r) {
      return this._client.getAPIList(Cn`/organization/projects/${e}/users`, T_, {
        query: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    delete(e, t, r) {
      let { project_id: s } = t;
      return this._client.delete(Cn`/organization/projects/${s}/users/${e}`, {
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
  };
  eCe.Roles = rze;
});
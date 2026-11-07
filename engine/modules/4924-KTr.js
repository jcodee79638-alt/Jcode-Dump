
var KTr = ne(() => {
  JTr();
  JTr();
  kl();
  uu();
  ZPe = class ZPe extends Ni {
    constructor() {
      super(...arguments);
      this.roles = new tze(this._client);
    }
    create(e, t, r) {
      return this._client.post(Cn`/organization/projects/${e}/groups`, {
        body: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    retrieve(e, t, r) {
      let { project_id: s, ...a } = t;
      return this._client.get(Cn`/organization/projects/${s}/groups/${e}`, {
        query: a,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    list(e, t = {}, r) {
      return this._client.getAPIList(Cn`/organization/projects/${e}/groups`, $x, {
        query: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    delete(e, t, r) {
      let { project_id: s } = t;
      return this._client.delete(Cn`/organization/projects/${s}/groups/${e}`, {
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
  };
  ZPe.Roles = tze;
});
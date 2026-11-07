
var evr = ne(() => {
  ZTr();
  ZTr();
  kl();
  uu();
  tCe = class tCe extends Ni {
    constructor() {
      super(...arguments);
      this.roles = new nze(this._client);
    }
    retrieve(e, t) {
      return this._client.get(Cn`/organization/users/${e}`, { ...t, __security: { adminAPIKeyAuth: !0 } });
    }
    update(e, t, r) {
      return this._client.post(Cn`/organization/users/${e}`, {
        body: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    list(e = {}, t) {
      return this._client.getAPIList("/organization/users", T_, {
        query: e,
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    delete(e, t) {
      return this._client.delete(Cn`/organization/users/${e}`, { ...t, __security: { adminAPIKeyAuth: !0 } });
    }
  };
  tCe.Roles = nze;
});
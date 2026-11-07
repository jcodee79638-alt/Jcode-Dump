
var UTr = ne(() => {
  kTr();
  kTr();
  OTr();
  OTr();
  kl();
  uu();
  SLe = class SLe extends Ni {
    constructor() {
      super(...arguments);
      ((this.users = new qKe(this._client)), (this.roles = new VKe(this._client)));
    }
    create(e, t) {
      return this._client.post("/organization/groups", {
        body: e,
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    retrieve(e, t) {
      return this._client.get(Cn`/organization/groups/${e}`, { ...t, __security: { adminAPIKeyAuth: !0 } });
    }
    update(e, t, r) {
      return this._client.post(Cn`/organization/groups/${e}`, {
        body: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    list(e = {}, t) {
      return this._client.getAPIList("/organization/groups", $x, {
        query: e,
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    delete(e, t) {
      return this._client.delete(Cn`/organization/groups/${e}`, {
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
  };
  SLe.Users = qKe;
  SLe.Roles = VKe;
});

var FTr = ne(() => {
  kl();
  uu();
  XKe = class XKe extends Ni {
    list(e, t = {}, r) {
      return this._client.getAPIList(Cn`/organization/projects/${e}/certificates`, T_, {
        query: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    activate(e, t, r) {
      return this._client.getAPIList(Cn`/organization/projects/${e}/certificates/activate`, Yw, {
        body: t,
        method: "post",
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    deactivate(e, t, r) {
      return this._client.getAPIList(Cn`/organization/projects/${e}/certificates/deactivate`, Yw, {
        body: t,
        method: "post",
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
  };
});
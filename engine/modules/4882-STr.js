
var STr = ne(() => {
  kl();
  uu();
  kKe = class kKe extends Ni {
    create(e, t) {
      return this._client.post("/organization/admin_api_keys", {
        body: e,
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    retrieve(e, t) {
      return this._client.get(Cn`/organization/admin_api_keys/${e}`, {
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    list(e = {}, t) {
      return this._client.getAPIList("/organization/admin_api_keys", Ff, {
        query: e,
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    delete(e, t) {
      return this._client.delete(Cn`/organization/admin_api_keys/${e}`, {
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
  };
});
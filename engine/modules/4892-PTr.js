
var PTr = ne(() => {
  kl();
  uu();
  BKe = class BKe extends Ni {
    create(e, t) {
      return this._client.post("/organization/roles", { body: e, ...t, __security: { adminAPIKeyAuth: !0 } });
    }
    retrieve(e, t) {
      return this._client.get(Cn`/organization/roles/${e}`, { ...t, __security: { adminAPIKeyAuth: !0 } });
    }
    update(e, t, r) {
      return this._client.post(Cn`/organization/roles/${e}`, {
        body: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    list(e = {}, t) {
      return this._client.getAPIList("/organization/roles", $x, {
        query: e,
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    delete(e, t) {
      return this._client.delete(Cn`/organization/roles/${e}`, { ...t, __security: { adminAPIKeyAuth: !0 } });
    }
  };
});
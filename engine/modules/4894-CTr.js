
var CTr = ne(() => {
  kl();
  uu();
  RKe = class RKe extends Ni {
    create(e, t) {
      return this._client.post("/organization/spend_alerts", {
        body: e,
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    update(e, t, r) {
      return this._client.post(Cn`/organization/spend_alerts/${e}`, {
        body: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    list(e = {}, t) {
      return this._client.getAPIList("/organization/spend_alerts", T_, {
        query: e,
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    delete(e, t) {
      return this._client.delete(Cn`/organization/spend_alerts/${e}`, {
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
  };
});
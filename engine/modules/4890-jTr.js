
var jTr = ne(() => {
  kl();
  uu();
  FKe = class FKe extends Ni {
    create(e, t) {
      return this._client.post("/organization/invites", {
        body: e,
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    retrieve(e, t) {
      return this._client.get(Cn`/organization/invites/${e}`, { ...t, __security: { adminAPIKeyAuth: !0 } });
    }
    list(e = {}, t) {
      return this._client.getAPIList("/organization/invites", T_, {
        query: e,
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    delete(e, t) {
      return this._client.delete(Cn`/organization/invites/${e}`, {
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
  };
});

var vTr = ne(() => {
  kl();
  uu();
  UKe = class UKe extends Ni {
    create(e, t) {
      return this._client.post("/organization/certificates", {
        body: e,
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    retrieve(e, t = {}, r) {
      return this._client.get(Cn`/organization/certificates/${e}`, {
        query: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    update(e, t, r) {
      return this._client.post(Cn`/organization/certificates/${e}`, {
        body: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    list(e = {}, t) {
      return this._client.getAPIList("/organization/certificates", T_, {
        query: e,
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    delete(e, t) {
      return this._client.delete(Cn`/organization/certificates/${e}`, {
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    activate(e, t) {
      return this._client.getAPIList("/organization/certificates/activate", Yw, {
        body: e,
        method: "post",
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    deactivate(e, t) {
      return this._client.getAPIList("/organization/certificates/deactivate", Yw, {
        body: e,
        method: "post",
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
  };
});
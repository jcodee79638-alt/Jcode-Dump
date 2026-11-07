
var GTr = ne(() => {
  kl();
  uu();
  ZKe = class ZKe extends Ni {
    create(e, t, r) {
      return this._client.post(Cn`/organization/projects/${e}/service_accounts`, {
        body: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    retrieve(e, t, r) {
      let { project_id: s } = t;
      return this._client.get(Cn`/organization/projects/${s}/service_accounts/${e}`, {
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    update(e, t, r) {
      let { project_id: s, ...a } = t;
      return this._client.post(Cn`/organization/projects/${s}/service_accounts/${e}`, {
        body: a,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    list(e, t = {}, r) {
      return this._client.getAPIList(Cn`/organization/projects/${e}/service_accounts`, T_, {
        query: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    delete(e, t, r) {
      let { project_id: s } = t;
      return this._client.delete(Cn`/organization/projects/${s}/service_accounts/${e}`, {
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
  };
});
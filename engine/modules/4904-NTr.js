
var NTr = ne(() => {
  kl();
  uu();
  GKe = class GKe extends Ni {
    retrieve(e, t, r) {
      let { project_id: s } = t;
      return this._client.get(Cn`/organization/projects/${s}/api_keys/${e}`, {
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    list(e, t = {}, r) {
      return this._client.getAPIList(Cn`/organization/projects/${e}/api_keys`, T_, {
        query: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    delete(e, t, r) {
      let { project_id: s } = t;
      return this._client.delete(Cn`/organization/projects/${s}/api_keys/${e}`, {
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
  };
});
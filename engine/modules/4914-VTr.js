
var VTr = ne(() => {
  kl();
  uu();
  QKe = class QKe extends Ni {
    listRateLimits(e, t = {}, r) {
      return this._client.getAPIList(Cn`/organization/projects/${e}/rate_limits`, T_, {
        query: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    updateRateLimit(e, t, r) {
      let { project_id: s, ...a } = t;
      return this._client.post(Cn`/organization/projects/${s}/rate_limits/${e}`, {
        body: a,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
  };
});
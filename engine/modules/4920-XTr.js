
var XTr = ne(() => {
  kl();
  uu();
  eze = class eze extends Ni {
    create(e, t, r) {
      return this._client.post(Cn`/organization/projects/${e}/spend_alerts`, {
        body: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    update(e, t, r) {
      let { project_id: s, ...a } = t;
      return this._client.post(Cn`/organization/projects/${s}/spend_alerts/${e}`, {
        body: a,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    list(e, t = {}, r) {
      return this._client.getAPIList(Cn`/organization/projects/${e}/spend_alerts`, T_, {
        query: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    delete(e, t, r) {
      let { project_id: s } = t;
      return this._client.delete(Cn`/organization/projects/${s}/spend_alerts/${e}`, {
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
  };
});
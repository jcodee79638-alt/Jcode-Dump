
var BTr = ne(() => {
  uu();
  JKe = class JKe extends Ni {
    retrieve(e, t) {
      return this._client.get(Cn`/organization/projects/${e}/data_retention`, {
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    update(e, t, r) {
      return this._client.post(Cn`/organization/projects/${e}/data_retention`, {
        body: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
  };
});
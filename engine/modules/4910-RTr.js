
var RTr = ne(() => {
  uu();
  KKe = class KKe extends Ni {
    retrieve(e, t) {
      return this._client.get(Cn`/organization/projects/${e}/hosted_tool_permissions`, {
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    update(e, t, r) {
      return this._client.post(Cn`/organization/projects/${e}/hosted_tool_permissions`, {
        body: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
  };
});
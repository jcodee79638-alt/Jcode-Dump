
var WTr = ne(() => {
  uu();
  zKe = class zKe extends Ni {
    retrieve(e, t) {
      return this._client.get(Cn`/organization/projects/${e}/model_permissions`, {
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    update(e, t, r) {
      return this._client.post(Cn`/organization/projects/${e}/model_permissions`, {
        body: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    delete(e, t) {
      return this._client.delete(Cn`/organization/projects/${e}/model_permissions`, {
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
  };
});
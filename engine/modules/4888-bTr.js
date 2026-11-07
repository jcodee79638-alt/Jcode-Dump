
var bTr = ne(() => {
  NKe = class NKe extends Ni {
    retrieve(e) {
      return this._client.get("/organization/data_retention", { ...e, __security: { adminAPIKeyAuth: !0 } });
    }
    update(e, t) {
      return this._client.post("/organization/data_retention", {
        body: e,
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
  };
});

var xvr = ne(() => {
  Mvr();
  Mvr();
  uu();
  OLe = class OLe extends Ni {
    constructor() {
      super(...arguments);
      this.items = new Lze(this._client);
    }
    create(e = {}, t) {
      return this._client.post("/conversations", { body: e, ...t, __security: { bearerAuth: !0 } });
    }
    retrieve(e, t) {
      return this._client.get(Cn`/conversations/${e}`, { ...t, __security: { bearerAuth: !0 } });
    }
    update(e, t, r) {
      return this._client.post(Cn`/conversations/${e}`, { body: t, ...r, __security: { bearerAuth: !0 } });
    }
    delete(e, t) {
      return this._client.delete(Cn`/conversations/${e}`, { ...t, __security: { bearerAuth: !0 } });
    }
  };
  OLe.Items = Lze;
});
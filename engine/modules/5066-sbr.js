
var sbr = ne(() => {
  ibr();
  ibr();
  uu();
  FLe = class FLe extends Ni {
    constructor() {
      super(...arguments);
      this.parts = new jze(this._client);
    }
    create(e, t) {
      return this._client.post("/uploads", { body: e, ...t, __security: { bearerAuth: !0 } });
    }
    cancel(e, t) {
      return this._client.post(Cn`/uploads/${e}/cancel`, { ...t, __security: { bearerAuth: !0 } });
    }
    complete(e, t, r) {
      return this._client.post(Cn`/uploads/${e}/complete`, { body: t, ...r, __security: { bearerAuth: !0 } });
    }
  };
  FLe.Parts = jze;
});
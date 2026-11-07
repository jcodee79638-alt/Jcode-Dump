
var qvr = ne(() => {
  dCe = class dCe extends Ni {
    create(e, t) {
      return this._client.post("/moderations", { body: e, ...t, __security: { bearerAuth: !0 } });
    }
  };
});
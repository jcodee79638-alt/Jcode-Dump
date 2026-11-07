
var Xvr = ne(() => {
  xze = class xze extends Ni {
    create(e, t) {
      return this._client.post("/realtime/client_secrets", { body: e, ...t, __security: { bearerAuth: !0 } });
    }
  };
});
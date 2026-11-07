
var avr = ne(() => {
  kl();
  uu();
  rCe = class rCe extends Ni {
    create(e, t) {
      return this._client.post("/batches", { body: e, ...t, __security: { bearerAuth: !0 } });
    }
    retrieve(e, t) {
      return this._client.get(Cn`/batches/${e}`, { ...t, __security: { bearerAuth: !0 } });
    }
    list(e = {}, t) {
      return this._client.getAPIList("/batches", Ff, { query: e, ...t, __security: { bearerAuth: !0 } });
    }
    cancel(e, t) {
      return this._client.post(Cn`/batches/${e}/cancel`, { ...t, __security: { bearerAuth: !0 } });
    }
  };
});
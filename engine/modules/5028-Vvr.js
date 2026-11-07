
var Vvr = ne(() => {
  kl();
  uu();
  pCe = class pCe extends Ni {
    retrieve(e, t) {
      return this._client.get(Cn`/models/${e}`, { ...t, __security: { bearerAuth: !0 } });
    }
    list(e) {
      return this._client.getAPIList("/models", Yw, { ...e, __security: { bearerAuth: !0 } });
    }
    delete(e, t) {
      return this._client.delete(Cn`/models/${e}`, { ...t, __security: { bearerAuth: !0 } });
    }
  };
});

var bvr = ne(() => {
  vvr();
  vvr();
  kl();
  uu();
  ULe = class ULe extends Ni {
    constructor() {
      super(...arguments);
      this.runs = new HCe(this._client);
    }
    create(e, t) {
      return this._client.post("/evals", { body: e, ...t, __security: { bearerAuth: !0 } });
    }
    retrieve(e, t) {
      return this._client.get(Cn`/evals/${e}`, { ...t, __security: { bearerAuth: !0 } });
    }
    update(e, t, r) {
      return this._client.post(Cn`/evals/${e}`, { body: t, ...r, __security: { bearerAuth: !0 } });
    }
    list(e = {}, t) {
      return this._client.getAPIList("/evals", Ff, { query: e, ...t, __security: { bearerAuth: !0 } });
    }
    delete(e, t) {
      return this._client.delete(Cn`/evals/${e}`, { ...t, __security: { bearerAuth: !0 } });
    }
  };
  ULe.Runs = HCe;
});
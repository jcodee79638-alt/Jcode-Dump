
var vvr = ne(() => {
  Tvr();
  Tvr();
  kl();
  uu();
  HCe = class HCe extends Ni {
    constructor() {
      super(...arguments);
      this.outputItems = new $ze(this._client);
    }
    create(e, t, r) {
      return this._client.post(Cn`/evals/${e}/runs`, { body: t, ...r, __security: { bearerAuth: !0 } });
    }
    retrieve(e, t, r) {
      let { eval_id: s } = t;
      return this._client.get(Cn`/evals/${s}/runs/${e}`, { ...r, __security: { bearerAuth: !0 } });
    }
    list(e, t = {}, r) {
      return this._client.getAPIList(Cn`/evals/${e}/runs`, Ff, {
        query: t,
        ...r,
        __security: { bearerAuth: !0 },
      });
    }
    delete(e, t, r) {
      let { eval_id: s } = t;
      return this._client.delete(Cn`/evals/${s}/runs/${e}`, { ...r, __security: { bearerAuth: !0 } });
    }
    cancel(e, t, r) {
      let { eval_id: s } = t;
      return this._client.post(Cn`/evals/${s}/runs/${e}`, { ...r, __security: { bearerAuth: !0 } });
    }
  };
  HCe.OutputItems = $ze;
});
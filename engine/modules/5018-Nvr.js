
var Nvr = ne(() => {
  Uvr();
  Uvr();
  kl();
  uu();
  lCe = class lCe extends Ni {
    constructor() {
      super(...arguments);
      this.checkpoints = new Dze(this._client);
    }
    create(e, t) {
      return this._client.post("/fine_tuning/jobs", { body: e, ...t, __security: { bearerAuth: !0 } });
    }
    retrieve(e, t) {
      return this._client.get(Cn`/fine_tuning/jobs/${e}`, { ...t, __security: { bearerAuth: !0 } });
    }
    list(e = {}, t) {
      return this._client.getAPIList("/fine_tuning/jobs", Ff, {
        query: e,
        ...t,
        __security: { bearerAuth: !0 },
      });
    }
    cancel(e, t) {
      return this._client.post(Cn`/fine_tuning/jobs/${e}/cancel`, { ...t, __security: { bearerAuth: !0 } });
    }
    listEvents(e, t = {}, r) {
      return this._client.getAPIList(Cn`/fine_tuning/jobs/${e}/events`, Ff, {
        query: t,
        ...r,
        __security: { bearerAuth: !0 },
      });
    }
    pause(e, t) {
      return this._client.post(Cn`/fine_tuning/jobs/${e}/pause`, { ...t, __security: { bearerAuth: !0 } });
    }
    resume(e, t) {
      return this._client.post(Cn`/fine_tuning/jobs/${e}/resume`, { ...t, __security: { bearerAuth: !0 } });
    }
  };
  lCe.Checkpoints = Dze;
});
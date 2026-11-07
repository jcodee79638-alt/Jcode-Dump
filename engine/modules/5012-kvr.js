
var kvr = ne(() => {
  kl();
  uu();
  Ize = class Ize extends Ni {
    create(e, t, r) {
      return this._client.getAPIList(Cn`/fine_tuning/checkpoints/${e}/permissions`, Yw, {
        body: t,
        method: "post",
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    retrieve(e, t = {}, r) {
      return this._client.get(Cn`/fine_tuning/checkpoints/${e}/permissions`, {
        query: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    list(e, t = {}, r) {
      return this._client.getAPIList(Cn`/fine_tuning/checkpoints/${e}/permissions`, T_, {
        query: t,
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
    delete(e, t, r) {
      let { fine_tuned_model_checkpoint: s } = t;
      return this._client.delete(Cn`/fine_tuning/checkpoints/${s}/permissions/${e}`, {
        ...r,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
  };
});
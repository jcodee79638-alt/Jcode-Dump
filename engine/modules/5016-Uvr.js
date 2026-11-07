
var Uvr = ne(() => {
  kl();
  uu();
  Dze = class Dze extends Ni {
    list(e, t = {}, r) {
      return this._client.getAPIList(Cn`/fine_tuning/jobs/${e}/checkpoints`, Ff, {
        query: t,
        ...r,
        __security: { bearerAuth: !0 },
      });
    }
  };
});
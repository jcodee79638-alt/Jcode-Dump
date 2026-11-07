
var Qvr = ne(() => {
  kl();
  uu();
  Sze = class Sze extends Ni {
    list(e, t = {}, r) {
      return this._client.getAPIList(Cn`/responses/${e}/input_items`, Ff, {
        query: t,
        ...r,
        __security: { bearerAuth: !0 },
      });
    }
  };
});

var LPt = ne(() => {
  kl();
  uu();
  JPe = class JPe extends Ni {
    list(e, t = {}, r) {
      return this._client.getAPIList(Cn`/chat/completions/${e}/messages`, Ff, {
        query: t,
        ...r,
        __security: { bearerAuth: !0 },
      });
    }
  };
});
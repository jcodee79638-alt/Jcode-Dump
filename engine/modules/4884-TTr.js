
var TTr = ne(() => {
  kl();
  OKe = class OKe extends Ni {
    list(e = {}, t) {
      return this._client.getAPIList("/organization/audit_logs", T_, {
        query: e,
        ...t,
        __security: { adminAPIKeyAuth: !0 },
      });
    }
  };
});
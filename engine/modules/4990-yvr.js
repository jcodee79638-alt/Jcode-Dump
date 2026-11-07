
var yvr = ne(() => {
  Dvr();
  Dvr();
  kl();
  H0();
  uu();
  kLe = class kLe extends Ni {
    constructor() {
      super(...arguments);
      this.files = new oCe(this._client);
    }
    create(e, t) {
      return this._client.post("/containers", { body: e, ...t, __security: { bearerAuth: !0 } });
    }
    retrieve(e, t) {
      return this._client.get(Cn`/containers/${e}`, { ...t, __security: { bearerAuth: !0 } });
    }
    list(e = {}, t) {
      return this._client.getAPIList("/containers", Ff, { query: e, ...t, __security: { bearerAuth: !0 } });
    }
    delete(e, t) {
      return this._client.delete(Cn`/containers/${e}`, {
        ...t,
        headers: Xa([{ Accept: "*/*" }, t?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
  };
  kLe.Files = oCe;
});
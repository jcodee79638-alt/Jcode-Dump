
var Dvr = ne(() => {
  Ivr();
  Ivr();
  kl();
  H0();
  sR();
  uu();
  oCe = class oCe extends Ni {
    constructor() {
      super(...arguments);
      this.content = new hze(this._client);
    }
    create(e, t, r) {
      return this._client.post(
        Cn`/containers/${e}/files`,
        $ce({ body: t, ...r, __security: { bearerAuth: !0 } }, this._client),
      );
    }
    retrieve(e, t, r) {
      let { container_id: s } = t;
      return this._client.get(Cn`/containers/${s}/files/${e}`, { ...r, __security: { bearerAuth: !0 } });
    }
    list(e, t = {}, r) {
      return this._client.getAPIList(Cn`/containers/${e}/files`, Ff, {
        query: t,
        ...r,
        __security: { bearerAuth: !0 },
      });
    }
    delete(e, t, r) {
      let { container_id: s } = t;
      return this._client.delete(Cn`/containers/${s}/files/${e}`, {
        ...r,
        headers: Xa([{ Accept: "*/*" }, r?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
  };
  oCe.Content = hze;
});
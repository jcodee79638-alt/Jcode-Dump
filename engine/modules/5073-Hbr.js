
var Hbr = ne(() => {
  obr();
  obr();
  abr();
  abr();
  kl();
  H0();
  uu();
  Tce = class Tce extends Ni {
    constructor() {
      super(...arguments);
      ((this.files = new Cze(this._client)), (this.fileBatches = new Pze(this._client)));
    }
    create(e, t) {
      return this._client.post("/vector_stores", {
        body: e,
        ...t,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, t?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    retrieve(e, t) {
      return this._client.get(Cn`/vector_stores/${e}`, {
        ...t,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, t?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    update(e, t, r) {
      return this._client.post(Cn`/vector_stores/${e}`, {
        body: t,
        ...r,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, r?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    list(e = {}, t) {
      return this._client.getAPIList("/vector_stores", Ff, {
        query: e,
        ...t,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, t?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    delete(e, t) {
      return this._client.delete(Cn`/vector_stores/${e}`, {
        ...t,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, t?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    search(e, t, r) {
      return this._client.getAPIList(Cn`/vector_stores/${e}/search`, Yw, {
        body: t,
        method: "post",
        ...r,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, r?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
  };
  Tce.Files = Cze;
  Tce.FileBatches = Pze;
});
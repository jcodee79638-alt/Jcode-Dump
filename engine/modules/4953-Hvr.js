
var Hvr = ne(() => {
  kl();
  H0();
  uu();
  aze = class aze extends Ni {
    create(e, t) {
      return this._client.post("/assistants", {
        body: e,
        ...t,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, t?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    retrieve(e, t) {
      return this._client.get(Cn`/assistants/${e}`, {
        ...t,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, t?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    update(e, t, r) {
      return this._client.post(Cn`/assistants/${e}`, {
        body: t,
        ...r,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, r?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    list(e = {}, t) {
      return this._client.getAPIList("/assistants", Ff, {
        query: e,
        ...t,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, t?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    delete(e, t) {
      return this._client.delete(Cn`/assistants/${e}`, {
        ...t,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, t?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
  };
});
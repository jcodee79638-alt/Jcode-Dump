
var fvr = ne(() => {
  kl();
  H0();
  uu();
  uze = class uze extends Ni {
    retrieve(e, t) {
      return this._client.get(Cn`/chatkit/threads/${e}`, {
        ...t,
        headers: Xa([{ "OpenAI-Beta": "chatkit_beta=v1" }, t?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    list(e = {}, t) {
      return this._client.getAPIList("/chatkit/threads", T_, {
        query: e,
        ...t,
        headers: Xa([{ "OpenAI-Beta": "chatkit_beta=v1" }, t?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    delete(e, t) {
      return this._client.delete(Cn`/chatkit/threads/${e}`, {
        ...t,
        headers: Xa([{ "OpenAI-Beta": "chatkit_beta=v1" }, t?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    listItems(e, t = {}, r) {
      return this._client.getAPIList(Cn`/chatkit/threads/${e}/items`, T_, {
        query: t,
        ...r,
        headers: Xa([{ "OpenAI-Beta": "chatkit_beta=v1" }, r?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
  };
});
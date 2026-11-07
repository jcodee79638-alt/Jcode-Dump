
var dvr = ne(() => {
  kl();
  H0();
  uu();
  lze = class lze extends Ni {
    create(e, t, r) {
      return this._client.post(Cn`/threads/${e}/messages`, {
        body: t,
        ...r,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, r?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    retrieve(e, t, r) {
      let { thread_id: s } = t;
      return this._client.get(Cn`/threads/${s}/messages/${e}`, {
        ...r,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, r?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    update(e, t, r) {
      let { thread_id: s, ...a } = t;
      return this._client.post(Cn`/threads/${s}/messages/${e}`, {
        body: a,
        ...r,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, r?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    list(e, t = {}, r) {
      return this._client.getAPIList(Cn`/threads/${e}/messages`, Ff, {
        query: t,
        ...r,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, r?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    delete(e, t, r) {
      let { thread_id: s } = t;
      return this._client.delete(Cn`/threads/${s}/messages/${e}`, {
        ...r,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, r?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
  };
});

var Mvr = ne(() => {
  kl();
  uu();
  Lze = class Lze extends Ni {
    create(e, t, r) {
      let { include: s, ...a } = t;
      return this._client.post(Cn`/conversations/${e}/items`, {
        query: { include: s },
        body: a,
        ...r,
        __security: { bearerAuth: !0 },
      });
    }
    retrieve(e, t, r) {
      let { conversation_id: s, ...a } = t;
      return this._client.get(Cn`/conversations/${s}/items/${e}`, {
        query: a,
        ...r,
        __security: { bearerAuth: !0 },
      });
    }
    list(e, t = {}, r) {
      return this._client.getAPIList(Cn`/conversations/${e}/items`, T_, {
        query: t,
        ...r,
        __security: { bearerAuth: !0 },
      });
    }
    delete(e, t, r) {
      let { conversation_id: s } = t;
      return this._client.delete(Cn`/conversations/${s}/items/${e}`, {
        ...r,
        __security: { bearerAuth: !0 },
      });
    }
  };
});
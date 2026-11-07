
var wKe = ne(() => {
  LPt();
  LPt();
  kl();
  uu();
  hTr();
  MTr();
  vPt();
  SKe();
  MTr();
  vPt();
  hTr();
  Ice = class Ice extends Ni {
    constructor() {
      super(...arguments);
      this.messages = new JPe(this._client);
    }
    create(e, t) {
      return this._client.post("/chat/completions", {
        body: e,
        ...t,
        stream: e.stream ?? !1,
        __security: { bearerAuth: !0 },
      });
    }
    retrieve(e, t) {
      return this._client.get(Cn`/chat/completions/${e}`, { ...t, __security: { bearerAuth: !0 } });
    }
    update(e, t, r) {
      return this._client.post(Cn`/chat/completions/${e}`, { body: t, ...r, __security: { bearerAuth: !0 } });
    }
    list(e = {}, t) {
      return this._client.getAPIList("/chat/completions", Ff, {
        query: e,
        ...t,
        __security: { bearerAuth: !0 },
      });
    }
    delete(e, t) {
      return this._client.delete(Cn`/chat/completions/${e}`, { ...t, __security: { bearerAuth: !0 } });
    }
    parse(e, t) {
      return (
        qVi(e.tools),
        this._client.chat.completions
          .create(e, {
            ...t,
            headers: { ...t?.headers, "X-Stainless-Helper-Method": "chat.completions.parse" },
          })
          ._thenUnwrap((r) => xKe(r, e))
      );
    }
    runTools(e, t) {
      if (e.stream) return YPe.runTools(this._client, e, t);
      return CKe.runTools(this._client, e, t);
    }
    stream(e, t) {
      return Ece.createChatCompletion(this._client, e, t);
    }
  };
  Ice.Messages = JPe;
});
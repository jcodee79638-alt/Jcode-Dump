
var lvr = ne(() => {
  H0();
  uu();
  Aze = class Aze extends Ni {
    create(e, t) {
      return this._client.post("/chatkit/sessions", {
        body: e,
        ...t,
        headers: Xa([{ "OpenAI-Beta": "chatkit_beta=v1" }, t?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    cancel(e, t) {
      return this._client.post(Cn`/chatkit/sessions/${e}/cancel`, {
        ...t,
        headers: Xa([{ "OpenAI-Beta": "chatkit_beta=v1" }, t?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
  };
});
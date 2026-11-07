
var cvr = ne(() => {
  H0();
  Hze = class Hze extends Ni {
    create(e, t) {
      return this._client.post("/realtime/sessions", {
        body: e,
        ...t,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, t?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
  };
});
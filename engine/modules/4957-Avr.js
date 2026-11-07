
var Avr = ne(() => {
  H0();
  cze = class cze extends Ni {
    create(e, t) {
      return this._client.post("/realtime/transcription_sessions", {
        body: e,
        ...t,
        headers: Xa([{ "OpenAI-Beta": "assistants=v2" }, t?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
  };
});
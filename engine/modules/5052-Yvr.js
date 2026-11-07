
var Yvr = ne(() => {
  Tze = class Tze extends Ni {
    count(e = {}, t) {
      return this._client.post("/responses/input_tokens", { body: e, ...t, __security: { bearerAuth: !0 } });
    }
  };
});
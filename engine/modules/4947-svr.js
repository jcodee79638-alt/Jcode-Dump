
var svr = ne(() => {
  sR();
  oze = class oze extends Ni {
    create(e, t) {
      return this._client.post(
        "/audio/translations",
        bP({ body: e, ...t, __metadata: { model: e.model }, __security: { bearerAuth: !0 } }, this._client),
      );
    }
  };
});
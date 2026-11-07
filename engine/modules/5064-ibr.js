
var ibr = ne(() => {
  sR();
  uu();
  jze = class jze extends Ni {
    create(e, t, r) {
      return this._client.post(
        Cn`/uploads/${e}/parts`,
        bP({ body: t, ...r, __security: { bearerAuth: !0 } }, this._client),
      );
    }
  };
});
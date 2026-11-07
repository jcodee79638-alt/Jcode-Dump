
var Wvr = ne(() => {
  sR();
  fCe = class fCe extends Ni {
    createVariation(e, t) {
      return this._client.post(
        "/images/variations",
        bP({ body: e, ...t, __security: { bearerAuth: !0 } }, this._client),
      );
    }
    edit(e, t) {
      return this._client.post(
        "/images/edits",
        bP({ body: e, ...t, stream: e.stream ?? !1, __security: { bearerAuth: !0 } }, this._client),
      );
    }
    generate(e, t) {
      return this._client.post("/images/generations", {
        body: e,
        ...t,
        stream: e.stream ?? !1,
        __security: { bearerAuth: !0 },
      });
    }
  };
});
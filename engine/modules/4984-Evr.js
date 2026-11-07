
var Evr = ne(() => {
  sCe = class sCe extends Ni {
    create(e, t) {
      return this._client.post("/completions", {
        body: e,
        ...t,
        stream: e.stream ?? !1,
        __security: { bearerAuth: !0 },
      });
    }
  };
});

var nvr = ne(() => {
  H0();
  ize = class ize extends Ni {
    create(e, t) {
      return this._client.post("/audio/speech", {
        body: e,
        ...t,
        headers: Xa([{ Accept: "application/octet-stream" }, t?.headers]),
        __security: { bearerAuth: !0 },
        __binaryResponse: !0,
      });
    }
  };
});
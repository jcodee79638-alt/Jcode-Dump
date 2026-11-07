
var ebr = ne(() => {
  H0();
  uu();
  vze = class vze extends Ni {
    retrieve(e, t) {
      return this._client.get(Cn`/skills/${e}/content`, {
        ...t,
        headers: Xa([{ Accept: "application/binary" }, t?.headers]),
        __security: { bearerAuth: !0 },
        __binaryResponse: !0,
      });
    }
  };
});
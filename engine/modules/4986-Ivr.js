
var Ivr = ne(() => {
  H0();
  uu();
  hze = class hze extends Ni {
    retrieve(e, t, r) {
      let { container_id: s } = t;
      return this._client.get(Cn`/containers/${s}/files/${e}/content`, {
        ...r,
        headers: Xa([{ Accept: "application/binary" }, r?.headers]),
        __security: { bearerAuth: !0 },
        __binaryResponse: !0,
      });
    }
  };
});

var tbr = ne(() => {
  H0();
  uu();
  bze = class bze extends Ni {
    retrieve(e, t, r) {
      let { skill_id: s } = t;
      return this._client.get(Cn`/skills/${s}/versions/${e}/content`, {
        ...r,
        headers: Xa([{ Accept: "application/binary" }, r?.headers]),
        __security: { bearerAuth: !0 },
        __binaryResponse: !0,
      });
    }
  };
});
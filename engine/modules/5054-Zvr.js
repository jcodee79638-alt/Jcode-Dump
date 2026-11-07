
var Zvr = ne(() => {
  zvr();
  $7i();
  Qvr();
  Qvr();
  Yvr();
  Yvr();
  H0();
  uu();
  xce = class xce extends Ni {
    constructor() {
      super(...arguments);
      ((this.inputItems = new Sze(this._client)), (this.inputTokens = new Tze(this._client)));
    }
    create(e, t) {
      return this._client
        .post("/responses", { body: e, ...t, stream: e.stream ?? !1, __security: { bearerAuth: !0 } })
        ._thenUnwrap((r) => {
          if ("object" in r && r.object === "response") wPt(r);
          return r;
        });
    }
    retrieve(e, t = {}, r) {
      return this._client
        .get(Cn`/responses/${e}`, { query: t, ...r, stream: t?.stream ?? !1, __security: { bearerAuth: !0 } })
        ._thenUnwrap((s) => {
          if ("object" in s && s.object === "response") wPt(s);
          return s;
        });
    }
    delete(e, t) {
      return this._client.delete(Cn`/responses/${e}`, {
        ...t,
        headers: Xa([{ Accept: "*/*" }, t?.headers]),
        __security: { bearerAuth: !0 },
      });
    }
    parse(e, t) {
      return this._client.responses.create(e, t)._thenUnwrap((r) => Kvr(r, e));
    }
    stream(e, t) {
      return UPt.createResponse(this._client, e, t);
    }
    cancel(e, t) {
      return this._client.post(Cn`/responses/${e}/cancel`, { ...t, __security: { bearerAuth: !0 } });
    }
    compact(e, t) {
      return this._client.post("/responses/compact", { body: e, ...t, __security: { bearerAuth: !0 } });
    }
  };
  xce.InputItems = Sze;
  xce.InputTokens = Tze;
});

var gSr = ne(() => {
  rJ();
  eR();
  cSr();
  IJe();
  fce();
  WJe = class WJe extends PI {
    create(e, t) {
      return this._client.post("/v1/messages/batches", { body: e, ...t });
    }
    retrieve(e, t) {
      return this._client.get(RE`/v1/messages/batches/${e}`, t);
    }
    list(e = {}, t) {
      return this._client.getAPIList("/v1/messages/batches", y7, { query: e, ...t });
    }
    delete(e, t) {
      return this._client.delete(RE`/v1/messages/batches/${e}`, t);
    }
    cancel(e, t) {
      return this._client.post(RE`/v1/messages/batches/${e}/cancel`, t);
    }
    async results(e, t) {
      let r = await this.retrieve(e);
      if (!r.results_url)
        throw new Cu(
          `No batch \`results_url\`; Has it finished processing? ${r.processing_status} - ${r.id}`,
        );
      return this._client
        .get(r.results_url, {
          ...t,
          headers: Zf([{ Accept: "application/binary" }, t?.headers]),
          stream: !0,
          __binaryResponse: !0,
        })
        ._thenUnwrap((s, a) => CPe.fromResponse(a.response, a.controller));
    }
  };
});
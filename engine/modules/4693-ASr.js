
var ASr = ne(() => {
  rJ();
  eR();
  cSr();
  IJe();
  fce();
  wJe = class wJe extends PI {
    create(e, t) {
      let { betas: r, ...s } = e;
      return this._client.post("/v1/messages/batches?beta=true", {
        body: s,
        ...t,
        headers: Zf([
          { "anthropic-beta": [...(r ?? []), "message-batches-2024-09-24"].toString() },
          t?.headers,
        ]),
      });
    }
    retrieve(e, t = {}, r) {
      let { betas: s } = t ?? {};
      return this._client.get(RE`/v1/messages/batches/${e}?beta=true`, {
        ...r,
        headers: Zf([
          { "anthropic-beta": [...(s ?? []), "message-batches-2024-09-24"].toString() },
          r?.headers,
        ]),
      });
    }
    list(e = {}, t) {
      let { betas: r, ...s } = e ?? {};
      return this._client.getAPIList("/v1/messages/batches?beta=true", y7, {
        query: s,
        ...t,
        headers: Zf([
          { "anthropic-beta": [...(r ?? []), "message-batches-2024-09-24"].toString() },
          t?.headers,
        ]),
      });
    }
    delete(e, t = {}, r) {
      let { betas: s } = t ?? {};
      return this._client.delete(RE`/v1/messages/batches/${e}?beta=true`, {
        ...r,
        headers: Zf([
          { "anthropic-beta": [...(s ?? []), "message-batches-2024-09-24"].toString() },
          r?.headers,
        ]),
      });
    }
    cancel(e, t = {}, r) {
      let { betas: s } = t ?? {};
      return this._client.post(RE`/v1/messages/batches/${e}/cancel?beta=true`, {
        ...r,
        headers: Zf([
          { "anthropic-beta": [...(s ?? []), "message-batches-2024-09-24"].toString() },
          r?.headers,
        ]),
      });
    }
    async results(e, t = {}, r) {
      let s = await this.retrieve(e);
      if (!s.results_url)
        throw new Cu(
          `No batch \`results_url\`; Has it finished processing? ${s.processing_status} - ${s.id}`,
        );
      let { betas: a } = t ?? {};
      return this._client
        .get(s.results_url, {
          ...r,
          headers: Zf([
            {
              "anthropic-beta": [...(a ?? []), "message-batches-2024-09-24"].toString(),
              Accept: "application/binary",
            },
            r?.headers,
          ]),
          stream: !0,
          __binaryResponse: !0,
        })
        ._thenUnwrap((H, u) => CPe.fromResponse(u.response, u.controller));
    }
  };
});
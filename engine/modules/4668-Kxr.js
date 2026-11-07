
var Kxr = ne(() => {
  rJ();
  eR();
  vPe();
  fce();
  gJe = class gJe extends PI {
    list(e = {}, t) {
      let { betas: r, ...s } = e ?? {};
      return this._client.getAPIList("/v1/files", y7, {
        query: s,
        ...t,
        headers: Zf([{ "anthropic-beta": [...(r ?? []), "files-api-2025-04-14"].toString() }, t?.headers]),
      });
    }
    delete(e, t = {}, r) {
      let { betas: s } = t ?? {};
      return this._client.delete(RE`/v1/files/${e}`, {
        ...r,
        headers: Zf([{ "anthropic-beta": [...(s ?? []), "files-api-2025-04-14"].toString() }, r?.headers]),
      });
    }
    download(e, t = {}, r) {
      let { betas: s } = t ?? {};
      return this._client.get(RE`/v1/files/${e}/content`, {
        ...r,
        headers: Zf([
          {
            "anthropic-beta": [...(s ?? []), "files-api-2025-04-14"].toString(),
            Accept: "application/binary",
          },
          r?.headers,
        ]),
        __binaryResponse: !0,
      });
    }
    retrieveMetadata(e, t = {}, r) {
      let { betas: s } = t ?? {};
      return this._client.get(RE`/v1/files/${e}`, {
        ...r,
        headers: Zf([{ "anthropic-beta": [...(s ?? []), "files-api-2025-04-14"].toString() }, r?.headers]),
      });
    }
    upload(e, t) {
      let { betas: r, ...s } = e;
      return this._client.post(
        "/v1/files",
        TPe(
          {
            body: s,
            ...t,
            headers: Zf([
              { "anthropic-beta": [...(r ?? []), "files-api-2025-04-14"].toString() },
              t?.headers,
            ]),
          },
          this._client,
        ),
      );
    }
  };
});
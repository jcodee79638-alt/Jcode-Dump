
var Svr = ne(() => {
  pze();
  aCe = class aCe extends Ni {
    create(e, t) {
      let r = !!e.encoding_format,
        s = r ? e.encoding_format : "base64";
      if (r) Wy(this._client).debug("embeddings/user defined encoding_format:", e.encoding_format);
      let a = this._client.post("/embeddings", {
        body: { ...e, encoding_format: s },
        ...t,
        __security: { bearerAuth: !0 },
      });
      if (r) return a;
      return (
        Wy(this._client).debug("embeddings/decoding base64 embeddings from base64"),
        a._thenUnwrap((H) => {
          if (H && H.data)
            H.data.forEach((u) => {
              let f = u.embedding;
              u.embedding = o7i(f);
            });
          return H;
        })
      );
    }
  };
});
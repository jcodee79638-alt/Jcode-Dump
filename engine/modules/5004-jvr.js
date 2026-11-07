
var jvr = ne(() => {
  kl();
  H0();
  x7();
  sR();
  uu();
  cCe = class cCe extends Ni {
    create(e, t) {
      return this._client.post("/files", bP({ body: e, ...t, __security: { bearerAuth: !0 } }, this._client));
    }
    retrieve(e, t) {
      return this._client.get(Cn`/files/${e}`, { ...t, __security: { bearerAuth: !0 } });
    }
    list(e = {}, t) {
      return this._client.getAPIList("/files", Ff, { query: e, ...t, __security: { bearerAuth: !0 } });
    }
    delete(e, t) {
      return this._client.delete(Cn`/files/${e}`, { ...t, __security: { bearerAuth: !0 } });
    }
    content(e, t) {
      return this._client.get(Cn`/files/${e}/content`, {
        ...t,
        headers: Xa([{ Accept: "application/binary" }, t?.headers]),
        __security: { bearerAuth: !0 },
        __binaryResponse: !0,
      });
    }
    async waitForProcessing(e, { pollInterval: t = 5000, maxWait: r = 1800000 } = {}) {
      let s = new Set(["processed", "error", "deleted"]),
        a = Date.now(),
        H = await this.retrieve(e);
      while (!H.status || !s.has(H.status))
        if ((await aJ(t), (H = await this.retrieve(e)), Date.now() - a > r))
          throw new ILe({
            message: `Giving up on waiting for file ${e} to finish processing after ${r} milliseconds.`,
          });
      return H;
    }
  };
});
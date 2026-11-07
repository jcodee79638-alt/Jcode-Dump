
var cbr = ne(() => {
  kl();
  H0();
  sR();
  uu();
  hCe = class hCe extends Ni {
    create(e, t) {
      return this._client.post(
        "/videos",
        bP({ body: e, ...t, __security: { bearerAuth: !0 } }, this._client),
      );
    }
    retrieve(e, t) {
      return this._client.get(Cn`/videos/${e}`, { ...t, __security: { bearerAuth: !0 } });
    }
    list(e = {}, t) {
      return this._client.getAPIList("/videos", T_, { query: e, ...t, __security: { bearerAuth: !0 } });
    }
    delete(e, t) {
      return this._client.delete(Cn`/videos/${e}`, { ...t, __security: { bearerAuth: !0 } });
    }
    createCharacter(e, t) {
      return this._client.post(
        "/videos/characters",
        bP({ body: e, ...t, __security: { bearerAuth: !0 } }, this._client),
      );
    }
    downloadContent(e, t = {}, r) {
      return this._client.get(Cn`/videos/${e}/content`, {
        query: t,
        ...r,
        headers: Xa([{ Accept: "application/binary" }, r?.headers]),
        __security: { bearerAuth: !0 },
        __binaryResponse: !0,
      });
    }
    edit(e, t) {
      return this._client.post(
        "/videos/edits",
        bP({ body: e, ...t, __security: { bearerAuth: !0 } }, this._client),
      );
    }
    extend(e, t) {
      return this._client.post(
        "/videos/extensions",
        bP({ body: e, ...t, __security: { bearerAuth: !0 } }, this._client),
      );
    }
    getCharacter(e, t) {
      return this._client.get(Cn`/videos/characters/${e}`, { ...t, __security: { bearerAuth: !0 } });
    }
    remix(e, t, r) {
      return this._client.post(
        Cn`/videos/${e}/remix`,
        $ce({ body: t, ...r, __security: { bearerAuth: !0 } }, this._client),
      );
    }
  };
});
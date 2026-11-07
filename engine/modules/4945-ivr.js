
var ivr = ne(() => {
  sR();
  sze = class sze extends Ni {
    create(e, t) {
      return this._client.post(
        "/audio/transcriptions",
        bP(
          {
            body: e,
            ...t,
            stream: e.stream ?? !1,
            __metadata: { model: e.model },
            __security: { bearerAuth: !0 },
          },
          this._client,
        ),
      );
    }
  };
});
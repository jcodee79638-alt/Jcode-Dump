
var Cln = ne(() => {
  BH();
  mI();
  Hf();
  U6();
  tse();
  ese();
  Bpt();
  ver = class ver extends _W {
    [sw];
    source;
    onError;
    remoteAddressOverride;
    constructor(e, t, r) {
      super();
      ((this[sw] = sw), (this.source = e), (this.onError = t), (this.remoteAddressOverride = r));
    }
    get headers() {
      return SE(this.source.headers);
    }
    get remoteAddress() {
      return this.remoteAddressOverride ?? Sv(this.source.socket.remoteAddress);
    }
    textEffect;
    get text() {
      if (this.textEffect) return this.textEffect;
      return (
        (this.textEffect = Yg(
          pD(Hi(C1e, (e) => jln(() => this.source, { onError: this.onError, maxBytes: e }))),
        )),
        (this.arrayBufferEffect = Vn(this.textEffect, (e) => new TextEncoder().encode(e).buffer)),
        this.textEffect
      );
    }
    get textUnsafe() {
      return Yg(this.text);
    }
    get json() {
      return Hi(this.text, (e) => ZA({ try: () => (e === "" ? null : JSON.parse(e)), catch: this.onError }));
    }
    get jsonUnsafe() {
      return Yg(this.json);
    }
    get urlParamsBody() {
      return Hi(this.text, (e) => ZA({ try: () => zW(new URLSearchParams(e)), catch: this.onError }));
    }
    get stream() {
      return B6({ evaluate: () => this.source, onError: this.onError });
    }
    arrayBufferEffect;
    get arrayBuffer() {
      if (this.arrayBufferEffect) return this.arrayBufferEffect;
      return (
        (this.arrayBufferEffect = hl((e) =>
          Ser(() => this.source, { onError: this.onError, maxBytes: e.getRef(C1e) }),
        ).pipe(pD, Yg)),
        (this.textEffect = Vn(this.arrayBufferEffect, (e) => new TextDecoder().decode(e))),
        this.arrayBufferEffect
      );
    }
  };
});
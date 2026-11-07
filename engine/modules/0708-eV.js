
var eV = ne(() => {
  YA();
  BH();
  mI();
  Hf();
  Ov();
  aL();
  mRe();
  U6();
  tse();
  tde();
  bpt();
  ese();
  Md = _i("effect/http/HttpServerRequest");
  ose = class ose extends _i()("effect/http/ParsedSearchParams") {};
  $er = class $er extends _W {
    [nde];
    [sw];
    source;
    url;
    headersOverride;
    remoteAddressOverride;
    constructor(e, t, r, s) {
      super();
      ((this[nde] = nde),
        (this[sw] = sw),
        (this.source = e),
        (this.url = t),
        (this.headersOverride = r),
        (this.remoteAddressOverride = s));
    }
    toJSON() {
      return w1e(this, { _id: "HttpServerRequest", method: this.method, url: this.originalUrl });
    }
    modify(e) {
      return new $er(
        this.source,
        e.url ?? this.url,
        e.headers ?? this.headersOverride,
        "remoteAddress" in e ? e.remoteAddress : this.remoteAddressOverride,
      );
    }
    get method() {
      return this.source.method.toUpperCase();
    }
    get originalUrl() {
      return this.source.url;
    }
    get remoteAddress() {
      return this.remoteAddressOverride ?? eH();
    }
    get headers() {
      return ((this.headersOverride ??= SE(this.source.headers)), this.headersOverride);
    }
    cachedCookies;
    get cookies() {
      if (this.cachedCookies) return this.cachedCookies;
      return (this.cachedCookies = Zft(this.headers.cookie ?? ""));
    }
    get stream() {
      return this.source.body
        ? Npe({
            evaluate: () => this.source.body,
            onError: (e) => new Nv({ reason: new d2({ request: this, cause: e }) }),
          })
        : NW(
            new Nv({
              reason: new d2({ request: this, description: "can not create stream from empty body" }),
            }),
          );
    }
    textEffect;
    get text() {
      if (this.textEffect) return this.textEffect;
      return (
        (this.textEffect = Yg(
          pD(
            bl({
              try: () => this.source.text(),
              catch: (e) => new Nv({ reason: new d2({ request: this, cause: e }) }),
            }),
          ),
        )),
        this.textEffect
      );
    }
    get json() {
      return Hi(this.text, (e) =>
        ZA({
          try: () => JSON.parse(e),
          catch: (t) => new Nv({ reason: new d2({ request: this, cause: t }) }),
        }),
      );
    }
    get urlParamsBody() {
      return Hi(this.text, (e) =>
        ZA({
          try: () => zW(new URLSearchParams(e)),
          catch: (t) => new Nv({ reason: new d2({ request: this, cause: t }) }),
        }),
      );
    }
    multipartEffect;
    get multipart() {
      if (this.multipartEffect) return this.multipartEffect;
      return ((this.multipartEffect = Yg(pD(vpt(this.multipartStream)))), this.multipartEffect);
    }
    get multipartStream() {
      return Wie(
        fft(this.stream, (e) => Ey.fromReason("InternalError", e)),
        Aln(this.headers),
      );
    }
    arrayBufferEffect;
    get arrayBuffer() {
      if (this.arrayBufferEffect) return this.arrayBufferEffect;
      return (
        (this.arrayBufferEffect = Yg(
          pD(
            bl({
              try: () => this.source.arrayBuffer(),
              catch: (e) => new Nv({ reason: new d2({ request: this, cause: e }) }),
            }),
          ),
        )),
        this.arrayBufferEffect
      );
    }
    get upgrade() {
      return bn(
        new Nv({ reason: new d2({ request: this, description: "Not an upgradeable ServerRequest" }) }),
      );
    }
  };
});
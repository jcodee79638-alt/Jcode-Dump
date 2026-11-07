
var apt = ne(() => {
  BH();
  mI();
  Hf();
  R_();
  aL();
  mRe();
  U6();
  T1e();
  tse();
  ese();
  tse();
  $un = class $un extends _W {
    [sw];
    [O1e];
    request;
    source;
    constructor(e, t) {
      super();
      ((this.request = e), (this.source = t), (this[sw] = sw), (this[O1e] = O1e));
    }
    toJSON() {
      return w1e(this, { _id: "HttpClientResponse", request: this.request.toJSON(), status: this.status });
    }
    get status() {
      return this.source.status;
    }
    get headers() {
      return SE(this.source.headers);
    }
    cachedCookies;
    get cookies() {
      if (this.cachedCookies) return this.cachedCookies;
      return (this.cachedCookies = MZt(this.source.headers.getSetCookie()));
    }
    get remoteAddress() {
      return eH();
    }
    get stream() {
      return this.source.body
        ? Npe({
            evaluate: () => this.source.body,
            onError: (e) => new N6({ reason: new Zie({ request: this.request, response: this, cause: e }) }),
          })
        : NW(
            new N6({
              reason: new OZt({
                request: this.request,
                response: this,
                description: "can not create stream from empty body",
              }),
            }),
          );
    }
    get json() {
      return Hi(this.text, (e) =>
        ZA({
          try: () => (e === "" ? null : JSON.parse(e)),
          catch: (t) => new N6({ reason: new Zie({ request: this.request, response: this, cause: t }) }),
        }),
      );
    }
    textBody;
    get text() {
      if (this.textBody) return this.textBody;
      return (
        (this.textBody = bl({
          try: () => this.source.text(),
          catch: (e) => new N6({ reason: new Zie({ request: this.request, response: this, cause: e }) }),
        }).pipe(pD, Yg)),
        (this.arrayBufferBody = Vn(this.textBody, (e) => new TextEncoder().encode(e).buffer)),
        this.textBody
      );
    }
    get urlParamsBody() {
      return Hi(this.text, (e) =>
        ZA({
          try: () => zW(new URLSearchParams(e)),
          catch: (t) => new N6({ reason: new Zie({ request: this.request, response: this, cause: t }) }),
        }),
      );
    }
    formDataBody;
    get formData() {
      return (this.formDataBody ??= bl({
        try: () => this.source.formData(),
        catch: (e) => new N6({ reason: new Zie({ request: this.request, response: this, cause: e }) }),
      }).pipe(pD, Yg));
    }
    arrayBufferBody;
    get arrayBuffer() {
      if (this.arrayBufferBody) return this.arrayBufferBody;
      return (
        (this.arrayBufferBody = bl({
          try: () => this.source.arrayBuffer(),
          catch: (e) => new N6({ reason: new Zie({ request: this.request, response: this, cause: e }) }),
        }).pipe(pD, Yg)),
        (this.textBody = Vn(this.arrayBufferBody, (e) => new TextDecoder().decode(e))),
        this.arrayBufferBody
      );
    }
    pipe() {
      return vA(this, arguments);
    }
  };
});
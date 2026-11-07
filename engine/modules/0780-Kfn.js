
var Kfn = ne(() => {
  Jg();
  YA();
  $6();
  BH();
  ew();
  KH();
  Oie();
  Dd();
  fD();
  aL();
  mRe();
  hRe();
  kpt();
  tse();
  Opt();
  tde();
  eV();
  eV();
  ise();
  Cln();
  Xln();
  ifn();
  Wfn();
  Gfn();
  oWs = ni(function* (e, t) {
    let r = yield* Epe,
      s = e(),
      a = yield* Fd((d) => {
        if (!s.listening) return d(ti);
        s.close((_) => {
          if (_) d(No(_));
          else d(ti);
        });
      }).pipe(pD),
      H = t.disablePreemptiveShutdown
        ? ti
        : Tj(a, { duration: t.gracefulShutdownTimeout ?? Pv(20), orElse: () => ti });
    (yield* UL(r, a),
      yield* Fd((d) => {
        function _(L) {
          d(bn(new ser({ cause: L })));
        }
        (s.on("error", _),
          s.listen(t, () => {
            (s.off("error", _), d(ti));
          }));
      }));
    let u = s.address(),
      f = yield* Bd(
        jn(() => new Vfn.WebSocketServer({ noServer: !0 })),
        (d) =>
          Fd((_) => {
            d.close(() => _(ti));
          }),
      ).pipe($I(r), pD);
    return vln({
      address:
        typeof u === "string"
          ? { _tag: "UnixAddress", path: u }
          : { _tag: "TcpAddress", hostname: u.address === "::" ? "0.0.0.0" : u.address, port: u.port },
      serve: ni(function* (d, _) {
        let L = yield* Epe,
          I = qM(L, "parallel"),
          D = yield* aWs(d, { middleware: _, scope: I }),
          S = yield* HWs(f, d, { middleware: _, scope: I });
        (yield* TW(L, () => (s.off("request", D), s.off("upgrade", S), H)),
          s.on("request", D),
          s.on("upgrade", S));
      }),
    });
  });
  zpt = class zpt extends ver {
    [nde];
    response;
    upgradeEffect;
    url;
    headersOverride;
    constructor(e, t, r, s = e.url, a, H) {
      super(e, (u) => new Nv({ reason: new d2({ request: this, cause: u }) }), H);
      ((this[nde] = nde),
        (this.response = t),
        (this.upgradeEffect = r),
        (this.url = s),
        (this.headersOverride = a));
    }
    cachedCookies;
    get cookies() {
      if (this.cachedCookies) return this.cachedCookies;
      return (this.cachedCookies = Zft(this.headers.cookie ?? ""));
    }
    get resolvedResponse() {
      return typeof this.response === "function" ? this.response() : this.response;
    }
    modify(e) {
      return new zpt(
        this.source,
        this.response,
        this.upgradeEffect,
        e.url ?? this.url,
        e.headers ?? this.headersOverride,
        "remoteAddress" in e ? e.remoteAddress : this.remoteAddressOverride,
      );
    }
    get originalUrl() {
      return this.source.url;
    }
    get method() {
      return this.source.method.toUpperCase();
    }
    get headers() {
      return ((this.headersOverride ??= this.source.headers), this.headersOverride);
    }
    multipartEffect;
    get multipart() {
      if (this.multipartEffect) return this.multipartEffect;
      return ((this.multipartEffect = Yg(pD(tfn(this.source, this.source.headers)))), this.multipartEffect);
    }
    get multipartStream() {
      return wer(this.source, this.source.headers);
    }
    get upgrade() {
      return (
        this.upgradeEffect ??
        bn(new Nv({ reason: new d2({ request: this, description: "not an upgradeable ServerRequest" }) }))
      );
    }
    toString() {
      return `ServerRequest(${this.method} ${this.url})`;
    }
    toJSON() {
      return w1e(this, { _id: "HttpServerRequest", method: this.method, url: this.originalUrl });
    }
  };
  ((cWs = mW(oWs, Es(B1e))), (AWs = VC(Gln, y1e, Rfn)));
});
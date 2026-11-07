
var w4e = Ie(function (cdc, xTe) {
  var { HttpErrorAuthOTP: AGo } = klr(),
    uGo = Aii(),
    Kai = mii(),
    lGo = C4e(),
    zai = Jai(),
    fGo = ky(),
    Qai = cr("querystring"),
    Yoe = cr("url"),
    oDt = Wlr(),
    { Minipass: pGo } = Ny(),
    MTe = Ufr(),
    dGo = (e) => {
      try {
        return !!new Yoe.URL(e);
      } catch (t) {
        return !1;
      }
    };
  xTe.exports = aDt;
  function aDt(e, t = {}) {
    let r = { ...MTe, ...t },
      s = dGo(e),
      a = r.registry || MTe.registry;
    if (!s)
      ((a = r.registry = (r.spec && Yai(r.spec, r)) || r.registry || a),
        (e = `${a.trim().replace(/\/?$/g, "")}/${e.trim().replace(/^\//, "")}`),
        new Yoe.URL(e));
    let H = r.method || "GET",
      u = Date.now(),
      f = Kai(e, r),
      d = LGo(e, f, r),
      _ = r.body,
      L = pGo.isStream(_),
      I = _ && typeof _ === "object" && typeof _.then === "function";
    if (_ && !L && !I && typeof _ !== "string" && !Buffer.isBuffer(_))
      ((d["content-type"] = d["content-type"] || "application/json"), (_ = JSON.stringify(_)));
    else if (_ && !d["content-type"]) d["content-type"] = "application/octet-stream";
    if (r.gzip) {
      if (((d["content-encoding"] = "gzip"), L)) {
        let T = new oDt.Gzip();
        (_.on("error", (C) => T.emit("error", C)), (_ = _.pipe(T)));
      } else if (!I) _ = new oDt.Gzip().end(_).concat();
    }
    let D = new Yoe.URL(e);
    if (r.query) {
      let T = typeof r.query === "string" ? Qai.parse(r.query) : r.query;
      (Object.keys(T).forEach((C) => {
        if (T[C] !== void 0) D.searchParams.set(C, T[C]);
      }),
        (e = Yoe.format(D)));
    }
    if (D.searchParams.get("write") === "true" && H === "GET")
      ((r.offline = !1), (r.preferOffline = !1), (r.preferOnline = !0));
    let S = async (T) => {
      let C = lGo(e, {
        agent: r.agent,
        algorithms: r.algorithms,
        body: T,
        cache: hGo(r),
        cachePath: r.cache,
        ca: r.ca,
        cert: f.cert || r.cert,
        headers: d,
        integrity: r.integrity,
        key: f.key || r.key,
        localAddress: r.localAddress,
        maxSockets: r.maxSockets,
        memoize: r.memoize,
        method: H,
        noProxy: r.noProxy,
        proxy: r.httpsProxy || r.proxy,
        retry: r.retry
          ? r.retry
          : {
              retries: r.fetchRetries,
              factor: r.fetchRetryFactor,
              minTimeout: r.fetchRetryMintimeout,
              maxTimeout: r.fetchRetryMaxtimeout,
            },
        strictSSL: r.strictSSL,
        timeout: r.timeout || 30000,
        signal: r.signal,
      }).then((O) => uGo({ method: H, uri: e, res: O, registry: a, startTime: u, auth: f, opts: r }));
      if (typeof r.otpPrompt === "function")
        return C.catch(async (O) => {
          if (O instanceof AGo) {
            let B;
            try {
              B = await r.otpPrompt();
            } catch (V) {}
            if (!B) throw O;
            return aDt(e, { ...r, otp: B });
          }
          throw O;
        });
      else return C;
    };
    return Promise.resolve(_).then(S);
  }
  xTe.exports.getAuth = Kai;
  xTe.exports.json = mGo;
  function mGo(e, t) {
    return aDt(e, t).then((r) => r.json());
  }
  xTe.exports.json.stream = _Go;
  function _Go(e, t, r = {}) {
    let s = { ...MTe, ...r },
      a = zai.parse(t, s.mapJSON);
    return (
      aDt(e, s)
        .then((H) => H.body.on("error", (u) => a.emit("error", u)).pipe(a))
        .catch((H) => a.emit("error", H)),
      a
    );
  }
  xTe.exports.pickRegistry = Yai;
  function Yai(e, t = {}) {
    e = fGo(e);
    let r = e.scope && t[e.scope.replace(/^@?/, "@") + ":registry"];
    if (!r && t.scope) r = t[t.scope.replace(/^@?/, "@") + ":registry"];
    if (!r) r = t.registry || MTe.registry;
    return r;
  }
  function hGo(e) {
    return e.offline
      ? "only-if-cached"
      : e.preferOffline
        ? "force-cache"
        : e.preferOnline
          ? "no-cache"
          : "default";
  }
  function LGo(e, t, r) {
    let s = Object.assign({ "user-agent": r.userAgent }, r.headers || {});
    if (r.authType) s["npm-auth-type"] = r.authType;
    if (r.scope) s["npm-scope"] = r.scope;
    if (r.npmSession) s["npm-session"] = r.npmSession;
    if (r.npmCommand) s["npm-command"] = r.npmCommand;
    if (t.token) s.authorization = `Bearer ${t.token}`;
    else if (t.auth) s.authorization = `Basic ${t.auth}`;
    if (r.otp) s["npm-otp"] = r.otp;
    return s;
  }
});
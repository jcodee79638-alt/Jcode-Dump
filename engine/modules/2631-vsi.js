
var vsi = Ie(function (AB) {
  var lVo =
      (AB && AB.__createBinding) ||
      (Object.create
        ? function (e, t, r, s) {
            if (s === void 0) s = r;
            var a = Object.getOwnPropertyDescriptor(t, r);
            if (!a || ("get" in a ? !t.__esModule : a.writable || a.configurable))
              a = {
                enumerable: !0,
                get: function () {
                  return t[r];
                },
              };
            Object.defineProperty(e, s, a);
          }
        : function (e, t, r, s) {
            if (s === void 0) s = r;
            e[s] = t[r];
          }),
    fVo =
      (AB && AB.__setModuleDefault) ||
      (Object.create
        ? function (e, t) {
            Object.defineProperty(e, "default", { enumerable: !0, value: t });
          }
        : function (e, t) {
            e.default = t;
          }),
    xsi =
      (AB && AB.__importStar) ||
      function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (e != null) {
          for (var r in e) if (r !== "default" && Object.prototype.hasOwnProperty.call(e, r)) lVo(t, e, r);
        }
        return (fVo(t, e), t);
      },
    pVo =
      (AB && AB.__importDefault) ||
      function (e) {
        return e && e.__esModule ? e : { default: e };
      };
  Object.defineProperty(AB, "__esModule", { value: !0 });
  AB.HttpProxyAgent = void 0;
  var dVo = xsi(cr("net")),
    mVo = xsi(cr("tls")),
    _Vo = pVo(A_e()),
    Ssi = cr("events"),
    Tsi = x4e(),
    PIt = cr("url"),
    mTe = (0, _Vo.default)("http-proxy-agent");
  class spr extends Tsi.Agent {
    constructor(e, t) {
      super(t);
      ((this.proxy = typeof e === "string" ? new PIt.URL(e) : e),
        (this.proxyHeaders = t?.headers ?? {}),
        mTe("Creating new HttpProxyAgent instance: %o", this.proxy.href));
      let r = (this.proxy.hostname || this.proxy.host).replace(/^\[|\]$/g, ""),
        s = this.proxy.port ? parseInt(this.proxy.port, 10) : this.proxy.protocol === "https:" ? 443 : 80;
      this.connectOpts = { ...(t ? hVo(t, "headers") : null), host: r, port: s };
    }
    addRequest(e, t) {
      ((e._header = null), this.setRequestProps(e, t), super.addRequest(e, t));
    }
    setRequestProps(e, t) {
      let { proxy: r } = this,
        s = t.secureEndpoint ? "https:" : "http:",
        a = e.getHeader("host") || "localhost",
        H = `${s}//${a}`,
        u = new PIt.URL(e.path, H);
      if (t.port !== 80) u.port = String(t.port);
      e.path = String(u);
      let f = typeof this.proxyHeaders === "function" ? this.proxyHeaders() : { ...this.proxyHeaders };
      if (r.username || r.password) {
        let d = `${decodeURIComponent(r.username)}:${decodeURIComponent(r.password)}`;
        f["Proxy-Authorization"] = `Basic ${Buffer.from(d).toString("base64")}`;
      }
      if (!f["Proxy-Connection"]) f["Proxy-Connection"] = this.keepAlive ? "Keep-Alive" : "close";
      for (let d of Object.keys(f)) {
        let _ = f[d];
        if (_) e.setHeader(d, _);
      }
    }
    async connect(e, t) {
      if (((e._header = null), !e.path.includes("://"))) this.setRequestProps(e, t);
      let r, s;
      if (
        (mTe("Regenerating stored HTTP header string for request"),
        e._implicitHeader(),
        e.outputData && e.outputData.length > 0)
      )
        (mTe("Patching connection write() output buffer with updated header"),
          (r = e.outputData[0].data),
          (s =
            r.indexOf(`\r
\r
`) + 4),
          (e.outputData[0].data = e._header + r.substring(s)),
          mTe("Output buffer: %o", e.outputData[0].data));
      let a;
      if (this.proxy.protocol === "https:")
        (mTe("Creating `tls.Socket`: %o", this.connectOpts), (a = mVo.connect(this.connectOpts)));
      else (mTe("Creating `net.Socket`: %o", this.connectOpts), (a = dVo.connect(this.connectOpts)));
      return (await Ssi.once(a, "connect"), a);
    }
  }
  spr.protocols = ["http", "https"];
  AB.HttpProxyAgent = spr;
  function hVo(e, ...t) {
    let r = {},
      s;
    for (s in e) if (!t.includes(s)) r[s] = e[s];
    return r;
  }
});
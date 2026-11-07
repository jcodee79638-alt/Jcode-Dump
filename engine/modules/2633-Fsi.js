
var Fsi = Ie(function (uB) {
  var EVo =
      (uB && uB.__createBinding) ||
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
    IVo =
      (uB && uB.__setModuleDefault) ||
      (Object.create
        ? function (e, t) {
            Object.defineProperty(e, "default", { enumerable: !0, value: t });
          }
        : function (e, t) {
            e.default = t;
          }),
    wsi =
      (uB && uB.__importStar) ||
      function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (e != null) {
          for (var r in e) if (r !== "default" && Object.prototype.hasOwnProperty.call(e, r)) EVo(t, e, r);
        }
        return (IVo(t, e), t);
      },
    ksi =
      (uB && uB.__importDefault) ||
      function (e) {
        return e && e.__esModule ? e : { default: e };
      };
  Object.defineProperty(uB, "__esModule", { value: !0 });
  uB.HttpsProxyAgent = void 0;
  var wIt = wsi(cr("net")),
    jsi = wsi(cr("tls")),
    DVo = ksi(cr("assert")),
    yVo = ksi(A_e()),
    Osi = x4e(),
    Usi = cr("url"),
    Nsi = bsi(),
    S4e = (0, yVo.default)("https-proxy-agent"),
    Psi = (e) => {
      if (e.servername === void 0 && e.host && !wIt.isIP(e.host)) return { ...e, servername: e.host };
      return e;
    };
  class opr extends Osi.Agent {
    constructor(e, t) {
      super(t);
      ((this.options = { path: void 0 }),
        (this.proxy = typeof e === "string" ? new Usi.URL(e) : e),
        (this.proxyHeaders = t?.headers ?? {}),
        S4e("Creating new HttpsProxyAgent instance: %o", this.proxy.href));
      let r = (this.proxy.hostname || this.proxy.host).replace(/^\[|\]$/g, ""),
        s = this.proxy.port ? parseInt(this.proxy.port, 10) : this.proxy.protocol === "https:" ? 443 : 80;
      this.connectOpts = { ALPNProtocols: ["http/1.1"], ...(t ? Csi(t, "headers") : null), host: r, port: s };
    }
    async connect(e, t) {
      let { proxy: r } = this;
      if (!t.host) throw TypeError('No "host" provided');
      let s;
      if (r.protocol === "https:")
        (S4e("Creating `tls.Socket`: %o", this.connectOpts), (s = jsi.connect(Psi(this.connectOpts))));
      else (S4e("Creating `net.Socket`: %o", this.connectOpts), (s = wIt.connect(this.connectOpts)));
      let a = typeof this.proxyHeaders === "function" ? this.proxyHeaders() : { ...this.proxyHeaders },
        H = wIt.isIPv6(t.host) ? `[${t.host}]` : t.host,
        u = `CONNECT ${H}:${t.port} HTTP/1.1\r
`;
      if (r.username || r.password) {
        let I = `${decodeURIComponent(r.username)}:${decodeURIComponent(r.password)}`;
        a["Proxy-Authorization"] = `Basic ${Buffer.from(I).toString("base64")}`;
      }
      if (((a.Host = `${H}:${t.port}`), !a["Proxy-Connection"]))
        a["Proxy-Connection"] = this.keepAlive ? "Keep-Alive" : "close";
      for (let I of Object.keys(a))
        u += `${I}: ${a[I]}\r
`;
      let f = Nsi.parseProxyResponse(s);
      s.write(`${u}\r
`);
      let { connect: d, buffered: _ } = await f;
      if ((e.emit("proxyConnect", d), this.emit("proxyConnect", d, e), d.statusCode === 200)) {
        if ((e.once("socket", MVo), t.secureEndpoint))
          return (
            S4e("Upgrading socket connection to TLS"),
            jsi.connect({ ...Csi(Psi(t), "host", "path", "port"), socket: s })
          );
        return s;
      }
      s.destroy();
      let L = new wIt.Socket({ writable: !1 });
      return (
        (L.readable = !0),
        e.once("socket", (I) => {
          (S4e("Replaying proxy buffer for failed request"),
            (0, DVo.default)(I.listenerCount("data") > 0),
            I.push(_),
            I.push(null));
        }),
        L
      );
    }
  }
  opr.protocols = ["http", "https"];
  uB.HttpsProxyAgent = opr;
  function MVo(e) {
    e.resume();
  }
  function Csi(e, ...t) {
    let r = {},
      s;
    for (s in e) if (!t.includes(s)) r[s] = e[s];
    return r;
  }
});
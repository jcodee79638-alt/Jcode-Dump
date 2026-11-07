
var Roi = Ie(function (fB) {
  var J4o =
      (fB && fB.__createBinding) ||
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
    K4o =
      (fB && fB.__setModuleDefault) ||
      (Object.create
        ? function (e, t) {
            Object.defineProperty(e, "default", { enumerable: !0, value: t });
          }
        : function (e, t) {
            e.default = t;
          }),
    _pr =
      (fB && fB.__importStar) ||
      function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (e != null) {
          for (var r in e) if (r !== "default" && Object.prototype.hasOwnProperty.call(e, r)) J4o(t, e, r);
        }
        return (K4o(t, e), t);
      },
    z4o =
      (fB && fB.__importDefault) ||
      function (e) {
        return e && e.__esModule ? e : { default: e };
      };
  Object.defineProperty(fB, "__esModule", { value: !0 });
  fB.SocksProxyAgent = void 0;
  var Noi = Uoi(),
    Foi = x4e(),
    Q4o = z4o(A_e()),
    Y4o = _pr(cr("dns")),
    Z4o = _pr(cr("net")),
    eqo = _pr(cr("tls")),
    Boi = cr("url"),
    qIt = (0, Q4o.default)("socks-proxy-agent"),
    tqo = (e) => {
      if (e.servername === void 0 && e.host && !Z4o.isIP(e.host)) return { ...e, servername: e.host };
      return e;
    };
  function rqo(e) {
    let t = !1,
      r = 5,
      s = e.hostname,
      a = parseInt(e.port, 10) || 1080;
    switch (e.protocol.replace(":", "")) {
      case "socks4":
        ((t = !0), (r = 4));
        break;
      case "socks4a":
        r = 4;
        break;
      case "socks5":
        ((t = !0), (r = 5));
        break;
      case "socks":
        r = 5;
        break;
      case "socks5h":
        r = 5;
        break;
      default:
        throw TypeError(`A "socks" protocol must be specified! Got: ${String(e.protocol)}`);
    }
    let H = { host: s, port: a, type: r };
    if (e.username)
      Object.defineProperty(H, "userId", { value: decodeURIComponent(e.username), enumerable: !1 });
    if (e.password != null)
      Object.defineProperty(H, "password", { value: decodeURIComponent(e.password), enumerable: !1 });
    return { lookup: t, proxy: H };
  }
  class hpr extends Foi.Agent {
    constructor(e, t) {
      super(t);
      let r = typeof e === "string" ? new Boi.URL(e) : e,
        { proxy: s, lookup: a } = rqo(r);
      ((this.shouldLookup = a),
        (this.proxy = s),
        (this.timeout = t?.timeout ?? null),
        (this.socketOptions = t?.socketOptions ?? null));
    }
    async connect(e, t) {
      let { shouldLookup: r, proxy: s, timeout: a } = this;
      if (!t.host) throw Error("No `host` defined!");
      let { host: H } = t,
        { port: u, lookup: f = Y4o.lookup } = t;
      if (r)
        H = await new Promise((I, D) => {
          f(H, {}, (S, T) => {
            if (S) D(S);
            else I(T);
          });
        });
      let d = {
          proxy: s,
          destination: { host: H, port: typeof u === "number" ? u : parseInt(u, 10) },
          command: "connect",
          timeout: a ?? void 0,
          socket_options: this.socketOptions ?? void 0,
        },
        _ = (I) => {
          if ((e.destroy(), L.destroy(), I)) I.destroy();
        };
      qIt("Creating socks proxy connection: %o", d);
      let { socket: L } = await Noi.SocksClient.createConnection(d);
      if ((qIt("Successfully created socks proxy connection"), a !== null))
        (L.setTimeout(a), L.on("timeout", () => _()));
      if (t.secureEndpoint) {
        qIt("Upgrading socket connection to TLS");
        let I = eqo.connect({ ...nqo(tqo(t), "host", "path", "port"), socket: L });
        return (
          I.once("error", (D) => {
            (qIt("Socket TLS error", D.message), _(I));
          }),
          I
        );
      }
      return L;
    }
  }
  hpr.protocols = ["socks", "socks4", "socks4a", "socks5", "socks5h"];
  fB.SocksProxyAgent = hpr;
  function nqo(e, ...t) {
    let r = {},
      s;
    for (s in e) if (!t.includes(s)) r[s] = e[s];
    return r;
  }
});
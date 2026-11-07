
var x4e = Ie(function (hN) {
  var Isi =
      (hN && hN.__createBinding) ||
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
    cVo =
      (hN && hN.__setModuleDefault) ||
      (Object.create
        ? function (e, t) {
            Object.defineProperty(e, "default", { enumerable: !0, value: t });
          }
        : function (e, t) {
            e.default = t;
          }),
    Dsi =
      (hN && hN.__importStar) ||
      function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (e != null) {
          for (var r in e) if (r !== "default" && Object.prototype.hasOwnProperty.call(e, r)) Isi(t, e, r);
        }
        return (cVo(t, e), t);
      },
    AVo =
      (hN && hN.__exportStar) ||
      function (e, t) {
        for (var r in e) if (r !== "default" && !Object.prototype.hasOwnProperty.call(t, r)) Isi(t, e, r);
      };
  Object.defineProperty(hN, "__esModule", { value: !0 });
  hN.Agent = void 0;
  var uVo = Dsi(cr("net")),
    Esi = Dsi(cr("http")),
    ysi = cr("https");
  AVo(gsi(), hN);
  var P5 = Symbol("AgentBaseInternalState");
  class Msi extends Esi.Agent {
    constructor(e) {
      super(e);
      this[P5] = {};
    }
    isSecureEndpoint(e) {
      if (e) {
        if (typeof e.secureEndpoint === "boolean") return e.secureEndpoint;
        if (typeof e.protocol === "string") return e.protocol === "https:";
      }
      let { stack: t } = Error();
      if (typeof t !== "string") return !1;
      return t
        .split(
          `
`,
        )
        .some((r) => r.indexOf("(https.js:") !== -1 || r.indexOf("node:https:") !== -1);
    }
    incrementSockets(e) {
      if (this.maxSockets === 1 / 0 && this.maxTotalSockets === 1 / 0) return null;
      if (!this.sockets[e]) this.sockets[e] = [];
      let t = new uVo.Socket({ writable: !1 });
      return (this.sockets[e].push(t), this.totalSocketCount++, t);
    }
    decrementSockets(e, t) {
      if (!this.sockets[e] || t === null) return;
      let r = this.sockets[e],
        s = r.indexOf(t);
      if (s !== -1) {
        if ((r.splice(s, 1), this.totalSocketCount--, r.length === 0)) delete this.sockets[e];
      }
    }
    getName(e) {
      if (this.isSecureEndpoint(e)) return ysi.Agent.prototype.getName.call(this, e);
      return super.getName(e);
    }
    createSocket(e, t, r) {
      let s = { ...t, secureEndpoint: this.isSecureEndpoint(t) },
        a = this.getName(s),
        H = this.incrementSockets(a);
      Promise.resolve()
        .then(() => this.connect(e, s))
        .then(
          (u) => {
            if ((this.decrementSockets(a, H), u instanceof Esi.Agent))
              try {
                return u.addRequest(e, s);
              } catch (f) {
                return r(f);
              }
            ((this[P5].currentSocket = u), super.createSocket(e, t, r));
          },
          (u) => {
            (this.decrementSockets(a, H), r(u));
          },
        );
    }
    createConnection() {
      let e = this[P5].currentSocket;
      if (((this[P5].currentSocket = void 0), !e))
        throw Error("No socket was returned in the `connect()` function");
      return e;
    }
    get defaultPort() {
      return this[P5].defaultPort ?? (this.protocol === "https:" ? 443 : 80);
    }
    set defaultPort(e) {
      if (this[P5]) this[P5].defaultPort = e;
    }
    get protocol() {
      return this[P5].protocol ?? (this.isSecureEndpoint() ? "https:" : "http:");
    }
    set protocol(e) {
      if (this[P5]) this[P5].protocol = e;
    }
  }
  hN.Agent = Msi;
});

var u5i = Ie(function (r_) {
  var AGa =
      (r_ && r_.__createBinding) ||
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
    uGa =
      (r_ && r_.__exportStar) ||
      function (e, t) {
        for (var r in e) if (r !== "default" && !Object.prototype.hasOwnProperty.call(t, r)) AGa(t, e, r);
      };
  Object.defineProperty(r_, "__esModule", { value: !0 });
  r_.createMessageConnection =
    r_.createServerSocketTransport =
    r_.createClientSocketTransport =
    r_.createServerPipeTransport =
    r_.createClientPipeTransport =
    r_.generateRandomPipeName =
    r_.StreamMessageWriter =
    r_.StreamMessageReader =
    r_.SocketMessageWriter =
    r_.SocketMessageReader =
    r_.PortMessageWriter =
    r_.PortMessageReader =
    r_.IPCMessageWriter =
    r_.IPCMessageReader =
      void 0;
  var XCe = n5i();
  XCe.default.install();
  var $Ct = cr("path"),
    s5i = cr("os"),
    o5i = cr("crypto"),
    Bce = cr("net"),
    c0 = _Ct();
  uGa(_Ct(), r_);
  class a5i extends c0.AbstractMessageReader {
    constructor(e) {
      super();
      this.process = e;
      let t = this.process;
      (t.on("error", (r) => this.fireError(r)), t.on("close", () => this.fireClose()));
    }
    listen(e) {
      return (this.process.on("message", e), c0.Disposable.create(() => this.process.off("message", e)));
    }
  }
  r_.IPCMessageReader = a5i;
  class H5i extends c0.AbstractMessageWriter {
    constructor(e) {
      super();
      ((this.process = e), (this.errorCount = 0));
      let t = this.process;
      (t.on("error", (r) => this.fireError(r)), t.on("close", () => this.fireClose));
    }
    write(e) {
      try {
        if (typeof this.process.send === "function")
          this.process.send(e, void 0, void 0, (t) => {
            if (t) (this.errorCount++, this.handleError(t, e));
            else this.errorCount = 0;
          });
        return Promise.resolve();
      } catch (t) {
        return (this.handleError(t, e), Promise.reject(t));
      }
    }
    handleError(e, t) {
      (this.errorCount++, this.fireError(e, t, this.errorCount));
    }
    end() {}
  }
  r_.IPCMessageWriter = H5i;
  class c5i extends c0.AbstractMessageReader {
    constructor(e) {
      super();
      ((this.onData = new c0.Emitter()),
        e.on("close", () => this.fireClose),
        e.on("error", (t) => this.fireError(t)),
        e.on("message", (t) => {
          this.onData.fire(t);
        }));
    }
    listen(e) {
      return this.onData.event(e);
    }
  }
  r_.PortMessageReader = c5i;
  class A5i extends c0.AbstractMessageWriter {
    constructor(e) {
      super();
      ((this.port = e),
        (this.errorCount = 0),
        e.on("close", () => this.fireClose()),
        e.on("error", (t) => this.fireError(t)));
    }
    write(e) {
      try {
        return (this.port.postMessage(e), Promise.resolve());
      } catch (t) {
        return (this.handleError(t, e), Promise.reject(t));
      }
    }
    handleError(e, t) {
      (this.errorCount++, this.fireError(e, t, this.errorCount));
    }
    end() {}
  }
  r_.PortMessageWriter = A5i;
  class JCe extends c0.ReadableStreamMessageReader {
    constructor(e, t = "utf-8") {
      super((0, XCe.default)().stream.asReadableStream(e), t);
    }
  }
  r_.SocketMessageReader = JCe;
  class KCe extends c0.WriteableStreamMessageWriter {
    constructor(e, t) {
      super((0, XCe.default)().stream.asWritableStream(e), t);
      this.socket = e;
    }
    dispose() {
      (super.dispose(), this.socket.destroy());
    }
  }
  r_.SocketMessageWriter = KCe;
  class hjr extends c0.ReadableStreamMessageReader {
    constructor(e, t) {
      super((0, XCe.default)().stream.asReadableStream(e), t);
    }
  }
  r_.StreamMessageReader = hjr;
  class Ljr extends c0.WriteableStreamMessageWriter {
    constructor(e, t) {
      super((0, XCe.default)().stream.asWritableStream(e), t);
    }
  }
  r_.StreamMessageWriter = Ljr;
  var i5i = process.env.XDG_RUNTIME_DIR,
    lGa = new Map([
      ["linux", 107],
      ["darwin", 103],
    ]);
  function fGa() {
    let e = o5i.randomBytes(21).toString("hex");
    return `\\\\.\\pipe\\vscode-jsonrpc-${e}-sock`;
  }
  r_.generateRandomPipeName = fGa;
  function pGa(e, t = "utf-8") {
    let r,
      s = new Promise((a, H) => {
        r = a;
      });
    return new Promise((a, H) => {
      let u = Bce.createServer((f) => {
        (u.close(), r([new JCe(f, t), new KCe(f, t)]));
      });
      (u.on("error", H),
        u.listen(e, () => {
          (u.removeListener("error", H), a({ onConnected: () => s }));
        }));
    });
  }
  r_.createClientPipeTransport = pGa;
  function dGa(e, t = "utf-8") {
    let r = Bce.createConnection(e);
    return [new JCe(r, t), new KCe(r, t)];
  }
  r_.createServerPipeTransport = dGa;
  function mGa(e, t = "utf-8") {
    let r,
      s = new Promise((a, H) => {
        r = a;
      });
    return new Promise((a, H) => {
      let u = Bce.createServer((f) => {
        (u.close(), r([new JCe(f, t), new KCe(f, t)]));
      });
      (u.on("error", H),
        u.listen(e, "127.0.0.1", () => {
          (u.removeListener("error", H), a({ onConnected: () => s }));
        }));
    });
  }
  r_.createClientSocketTransport = mGa;
  function _Ga(e, t = "utf-8") {
    let r = Bce.createConnection(e, "127.0.0.1");
    return [new JCe(r, t), new KCe(r, t)];
  }
  r_.createServerSocketTransport = _Ga;
  function hGa(e) {
    let t = e;
    return t.read !== void 0 && t.addListener !== void 0;
  }
  function LGa(e) {
    let t = e;
    return t.write !== void 0 && t.addListener !== void 0;
  }
  function $Ga(e, t, r, s) {
    if (!r) r = c0.NullLogger;
    let a = hGa(e) ? new hjr(e) : e,
      H = LGa(t) ? new Ljr(t) : t;
    if (c0.ConnectionStrategy.is(s)) s = { connectionStrategy: s };
    return c0.createMessageConnection(a, H, r, s);
  }
  r_.createMessageConnection = $Ga;
});
import { buffer as l5i } from "stream/consumers";
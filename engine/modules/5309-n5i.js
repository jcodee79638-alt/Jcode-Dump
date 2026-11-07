
var n5i = Ie(function (r5i) {
  Object.defineProperty(r5i, "__esModule", { value: !0 });
  var hCt = cr("util"),
    xT = _Ct();
  class LCt extends xT.AbstractMessageBuffer {
    constructor(e = "utf-8") {
      super(e);
    }
    emptyBuffer() {
      return LCt.emptyBuffer;
    }
    fromString(e, t) {
      return Buffer.from(e, t);
    }
    toString(e, t) {
      if (e instanceof Buffer) return e.toString(t);
      else return new hCt.TextDecoder(t).decode(e);
    }
    asNative(e, t) {
      if (t === void 0) return e instanceof Buffer ? e : Buffer.from(e);
      else return e instanceof Buffer ? e.slice(0, t) : Buffer.from(e, 0, t);
    }
    allocNative(e) {
      return Buffer.allocUnsafe(e);
    }
  }
  LCt.emptyBuffer = Buffer.allocUnsafe(0);
  class ZGi {
    constructor(e) {
      this.stream = e;
    }
    onClose(e) {
      return (this.stream.on("close", e), xT.Disposable.create(() => this.stream.off("close", e)));
    }
    onError(e) {
      return (this.stream.on("error", e), xT.Disposable.create(() => this.stream.off("error", e)));
    }
    onEnd(e) {
      return (this.stream.on("end", e), xT.Disposable.create(() => this.stream.off("end", e)));
    }
    onData(e) {
      return (this.stream.on("data", e), xT.Disposable.create(() => this.stream.off("data", e)));
    }
  }
  class e5i {
    constructor(e) {
      this.stream = e;
    }
    onClose(e) {
      return (this.stream.on("close", e), xT.Disposable.create(() => this.stream.off("close", e)));
    }
    onError(e) {
      return (this.stream.on("error", e), xT.Disposable.create(() => this.stream.off("error", e)));
    }
    onEnd(e) {
      return (this.stream.on("end", e), xT.Disposable.create(() => this.stream.off("end", e)));
    }
    write(e, t) {
      return new Promise((r, s) => {
        let a = (H) => {
          if (H === void 0 || H === null) r();
          else s(H);
        };
        if (typeof e === "string") this.stream.write(e, t, a);
        else this.stream.write(e, a);
      });
    }
    end() {
      this.stream.end();
    }
  }
  var t5i = Object.freeze({
    messageBuffer: Object.freeze({ create: (e) => new LCt(e) }),
    applicationJson: Object.freeze({
      encoder: Object.freeze({
        name: "application/json",
        encode: (e, t) => {
          try {
            return Promise.resolve(Buffer.from(JSON.stringify(e, void 0, 0), t.charset));
          } catch (r) {
            return Promise.reject(r);
          }
        },
      }),
      decoder: Object.freeze({
        name: "application/json",
        decode: (e, t) => {
          try {
            if (e instanceof Buffer) return Promise.resolve(JSON.parse(e.toString(t.charset)));
            else return Promise.resolve(JSON.parse(new hCt.TextDecoder(t.charset).decode(e)));
          } catch (r) {
            return Promise.reject(r);
          }
        },
      }),
    }),
    stream: Object.freeze({ asReadableStream: (e) => new ZGi(e), asWritableStream: (e) => new e5i(e) }),
    console,
    timer: Object.freeze({
      setTimeout(e, t, ...r) {
        let s = setTimeout(e, t, ...r);
        return { dispose: () => clearTimeout(s) };
      },
      setImmediate(e, ...t) {
        let r = setImmediate(e, ...t);
        return { dispose: () => clearImmediate(r) };
      },
      setInterval(e, t, ...r) {
        let s = setInterval(e, t, ...r);
        return { dispose: () => clearInterval(s) };
      },
    }),
  });
  function _jr() {
    return t5i;
  }
  (function (e) {
    function t() {
      xT.RAL.install(t5i);
    }
    e.install = t;
  })(_jr || (_jr = {}));
  r5i.default = _jr;
});
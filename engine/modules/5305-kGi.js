
var kGi = Ie(function (CGi) {
  Object.defineProperty(CGi, "__esModule", { value: !0 });
  CGi.WriteableStreamMessageWriter = CGi.AbstractMessageWriter = CGi.MessageWriter = void 0;
  var TGi = Fce(),
    dJ = UCe(),
    jGi = ojr(),
    oCt = NCe(),
    Oqa = "Content-Length: ",
    vGi = `\r
`,
    bGi;
  (function (e) {
    function t(r) {
      let s = r;
      return s && dJ.func(s.dispose) && dJ.func(s.onClose) && dJ.func(s.onError) && dJ.func(s.write);
    }
    e.is = t;
  })(bGi || (CGi.MessageWriter = bGi = {}));
  class ujr {
    constructor() {
      ((this.errorEmitter = new oCt.Emitter()), (this.closeEmitter = new oCt.Emitter()));
    }
    dispose() {
      (this.errorEmitter.dispose(), this.closeEmitter.dispose());
    }
    get onError() {
      return this.errorEmitter.event;
    }
    fireError(e, t, r) {
      this.errorEmitter.fire([this.asError(e), t, r]);
    }
    get onClose() {
      return this.closeEmitter.event;
    }
    fireClose() {
      this.closeEmitter.fire(void 0);
    }
    asError(e) {
      if (e instanceof Error) return e;
      else return Error(`Writer received error. Reason: ${dJ.string(e.message) ? e.message : "unknown"}`);
    }
  }
  CGi.AbstractMessageWriter = ujr;
  var Ajr;
  (function (e) {
    function t(r) {
      if (r === void 0 || typeof r === "string")
        return { charset: r ?? "utf-8", contentTypeEncoder: (0, TGi.default)().applicationJson.encoder };
      else
        return {
          charset: r.charset ?? "utf-8",
          contentEncoder: r.contentEncoder,
          contentTypeEncoder: r.contentTypeEncoder ?? (0, TGi.default)().applicationJson.encoder,
        };
    }
    e.fromOptions = t;
  })(Ajr || (Ajr = {}));
  class PGi extends ujr {
    constructor(e, t) {
      super();
      ((this.writable = e),
        (this.options = Ajr.fromOptions(t)),
        (this.errorCount = 0),
        (this.writeSemaphore = new jGi.Semaphore(1)),
        this.writable.onError((r) => this.fireError(r)),
        this.writable.onClose(() => this.fireClose()));
    }
    async write(e) {
      return this.writeSemaphore.lock(async () =>
        this.options.contentTypeEncoder
          .encode(e, this.options)
          .then((r) => {
            if (this.options.contentEncoder !== void 0) return this.options.contentEncoder.encode(r);
            else return r;
          })
          .then(
            (r) => {
              let s = [];
              return (s.push(Oqa, r.byteLength.toString(), vGi), s.push(vGi), this.doWrite(e, s, r));
            },
            (r) => {
              throw (this.fireError(r), r);
            },
          ),
      );
    }
    async doWrite(e, t, r) {
      try {
        return (await this.writable.write(t.join(""), "ascii"), this.writable.write(r));
      } catch (s) {
        return (this.handleError(s, e), Promise.reject(s));
      }
    }
    handleError(e, t) {
      (this.errorCount++, this.fireError(e, t, this.errorCount));
    }
    end() {
      this.writable.end();
    }
  }
  CGi.WriteableStreamMessageWriter = PGi;
});
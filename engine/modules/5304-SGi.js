
var SGi = Ie(function (MGi) {
  Object.defineProperty(MGi, "__esModule", { value: !0 });
  MGi.ReadableStreamMessageReader = MGi.AbstractMessageReader = MGi.MessageReader = void 0;
  var ajr = Fce(),
    uR = UCe(),
    BCe = NCe(),
    DGi = ojr(),
    IGi;
  (function (e) {
    function t(r) {
      let s = r;
      return (
        s &&
        uR.func(s.listen) &&
        uR.func(s.dispose) &&
        uR.func(s.onError) &&
        uR.func(s.onClose) &&
        uR.func(s.onPartialMessage)
      );
    }
    e.is = t;
  })(IGi || (MGi.MessageReader = IGi = {}));
  class cjr {
    constructor() {
      ((this.errorEmitter = new BCe.Emitter()),
        (this.closeEmitter = new BCe.Emitter()),
        (this.partialMessageEmitter = new BCe.Emitter()));
    }
    dispose() {
      (this.errorEmitter.dispose(), this.closeEmitter.dispose());
    }
    get onError() {
      return this.errorEmitter.event;
    }
    fireError(e) {
      this.errorEmitter.fire(this.asError(e));
    }
    get onClose() {
      return this.closeEmitter.event;
    }
    fireClose() {
      this.closeEmitter.fire(void 0);
    }
    get onPartialMessage() {
      return this.partialMessageEmitter.event;
    }
    firePartialMessage(e) {
      this.partialMessageEmitter.fire(e);
    }
    asError(e) {
      if (e instanceof Error) return e;
      else return Error(`Reader received error. Reason: ${uR.string(e.message) ? e.message : "unknown"}`);
    }
  }
  MGi.AbstractMessageReader = cjr;
  var Hjr;
  (function (e) {
    function t(r) {
      let s,
        a,
        H,
        u = new Map(),
        f,
        d = new Map();
      if (r === void 0 || typeof r === "string") s = r ?? "utf-8";
      else {
        if (((s = r.charset ?? "utf-8"), r.contentDecoder !== void 0))
          ((H = r.contentDecoder), u.set(H.name, H));
        if (r.contentDecoders !== void 0) for (let _ of r.contentDecoders) u.set(_.name, _);
        if (r.contentTypeDecoder !== void 0) ((f = r.contentTypeDecoder), d.set(f.name, f));
        if (r.contentTypeDecoders !== void 0) for (let _ of r.contentTypeDecoders) d.set(_.name, _);
      }
      if (f === void 0) ((f = (0, ajr.default)().applicationJson.decoder), d.set(f.name, f));
      return {
        charset: s,
        contentDecoder: H,
        contentDecoders: u,
        contentTypeDecoder: f,
        contentTypeDecoders: d,
      };
    }
    e.fromOptions = t;
  })(Hjr || (Hjr = {}));
  class yGi extends cjr {
    constructor(e, t) {
      super();
      ((this.readable = e),
        (this.options = Hjr.fromOptions(t)),
        (this.buffer = (0, ajr.default)().messageBuffer.create(this.options.charset)),
        (this._partialMessageTimeout = 1e4),
        (this.nextMessageLength = -1),
        (this.messageToken = 0),
        (this.readSemaphore = new DGi.Semaphore(1)));
    }
    set partialMessageTimeout(e) {
      this._partialMessageTimeout = e;
    }
    get partialMessageTimeout() {
      return this._partialMessageTimeout;
    }
    listen(e) {
      ((this.nextMessageLength = -1),
        (this.messageToken = 0),
        (this.partialMessageTimer = void 0),
        (this.callback = e));
      let t = this.readable.onData((r) => {
        this.onData(r);
      });
      return (
        this.readable.onError((r) => this.fireError(r)),
        this.readable.onClose(() => this.fireClose()),
        t
      );
    }
    onData(e) {
      try {
        this.buffer.append(e);
        while (!0) {
          if (this.nextMessageLength === -1) {
            let r = this.buffer.tryReadHeaders(!0);
            if (!r) return;
            let s = r.get("content-length");
            if (!s) {
              this.fireError(
                Error(`Header must provide a Content-Length property.
${JSON.stringify(Object.fromEntries(r))}`),
              );
              return;
            }
            let a = parseInt(s);
            if (isNaN(a)) {
              this.fireError(Error(`Content-Length value must be a number. Got ${s}`));
              return;
            }
            this.nextMessageLength = a;
          }
          let t = this.buffer.tryReadBody(this.nextMessageLength);
          if (t === void 0) {
            this.setPartialMessageTimer();
            return;
          }
          (this.clearPartialMessageTimer(),
            (this.nextMessageLength = -1),
            this.readSemaphore
              .lock(async () => {
                let r =
                    this.options.contentDecoder !== void 0 ? await this.options.contentDecoder.decode(t) : t,
                  s = await this.options.contentTypeDecoder.decode(r, this.options);
                this.callback(s);
              })
              .catch((r) => {
                this.fireError(r);
              }));
        }
      } catch (t) {
        this.fireError(t);
      }
    }
    clearPartialMessageTimer() {
      if (this.partialMessageTimer) (this.partialMessageTimer.dispose(), (this.partialMessageTimer = void 0));
    }
    setPartialMessageTimer() {
      if ((this.clearPartialMessageTimer(), this._partialMessageTimeout <= 0)) return;
      this.partialMessageTimer = (0, ajr.default)().timer.setTimeout(
        (e, t) => {
          if (((this.partialMessageTimer = void 0), e === this.messageToken))
            (this.firePartialMessage({ messageToken: e, waitingTime: t }), this.setPartialMessageTimer());
        },
        this._partialMessageTimeout,
        this.messageToken,
        this._partialMessageTimeout,
      );
    }
  }
  MGi.ReadableStreamMessageReader = yGi;
});
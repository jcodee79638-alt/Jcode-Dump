
var Ny = Ie(function (vw) {
  var FOo =
    (vw && vw.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(vw, "__esModule", { value: !0 });
  vw.Minipass = vw.isWritable = vw.isReadable = vw.isStream = void 0;
  var WYn = typeof process === "object" && process ? process : { stdout: null, stderr: null },
    SSe = cr("events"),
    XYn = FOo(cr("stream")),
    JYn = cr("string_decoder"),
    BOo = (e) =>
      !!e &&
      typeof e === "object" &&
      (e instanceof Mur || e instanceof XYn.default || (0, vw.isReadable)(e) || (0, vw.isWritable)(e));
  vw.isStream = BOo;
  var ROo = (e) =>
    !!e &&
    typeof e === "object" &&
    e instanceof SSe.EventEmitter &&
    typeof e.pipe === "function" &&
    e.pipe !== XYn.default.Writable.prototype.pipe;
  vw.isReadable = ROo;
  var WOo = (e) =>
    !!e &&
    typeof e === "object" &&
    e instanceof SSe.EventEmitter &&
    typeof e.write === "function" &&
    typeof e.end === "function";
  vw.isWritable = WOo;
  var KY = Symbol("EOF"),
    zY = Symbol("maybeEmitEnd"),
    Coe = Symbol("emittedEnd"),
    cEt = Symbol("emittingEnd"),
    U7e = Symbol("emittedError"),
    AEt = Symbol("closed"),
    VYn = Symbol("read"),
    uEt = Symbol("flush"),
    qYn = Symbol("flushChunk"),
    FV = Symbol("encoding"),
    MSe = Symbol("decoder"),
    nT = Symbol("flowing"),
    N7e = Symbol("paused"),
    xSe = Symbol("resume"),
    iT = Symbol("buffer"),
    Tw = Symbol("pipes"),
    sT = Symbol("bufferLength"),
    $ur = Symbol("bufferPush"),
    lEt = Symbol("bufferShift"),
    eP = Symbol("objectMode"),
    Uy = Symbol("destroyed"),
    gur = Symbol("error"),
    Eur = Symbol("emitData"),
    GYn = Symbol("emitEnd"),
    Iur = Symbol("emitEnd2"),
    E5 = Symbol("async"),
    Dur = Symbol("abort"),
    fEt = Symbol("aborted"),
    F7e = Symbol("signal"),
    Kme = Symbol("dataListeners"),
    pN = Symbol("discarded"),
    B7e = (e) => Promise.resolve().then(e),
    VOo = (e) => e(),
    qOo = (e) => e === "end" || e === "finish" || e === "prefinish",
    GOo = (e) =>
      e instanceof ArrayBuffer ||
      (!!e &&
        typeof e === "object" &&
        e.constructor &&
        e.constructor.name === "ArrayBuffer" &&
        e.byteLength >= 0),
    XOo = (e) => !Buffer.isBuffer(e) && ArrayBuffer.isView(e);
  class yur {
    src;
    dest;
    opts;
    ondrain;
    constructor(e, t, r) {
      ((this.src = e),
        (this.dest = t),
        (this.opts = r),
        (this.ondrain = () => e[xSe]()),
        this.dest.on("drain", this.ondrain));
    }
    unpipe() {
      this.dest.removeListener("drain", this.ondrain);
    }
    proxyErrors(e) {}
    end() {
      if ((this.unpipe(), this.opts.end)) this.dest.end();
    }
  }
  class KYn extends yur {
    unpipe() {
      (this.src.removeListener("error", this.proxyErrors), super.unpipe());
    }
    constructor(e, t, r) {
      super(e, t, r);
      ((this.proxyErrors = (s) => this.dest.emit("error", s)), e.on("error", this.proxyErrors));
    }
  }
  var JOo = (e) => !!e.objectMode,
    KOo = (e) => !e.objectMode && !!e.encoding && e.encoding !== "buffer";
  class Mur extends SSe.EventEmitter {
    [nT] = !1;
    [N7e] = !1;
    [Tw] = [];
    [iT] = [];
    [eP];
    [FV];
    [E5];
    [MSe];
    [KY] = !1;
    [Coe] = !1;
    [cEt] = !1;
    [AEt] = !1;
    [U7e] = null;
    [sT] = 0;
    [Uy] = !1;
    [F7e];
    [fEt] = !1;
    [Kme] = 0;
    [pN] = !1;
    writable = !0;
    readable = !0;
    constructor(...e) {
      let t = e[0] || {};
      super();
      if (t.objectMode && typeof t.encoding === "string")
        throw TypeError("Encoding and objectMode may not be used together");
      if (JOo(t)) ((this[eP] = !0), (this[FV] = null));
      else if (KOo(t)) ((this[FV] = t.encoding), (this[eP] = !1));
      else ((this[eP] = !1), (this[FV] = null));
      if (
        ((this[E5] = !!t.async),
        (this[MSe] = this[FV] ? new JYn.StringDecoder(this[FV]) : null),
        t && t.debugExposeBuffer === !0)
      )
        Object.defineProperty(this, "buffer", { get: () => this[iT] });
      if (t && t.debugExposePipes === !0) Object.defineProperty(this, "pipes", { get: () => this[Tw] });
      let { signal: r } = t;
      if (r)
        if (((this[F7e] = r), r.aborted)) this[Dur]();
        else r.addEventListener("abort", () => this[Dur]());
    }
    get bufferLength() {
      return this[sT];
    }
    get encoding() {
      return this[FV];
    }
    set encoding(e) {
      throw Error("Encoding must be set at instantiation time");
    }
    setEncoding(e) {
      throw Error("Encoding must be set at instantiation time");
    }
    get objectMode() {
      return this[eP];
    }
    set objectMode(e) {
      throw Error("objectMode must be set at instantiation time");
    }
    get ["async"]() {
      return this[E5];
    }
    set ["async"](e) {
      this[E5] = this[E5] || !!e;
    }
    [Dur]() {
      ((this[fEt] = !0), this.emit("abort", this[F7e]?.reason), this.destroy(this[F7e]?.reason));
    }
    get aborted() {
      return this[fEt];
    }
    set aborted(e) {}
    write(e, t, r) {
      if (this[fEt]) return !1;
      if (this[KY]) throw Error("write after end");
      if (this[Uy])
        return (
          this.emit(
            "error",
            Object.assign(Error("Cannot call write after a stream was destroyed"), {
              code: "ERR_STREAM_DESTROYED",
            }),
          ),
          !0
        );
      if (typeof t === "function") ((r = t), (t = "utf8"));
      if (!t) t = "utf8";
      let s = this[E5] ? B7e : VOo;
      if (!this[eP] && !Buffer.isBuffer(e)) {
        if (XOo(e)) e = Buffer.from(e.buffer, e.byteOffset, e.byteLength);
        else if (GOo(e)) e = Buffer.from(e);
        else if (typeof e !== "string") throw Error("Non-contiguous data written to non-objectMode stream");
      }
      if (this[eP]) {
        if (this[nT] && this[sT] !== 0) this[uEt](!0);
        if (this[nT]) this.emit("data", e);
        else this[$ur](e);
        if (this[sT] !== 0) this.emit("readable");
        if (r) s(r);
        return this[nT];
      }
      if (!e.length) {
        if (this[sT] !== 0) this.emit("readable");
        if (r) s(r);
        return this[nT];
      }
      if (typeof e === "string" && !(t === this[FV] && !this[MSe]?.lastNeed)) e = Buffer.from(e, t);
      if (Buffer.isBuffer(e) && this[FV]) e = this[MSe].write(e);
      if (this[nT] && this[sT] !== 0) this[uEt](!0);
      if (this[nT]) this.emit("data", e);
      else this[$ur](e);
      if (this[sT] !== 0) this.emit("readable");
      if (r) s(r);
      return this[nT];
    }
    read(e) {
      if (this[Uy]) return null;
      if (((this[pN] = !1), this[sT] === 0 || e === 0 || (e && e > this[sT]))) return (this[zY](), null);
      if (this[eP]) e = null;
      if (this[iT].length > 1 && !this[eP])
        this[iT] = [this[FV] ? this[iT].join("") : Buffer.concat(this[iT], this[sT])];
      let t = this[VYn](e || null, this[iT][0]);
      return (this[zY](), t);
    }
    [VYn](e, t) {
      if (this[eP]) this[lEt]();
      else {
        let r = t;
        if (e === r.length || e === null) this[lEt]();
        else if (typeof r === "string") ((this[iT][0] = r.slice(e)), (t = r.slice(0, e)), (this[sT] -= e));
        else ((this[iT][0] = r.subarray(e)), (t = r.subarray(0, e)), (this[sT] -= e));
      }
      if ((this.emit("data", t), !this[iT].length && !this[KY])) this.emit("drain");
      return t;
    }
    end(e, t, r) {
      if (typeof e === "function") ((r = e), (e = void 0));
      if (typeof t === "function") ((r = t), (t = "utf8"));
      if (e !== void 0) this.write(e, t);
      if (r) this.once("end", r);
      if (((this[KY] = !0), (this.writable = !1), this[nT] || !this[N7e])) this[zY]();
      return this;
    }
    [xSe]() {
      if (this[Uy]) return;
      if (!this[Kme] && !this[Tw].length) this[pN] = !0;
      if (((this[N7e] = !1), (this[nT] = !0), this.emit("resume"), this[iT].length)) this[uEt]();
      else if (this[KY]) this[zY]();
      else this.emit("drain");
    }
    resume() {
      return this[xSe]();
    }
    pause() {
      ((this[nT] = !1), (this[N7e] = !0), (this[pN] = !1));
    }
    get destroyed() {
      return this[Uy];
    }
    get flowing() {
      return this[nT];
    }
    get paused() {
      return this[N7e];
    }
    [$ur](e) {
      if (this[eP]) this[sT] += 1;
      else this[sT] += e.length;
      this[iT].push(e);
    }
    [lEt]() {
      if (this[eP]) this[sT] -= 1;
      else this[sT] -= this[iT][0].length;
      return this[iT].shift();
    }
    [uEt](e = !1) {
      do;
      while (this[qYn](this[lEt]()) && this[iT].length);
      if (!e && !this[iT].length && !this[KY]) this.emit("drain");
    }
    [qYn](e) {
      return (this.emit("data", e), this[nT]);
    }
    pipe(e, t) {
      if (this[Uy]) return e;
      this[pN] = !1;
      let r = this[Coe];
      if (((t = t || {}), e === WYn.stdout || e === WYn.stderr)) t.end = !1;
      else t.end = t.end !== !1;
      if (((t.proxyErrors = !!t.proxyErrors), r)) {
        if (t.end) e.end();
      } else if ((this[Tw].push(!t.proxyErrors ? new yur(this, e, t) : new KYn(this, e, t)), this[E5]))
        B7e(() => this[xSe]());
      else this[xSe]();
      return e;
    }
    unpipe(e) {
      let t = this[Tw].find((r) => r.dest === e);
      if (t) {
        if (this[Tw].length === 1) {
          if (this[nT] && this[Kme] === 0) this[nT] = !1;
          this[Tw] = [];
        } else this[Tw].splice(this[Tw].indexOf(t), 1);
        t.unpipe();
      }
    }
    addListener(e, t) {
      return this.on(e, t);
    }
    on(e, t) {
      let r = super.on(e, t);
      if (e === "data") {
        if (((this[pN] = !1), this[Kme]++, !this[Tw].length && !this[nT])) this[xSe]();
      } else if (e === "readable" && this[sT] !== 0) super.emit("readable");
      else if (qOo(e) && this[Coe]) (super.emit(e), this.removeAllListeners(e));
      else if (e === "error" && this[U7e]) {
        let s = t;
        if (this[E5]) B7e(() => s.call(this, this[U7e]));
        else s.call(this, this[U7e]);
      }
      return r;
    }
    removeListener(e, t) {
      return this.off(e, t);
    }
    off(e, t) {
      let r = super.off(e, t);
      if (e === "data") {
        if (((this[Kme] = this.listeners("data").length), this[Kme] === 0 && !this[pN] && !this[Tw].length))
          this[nT] = !1;
      }
      return r;
    }
    removeAllListeners(e) {
      let t = super.removeAllListeners(e);
      if (e === "data" || e === void 0) {
        if (((this[Kme] = 0), !this[pN] && !this[Tw].length)) this[nT] = !1;
      }
      return t;
    }
    get emittedEnd() {
      return this[Coe];
    }
    [zY]() {
      if (!this[cEt] && !this[Coe] && !this[Uy] && this[iT].length === 0 && this[KY]) {
        if (((this[cEt] = !0), this.emit("end"), this.emit("prefinish"), this.emit("finish"), this[AEt]))
          this.emit("close");
        this[cEt] = !1;
      }
    }
    emit(e, ...t) {
      let r = t[0];
      if (e !== "error" && e !== "close" && e !== Uy && this[Uy]) return !1;
      else if (e === "data")
        return !this[eP] && !r ? !1 : this[E5] ? (B7e(() => this[Eur](r)), !0) : this[Eur](r);
      else if (e === "end") return this[GYn]();
      else if (e === "close") {
        if (((this[AEt] = !0), !this[Coe] && !this[Uy])) return !1;
        let a = super.emit("close");
        return (this.removeAllListeners("close"), a);
      } else if (e === "error") {
        ((this[U7e] = r), super.emit(gur, r));
        let a = !this[F7e] || this.listeners("error").length ? super.emit("error", r) : !1;
        return (this[zY](), a);
      } else if (e === "resume") {
        let a = super.emit("resume");
        return (this[zY](), a);
      } else if (e === "finish" || e === "prefinish") {
        let a = super.emit(e);
        return (this.removeAllListeners(e), a);
      }
      let s = super.emit(e, ...t);
      return (this[zY](), s);
    }
    [Eur](e) {
      for (let r of this[Tw]) if (r.dest.write(e) === !1) this.pause();
      let t = this[pN] ? !1 : super.emit("data", e);
      return (this[zY](), t);
    }
    [GYn]() {
      if (this[Coe]) return !1;
      return ((this[Coe] = !0), (this.readable = !1), this[E5] ? (B7e(() => this[Iur]()), !0) : this[Iur]());
    }
    [Iur]() {
      if (this[MSe]) {
        let t = this[MSe].end();
        if (t) {
          for (let r of this[Tw]) r.dest.write(t);
          if (!this[pN]) super.emit("data", t);
        }
      }
      for (let t of this[Tw]) t.end();
      let e = super.emit("end");
      return (this.removeAllListeners("end"), e);
    }
    async collect() {
      let e = Object.assign([], { dataLength: 0 });
      if (!this[eP]) e.dataLength = 0;
      let t = this.promise();
      return (
        this.on("data", (r) => {
          if ((e.push(r), !this[eP])) e.dataLength += r.length;
        }),
        await t,
        e
      );
    }
    async concat() {
      if (this[eP]) throw Error("cannot concat in objectMode");
      let e = await this.collect();
      return this[FV] ? e.join("") : Buffer.concat(e, e.dataLength);
    }
    async promise() {
      return new Promise((e, t) => {
        (this.on(Uy, () => t(Error("stream destroyed"))),
          this.on("error", (r) => t(r)),
          this.on("end", () => e()));
      });
    }
    [Symbol.asyncIterator]() {
      this[pN] = !1;
      let e = !1,
        t = async () => (this.pause(), (e = !0), { value: void 0, done: !0 });
      return {
        next: () => {
          if (e) return t();
          let s = this.read();
          if (s !== null) return Promise.resolve({ done: !1, value: s });
          if (this[KY]) return t();
          let a,
            H,
            u = (L) => {
              (this.off("data", f), this.off("end", d), this.off(Uy, _), t(), H(L));
            },
            f = (L) => {
              (this.off("error", u),
                this.off("end", d),
                this.off(Uy, _),
                this.pause(),
                a({ value: L, done: !!this[KY] }));
            },
            d = () => {
              (this.off("error", u),
                this.off("data", f),
                this.off(Uy, _),
                t(),
                a({ done: !0, value: void 0 }));
            },
            _ = () => u(Error("stream destroyed"));
          return new Promise((L, I) => {
            ((H = I),
              (a = L),
              this.once(Uy, _),
              this.once("error", u),
              this.once("end", d),
              this.once("data", f));
          });
        },
        throw: t,
        return: t,
        [Symbol.asyncIterator]() {
          return this;
        },
        [Symbol.asyncDispose]: async () => {},
      };
    }
    [Symbol.iterator]() {
      this[pN] = !1;
      let e = !1,
        t = () => (
          this.pause(),
          this.off(gur, t),
          this.off(Uy, t),
          this.off("end", t),
          (e = !0),
          { done: !0, value: void 0 }
        ),
        r = () => {
          if (e) return t();
          let s = this.read();
          return s === null ? t() : { done: !1, value: s };
        };
      return (
        this.once("end", t),
        this.once(gur, t),
        this.once(Uy, t),
        {
          next: r,
          throw: t,
          return: t,
          [Symbol.iterator]() {
            return this;
          },
          [Symbol.dispose]: () => {},
        }
      );
    }
    destroy(e) {
      if (this[Uy]) {
        if (e) this.emit("error", e);
        else this.emit(Uy);
        return this;
      }
      ((this[Uy] = !0), (this[pN] = !0), (this[iT].length = 0), (this[sT] = 0));
      let t = this;
      if (typeof t.close === "function" && !this[AEt]) t.close();
      if (e) this.emit("error", e);
      else this.emit(Uy);
      return this;
    }
    static get isStream() {
      return vw.isStream;
    }
  }
  vw.Minipass = Mur;
});

var Cur = Ie(function (Ouc, aZn) {
  var ZYn = typeof process === "object" && process ? process : { stdout: null, stderr: null },
    zOo = cr("events"),
    eZn = cr("stream"),
    tZn = cr("string_decoder").StringDecoder,
    QY = Symbol("EOF"),
    YY = Symbol("maybeEmitEnd"),
    woe = Symbol("emittedEnd"),
    pEt = Symbol("emittingEnd"),
    R7e = Symbol("emittedError"),
    dEt = Symbol("closed"),
    rZn = Symbol("read"),
    mEt = Symbol("flush"),
    nZn = Symbol("flushChunk"),
    H8 = Symbol("encoding"),
    ZY = Symbol("decoder"),
    _Et = Symbol("flowing"),
    W7e = Symbol("paused"),
    bSe = Symbol("resume"),
    oT = Symbol("bufferLength"),
    Tur = Symbol("bufferPush"),
    vur = Symbol("bufferShift"),
    tP = Symbol("objectMode"),
    rP = Symbol("destroyed"),
    bur = Symbol("emitData"),
    iZn = Symbol("emitEnd"),
    jur = Symbol("emitEnd2"),
    eZ = Symbol("async"),
    V7e = (e) => Promise.resolve().then(e),
    sZn = global._MP_NO_ITERATOR_SYMBOLS_ !== "1",
    QOo = (sZn && Symbol.asyncIterator) || Symbol("asyncIterator not implemented"),
    YOo = (sZn && Symbol.iterator) || Symbol("iterator not implemented"),
    ZOo = (e) => e === "end" || e === "finish" || e === "prefinish",
    eUo = (e) =>
      e instanceof ArrayBuffer ||
      (typeof e === "object" && e.constructor && e.constructor.name === "ArrayBuffer" && e.byteLength >= 0),
    tUo = (e) => !Buffer.isBuffer(e) && ArrayBuffer.isView(e);
  class Pur {
    constructor(e, t, r) {
      ((this.src = e),
        (this.dest = t),
        (this.opts = r),
        (this.ondrain = () => e[bSe]()),
        t.on("drain", this.ondrain));
    }
    unpipe() {
      this.dest.removeListener("drain", this.ondrain);
    }
    proxyErrors() {}
    end() {
      if ((this.unpipe(), this.opts.end)) this.dest.end();
    }
  }
  class oZn extends Pur {
    unpipe() {
      (this.src.removeListener("error", this.proxyErrors), super.unpipe());
    }
    constructor(e, t, r) {
      super(e, t, r);
      ((this.proxyErrors = (s) => t.emit("error", s)), e.on("error", this.proxyErrors));
    }
  }
  aZn.exports = class e extends eZn {
    constructor(t) {
      super();
      if (
        ((this[_Et] = !1),
        (this[W7e] = !1),
        (this.pipes = []),
        (this.buffer = []),
        (this[tP] = (t && t.objectMode) || !1),
        this[tP])
      )
        this[H8] = null;
      else this[H8] = (t && t.encoding) || null;
      if (this[H8] === "buffer") this[H8] = null;
      ((this[eZ] = (t && !!t.async) || !1),
        (this[ZY] = this[H8] ? new tZn(this[H8]) : null),
        (this[QY] = !1),
        (this[woe] = !1),
        (this[pEt] = !1),
        (this[dEt] = !1),
        (this[R7e] = null),
        (this.writable = !0),
        (this.readable = !0),
        (this[oT] = 0),
        (this[rP] = !1));
    }
    get bufferLength() {
      return this[oT];
    }
    get encoding() {
      return this[H8];
    }
    set encoding(t) {
      if (this[tP]) throw Error("cannot set encoding in objectMode");
      if (this[H8] && t !== this[H8] && ((this[ZY] && this[ZY].lastNeed) || this[oT]))
        throw Error("cannot change encoding");
      if (this[H8] !== t) {
        if (((this[ZY] = t ? new tZn(t) : null), this.buffer.length))
          this.buffer = this.buffer.map((r) => this[ZY].write(r));
      }
      this[H8] = t;
    }
    setEncoding(t) {
      this.encoding = t;
    }
    get objectMode() {
      return this[tP];
    }
    set objectMode(t) {
      this[tP] = this[tP] || !!t;
    }
    get ["async"]() {
      return this[eZ];
    }
    set ["async"](t) {
      this[eZ] = this[eZ] || !!t;
    }
    write(t, r, s) {
      if (this[QY]) throw Error("write after end");
      if (this[rP])
        return (
          this.emit(
            "error",
            Object.assign(Error("Cannot call write after a stream was destroyed"), {
              code: "ERR_STREAM_DESTROYED",
            }),
          ),
          !0
        );
      if (typeof r === "function") ((s = r), (r = "utf8"));
      if (!r) r = "utf8";
      let a = this[eZ] ? V7e : (H) => H();
      if (!this[tP] && !Buffer.isBuffer(t)) {
        if (tUo(t)) t = Buffer.from(t.buffer, t.byteOffset, t.byteLength);
        else if (eUo(t)) t = Buffer.from(t);
        else if (typeof t !== "string") this.objectMode = !0;
      }
      if (this[tP]) {
        if (this.flowing && this[oT] !== 0) this[mEt](!0);
        if (this.flowing) this.emit("data", t);
        else this[Tur](t);
        if (this[oT] !== 0) this.emit("readable");
        if (s) a(s);
        return this.flowing;
      }
      if (!t.length) {
        if (this[oT] !== 0) this.emit("readable");
        if (s) a(s);
        return this.flowing;
      }
      if (typeof t === "string" && !(r === this[H8] && !this[ZY].lastNeed)) t = Buffer.from(t, r);
      if (Buffer.isBuffer(t) && this[H8]) t = this[ZY].write(t);
      if (this.flowing && this[oT] !== 0) this[mEt](!0);
      if (this.flowing) this.emit("data", t);
      else this[Tur](t);
      if (this[oT] !== 0) this.emit("readable");
      if (s) a(s);
      return this.flowing;
    }
    read(t) {
      if (this[rP]) return null;
      if (this[oT] === 0 || t === 0 || t > this[oT]) return (this[YY](), null);
      if (this[tP]) t = null;
      if (this.buffer.length > 1 && !this[tP])
        if (this.encoding) this.buffer = [this.buffer.join("")];
        else this.buffer = [Buffer.concat(this.buffer, this[oT])];
      let r = this[rZn](t || null, this.buffer[0]);
      return (this[YY](), r);
    }
    [rZn](t, r) {
      if (t === r.length || t === null) this[vur]();
      else ((this.buffer[0] = r.slice(t)), (r = r.slice(0, t)), (this[oT] -= t));
      if ((this.emit("data", r), !this.buffer.length && !this[QY])) this.emit("drain");
      return r;
    }
    end(t, r, s) {
      if (typeof t === "function") ((s = t), (t = null));
      if (typeof r === "function") ((s = r), (r = "utf8"));
      if (t) this.write(t, r);
      if (s) this.once("end", s);
      if (((this[QY] = !0), (this.writable = !1), this.flowing || !this[W7e])) this[YY]();
      return this;
    }
    [bSe]() {
      if (this[rP]) return;
      if (((this[W7e] = !1), (this[_Et] = !0), this.emit("resume"), this.buffer.length)) this[mEt]();
      else if (this[QY]) this[YY]();
      else this.emit("drain");
    }
    resume() {
      return this[bSe]();
    }
    pause() {
      ((this[_Et] = !1), (this[W7e] = !0));
    }
    get destroyed() {
      return this[rP];
    }
    get flowing() {
      return this[_Et];
    }
    get paused() {
      return this[W7e];
    }
    [Tur](t) {
      if (this[tP]) this[oT] += 1;
      else this[oT] += t.length;
      this.buffer.push(t);
    }
    [vur]() {
      if (this.buffer.length)
        if (this[tP]) this[oT] -= 1;
        else this[oT] -= this.buffer[0].length;
      return this.buffer.shift();
    }
    [mEt](t) {
      do;
      while (this[nZn](this[vur]()));
      if (!t && !this.buffer.length && !this[QY]) this.emit("drain");
    }
    [nZn](t) {
      return t ? (this.emit("data", t), this.flowing) : !1;
    }
    pipe(t, r) {
      if (this[rP]) return;
      let s = this[woe];
      if (((r = r || {}), t === ZYn.stdout || t === ZYn.stderr)) r.end = !1;
      else r.end = r.end !== !1;
      if (((r.proxyErrors = !!r.proxyErrors), s)) {
        if (r.end) t.end();
      } else if ((this.pipes.push(!r.proxyErrors ? new Pur(this, t, r) : new oZn(this, t, r)), this[eZ]))
        V7e(() => this[bSe]());
      else this[bSe]();
      return t;
    }
    unpipe(t) {
      let r = this.pipes.find((s) => s.dest === t);
      if (r) (this.pipes.splice(this.pipes.indexOf(r), 1), r.unpipe());
    }
    addListener(t, r) {
      return this.on(t, r);
    }
    on(t, r) {
      let s = super.on(t, r);
      if (t === "data" && !this.pipes.length && !this.flowing) this[bSe]();
      else if (t === "readable" && this[oT] !== 0) super.emit("readable");
      else if (ZOo(t) && this[woe]) (super.emit(t), this.removeAllListeners(t));
      else if (t === "error" && this[R7e])
        if (this[eZ]) V7e(() => r.call(this, this[R7e]));
        else r.call(this, this[R7e]);
      return s;
    }
    get emittedEnd() {
      return this[woe];
    }
    [YY]() {
      if (!this[pEt] && !this[woe] && !this[rP] && this.buffer.length === 0 && this[QY]) {
        if (((this[pEt] = !0), this.emit("end"), this.emit("prefinish"), this.emit("finish"), this[dEt]))
          this.emit("close");
        this[pEt] = !1;
      }
    }
    emit(t, r, ...s) {
      if (t !== "error" && t !== "close" && t !== rP && this[rP]) return;
      else if (t === "data") return !r ? !1 : this[eZ] ? V7e(() => this[bur](r)) : this[bur](r);
      else if (t === "end") return this[iZn]();
      else if (t === "close") {
        if (((this[dEt] = !0), !this[woe] && !this[rP])) return;
        let H = super.emit("close");
        return (this.removeAllListeners("close"), H);
      } else if (t === "error") {
        this[R7e] = r;
        let H = super.emit("error", r);
        return (this[YY](), H);
      } else if (t === "resume") {
        let H = super.emit("resume");
        return (this[YY](), H);
      } else if (t === "finish" || t === "prefinish") {
        let H = super.emit(t);
        return (this.removeAllListeners(t), H);
      }
      let a = super.emit(t, r, ...s);
      return (this[YY](), a);
    }
    [bur](t) {
      for (let s of this.pipes) if (s.dest.write(t) === !1) this.pause();
      let r = super.emit("data", t);
      return (this[YY](), r);
    }
    [iZn]() {
      if (this[woe]) return;
      if (((this[woe] = !0), (this.readable = !1), this[eZ])) V7e(() => this[jur]());
      else this[jur]();
    }
    [jur]() {
      if (this[ZY]) {
        let r = this[ZY].end();
        if (r) {
          for (let s of this.pipes) s.dest.write(r);
          super.emit("data", r);
        }
      }
      for (let r of this.pipes) r.end();
      let t = super.emit("end");
      return (this.removeAllListeners("end"), t);
    }
    collect() {
      let t = [];
      if (!this[tP]) t.dataLength = 0;
      let r = this.promise();
      return (
        this.on("data", (s) => {
          if ((t.push(s), !this[tP])) t.dataLength += s.length;
        }),
        r.then(() => t)
      );
    }
    concat() {
      return this[tP]
        ? Promise.reject(Error("cannot concat in objectMode"))
        : this.collect().then((t) =>
            this[tP]
              ? Promise.reject(Error("cannot concat in objectMode"))
              : this[H8]
                ? t.join("")
                : Buffer.concat(t, t.dataLength),
          );
    }
    promise() {
      return new Promise((t, r) => {
        (this.on(rP, () => r(Error("stream destroyed"))),
          this.on("error", (s) => r(s)),
          this.on("end", () => t()));
      });
    }
    [QOo]() {
      return {
        next: () => {
          let r = this.read();
          if (r !== null) return Promise.resolve({ done: !1, value: r });
          if (this[QY]) return Promise.resolve({ done: !0 });
          let s = null,
            a = null,
            H = (_) => {
              (this.removeListener("data", u), this.removeListener("end", f), a(_));
            },
            u = (_) => {
              (this.removeListener("error", H),
                this.removeListener("end", f),
                this.pause(),
                s({ value: _, done: !!this[QY] }));
            },
            f = () => {
              (this.removeListener("error", H), this.removeListener("data", u), s({ done: !0 }));
            },
            d = () => H(Error("stream destroyed"));
          return new Promise((_, L) => {
            ((a = L),
              (s = _),
              this.once(rP, d),
              this.once("error", H),
              this.once("end", f),
              this.once("data", u));
          });
        },
      };
    }
    [YOo]() {
      return {
        next: () => {
          let r = this.read();
          return { value: r, done: r === null };
        },
      };
    }
    destroy(t) {
      if (this[rP]) {
        if (t) this.emit("error", t);
        else this.emit(rP);
        return this;
      }
      if (
        ((this[rP] = !0),
        (this.buffer.length = 0),
        (this[oT] = 0),
        typeof this.close === "function" && !this[dEt])
      )
        this.close();
      if (t) this.emit("error", t);
      else this.emit(rP);
      return this;
    }
    static isStream(t) {
      return (
        !!t &&
        (t instanceof e ||
          t instanceof eZn ||
          (t instanceof zOo &&
            (typeof t.pipe === "function" || (typeof t.write === "function" && typeof t.end === "function"))))
      );
    }
  };
});
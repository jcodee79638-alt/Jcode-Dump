
var Mlr = Ie(function (MI) {
  var e_ = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
    n4e = e_((e) => {
      var t =
        (e && e.__importDefault) ||
        function (St) {
          return St && St.__esModule ? St : { default: St };
        };
      (Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.Minipass = e.isWritable = e.isReadable = e.isStream = void 0));
      var r = typeof process == "object" && process ? process : { stdout: null, stderr: null },
        s = cr("events"),
        a = t(cr("stream")),
        H = cr("string_decoder"),
        u = (St) =>
          !!St &&
          typeof St == "object" &&
          (St instanceof Dt || St instanceof a.default || (0, e.isReadable)(St) || (0, e.isWritable)(St));
      e.isStream = u;
      var f = (St) =>
        !!St &&
        typeof St == "object" &&
        St instanceof s.EventEmitter &&
        typeof St.pipe == "function" &&
        St.pipe !== a.default.Writable.prototype.pipe;
      e.isReadable = f;
      var d = (St) =>
        !!St &&
        typeof St == "object" &&
        St instanceof s.EventEmitter &&
        typeof St.write == "function" &&
        typeof St.end == "function";
      e.isWritable = d;
      var _ = Symbol("EOF"),
        L = Symbol("maybeEmitEnd"),
        I = Symbol("emittedEnd"),
        D = Symbol("emittingEnd"),
        S = Symbol("emittedError"),
        T = Symbol("closed"),
        C = Symbol("read"),
        O = Symbol("flush"),
        B = Symbol("flushChunk"),
        V = Symbol("encoding"),
        q = Symbol("decoder"),
        Z = Symbol("flowing"),
        se = Symbol("paused"),
        ae = Symbol("resume"),
        z = Symbol("buffer"),
        Ae = Symbol("pipes"),
        le = Symbol("bufferLength"),
        Be = Symbol("bufferPush"),
        Te = Symbol("bufferShift"),
        Lt = Symbol("objectMode"),
        Ht = Symbol("destroyed"),
        Se = Symbol("error"),
        _e = Symbol("emitData"),
        we = Symbol("emitEnd"),
        Pe = Symbol("emitEnd2"),
        ye = Symbol("async"),
        ot = Symbol("abort"),
        Ee = Symbol("aborted"),
        Ve = Symbol("signal"),
        Fe = Symbol("dataListeners"),
        it = Symbol("discarded"),
        At = (St) => Promise.resolve().then(St),
        et = (St) => St(),
        ut = (St) => St === "end" || St === "finish" || St === "prefinish",
        ht = (St) =>
          St instanceof ArrayBuffer ||
          (!!St &&
            typeof St == "object" &&
            St.constructor &&
            St.constructor.name === "ArrayBuffer" &&
            St.byteLength >= 0),
        Et = (St) => !Buffer.isBuffer(St) && ArrayBuffer.isView(St),
        tr = class {
          src;
          dest;
          opts;
          ondrain;
          constructor(St, wt, Qr) {
            ((this.src = St),
              (this.dest = wt),
              (this.opts = Qr),
              (this.ondrain = () => St[ae]()),
              this.dest.on("drain", this.ondrain));
          }
          unpipe() {
            this.dest.removeListener("drain", this.ondrain);
          }
          proxyErrors(St) {}
          end() {
            (this.unpipe(), this.opts.end && this.dest.end());
          }
        },
        Rr = class extends tr {
          unpipe() {
            (this.src.removeListener("error", this.proxyErrors), super.unpipe());
          }
          constructor(St, wt, Qr) {
            (super(St, wt, Qr),
              (this.proxyErrors = (Li) => this.dest.emit("error", Li)),
              St.on("error", this.proxyErrors));
          }
        },
        Vt = (St) => !!St.objectMode,
        Br = (St) => !St.objectMode && !!St.encoding && St.encoding !== "buffer",
        Dt = class extends s.EventEmitter {
          [Z] = !1;
          [se] = !1;
          [Ae] = [];
          [z] = [];
          [Lt];
          [V];
          [ye];
          [q];
          [_] = !1;
          [I] = !1;
          [D] = !1;
          [T] = !1;
          [S] = null;
          [le] = 0;
          [Ht] = !1;
          [Ve];
          [Ee] = !1;
          [Fe] = 0;
          [it] = !1;
          writable = !0;
          readable = !0;
          constructor(...St) {
            let wt = St[0] || {};
            if ((super(), wt.objectMode && typeof wt.encoding == "string"))
              throw TypeError("Encoding and objectMode may not be used together");
            (Vt(wt)
              ? ((this[Lt] = !0), (this[V] = null))
              : Br(wt)
                ? ((this[V] = wt.encoding), (this[Lt] = !1))
                : ((this[Lt] = !1), (this[V] = null)),
              (this[ye] = !!wt.async),
              (this[q] = this[V] ? new H.StringDecoder(this[V]) : null),
              wt &&
                wt.debugExposeBuffer === !0 &&
                Object.defineProperty(this, "buffer", { get: () => this[z] }),
              wt &&
                wt.debugExposePipes === !0 &&
                Object.defineProperty(this, "pipes", { get: () => this[Ae] }));
            let { signal: Qr } = wt;
            Qr && ((this[Ve] = Qr), Qr.aborted ? this[ot]() : Qr.addEventListener("abort", () => this[ot]()));
          }
          get bufferLength() {
            return this[le];
          }
          get encoding() {
            return this[V];
          }
          set encoding(St) {
            throw Error("Encoding must be set at instantiation time");
          }
          setEncoding(St) {
            throw Error("Encoding must be set at instantiation time");
          }
          get objectMode() {
            return this[Lt];
          }
          set objectMode(St) {
            throw Error("objectMode must be set at instantiation time");
          }
          get async() {
            return this[ye];
          }
          set async(St) {
            this[ye] = this[ye] || !!St;
          }
          [ot]() {
            ((this[Ee] = !0), this.emit("abort", this[Ve]?.reason), this.destroy(this[Ve]?.reason));
          }
          get aborted() {
            return this[Ee];
          }
          set aborted(St) {}
          write(St, wt, Qr) {
            if (this[Ee]) return !1;
            if (this[_]) throw Error("write after end");
            if (this[Ht])
              return (
                this.emit(
                  "error",
                  Object.assign(Error("Cannot call write after a stream was destroyed"), {
                    code: "ERR_STREAM_DESTROYED",
                  }),
                ),
                !0
              );
            (typeof wt == "function" && ((Qr = wt), (wt = "utf8")), wt || (wt = "utf8"));
            let Li = this[ye] ? At : et;
            if (!this[Lt] && !Buffer.isBuffer(St)) {
              if (Et(St)) St = Buffer.from(St.buffer, St.byteOffset, St.byteLength);
              else if (ht(St)) St = Buffer.from(St);
              else if (typeof St != "string")
                throw Error("Non-contiguous data written to non-objectMode stream");
            }
            return this[Lt]
              ? (this[Z] && this[le] !== 0 && this[O](!0),
                this[Z] ? this.emit("data", St) : this[Be](St),
                this[le] !== 0 && this.emit("readable"),
                Qr && Li(Qr),
                this[Z])
              : St.length
                ? (typeof St == "string" &&
                    !(wt === this[V] && !this[q]?.lastNeed) &&
                    (St = Buffer.from(St, wt)),
                  Buffer.isBuffer(St) && this[V] && (St = this[q].write(St)),
                  this[Z] && this[le] !== 0 && this[O](!0),
                  this[Z] ? this.emit("data", St) : this[Be](St),
                  this[le] !== 0 && this.emit("readable"),
                  Qr && Li(Qr),
                  this[Z])
                : (this[le] !== 0 && this.emit("readable"), Qr && Li(Qr), this[Z]);
          }
          read(St) {
            if (this[Ht]) return null;
            if (((this[it] = !1), this[le] === 0 || St === 0 || (St && St > this[le])))
              return (this[L](), null);
            (this[Lt] && (St = null),
              this[z].length > 1 &&
                !this[Lt] &&
                (this[z] = [this[V] ? this[z].join("") : Buffer.concat(this[z], this[le])]));
            let wt = this[C](St || null, this[z][0]);
            return (this[L](), wt);
          }
          [C](St, wt) {
            if (this[Lt]) this[Te]();
            else {
              let Qr = wt;
              St === Qr.length || St === null
                ? this[Te]()
                : typeof Qr == "string"
                  ? ((this[z][0] = Qr.slice(St)), (wt = Qr.slice(0, St)), (this[le] -= St))
                  : ((this[z][0] = Qr.subarray(St)), (wt = Qr.subarray(0, St)), (this[le] -= St));
            }
            return (this.emit("data", wt), !this[z].length && !this[_] && this.emit("drain"), wt);
          }
          end(St, wt, Qr) {
            return (
              typeof St == "function" && ((Qr = St), (St = void 0)),
              typeof wt == "function" && ((Qr = wt), (wt = "utf8")),
              St !== void 0 && this.write(St, wt),
              Qr && this.once("end", Qr),
              (this[_] = !0),
              (this.writable = !1),
              (this[Z] || !this[se]) && this[L](),
              this
            );
          }
          [ae]() {
            this[Ht] ||
              (!this[Fe] && !this[Ae].length && (this[it] = !0),
              (this[se] = !1),
              (this[Z] = !0),
              this.emit("resume"),
              this[z].length ? this[O]() : this[_] ? this[L]() : this.emit("drain"));
          }
          resume() {
            return this[ae]();
          }
          pause() {
            ((this[Z] = !1), (this[se] = !0), (this[it] = !1));
          }
          get destroyed() {
            return this[Ht];
          }
          get flowing() {
            return this[Z];
          }
          get paused() {
            return this[se];
          }
          [Be](St) {
            (this[Lt] ? (this[le] += 1) : (this[le] += St.length), this[z].push(St));
          }
          [Te]() {
            return (this[Lt] ? (this[le] -= 1) : (this[le] -= this[z][0].length), this[z].shift());
          }
          [O](St = !1) {
            do;
            while (this[B](this[Te]()) && this[z].length);
            !St && !this[z].length && !this[_] && this.emit("drain");
          }
          [B](St) {
            return (this.emit("data", St), this[Z]);
          }
          pipe(St, wt) {
            if (this[Ht]) return St;
            this[it] = !1;
            let Qr = this[I];
            return (
              (wt = wt || {}),
              St === r.stdout || St === r.stderr ? (wt.end = !1) : (wt.end = wt.end !== !1),
              (wt.proxyErrors = !!wt.proxyErrors),
              Qr
                ? wt.end && St.end()
                : (this[Ae].push(wt.proxyErrors ? new Rr(this, St, wt) : new tr(this, St, wt)),
                  this[ye] ? At(() => this[ae]()) : this[ae]()),
              St
            );
          }
          unpipe(St) {
            let wt = this[Ae].find((Qr) => Qr.dest === St);
            wt &&
              (this[Ae].length === 1
                ? (this[Z] && this[Fe] === 0 && (this[Z] = !1), (this[Ae] = []))
                : this[Ae].splice(this[Ae].indexOf(wt), 1),
              wt.unpipe());
          }
          addListener(St, wt) {
            return this.on(St, wt);
          }
          on(St, wt) {
            let Qr = super.on(St, wt);
            if (St === "data") ((this[it] = !1), this[Fe]++, !this[Ae].length && !this[Z] && this[ae]());
            else if (St === "readable" && this[le] !== 0) super.emit("readable");
            else if (ut(St) && this[I]) (super.emit(St), this.removeAllListeners(St));
            else if (St === "error" && this[S]) {
              let Li = wt;
              this[ye] ? At(() => Li.call(this, this[S])) : Li.call(this, this[S]);
            }
            return Qr;
          }
          removeListener(St, wt) {
            return this.off(St, wt);
          }
          off(St, wt) {
            let Qr = super.off(St, wt);
            return (
              St === "data" &&
                ((this[Fe] = this.listeners("data").length),
                this[Fe] === 0 && !this[it] && !this[Ae].length && (this[Z] = !1)),
              Qr
            );
          }
          removeAllListeners(St) {
            let wt = super.removeAllListeners(St);
            return (
              (St === "data" || St === void 0) &&
                ((this[Fe] = 0), !this[it] && !this[Ae].length && (this[Z] = !1)),
              wt
            );
          }
          get emittedEnd() {
            return this[I];
          }
          [L]() {
            !this[D] &&
              !this[I] &&
              !this[Ht] &&
              this[z].length === 0 &&
              this[_] &&
              ((this[D] = !0),
              this.emit("end"),
              this.emit("prefinish"),
              this.emit("finish"),
              this[T] && this.emit("close"),
              (this[D] = !1));
          }
          emit(St, ...wt) {
            let Qr = wt[0];
            if (St !== "error" && St !== "close" && St !== Ht && this[Ht]) return !1;
            if (St === "data")
              return !this[Lt] && !Qr ? !1 : this[ye] ? (At(() => this[_e](Qr)), !0) : this[_e](Qr);
            if (St === "end") return this[we]();
            if (St === "close") {
              if (((this[T] = !0), !this[I] && !this[Ht])) return !1;
              let sr = super.emit("close");
              return (this.removeAllListeners("close"), sr);
            } else if (St === "error") {
              ((this[S] = Qr), super.emit(Se, Qr));
              let sr = !this[Ve] || this.listeners("error").length ? super.emit("error", Qr) : !1;
              return (this[L](), sr);
            } else if (St === "resume") {
              let sr = super.emit("resume");
              return (this[L](), sr);
            } else if (St === "finish" || St === "prefinish") {
              let sr = super.emit(St);
              return (this.removeAllListeners(St), sr);
            }
            let Li = super.emit(St, ...wt);
            return (this[L](), Li);
          }
          [_e](St) {
            for (let Qr of this[Ae]) Qr.dest.write(St) === !1 && this.pause();
            let wt = this[it] ? !1 : super.emit("data", St);
            return (this[L](), wt);
          }
          [we]() {
            return this[I]
              ? !1
              : ((this[I] = !0), (this.readable = !1), this[ye] ? (At(() => this[Pe]()), !0) : this[Pe]());
          }
          [Pe]() {
            if (this[q]) {
              let wt = this[q].end();
              if (wt) {
                for (let Qr of this[Ae]) Qr.dest.write(wt);
                this[it] || super.emit("data", wt);
              }
            }
            for (let wt of this[Ae]) wt.end();
            let St = super.emit("end");
            return (this.removeAllListeners("end"), St);
          }
          async collect() {
            let St = Object.assign([], { dataLength: 0 });
            this[Lt] || (St.dataLength = 0);
            let wt = this.promise();
            return (
              this.on("data", (Qr) => {
                (St.push(Qr), this[Lt] || (St.dataLength += Qr.length));
              }),
              await wt,
              St
            );
          }
          async concat() {
            if (this[Lt]) throw Error("cannot concat in objectMode");
            let St = await this.collect();
            return this[V] ? St.join("") : Buffer.concat(St, St.dataLength);
          }
          async promise() {
            return new Promise((St, wt) => {
              (this.on(Ht, () => wt(Error("stream destroyed"))),
                this.on("error", (Qr) => wt(Qr)),
                this.on("end", () => St()));
            });
          }
          [Symbol.asyncIterator]() {
            this[it] = !1;
            let St = !1,
              wt = async () => (this.pause(), (St = !0), { value: void 0, done: !0 });
            return {
              next: () => {
                if (St) return wt();
                let Qr = this.read();
                if (Qr !== null) return Promise.resolve({ done: !1, value: Qr });
                if (this[_]) return wt();
                let Li,
                  sr,
                  Mt = (Mn) => {
                    (this.off("data", Lr), this.off("end", Tr), this.off(Ht, Dn), wt(), sr(Mn));
                  },
                  Lr = (Mn) => {
                    (this.off("error", Mt),
                      this.off("end", Tr),
                      this.off(Ht, Dn),
                      this.pause(),
                      Li({ value: Mn, done: !!this[_] }));
                  },
                  Tr = () => {
                    (this.off("error", Mt),
                      this.off("data", Lr),
                      this.off(Ht, Dn),
                      wt(),
                      Li({ done: !0, value: void 0 }));
                  },
                  Dn = () => Mt(Error("stream destroyed"));
                return new Promise((Mn, as) => {
                  ((sr = as),
                    (Li = Mn),
                    this.once(Ht, Dn),
                    this.once("error", Mt),
                    this.once("end", Tr),
                    this.once("data", Lr));
                });
              },
              throw: wt,
              return: wt,
              [Symbol.asyncIterator]() {
                return this;
              },
              [Symbol.asyncDispose]: async () => {},
            };
          }
          [Symbol.iterator]() {
            this[it] = !1;
            let St = !1,
              wt = () => (
                this.pause(),
                this.off(Se, wt),
                this.off(Ht, wt),
                this.off("end", wt),
                (St = !0),
                { done: !0, value: void 0 }
              ),
              Qr = () => {
                if (St) return wt();
                let Li = this.read();
                return Li === null ? wt() : { done: !1, value: Li };
              };
            return (
              this.once("end", wt),
              this.once(Se, wt),
              this.once(Ht, wt),
              {
                next: Qr,
                throw: wt,
                return: wt,
                [Symbol.iterator]() {
                  return this;
                },
                [Symbol.dispose]: () => {},
              }
            );
          }
          destroy(St) {
            if (this[Ht]) return (St ? this.emit("error", St) : this.emit(Ht), this);
            ((this[Ht] = !0), (this[it] = !0), (this[z].length = 0), (this[le] = 0));
            let wt = this;
            return (
              typeof wt.close == "function" && !this[T] && wt.close(),
              St ? this.emit("error", St) : this.emit(Ht),
              this
            );
          }
          static get isStream() {
            return e.isStream;
          }
        };
      e.Minipass = Dt;
    }),
    i4e = e_((e) => {
      var t =
        (e && e.__importDefault) ||
        function (Fe) {
          return Fe && Fe.__esModule ? Fe : { default: Fe };
        };
      (Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.WriteStreamSync = e.WriteStream = e.ReadStreamSync = e.ReadStream = void 0));
      var r = t(cr("events")),
        s = t(cr("fs")),
        a = n4e(),
        H = s.default.writev,
        u = Symbol("_autoClose"),
        f = Symbol("_close"),
        d = Symbol("_ended"),
        _ = Symbol("_fd"),
        L = Symbol("_finished"),
        I = Symbol("_flags"),
        D = Symbol("_flush"),
        S = Symbol("_handleChunk"),
        T = Symbol("_makeBuf"),
        C = Symbol("_mode"),
        O = Symbol("_needDrain"),
        B = Symbol("_onerror"),
        V = Symbol("_onopen"),
        q = Symbol("_onread"),
        Z = Symbol("_onwrite"),
        se = Symbol("_open"),
        ae = Symbol("_path"),
        z = Symbol("_pos"),
        Ae = Symbol("_queue"),
        le = Symbol("_read"),
        Be = Symbol("_readSize"),
        Te = Symbol("_reading"),
        Lt = Symbol("_remain"),
        Ht = Symbol("_size"),
        Se = Symbol("_write"),
        _e = Symbol("_writing"),
        we = Symbol("_defaultFlag"),
        Pe = Symbol("_errored"),
        ye = class extends a.Minipass {
          [Pe] = !1;
          [_];
          [ae];
          [Be];
          [Te] = !1;
          [Ht];
          [Lt];
          [u];
          constructor(Fe, it) {
            if (
              ((it = it || {}), super(it), (this.readable = !0), (this.writable = !1), typeof Fe != "string")
            )
              throw TypeError("path must be a string");
            ((this[Pe] = !1),
              (this[_] = typeof it.fd == "number" ? it.fd : void 0),
              (this[ae] = Fe),
              (this[Be] = it.readSize || 16777216),
              (this[Te] = !1),
              (this[Ht] = typeof it.size == "number" ? it.size : 1 / 0),
              (this[Lt] = this[Ht]),
              (this[u] = typeof it.autoClose == "boolean" ? it.autoClose : !0),
              typeof this[_] == "number" ? this[le]() : this[se]());
          }
          get fd() {
            return this[_];
          }
          get path() {
            return this[ae];
          }
          write() {
            throw TypeError("this is a readable stream");
          }
          end() {
            throw TypeError("this is a readable stream");
          }
          [se]() {
            s.default.open(this[ae], "r", (Fe, it) => this[V](Fe, it));
          }
          [V](Fe, it) {
            Fe ? this[B](Fe) : ((this[_] = it), this.emit("open", it), this[le]());
          }
          [T]() {
            return Buffer.allocUnsafe(Math.min(this[Be], this[Lt]));
          }
          [le]() {
            if (!this[Te]) {
              this[Te] = !0;
              let Fe = this[T]();
              if (Fe.length === 0) return process.nextTick(() => this[q](null, 0, Fe));
              s.default.read(this[_], Fe, 0, Fe.length, null, (it, At, et) => this[q](it, At, et));
            }
          }
          [q](Fe, it, At) {
            ((this[Te] = !1), Fe ? this[B](Fe) : this[S](it, At) && this[le]());
          }
          [f]() {
            if (this[u] && typeof this[_] == "number") {
              let Fe = this[_];
              ((this[_] = void 0),
                s.default.close(Fe, (it) => (it ? this.emit("error", it) : this.emit("close"))));
            }
          }
          [B](Fe) {
            ((this[Te] = !0), this[f](), this.emit("error", Fe));
          }
          [S](Fe, it) {
            let At = !1;
            return (
              (this[Lt] -= Fe),
              Fe > 0 && (At = super.write(Fe < it.length ? it.subarray(0, Fe) : it)),
              (Fe === 0 || this[Lt] <= 0) && ((At = !1), this[f](), super.end()),
              At
            );
          }
          emit(Fe, ...it) {
            switch (Fe) {
              case "prefinish":
              case "finish":
                return !1;
              case "drain":
                return (typeof this[_] == "number" && this[le](), !1);
              case "error":
                return this[Pe] ? !1 : ((this[Pe] = !0), super.emit(Fe, ...it));
              default:
                return super.emit(Fe, ...it);
            }
          }
        };
      e.ReadStream = ye;
      var ot = class extends ye {
        [se]() {
          let Fe = !0;
          try {
            (this[V](null, s.default.openSync(this[ae], "r")), (Fe = !1));
          } finally {
            Fe && this[f]();
          }
        }
        [le]() {
          let Fe = !0;
          try {
            if (!this[Te]) {
              this[Te] = !0;
              do {
                let it = this[T](),
                  At = it.length === 0 ? 0 : s.default.readSync(this[_], it, 0, it.length, null);
                if (!this[S](At, it)) break;
              } while (!0);
              this[Te] = !1;
            }
            Fe = !1;
          } finally {
            Fe && this[f]();
          }
        }
        [f]() {
          if (this[u] && typeof this[_] == "number") {
            let Fe = this[_];
            ((this[_] = void 0), s.default.closeSync(Fe), this.emit("close"));
          }
        }
      };
      e.ReadStreamSync = ot;
      var Ee = class extends r.default {
        readable = !1;
        writable = !0;
        [Pe] = !1;
        [_e] = !1;
        [d] = !1;
        [Ae] = [];
        [O] = !1;
        [ae];
        [C];
        [u];
        [_];
        [we];
        [I];
        [L] = !1;
        [z];
        constructor(Fe, it) {
          ((it = it || {}),
            super(it),
            (this[ae] = Fe),
            (this[_] = typeof it.fd == "number" ? it.fd : void 0),
            (this[C] = it.mode === void 0 ? 438 : it.mode),
            (this[z] = typeof it.start == "number" ? it.start : void 0),
            (this[u] = typeof it.autoClose == "boolean" ? it.autoClose : !0));
          let At = this[z] !== void 0 ? "r+" : "w";
          ((this[we] = it.flags === void 0),
            (this[I] = it.flags === void 0 ? At : it.flags),
            this[_] === void 0 && this[se]());
        }
        emit(Fe, ...it) {
          if (Fe === "error") {
            if (this[Pe]) return !1;
            this[Pe] = !0;
          }
          return super.emit(Fe, ...it);
        }
        get fd() {
          return this[_];
        }
        get path() {
          return this[ae];
        }
        [B](Fe) {
          (this[f](), (this[_e] = !0), this.emit("error", Fe));
        }
        [se]() {
          s.default.open(this[ae], this[I], this[C], (Fe, it) => this[V](Fe, it));
        }
        [V](Fe, it) {
          this[we] && this[I] === "r+" && Fe && Fe.code === "ENOENT"
            ? ((this[I] = "w"), this[se]())
            : Fe
              ? this[B](Fe)
              : ((this[_] = it), this.emit("open", it), this[_e] || this[D]());
        }
        end(Fe, it) {
          return (
            Fe && this.write(Fe, it),
            (this[d] = !0),
            !this[_e] && !this[Ae].length && typeof this[_] == "number" && this[Z](null, 0),
            this
          );
        }
        write(Fe, it) {
          return (
            typeof Fe == "string" && (Fe = Buffer.from(Fe, it)),
            this[d]
              ? (this.emit("error", Error("write() after end()")), !1)
              : this[_] === void 0 || this[_e] || this[Ae].length
                ? (this[Ae].push(Fe), (this[O] = !0), !1)
                : ((this[_e] = !0), this[Se](Fe), !0)
          );
        }
        [Se](Fe) {
          s.default.write(this[_], Fe, 0, Fe.length, this[z], (it, At) => this[Z](it, At));
        }
        [Z](Fe, it) {
          Fe
            ? this[B](Fe)
            : (this[z] !== void 0 && typeof it == "number" && (this[z] += it),
              this[Ae].length
                ? this[D]()
                : ((this[_e] = !1),
                  this[d] && !this[L]
                    ? ((this[L] = !0), this[f](), this.emit("finish"))
                    : this[O] && ((this[O] = !1), this.emit("drain"))));
        }
        [D]() {
          if (this[Ae].length === 0) this[d] && this[Z](null, 0);
          else if (this[Ae].length === 1) this[Se](this[Ae].pop());
          else {
            let Fe = this[Ae];
            ((this[Ae] = []), H(this[_], Fe, this[z], (it, At) => this[Z](it, At)));
          }
        }
        [f]() {
          if (this[u] && typeof this[_] == "number") {
            let Fe = this[_];
            ((this[_] = void 0),
              s.default.close(Fe, (it) => (it ? this.emit("error", it) : this.emit("close"))));
          }
        }
      };
      e.WriteStream = Ee;
      var Ve = class extends Ee {
        [se]() {
          let Fe;
          if (this[we] && this[I] === "r+")
            try {
              Fe = s.default.openSync(this[ae], this[I], this[C]);
            } catch (it) {
              if (it?.code === "ENOENT") return ((this[I] = "w"), this[se]());
              throw it;
            }
          else Fe = s.default.openSync(this[ae], this[I], this[C]);
          this[V](null, Fe);
        }
        [f]() {
          if (this[u] && typeof this[_] == "number") {
            let Fe = this[_];
            ((this[_] = void 0), s.default.closeSync(Fe), this.emit("close"));
          }
        }
        [Se](Fe) {
          let it = !0;
          try {
            (this[Z](null, s.default.writeSync(this[_], Fe, 0, Fe.length, this[z])), (it = !1));
          } finally {
            if (it)
              try {
                this[f]();
              } catch {}
          }
        }
      };
      e.WriteStreamSync = Ve;
    }),
    Llr = e_((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.dealias =
          e.isNoFile =
          e.isFile =
          e.isAsync =
          e.isSync =
          e.isAsyncNoFile =
          e.isSyncNoFile =
          e.isAsyncFile =
          e.isSyncFile =
            void 0));
      var t = new Map([
          ["C", "cwd"],
          ["f", "file"],
          ["z", "gzip"],
          ["P", "preservePaths"],
          ["U", "unlink"],
          ["strip-components", "strip"],
          ["stripComponents", "strip"],
          ["keep-newer", "newer"],
          ["keepNewer", "newer"],
          ["keep-newer-files", "newer"],
          ["keepNewerFiles", "newer"],
          ["k", "keep"],
          ["keep-existing", "keep"],
          ["keepExisting", "keep"],
          ["m", "noMtime"],
          ["no-mtime", "noMtime"],
          ["p", "preserveOwner"],
          ["L", "follow"],
          ["h", "follow"],
          ["onentry", "onReadEntry"],
        ]),
        r = (D) => !!D.sync && !!D.file;
      e.isSyncFile = r;
      var s = (D) => !D.sync && !!D.file;
      e.isAsyncFile = s;
      var a = (D) => !!D.sync && !D.file;
      e.isSyncNoFile = a;
      var H = (D) => !D.sync && !D.file;
      e.isAsyncNoFile = H;
      var u = (D) => !!D.sync;
      e.isSync = u;
      var f = (D) => !D.sync;
      e.isAsync = f;
      var d = (D) => !!D.file;
      e.isFile = d;
      var _ = (D) => !D.file;
      e.isNoFile = _;
      var L = (D) => t.get(D) || D,
        I = (D = {}) => {
          if (!D) return {};
          let S = {};
          for (let [T, C] of Object.entries(D)) {
            let O = L(T);
            S[O] = C;
          }
          return (S.chmod === void 0 && S.noChmod === !1 && (S.chmod = !0), delete S.noChmod, S);
        };
      e.dealias = I;
    }),
    s4e = e_((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.makeCommand = void 0));
      var t = Llr(),
        r = (s, a, H, u, f) =>
          Object.assign(
            (d = [], _, L) => {
              (Array.isArray(d) && ((_ = d), (d = {})),
                typeof _ == "function" && ((L = _), (_ = void 0)),
                (_ = _ ? Array.from(_) : []));
              let I = (0, t.dealias)(d);
              if ((f?.(I, _), (0, t.isSyncFile)(I))) {
                if (typeof L == "function") throw TypeError("callback not supported for sync tar functions");
                return s(I, _);
              } else if ((0, t.isAsyncFile)(I)) {
                let D = a(I, _);
                return L ? D.then(() => L(), L) : D;
              } else if ((0, t.isSyncNoFile)(I)) {
                if (typeof L == "function") throw TypeError("callback not supported for sync tar functions");
                return H(I, _);
              } else if ((0, t.isAsyncNoFile)(I)) {
                if (typeof L == "function") throw TypeError("callback only supported with file option");
                return u(I, _);
              }
              throw Error("impossible options??");
            },
            { syncFile: s, asyncFile: a, syncNoFile: H, asyncNoFile: u, validate: f },
          );
      e.makeCommand = r;
    }),
    uti = e_((e) => {
      var t =
        (e && e.__importDefault) ||
        function (a) {
          return a && a.__esModule ? a : { default: a };
        };
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.constants = void 0));
      var r = t(cr("zlib")),
        s = r.default.constants || { ZLIB_VERNUM: 4736 };
      e.constants = Object.freeze(
        Object.assign(
          Object.create(null),
          {
            Z_NO_FLUSH: 0,
            Z_PARTIAL_FLUSH: 1,
            Z_SYNC_FLUSH: 2,
            Z_FULL_FLUSH: 3,
            Z_FINISH: 4,
            Z_BLOCK: 5,
            Z_OK: 0,
            Z_STREAM_END: 1,
            Z_NEED_DICT: 2,
            Z_ERRNO: -1,
            Z_STREAM_ERROR: -2,
            Z_DATA_ERROR: -3,
            Z_MEM_ERROR: -4,
            Z_BUF_ERROR: -5,
            Z_VERSION_ERROR: -6,
            Z_NO_COMPRESSION: 0,
            Z_BEST_SPEED: 1,
            Z_BEST_COMPRESSION: 9,
            Z_DEFAULT_COMPRESSION: -1,
            Z_FILTERED: 1,
            Z_HUFFMAN_ONLY: 2,
            Z_RLE: 3,
            Z_FIXED: 4,
            Z_DEFAULT_STRATEGY: 0,
            DEFLATE: 1,
            INFLATE: 2,
            GZIP: 3,
            GUNZIP: 4,
            DEFLATERAW: 5,
            INFLATERAW: 6,
            UNZIP: 7,
            BROTLI_DECODE: 8,
            BROTLI_ENCODE: 9,
            Z_MIN_WINDOWBITS: 8,
            Z_MAX_WINDOWBITS: 15,
            Z_DEFAULT_WINDOWBITS: 15,
            Z_MIN_CHUNK: 64,
            Z_MAX_CHUNK: 1 / 0,
            Z_DEFAULT_CHUNK: 16384,
            Z_MIN_MEMLEVEL: 1,
            Z_MAX_MEMLEVEL: 9,
            Z_DEFAULT_MEMLEVEL: 8,
            Z_MIN_LEVEL: -1,
            Z_MAX_LEVEL: 9,
            Z_DEFAULT_LEVEL: -1,
            BROTLI_OPERATION_PROCESS: 0,
            BROTLI_OPERATION_FLUSH: 1,
            BROTLI_OPERATION_FINISH: 2,
            BROTLI_OPERATION_EMIT_METADATA: 3,
            BROTLI_MODE_GENERIC: 0,
            BROTLI_MODE_TEXT: 1,
            BROTLI_MODE_FONT: 2,
            BROTLI_DEFAULT_MODE: 0,
            BROTLI_MIN_QUALITY: 0,
            BROTLI_MAX_QUALITY: 11,
            BROTLI_DEFAULT_QUALITY: 11,
            BROTLI_MIN_WINDOW_BITS: 10,
            BROTLI_MAX_WINDOW_BITS: 24,
            BROTLI_LARGE_MAX_WINDOW_BITS: 30,
            BROTLI_DEFAULT_WINDOW: 22,
            BROTLI_MIN_INPUT_BLOCK_BITS: 16,
            BROTLI_MAX_INPUT_BLOCK_BITS: 24,
            BROTLI_PARAM_MODE: 0,
            BROTLI_PARAM_QUALITY: 1,
            BROTLI_PARAM_LGWIN: 2,
            BROTLI_PARAM_LGBLOCK: 3,
            BROTLI_PARAM_DISABLE_LITERAL_CONTEXT_MODELING: 4,
            BROTLI_PARAM_SIZE_HINT: 5,
            BROTLI_PARAM_LARGE_WINDOW: 6,
            BROTLI_PARAM_NPOSTFIX: 7,
            BROTLI_PARAM_NDIRECT: 8,
            BROTLI_DECODER_RESULT_ERROR: 0,
            BROTLI_DECODER_RESULT_SUCCESS: 1,
            BROTLI_DECODER_RESULT_NEEDS_MORE_INPUT: 2,
            BROTLI_DECODER_RESULT_NEEDS_MORE_OUTPUT: 3,
            BROTLI_DECODER_PARAM_DISABLE_RING_BUFFER_REALLOCATION: 0,
            BROTLI_DECODER_PARAM_LARGE_WINDOW: 1,
            BROTLI_DECODER_NO_ERROR: 0,
            BROTLI_DECODER_SUCCESS: 1,
            BROTLI_DECODER_NEEDS_MORE_INPUT: 2,
            BROTLI_DECODER_NEEDS_MORE_OUTPUT: 3,
            BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_NIBBLE: -1,
            BROTLI_DECODER_ERROR_FORMAT_RESERVED: -2,
            BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_META_NIBBLE: -3,
            BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_ALPHABET: -4,
            BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_SAME: -5,
            BROTLI_DECODER_ERROR_FORMAT_CL_SPACE: -6,
            BROTLI_DECODER_ERROR_FORMAT_HUFFMAN_SPACE: -7,
            BROTLI_DECODER_ERROR_FORMAT_CONTEXT_MAP_REPEAT: -8,
            BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_1: -9,
            BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_2: -10,
            BROTLI_DECODER_ERROR_FORMAT_TRANSFORM: -11,
            BROTLI_DECODER_ERROR_FORMAT_DICTIONARY: -12,
            BROTLI_DECODER_ERROR_FORMAT_WINDOW_BITS: -13,
            BROTLI_DECODER_ERROR_FORMAT_PADDING_1: -14,
            BROTLI_DECODER_ERROR_FORMAT_PADDING_2: -15,
            BROTLI_DECODER_ERROR_FORMAT_DISTANCE: -16,
            BROTLI_DECODER_ERROR_DICTIONARY_NOT_SET: -19,
            BROTLI_DECODER_ERROR_INVALID_ARGUMENTS: -20,
            BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MODES: -21,
            BROTLI_DECODER_ERROR_ALLOC_TREE_GROUPS: -22,
            BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MAP: -25,
            BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_1: -26,
            BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_2: -27,
            BROTLI_DECODER_ERROR_ALLOC_BLOCK_TYPE_TREES: -30,
            BROTLI_DECODER_ERROR_UNREACHABLE: -31,
          },
          s,
        ),
      );
    }),
    lti = e_((e) => {
      var t =
          (e && e.__createBinding) ||
          (Object.create
            ? function (Pe, ye, ot, Ee) {
                Ee === void 0 && (Ee = ot);
                var Ve = Object.getOwnPropertyDescriptor(ye, ot);
                ((!Ve || ("get" in Ve ? !ye.__esModule : Ve.writable || Ve.configurable)) &&
                  (Ve = {
                    enumerable: !0,
                    get: function () {
                      return ye[ot];
                    },
                  }),
                  Object.defineProperty(Pe, Ee, Ve));
              }
            : function (Pe, ye, ot, Ee) {
                (Ee === void 0 && (Ee = ot), (Pe[Ee] = ye[ot]));
              }),
        r =
          (e && e.__setModuleDefault) ||
          (Object.create
            ? function (Pe, ye) {
                Object.defineProperty(Pe, "default", { enumerable: !0, value: ye });
              }
            : function (Pe, ye) {
                Pe.default = ye;
              }),
        s =
          (e && e.__importStar) ||
          (function () {
            var Pe = function (ye) {
              return (
                (Pe =
                  Object.getOwnPropertyNames ||
                  function (ot) {
                    var Ee = [];
                    for (var Ve in ot) Object.prototype.hasOwnProperty.call(ot, Ve) && (Ee[Ee.length] = Ve);
                    return Ee;
                  }),
                Pe(ye)
              );
            };
            return function (ye) {
              if (ye && ye.__esModule) return ye;
              var ot = {};
              if (ye != null)
                for (var Ee = Pe(ye), Ve = 0; Ve < Ee.length; Ve++) Ee[Ve] !== "default" && t(ot, ye, Ee[Ve]);
              return (r(ot, ye), ot);
            };
          })(),
        a =
          (e && e.__importDefault) ||
          function (Pe) {
            return Pe && Pe.__esModule ? Pe : { default: Pe };
          };
      (Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.ZstdDecompress =
          e.ZstdCompress =
          e.BrotliDecompress =
          e.BrotliCompress =
          e.Unzip =
          e.InflateRaw =
          e.DeflateRaw =
          e.Gunzip =
          e.Gzip =
          e.Inflate =
          e.Deflate =
          e.Zlib =
          e.ZlibError =
          e.constants =
            void 0));
      var H = a(cr("assert")),
        u = cr("buffer"),
        f = n4e(),
        d = s(cr("zlib")),
        _ = uti(),
        L = uti();
      Object.defineProperty(e, "constants", {
        enumerable: !0,
        get: function () {
          return L.constants;
        },
      });
      var I = u.Buffer.concat,
        D = Object.getOwnPropertyDescriptor(u.Buffer, "concat"),
        S = (Pe) => Pe,
        T =
          D?.writable === !0 || D?.set !== void 0
            ? (Pe) => {
                u.Buffer.concat = Pe ? S : I;
              }
            : (Pe) => {},
        C = Symbol("_superWrite"),
        O = class extends Error {
          code;
          errno;
          constructor(Pe, ye) {
            (super("zlib: " + Pe.message, { cause: Pe }),
              (this.code = Pe.code),
              (this.errno = Pe.errno),
              this.code || (this.code = "ZLIB_ERROR"),
              (this.message = "zlib: " + Pe.message),
              Error.captureStackTrace(this, ye ?? this.constructor));
          }
          get name() {
            return "ZlibError";
          }
        };
      e.ZlibError = O;
      var B = Symbol("flushFlag"),
        V = class extends f.Minipass {
          #e = !1;
          #r = !1;
          #t;
          #n;
          #i;
          #s;
          #a;
          get sawError() {
            return this.#e;
          }
          get handle() {
            return this.#s;
          }
          get flushFlag() {
            return this.#t;
          }
          constructor(Pe, ye) {
            if (!Pe || typeof Pe != "object") throw TypeError("invalid options for ZlibBase constructor");
            if (
              (super(Pe),
              (this.#t = Pe.flush ?? 0),
              (this.#n = Pe.finishFlush ?? 0),
              (this.#i = Pe.fullFlushFlag ?? 0),
              typeof d[ye] != "function")
            )
              throw TypeError("Compression method not supported: " + ye);
            try {
              this.#s = new d[ye](Pe);
            } catch (ot) {
              throw new O(ot, this.constructor);
            }
            ((this.#a = (ot) => {
              this.#e || ((this.#e = !0), this.close(), this.emit("error", ot));
            }),
              this.#s?.on("error", (ot) => this.#a(new O(ot))),
              this.once("end", () => this.close));
          }
          close() {
            this.#s && (this.#s.close(), (this.#s = void 0), this.emit("close"));
          }
          reset() {
            if (!this.#e) return ((0, H.default)(this.#s, "zlib binding closed"), this.#s.reset?.());
          }
          flush(Pe) {
            this.ended ||
              (typeof Pe != "number" && (Pe = this.#i),
              this.write(Object.assign(u.Buffer.alloc(0), { [B]: Pe })));
          }
          end(Pe, ye, ot) {
            return (
              typeof Pe == "function" && ((ot = Pe), (ye = void 0), (Pe = void 0)),
              typeof ye == "function" && ((ot = ye), (ye = void 0)),
              Pe && (ye ? this.write(Pe, ye) : this.write(Pe)),
              this.flush(this.#n),
              (this.#r = !0),
              super.end(ot)
            );
          }
          get ended() {
            return this.#r;
          }
          [C](Pe) {
            return super.write(Pe);
          }
          write(Pe, ye, ot) {
            if (
              (typeof ye == "function" && ((ot = ye), (ye = "utf8")),
              typeof Pe == "string" && (Pe = u.Buffer.from(Pe, ye)),
              this.#e)
            )
              return;
            (0, H.default)(this.#s, "zlib binding closed");
            let Ee = this.#s._handle,
              Ve = Ee.close;
            Ee.close = () => {};
            let Fe = this.#s.close;
            ((this.#s.close = () => {}), T(!0));
            let it;
            try {
              let et = typeof Pe[B] == "number" ? Pe[B] : this.#t;
              ((it = this.#s._processChunk(Pe, et)), T(!1));
            } catch (et) {
              (T(!1), this.#a(new O(et, this.write)));
            } finally {
              this.#s &&
                ((this.#s._handle = Ee),
                (Ee.close = Ve),
                (this.#s.close = Fe),
                this.#s.removeAllListeners("error"));
            }
            this.#s && this.#s.on("error", (et) => this.#a(new O(et, this.write)));
            let At;
            if (it)
              if (Array.isArray(it) && it.length > 0) {
                let et = it[0];
                At = this[C](u.Buffer.from(et));
                for (let ut = 1; ut < it.length; ut++) At = this[C](it[ut]);
              } else At = this[C](u.Buffer.from(it));
            return (ot && ot(), At);
          }
        },
        q = class extends V {
          #e;
          #r;
          constructor(Pe, ye) {
            ((Pe = Pe || {}),
              (Pe.flush = Pe.flush || _.constants.Z_NO_FLUSH),
              (Pe.finishFlush = Pe.finishFlush || _.constants.Z_FINISH),
              (Pe.fullFlushFlag = _.constants.Z_FULL_FLUSH),
              super(Pe, ye),
              (this.#e = Pe.level),
              (this.#r = Pe.strategy));
          }
          params(Pe, ye) {
            if (!this.sawError) {
              if (!this.handle) throw Error("cannot switch params when binding is closed");
              if (!this.handle.params) throw Error("not supported in this implementation");
              if (this.#e !== Pe || this.#r !== ye) {
                (this.flush(_.constants.Z_SYNC_FLUSH), (0, H.default)(this.handle, "zlib binding closed"));
                let ot = this.handle.flush;
                this.handle.flush = (Ee, Ve) => {
                  (typeof Ee == "function" && ((Ve = Ee), (Ee = this.flushFlag)), this.flush(Ee), Ve?.());
                };
                try {
                  this.handle.params(Pe, ye);
                } finally {
                  this.handle.flush = ot;
                }
                this.handle && ((this.#e = Pe), (this.#r = ye));
              }
            }
          }
        };
      e.Zlib = q;
      var Z = class extends q {
        constructor(Pe) {
          super(Pe, "Deflate");
        }
      };
      e.Deflate = Z;
      var se = class extends q {
        constructor(Pe) {
          super(Pe, "Inflate");
        }
      };
      e.Inflate = se;
      var ae = class extends q {
        #e;
        constructor(Pe) {
          (super(Pe, "Gzip"), (this.#e = Pe && !!Pe.portable));
        }
        [C](Pe) {
          return this.#e ? ((this.#e = !1), (Pe[9] = 255), super[C](Pe)) : super[C](Pe);
        }
      };
      e.Gzip = ae;
      var z = class extends q {
        constructor(Pe) {
          super(Pe, "Gunzip");
        }
      };
      e.Gunzip = z;
      var Ae = class extends q {
        constructor(Pe) {
          super(Pe, "DeflateRaw");
        }
      };
      e.DeflateRaw = Ae;
      var le = class extends q {
        constructor(Pe) {
          super(Pe, "InflateRaw");
        }
      };
      e.InflateRaw = le;
      var Be = class extends q {
        constructor(Pe) {
          super(Pe, "Unzip");
        }
      };
      e.Unzip = Be;
      var Te = class extends V {
          constructor(Pe, ye) {
            ((Pe = Pe || {}),
              (Pe.flush = Pe.flush || _.constants.BROTLI_OPERATION_PROCESS),
              (Pe.finishFlush = Pe.finishFlush || _.constants.BROTLI_OPERATION_FINISH),
              (Pe.fullFlushFlag = _.constants.BROTLI_OPERATION_FLUSH),
              super(Pe, ye));
          }
        },
        Lt = class extends Te {
          constructor(Pe) {
            super(Pe, "BrotliCompress");
          }
        };
      e.BrotliCompress = Lt;
      var Ht = class extends Te {
        constructor(Pe) {
          super(Pe, "BrotliDecompress");
        }
      };
      e.BrotliDecompress = Ht;
      var Se = class extends V {
          constructor(Pe, ye) {
            ((Pe = Pe || {}),
              (Pe.flush = Pe.flush || _.constants.ZSTD_e_continue),
              (Pe.finishFlush = Pe.finishFlush || _.constants.ZSTD_e_end),
              (Pe.fullFlushFlag = _.constants.ZSTD_e_flush),
              super(Pe, ye));
          }
        },
        _e = class extends Se {
          constructor(Pe) {
            super(Pe, "ZstdCompress");
          }
        };
      e.ZstdCompress = _e;
      var we = class extends Se {
        constructor(Pe) {
          super(Pe, "ZstdDecompress");
        }
      };
      e.ZstdDecompress = we;
    }),
    e2o = e_((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.parse = e.encode = void 0));
      var t = (_, L) => {
        if (Number.isSafeInteger(_)) _ < 0 ? s(_, L) : r(_, L);
        else throw Error("cannot encode number outside of javascript safe integer range");
        return L;
      };
      e.encode = t;
      var r = (_, L) => {
          L[0] = 128;
          for (var I = L.length; I > 1; I--) ((L[I - 1] = _ & 255), (_ = Math.floor(_ / 256)));
        },
        s = (_, L) => {
          L[0] = 255;
          var I = !1;
          _ = _ * -1;
          for (var D = L.length; D > 1; D--) {
            var S = _ & 255;
            ((_ = Math.floor(_ / 256)),
              I ? (L[D - 1] = f(S)) : S === 0 ? (L[D - 1] = 0) : ((I = !0), (L[D - 1] = d(S))));
          }
        },
        a = (_) => {
          let L = _[0],
            I = L === 128 ? u(_.subarray(1, _.length)) : L === 255 ? H(_) : null;
          if (I === null) throw Error("invalid base256 encoding");
          if (!Number.isSafeInteger(I)) throw Error("parsed number outside of javascript safe integer range");
          return I;
        };
      e.parse = a;
      var H = (_) => {
          for (var L = _.length, I = 0, D = !1, S = L - 1; S > -1; S--) {
            var T = Number(_[S]),
              C;
            (D ? (C = f(T)) : T === 0 ? (C = T) : ((D = !0), (C = d(T))),
              C !== 0 && (I -= C * Math.pow(256, L - S - 1)));
          }
          return I;
        },
        u = (_) => {
          for (var L = _.length, I = 0, D = L - 1; D > -1; D--) {
            var S = Number(_[D]);
            S !== 0 && (I += S * Math.pow(256, L - D - 1));
          }
          return I;
        },
        f = (_) => (255 ^ _) & 255,
        d = (_) => ((255 ^ _) + 1) & 255;
    }),
    fti = e_((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.code = e.name = e.normalFsTypes = e.isName = e.isCode = void 0));
      var t = (s) => e.name.has(s);
      e.isCode = t;
      var r = (s) => e.code.has(s);
      ((e.isName = r),
        (e.normalFsTypes = new Set(["0", "", "1", "2", "3", "4", "5", "6", "7", "D"])),
        (e.name = new Map([
          ["0", "File"],
          ["", "OldFile"],
          ["1", "Link"],
          ["2", "SymbolicLink"],
          ["3", "CharacterDevice"],
          ["4", "BlockDevice"],
          ["5", "Directory"],
          ["6", "FIFO"],
          ["7", "ContiguousFile"],
          ["g", "GlobalExtendedHeader"],
          ["x", "ExtendedHeader"],
          ["A", "SolarisACL"],
          ["D", "GNUDumpDir"],
          ["I", "Inode"],
          ["K", "NextFileHasLongLinkpath"],
          ["L", "NextFileHasLongPath"],
          ["M", "ContinuationFile"],
          ["N", "OldGnuLongPath"],
          ["S", "SparseFile"],
          ["V", "TapeVolumeHeader"],
          ["X", "OldExtendedHeader"],
        ])),
        (e.code = new Map(Array.from(e.name).map((s) => [s[1], s[0]]))));
    }),
    o4e = e_((e) => {
      var t =
          (e && e.__createBinding) ||
          (Object.create
            ? function (Ae, le, Be, Te) {
                Te === void 0 && (Te = Be);
                var Lt = Object.getOwnPropertyDescriptor(le, Be);
                ((!Lt || ("get" in Lt ? !le.__esModule : Lt.writable || Lt.configurable)) &&
                  (Lt = {
                    enumerable: !0,
                    get: function () {
                      return le[Be];
                    },
                  }),
                  Object.defineProperty(Ae, Te, Lt));
              }
            : function (Ae, le, Be, Te) {
                (Te === void 0 && (Te = Be), (Ae[Te] = le[Be]));
              }),
        r =
          (e && e.__setModuleDefault) ||
          (Object.create
            ? function (Ae, le) {
                Object.defineProperty(Ae, "default", { enumerable: !0, value: le });
              }
            : function (Ae, le) {
                Ae.default = le;
              }),
        s =
          (e && e.__importStar) ||
          (function () {
            var Ae = function (le) {
              return (
                (Ae =
                  Object.getOwnPropertyNames ||
                  function (Be) {
                    var Te = [];
                    for (var Lt in Be) Object.prototype.hasOwnProperty.call(Be, Lt) && (Te[Te.length] = Lt);
                    return Te;
                  }),
                Ae(le)
              );
            };
            return function (le) {
              if (le && le.__esModule) return le;
              var Be = {};
              if (le != null)
                for (var Te = Ae(le), Lt = 0; Lt < Te.length; Lt++) Te[Lt] !== "default" && t(Be, le, Te[Lt]);
              return (r(Be, le), Be);
            };
          })();
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.Header = void 0));
      var a = cr("path"),
        H = s(e2o()),
        u = s(fti()),
        f = (Ae) => (Ae === void 0 || Ae < 0 ? void 0 : Ae),
        d = class {
          cksumValid = !1;
          needPax = !1;
          nullBlock = !1;
          block;
          path;
          mode;
          uid;
          gid;
          size;
          cksum;
          #e = "Unsupported";
          linkpath;
          uname;
          gname;
          devmaj = 0;
          devmin = 0;
          atime;
          ctime;
          mtime;
          charset;
          comment;
          constructor(Ae, le = 0, Be, Te) {
            Buffer.isBuffer(Ae) ? this.decode(Ae, le || 0, Be, Te) : Ae && this.#r(Ae);
          }
          decode(Ae, le, Be, Te) {
            if ((le || (le = 0), !Ae || !(Ae.length >= le + 512))) throw Error("need 512 bytes for header");
            let Lt = L(Ae, le + 156, 1),
              Ht = u.normalFsTypes.has(Lt),
              Se = Ht ? Be : void 0,
              _e = Ht ? Te : void 0;
            if (
              ((this.path = Se?.path ?? L(Ae, le, 100)),
              (this.mode = Se?.mode ?? _e?.mode ?? S(Ae, le + 100, 8)),
              (this.uid = Se?.uid ?? _e?.uid ?? S(Ae, le + 108, 8)),
              (this.gid = Se?.gid ?? _e?.gid ?? S(Ae, le + 116, 8)),
              (this.size = f(Se?.size ?? _e?.size ?? S(Ae, le + 124, 12))),
              (this.mtime = Se?.mtime ?? _e?.mtime ?? I(Ae, le + 136, 12)),
              (this.cksum = S(Ae, le + 148, 12)),
              _e && this.#r(_e, !0),
              Se && this.#r(Se),
              u.isCode(Lt) && (this.#e = Lt || "0"),
              this.#e === "0" && this.path.slice(-1) === "/" && (this.#e = "5"),
              this.#e === "5" && (this.size = 0),
              (this.linkpath = L(Ae, le + 157, 100)),
              Ae.subarray(le + 257, le + 265).toString() === "ustar\x0000")
            )
              if (
                ((this.uname = Se?.uname ?? _e?.uname ?? L(Ae, le + 265, 32)),
                (this.gname = Se?.gname ?? _e?.gname ?? L(Ae, le + 297, 32)),
                (this.devmaj = Se?.devmaj ?? _e?.devmaj ?? S(Ae, le + 329, 8) ?? 0),
                (this.devmin = Se?.devmin ?? _e?.devmin ?? S(Ae, le + 337, 8) ?? 0),
                Ae[le + 475] !== 0)
              ) {
                let Pe = L(Ae, le + 345, 155);
                this.path = Pe + "/" + this.path;
              } else {
                let Pe = L(Ae, le + 345, 130);
                (Pe && (this.path = Pe + "/" + this.path),
                  (this.atime = Be?.atime ?? Te?.atime ?? I(Ae, le + 476, 12)),
                  (this.ctime = Be?.ctime ?? Te?.ctime ?? I(Ae, le + 488, 12)));
              }
            let we = 256;
            for (let Pe = le; Pe < le + 148; Pe++) we += Ae[Pe];
            for (let Pe = le + 156; Pe < le + 512; Pe++) we += Ae[Pe];
            ((this.cksumValid = we === this.cksum),
              this.cksum === void 0 && we === 256 && (this.nullBlock = !0));
          }
          #r(Ae, le = !1) {
            Object.assign(
              this,
              Object.fromEntries(
                Object.entries(Ae).filter(
                  ([Be, Te]) =>
                    !(
                      Te == null ||
                      (Be === "size" && Number(Te) < 0) ||
                      (Be === "path" && le) ||
                      (Be === "linkpath" && le) ||
                      Be === "global"
                    ),
                ),
              ),
            );
          }
          encode(Ae, le = 0) {
            if (
              (Ae || (Ae = this.block = Buffer.alloc(512)),
              this.#e === "Unsupported" && (this.#e = "0"),
              !(Ae.length >= le + 512))
            )
              throw Error("need 512 bytes for header");
            let Be = this.ctime || this.atime ? 130 : 155,
              Te = _(this.path || "", Be),
              Lt = Te[0],
              Ht = Te[1];
            ((this.needPax = !!Te[2]),
              (this.needPax = z(Ae, le, 100, Lt) || this.needPax),
              (this.needPax = B(Ae, le + 100, 8, this.mode) || this.needPax),
              (this.needPax = B(Ae, le + 108, 8, this.uid) || this.needPax),
              (this.needPax = B(Ae, le + 116, 8, this.gid) || this.needPax),
              (this.needPax = B(Ae, le + 124, 12, this.size) || this.needPax),
              (this.needPax = se(Ae, le + 136, 12, this.mtime) || this.needPax),
              (Ae[le + 156] = Number(this.#e.codePointAt(0))),
              (this.needPax = z(Ae, le + 157, 100, this.linkpath) || this.needPax),
              Ae.write("ustar\x0000", le + 257, 8),
              (this.needPax = z(Ae, le + 265, 32, this.uname) || this.needPax),
              (this.needPax = z(Ae, le + 297, 32, this.gname) || this.needPax),
              (this.needPax = B(Ae, le + 329, 8, this.devmaj) || this.needPax),
              (this.needPax = B(Ae, le + 337, 8, this.devmin) || this.needPax),
              (this.needPax = z(Ae, le + 345, Be, Ht) || this.needPax),
              Ae[le + 475] !== 0
                ? (this.needPax = z(Ae, le + 345, 155, Ht) || this.needPax)
                : ((this.needPax = z(Ae, le + 345, 130, Ht) || this.needPax),
                  (this.needPax = se(Ae, le + 476, 12, this.atime) || this.needPax),
                  (this.needPax = se(Ae, le + 488, 12, this.ctime) || this.needPax)));
            let Se = 256;
            for (let _e = le; _e < le + 148; _e++) Se += Ae[_e];
            for (let _e = le + 156; _e < le + 512; _e++) Se += Ae[_e];
            return ((this.cksum = Se), B(Ae, le + 148, 8, this.cksum), (this.cksumValid = !0), this.needPax);
          }
          get type() {
            return this.#e === "Unsupported" ? this.#e : u.name.get(this.#e);
          }
          get typeKey() {
            return this.#e;
          }
          set type(Ae) {
            let le = String(u.code.get(Ae));
            if (u.isCode(le) || le === "Unsupported") this.#e = le;
            else if (u.isCode(Ae)) this.#e = Ae;
            else throw TypeError("invalid entry type: " + Ae);
          }
        };
      e.Header = d;
      var _ = (Ae, le) => {
          let Be = Ae,
            Te = "",
            Lt,
            Ht = a.posix.parse(Ae).root || ".";
          if (Buffer.byteLength(Be) < 100) Lt = [Be, Te, !1];
          else {
            ((Te = a.posix.dirname(Be)), (Be = a.posix.basename(Be)));
            do
              Buffer.byteLength(Be) <= 100 && Buffer.byteLength(Te) <= le
                ? (Lt = [Be, Te, !1])
                : Buffer.byteLength(Be) > 100 && Buffer.byteLength(Te) <= le
                  ? (Lt = [Be.slice(0, 99), Te, !0])
                  : ((Be = a.posix.join(a.posix.basename(Te), Be)), (Te = a.posix.dirname(Te)));
            while (Te !== Ht && Lt === void 0);
            Lt || (Lt = [Ae.slice(0, 99), "", !0]);
          }
          return Lt;
        },
        L = (Ae, le, Be) =>
          Ae.subarray(le, le + Be)
            .toString("utf8")
            .replace(/\0.*/, ""),
        I = (Ae, le, Be) => D(S(Ae, le, Be)),
        D = (Ae) => (Ae === void 0 ? void 0 : new Date(Ae * 1000)),
        S = (Ae, le, Be) => (Number(Ae[le]) & 128 ? H.parse(Ae.subarray(le, le + Be)) : C(Ae, le, Be)),
        T = (Ae) => (isNaN(Ae) ? void 0 : Ae),
        C = (Ae, le, Be) =>
          T(
            parseInt(
              Ae.subarray(le, le + Be)
                .toString("utf8")
                .replace(/\0.*$/, "")
                .trim(),
              8,
            ),
          ),
        O = { 12: 8589934591, 8: 2097151 },
        B = (Ae, le, Be, Te) =>
          Te === void 0
            ? !1
            : Te > O[Be] || Te < 0
              ? (H.encode(Te, Ae.subarray(le, le + Be)), !0)
              : (V(Ae, le, Be, Te), !1),
        V = (Ae, le, Be, Te) => Ae.write(q(Te, Be), le, Be, "ascii"),
        q = (Ae, le) => Z(Math.floor(Ae).toString(8), le),
        Z = (Ae, le) => (Ae.length === le - 1 ? Ae : Array(le - Ae.length - 1).join("0") + Ae + " ") + "\x00",
        se = (Ae, le, Be, Te) => (Te === void 0 ? !1 : B(Ae, le, Be, Te.getTime() / 1000)),
        ae = Array(156).join("\x00"),
        z = (Ae, le, Be, Te) =>
          Te === void 0
            ? !1
            : (Ae.write(Te + ae, le, Be, "utf8"), Te.length !== Buffer.byteLength(Te) || Te.length > Be);
    }),
    $lr = e_((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.Pax = void 0));
      var t = cr("path"),
        r = o4e(),
        s = class f {
          atime;
          mtime;
          ctime;
          charset;
          comment;
          gid;
          uid;
          gname;
          uname;
          linkpath;
          dev;
          ino;
          nlink;
          path;
          size;
          mode;
          global;
          constructor(d, _ = !1) {
            ((this.atime = d.atime),
              (this.charset = d.charset),
              (this.comment = d.comment),
              (this.ctime = d.ctime),
              (this.dev = d.dev),
              (this.gid = d.gid),
              (this.global = _),
              (this.gname = d.gname),
              (this.ino = d.ino),
              (this.linkpath = d.linkpath),
              (this.mtime = d.mtime),
              (this.nlink = d.nlink),
              (this.path = d.path),
              (this.size = d.size),
              (this.uid = d.uid),
              (this.uname = d.uname));
          }
          encode() {
            let d = this.encodeBody();
            if (d === "") return Buffer.allocUnsafe(0);
            let _ = Buffer.byteLength(d),
              L = 512 * Math.ceil(1 + _ / 512),
              I = Buffer.allocUnsafe(L);
            for (let D = 0; D < 512; D++) I[D] = 0;
            (new r.Header({
              path: ("PaxHeader/" + (0, t.basename)(this.path ?? "")).slice(0, 99),
              mode: this.mode || 420,
              uid: this.uid,
              gid: this.gid,
              size: _,
              mtime: this.mtime,
              type: this.global ? "GlobalExtendedHeader" : "ExtendedHeader",
              linkpath: "",
              uname: this.uname || "",
              gname: this.gname || "",
              devmaj: 0,
              devmin: 0,
              atime: this.atime,
              ctime: this.ctime,
            }).encode(I),
              I.write(d, 512, _, "utf8"));
            for (let D = _ + 512; D < I.length; D++) I[D] = 0;
            return I;
          }
          encodeBody() {
            return (
              this.encodeField("path") +
              this.encodeField("ctime") +
              this.encodeField("atime") +
              this.encodeField("dev") +
              this.encodeField("ino") +
              this.encodeField("nlink") +
              this.encodeField("charset") +
              this.encodeField("comment") +
              this.encodeField("gid") +
              this.encodeField("gname") +
              this.encodeField("linkpath") +
              this.encodeField("mtime") +
              this.encodeField("size") +
              this.encodeField("uid") +
              this.encodeField("uname")
            );
          }
          encodeField(d) {
            if (this[d] === void 0) return "";
            let _ = this[d],
              L = _ instanceof Date ? _.getTime() / 1000 : _,
              I =
                " " +
                (d === "dev" || d === "ino" || d === "nlink" ? "SCHILY." : "") +
                d +
                "=" +
                L +
                `
`,
              D = Buffer.byteLength(I),
              S = Math.floor(Math.log(D) / Math.log(10)) + 1;
            return (D + S >= Math.pow(10, S) && (S += 1), S + D + I);
          }
          static parse(d, _, L = !1) {
            return new f(a(H(d), _), L);
          }
        };
      e.Pax = s;
      var a = (f, d) => (d ? Object.assign({}, d, f) : f),
        H = (f) =>
          f
            .replace(/\n$/, "")
            .split(
              `
`,
            )
            .reduce(u, Object.create(null)),
        u = (f, d) => {
          let _ = parseInt(d, 10);
          if (_ !== Buffer.byteLength(d) + 1) return f;
          d = d.slice((_ + " ").length);
          let L = d.split("="),
            I = L.shift();
          if (!I) return f;
          let D = I.replace(/^SCHILY\.(dev|ino|nlink)/, "$1"),
            S = L.join("=").replace(/\0.*/, "");
          switch (D) {
            case "path":
            case "linkpath":
            case "type":
            case "charset":
            case "comment":
            case "gname":
            case "uname":
              f[D] = S;
              break;
            case "ctime":
            case "atime":
            case "mtime":
              f[D] = new Date(Number(S) * 1000);
              break;
            case "size":
              let T = +S;
              T >= 0 && (f[D] = T);
              break;
            case "gid":
            case "uid":
            case "dev":
            case "ino":
            case "nlink":
            case "mode":
              f[D] = +S;
              break;
          }
          return f;
        };
    }),
    a4e = e_((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.normalizeWindowsPath = void 0));
      var t = process.env.TESTING_TAR_FAKE_PLATFORM || "win32";
      e.normalizeWindowsPath = t !== "win32" ? (r) => String(r) : (r) => String(r).replaceAll(/\\/g, "/");
    }),
    pti = e_((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.ReadEntry = void 0));
      var t = n4e(),
        r = a4e(),
        s = class extends t.Minipass {
          extended;
          globalExtended;
          header;
          startBlockSize;
          blockRemain;
          remain;
          type;
          meta = !1;
          ignore = !1;
          path;
          mode;
          uid;
          gid;
          uname;
          gname;
          size = 0;
          mtime;
          atime;
          ctime;
          linkpath;
          dev;
          ino;
          nlink;
          invalid = !1;
          absolute;
          unsupported = !1;
          constructor(a, H, u) {
            switch (
              (super({}),
              this.pause(),
              (this.extended = H),
              (this.globalExtended = u),
              (this.header = a),
              (this.remain = a.size ?? 0),
              (this.startBlockSize = 512 * Math.ceil(this.remain / 512)),
              (this.blockRemain = this.startBlockSize),
              (this.type = a.type),
              this.type)
            ) {
              case "File":
              case "OldFile":
              case "Link":
              case "SymbolicLink":
              case "CharacterDevice":
              case "BlockDevice":
              case "Directory":
              case "FIFO":
              case "ContiguousFile":
              case "GNUDumpDir":
                break;
              case "NextFileHasLongLinkpath":
              case "NextFileHasLongPath":
              case "OldGnuLongPath":
              case "GlobalExtendedHeader":
              case "ExtendedHeader":
              case "OldExtendedHeader":
                this.meta = !0;
                break;
              default:
                this.ignore = !0;
            }
            if (!a.path) throw Error("no path provided for tar.ReadEntry");
            ((this.path = (0, r.normalizeWindowsPath)(a.path)),
              (this.mode = a.mode),
              this.mode && (this.mode = this.mode & 4095),
              (this.uid = a.uid),
              (this.gid = a.gid),
              (this.uname = a.uname),
              (this.gname = a.gname),
              (this.size = this.remain),
              (this.mtime = a.mtime),
              (this.atime = a.atime),
              (this.ctime = a.ctime),
              (this.linkpath = a.linkpath ? (0, r.normalizeWindowsPath)(a.linkpath) : void 0),
              (this.uname = a.uname),
              (this.gname = a.gname),
              H && this.#e(H),
              u && this.#e(u, !0));
          }
          write(a) {
            let H = a.length;
            if (H > this.blockRemain) throw Error("writing more to entry than is appropriate");
            let u = this.remain,
              f = this.blockRemain;
            return (
              (this.remain = Math.max(0, u - H)),
              (this.blockRemain = Math.max(0, f - H)),
              this.ignore ? !0 : u >= H ? super.write(a) : super.write(a.subarray(0, u))
            );
          }
          #e(a, H = !1) {
            (a.path && (a.path = (0, r.normalizeWindowsPath)(a.path)),
              a.linkpath && (a.linkpath = (0, r.normalizeWindowsPath)(a.linkpath)),
              Object.assign(
                this,
                Object.fromEntries(Object.entries(a).filter(([u, f]) => !(f == null || (u === "path" && H)))),
              ));
          }
        };
      e.ReadEntry = s;
    }),
    glr = e_((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.warnMethod = void 0));
      var t = (r, s, a, H = {}) => {
        (r.file && (H.file = r.file),
          r.cwd && (H.cwd = r.cwd),
          (H.code = (a instanceof Error && a.code) || s),
          (H.tarCode = s),
          !r.strict && H.recoverable !== !1
            ? (a instanceof Error && ((H = Object.assign(a, H)), (a = a.message)), r.emit("warn", s, a, H))
            : a instanceof Error
              ? r.emit("error", Object.assign(a, H))
              : r.emit("error", Object.assign(Error(`${s}: ${a}`), H)));
      };
      e.warnMethod = t;
    }),
    Elr = e_((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.Parser = void 0));
      var t = cr("events"),
        r = lti(),
        s = o4e(),
        a = $lr(),
        H = pti(),
        u = glr(),
        f = 1048576,
        d = Buffer.from([31, 139]),
        _ = Buffer.from([40, 181, 47, 253]),
        L = Math.max(d.length, _.length),
        I = Symbol("state"),
        D = Symbol("writeEntry"),
        S = Symbol("readEntry"),
        T = Symbol("nextEntry"),
        C = Symbol("processEntry"),
        O = Symbol("extendedHeader"),
        B = Symbol("globalExtendedHeader"),
        V = Symbol("meta"),
        q = Symbol("emitMeta"),
        Z = Symbol("buffer"),
        se = Symbol("queue"),
        ae = Symbol("ended"),
        z = Symbol("emittedEnd"),
        Ae = Symbol("emit"),
        le = Symbol("unzip"),
        Be = Symbol("consumeChunk"),
        Te = Symbol("consumeChunkSub"),
        Lt = Symbol("consumeBody"),
        Ht = Symbol("consumeMeta"),
        Se = Symbol("consumeHeader"),
        _e = Symbol("consuming"),
        we = Symbol("bufferConcat"),
        Pe = Symbol("maybeEnd"),
        ye = Symbol("writing"),
        ot = Symbol("aborted"),
        Ee = Symbol("onDone"),
        Ve = Symbol("sawValidEntry"),
        Fe = Symbol("sawNullBlock"),
        it = Symbol("sawEOF"),
        At = Symbol("closeStream"),
        et = 1000,
        ut = Symbol("compressedBytesRead"),
        ht = Symbol("decompressedBytesRead"),
        Et = Symbol("checkDecompressionRatio"),
        tr = () => !0,
        Rr = class extends t.EventEmitter {
          file;
          strict;
          maxMetaEntrySize;
          filter;
          brotli;
          zstd;
          maxDecompressionRatio;
          writable = !0;
          readable = !1;
          [se] = [];
          [Z];
          [S];
          [D];
          [I] = "begin";
          [V] = "";
          [O];
          [B];
          [ae] = !1;
          [le];
          [ot] = !1;
          [Ve];
          [Fe] = !1;
          [it] = !1;
          [ye] = !1;
          [_e] = !1;
          [z] = !1;
          [ut] = 0;
          [ht] = 0;
          constructor(Vt = {}) {
            (super(),
              (this.file = Vt.file || ""),
              this.on(Ee, () => {
                (this[I] === "begin" || this[Ve] === !1) &&
                  this.warn("TAR_BAD_ARCHIVE", "Unrecognized archive format");
              }),
              Vt.ondone
                ? this.on(Ee, Vt.ondone)
                : this.on(Ee, () => {
                    (this.emit("prefinish"), this.emit("finish"), this.emit("end"));
                  }),
              (this.strict = !!Vt.strict),
              (this.maxDecompressionRatio =
                typeof Vt.maxDecompressionRatio == "number" ? Vt.maxDecompressionRatio : et),
              (this.maxMetaEntrySize = Vt.maxMetaEntrySize || f),
              (this.filter = typeof Vt.filter == "function" ? Vt.filter : tr));
            let Br = Vt.file && (Vt.file.endsWith(".tar.br") || Vt.file.endsWith(".tbr"));
            this.brotli = !(Vt.gzip || Vt.zstd) && Vt.brotli !== void 0 ? Vt.brotli : Br ? void 0 : !1;
            let Dt = Vt.file && (Vt.file.endsWith(".tar.zst") || Vt.file.endsWith(".tzst"));
            ((this.zstd = !(Vt.gzip || Vt.brotli) && Vt.zstd !== void 0 ? Vt.zstd : Dt ? !0 : void 0),
              this.on("end", () => this[At]()),
              typeof Vt.onwarn == "function" && this.on("warn", Vt.onwarn),
              typeof Vt.onReadEntry == "function" && this.on("entry", Vt.onReadEntry));
          }
          warn(Vt, Br, Dt = {}) {
            (0, u.warnMethod)(this, Vt, Br, Dt);
          }
          [Se](Vt, Br) {
            this[Ve] === void 0 && (this[Ve] = !1);
            let Dt;
            try {
              Dt = new s.Header(Vt, Br, this[O], this[B]);
            } catch (St) {
              return this.warn("TAR_ENTRY_INVALID", St);
            }
            if (Dt.nullBlock)
              this[Fe]
                ? ((this[it] = !0), this[I] === "begin" && (this[I] = "header"), this[Ae]("eof"))
                : ((this[Fe] = !0), this[Ae]("nullBlock"));
            else if (((this[Fe] = !1), !Dt.cksumValid))
              this.warn("TAR_ENTRY_INVALID", "checksum failure", { header: Dt });
            else if (!Dt.path) this.warn("TAR_ENTRY_INVALID", "path is required", { header: Dt });
            else {
              let St = Dt.type;
              if (/^(Symbolic)?Link$/.test(St) && !Dt.linkpath)
                this.warn("TAR_ENTRY_INVALID", "linkpath required", { header: Dt });
              else if (!/^(Symbolic)?Link$/.test(St) && !/^(Global)?ExtendedHeader$/.test(St) && Dt.linkpath)
                this.warn("TAR_ENTRY_INVALID", "linkpath forbidden", { header: Dt });
              else {
                let wt = (this[D] = new H.ReadEntry(Dt, this[O], this[B]));
                if (!this[Ve])
                  if (wt.remain) {
                    let Qr = () => {
                      wt.invalid || (this[Ve] = !0);
                    };
                    wt.on("end", Qr);
                  } else this[Ve] = !0;
                wt.meta
                  ? wt.size > this.maxMetaEntrySize
                    ? ((wt.ignore = !0), this[Ae]("ignoredEntry", wt), (this[I] = "ignore"), wt.resume())
                    : wt.size > 0 &&
                      ((this[V] = ""), wt.on("data", (Qr) => (this[V] += Qr)), (this[I] = "meta"))
                  : ((this[O] = void 0),
                    (wt.ignore = wt.ignore || !this.filter(wt.path, wt)),
                    wt.ignore
                      ? (this[Ae]("ignoredEntry", wt),
                        (this[I] = wt.remain ? "ignore" : "header"),
                        wt.resume())
                      : (wt.remain ? (this[I] = "body") : ((this[I] = "header"), wt.end()),
                        this[S] ? this[se].push(wt) : (this[se].push(wt), this[T]())));
              }
            }
          }
          [At]() {
            queueMicrotask(() => this.emit("close"));
          }
          [C](Vt) {
            let Br = !0;
            if (!Vt) ((this[S] = void 0), (Br = !1));
            else if (Array.isArray(Vt)) {
              let [Dt, ...St] = Vt;
              this.emit(Dt, ...St);
            } else
              ((this[S] = Vt),
                this.emit("entry", Vt),
                Vt.emittedEnd || (Vt.on("end", () => this[T]()), (Br = !1)));
            return Br;
          }
          [T]() {
            do;
            while (this[C](this[se].shift()));
            if (this[se].length === 0) {
              let Vt = this[S];
              !Vt || Vt.flowing || Vt.size === Vt.remain
                ? this[ye] || this.emit("drain")
                : Vt.once("drain", () => this.emit("drain"));
            }
          }
          [Lt](Vt, Br) {
            let Dt = this[D];
            if (!Dt) throw Error("attempt to consume body without entry??");
            let St = Dt.blockRemain ?? 0,
              wt = St >= Vt.length && Br === 0 ? Vt : Vt.subarray(Br, Br + St);
            return (
              Dt.write(wt),
              Dt.blockRemain || ((this[I] = "header"), (this[D] = void 0), Dt.end()),
              wt.length
            );
          }
          [Ht](Vt, Br) {
            let Dt = this[D],
              St = this[Lt](Vt, Br);
            return (!this[D] && Dt && this[q](Dt), St);
          }
          [Ae](Vt, Br, Dt) {
            this[se].length === 0 && !this[S] ? this.emit(Vt, Br, Dt) : this[se].push([Vt, Br, Dt]);
          }
          [q](Vt) {
            switch ((this[Ae]("meta", this[V]), Vt.type)) {
              case "ExtendedHeader":
              case "OldExtendedHeader":
                this[O] = a.Pax.parse(this[V], this[O], !1);
                break;
              case "GlobalExtendedHeader":
                this[B] = a.Pax.parse(this[V], this[B], !0);
                break;
              case "NextFileHasLongPath":
              case "OldGnuLongPath": {
                let Br = this[O] ?? Object.create(null);
                ((this[O] = Br), (Br.path = this[V].replace(/\0.*/, "")));
                break;
              }
              case "NextFileHasLongLinkpath": {
                let Br = this[O] || Object.create(null);
                ((this[O] = Br), (Br.linkpath = this[V].replace(/\0.*/, "")));
                break;
              }
              default:
                throw Error("unknown meta: " + Vt.type);
            }
          }
          abort(Vt) {
            if (!this[ot]) {
              if (this[le]) {
                let Br = this[le];
                ((Br.write = () => !0), (Br.end = () => Br), (Br.emit = () => !1), Br.destroy?.());
              }
              ((this[ot] = !0), this.emit("abort", Vt), this.warn("TAR_ABORT", Vt, { recoverable: !1 }));
            }
          }
          [Et](Vt) {
            this[ht] += Vt.length;
            let Br = this[ht] / this[ut];
            return Br > this.maxDecompressionRatio
              ? (this.abort(
                  Error(`max decompression ratio exceeded: ${Br.toFixed(2)} > ${this.maxDecompressionRatio}`),
                ),
                !1)
              : !0;
          }
          write(Vt, Br, Dt) {
            if (
              (typeof Br == "function" && ((Dt = Br), (Br = void 0)),
              typeof Vt == "string" && (Vt = Buffer.from(Vt, typeof Br == "string" ? Br : "utf8")),
              this[ot])
            )
              return (Dt?.(), !1);
            if ((this[le] === void 0 || (this.brotli === void 0 && this[le] === !1)) && Vt) {
              if ((this[Z] && ((Vt = Buffer.concat([this[Z], Vt])), (this[Z] = void 0)), Vt.length < L))
                return ((this[Z] = Vt), Dt?.(), !0);
              for (let Li = 0; this[le] === void 0 && Li < d.length; Li++)
                Vt[Li] !== d[Li] && (this[le] = !1);
              let wt = !1;
              if (this[le] === !1 && this.zstd !== !1) {
                wt = !0;
                for (let Li = 0; Li < _.length; Li++)
                  if (Vt[Li] !== _[Li]) {
                    wt = !1;
                    break;
                  }
              }
              let Qr = this.brotli === void 0 && !wt;
              if (this[le] === !1 && Qr)
                if (Vt.length < 512)
                  if (this[ae]) this.brotli = !0;
                  else return ((this[Z] = Vt), Dt?.(), !0);
                else
                  try {
                    (new s.Header(Vt.subarray(0, 512)), (this.brotli = !1));
                  } catch {
                    this.brotli = !0;
                  }
              if (this[le] === void 0 || (this[le] === !1 && (this.brotli || wt))) {
                let Li = this[ae];
                ((this[ae] = !1),
                  (this[le] =
                    this[le] === void 0
                      ? new r.Unzip({})
                      : wt
                        ? new r.ZstdDecompress({})
                        : new r.BrotliDecompress({})),
                  this[le].on("data", (Mt) => {
                    this[Et](Mt) && this[Be](Mt);
                  }),
                  this[le].on("error", (Mt) => {
                    this[ot] || this.abort(Mt);
                  }),
                  this[le].on("end", () => {
                    ((this[ae] = !0), this[Be]());
                  }),
                  (this[ye] = !0),
                  (this[ut] += Vt.length));
                let sr = !!this[le][Li ? "end" : "write"](Vt);
                return ((this[ye] = !1), Dt?.(), sr);
              }
            }
            ((this[ye] = !0),
              this[le] ? ((this[ut] += Vt.length), this[le].write(Vt)) : this[Be](Vt),
              (this[ye] = !1));
            let St = this[se].length > 0 ? !1 : this[S] ? this[S].flowing : !0;
            return (
              !St && this[se].length === 0 && this[S]?.once("drain", () => this.emit("drain")),
              Dt?.(),
              St
            );
          }
          [we](Vt) {
            Vt && !this[ot] && (this[Z] = this[Z] ? Buffer.concat([this[Z], Vt]) : Vt);
          }
          [Pe]() {
            if (this[ae] && !this[z] && !this[ot] && !this[_e]) {
              this[z] = !0;
              let Vt = this[D];
              if (Vt?.blockRemain) {
                let Br = this[Z] ? this[Z].length : 0;
                (this.warn(
                  "TAR_BAD_ARCHIVE",
                  `Truncated input (needed ${Vt.blockRemain} more bytes, only ${Br} available)`,
                  { entry: Vt },
                ),
                  this[Z] && Vt.write(this[Z]),
                  Vt.end());
              }
              this[Ae](Ee);
            }
          }
          [Be](Vt) {
            if (this[_e] && Vt) this[we](Vt);
            else if (!Vt && !this[Z]) this[Pe]();
            else if (Vt) {
              if (((this[_e] = !0), this[Z])) {
                this[we](Vt);
                let Br = this[Z];
                ((this[Z] = void 0), this[Te](Br));
              } else this[Te](Vt);
              for (; this[Z] && this[Z]?.length >= 512 && !this[ot] && !this[it];) {
                let Br = this[Z];
                ((this[Z] = void 0), this[Te](Br));
              }
              this[_e] = !1;
            }
            (!this[Z] || this[ae]) && this[Pe]();
          }
          [Te](Vt) {
            let Br = 0,
              Dt = Vt.length;
            for (; Br + 512 <= Dt && !this[ot] && !this[it];)
              switch (this[I]) {
                case "begin":
                case "header":
                  (this[Se](Vt, Br), (Br += 512));
                  break;
                case "ignore":
                case "body":
                  Br += this[Lt](Vt, Br);
                  break;
                case "meta":
                  Br += this[Ht](Vt, Br);
                  break;
                default:
                  throw Error("invalid state: " + this[I]);
              }
            Br < Dt && (this[Z] = this[Z] ? Buffer.concat([Vt.subarray(Br), this[Z]]) : Vt.subarray(Br));
          }
          end(Vt, Br, Dt) {
            return (
              typeof Vt == "function" && ((Dt = Vt), (Br = void 0), (Vt = void 0)),
              typeof Br == "function" && ((Dt = Br), (Br = void 0)),
              typeof Vt == "string" && (Vt = Buffer.from(Vt, Br)),
              Dt && this.once("finish", Dt),
              this[ot] ||
                (this[le]
                  ? (Vt && ((this[ut] += Vt.length), this[le].write(Vt)), this[le].end())
                  : ((this[ae] = !0),
                    (this.brotli === void 0 || this.zstd === void 0) && (Vt = Vt || Buffer.alloc(0)),
                    Vt && this.write(Vt),
                    this[Pe]())),
              this
            );
          }
        };
      e.Parser = Rr;
    }),
    Ilr = e_((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.stripTrailingSlashes = void 0));
      var t = (r) => {
        let s = r.length - 1,
          a = -1;
        for (; s > -1 && r.charAt(s) === "/";) ((a = s), s--);
        return a === -1 ? r : r.slice(0, a);
      };
      e.stripTrailingSlashes = t;
    }),
    H4e = e_((e) => {
      var t =
          (e && e.__createBinding) ||
          (Object.create
            ? function (C, O, B, V) {
                V === void 0 && (V = B);
                var q = Object.getOwnPropertyDescriptor(O, B);
                ((!q || ("get" in q ? !O.__esModule : q.writable || q.configurable)) &&
                  (q = {
                    enumerable: !0,
                    get: function () {
                      return O[B];
                    },
                  }),
                  Object.defineProperty(C, V, q));
              }
            : function (C, O, B, V) {
                (V === void 0 && (V = B), (C[V] = O[B]));
              }),
        r =
          (e && e.__setModuleDefault) ||
          (Object.create
            ? function (C, O) {
                Object.defineProperty(C, "default", { enumerable: !0, value: O });
              }
            : function (C, O) {
                C.default = O;
              }),
        s =
          (e && e.__importStar) ||
          (function () {
            var C = function (O) {
              return (
                (C =
                  Object.getOwnPropertyNames ||
                  function (B) {
                    var V = [];
                    for (var q in B) Object.prototype.hasOwnProperty.call(B, q) && (V[V.length] = q);
                    return V;
                  }),
                C(O)
              );
            };
            return function (O) {
              if (O && O.__esModule) return O;
              var B = {};
              if (O != null) for (var V = C(O), q = 0; q < V.length; q++) V[q] !== "default" && t(B, O, V[q]);
              return (r(B, O), B);
            };
          })(),
        a =
          (e && e.__importDefault) ||
          function (C) {
            return C && C.__esModule ? C : { default: C };
          };
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.list = e.filesFilter = void 0));
      var H = s(i4e()),
        u = a(cr("fs")),
        f = cr("path"),
        d = s4e(),
        _ = Elr(),
        L = Ilr(),
        I = (C) => {
          let O = C.onReadEntry;
          C.onReadEntry = O
            ? (B) => {
                (O(B), B.resume());
              }
            : (B) => B.resume();
        },
        D = (C, O) => {
          let B = new Map(O.map((se) => [(0, L.stripTrailingSlashes)(se), !0])),
            V = C.filter,
            q = 100,
            Z = (se, ae = "", z = 0) => {
              if (z >= q) return (B.set(se, !1), !1);
              let Ae = ae || (0, f.parse)(se).root || ".",
                le;
              if (se === Ae) le = !1;
              else {
                let Be = B.get(se);
                le = Be !== void 0 ? Be : Z((0, f.dirname)(se), Ae, z + 1);
              }
              return (B.set(se, le), le);
            };
          C.filter = V
            ? (se, ae) => V(se, ae) && Z((0, L.stripTrailingSlashes)(se))
            : (se) => Z((0, L.stripTrailingSlashes)(se));
        };
      e.filesFilter = D;
      var S = (C) => {
          let O = new _.Parser(C),
            B = C.file,
            V;
          try {
            V = u.default.openSync(B, "r");
            let q = u.default.fstatSync(V),
              Z = C.maxReadSize || 16777216;
            if (q.size < Z) {
              let se = Buffer.allocUnsafe(q.size),
                ae = u.default.readSync(V, se, 0, q.size, 0);
              O.end(ae === se.byteLength ? se : se.subarray(0, ae));
            } else {
              let se = 0,
                ae = Buffer.allocUnsafe(Z);
              for (; se < q.size;) {
                let z = u.default.readSync(V, ae, 0, Z, se);
                if (z === 0) break;
                ((se += z), O.write(ae.subarray(0, z)));
              }
              O.end();
            }
          } finally {
            if (typeof V == "number")
              try {
                u.default.closeSync(V);
              } catch {}
          }
        },
        T = (C, O) => {
          let B = new _.Parser(C),
            V = C.maxReadSize || 16777216,
            q = C.file;
          return new Promise((Z, se) => {
            (B.on("error", se),
              B.on("end", Z),
              u.default.stat(q, (ae, z) => {
                if (ae) se(ae);
                else {
                  let Ae = new H.ReadStream(q, { readSize: V, size: z.size });
                  (Ae.on("error", se), Ae.pipe(B));
                }
              }));
          });
        };
      e.list = (0, d.makeCommand)(
        S,
        T,
        (C) => new _.Parser(C),
        (C) => new _.Parser(C),
        (C, O) => {
          (O?.length && (0, e.filesFilter)(C, O), C.noResume || I(C));
        },
      );
    }),
    t2o = e_((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.modeFix = void 0));
      var t = (r, s, a) => (
        (r &= 4095),
        a && (r = (r | 384) & -19),
        s && (r & 256 && (r |= 64), r & 32 && (r |= 8), r & 4 && (r |= 1)),
        r
      );
      e.modeFix = t;
    }),
    dti = e_((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.stripAbsolutePath = void 0));
      var t = cr("path"),
        { isAbsolute: r, parse: s } = t.win32,
        a = (H) => {
          let u = "",
            f = s(H);
          for (; r(H) || f.root;) {
            let d = H.charAt(0) === "/" && H.slice(0, 4) !== "//?/" ? "/" : f.root;
            ((H = H.slice(d.length)), (u += d), (f = s(H)));
          }
          return [u, H];
        };
      e.stripAbsolutePath = a;
    }),
    mti = e_((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.decode = e.encode = void 0));
      var t = ["|", "<", ">", "?", ":"],
        r = t.map((f) => String.fromCodePoint(61440 + Number(f.codePointAt(0)))),
        s = new Map(t.map((f, d) => [f, r[d]])),
        a = new Map(r.map((f, d) => [f, t[d]])),
        H = (f) => t.reduce((d, _) => d.split(_).join(s.get(_)), f);
      e.encode = H;
      var u = (f) => r.reduce((d, _) => d.split(_).join(a.get(_)), f);
      e.decode = u;
    }),
    _ti = e_((e) => {
      var t =
          (e && e.__createBinding) ||
          (Object.create
            ? function (et, ut, ht, Et) {
                Et === void 0 && (Et = ht);
                var tr = Object.getOwnPropertyDescriptor(ut, ht);
                ((!tr || ("get" in tr ? !ut.__esModule : tr.writable || tr.configurable)) &&
                  (tr = {
                    enumerable: !0,
                    get: function () {
                      return ut[ht];
                    },
                  }),
                  Object.defineProperty(et, Et, tr));
              }
            : function (et, ut, ht, Et) {
                (Et === void 0 && (Et = ht), (et[Et] = ut[ht]));
              }),
        r =
          (e && e.__setModuleDefault) ||
          (Object.create
            ? function (et, ut) {
                Object.defineProperty(et, "default", { enumerable: !0, value: ut });
              }
            : function (et, ut) {
                et.default = ut;
              }),
        s =
          (e && e.__importStar) ||
          (function () {
            var et = function (ut) {
              return (
                (et =
                  Object.getOwnPropertyNames ||
                  function (ht) {
                    var Et = [];
                    for (var tr in ht) Object.prototype.hasOwnProperty.call(ht, tr) && (Et[Et.length] = tr);
                    return Et;
                  }),
                et(ut)
              );
            };
            return function (ut) {
              if (ut && ut.__esModule) return ut;
              var ht = {};
              if (ut != null)
                for (var Et = et(ut), tr = 0; tr < Et.length; tr++) Et[tr] !== "default" && t(ht, ut, Et[tr]);
              return (r(ht, ut), ht);
            };
          })(),
        a =
          (e && e.__importDefault) ||
          function (et) {
            return et && et.__esModule ? et : { default: et };
          };
      (Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.WriteEntryTar = e.WriteEntrySync = e.WriteEntry = void 0));
      var H = a(cr("fs")),
        u = n4e(),
        f = a(cr("path")),
        d = o4e(),
        _ = t2o(),
        L = a4e(),
        I = Llr(),
        D = $lr(),
        S = dti(),
        T = Ilr(),
        C = glr(),
        O = s(mti()),
        B = (et, ut) =>
          ut
            ? ((et = (0, L.normalizeWindowsPath)(et).replace(/^\.(\/|$)/, "")),
              (0, T.stripTrailingSlashes)(ut) + "/" + et)
            : (0, L.normalizeWindowsPath)(et),
        V = 16777216,
        q = Symbol("process"),
        Z = Symbol("file"),
        se = Symbol("directory"),
        ae = Symbol("symlink"),
        z = Symbol("hardlink"),
        Ae = Symbol("header"),
        le = Symbol("read"),
        Be = Symbol("lstat"),
        Te = Symbol("onlstat"),
        Lt = Symbol("onread"),
        Ht = Symbol("onreadlink"),
        Se = Symbol("openfile"),
        _e = Symbol("onopenfile"),
        we = Symbol("close"),
        Pe = Symbol("mode"),
        ye = Symbol("awaitDrain"),
        ot = Symbol("ondrain"),
        Ee = Symbol("prefix"),
        Ve = class extends u.Minipass {
          path;
          portable;
          myuid = (process.getuid && process.getuid()) || 0;
          myuser = process.env.USER || "";
          maxReadSize;
          linkCache;
          statCache;
          preservePaths;
          cwd;
          strict;
          mtime;
          noPax;
          noMtime;
          prefix;
          fd;
          blockLen = 0;
          blockRemain = 0;
          buf;
          pos = 0;
          remain = 0;
          length = 0;
          offset = 0;
          win32;
          absolute;
          header;
          type;
          linkpath;
          stat;
          onWriteEntry;
          #e = !1;
          constructor(et, ut = {}) {
            let ht = (0, I.dealias)(ut);
            (super(),
              (this.path = (0, L.normalizeWindowsPath)(et)),
              (this.portable = !!ht.portable),
              (this.maxReadSize = ht.maxReadSize || V),
              (this.linkCache = ht.linkCache || new Map()),
              (this.statCache = ht.statCache || new Map()),
              (this.preservePaths = !!ht.preservePaths),
              (this.cwd = (0, L.normalizeWindowsPath)(ht.cwd || process.cwd())),
              (this.strict = !!ht.strict),
              (this.noPax = !!ht.noPax),
              (this.noMtime = !!ht.noMtime),
              (this.mtime = ht.mtime),
              (this.prefix = ht.prefix ? (0, L.normalizeWindowsPath)(ht.prefix) : void 0),
              (this.onWriteEntry = ht.onWriteEntry),
              typeof ht.onwarn == "function" && this.on("warn", ht.onwarn));
            let Et = !1;
            if (!this.preservePaths) {
              let [Rr, Vt] = (0, S.stripAbsolutePath)(this.path);
              Rr && typeof Vt == "string" && ((this.path = Vt), (Et = Rr));
            }
            ((this.win32 = !!ht.win32 || !0),
              this.win32 &&
                ((this.path = O.decode(this.path.replaceAll(/\\/g, "/"))), (et = et.replaceAll(/\\/g, "/"))),
              (this.absolute = (0, L.normalizeWindowsPath)(ht.absolute || f.default.resolve(this.cwd, et))),
              this.path === "" && (this.path = "./"),
              Et &&
                this.warn("TAR_ENTRY_INFO", `stripping ${Et} from absolute path`, {
                  entry: this,
                  path: Et + this.path,
                }));
            let tr = this.statCache.get(this.absolute);
            tr ? this[Te](tr) : this[Be]();
          }
          warn(et, ut, ht = {}) {
            return (0, C.warnMethod)(this, et, ut, ht);
          }
          emit(et, ...ut) {
            return (et === "error" && (this.#e = !0), super.emit(et, ...ut));
          }
          [Be]() {
            H.default.lstat(this.absolute, (et, ut) => {
              if (et) return this.emit("error", et);
              this[Te](ut);
            });
          }
          [Te](et) {
            (this.statCache.set(this.absolute, et),
              (this.stat = et),
              et.isFile() || (et.size = 0),
              (this.type = At(et)),
              this.emit("stat", et),
              this[q]());
          }
          [q]() {
            switch (this.type) {
              case "File":
                return this[Z]();
              case "Directory":
                return this[se]();
              case "SymbolicLink":
                return this[ae]();
              default:
                return this.end();
            }
          }
          [Pe](et) {
            return (0, _.modeFix)(et, this.type === "Directory", this.portable);
          }
          [Ee](et) {
            return B(et, this.prefix);
          }
          [Ae]() {
            if (!this.stat) throw Error("cannot write header before stat");
            (this.type === "Directory" && this.portable && (this.noMtime = !0),
              this.onWriteEntry?.(this),
              (this.header = new d.Header({
                path: this[Ee](this.path),
                linkpath:
                  this.type === "Link" && this.linkpath !== void 0 ? this[Ee](this.linkpath) : this.linkpath,
                mode: this[Pe](this.stat.mode),
                uid: this.portable ? void 0 : this.stat.uid,
                gid: this.portable ? void 0 : this.stat.gid,
                size: this.stat.size,
                mtime: this.noMtime ? void 0 : this.mtime || this.stat.mtime,
                type: this.type === "Unsupported" ? void 0 : this.type,
                uname: this.portable ? void 0 : this.stat.uid === this.myuid ? this.myuser : "",
                atime: this.portable ? void 0 : this.stat.atime,
                ctime: this.portable ? void 0 : this.stat.ctime,
              })),
              this.header.encode() &&
                !this.noPax &&
                super.write(
                  new D.Pax({
                    atime: this.portable ? void 0 : this.header.atime,
                    ctime: this.portable ? void 0 : this.header.ctime,
                    gid: this.portable ? void 0 : this.header.gid,
                    mtime: this.noMtime ? void 0 : this.mtime || this.header.mtime,
                    path: this[Ee](this.path),
                    linkpath:
                      this.type === "Link" && this.linkpath !== void 0
                        ? this[Ee](this.linkpath)
                        : this.linkpath,
                    size: this.header.size,
                    uid: this.portable ? void 0 : this.header.uid,
                    uname: this.portable ? void 0 : this.header.uname,
                    dev: this.portable ? void 0 : this.stat.dev,
                    ino: this.portable ? void 0 : this.stat.ino,
                    nlink: this.portable ? void 0 : this.stat.nlink,
                  }).encode(),
                ));
            let et = this.header?.block;
            if (!et) throw Error("failed to encode header");
            super.write(et);
          }
          [se]() {
            if (!this.stat) throw Error("cannot create directory entry without stat");
            (this.path.slice(-1) !== "/" && (this.path += "/"), (this.stat.size = 0), this[Ae](), this.end());
          }
          [ae]() {
            H.default.readlink(this.absolute, (et, ut) => {
              if (et) return this.emit("error", et);
              this[Ht](ut);
            });
          }
          [Ht](et) {
            ((this.linkpath = (0, L.normalizeWindowsPath)(et)), this[Ae](), this.end());
          }
          [z](et) {
            if (!this.stat) throw Error("cannot create link entry without stat");
            ((this.type = "Link"),
              (this.linkpath = (0, L.normalizeWindowsPath)(f.default.relative(this.cwd, et))),
              (this.stat.size = 0),
              this[Ae](),
              this.end());
          }
          [Z]() {
            if (!this.stat) throw Error("cannot create file entry without stat");
            if (this.stat.nlink > 1) {
              let et = `${this.stat.dev}:${this.stat.ino}`,
                ut = this.linkCache.get(et);
              if (ut?.indexOf(this.cwd) === 0) return this[z](ut);
              this.linkCache.set(et, this.absolute);
            }
            if ((this[Ae](), this.stat.size === 0)) return this.end();
            this[Se]();
          }
          [Se]() {
            H.default.open(this.absolute, "r", (et, ut) => {
              if (et) return this.emit("error", et);
              this[_e](ut);
            });
          }
          [_e](et) {
            if (((this.fd = et), this.#e)) return this[we]();
            if (!this.stat) throw Error("should stat before calling onopenfile");
            ((this.blockLen = 512 * Math.ceil(this.stat.size / 512)), (this.blockRemain = this.blockLen));
            let ut = Math.min(this.blockLen, this.maxReadSize);
            ((this.buf = Buffer.allocUnsafe(ut)),
              (this.offset = 0),
              (this.pos = 0),
              (this.remain = this.stat.size),
              (this.length = this.buf.length),
              this[le]());
          }
          [le]() {
            let { fd: et, buf: ut, offset: ht, length: Et, pos: tr } = this;
            if (et === void 0 || ut === void 0) throw Error("cannot read file without first opening");
            H.default.read(et, ut, ht, Et, tr, (Rr, Vt) => {
              if (Rr) return this[we](() => this.emit("error", Rr));
              this[Lt](Vt);
            });
          }
          [we](et = () => {}) {
            this.fd !== void 0 && H.default.close(this.fd, et);
          }
          [Lt](et) {
            if (et <= 0 && this.remain > 0) {
              let ht = Object.assign(Error("encountered unexpected EOF"), {
                path: this.absolute,
                syscall: "read",
                code: "EOF",
              });
              return this[we](() => this.emit("error", ht));
            }
            if (et > this.remain) {
              let ht = Object.assign(Error("did not encounter expected EOF"), {
                path: this.absolute,
                syscall: "read",
                code: "EOF",
              });
              return this[we](() => this.emit("error", ht));
            }
            if (!this.buf) throw Error("should have created buffer prior to reading");
            if (et === this.remain)
              for (let ht = et; ht < this.length && et < this.blockRemain; ht++)
                ((this.buf[ht + this.offset] = 0), et++, this.remain++);
            let ut =
              this.offset === 0 && et === this.buf.length
                ? this.buf
                : this.buf.subarray(this.offset, this.offset + et);
            this.write(ut) ? this[ot]() : this[ye](() => this[ot]());
          }
          [ye](et) {
            this.once("drain", et);
          }
          write(et, ut, ht) {
            if (
              (typeof ut == "function" && ((ht = ut), (ut = void 0)),
              typeof et == "string" && (et = Buffer.from(et, typeof ut == "string" ? ut : "utf8")),
              this.blockRemain < et.length)
            ) {
              let Et = Object.assign(Error("writing more data than expected"), { path: this.absolute });
              return this.emit("error", Et);
            }
            return (
              (this.remain -= et.length),
              (this.blockRemain -= et.length),
              (this.pos += et.length),
              (this.offset += et.length),
              super.write(et, null, ht)
            );
          }
          [ot]() {
            if (!this.remain)
              return (
                this.blockRemain && super.write(Buffer.alloc(this.blockRemain)),
                this[we]((et) => (et ? this.emit("error", et) : this.end()))
              );
            if (!this.buf) throw Error("buffer lost somehow in ONDRAIN");
            (this.offset >= this.length &&
              ((this.buf = Buffer.allocUnsafe(Math.min(this.blockRemain, this.buf.length))),
              (this.offset = 0)),
              (this.length = this.buf.length - this.offset),
              this[le]());
          }
        };
      e.WriteEntry = Ve;
      var Fe = class extends Ve {
        sync = !0;
        [Be]() {
          this[Te](H.default.lstatSync(this.absolute));
        }
        [ae]() {
          this[Ht](H.default.readlinkSync(this.absolute));
        }
        [Se]() {
          this[_e](H.default.openSync(this.absolute, "r"));
        }
        [le]() {
          let et = !0;
          try {
            let { fd: ut, buf: ht, offset: Et, length: tr, pos: Rr } = this;
            if (ut === void 0 || ht === void 0) throw Error("fd and buf must be set in READ method");
            let Vt = H.default.readSync(ut, ht, Et, tr, Rr);
            (this[Lt](Vt), (et = !1));
          } finally {
            if (et)
              try {
                this[we](() => {});
              } catch {}
          }
        }
        [ye](et) {
          et();
        }
        [we](et = () => {}) {
          (this.fd !== void 0 && H.default.closeSync(this.fd), et());
        }
      };
      e.WriteEntrySync = Fe;
      var it = class extends u.Minipass {
        blockLen = 0;
        blockRemain = 0;
        buf = 0;
        pos = 0;
        remain = 0;
        length = 0;
        preservePaths;
        portable;
        strict;
        noPax;
        noMtime;
        readEntry;
        type;
        prefix;
        path;
        mode;
        uid;
        gid;
        uname;
        gname;
        header;
        mtime;
        atime;
        ctime;
        linkpath;
        size;
        onWriteEntry;
        warn(et, ut, ht = {}) {
          return (0, C.warnMethod)(this, et, ut, ht);
        }
        constructor(et, ut = {}) {
          let ht = (0, I.dealias)(ut);
          (super(),
            (this.preservePaths = !!ht.preservePaths),
            (this.portable = !!ht.portable),
            (this.strict = !!ht.strict),
            (this.noPax = !!ht.noPax),
            (this.noMtime = !!ht.noMtime),
            (this.onWriteEntry = ht.onWriteEntry),
            (this.readEntry = et));
          let { type: Et } = et;
          if (Et === "Unsupported") throw Error("writing entry that should be ignored");
          ((this.type = Et),
            this.type === "Directory" && this.portable && (this.noMtime = !0),
            (this.prefix = ht.prefix),
            (this.path = (0, L.normalizeWindowsPath)(et.path)),
            (this.mode = et.mode !== void 0 ? this[Pe](et.mode) : void 0),
            (this.uid = this.portable ? void 0 : et.uid),
            (this.gid = this.portable ? void 0 : et.gid),
            (this.uname = this.portable ? void 0 : et.uname),
            (this.gname = this.portable ? void 0 : et.gname),
            (this.size = et.size),
            (this.mtime = this.noMtime ? void 0 : ht.mtime || et.mtime),
            (this.atime = this.portable ? void 0 : et.atime),
            (this.ctime = this.portable ? void 0 : et.ctime),
            (this.linkpath = et.linkpath !== void 0 ? (0, L.normalizeWindowsPath)(et.linkpath) : void 0),
            typeof ht.onwarn == "function" && this.on("warn", ht.onwarn));
          let tr = !1;
          if (!this.preservePaths) {
            let [Vt, Br] = (0, S.stripAbsolutePath)(this.path);
            Vt && typeof Br == "string" && ((this.path = Br), (tr = Vt));
          }
          ((this.remain = et.size),
            (this.blockRemain = et.startBlockSize),
            this.onWriteEntry?.(this),
            (this.header = new d.Header({
              path: this[Ee](this.path),
              linkpath:
                this.type === "Link" && this.linkpath !== void 0 ? this[Ee](this.linkpath) : this.linkpath,
              mode: this.mode,
              uid: this.portable ? void 0 : this.uid,
              gid: this.portable ? void 0 : this.gid,
              size: this.size,
              mtime: this.noMtime ? void 0 : this.mtime,
              type: this.type,
              uname: this.portable ? void 0 : this.uname,
              atime: this.portable ? void 0 : this.atime,
              ctime: this.portable ? void 0 : this.ctime,
            })),
            tr &&
              this.warn("TAR_ENTRY_INFO", `stripping ${tr} from absolute path`, {
                entry: this,
                path: tr + this.path,
              }),
            this.header.encode() &&
              !this.noPax &&
              super.write(
                new D.Pax({
                  atime: this.portable ? void 0 : this.atime,
                  ctime: this.portable ? void 0 : this.ctime,
                  gid: this.portable ? void 0 : this.gid,
                  mtime: this.noMtime ? void 0 : this.mtime,
                  path: this[Ee](this.path),
                  linkpath:
                    this.type === "Link" && this.linkpath !== void 0
                      ? this[Ee](this.linkpath)
                      : this.linkpath,
                  size: this.size,
                  uid: this.portable ? void 0 : this.uid,
                  uname: this.portable ? void 0 : this.uname,
                  dev: this.portable ? void 0 : this.readEntry.dev,
                  ino: this.portable ? void 0 : this.readEntry.ino,
                  nlink: this.portable ? void 0 : this.readEntry.nlink,
                }).encode(),
              ));
          let Rr = this.header?.block;
          if (!Rr) throw Error("failed to encode header");
          (super.write(Rr), et.pipe(this));
        }
        [Ee](et) {
          return B(et, this.prefix);
        }
        [Pe](et) {
          return (0, _.modeFix)(et, this.type === "Directory", this.portable);
        }
        write(et, ut, ht) {
          (typeof ut == "function" && ((ht = ut), (ut = void 0)),
            typeof et == "string" && (et = Buffer.from(et, typeof ut == "string" ? ut : "utf8")));
          let Et = et.length;
          if (Et > this.blockRemain) throw Error("writing more to entry than is appropriate");
          return ((this.blockRemain -= Et), super.write(et, ht));
        }
        end(et, ut, ht) {
          return (
            this.blockRemain && super.write(Buffer.alloc(this.blockRemain)),
            typeof et == "function" && ((ht = et), (ut = void 0), (et = void 0)),
            typeof ut == "function" && ((ht = ut), (ut = void 0)),
            typeof et == "string" && (et = Buffer.from(et, ut ?? "utf8")),
            ht && this.once("finish", ht),
            et ? super.end(et, ht) : super.end(ht),
            this
          );
        }
      };
      e.WriteEntryTar = it;
      var At = (et) =>
        et.isFile()
          ? "File"
          : et.isDirectory()
            ? "Directory"
            : et.isSymbolicLink()
              ? "SymbolicLink"
              : "Unsupported";
    }),
    r2o = e_((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.Node = e.Yallist = void 0));
      var t = class u {
        tail;
        head;
        length = 0;
        static create(f = []) {
          return new u(f);
        }
        constructor(f = []) {
          for (let d of f) this.push(d);
        }
        *[Symbol.iterator]() {
          for (let f = this.head; f; f = f.next) yield f.value;
        }
        removeNode(f) {
          if (f.list !== this) throw Error("removing node which does not belong to this list");
          let { next: d, prev: _ } = f;
          return (
            d && (d.prev = _),
            _ && (_.next = d),
            f === this.head && (this.head = d),
            f === this.tail && (this.tail = _),
            this.length--,
            (f.next = void 0),
            (f.prev = void 0),
            (f.list = void 0),
            d
          );
        }
        unshiftNode(f) {
          if (f === this.head) return;
          f.list && f.list.removeNode(f);
          let d = this.head;
          ((f.list = this),
            (f.next = d),
            d && (d.prev = f),
            (this.head = f),
            this.tail || (this.tail = f),
            this.length++);
        }
        pushNode(f) {
          if (f === this.tail) return;
          f.list && f.list.removeNode(f);
          let d = this.tail;
          ((f.list = this),
            (f.prev = d),
            d && (d.next = f),
            (this.tail = f),
            this.head || (this.head = f),
            this.length++);
        }
        push(...f) {
          for (let d = 0, _ = f.length; d < _; d++) s(this, f[d]);
          return this.length;
        }
        unshift(...f) {
          for (var d = 0, _ = f.length; d < _; d++) a(this, f[d]);
          return this.length;
        }
        pop() {
          if (!this.tail) return;
          let f = this.tail.value,
            d = this.tail;
          return (
            (this.tail = this.tail.prev),
            this.tail ? (this.tail.next = void 0) : (this.head = void 0),
            (d.list = void 0),
            this.length--,
            f
          );
        }
        shift() {
          if (!this.head) return;
          let f = this.head.value,
            d = this.head;
          return (
            (this.head = this.head.next),
            this.head ? (this.head.prev = void 0) : (this.tail = void 0),
            (d.list = void 0),
            this.length--,
            f
          );
        }
        forEach(f, d) {
          d = d || this;
          for (let _ = this.head, L = 0; _; L++) (f.call(d, _.value, L, this), (_ = _.next));
        }
        forEachReverse(f, d) {
          d = d || this;
          for (let _ = this.tail, L = this.length - 1; _; L--) (f.call(d, _.value, L, this), (_ = _.prev));
        }
        get(f) {
          let d = 0,
            _ = this.head;
          for (; _ && d < f; d++) _ = _.next;
          if (d === f && _) return _.value;
        }
        getReverse(f) {
          let d = 0,
            _ = this.tail;
          for (; _ && d < f; d++) _ = _.prev;
          if (d === f && _) return _.value;
        }
        map(f, d) {
          d = d || this;
          let _ = new u();
          for (let L = this.head; L;) (_.push(f.call(d, L.value, this)), (L = L.next));
          return _;
        }
        mapReverse(f, d) {
          d = d || this;
          var _ = new u();
          for (let L = this.tail; L;) (_.push(f.call(d, L.value, this)), (L = L.prev));
          return _;
        }
        reduce(f, d) {
          let _,
            L = this.head;
          if (arguments.length > 1) _ = d;
          else if (this.head) ((L = this.head.next), (_ = this.head.value));
          else throw TypeError("Reduce of empty list with no initial value");
          for (var I = 0; L; I++) ((_ = f(_, L.value, I)), (L = L.next));
          return _;
        }
        reduceReverse(f, d) {
          let _,
            L = this.tail;
          if (arguments.length > 1) _ = d;
          else if (this.tail) ((L = this.tail.prev), (_ = this.tail.value));
          else throw TypeError("Reduce of empty list with no initial value");
          for (let I = this.length - 1; L; I--) ((_ = f(_, L.value, I)), (L = L.prev));
          return _;
        }
        toArray() {
          let f = Array(this.length);
          for (let d = 0, _ = this.head; _; d++) ((f[d] = _.value), (_ = _.next));
          return f;
        }
        toArrayReverse() {
          let f = Array(this.length);
          for (let d = 0, _ = this.tail; _; d++) ((f[d] = _.value), (_ = _.prev));
          return f;
        }
        slice(f = 0, d = this.length) {
          (d < 0 && (d += this.length), f < 0 && (f += this.length));
          let _ = new u();
          if (d < f || d < 0) return _;
          (f < 0 && (f = 0), d > this.length && (d = this.length));
          let L = this.head,
            I = 0;
          for (I = 0; L && I < f; I++) L = L.next;
          for (; L && I < d; I++, L = L.next) _.push(L.value);
          return _;
        }
        sliceReverse(f = 0, d = this.length) {
          (d < 0 && (d += this.length), f < 0 && (f += this.length));
          let _ = new u();
          if (d < f || d < 0) return _;
          (f < 0 && (f = 0), d > this.length && (d = this.length));
          let L = this.length,
            I = this.tail;
          for (; I && L > d; L--) I = I.prev;
          for (; I && L > f; L--, I = I.prev) _.push(I.value);
          return _;
        }
        splice(f, d = 0, ..._) {
          (f > this.length && (f = this.length - 1), f < 0 && (f = this.length + f));
          let L = this.head;
          for (let D = 0; L && D < f; D++) L = L.next;
          let I = [];
          for (let D = 0; L && D < d; D++) (I.push(L.value), (L = this.removeNode(L)));
          L ? L !== this.tail && (L = L.prev) : (L = this.tail);
          for (let D of _) L = r(this, L, D);
          return I;
        }
        reverse() {
          let f = this.head,
            d = this.tail;
          for (let _ = f; _; _ = _.prev) {
            let L = _.prev;
            ((_.prev = _.next), (_.next = L));
          }
          return ((this.head = d), (this.tail = f), this);
        }
      };
      e.Yallist = t;
      function r(u, f, d) {
        let _ = f,
          L = f ? f.next : u.head,
          I = new H(d, _, L, u);
        return (I.next === void 0 && (u.tail = I), I.prev === void 0 && (u.head = I), u.length++, I);
      }
      function s(u, f) {
        ((u.tail = new H(f, u.tail, void 0, u)), u.head || (u.head = u.tail), u.length++);
      }
      function a(u, f) {
        ((u.head = new H(f, void 0, u.head, u)), u.tail || (u.tail = u.head), u.length++);
      }
      var H = class {
        list;
        next;
        prev;
        value;
        constructor(u, f, d, _) {
          ((this.list = _),
            (this.value = u),
            f ? ((f.next = this), (this.prev = f)) : (this.prev = void 0),
            d ? ((d.prev = this), (this.next = d)) : (this.next = void 0));
        }
      };
      e.Node = H;
    }),
    Dlr = e_((e) => {
      var t =
          (e && e.__createBinding) ||
          (Object.create
            ? function (Fe, it, At, et) {
                et === void 0 && (et = At);
                var ut = Object.getOwnPropertyDescriptor(it, At);
                ((!ut || ("get" in ut ? !it.__esModule : ut.writable || ut.configurable)) &&
                  (ut = {
                    enumerable: !0,
                    get: function () {
                      return it[At];
                    },
                  }),
                  Object.defineProperty(Fe, et, ut));
              }
            : function (Fe, it, At, et) {
                (et === void 0 && (et = At), (Fe[et] = it[At]));
              }),
        r =
          (e && e.__setModuleDefault) ||
          (Object.create
            ? function (Fe, it) {
                Object.defineProperty(Fe, "default", { enumerable: !0, value: it });
              }
            : function (Fe, it) {
                Fe.default = it;
              }),
        s =
          (e && e.__importStar) ||
          (function () {
            var Fe = function (it) {
              return (
                (Fe =
                  Object.getOwnPropertyNames ||
                  function (At) {
                    var et = [];
                    for (var ut in At) Object.prototype.hasOwnProperty.call(At, ut) && (et[et.length] = ut);
                    return et;
                  }),
                Fe(it)
              );
            };
            return function (it) {
              if (it && it.__esModule) return it;
              var At = {};
              if (it != null)
                for (var et = Fe(it), ut = 0; ut < et.length; ut++) et[ut] !== "default" && t(At, it, et[ut]);
              return (r(At, it), At);
            };
          })(),
        a =
          (e && e.__importDefault) ||
          function (Fe) {
            return Fe && Fe.__esModule ? Fe : { default: Fe };
          };
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.PackSync = e.Pack = e.PackJob = void 0));
      var H = a(cr("fs")),
        u = _ti(),
        f = class {
          path;
          absolute;
          entry;
          stat;
          readdir;
          pending = !1;
          pendingLink = !1;
          ignore = !1;
          piped = !1;
          constructor(Fe, it) {
            ((this.path = Fe || "./"), (this.absolute = it));
          }
        };
      e.PackJob = f;
      var d = n4e(),
        _ = s(lti()),
        L = r2o(),
        I = glr(),
        D = Buffer.alloc(1024),
        S = Symbol("onStat"),
        T = Symbol("ended"),
        C = Symbol("queue"),
        O = Symbol("pendingLinks"),
        B = Symbol("current"),
        V = Symbol("process"),
        q = Symbol("processing"),
        Z = Symbol("processJob"),
        se = Symbol("jobs"),
        ae = Symbol("jobDone"),
        z = Symbol("addFSEntry"),
        Ae = Symbol("addTarEntry"),
        le = Symbol("stat"),
        Be = Symbol("readdir"),
        Te = Symbol("onreaddir"),
        Lt = Symbol("pipe"),
        Ht = Symbol("entry"),
        Se = Symbol("entryOpt"),
        _e = Symbol("writeEntryClass"),
        we = Symbol("write"),
        Pe = Symbol("ondrain"),
        ye = a(cr("path")),
        ot = a4e(),
        Ee = class extends d.Minipass {
          sync = !1;
          opt;
          cwd;
          maxReadSize;
          preservePaths;
          strict;
          noPax;
          prefix;
          linkCache;
          statCache;
          file;
          portable;
          zip;
          readdirCache;
          noDirRecurse;
          follow;
          noMtime;
          mtime;
          filter;
          jobs;
          [_e];
          onWriteEntry;
          [C];
          [O] = new Map();
          [se] = 0;
          [q] = !1;
          [T] = !1;
          constructor(Fe = {}) {
            if (
              (super(),
              (this.opt = Fe),
              (this.file = Fe.file || ""),
              (this.cwd = Fe.cwd || process.cwd()),
              (this.maxReadSize = Fe.maxReadSize),
              (this.preservePaths = !!Fe.preservePaths),
              (this.strict = !!Fe.strict),
              (this.noPax = !!Fe.noPax),
              (this.prefix = (0, ot.normalizeWindowsPath)(Fe.prefix || "")),
              (this.linkCache = Fe.linkCache || new Map()),
              (this.statCache = Fe.statCache || new Map()),
              (this.readdirCache = Fe.readdirCache || new Map()),
              (this.onWriteEntry = Fe.onWriteEntry),
              (this[_e] = u.WriteEntry),
              typeof Fe.onwarn == "function" && this.on("warn", Fe.onwarn),
              (this.portable = !!Fe.portable),
              Fe.gzip || Fe.brotli || Fe.zstd)
            ) {
              if ((Fe.gzip ? 1 : 0) + (Fe.brotli ? 1 : 0) + (Fe.zstd ? 1 : 0) > 1)
                throw TypeError("gzip, brotli, zstd are mutually exclusive");
              if (
                (Fe.gzip &&
                  (typeof Fe.gzip != "object" && (Fe.gzip = {}),
                  this.portable && (Fe.gzip.portable = !0),
                  (this.zip = new _.Gzip(Fe.gzip))),
                Fe.brotli &&
                  (typeof Fe.brotli != "object" && (Fe.brotli = {}),
                  (this.zip = new _.BrotliCompress(Fe.brotli))),
                Fe.zstd &&
                  (typeof Fe.zstd != "object" && (Fe.zstd = {}), (this.zip = new _.ZstdCompress(Fe.zstd))),
                !this.zip)
              )
                throw Error("impossible");
              let it = this.zip;
              (it.on("data", (At) => super.write(At)),
                it.on("end", () => super.end()),
                it.on("drain", () => this[Pe]()),
                this.on("resume", () => it.resume()));
            } else this.on("drain", this[Pe]);
            ((this.noDirRecurse = !!Fe.noDirRecurse),
              (this.follow = !!Fe.follow),
              (this.noMtime = !!Fe.noMtime),
              Fe.mtime && (this.mtime = Fe.mtime),
              (this.filter = typeof Fe.filter == "function" ? Fe.filter : () => !0),
              (this[C] = new L.Yallist()),
              (this[se] = 0),
              (this.jobs = Number(Fe.jobs) || 4),
              (this[q] = !1),
              (this[T] = !1));
          }
          [we](Fe) {
            return super.write(Fe);
          }
          add(Fe) {
            return (this.write(Fe), this);
          }
          end(Fe, it, At) {
            return (
              typeof Fe == "function" && ((At = Fe), (Fe = void 0)),
              typeof it == "function" && ((At = it), (it = void 0)),
              Fe && this.add(Fe),
              (this[T] = !0),
              this[V](),
              At && At(),
              this
            );
          }
          write(Fe) {
            if (this[T]) throw Error("write after end");
            return (typeof Fe == "string" ? this[z](Fe) : this[Ae](Fe), this.flowing);
          }
          [Ae](Fe) {
            let it = (0, ot.normalizeWindowsPath)(ye.default.resolve(this.cwd, Fe.path));
            if (!this.filter(Fe.path, Fe)) Fe.resume();
            else {
              let At = new f(Fe.path, it);
              ((At.entry = new u.WriteEntryTar(Fe, this[Se](At))),
                At.entry.on("end", () => this[ae](At)),
                (this[se] += 1),
                this[C].push(At));
            }
            this[V]();
          }
          [z](Fe) {
            let it = (0, ot.normalizeWindowsPath)(ye.default.resolve(this.cwd, Fe));
            (this[C].push(new f(Fe, it)), this[V]());
          }
          [le](Fe) {
            ((Fe.pending = !0), (this[se] += 1));
            let it = this.follow ? "stat" : "lstat";
            H.default[it](Fe.absolute, (At, et) => {
              ((Fe.pending = !1), (this[se] -= 1), At ? this.emit("error", At) : this[S](Fe, et));
            });
          }
          [S](Fe, it) {
            if ((this.statCache.set(Fe.absolute, it), (Fe.stat = it), !this.filter(Fe.path, it)))
              Fe.ignore = !0;
            else if (it.isFile() && it.nlink > 1 && !this.linkCache.get(`${it.dev}:${it.ino}`) && !this.sync)
              if (Fe === this[B]) this[Z](Fe);
              else {
                let At = `${it.dev}:${it.ino}`,
                  et = this[O].get(At);
                (et ? et.push(Fe) : this[O].set(At, [Fe]), (Fe.pendingLink = !0), (Fe.pending = !0));
              }
            this[V]();
          }
          [Be](Fe) {
            ((Fe.pending = !0),
              (this[se] += 1),
              H.default.readdir(Fe.absolute, (it, At) => {
                if (((Fe.pending = !1), (this[se] -= 1), it)) return this.emit("error", it);
                this[Te](Fe, At);
              }));
          }
          [Te](Fe, it) {
            (this.readdirCache.set(Fe.absolute, it), (Fe.readdir = it), this[V]());
          }
          [V]() {
            if (!this[q]) {
              this[q] = !0;
              for (let Fe = this[C].head; Fe && this[se] < this.jobs; Fe = Fe.next)
                if ((this[Z](Fe.value), Fe.value.ignore)) {
                  let it = Fe.next;
                  (this[C].removeNode(Fe), (Fe.next = it));
                }
              ((this[q] = !1),
                this[T] &&
                  this[C].length === 0 &&
                  this[se] === 0 &&
                  (this.zip ? this.zip.end(D) : (super.write(D), super.end())));
            }
          }
          get [B]() {
            return this[C] && this[C].head && this[C].head.value;
          }
          [ae](Fe) {
            (this[C].shift(), (this[se] -= 1));
            let { stat: it } = Fe;
            if (it && it.isFile() && it.nlink > 1) {
              let At = `${it.dev}:${it.ino}`,
                et = this[O].get(At);
              if (et) {
                this[O].delete(At);
                for (let ut of et) ((ut.pending = !1), this[Z](ut));
              }
            }
            this[V]();
          }
          [Z](Fe) {
            if (
              (Fe.pending && Fe.pendingLink && Fe === this[B] && ((Fe.pending = !1), (Fe.pendingLink = !1)),
              !Fe.pending)
            ) {
              if (Fe.entry) {
                Fe === this[B] && !Fe.piped && this[Lt](Fe);
                return;
              }
              if (!Fe.stat) {
                let it = this.statCache.get(Fe.absolute);
                it ? this[S](Fe, it) : this[le](Fe);
              }
              if (Fe.stat && !Fe.ignore) {
                if (!this.noDirRecurse && Fe.stat.isDirectory() && !Fe.readdir) {
                  let it = this.readdirCache.get(Fe.absolute);
                  if ((it ? this[Te](Fe, it) : this[Be](Fe), !Fe.readdir)) return;
                }
                if (((Fe.entry = this[Ht](Fe)), !Fe.entry)) {
                  Fe.ignore = !0;
                  return;
                }
                Fe === this[B] && !Fe.piped && this[Lt](Fe);
              }
            }
          }
          [Se](Fe) {
            return {
              onwarn: (it, At, et) => this.warn(it, At, et),
              noPax: this.noPax,
              cwd: this.cwd,
              absolute: Fe.absolute,
              preservePaths: this.preservePaths,
              maxReadSize: this.maxReadSize,
              strict: this.strict,
              portable: this.portable,
              linkCache: this.linkCache,
              statCache: this.statCache,
              noMtime: this.noMtime,
              mtime: this.mtime,
              prefix: this.prefix,
              onWriteEntry: this.onWriteEntry,
            };
          }
          [Ht](Fe) {
            this[se] += 1;
            try {
              return new this[_e](Fe.path, this[Se](Fe))
                .on("end", () => this[ae](Fe))
                .on("error", (it) => this.emit("error", it));
            } catch (it) {
              this.emit("error", it);
            }
          }
          [Pe]() {
            this[B] && this[B].entry && this[B].entry.resume();
          }
          [Lt](Fe) {
            ((Fe.piped = !0),
              Fe.readdir &&
                Fe.readdir.forEach((et) => {
                  let ut = Fe.path,
                    ht = ut === "./" ? "" : ut.replace(/\/*$/, "/");
                  this[z](ht + et);
                }));
            let it = Fe.entry,
              At = this.zip;
            if (!it) throw Error("cannot pipe without source");
            At
              ? it.on("data", (et) => {
                  At.write(et) || it.pause();
                })
              : it.on("data", (et) => {
                  super.write(et) || it.pause();
                });
          }
          pause() {
            return (this.zip && this.zip.pause(), super.pause());
          }
          warn(Fe, it, At = {}) {
            (0, I.warnMethod)(this, Fe, it, At);
          }
        };
      e.Pack = Ee;
      var Ve = class extends Ee {
        sync = !0;
        constructor(Fe) {
          (super(Fe), (this[_e] = u.WriteEntrySync));
        }
        pause() {}
        resume() {}
        [le](Fe) {
          let it = this.follow ? "statSync" : "lstatSync";
          this[S](Fe, H.default[it](Fe.absolute));
        }
        [Be](Fe) {
          this[Te](Fe, H.default.readdirSync(Fe.absolute));
        }
        [Lt](Fe) {
          let it = Fe.entry,
            At = this.zip;
          if (
            (Fe.readdir &&
              Fe.readdir.forEach((et) => {
                let ut = Fe.path,
                  ht = ut === "./" ? "" : ut.replace(/\/*$/, "/");
                this[z](ht + et);
              }),
            !it)
          )
            throw Error("Cannot pipe without source");
          At
            ? it.on("data", (et) => {
                At.write(et);
              })
            : it.on("data", (et) => {
                super[we](et);
              });
        }
      };
      e.PackSync = Ve;
    }),
    hti = e_((e) => {
      var t =
        (e && e.__importDefault) ||
        function (S) {
          return S && S.__esModule ? S : { default: S };
        };
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.create = void 0));
      var r = i4e(),
        s = t(cr("path")),
        a = H4e(),
        H = s4e(),
        u = Dlr(),
        f = (S, T) => {
          let C = new u.PackSync(S),
            O = new r.WriteStreamSync(S.file, { mode: S.mode || 438 });
          (C.pipe(O), _(C, T));
        },
        d = (S, T) => {
          let C = new u.Pack(S),
            O = new r.WriteStream(S.file, { mode: S.mode || 438 });
          C.pipe(O);
          let B = new Promise((V, q) => {
            (O.on("error", q), O.on("close", V), C.on("error", q));
          });
          return (L(C, T).catch((V) => C.emit("error", V)), B);
        },
        _ = (S, T) => {
          (T.forEach((C) => {
            C.charAt(0) === "@"
              ? (0, a.list)({
                  file: s.default.resolve(S.cwd, C.slice(1)),
                  sync: !0,
                  noResume: !0,
                  onReadEntry: (O) => S.add(O),
                })
              : S.add(C);
          }),
            S.end());
        },
        L = async (S, T) => {
          for (let C of T)
            C.charAt(0) === "@"
              ? await (0, a.list)({
                  file: s.default.resolve(String(S.cwd), C.slice(1)),
                  noResume: !0,
                  onReadEntry: (O) => {
                    S.add(O);
                  },
                })
              : S.add(C);
          S.end();
        },
        I = (S, T) => {
          let C = new u.PackSync(S);
          return (_(C, T), C);
        },
        D = (S, T) => {
          let C = new u.Pack(S);
          return (L(C, T).catch((O) => C.emit("error", O)), C);
        };
      e.create = (0, H.makeCommand)(f, d, I, D, (S, T) => {
        if (!T?.length) throw TypeError("no paths specified to add to archive");
      });
    }),
    n2o = e_((e) => {
      var t =
        (e && e.__importDefault) ||
        function (T) {
          return T && T.__esModule ? T : { default: T };
        };
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.getWriteFlag = void 0));
      var r = t(cr("fs")),
        s = process.env.__FAKE_PLATFORM__ || "win32",
        a = s === "win32",
        { O_CREAT: H, O_NOFOLLOW: u, O_TRUNC: f, O_WRONLY: d } = r.default.constants,
        _ = Number(process.env.__FAKE_FS_O_FILENAME__) || r.default.constants.UV_FS_O_FILEMAP || 0,
        L = a && !!_,
        I = 524288,
        D = _ | f | H | d,
        S = !a && typeof u == "number" ? u | f | H | d : null;
      e.getWriteFlag = S !== null ? () => S : L ? (T) => (T < I ? D : "w") : () => "w";
    }),
    i2o = e_((e) => {
      var t =
        (e && e.__importDefault) ||
        function (L) {
          return L && L.__esModule ? L : { default: L };
        };
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.chownrSync = e.chownr = void 0));
      var r = t(cr("fs")),
        s = t(cr("path")),
        a = (L, I, D) => {
          try {
            return r.default.lchownSync(L, I, D);
          } catch (S) {
            if (S?.code !== "ENOENT") throw S;
          }
        },
        H = (L, I, D, S) => {
          r.default.lchown(L, I, D, (T) => {
            S(T && T?.code !== "ENOENT" ? T : null);
          });
        },
        u = (L, I, D, S, T) => {
          if (I.isDirectory())
            (0, e.chownr)(s.default.resolve(L, I.name), D, S, (C) => {
              if (C) return T(C);
              let O = s.default.resolve(L, I.name);
              H(O, D, S, T);
            });
          else {
            let C = s.default.resolve(L, I.name);
            H(C, D, S, T);
          }
        },
        f = (L, I, D, S) => {
          r.default.readdir(L, { withFileTypes: !0 }, (T, C) => {
            if (T) {
              if (T.code === "ENOENT") return S();
              if (T.code !== "ENOTDIR" && T.code !== "ENOTSUP") return S(T);
            }
            if (T || !C.length) return H(L, I, D, S);
            let O = C.length,
              B = null,
              V = (q) => {
                if (!B) {
                  if (q) return S((B = q));
                  if (--O === 0) return H(L, I, D, S);
                }
              };
            for (let q of C) u(L, q, I, D, V);
          });
        };
      e.chownr = f;
      var d = (L, I, D, S) => {
          (I.isDirectory() && (0, e.chownrSync)(s.default.resolve(L, I.name), D, S),
            a(s.default.resolve(L, I.name), D, S));
        },
        _ = (L, I, D) => {
          let S;
          try {
            S = r.default.readdirSync(L, { withFileTypes: !0 });
          } catch (T) {
            let C = T;
            if (C?.code === "ENOENT") return;
            if (C?.code === "ENOTDIR" || C?.code === "ENOTSUP") return a(L, I, D);
            throw C;
          }
          for (let T of S) d(L, T, I, D);
          return a(L, I, D);
        };
      e.chownrSync = _;
    }),
    s2o = e_((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.CwdError = void 0));
      var t = class extends Error {
        path;
        code;
        syscall = "chdir";
        constructor(r, s) {
          (super(`${s}: Cannot cd into '${r}'`), (this.path = r), (this.code = s));
        }
        get name() {
          return "CwdError";
        }
      };
      e.CwdError = t;
    }),
    Lti = e_((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.SymlinkError = void 0));
      var t = class extends Error {
        path;
        symlink;
        syscall = "symlink";
        code = "TAR_SYMLINK_ERROR";
        constructor(r, s) {
          (super("TAR_SYMLINK_ERROR: Cannot extract through symbolic link"),
            (this.symlink = r),
            (this.path = s));
        }
        get name() {
          return "SymlinkError";
        }
      };
      e.SymlinkError = t;
    }),
    o2o = e_((e) => {
      var t =
        (e && e.__importDefault) ||
        function (C) {
          return C && C.__esModule ? C : { default: C };
        };
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.mkdirSync = e.mkdir = void 0));
      var r = i2o(),
        s = t(cr("fs")),
        a = t(cr("fs/promises")),
        H = t(cr("path")),
        u = s2o(),
        f = a4e(),
        d = Lti(),
        _ = (C, O) => {
          s.default.stat(C, (B, V) => {
            ((B || !V.isDirectory()) && (B = new u.CwdError(C, B?.code || "ENOTDIR")), O(B));
          });
        },
        L = (C, O, B) => {
          C = (0, f.normalizeWindowsPath)(C);
          let V = O.umask ?? 18,
            q = O.mode | 448,
            Z = (q & V) !== 0,
            { uid: se, gid: ae } = O,
            z =
              typeof se == "number" && typeof ae == "number" && (se !== O.processUid || ae !== O.processGid),
            { preserve: Ae, unlink: le } = O,
            Be = (0, f.normalizeWindowsPath)(O.cwd),
            Te = (Ht, Se) => {
              Ht
                ? B(Ht)
                : Se && z
                  ? (0, r.chownr)(Se, se, ae, (_e) => Te(_e))
                  : Z
                    ? s.default.chmod(C, q, B)
                    : B();
            };
          if (C === Be) return _(C, Te);
          if (Ae)
            return a.default.mkdir(C, { mode: q, recursive: !0 }).then((Ht) => Te(null, Ht ?? void 0), Te);
          let Lt = (0, f.normalizeWindowsPath)(H.default.relative(Be, C)).split("/");
          I(Be, Lt, q, le, Be, void 0, Te);
        };
      e.mkdir = L;
      var I = (C, O, B, V, q, Z, se) => {
          if (O.length === 0) return se(null, Z);
          let ae = O.shift(),
            z = (0, f.normalizeWindowsPath)(H.default.resolve(C + "/" + ae));
          s.default.mkdir(z, B, D(z, O, B, V, q, Z, se));
        },
        D = (C, O, B, V, q, Z, se) => (ae) => {
          ae
            ? s.default.lstat(C, (z, Ae) => {
                if (z) ((z.path = z.path && (0, f.normalizeWindowsPath)(z.path)), se(z));
                else if (Ae.isDirectory()) I(C, O, B, V, q, Z, se);
                else if (V)
                  s.default.unlink(C, (le) => {
                    if (le) return se(le);
                    s.default.mkdir(C, B, D(C, O, B, V, q, Z, se));
                  });
                else {
                  if (Ae.isSymbolicLink()) return se(new d.SymlinkError(C, C + "/" + O.join("/")));
                  se(ae);
                }
              })
            : ((Z = Z || C), I(C, O, B, V, q, Z, se));
        },
        S = (C) => {
          let O = !1,
            B;
          try {
            O = s.default.statSync(C).isDirectory();
          } catch (V) {
            B = V?.code;
          } finally {
            if (!O) throw new u.CwdError(C, B ?? "ENOTDIR");
          }
        },
        T = (C, O) => {
          C = (0, f.normalizeWindowsPath)(C);
          let B = O.umask ?? 18,
            V = O.mode | 448,
            q = (V & B) !== 0,
            { uid: Z, gid: se } = O,
            ae = typeof Z == "number" && typeof se == "number" && (Z !== O.processUid || se !== O.processGid),
            { preserve: z, unlink: Ae } = O,
            le = (0, f.normalizeWindowsPath)(O.cwd),
            Be = (Ht) => {
              (Ht && ae && (0, r.chownrSync)(Ht, Z, se), q && s.default.chmodSync(C, V));
            };
          if (C === le) return (S(le), Be());
          if (z) return Be(s.default.mkdirSync(C, { mode: V, recursive: !0 }) ?? void 0);
          let Te = (0, f.normalizeWindowsPath)(H.default.relative(le, C)).split("/"),
            Lt;
          for (let Ht = Te.shift(), Se = le; Ht && (Se += "/" + Ht); Ht = Te.shift()) {
            Se = (0, f.normalizeWindowsPath)(H.default.resolve(Se));
            try {
              (s.default.mkdirSync(Se, V), (Lt = Lt || Se));
            } catch {
              let _e = s.default.lstatSync(Se);
              if (_e.isDirectory()) continue;
              if (Ae) {
                (s.default.unlinkSync(Se), s.default.mkdirSync(Se, V), (Lt = Lt || Se));
                continue;
              } else if (_e.isSymbolicLink()) return new d.SymlinkError(Se, Se + "/" + Te.join("/"));
            }
          }
          return Be(Lt);
        };
      e.mkdirSync = T;
    }),
    a2o = e_((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.normalizeUnicode = void 0));
      var t = Object.create(null),
        r = 1e4,
        s = new Set(),
        a = (H) => {
          (s.has(H)
            ? s.delete(H)
            : (t[H] = H.normalize("NFD").toLocaleLowerCase("en").toLocaleUpperCase("en")),
            s.add(H));
          let u = t[H],
            f = s.size - r;
          if (f > r / 10) {
            for (let d of s) if ((s.delete(d), delete t[d], --f <= 0)) break;
          }
          return u;
        };
      e.normalizeUnicode = a;
    }),
    H2o = e_((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.PathReservations = void 0));
      var t = cr("path"),
        r = a2o(),
        s = Ilr(),
        a = process.env.TESTING_TAR_FAKE_PLATFORM || "win32",
        H = a === "win32",
        u = (d) =>
          d
            .split("/")
            .slice(0, -1)
            .reduce((_, L) => {
              let I = _.at(-1);
              return (I !== void 0 && (L = (0, t.join)(I, L)), _.push(L || "/"), _);
            }, []),
        f = class {
          #e = new Map();
          #r = new Map();
          #t = new Set();
          reserve(d, _) {
            d = H
              ? ["win32 parallelization disabled"]
              : d.map((I) => (0, s.stripTrailingSlashes)((0, t.join)((0, r.normalizeUnicode)(I))));
            let L = new Set(d.map((I) => u(I)).reduce((I, D) => I.concat(D)));
            this.#r.set(_, { dirs: L, paths: d });
            for (let I of d) {
              let D = this.#e.get(I);
              D ? D.push(_) : this.#e.set(I, [_]);
            }
            for (let I of L) {
              let D = this.#e.get(I);
              if (!D) this.#e.set(I, [new Set([_])]);
              else {
                let S = D.at(-1);
                S instanceof Set ? S.add(_) : D.push(new Set([_]));
              }
            }
            return this.#i(_);
          }
          #n(d) {
            let _ = this.#r.get(d);
            if (!_) throw Error("function does not have any path reservations");
            return {
              paths: _.paths.map((L) => this.#e.get(L)),
              dirs: [..._.dirs].map((L) => this.#e.get(L)),
            };
          }
          check(d) {
            let { paths: _, dirs: L } = this.#n(d);
            return _.every((I) => I && I[0] === d) && L.every((I) => I && I[0] instanceof Set && I[0].has(d));
          }
          #i(d) {
            return this.#t.has(d) || !this.check(d) ? !1 : (this.#t.add(d), d(() => this.#s(d)), !0);
          }
          #s(d) {
            if (!this.#t.has(d)) return !1;
            let _ = this.#r.get(d);
            if (!_) throw Error("invalid reservation");
            let { paths: L, dirs: I } = _,
              D = new Set();
            for (let S of L) {
              let T = this.#e.get(S);
              if (!T || T?.[0] !== d) continue;
              let C = T[1];
              if (!C) {
                this.#e.delete(S);
                continue;
              }
              if ((T.shift(), typeof C == "function")) D.add(C);
              else for (let O of C) D.add(O);
            }
            for (let S of I) {
              let T = this.#e.get(S),
                C = T?.[0];
              if (!(!T || !(C instanceof Set)))
                if (C.size === 1 && T.length === 1) {
                  this.#e.delete(S);
                  continue;
                } else if (C.size === 1) {
                  T.shift();
                  let O = T[0];
                  typeof O == "function" && D.add(O);
                } else C.delete(d);
            }
            return (this.#t.delete(d), D.forEach((S) => this.#i(S)), !0);
          }
        };
      e.PathReservations = f;
    }),
    c2o = e_((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.umask = void 0));
      var t = () => process.umask();
      e.umask = t;
    }),
    $ti = e_((e) => {
      var t =
          (e && e.__createBinding) ||
          (Object.create
            ? function (sr, Mt, Lr, Tr) {
                Tr === void 0 && (Tr = Lr);
                var Dn = Object.getOwnPropertyDescriptor(Mt, Lr);
                ((!Dn || ("get" in Dn ? !Mt.__esModule : Dn.writable || Dn.configurable)) &&
                  (Dn = {
                    enumerable: !0,
                    get: function () {
                      return Mt[Lr];
                    },
                  }),
                  Object.defineProperty(sr, Tr, Dn));
              }
            : function (sr, Mt, Lr, Tr) {
                (Tr === void 0 && (Tr = Lr), (sr[Tr] = Mt[Lr]));
              }),
        r =
          (e && e.__setModuleDefault) ||
          (Object.create
            ? function (sr, Mt) {
                Object.defineProperty(sr, "default", { enumerable: !0, value: Mt });
              }
            : function (sr, Mt) {
                sr.default = Mt;
              }),
        s =
          (e && e.__importStar) ||
          (function () {
            var sr = function (Mt) {
              return (
                (sr =
                  Object.getOwnPropertyNames ||
                  function (Lr) {
                    var Tr = [];
                    for (var Dn in Lr) Object.prototype.hasOwnProperty.call(Lr, Dn) && (Tr[Tr.length] = Dn);
                    return Tr;
                  }),
                sr(Mt)
              );
            };
            return function (Mt) {
              if (Mt && Mt.__esModule) return Mt;
              var Lr = {};
              if (Mt != null)
                for (var Tr = sr(Mt), Dn = 0; Dn < Tr.length; Dn++) Tr[Dn] !== "default" && t(Lr, Mt, Tr[Dn]);
              return (r(Lr, Mt), Lr);
            };
          })(),
        a =
          (e && e.__importDefault) ||
          function (sr) {
            return sr && sr.__esModule ? sr : { default: sr };
          };
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.UnpackSync = e.Unpack = void 0));
      var H = s(i4e()),
        u = a(cr("assert")),
        f = cr("crypto"),
        d = a(cr("fs")),
        _ = a(cr("path")),
        L = n2o(),
        I = o2o(),
        D = a4e(),
        S = Elr(),
        T = dti(),
        C = s(mti()),
        O = H2o(),
        B = Lti(),
        V = c2o(),
        q = Symbol("onEntry"),
        Z = Symbol("checkFs"),
        se = Symbol("checkFs2"),
        ae = Symbol("isReusable"),
        z = Symbol("makeFs"),
        Ae = Symbol("file"),
        le = Symbol("directory"),
        Be = Symbol("link"),
        Te = Symbol("symlink"),
        Lt = Symbol("hardlink"),
        Ht = Symbol("ensureNoSymlink"),
        Se = Symbol("unsupported"),
        _e = Symbol("checkPath"),
        we = Symbol("stripAbsolutePath"),
        Pe = Symbol("mkdir"),
        ye = Symbol("onError"),
        ot = Symbol("pending"),
        Ee = Symbol("pend"),
        Ve = Symbol("unpend"),
        Fe = Symbol("ended"),
        it = Symbol("maybeClose"),
        At = Symbol("skip"),
        et = Symbol("doChown"),
        ut = Symbol("uid"),
        ht = Symbol("gid"),
        Et = Symbol("checkedCwd"),
        tr = process.env.TESTING_TAR_FAKE_PLATFORM || "win32",
        Rr = tr === "win32",
        Vt = 1024,
        Br = (sr, Mt) => {
          if (!Rr) return d.default.unlink(sr, Mt);
          let Lr = sr + ".DELETE." + (0, f.randomBytes)(16).toString("hex");
          d.default.rename(sr, Lr, (Tr) => {
            if (Tr) return Mt(Tr);
            d.default.unlink(Lr, Mt);
          });
        },
        Dt = (sr) => {
          if (!Rr) return d.default.unlinkSync(sr);
          let Mt = sr + ".DELETE." + (0, f.randomBytes)(16).toString("hex");
          (d.default.renameSync(sr, Mt), d.default.unlinkSync(Mt));
        },
        St = (sr, Mt, Lr) =>
          sr !== void 0 && sr === sr >>> 0 ? sr : Mt !== void 0 && Mt === Mt >>> 0 ? Mt : Lr,
        wt = class extends S.Parser {
          [Fe] = !1;
          [Et] = !1;
          [ot] = 0;
          reservations = new O.PathReservations();
          transform;
          writable = !0;
          readable = !1;
          uid;
          gid;
          setOwner;
          preserveOwner;
          processGid;
          processUid;
          maxDepth;
          forceChown;
          win32;
          newer;
          keep;
          noMtime;
          preservePaths;
          unlink;
          cwd;
          strip;
          processUmask;
          umask;
          dmode;
          fmode;
          chmod;
          constructor(sr = {}) {
            if (
              ((sr.ondone = () => {
                ((this[Fe] = !0), this[it]());
              }),
              super(sr),
              (this.transform = sr.transform),
              (this.chmod = !!sr.chmod),
              typeof sr.uid == "number" || typeof sr.gid == "number")
            ) {
              if (typeof sr.uid != "number" || typeof sr.gid != "number")
                throw TypeError("cannot set owner without number uid and gid");
              if (sr.preserveOwner)
                throw TypeError("cannot preserve owner in archive and also set owner explicitly");
              ((this.uid = sr.uid), (this.gid = sr.gid), (this.setOwner = !0));
            } else ((this.uid = void 0), (this.gid = void 0), (this.setOwner = !1));
            ((this.preserveOwner =
              sr.preserveOwner === void 0 && typeof sr.uid != "number"
                ? process.getuid?.() === 0
                : !!sr.preserveOwner),
              (this.processUid =
                (this.preserveOwner || this.setOwner) && process.getuid ? process.getuid() : void 0),
              (this.processGid =
                (this.preserveOwner || this.setOwner) && process.getgid ? process.getgid() : void 0),
              (this.maxDepth = typeof sr.maxDepth == "number" ? sr.maxDepth : Vt),
              (this.forceChown = sr.forceChown === !0),
              (this.win32 = !!sr.win32 || Rr),
              (this.newer = !!sr.newer),
              (this.keep = !!sr.keep),
              (this.noMtime = !!sr.noMtime),
              (this.preservePaths = !!sr.preservePaths),
              (this.unlink = !!sr.unlink),
              (this.cwd = (0, D.normalizeWindowsPath)(_.default.resolve(sr.cwd || process.cwd()))),
              (this.strip = Number(sr.strip) || 0),
              (this.processUmask = this.chmod
                ? typeof sr.processUmask == "number"
                  ? sr.processUmask
                  : (0, V.umask)()
                : 0),
              (this.umask = typeof sr.umask == "number" ? sr.umask : this.processUmask),
              (this.dmode = sr.dmode || 511 & ~this.umask),
              (this.fmode = sr.fmode || 438 & ~this.umask),
              this.on("entry", (Mt) => this[q](Mt)));
          }
          warn(sr, Mt, Lr = {}) {
            return (
              (sr === "TAR_BAD_ARCHIVE" || sr === "TAR_ABORT") && (Lr.recoverable = !1),
              super.warn(sr, Mt, Lr)
            );
          }
          [it]() {
            this[Fe] && this[ot] === 0 && (this.emit("prefinish"), this.emit("finish"), this.emit("end"));
          }
          [we](sr, Mt) {
            let Lr = sr[Mt],
              { type: Tr } = sr;
            if (!Lr || this.preservePaths) return !0;
            let [Dn, Mn] = (0, T.stripAbsolutePath)(Lr),
              as = Mn.replaceAll(/\\/g, "/").split("/");
            if (as.includes("..") || (Rr && /^[a-z]:\.\.$/i.test(as[0] ?? ""))) {
              if (Mt === "path" || Tr === "Link")
                return (this.warn("TAR_ENTRY_ERROR", `${Mt} contains '..'`, { entry: sr, [Mt]: Lr }), !1);
              let xi = _.default.posix.dirname(sr.path),
                go = _.default.posix.normalize(_.default.posix.join(xi, as.join("/")));
              if (go.startsWith("../") || go === "..")
                return (
                  this.warn("TAR_ENTRY_ERROR", `${Mt} escapes extraction directory`, { entry: sr, [Mt]: Lr }),
                  !1
                );
            }
            return (
              Dn &&
                ((sr[Mt] = String(Mn)),
                this.warn("TAR_ENTRY_INFO", `stripping ${Dn} from absolute ${Mt}`, { entry: sr, [Mt]: Lr })),
              !0
            );
          }
          [_e](sr) {
            let Mt = (0, D.normalizeWindowsPath)(sr.path),
              Lr = Mt.split("/");
            if (this.strip) {
              if (Lr.length < this.strip) return !1;
              if (sr.type === "Link") {
                let Tr = (0, D.normalizeWindowsPath)(String(sr.linkpath)).split("/");
                if (Tr.length >= this.strip) sr.linkpath = Tr.slice(this.strip).join("/");
                else return !1;
              }
              (Lr.splice(0, this.strip), (sr.path = Lr.join("/")));
            }
            if (isFinite(this.maxDepth) && Lr.length > this.maxDepth)
              return (
                this.warn("TAR_ENTRY_ERROR", "path excessively deep", {
                  entry: sr,
                  path: Mt,
                  depth: Lr.length,
                  maxDepth: this.maxDepth,
                }),
                !1
              );
            if (!this[we](sr, "path") || !this[we](sr, "linkpath")) return !1;
            if (
              ((sr.absolute = _.default.isAbsolute(sr.path)
                ? (0, D.normalizeWindowsPath)(_.default.resolve(sr.path))
                : (0, D.normalizeWindowsPath)(_.default.resolve(this.cwd, sr.path))),
              !this.preservePaths &&
                typeof sr.absolute == "string" &&
                sr.absolute.indexOf(this.cwd + "/") !== 0 &&
                sr.absolute !== this.cwd)
            )
              return (
                this.warn("TAR_ENTRY_ERROR", "path escaped extraction target", {
                  entry: sr,
                  path: (0, D.normalizeWindowsPath)(sr.path),
                  resolvedPath: sr.absolute,
                  cwd: this.cwd,
                }),
                !1
              );
            if (sr.absolute === this.cwd && sr.type !== "Directory" && sr.type !== "GNUDumpDir") return !1;
            if (this.win32) {
              let { root: Tr } = _.default.win32.parse(String(sr.absolute));
              sr.absolute = Tr + C.encode(String(sr.absolute).slice(Tr.length));
              let { root: Dn } = _.default.win32.parse(sr.path);
              sr.path = Dn + C.encode(sr.path.slice(Dn.length));
            }
            return !0;
          }
          [q](sr) {
            if (!this[_e](sr)) return sr.resume();
            switch ((u.default.equal(typeof sr.absolute, "string"), sr.type)) {
              case "Directory":
              case "GNUDumpDir":
                sr.mode && (sr.mode = sr.mode | 448);
              case "File":
              case "OldFile":
              case "ContiguousFile":
              case "Link":
              case "SymbolicLink":
                return this[Z](sr);
              default:
                return this[Se](sr);
            }
          }
          [ye](sr, Mt) {
            sr.name === "CwdError"
              ? this.emit("error", sr)
              : (this.warn("TAR_ENTRY_ERROR", sr, { entry: Mt }), this[Ve](), Mt.resume());
          }
          [Pe](sr, Mt, Lr) {
            (0, I.mkdir)(
              (0, D.normalizeWindowsPath)(sr),
              {
                uid: this.uid,
                gid: this.gid,
                processUid: this.processUid,
                processGid: this.processGid,
                umask: this.processUmask,
                preserve: this.preservePaths,
                unlink: this.unlink,
                cwd: this.cwd,
                mode: Mt,
              },
              Lr,
            );
          }
          [et](sr) {
            return (
              this.forceChown ||
              (this.preserveOwner &&
                ((typeof sr.uid == "number" && sr.uid !== this.processUid) ||
                  (typeof sr.gid == "number" && sr.gid !== this.processGid))) ||
              (typeof this.uid == "number" && this.uid !== this.processUid) ||
              (typeof this.gid == "number" && this.gid !== this.processGid)
            );
          }
          [ut](sr) {
            return St(this.uid, sr.uid, this.processUid);
          }
          [ht](sr) {
            return St(this.gid, sr.gid, this.processGid);
          }
          [Ae](sr, Mt) {
            let Lr = typeof sr.mode == "number" ? sr.mode & 4095 : this.fmode,
              Tr = new H.WriteStream(String(sr.absolute), {
                flags: (0, L.getWriteFlag)(sr.size),
                mode: Lr,
                autoClose: !1,
              });
            Tr.on("error", (xi) => {
              (Tr.fd && d.default.close(Tr.fd, () => {}), (Tr.write = () => !0), this[ye](xi, sr), Mt());
            });
            let Dn = 1,
              Mn = (xi) => {
                if (xi) {
                  (Tr.fd && d.default.close(Tr.fd, () => {}), this[ye](xi, sr), Mt());
                  return;
                }
                --Dn === 0 &&
                  Tr.fd !== void 0 &&
                  d.default.close(Tr.fd, (go) => {
                    (go ? this[ye](go, sr) : this[Ve](), Mt());
                  });
              };
            Tr.on("finish", () => {
              let xi = String(sr.absolute),
                go = Tr.fd;
              if (typeof go == "number" && sr.mtime && !this.noMtime) {
                Dn++;
                let Fo = sr.atime || new Date(),
                  en = sr.mtime;
                d.default.futimes(go, Fo, en, (gr) =>
                  gr ? d.default.utimes(xi, Fo, en, (Ei) => Mn(Ei && gr)) : Mn(),
                );
              }
              if (typeof go == "number" && this[et](sr)) {
                Dn++;
                let Fo = this[ut](sr),
                  en = this[ht](sr);
                typeof Fo == "number" &&
                  typeof en == "number" &&
                  d.default.fchown(go, Fo, en, (gr) =>
                    gr ? d.default.chown(xi, Fo, en, (Ei) => Mn(Ei && gr)) : Mn(),
                  );
              }
              Mn();
            });
            let as = (this.transform && this.transform(sr)) || sr;
            (as !== sr &&
              (as.on("error", (xi) => {
                (this[ye](xi, sr), Mt());
              }),
              sr.pipe(as)),
              as.pipe(Tr));
          }
          [le](sr, Mt) {
            let Lr = typeof sr.mode == "number" ? sr.mode & 4095 : this.dmode;
            this[Pe](String(sr.absolute), Lr, (Tr) => {
              if (Tr) {
                (this[ye](Tr, sr), Mt());
                return;
              }
              let Dn = 1,
                Mn = () => {
                  --Dn === 0 && (Mt(), this[Ve](), sr.resume());
                };
              (sr.mtime &&
                !this.noMtime &&
                (Dn++, d.default.utimes(String(sr.absolute), sr.atime || new Date(), sr.mtime, Mn)),
                this[et](sr) &&
                  (Dn++,
                  d.default.chown(String(sr.absolute), Number(this[ut](sr)), Number(this[ht](sr)), Mn)),
                Mn());
            });
          }
          [Se](sr) {
            ((sr.unsupported = !0),
              this.warn("TAR_ENTRY_UNSUPPORTED", `unsupported entry type: ${sr.type}`, { entry: sr }),
              sr.resume());
          }
          [Te](sr, Mt) {
            let Lr = (0, D.normalizeWindowsPath)(
              _.default.relative(
                this.cwd,
                _.default.resolve(_.default.dirname(String(sr.absolute)), String(sr.linkpath)),
              ),
            ).split("/");
            this[Ht](
              sr,
              this.cwd,
              Lr,
              () => this[Be](sr, String(sr.linkpath), "symlink", Mt),
              (Tr) => {
                (this[ye](Tr, sr), Mt());
              },
            );
          }
          [Lt](sr, Mt) {
            let Lr = (0, D.normalizeWindowsPath)(_.default.resolve(this.cwd, String(sr.linkpath))),
              Tr = (0, D.normalizeWindowsPath)(String(sr.linkpath)).split("/");
            this[Ht](
              sr,
              this.cwd,
              Tr,
              () => this[Be](sr, Lr, "link", Mt),
              (Dn) => {
                (this[ye](Dn, sr), Mt());
              },
            );
          }
          [Ht](sr, Mt, Lr, Tr, Dn) {
            let Mn = Lr.shift();
            if (this.preservePaths || Mn === void 0) return Tr();
            let as = _.default.resolve(Mt, Mn);
            d.default.lstat(as, (xi, go) => {
              if (xi) return Tr();
              if (go?.isSymbolicLink())
                return Dn(new B.SymlinkError(as, _.default.resolve(as, Lr.join("/"))));
              this[Ht](sr, as, Lr, Tr, Dn);
            });
          }
          [Ee]() {
            this[ot]++;
          }
          [Ve]() {
            (this[ot]--, this[it]());
          }
          [At](sr) {
            (this[Ve](), sr.resume());
          }
          [ae](sr, Mt) {
            return sr.type === "File" && !this.unlink && Mt.isFile() && Mt.nlink <= 1 && !Rr;
          }
          [Z](sr) {
            this[Ee]();
            let Mt = [sr.path];
            (sr.linkpath && Mt.push(sr.linkpath), this.reservations.reserve(Mt, (Lr) => this[se](sr, Lr)));
          }
          [se](sr, Mt) {
            let Lr = (as) => {
                Mt(as);
              },
              Tr = () => {
                this[Pe](this.cwd, this.dmode, (as) => {
                  if (as) {
                    (this[ye](as, sr), Lr());
                    return;
                  }
                  ((this[Et] = !0), Dn());
                });
              },
              Dn = () => {
                if (sr.absolute !== this.cwd) {
                  let as = (0, D.normalizeWindowsPath)(_.default.dirname(String(sr.absolute)));
                  if (as !== this.cwd)
                    return this[Pe](as, this.dmode, (xi) => {
                      if (xi) {
                        (this[ye](xi, sr), Lr());
                        return;
                      }
                      Mn();
                    });
                }
                Mn();
              },
              Mn = () => {
                d.default.lstat(String(sr.absolute), (as, xi) => {
                  if (xi && (this.keep || (this.newer && xi.mtime > (sr.mtime ?? xi.mtime)))) {
                    (this[At](sr), Lr());
                    return;
                  }
                  if (as || this[ae](sr, xi)) return this[z](null, sr, Lr);
                  if (xi.isDirectory()) {
                    if (sr.type === "Directory") {
                      let go = this.chmod && sr.mode && (xi.mode & 4095) !== sr.mode,
                        Fo = (en) => this[z](en ?? null, sr, Lr);
                      return go ? d.default.chmod(String(sr.absolute), Number(sr.mode), Fo) : Fo();
                    }
                    if (sr.absolute !== this.cwd)
                      return d.default.rmdir(String(sr.absolute), (go) => this[z](go ?? null, sr, Lr));
                  }
                  if (sr.absolute === this.cwd) return this[z](null, sr, Lr);
                  Br(String(sr.absolute), (go) => this[z](go ?? null, sr, Lr));
                });
              };
            this[Et] ? Dn() : Tr();
          }
          [z](sr, Mt, Lr) {
            if (sr) {
              (this[ye](sr, Mt), Lr());
              return;
            }
            switch (Mt.type) {
              case "File":
              case "OldFile":
              case "ContiguousFile":
                return this[Ae](Mt, Lr);
              case "Link":
                return this[Lt](Mt, Lr);
              case "SymbolicLink":
                return this[Te](Mt, Lr);
              case "Directory":
              case "GNUDumpDir":
                return this[le](Mt, Lr);
            }
          }
          [Be](sr, Mt, Lr, Tr) {
            d.default[Lr](Mt, String(sr.absolute), (Dn) => {
              (Dn ? this[ye](Dn, sr) : (this[Ve](), sr.resume()), Tr());
            });
          }
        };
      e.Unpack = wt;
      var Qr = (sr) => {
          try {
            return [null, sr()];
          } catch (Mt) {
            return [Mt, null];
          }
        },
        Li = class extends wt {
          sync = !0;
          [z](sr, Mt) {
            return super[z](sr, Mt, () => {});
          }
          [Z](sr) {
            if (!this[Et]) {
              let Dn = this[Pe](this.cwd, this.dmode);
              if (Dn) return this[ye](Dn, sr);
              this[Et] = !0;
            }
            if (sr.absolute !== this.cwd) {
              let Dn = (0, D.normalizeWindowsPath)(_.default.dirname(String(sr.absolute)));
              if (Dn !== this.cwd) {
                let Mn = this[Pe](Dn, this.dmode);
                if (Mn) return this[ye](Mn, sr);
              }
            }
            let [Mt, Lr] = Qr(() => d.default.lstatSync(String(sr.absolute)));
            if (Lr && (this.keep || (this.newer && Lr.mtime > (sr.mtime ?? Lr.mtime)))) return this[At](sr);
            if (Mt || this[ae](sr, Lr)) return this[z](null, sr);
            if (Lr.isDirectory()) {
              if (sr.type === "Directory") {
                let Mn = this.chmod && sr.mode && (Lr.mode & 4095) !== sr.mode,
                  [as] = Mn
                    ? Qr(() => {
                        d.default.chmodSync(String(sr.absolute), Number(sr.mode));
                      })
                    : [];
                return this[z](as, sr);
              }
              let [Dn] = Qr(() => d.default.rmdirSync(String(sr.absolute)));
              this[z](Dn, sr);
            }
            let [Tr] = sr.absolute === this.cwd ? [] : Qr(() => Dt(String(sr.absolute)));
            this[z](Tr, sr);
          }
          [Ae](sr, Mt) {
            let Lr = typeof sr.mode == "number" ? sr.mode & 4095 : this.fmode,
              Tr = (as) => {
                let xi;
                try {
                  d.default.closeSync(Dn);
                } catch (go) {
                  xi = go;
                }
                ((as || xi) && this[ye](as || xi, sr), Mt());
              },
              Dn;
            try {
              Dn = d.default.openSync(String(sr.absolute), (0, L.getWriteFlag)(sr.size), Lr);
            } catch (as) {
              return Tr(as);
            }
            let Mn = (this.transform && this.transform(sr)) || sr;
            (Mn !== sr && (Mn.on("error", (as) => this[ye](as, sr)), sr.pipe(Mn)),
              Mn.on("data", (as) => {
                try {
                  d.default.writeSync(Dn, as, 0, as.length);
                } catch (xi) {
                  Tr(xi);
                }
              }),
              Mn.on("end", () => {
                let as = null;
                if (sr.mtime && !this.noMtime) {
                  let xi = sr.atime || new Date(),
                    go = sr.mtime;
                  try {
                    d.default.futimesSync(Dn, xi, go);
                  } catch (Fo) {
                    try {
                      d.default.utimesSync(String(sr.absolute), xi, go);
                    } catch {
                      as = Fo;
                    }
                  }
                }
                if (this[et](sr)) {
                  let xi = this[ut](sr),
                    go = this[ht](sr);
                  try {
                    d.default.fchownSync(Dn, Number(xi), Number(go));
                  } catch (Fo) {
                    try {
                      d.default.chownSync(String(sr.absolute), Number(xi), Number(go));
                    } catch {
                      as = as || Fo;
                    }
                  }
                }
                Tr(as);
              }));
          }
          [le](sr, Mt) {
            let Lr = typeof sr.mode == "number" ? sr.mode & 4095 : this.dmode,
              Tr = this[Pe](String(sr.absolute), Lr);
            if (Tr) {
              (this[ye](Tr, sr), Mt());
              return;
            }
            if (sr.mtime && !this.noMtime)
              try {
                d.default.utimesSync(String(sr.absolute), sr.atime || new Date(), sr.mtime);
              } catch {}
            if (this[et](sr))
              try {
                d.default.chownSync(String(sr.absolute), Number(this[ut](sr)), Number(this[ht](sr)));
              } catch {}
            (Mt(), sr.resume());
          }
          [Pe](sr, Mt) {
            try {
              return (0, I.mkdirSync)((0, D.normalizeWindowsPath)(sr), {
                uid: this.uid,
                gid: this.gid,
                processUid: this.processUid,
                processGid: this.processGid,
                umask: this.processUmask,
                preserve: this.preservePaths,
                unlink: this.unlink,
                cwd: this.cwd,
                mode: Mt,
              });
            } catch (Lr) {
              return Lr;
            }
          }
          [Ht](sr, Mt, Lr, Tr, Dn) {
            if (this.preservePaths || Lr.length === 0) return Tr();
            let Mn = Mt;
            for (let as of Lr) {
              Mn = _.default.resolve(Mn, as);
              let [xi, go] = Qr(() => d.default.lstatSync(Mn));
              if (xi) return Tr();
              if (go.isSymbolicLink()) return Dn(new B.SymlinkError(Mn, _.default.resolve(Mt, Lr.join("/"))));
            }
            Tr();
          }
          [Be](sr, Mt, Lr, Tr) {
            let Dn = `${Lr}Sync`;
            try {
              (d.default[Dn](Mt, String(sr.absolute)), Tr(), sr.resume());
            } catch (Mn) {
              return this[ye](Mn, sr);
            }
          }
        };
      e.UnpackSync = Li;
    }),
    gti = e_((e) => {
      var t =
          (e && e.__createBinding) ||
          (Object.create
            ? function (D, S, T, C) {
                C === void 0 && (C = T);
                var O = Object.getOwnPropertyDescriptor(S, T);
                ((!O || ("get" in O ? !S.__esModule : O.writable || O.configurable)) &&
                  (O = {
                    enumerable: !0,
                    get: function () {
                      return S[T];
                    },
                  }),
                  Object.defineProperty(D, C, O));
              }
            : function (D, S, T, C) {
                (C === void 0 && (C = T), (D[C] = S[T]));
              }),
        r =
          (e && e.__setModuleDefault) ||
          (Object.create
            ? function (D, S) {
                Object.defineProperty(D, "default", { enumerable: !0, value: S });
              }
            : function (D, S) {
                D.default = S;
              }),
        s =
          (e && e.__importStar) ||
          (function () {
            var D = function (S) {
              return (
                (D =
                  Object.getOwnPropertyNames ||
                  function (T) {
                    var C = [];
                    for (var O in T) Object.prototype.hasOwnProperty.call(T, O) && (C[C.length] = O);
                    return C;
                  }),
                D(S)
              );
            };
            return function (S) {
              if (S && S.__esModule) return S;
              var T = {};
              if (S != null) for (var C = D(S), O = 0; O < C.length; O++) C[O] !== "default" && t(T, S, C[O]);
              return (r(T, S), T);
            };
          })(),
        a =
          (e && e.__importDefault) ||
          function (D) {
            return D && D.__esModule ? D : { default: D };
          };
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.extract = void 0));
      var H = s(i4e()),
        u = a(cr("fs")),
        f = H4e(),
        d = s4e(),
        _ = $ti(),
        L = (D) => {
          let S = new _.UnpackSync(D),
            T = D.file,
            C = u.default.statSync(T),
            O = D.maxReadSize || 16777216;
          new H.ReadStreamSync(T, { readSize: O, size: C.size }).pipe(S);
        },
        I = (D, S) => {
          let T = new _.Unpack(D),
            C = D.maxReadSize || 16777216,
            O = D.file;
          return new Promise((B, V) => {
            (T.on("error", V),
              T.on("close", B),
              u.default.stat(O, (q, Z) => {
                if (q) V(q);
                else {
                  let se = new H.ReadStream(O, { readSize: C, size: Z.size });
                  (se.on("error", V), se.pipe(T));
                }
              }));
          });
        };
      e.extract = (0, d.makeCommand)(
        L,
        I,
        (D) => new _.UnpackSync(D),
        (D) => new _.Unpack(D),
        (D, S) => {
          S?.length && (0, f.filesFilter)(D, S);
        },
      );
    }),
    ylr = e_((e) => {
      var t =
        (e && e.__importDefault) ||
        function (C) {
          return C && C.__esModule ? C : { default: C };
        };
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.replace = void 0));
      var r = i4e(),
        s = t(cr("fs")),
        a = t(cr("path")),
        H = o4e(),
        u = H4e(),
        f = s4e(),
        d = Llr(),
        _ = Dlr(),
        L = (C, O) => {
          let B = new _.PackSync(C),
            V = !0,
            q,
            Z;
          try {
            try {
              q = s.default.openSync(C.file, "r+");
            } catch (z) {
              if (z?.code === "ENOENT") q = s.default.openSync(C.file, "w+");
              else throw z;
            }
            let se = s.default.fstatSync(q),
              ae = Buffer.alloc(512);
            e: for (Z = 0; Z < se.size; Z += 512) {
              for (let le = 0, Be = 0; le < 512; le += Be) {
                if (
                  ((Be = s.default.readSync(q, ae, le, ae.length - le, Z + le)),
                  Z === 0 && ae[0] === 31 && ae[1] === 139)
                )
                  throw Error("cannot append to compressed archives");
                if (!Be) break e;
              }
              let z = new H.Header(ae);
              if (!z.cksumValid) break;
              let Ae = 512 * Math.ceil((z.size || 0) / 512);
              if (Z + Ae + 512 > se.size) break;
              ((Z += Ae), C.mtimeCache && z.mtime && C.mtimeCache.set(String(z.path), z.mtime));
            }
            ((V = !1), I(C, B, Z, q, O));
          } finally {
            if (V)
              try {
                s.default.closeSync(q);
              } catch {}
          }
        },
        I = (C, O, B, V, q) => {
          let Z = new r.WriteStreamSync(C.file, { fd: V, start: B });
          (O.pipe(Z), S(O, q));
        },
        D = (C, O) => {
          O = Array.from(O);
          let B = new _.Pack(C),
            V = (q, Z, se) => {
              let ae = (Te, Lt) => {
                  Te ? s.default.close(q, (Ht) => se(Te)) : se(null, Lt);
                },
                z = 0;
              if (Z === 0) return ae(null, 0);
              let Ae = 0,
                le = Buffer.alloc(512),
                Be = (Te, Lt) => {
                  if (Te || Lt === void 0) return ae(Te);
                  if (((Ae += Lt), Ae < 512 && Lt))
                    return s.default.read(q, le, Ae, le.length - Ae, z + Ae, Be);
                  if (z === 0 && le[0] === 31 && le[1] === 139)
                    return ae(Error("cannot append to compressed archives"));
                  if (Ae < 512) return ae(null, z);
                  let Ht = new H.Header(le);
                  if (!Ht.cksumValid) return ae(null, z);
                  let Se = 512 * Math.ceil((Ht.size ?? 0) / 512);
                  if (z + Se + 512 > Z || ((z += Se + 512), z >= Z)) return ae(null, z);
                  (C.mtimeCache && Ht.mtime && C.mtimeCache.set(String(Ht.path), Ht.mtime),
                    (Ae = 0),
                    s.default.read(q, le, 0, 512, z, Be));
                };
              s.default.read(q, le, 0, 512, z, Be);
            };
          return new Promise((q, Z) => {
            B.on("error", Z);
            let se = "r+",
              ae = (z, Ae) => {
                if (z && z.code === "ENOENT" && se === "r+")
                  return ((se = "w+"), s.default.open(C.file, se, ae));
                if (z || !Ae) return Z(z);
                s.default.fstat(Ae, (le, Be) => {
                  if (le) return s.default.close(Ae, () => Z(le));
                  V(Ae, Be.size, (Te, Lt) => {
                    if (Te) return Z(Te);
                    let Ht = new r.WriteStream(C.file, { fd: Ae, start: Lt });
                    (B.pipe(Ht), Ht.on("error", Z), Ht.on("close", q), T(B, O));
                  });
                });
              };
            s.default.open(C.file, se, ae);
          });
        },
        S = (C, O) => {
          (O.forEach((B) => {
            B.charAt(0) === "@"
              ? (0, u.list)({
                  file: a.default.resolve(C.cwd, B.slice(1)),
                  sync: !0,
                  noResume: !0,
                  onReadEntry: (V) => C.add(V),
                })
              : C.add(B);
          }),
            C.end());
        },
        T = async (C, O) => {
          for (let B of O)
            B.charAt(0) === "@"
              ? await (0, u.list)({
                  file: a.default.resolve(String(C.cwd), B.slice(1)),
                  noResume: !0,
                  onReadEntry: (V) => C.add(V),
                })
              : C.add(B);
          C.end();
        };
      e.replace = (0, f.makeCommand)(
        L,
        D,
        () => {
          throw TypeError("file is required");
        },
        () => {
          throw TypeError("file is required");
        },
        (C, O) => {
          if (!(0, d.isFile)(C)) throw TypeError("file is required");
          if (C.gzip || C.brotli || C.zstd || C.file.endsWith(".br") || C.file.endsWith(".tbr"))
            throw TypeError("cannot append to compressed archives");
          if (!O?.length) throw TypeError("no paths specified to add/replace");
        },
      );
    }),
    Eti = e_((e) => {
      (Object.defineProperty(e, "__esModule", { value: !0 }), (e.update = void 0));
      var t = s4e(),
        r = ylr();
      e.update = (0, t.makeCommand)(
        r.replace.syncFile,
        r.replace.asyncFile,
        r.replace.syncNoFile,
        r.replace.asyncNoFile,
        (a, H = []) => {
          (r.replace.validate?.(a, H), s(a));
        },
      );
      var s = (a) => {
        let H = a.filter;
        (a.mtimeCache || (a.mtimeCache = new Map()),
          (a.filter = H
            ? (u, f) => H(u, f) && !((a.mtimeCache?.get(u) ?? f.mtime ?? 0) > (f.mtime ?? 0))
            : (u, f) => !((a.mtimeCache?.get(u) ?? f.mtime ?? 0) > (f.mtime ?? 0))));
      };
    }),
    Iti =
      (MI && MI.__createBinding) ||
      (Object.create
        ? function (e, t, r, s) {
            s === void 0 && (s = r);
            var a = Object.getOwnPropertyDescriptor(t, r);
            ((!a || ("get" in a ? !t.__esModule : a.writable || a.configurable)) &&
              (a = {
                enumerable: !0,
                get: function () {
                  return t[r];
                },
              }),
              Object.defineProperty(e, s, a));
          }
        : function (e, t, r, s) {
            (s === void 0 && (s = r), (e[s] = t[r]));
          }),
    A2o =
      (MI && MI.__setModuleDefault) ||
      (Object.create
        ? function (e, t) {
            Object.defineProperty(e, "default", { enumerable: !0, value: t });
          }
        : function (e, t) {
            e.default = t;
          }),
    iB =
      (MI && MI.__exportStar) ||
      function (e, t) {
        for (var r in e) r !== "default" && !Object.prototype.hasOwnProperty.call(t, r) && Iti(t, e, r);
      },
    u2o =
      (MI && MI.__importStar) ||
      (function () {
        var e = function (t) {
          return (
            (e =
              Object.getOwnPropertyNames ||
              function (r) {
                var s = [];
                for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (s[s.length] = a);
                return s;
              }),
            e(t)
          );
        };
        return function (t) {
          if (t && t.__esModule) return t;
          var r = {};
          if (t != null) for (var s = e(t), a = 0; a < s.length; a++) s[a] !== "default" && Iti(r, t, s[a]);
          return (A2o(r, t), r);
        };
      })();
  Object.defineProperty(MI, "__esModule", { value: !0 });
  MI.u = MI.types = MI.r = MI.t = MI.x = MI.c = void 0;
  iB(hti(), MI);
  var l2o = hti();
  Object.defineProperty(MI, "c", {
    enumerable: !0,
    get: function () {
      return l2o.create;
    },
  });
  iB(gti(), MI);
  var f2o = gti();
  Object.defineProperty(MI, "x", {
    enumerable: !0,
    get: function () {
      return f2o.extract;
    },
  });
  iB(o4e(), MI);
  iB(H4e(), MI);
  var p2o = H4e();
  Object.defineProperty(MI, "t", {
    enumerable: !0,
    get: function () {
      return p2o.list;
    },
  });
  iB(Dlr(), MI);
  iB(Elr(), MI);
  iB($lr(), MI);
  iB(pti(), MI);
  iB(ylr(), MI);
  var d2o = ylr();
  Object.defineProperty(MI, "r", {
    enumerable: !0,
    get: function () {
      return d2o.replace;
    },
  });
  MI.types = u2o(fti());
  iB($ti(), MI);
  iB(Eti(), MI);
  var m2o = Eti();
  Object.defineProperty(MI, "u", {
    enumerable: !0,
    get: function () {
      return m2o.update;
    },
  });
  iB(_ti(), MI);
});
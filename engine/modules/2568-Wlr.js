
var Wlr = Ie(function (Gd) {
  var IBo =
      (Gd && Gd.__createBinding) ||
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
    DBo =
      (Gd && Gd.__setModuleDefault) ||
      (Object.create
        ? function (e, t) {
            Object.defineProperty(e, "default", { enumerable: !0, value: t });
          }
        : function (e, t) {
            e.default = t;
          }),
    yBo =
      (Gd && Gd.__importStar) ||
      (function () {
        var e = function (t) {
          return (
            (e =
              Object.getOwnPropertyNames ||
              function (r) {
                var s = [];
                for (var a in r) if (Object.prototype.hasOwnProperty.call(r, a)) s[s.length] = a;
                return s;
              }),
            e(t)
          );
        };
        return function (t) {
          if (t && t.__esModule) return t;
          var r = {};
          if (t != null) {
            for (var s = e(t), a = 0; a < s.length; a++) if (s[a] !== "default") IBo(r, t, s[a]);
          }
          return (DBo(r, t), r);
        };
      })(),
    MBo =
      (Gd && Gd.__importDefault) ||
      function (e) {
        return e && e.__esModule ? e : { default: e };
      };
  Object.defineProperty(Gd, "__esModule", { value: !0 });
  Gd.ZstdDecompress =
    Gd.ZstdCompress =
    Gd.BrotliDecompress =
    Gd.BrotliCompress =
    Gd.Unzip =
    Gd.InflateRaw =
    Gd.DeflateRaw =
    Gd.Gunzip =
    Gd.Gzip =
    Gd.Inflate =
    Gd.Deflate =
    Gd.Zlib =
    Gd.ZlibError =
    Gd.constants =
      void 0;
  var Flr = MBo(cr("assert")),
    A8 = cr("buffer"),
    Eri = Ny(),
    $ri = yBo(cr("zlib")),
    w1 = Olr(),
    xBo = Olr();
  Object.defineProperty(Gd, "constants", {
    enumerable: !0,
    get: function () {
      return xBo.constants;
    },
  });
  var SBo = A8.Buffer.concat,
    gri = Object.getOwnPropertyDescriptor(A8.Buffer, "concat"),
    TBo = (e) => e,
    Ulr =
      gri?.writable === !0 || gri?.set !== void 0
        ? (e) => {
            A8.Buffer.concat = e ? TBo : SBo;
          }
        : (e) => {},
    n_e = Symbol("_superWrite");
  class sTe extends Error {
    code;
    errno;
    constructor(e, t) {
      super("zlib: " + e.message, { cause: e });
      if (((this.code = e.code), (this.errno = e.errno), !this.code)) this.code = "ZLIB_ERROR";
      ((this.message = "zlib: " + e.message), Error.captureStackTrace(this, t ?? this.constructor));
    }
    get name() {
      return "ZlibError";
    }
  }
  Gd.ZlibError = sTe;
  var Nlr = Symbol("flushFlag");
  class iIt extends Eri.Minipass {
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
    constructor(e, t) {
      if (!e || typeof e !== "object") throw TypeError("invalid options for ZlibBase constructor");
      super(e);
      if (
        ((this.#t = e.flush ?? 0),
        (this.#n = e.finishFlush ?? 0),
        (this.#i = e.fullFlushFlag ?? 0),
        typeof $ri[t] !== "function")
      )
        throw TypeError("Compression method not supported: " + t);
      try {
        this.#s = new $ri[t](e);
      } catch (r) {
        throw new sTe(r, this.constructor);
      }
      ((this.#a = (r) => {
        if (this.#e) return;
        ((this.#e = !0), this.close(), this.emit("error", r));
      }),
        this.#s?.on("error", (r) => this.#a(new sTe(r))),
        this.once("end", () => this.close));
    }
    close() {
      if (this.#s) (this.#s.close(), (this.#s = void 0), this.emit("close"));
    }
    reset() {
      if (!this.#e) return ((0, Flr.default)(this.#s, "zlib binding closed"), this.#s.reset?.());
    }
    flush(e) {
      if (this.ended) return;
      if (typeof e !== "number") e = this.#i;
      this.write(Object.assign(A8.Buffer.alloc(0), { [Nlr]: e }));
    }
    end(e, t, r) {
      if (typeof e === "function") ((r = e), (t = void 0), (e = void 0));
      if (typeof t === "function") ((r = t), (t = void 0));
      if (e)
        if (t) this.write(e, t);
        else this.write(e);
      return (this.flush(this.#n), (this.#r = !0), super.end(r));
    }
    get ended() {
      return this.#r;
    }
    [n_e](e) {
      return super.write(e);
    }
    write(e, t, r) {
      if (typeof t === "function") ((r = t), (t = "utf8"));
      if (typeof e === "string") e = A8.Buffer.from(e, t);
      if (this.#e) return;
      (0, Flr.default)(this.#s, "zlib binding closed");
      let s = this.#s._handle,
        a = s.close;
      s.close = () => {};
      let H = this.#s.close;
      ((this.#s.close = () => {}), Ulr(!0));
      let u = void 0;
      try {
        let d = typeof e[Nlr] === "number" ? e[Nlr] : this.#t;
        ((u = this.#s._processChunk(e, d)), Ulr(!1));
      } catch (d) {
        (Ulr(!1), this.#a(new sTe(d, this.write)));
      } finally {
        if (this.#s)
          ((this.#s._handle = s), (s.close = a), (this.#s.close = H), this.#s.removeAllListeners("error"));
      }
      if (this.#s) this.#s.on("error", (d) => this.#a(new sTe(d, this.write)));
      let f;
      if (u)
        if (Array.isArray(u) && u.length > 0) {
          let d = u[0];
          f = this[n_e](A8.Buffer.from(d));
          for (let _ = 1; _ < u.length; _++) f = this[n_e](u[_]);
        } else f = this[n_e](A8.Buffer.from(u));
      if (r) r();
      return f;
    }
  }
  class oZ extends iIt {
    #e;
    #r;
    constructor(e, t) {
      ((e = e || {}),
        (e.flush = e.flush || w1.constants.Z_NO_FLUSH),
        (e.finishFlush = e.finishFlush || w1.constants.Z_FINISH),
        (e.fullFlushFlag = w1.constants.Z_FULL_FLUSH));
      super(e, t);
      ((this.#e = e.level), (this.#r = e.strategy));
    }
    params(e, t) {
      if (this.sawError) return;
      if (!this.handle) throw Error("cannot switch params when binding is closed");
      if (!this.handle.params) throw Error("not supported in this implementation");
      if (this.#e !== e || this.#r !== t) {
        (this.flush(w1.constants.Z_SYNC_FLUSH), (0, Flr.default)(this.handle, "zlib binding closed"));
        let r = this.handle.flush;
        this.handle.flush = (s, a) => {
          if (typeof s === "function") ((a = s), (s = this.flushFlag));
          (this.flush(s), a?.());
        };
        try {
          this.handle.params(e, t);
        } finally {
          this.handle.flush = r;
        }
        if (this.handle) ((this.#e = e), (this.#r = t));
      }
    }
  }
  Gd.Zlib = oZ;
  class Iri extends oZ {
    constructor(e) {
      super(e, "Deflate");
    }
  }
  Gd.Deflate = Iri;
  class Dri extends oZ {
    constructor(e) {
      super(e, "Inflate");
    }
  }
  Gd.Inflate = Dri;
  class yri extends oZ {
    #e;
    constructor(e) {
      super(e, "Gzip");
      this.#e = e && !!e.portable;
    }
    [n_e](e) {
      if (!this.#e) return super[n_e](e);
      return ((this.#e = !1), (e[9] = 255), super[n_e](e));
    }
  }
  Gd.Gzip = yri;
  class Mri extends oZ {
    constructor(e) {
      super(e, "Gunzip");
    }
  }
  Gd.Gunzip = Mri;
  class xri extends oZ {
    constructor(e) {
      super(e, "DeflateRaw");
    }
  }
  Gd.DeflateRaw = xri;
  class Sri extends oZ {
    constructor(e) {
      super(e, "InflateRaw");
    }
  }
  Gd.InflateRaw = Sri;
  class Tri extends oZ {
    constructor(e) {
      super(e, "Unzip");
    }
  }
  Gd.Unzip = Tri;
  class Blr extends iIt {
    constructor(e, t) {
      ((e = e || {}),
        (e.flush = e.flush || w1.constants.BROTLI_OPERATION_PROCESS),
        (e.finishFlush = e.finishFlush || w1.constants.BROTLI_OPERATION_FINISH),
        (e.fullFlushFlag = w1.constants.BROTLI_OPERATION_FLUSH));
      super(e, t);
    }
  }
  class vri extends Blr {
    constructor(e) {
      super(e, "BrotliCompress");
    }
  }
  Gd.BrotliCompress = vri;
  class bri extends Blr {
    constructor(e) {
      super(e, "BrotliDecompress");
    }
  }
  Gd.BrotliDecompress = bri;
  class Rlr extends iIt {
    constructor(e, t) {
      ((e = e || {}),
        (e.flush = e.flush || w1.constants.ZSTD_e_continue),
        (e.finishFlush = e.finishFlush || w1.constants.ZSTD_e_end),
        (e.fullFlushFlag = w1.constants.ZSTD_e_flush));
      super(e, t);
    }
  }
  class jri extends Rlr {
    constructor(e) {
      super(e, "ZstdCompress");
    }
  }
  Gd.ZstdCompress = jri;
  class Pri extends Rlr {
    constructor(e) {
      super(e, "ZstdDecompress");
    }
  }
  Gd.ZstdDecompress = Pri;
});

var mIt = Ie(function (Jfc, Pni) {
  var { Minipass: b5 } = Ny(),
    { MinipassSized: Sfr } = Uri(),
    jni = Fri(),
    { BUFFER: TRo } = jni,
    L4e = qlr(),
    Tfr;
  try {
    Tfr = vni().decode;
  } catch (e) {}
  var uZ = Symbol("Body internals"),
    s_e = Symbol("consumeBody");
  class vfr {
    constructor(e, t = {}) {
      let { size: r = 0, timeout: s = 0 } = t,
        a =
          e === void 0 || e === null
            ? null
            : bni(e)
              ? Buffer.from(e.toString())
              : $4e(e)
                ? e
                : Buffer.isBuffer(e)
                  ? e
                  : Object.prototype.toString.call(e) === "[object ArrayBuffer]"
                    ? Buffer.from(e)
                    : ArrayBuffer.isView(e)
                      ? Buffer.from(e.buffer, e.byteOffset, e.byteLength)
                      : b5.isStream(e)
                        ? e
                        : Buffer.from(String(e));
      if (
        ((this[uZ] = { body: a, disturbed: !1, error: null }),
        (this.size = r),
        (this.timeout = s),
        b5.isStream(a))
      )
        a.on("error", (H) => {
          let u =
            H.name === "AbortError"
              ? H
              : new L4e(`Invalid response while trying to fetch ${this.url}: ${H.message}`, "system", H);
          this[uZ].error = u;
        });
    }
    get body() {
      return this[uZ].body;
    }
    get bodyUsed() {
      return this[uZ].disturbed;
    }
    arrayBuffer() {
      return this[s_e]().then((e) => e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength));
    }
    blob() {
      let e = (this.headers && this.headers.get("content-type")) || "";
      return this[s_e]().then((t) => Object.assign(new jni([], { type: e.toLowerCase() }), { [TRo]: t }));
    }
    async json() {
      let e = await this[s_e]();
      try {
        return JSON.parse(e.toString());
      } catch (t) {
        throw new L4e(`invalid json response body at ${this.url} reason: ${t.message}`, "invalid-json");
      }
    }
    text() {
      return this[s_e]().then((e) => e.toString());
    }
    buffer() {
      return this[s_e]();
    }
    textConverted() {
      if (typeof Tfr !== "function")
        throw Error("The package `iconv-lite` must be installed to use the textConverted() function");
      return this[s_e]().then((e) => vRo(e, this.headers));
    }
    [s_e]() {
      if (this[uZ].disturbed) return Promise.reject(TypeError(`body used already for: ${this.url}`));
      if (((this[uZ].disturbed = !0), this[uZ].error)) return Promise.reject(this[uZ].error);
      if (this.body === null) return Promise.resolve(Buffer.alloc(0));
      if (Buffer.isBuffer(this.body)) return Promise.resolve(this.body);
      let e = $4e(this.body) ? this.body.stream() : this.body;
      if (!b5.isStream(e)) return Promise.resolve(Buffer.alloc(0));
      let t =
          this.size && e instanceof Sfr
            ? e
            : !this.size && e instanceof b5 && !(e instanceof Sfr)
              ? e
              : this.size
                ? new Sfr({ size: this.size })
                : new b5(),
        r =
          this.timeout && t.writable
            ? setTimeout(() => {
                t.emit(
                  "error",
                  new L4e(
                    `Response timeout while trying to fetch ${this.url} (over ${this.timeout}ms)`,
                    "body-timeout",
                  ),
                );
              }, this.timeout)
            : null;
      if (r && r.unref) r.unref();
      return new Promise((s) => {
        if (t !== e) (e.on("error", (a) => t.emit("error", a)), e.pipe(t));
        s();
      })
        .then(() => t.concat())
        .then((s) => (clearTimeout(r), s))
        .catch((s) => {
          if ((clearTimeout(r), s.name === "AbortError" || s.name === "FetchError")) throw s;
          else if (s.name === "RangeError")
            throw new L4e(
              `Could not create Buffer from response body for ${this.url}: ${s.message}`,
              "system",
              s,
            );
          else
            throw new L4e(
              `Invalid response body while trying to fetch ${this.url}: ${s.message}`,
              "system",
              s,
            );
        });
    }
    static clone(e) {
      if (e.bodyUsed) throw Error("cannot clone body after it is used");
      let t = e.body;
      if (b5.isStream(t) && typeof t.getBoundary !== "function") {
        let r = new b5(),
          s = new b5(),
          a = new b5();
        return (
          r.on("error", (H) => {
            (s.emit("error", H), a.emit("error", H));
          }),
          t.on("error", (H) => r.emit("error", H)),
          r.pipe(s),
          r.pipe(a),
          t.pipe(r),
          (e[uZ].body = s),
          a
        );
      } else return e.body;
    }
    static extractContentType(e) {
      return e === null || e === void 0
        ? null
        : typeof e === "string"
          ? "text/plain;charset=UTF-8"
          : bni(e)
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : $4e(e)
              ? e.type || null
              : Buffer.isBuffer(e)
                ? null
                : Object.prototype.toString.call(e) === "[object ArrayBuffer]"
                  ? null
                  : ArrayBuffer.isView(e)
                    ? null
                    : typeof e.getBoundary === "function"
                      ? `multipart/form-data;boundary=${e.getBoundary()}`
                      : b5.isStream(e)
                        ? null
                        : "text/plain;charset=UTF-8";
    }
    static getTotalBytes(e) {
      let { body: t } = e;
      return t === null || t === void 0
        ? 0
        : $4e(t)
          ? t.size
          : Buffer.isBuffer(t)
            ? t.length
            : t &&
                typeof t.getLengthSync === "function" &&
                ((t._lengthRetrievers && t._lengthRetrievers.length === 0) ||
                  (t.hasKnownLength && t.hasKnownLength()))
              ? t.getLengthSync()
              : null;
    }
    static writeToStream(e, t) {
      let { body: r } = t;
      if (r === null || r === void 0) e.end();
      else if (Buffer.isBuffer(r) || typeof r === "string") e.end(r);
      else ($4e(r) ? r.stream() : r).on("error", (a) => e.emit("error", a)).pipe(e);
      return e;
    }
  }
  Object.defineProperties(vfr.prototype, {
    body: { enumerable: !0 },
    bodyUsed: { enumerable: !0 },
    arrayBuffer: { enumerable: !0 },
    blob: { enumerable: !0 },
    json: { enumerable: !0 },
    text: { enumerable: !0 },
  });
  var bni = (e) =>
      typeof e !== "object" ||
      typeof e.append !== "function" ||
      typeof e.delete !== "function" ||
      typeof e.get !== "function" ||
      typeof e.getAll !== "function" ||
      typeof e.has !== "function" ||
      typeof e.set !== "function"
        ? !1
        : e.constructor.name === "URLSearchParams" ||
          Object.prototype.toString.call(e) === "[object URLSearchParams]" ||
          typeof e.sort === "function",
    $4e = (e) =>
      typeof e === "object" &&
      typeof e.arrayBuffer === "function" &&
      typeof e.type === "string" &&
      typeof e.stream === "function" &&
      typeof e.constructor === "function" &&
      typeof e.constructor.name === "string" &&
      /^(Blob|File)$/.test(e.constructor.name) &&
      /^(Blob|File)$/.test(e[Symbol.toStringTag]),
    vRo = (e, t) => {
      let r = t && t.get("content-type"),
        s = "utf-8",
        a;
      if (r) a = /charset=([^;]*)/i.exec(r);
      let H = e.slice(0, 1024).toString();
      if (!a && H) a = /<meta.+?charset=(['"])(.+?)\1/i.exec(H);
      if (!a && H) {
        if (((a = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(H)), !a)) {
          if (((a = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(H)), a))
            a.pop();
        }
        if (a) a = /charset=(.*)/i.exec(a.pop());
      }
      if (!a && H) a = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(H);
      if (a) {
        if (((s = a.pop()), s === "gb2312" || s === "gbk")) s = "gb18030";
      }
      if (s === "UTF-8") return e.toString("UTF-8");
      s = s
        .toString()
        .trim()
        .replace(/^latin[-_]?(\d+)$/i, "ISO-8859-$1")
        .replace(/^win(?:dows)?[-_]?(\d+)$/i, "WINDOWS-$1")
        .replace(/^utf[-_]?(\d+)$/i, "UTF-$1")
        .replace(/^ks_c_5601-1987$/i, "CP949")
        .replace(/^us[-_]?ascii$/i, "ASCII")
        .toUpperCase();
      try {
        return Tfr(e, s).toString();
      } catch {
        return e.toString("UTF-8");
      }
    };
  Pni.exports = vfr;
});
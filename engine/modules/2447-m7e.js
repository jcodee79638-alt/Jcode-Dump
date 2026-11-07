
var m7e = Ie(function (Jcc, GJn) {
  var ewo = Symbol.for("indent"),
    two = Symbol.for("newline"),
    rwo = /^\uFEFF/,
    nwo = /^\s*[{[]((?:\r?\n)+)([\s\t]*)/,
    iwo = /^(?:\{\}|\[\])((?:\r?\n)+)?$/,
    WJn = /^Unexpected token '?(.)'?(,)? /i,
    swo = (e) => {
      let t = e.charCodeAt(0).toString(16).toUpperCase();
      return `0x${t.length % 2 ? "0" : ""}${t}`;
    },
    VJn = (e) => String(e).replace(rwo, ""),
    mAr = (e, t, r = 0) => ({ message: `${e} while parsing ${t}`, position: r }),
    owo = (e, t, r = 20) => {
      let s = e.message;
      if (!t) return mAr(s, "empty string");
      let a = s.match(WJn),
        H = s.match(/ position\s+(\d+)/i);
      if (a) s = s.replace(WJn, `Unexpected token ${JSON.stringify(a[1])} (${swo(a[1])})$2 `);
      let u;
      if (H) u = +H[1];
      else if (s.match(/^Unexpected end of JSON.*/i)) u = t.length - 1;
      if (u == null) return mAr(s, `'${t.slice(0, r * 2)}'`);
      let f = u <= r ? 0 : u - r,
        d = u + r >= t.length ? t.length : u + r,
        _ = `${f ? "..." : ""}${t.slice(f, d)}${d === t.length ? "" : "..."}`;
      return mAr(s, `${t === _ ? "" : "near "}${JSON.stringify(_)}`, u);
    };
  class _Ar extends SyntaxError {
    constructor(e, t, r, s) {
      let a = owo(e, t, r);
      super(a.message);
      (Object.assign(this, a),
        (this.code = "EJSONPARSE"),
        (this.systemError = e),
        Error.captureStackTrace(this, s || this.constructor));
    }
    get name() {
      return this.constructor.name;
    }
    set name(e) {}
    get [Symbol.toStringTag]() {
      return this.constructor.name;
    }
  }
  var qJn = (e, t) => {
      let r = JSON.parse(e, t);
      if (r && typeof r === "object") {
        let s = e.match(iwo) || e.match(nwo) || [null, "", ""];
        ((r[two] =
          s[1] ??
          `
`),
          (r[ewo] = s[2] ?? "  "));
      }
      return r;
    },
    x0t = (e, t, r) => {
      let s = VJn(e);
      try {
        return qJn(s, t);
      } catch (a) {
        if (typeof e !== "string" && !Buffer.isBuffer(e)) {
          let H = Array.isArray(e) && e.length === 0 ? "an empty array" : String(e);
          throw Object.assign(TypeError(`Cannot parse ${H}`), { code: "EJSONPARSE", systemError: a });
        }
        throw new _Ar(a, s, r, x0t);
      }
    };
  GJn.exports = x0t;
  x0t.JSONParseError = _Ar;
  x0t.noExceptions = (e, t) => {
    try {
      return qJn(VJn(e), t);
    } catch {}
  };
});
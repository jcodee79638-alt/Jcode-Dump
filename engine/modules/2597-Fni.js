
var Fni = Ie(function (zfc, Nni) {
  var bRo = cr("http"),
    { STATUS_CODES: jRo } = bRo,
    Oni = _It(),
    Uni = mIt(),
    { clone: PRo, extractContentType: CRo } = Uni,
    lZ = Symbol("Response internals");
  class hIt extends Uni {
    constructor(e = null, t = {}) {
      super(e, t);
      let r = t.status || 200,
        s = new Oni(t.headers);
      if (e !== null && e !== void 0 && !s.has("Content-Type")) {
        let a = CRo(e);
        if (a) s.append("Content-Type", a);
      }
      this[lZ] = {
        url: t.url,
        status: r,
        statusText: t.statusText || jRo[r],
        headers: s,
        counter: t.counter,
        trailer: Promise.resolve(t.trailer || new Oni()),
      };
    }
    get trailer() {
      return this[lZ].trailer;
    }
    get url() {
      return this[lZ].url || "";
    }
    get status() {
      return this[lZ].status;
    }
    get ok() {
      return this[lZ].status >= 200 && this[lZ].status < 300;
    }
    get redirected() {
      return this[lZ].counter > 0;
    }
    get statusText() {
      return this[lZ].statusText;
    }
    get headers() {
      return this[lZ].headers;
    }
    clone() {
      return new hIt(PRo(this), {
        url: this.url,
        status: this.status,
        statusText: this.statusText,
        headers: this.headers,
        ok: this.ok,
        redirected: this.redirected,
        trailer: this.trailer,
      });
    }
    get [Symbol.toStringTag]() {
      return "Response";
    }
  }
  Nni.exports = hIt;
  Object.defineProperties(hIt.prototype, {
    url: { enumerable: !0 },
    status: { enumerable: !0 },
    ok: { enumerable: !0 },
    redirected: { enumerable: !0 },
    statusText: { enumerable: !0 },
    headers: { enumerable: !0 },
    clone: { enumerable: !0 },
  });
});
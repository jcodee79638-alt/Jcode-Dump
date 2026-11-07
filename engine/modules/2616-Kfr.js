
var Kfr = Ie(function (dpc, Jii) {
  var Rii = gii(),
    Wii = Bii(),
    Gii = BV(),
    Vii = { shared: !1, ignoreCargoCult: !0 },
    fWo = { status: 200, headers: {} },
    lTe = (e) => {
      let t = { method: e.method, url: e.url, headers: {}, compress: e.compress };
      return (
        e.headers.forEach((r, s) => {
          t.headers[s] = r;
        }),
        t
      );
    },
    qii = (e) => {
      let t = { status: e.status, headers: {} };
      return (
        e.headers.forEach((r, s) => {
          t.headers[s] = r;
        }),
        t
      );
    };
  class Xii {
    constructor({ entry: e, request: t, response: r, options: s }) {
      if (
        ((this.entry = e),
        (this.request = lTe(t)),
        (this.response = qii(r)),
        (this.options = s),
        (this.policy = new Rii(this.request, this.response, Vii)),
        this.entry)
      )
        this.policy._responseTime = this.entry.metadata.time;
    }
    static storable(e, t) {
      if (!t.cachePath) return !1;
      if (t.cache === "no-store") return !1;
      if (!["GET", "HEAD"].includes(e.method)) return !1;
      return new Rii(lTe(e), fWo, Vii).storable();
    }
    satisfies(e) {
      let t = lTe(e);
      if (this.request.headers.host !== t.headers.host) return !1;
      if (this.request.compress !== t.compress) return !1;
      let r = new Wii(this.request),
        s = new Wii(t);
      if (JSON.stringify(r.mediaTypes()) !== JSON.stringify(s.mediaTypes())) return !1;
      if (JSON.stringify(r.languages()) !== JSON.stringify(s.languages())) return !1;
      if (JSON.stringify(r.encodings()) !== JSON.stringify(s.encodings())) return !1;
      if (this.options.integrity) return Gii.parse(this.options.integrity).match(this.entry.integrity);
      return !0;
    }
    storable() {
      return this.policy.storable();
    }
    get mustRevalidate() {
      return !!this.policy._rescc["must-revalidate"];
    }
    needsRevalidation(e) {
      let t = lTe(e);
      return ((t.method = "GET"), !this.policy.satisfiesWithoutRevalidation(t));
    }
    responseHeaders() {
      return this.policy.responseHeaders();
    }
    revalidationHeaders(e) {
      let t = lTe(e);
      return this.policy.revalidationHeaders(t);
    }
    revalidated(e, t) {
      let r = lTe(e),
        s = qii(t);
      return !this.policy.revalidatedPolicy(r, s).modified;
    }
  }
  Jii.exports = Xii;
});
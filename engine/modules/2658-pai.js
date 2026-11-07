
var pai = Ie(function (ndc, fai) {
  var { Request: Hai, Response: Epr } = uTe(),
    { Minipass: cai } = Ny(),
    kqo = UEt(),
    d8 = e_e(),
    uai = cr("url"),
    Oqo = zfr(),
    Uqo = Kfr(),
    Ipr = tsi(),
    Nqo = JIt(),
    j4e = (e, t) => Object.prototype.hasOwnProperty.call(e, t),
    Fqo = ["accept-charset", "accept-encoding", "accept-language", "accept", "cache-control"],
    lai = [
      "cache-control",
      "content-encoding",
      "content-language",
      "content-type",
      "date",
      "etag",
      "expires",
      "last-modified",
      "link",
      "location",
      "pragma",
      "vary",
    ],
    Aai = (e, t, r) => {
      let s = {
        time: Date.now(),
        url: e.url,
        reqHeaders: {},
        resHeaders: {},
        options: { compress: r.compress != null ? r.compress : e.compress },
      };
      if (t.status !== 200 && t.status !== 304) s.status = t.status;
      for (let u of Fqo) if (e.headers.has(u)) s.reqHeaders[u] = e.headers.get(u);
      let a = e.headers.get("host"),
        H = new uai.URL(e.url);
      if (a && H.host !== a) s.reqHeaders.host = a;
      if (t.headers.has("vary")) {
        let u = t.headers.get("vary");
        if (u !== "*") {
          let f = u
            .trim()
            .toLowerCase()
            .split(/\s*,\s*/);
          for (let d of f) if (e.headers.has(d)) s.reqHeaders[d] = e.headers.get(d);
        }
      }
      for (let u of lai) if (t.headers.has(u)) s.resHeaders[u] = t.headers.get(u);
      for (let u of r.cacheAdditionalHeaders) if (t.headers.has(u)) s.resHeaders[u] = t.headers.get(u);
      return s;
    },
    KIt = Symbol("request"),
    zIt = Symbol("response"),
    QIt = Symbol("policy");
  class d_e {
    constructor({ entry: e, request: t, response: r, options: s }) {
      if (e)
        ((this.key = e.key),
          (this.entry = e),
          (this.entry.metadata.time = this.entry.metadata.time || this.entry.time));
      else this.key = Ipr(t);
      ((this.options = s), (this[KIt] = t), (this[zIt] = r), (this[QIt] = null));
    }
    static async find(e, t) {
      try {
        var r = await d8.index.compact(
          t.cachePath,
          Ipr(e),
          (a, H) => {
            let u = new d_e({ entry: a, options: t }),
              f = new d_e({ entry: H, options: t });
            return u.policy.satisfies(f.request);
          },
          {
            validateEntry: (a) => {
              if (a.metadata && a.metadata.resHeaders && a.metadata.resHeaders["content-encoding"] === null)
                return !1;
              if (a.integrity === null) return !!(a.metadata && a.metadata.status);
              return !0;
            },
          },
        );
      } catch (a) {
        return;
      }
      if (t.cache === "reload") return;
      let s;
      for (let a of r) {
        let H = new d_e({ entry: a, options: t });
        if (H.policy.satisfies(e)) {
          s = H;
          break;
        }
      }
      return s;
    }
    static async invalidate(e, t) {
      let r = Ipr(e);
      try {
        await d8.rm.entry(t.cachePath, r, { removeFully: !0 });
      } catch (s) {}
    }
    get request() {
      if (!this[KIt])
        this[KIt] = new Hai(this.entry.metadata.url, {
          method: "GET",
          headers: this.entry.metadata.reqHeaders,
          ...this.entry.metadata.options,
        });
      return this[KIt];
    }
    get response() {
      if (!this[zIt])
        this[zIt] = new Epr(null, {
          url: this.entry.metadata.url,
          counter: this.options.counter,
          status: this.entry.metadata.status || 200,
          headers: { ...this.entry.metadata.resHeaders, "content-length": this.entry.size },
        });
      return this[zIt];
    }
    get policy() {
      if (!this[QIt])
        this[QIt] = new Uqo({
          entry: this.entry,
          request: this.request,
          response: this.response,
          options: this.options,
        });
      return this[QIt];
    }
    async store(e) {
      if (
        this.request.method !== "GET" ||
        ![200, 301, 308].includes(this.response.status) ||
        !this.policy.storable()
      )
        return (this.response.headers.set("x-local-cache-status", "skip"), this.response);
      let t = this.response.headers.get("content-length"),
        r = {
          algorithms: this.options.algorithms,
          metadata: Aai(this.request, this.response, this.options),
          size: t,
          integrity: this.options.integrity,
          integrityEmitter: this.response.body.hasIntegrityEmitter && this.response.body,
        },
        s = null;
      if (this.response.status === 200) {
        let H,
          u,
          f = new Promise((_, L) => {
            ((H = _), (u = L));
          }).catch((_) => {
            s.emit("error", _);
          });
        ((s = new Oqo(
          { events: ["integrity", "size"] },
          new kqo({
            flush() {
              return f;
            },
          }),
        )),
          (s.hasIntegrityEmitter = !0));
        let d = () => {
          let _ = new cai(),
            L = d8.put.stream(this.options.cachePath, this.key, r);
          (L.on("integrity", (I) => s.emit("integrity", I)),
            L.on("size", (I) => s.emit("size", I)),
            _.pipe(L),
            L.promise().then(H, u),
            s.unshift(_),
            s.unshift(this.response.body));
        };
        (s.once("resume", d), s.once("end", () => s.removeListener("resume", d)));
      } else await d8.index.insert(this.options.cachePath, this.key, null, r);
      return (
        this.response.headers.set("x-local-cache", encodeURIComponent(this.options.cachePath)),
        this.response.headers.set("x-local-cache-key", encodeURIComponent(this.key)),
        this.response.headers.set("x-local-cache-mode", "stream"),
        this.response.headers.set("x-local-cache-status", e),
        this.response.headers.set("x-local-cache-time", new Date().toISOString()),
        new Epr(s, {
          url: this.response.url,
          status: this.response.status,
          headers: this.response.headers,
          counter: this.options.counter,
        })
      );
    }
    async respond(e, t, r) {
      let s;
      if (e === "HEAD" || [301, 308].includes(this.response.status)) s = this.response;
      else {
        let a = new cai(),
          H = { ...this.policy.responseHeaders() },
          u = () => {
            let f = d8.get.stream.byDigest(this.options.cachePath, this.entry.integrity, {
              memoize: this.options.memoize,
            });
            (f.on("error", async (d) => {
              if ((f.pause(), d.code === "EINTEGRITY"))
                await d8.rm.content(this.options.cachePath, this.entry.integrity, {
                  memoize: this.options.memoize,
                });
              if (d.code === "ENOENT" || d.code === "EINTEGRITY")
                await d_e.invalidate(this.request, this.options);
              (a.emit("error", d), f.resume());
            }),
              a.emit("integrity", this.entry.integrity),
              a.emit("size", Number(H["content-length"])),
              f.pipe(a));
          };
        (a.once("resume", u),
          a.once("end", () => a.removeListener("resume", u)),
          (s = new Epr(a, { url: this.entry.metadata.url, counter: t.counter, status: 200, headers: H })));
      }
      return (
        s.headers.set("x-local-cache", encodeURIComponent(this.options.cachePath)),
        s.headers.set("x-local-cache-hash", encodeURIComponent(this.entry.integrity)),
        s.headers.set("x-local-cache-key", encodeURIComponent(this.key)),
        s.headers.set("x-local-cache-mode", "stream"),
        s.headers.set("x-local-cache-status", r),
        s.headers.set("x-local-cache-time", new Date(this.entry.metadata.time).toUTCString()),
        s
      );
    }
    async revalidate(e, t) {
      let r = new Hai(e, { headers: this.policy.revalidationHeaders(e) });
      try {
        var s = await Nqo(r, { ...t, headers: void 0 });
      } catch (H) {
        if (!this.policy.mustRevalidate) return this.respond(e.method, t, "stale");
        throw H;
      }
      if (this.policy.revalidated(r, s)) {
        let H = Aai(e, s, t);
        for (let u of lai)
          if (!j4e(H.resHeaders, u) && j4e(this.entry.metadata.resHeaders, u))
            H.resHeaders[u] = this.entry.metadata.resHeaders[u];
        for (let u of t.cacheAdditionalHeaders) {
          let f = j4e(H.resHeaders, u),
            d = j4e(this.entry.metadata.resHeaders, u),
            _ = j4e(this.policy.response.headers, u);
          if (!f && d) H.resHeaders[u] = this.entry.metadata.resHeaders[u];
          if (!_ && f) this.policy.response.headers[u] = H.resHeaders[u];
        }
        try {
          await d8.index.insert(t.cachePath, this.key, this.entry.integrity, {
            size: this.entry.size,
            metadata: H,
          });
        } catch (u) {}
        return this.respond(e.method, t, "revalidated");
      }
      return new d_e({ request: e, response: s, options: t }).store("updated");
    }
  }
  fai.exports = d_e;
});
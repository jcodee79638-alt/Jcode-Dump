
var gii = Ie(function (cpc, $ii) {
  var b3o = new Set([200, 203, 204, 206, 300, 301, 308, 404, 405, 410, 414, 501]),
    j3o = new Set([200, 203, 204, 300, 301, 302, 303, 307, 308, 404, 405, 410, 414, 501]),
    P3o = new Set([500, 502, 503, 504]),
    C3o = {
      date: !0,
      connection: !0,
      "keep-alive": !0,
      "proxy-authenticate": !0,
      "proxy-authorization": !0,
      te: !0,
      trailer: !0,
      "transfer-encoding": !0,
      upgrade: !0,
    },
    w3o = { "content-length": !0, "content-encoding": !0, "transfer-encoding": !0, "content-range": !0 };
  function pZ(e) {
    let t = parseInt(e, 10);
    return isFinite(t) ? t : 0;
  }
  function k3o(e) {
    if (!e) return !0;
    return P3o.has(e.status);
  }
  function Wfr(e) {
    let t = {};
    if (!e) return t;
    let r = e.trim().split(/,/);
    for (let s of r) {
      let [a, H] = s.split(/=/, 2);
      t[a.trim()] = H === void 0 ? !0 : H.trim().replace(/^"|"$/g, "");
    }
    return t;
  }
  function O3o(e) {
    let t = [];
    for (let r in e) {
      let s = e[r];
      t.push(s === !0 ? r : r + "=" + s);
    }
    if (!t.length) return;
    return t.join(", ");
  }
  $ii.exports = class {
    constructor(
      t,
      r,
      { shared: s, cacheHeuristic: a, immutableMinTimeToLive: H, ignoreCargoCult: u, _fromObject: f } = {},
    ) {
      if (f) {
        this._fromObject(f);
        return;
      }
      if (!r || !r.headers) throw Error("Response headers missing");
      if (
        (this._assertRequestHasHeaders(t),
        (this._responseTime = this.now()),
        (this._isShared = s !== !1),
        (this._ignoreCargoCult = !!u),
        (this._cacheHeuristic = a !== void 0 ? a : 0.1),
        (this._immutableMinTtl = H !== void 0 ? H : 86400000),
        (this._status = "status" in r ? r.status : 200),
        (this._resHeaders = r.headers),
        (this._rescc = Wfr(r.headers["cache-control"])),
        (this._method = "method" in t ? t.method : "GET"),
        (this._url = t.url),
        (this._host = t.headers.host),
        (this._noAuthorization = !t.headers.authorization),
        (this._reqHeaders = r.headers.vary ? t.headers : null),
        (this._reqcc = Wfr(t.headers["cache-control"])),
        this._ignoreCargoCult && "pre-check" in this._rescc && "post-check" in this._rescc)
      )
        (delete this._rescc["pre-check"],
          delete this._rescc["post-check"],
          delete this._rescc["no-cache"],
          delete this._rescc["no-store"],
          delete this._rescc["must-revalidate"],
          (this._resHeaders = Object.assign({}, this._resHeaders, { "cache-control": O3o(this._rescc) })),
          delete this._resHeaders.expires,
          delete this._resHeaders.pragma);
      if (r.headers["cache-control"] == null && /no-cache/.test(r.headers.pragma))
        this._rescc["no-cache"] = !0;
    }
    now() {
      return Date.now();
    }
    storable() {
      return !!(
        !this._reqcc["no-store"] &&
        (this._method === "GET" ||
          this._method === "HEAD" ||
          (this._method === "POST" && this._hasExplicitExpiration())) &&
        j3o.has(this._status) &&
        !this._rescc["no-store"] &&
        (!this._isShared || !this._rescc.private) &&
        (!this._isShared || this._noAuthorization || this._allowsStoringAuthenticated()) &&
        (this._resHeaders.expires ||
          this._rescc["max-age"] ||
          (this._isShared && this._rescc["s-maxage"]) ||
          this._rescc.public ||
          b3o.has(this._status))
      );
    }
    _hasExplicitExpiration() {
      return !!(
        (this._isShared && this._rescc["s-maxage"]) ||
        this._rescc["max-age"] ||
        this._resHeaders.expires
      );
    }
    _assertRequestHasHeaders(t) {
      if (!t || !t.headers) throw Error("Request headers missing");
    }
    satisfiesWithoutRevalidation(t) {
      return !this.evaluateRequest(t).revalidation;
    }
    _evaluateRequestHitResult(t) {
      return { response: { headers: this.responseHeaders(), status: this._status }, revalidation: t };
    }
    _evaluateRequestRevalidation(t, r) {
      return { synchronous: r, headers: this.revalidationHeaders(t) };
    }
    _evaluateRequestMissResult(t) {
      return { response: void 0, revalidation: this._evaluateRequestRevalidation(t, !0) };
    }
    evaluateRequest(t) {
      if ((this._assertRequestHasHeaders(t), this._rescc["must-revalidate"]))
        return this._evaluateRequestMissResult(t);
      if (!this._requestMatches(t, !1)) return this._evaluateRequestMissResult(t);
      let r = Wfr(t.headers["cache-control"]);
      if (r["no-cache"] || /no-cache/.test(t.headers.pragma)) return this._evaluateRequestMissResult(t);
      if (r["max-age"] && this.age() > pZ(r["max-age"])) return this._evaluateRequestMissResult(t);
      if (r["min-fresh"] && this.maxAge() - this.age() < pZ(r["min-fresh"]))
        return this._evaluateRequestMissResult(t);
      if (this.stale()) {
        if ("max-stale" in r && (r["max-stale"] === !0 || r["max-stale"] > this.age() - this.maxAge()))
          return this._evaluateRequestHitResult(void 0);
        if (this.useStaleWhileRevalidate())
          return this._evaluateRequestHitResult(this._evaluateRequestRevalidation(t, !1));
        return this._evaluateRequestMissResult(t);
      }
      return this._evaluateRequestHitResult(void 0);
    }
    _requestMatches(t, r) {
      return !!(
        (!this._url || this._url === t.url) &&
        this._host === t.headers.host &&
        (!t.method || this._method === t.method || (r && t.method === "HEAD")) &&
        this._varyMatches(t)
      );
    }
    _allowsStoringAuthenticated() {
      return !!(this._rescc["must-revalidate"] || this._rescc.public || this._rescc["s-maxage"]);
    }
    _varyMatches(t) {
      if (!this._resHeaders.vary) return !0;
      let r = this._resHeaders.vary
        .trim()
        .toLowerCase()
        .split(/\s*,\s*/);
      for (let s of r) {
        if (s === "*") return !1;
        let a = Object.prototype.hasOwnProperty.call(t.headers, s) && t.headers[s],
          H = Object.prototype.hasOwnProperty.call(this._reqHeaders, s) && this._reqHeaders[s];
        if (a !== H) return !1;
      }
      return !0;
    }
    _copyWithoutHopByHopHeaders(t) {
      let r = {};
      for (let s in t) {
        if (C3o[s]) continue;
        r[s] = t[s];
      }
      if (t.connection) {
        let s = t.connection.trim().split(/\s*,\s*/);
        for (let a of s) delete r[a];
      }
      if (r.warning) {
        let s = r.warning.split(/,/).filter((a) => !/^\s*1[0-9][0-9]/.test(a));
        if (!s.length) delete r.warning;
        else r.warning = s.join(",").trim();
      }
      return r;
    }
    responseHeaders() {
      let t = this._copyWithoutHopByHopHeaders(this._resHeaders),
        r = this.age();
      if (r > 86400 && !this._hasExplicitExpiration() && this.maxAge() > 86400)
        t.warning = (t.warning ? `${t.warning}, ` : "") + '113 - "rfc7234 5.5.4"';
      return ((t.age = `${Math.round(r)}`), (t.date = new Date(this.now()).toUTCString()), t);
    }
    status() {
      return this._status;
    }
    date() {
      let t = Date.parse(this._resHeaders.date);
      if (isFinite(t)) return t;
      return this._responseTime;
    }
    age() {
      let t = this._ageValue(),
        r = (this.now() - this._responseTime) / 1000;
      return t + r;
    }
    _ageValue() {
      return pZ(this._resHeaders.age);
    }
    maxAge() {
      if (!this.storable() || this._rescc["no-cache"]) return 0;
      if (this._isShared && this._resHeaders["set-cookie"] && !this._rescc.public && !this._rescc.immutable)
        return 0;
      if (this._resHeaders.vary === "*") return 0;
      if (this._isShared) {
        if (this._rescc["proxy-revalidate"]) return 0;
        if (this._rescc["s-maxage"]) return pZ(this._rescc["s-maxage"]);
      }
      if (this._rescc["max-age"]) return pZ(this._rescc["max-age"]);
      let t = this._rescc.immutable ? this._immutableMinTtl : 0,
        r = this.date();
      if (this._resHeaders.expires) {
        let s = Date.parse(this._resHeaders.expires);
        if (Number.isNaN(s) || s < r) return 0;
        return Math.max(t, (s - r) / 1000);
      }
      if (this._resHeaders["last-modified"]) {
        let s = Date.parse(this._resHeaders["last-modified"]);
        if (isFinite(s) && r > s) return Math.max(t, ((r - s) / 1000) * this._cacheHeuristic);
      }
      return t;
    }
    timeToLive() {
      let t = this.maxAge() - this.age(),
        r = t + pZ(this._rescc["stale-if-error"]),
        s = t + pZ(this._rescc["stale-while-revalidate"]);
      return Math.round(Math.max(0, t, r, s) * 1000);
    }
    stale() {
      return this.maxAge() <= this.age();
    }
    _useStaleIfError() {
      return this.maxAge() + pZ(this._rescc["stale-if-error"]) > this.age();
    }
    useStaleWhileRevalidate() {
      let t = pZ(this._rescc["stale-while-revalidate"]);
      return t > 0 && this.maxAge() + t > this.age();
    }
    static fromObject(t) {
      return new this(void 0, void 0, { _fromObject: t });
    }
    _fromObject(t) {
      if (this._responseTime) throw Error("Reinitialized");
      if (!t || t.v !== 1) throw Error("Invalid serialization");
      ((this._responseTime = t.t),
        (this._isShared = t.sh),
        (this._cacheHeuristic = t.ch),
        (this._immutableMinTtl = t.imm !== void 0 ? t.imm : 86400000),
        (this._ignoreCargoCult = !!t.icc),
        (this._status = t.st),
        (this._resHeaders = t.resh),
        (this._rescc = t.rescc),
        (this._method = t.m),
        (this._url = t.u),
        (this._host = t.h),
        (this._noAuthorization = t.a),
        (this._reqHeaders = t.reqh),
        (this._reqcc = t.reqcc));
    }
    toObject() {
      return {
        v: 1,
        t: this._responseTime,
        sh: this._isShared,
        ch: this._cacheHeuristic,
        imm: this._immutableMinTtl,
        icc: this._ignoreCargoCult,
        st: this._status,
        resh: this._resHeaders,
        rescc: this._rescc,
        m: this._method,
        u: this._url,
        h: this._host,
        a: this._noAuthorization,
        reqh: this._reqHeaders,
        reqcc: this._reqcc,
      };
    }
    revalidationHeaders(t) {
      this._assertRequestHasHeaders(t);
      let r = this._copyWithoutHopByHopHeaders(t.headers);
      if ((delete r["if-range"], !this._requestMatches(t, !0) || !this.storable()))
        return (delete r["if-none-match"], delete r["if-modified-since"], r);
      if (this._resHeaders.etag)
        r["if-none-match"] = r["if-none-match"]
          ? `${r["if-none-match"]}, ${this._resHeaders.etag}`
          : this._resHeaders.etag;
      if (
        r["accept-ranges"] ||
        r["if-match"] ||
        r["if-unmodified-since"] ||
        (this._method && this._method != "GET")
      ) {
        if ((delete r["if-modified-since"], r["if-none-match"])) {
          let a = r["if-none-match"].split(/,/).filter((H) => !/^\s*W\//.test(H));
          if (!a.length) delete r["if-none-match"];
          else r["if-none-match"] = a.join(",").trim();
        }
      } else if (this._resHeaders["last-modified"] && !r["if-modified-since"])
        r["if-modified-since"] = this._resHeaders["last-modified"];
      return r;
    }
    revalidatedPolicy(t, r) {
      if ((this._assertRequestHasHeaders(t), this._useStaleIfError() && k3o(r)))
        return { policy: this, modified: !1, matches: !0 };
      if (!r || !r.headers) throw Error("Response headers missing");
      let s = !1;
      if (r.status !== void 0 && r.status != 304) s = !1;
      else if (r.headers.etag && !/^\s*W\//.test(r.headers.etag))
        s = this._resHeaders.etag && this._resHeaders.etag.replace(/^\s*W\//, "") === r.headers.etag;
      else if (this._resHeaders.etag && r.headers.etag)
        s = this._resHeaders.etag.replace(/^\s*W\//, "") === r.headers.etag.replace(/^\s*W\//, "");
      else if (this._resHeaders["last-modified"])
        s = this._resHeaders["last-modified"] === r.headers["last-modified"];
      else if (
        !this._resHeaders.etag &&
        !this._resHeaders["last-modified"] &&
        !r.headers.etag &&
        !r.headers["last-modified"]
      )
        s = !0;
      let a = {
        shared: this._isShared,
        cacheHeuristic: this._cacheHeuristic,
        immutableMinTimeToLive: this._immutableMinTtl,
        ignoreCargoCult: this._ignoreCargoCult,
      };
      if (!s) return { policy: new this.constructor(t, r, a), modified: r.status != 304, matches: !1 };
      let H = {};
      for (let f in this._resHeaders) H[f] = f in r.headers && !w3o[f] ? r.headers[f] : this._resHeaders[f];
      let u = Object.assign({}, r, { status: this._status, method: this._method, headers: H });
      return { policy: new this.constructor(t, u, a), modified: !1, matches: !0 };
    }
  };
});
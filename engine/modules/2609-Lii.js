
var Lii = Ie(function (Hpc, hii) {
  var _ii = cr("dns"),
    T3o = ["if-modified-since", "if-none-match", "if-unmodified-since", "if-match", "if-range"],
    v3o = (e) => {
      let { strictSSL: t, ...r } = { ...e };
      if (((r.method = r.method ? r.method.toUpperCase() : "GET"), t === void 0 || t === null))
        r.rejectUnauthorized = process.env.NODE_TLS_REJECT_UNAUTHORIZED !== "0";
      else r.rejectUnauthorized = t !== !1;
      if (!r.retry) r.retry = { retries: 0 };
      else if (typeof r.retry === "string") {
        let s = parseInt(r.retry, 10);
        if (isFinite(s)) r.retry = { retries: s };
        else r.retry = { retries: 0 };
      } else if (typeof r.retry === "number") r.retry = { retries: r.retry };
      else r.retry = { retries: 0, ...r.retry };
      if (
        ((r.dns = { ttl: 300000, lookup: _ii.lookup, ...r.dns }),
        (r.cache = r.cache || "default"),
        r.cache === "default")
      ) {
        if (Object.keys(r.headers || {}).some((a) => T3o.includes(a.toLowerCase()))) r.cache = "no-store";
      }
      if (((r.cacheAdditionalHeaders = r.cacheAdditionalHeaders || []), r.cacheManager && !r.cachePath))
        r.cachePath = r.cacheManager;
      return r;
    };
  hii.exports = v3o;
});
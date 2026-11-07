
var g7e = Ie(function (WAc, izn) {
  var sko = j0t(),
    { promiseRetry: oko } = L7e(),
    { log: ako } = mg(),
    Hko = JKn(),
    cko = ezn();
  izn.exports = (e, t = {}) => {
    let s = nzn()(t);
    if (s instanceof Error) return Promise.reject(s);
    let a = t.allowReplace || e[0] === "--no-replace-objects" ? e : ["--no-replace-objects", ...e],
      H = t.retry;
    if (H === null || H === void 0)
      H = {
        retries: t.fetchRetries || 2,
        factor: t.fetchRetryFactor || 10,
        maxTimeout: t.fetchRetryMaxtimeout || 60000,
        minTimeout: t.fetchRetryMintimeout || 1000,
      };
    return oko((u, f) => {
      if (f !== 1) ako.silly("git", `Retrying git command: ${a.join(" ")} attempt # ${f}`);
      return sko(s, a, cko(t)).catch((d) => {
        let _ = Hko(d);
        if (!_.shouldRetry(f)) throw _;
        u(_);
      });
    }, H);
  };
});
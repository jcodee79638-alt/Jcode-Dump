
var L7e = Ie(function (UAc, RKn) {
  var { RetryOperation: Vwo } = FKn(),
    BKn = (e, t) =>
      Math.min(
        Math.round(
          (1 + (t.randomize ? Math.random() : 0)) * Math.max(t.minTimeout, 1) * Math.pow(t.factor, e),
        ),
        t.maxTimeout,
      ),
    qwo = (e) => e?.code === "EPROMISERETRY" && Object.hasOwn(e, "retried"),
    Gwo = async (e, t = {}) => {
      let r = [];
      if (t instanceof Array) r = [...t];
      else {
        if (t.retries === 1 / 0) ((t.forever = !0), delete t.retries);
        let a = { retries: 10, factor: 2, minTimeout: 1000, maxTimeout: 1 / 0, randomize: !1, ...t };
        if (a.minTimeout > a.maxTimeout) throw Error("minTimeout is greater than maxTimeout");
        if (a.retries) {
          for (let H = 0; H < a.retries; H++) r.push(BKn(H, a));
          r.sort((H, u) => H - u);
        } else if (t.forever) r.push(BKn(0, a));
      }
      let s = new Vwo(r, { forever: t.forever, unref: t.unref, maxRetryTime: t.maxRetryTime });
      return new Promise(function (a, H) {
        s.attempt(async (u) => {
          try {
            let f = await e(
              (d) => {
                throw Object.assign(Error("Retrying"), { code: "EPROMISERETRY", retried: d });
              },
              u,
              s,
            );
            return a(f);
          } catch (f) {
            if (!qwo(f)) return H(f);
            if (!s.retry(f.retried || Error())) return H(f.retried);
          }
        });
      });
    };
  RKn.exports = { promiseRetry: Gwo };
});
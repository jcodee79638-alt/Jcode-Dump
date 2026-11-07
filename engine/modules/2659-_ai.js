
var _ai = Ie(function (idc, mai) {
  var { NotCachedError: Bqo } = Qii(),
    P4e = pai(),
    Rqo = JIt(),
    dai = async (e, t) => {
      let r = await P4e.find(e, t);
      if (!r) {
        if (t.cache === "only-if-cached") throw new Bqo(e.url);
        let a = await Rqo(e, t);
        return new P4e({ request: e, response: a, options: t }).store("miss");
      }
      if (t.cache === "no-cache") return r.revalidate(e, t);
      let s = r.policy.needsRevalidation(e);
      if (t.cache === "force-cache" || t.cache === "only-if-cached" || !s)
        return r.respond(e.method, t, s ? "stale" : "hit");
      return r.revalidate(e, t);
    };
  dai.invalidate = async (e, t) => {
    if (!t.cachePath) return;
    return P4e.invalidate(e, t);
  };
  mai.exports = dai;
});

var TAr = Ie(function (qAc, Hzn) {
  var _ko = g7e(),
    { LRUCache: hko } = aoe(),
    Lko = ozn(),
    azn = new hko({ max: 100, ttl: 300000 });
  Hzn.exports = async (e, t = {}) => {
    if (!t.noGitRevCache) {
      let a = azn.get(e);
      if (a) return a;
    }
    let { stdout: r } = await _ko(["ls-remote", e], t),
      s = Lko(
        r.trim().split(`
`),
      );
    return (azn.set(e, s), s);
  };
});
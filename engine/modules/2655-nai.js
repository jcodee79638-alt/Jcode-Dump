
var nai = Ie(function (edc, rai) {
  var { LRUCache: gqo } = aoe(),
    { normalizeOptions: Eqo, cacheOptions: Iqo } = Yfr(),
    { getProxy: Dqo, proxyCache: tai } = $pr(),
    XIt = Qfr(),
    GIt = eai(),
    b4e = new gqo({ max: 20 }),
    yqo = (e, { agent: t, proxy: r, noProxy: s, ...a } = {}) => {
      if (t != null) return t;
      e = new URL(e);
      let H = Dqo(e, { proxy: r, noProxy: s }),
        u = { ...Eqo(a), proxy: H },
        f = Iqo({ ...u, secureEndpoint: e.protocol === "https:" });
      if (b4e.has(f)) return b4e.get(f);
      let d = new GIt(u);
      return (b4e.set(f, d), d);
    };
  rai.exports = {
    getAgent: yqo,
    Agent: GIt,
    HttpAgent: GIt,
    HttpsAgent: GIt,
    cache: {
      proxy: tai,
      agent: b4e,
      dns: XIt.cache,
      clear: () => {
        (tai.clear(), b4e.clear(), XIt.cache.clear());
      },
    },
  };
});
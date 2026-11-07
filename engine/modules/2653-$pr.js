
var $pr = Ie(function (Ypc, zoi) {
  var { HttpProxyAgent: iqo } = vsi(),
    { HttpsProxyAgent: sqo } = Fsi(),
    { SocksProxyAgent: Koi } = Roi(),
    { LRUCache: oqo } = aoe(),
    { InvalidProxyProtocolError: aqo } = Lpr(),
    Hqo = new oqo({ max: 20 }),
    cqo = new Set(Koi.protocols),
    Aqo = new Set(["https_proxy", "http_proxy", "proxy", "no_proxy"]),
    v4e = Object.entries(process.env).reduce((e, [t, r]) => {
      if (((t = t.toLowerCase()), Aqo.has(t))) e[t] = r;
      return e;
    }, {}),
    uqo = (e) => {
      e = new URL(e);
      let t = e.protocol.slice(0, -1);
      if (cqo.has(t)) return Koi;
      if (t === "https" || t === "http") return [iqo, sqo];
      throw new aqo(e);
    },
    lqo = (e, t) => {
      if (typeof t === "string")
        t = t
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      if (!t || !t.length) return !1;
      let r = e.hostname.split(".").reverse();
      return t.some((s) => {
        let a = s.split(".").filter(Boolean).reverse();
        if (!a.length) return !1;
        for (let H = 0; H < a.length; H++) if (r[H] !== a[H]) return !1;
        return !0;
      });
    },
    fqo = (e, { proxy: t, noProxy: r }) => {
      if (((e = new URL(e)), !t))
        t = e.protocol === "https:" ? v4e.https_proxy : v4e.https_proxy || v4e.http_proxy || v4e.proxy;
      if (!r) r = v4e.no_proxy;
      if (!t || lqo(e, r)) return null;
      return new URL(t);
    };
  zoi.exports = { getProxyAgent: uqo, getProxy: fqo, proxyCache: Hqo };
});
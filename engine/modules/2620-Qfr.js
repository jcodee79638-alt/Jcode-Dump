
var Qfr = Ie(function (Lpc, rsi) {
  var { LRUCache: LWo } = aoe(),
    SIt = cr("dns"),
    xIt = new LWo({ max: 50 }),
    $Wo = ({
      family: e = 0,
      hints: t = SIt.ADDRCONFIG,
      all: r = !1,
      verbatim: s = void 0,
      ttl: a = 300000,
      lookup: H = SIt.lookup,
    }) => ({
      hints: t,
      lookup: (u, ...f) => {
        let d = f.pop(),
          _ = f[0] ?? {},
          L = { family: e, hints: t, all: r, verbatim: s, ...(typeof _ === "number" ? { family: _ } : _) },
          I = JSON.stringify({ hostname: u, ...L });
        if (xIt.has(I)) {
          let D = xIt.get(I);
          return process.nextTick(d, null, ...D);
        }
        H(u, L, (D, ...S) => {
          if (D) return d(D);
          return (xIt.set(I, S, { ttl: a }), d(null, ...S));
        });
      },
    });
  rsi.exports = { cache: xIt, getOptions: $Wo };
});
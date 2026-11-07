
var Yfr = Ie(function ($pc, ssi) {
  var nsi = Qfr(),
    gWo = (e) => {
      let t = parseInt(e.family ?? "0", 10),
        r = e.keepAlive ?? !0,
        s = {
          keepAliveMsecs: r ? 1000 : void 0,
          maxSockets: e.maxSockets ?? 15,
          maxTotalSockets: 1 / 0,
          maxFreeSockets: r ? 256 : void 0,
          scheduling: "fifo",
          ...e,
          family: t,
          keepAlive: r,
          timeouts: { idle: e.timeout ?? 0, connection: 0, response: 0, transfer: 0, ...e.timeouts },
          ...nsi.getOptions({ family: t, ...e.dns }),
        };
      return (delete s.timeout, delete s.headers, s);
    },
    isi = (e) => {
      let t = "",
        r = Object.entries(e).sort((s, a) => s[0] - a[0]);
      for (let [s, a] of r) {
        if (a == null) a = "null";
        else if (a instanceof URL) a = a.toString();
        else if (typeof a === "object") a = isi(a);
        t += `${s}:${a}:`;
      }
      return t;
    },
    EWo = ({ secureEndpoint: e, ...t }) =>
      isi({
        secureEndpoint: !!e,
        family: t.family,
        hints: t.hints,
        localAddress: t.localAddress,
        strictSsl: e ? !!t.rejectUnauthorized : !1,
        ca: e ? t.ca : null,
        cert: e ? t.cert : null,
        key: e ? t.key : null,
        keepAlive: t.keepAlive,
        keepAliveMsecs: t.keepAliveMsecs,
        maxSockets: t.maxSockets,
        maxTotalSockets: t.maxTotalSockets,
        maxFreeSockets: t.maxFreeSockets,
        scheduling: t.scheduling,
        timeouts: t.timeouts,
        proxy: t.proxy,
      });
  ssi.exports = { normalizeOptions: gWo, cacheOptions: EWo };
});
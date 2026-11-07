
var JIt = Ie(function (rdc, aai) {
  var { Minipass: xqo } = Ny(),
    p_e = uTe(),
    { promiseRetry: Sqo } = L7e(),
    oai = BV(),
    { log: sai } = mg(),
    { redact: Tqo } = y4e(),
    vqo = zfr(),
    { getAgent: bqo } = nai(),
    ETe = iai(),
    jqo = `${ETe.name}/${ETe.version} (+https://npm.im/${ETe.name})`,
    Pqo = [
      "ECONNRESET",
      "ECONNREFUSED",
      "EADDRINUSE",
      "ETIMEDOUT",
      "ECONNECTIONTIMEOUT",
      "EIDLETIMEOUT",
      "ERESPONSETIMEOUT",
      "ETRANSFERTIMEOUT",
    ],
    Cqo = ["request-timeout"],
    wqo = (e, t) => {
      let r = bqo(e.url, { ...t, signal: void 0 });
      if (!e.headers.has("connection")) e.headers.set("connection", r ? "keep-alive" : "close");
      if (!e.headers.has("user-agent")) e.headers.set("user-agent", jqo);
      let s = { ...t, agent: r, redirect: "manual" };
      return Sqo(async (a, H) => {
        let u = new p_e.Request(e, s),
          f = Tqo(u.url);
        try {
          let d = await p_e(u, s);
          if (s.integrity && d.status === 200) {
            let I = oai.integrityStream({ algorithms: s.algorithms, integrity: s.integrity, size: s.size }),
              D = new vqo({ events: ["integrity", "size"] }, d.body, I);
            (I.on("integrity", (S) => D.emit("integrity", S)),
              I.on("size", (S) => D.emit("size", S)),
              (d = new p_e.Response(D, d)),
              (d.body.hasIntegrityEmitter = !0));
          }
          d.headers.set("x-fetch-attempts", H);
          let _ = xqo.isStream(u.body);
          if (u.method !== "POST" && !_ && ([408, 420, 429].includes(d.status) || d.status >= 500)) {
            if (typeof t.onRetry === "function") t.onRetry(d);
            return (sai.http("fetch", `${u.method} ${f} attempt ${H} failed with ${d.status}`), a(d));
          }
          return d;
        } catch (d) {
          let _ = d.code === "EPROMISERETRY" ? d.retried.code : d.code,
            L = d.retried instanceof p_e.Response || (Pqo.includes(_) && Cqo.includes(d.type));
          if (u.method === "POST" || L) throw d;
          if (typeof t.onRetry === "function") t.onRetry(d);
          return (sai.http("fetch", `${u.method} ${f} attempt ${H} failed with ${d.code}`), a(d));
        }
      }, t.retry).catch((a) => {
        if (a.status >= 400 && a.type !== "system") return a;
        throw a;
      });
    };
  aai.exports = wqo;
});
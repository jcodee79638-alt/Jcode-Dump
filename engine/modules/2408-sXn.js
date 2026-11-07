
var sXn = Ie(function (nXn) {
  Object.defineProperty(nXn, "__esModule", { value: !0 });
  nXn.compressAndSend = nXn.sendWithHttp = void 0;
  var Y5n = cr("zlib"),
    Z5n = cr("stream"),
    Soe = X5n(),
    eXn = l0t(),
    tXn = z5n(),
    Q5n = `OTel-OTLP-Exporter-JavaScript/${tXn.VERSION}`;
  function WPo(e, t, r, s, a, H, u, f) {
    return new Promise((d) => {
      let _ = new URL(t);
      if (a) r["User-Agent"] = `${a} ${Q5n}`;
      else r["User-Agent"] = Q5n;
      let L = { hostname: _.hostname, port: _.port, path: _.pathname, method: "POST", headers: r, agent: H },
        I = e(L, (D) => {
          let S = [];
          (D.on("data", (T) => S.push(T)),
            D.on("end", () => {
              if (D.statusCode && D.statusCode <= 299) d({ status: "success", data: Buffer.concat(S) });
              else if (D.statusCode && Soe.isExportHTTPErrorRetryable(D.statusCode))
                d({
                  status: "retryable",
                  retryInMillis: Soe.parseRetryAfterToMills(D.headers["retry-after"]),
                });
              else {
                let T = new eXn.OTLPExporterError(D.statusMessage, D.statusCode, Buffer.concat(S).toString());
                d({ status: "failure", error: T });
              }
            }),
            D.on("error", (T) => {
              if (D.statusCode && D.statusCode <= 299) d({ status: "success" });
              else if (D.statusCode && Soe.isExportHTTPErrorRetryable(D.statusCode))
                d({
                  status: "retryable",
                  error: T,
                  retryInMillis: Soe.parseRetryAfterToMills(D.headers["retry-after"]),
                });
              else d({ status: "failure", error: T });
            }));
        });
      (I.setTimeout(f, () => {
        (I.destroy(), d({ status: "retryable", error: Error("Request timed out") }));
      }),
        I.on("error", (D) => {
          if (qPo(D)) d({ status: "retryable", error: D });
          else d({ status: "failure", error: D });
        }),
        rXn(I, s, u, (D) => {
          d({ status: "failure", error: D });
        }));
    });
  }
  nXn.sendWithHttp = WPo;
  function rXn(e, t, r, s) {
    let a = VPo(r);
    if (t === "gzip")
      (e.setHeader("Content-Encoding", "gzip"), (a = a.on("error", s).pipe(Y5n.createGzip()).on("error", s)));
    a.pipe(e).on("error", s);
  }
  nXn.compressAndSend = rXn;
  function VPo(e) {
    let t = new Z5n.Readable();
    return (t.push(e), t.push(null), t);
  }
  function qPo(e) {
    let t = new Set([
      "ECONNRESET",
      "ECONNREFUSED",
      "EPIPE",
      "ETIMEDOUT",
      "EAI_AGAIN",
      "ENOTFOUND",
      "ENETUNREACH",
      "EHOSTUNREACH",
    ]);
    if ("code" in e && typeof e.code === "string") return t.has(e.code);
    return !1;
  }
});
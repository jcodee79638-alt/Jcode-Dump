
var uTe = Ie(function (epc, zni) {
  var { URL: I4e } = cr("url"),
    VRo = cr("http"),
    qRo = cr("https"),
    HB = Wlr(),
    { Minipass: Jni } = Ny(),
    GRo = mIt(),
    { writeToStream: XRo, getTotalBytes: JRo } = GRo,
    a_e = Fni(),
    Ofr = _It(),
    { createHeadersLenient: Kni } = Ofr,
    D4e = Vni(),
    { getNodeRequestOptions: KRo } = D4e,
    Voe = qlr(),
    kfr = Xni(),
    fZ = async (e, t) => {
      if (/^data:/.test(e)) {
        let r = new D4e(e, t);
        return Promise.resolve().then(
          () =>
            new Promise((s, a) => {
              let H, u;
              try {
                let { pathname: _, search: L } = new I4e(e),
                  I = _.split(",");
                if (I.length < 2) throw Error("invalid data: URI");
                let D = I.shift(),
                  S = /;base64$/.test(D);
                H = S ? D.slice(0, -7) : D;
                let T = decodeURIComponent(I.join(",") + L);
                u = S ? Buffer.from(T, "base64") : Buffer.from(T);
              } catch (_) {
                return a(new Voe(`[${r.method}] ${r.url} invalid URL, ${_.message}`, "system", _));
              }
              let { signal: f } = r;
              if (f && f.aborted) return a(new kfr("The user aborted a request."));
              let d = { "Content-Length": u.length };
              if (H) d["Content-Type"] = H;
              return s(new a_e(u, { headers: d }));
            }),
        );
      }
      return new Promise((r, s) => {
        let a = new D4e(e, t),
          H;
        try {
          H = KRo(a);
        } catch (T) {
          return s(T);
        }
        let u = (H.protocol === "https:" ? qRo : VRo).request,
          { signal: f } = a,
          d = null,
          _ = () => {
            let T = new kfr("The user aborted a request.");
            if ((s(T), Jni.isStream(a.body) && typeof a.body.destroy === "function")) a.body.destroy(T);
            if (d && d.body) d.body.emit("error", T);
          };
        if (f && f.aborted) return _();
        let L = () => {
            (_(), I());
          },
          I = () => {
            if ((D.abort(), f)) f.removeEventListener("abort", L);
            clearTimeout(S);
          },
          D = u(H);
        if (f) f.addEventListener("abort", L);
        let S = null;
        if (a.timeout)
          D.once("socket", () => {
            S = setTimeout(() => {
              (s(new Voe(`network timeout at: ${a.url}`, "request-timeout")), I());
            }, a.timeout);
          });
        (D.on("error", (T) => {
          if (D.res) D.res.emit("error", T);
          (s(new Voe(`request to ${a.url} failed, reason: ${T.message}`, "system", T)), I());
        }),
          D.on("response", (T) => {
            clearTimeout(S);
            let C = Kni(T.headers);
            if (fZ.isRedirect(T.statusCode)) {
              let se = C.get("Location"),
                ae = null;
              try {
                ae = se === null ? null : new I4e(se, a.url).toString();
              } catch {
                if (a.redirect !== "manual") {
                  (s(
                    new Voe(`uri requested responds with an invalid redirect URL: ${se}`, "invalid-redirect"),
                  ),
                    I());
                  return;
                }
              }
              if (a.redirect === "error") {
                (s(
                  new Voe(
                    `uri requested responds with a redirect, redirect mode is set to error: ${a.url}`,
                    "no-redirect",
                  ),
                ),
                  I());
                return;
              } else if (a.redirect === "manual") {
                if (ae !== null)
                  try {
                    C.set("Location", ae);
                  } catch (z) {
                    s(z);
                  }
              } else if (a.redirect === "follow" && ae !== null) {
                if (a.counter >= a.follow) {
                  (s(new Voe(`maximum redirect reached at: ${a.url}`, "max-redirect")), I());
                  return;
                }
                if (T.statusCode !== 303 && a.body && JRo(a) === null) {
                  (s(
                    new Voe(
                      "Cannot follow redirect with body being a readable stream",
                      "unsupported-redirect",
                    ),
                  ),
                    I());
                  return;
                }
                a.headers.set("host", new I4e(ae).host);
                let z = {
                    headers: new Ofr(a.headers),
                    follow: a.follow,
                    counter: a.counter + 1,
                    agent: a.agent,
                    compress: a.compress,
                    method: a.method,
                    body: a.body,
                    signal: a.signal,
                    timeout: a.timeout,
                  },
                  Ae = new I4e(a.url),
                  le = new I4e(ae);
                if (Ae.hostname !== le.hostname)
                  (z.headers.delete("authorization"), z.headers.delete("cookie"));
                if (
                  T.statusCode === 303 ||
                  ((T.statusCode === 301 || T.statusCode === 302) && a.method === "POST")
                )
                  ((z.method = "GET"), (z.body = void 0), z.headers.delete("content-length"));
                (r(fZ(new D4e(ae, z))), I());
                return;
              }
            }
            T.once("end", () => f && f.removeEventListener("abort", L));
            let O = new Jni();
            (O.on("error", I),
              T.on("error", (se) => O.emit("error", se)),
              T.on("data", (se) => O.write(se)),
              T.on("end", () => O.end()));
            let B = {
                url: a.url,
                status: T.statusCode,
                statusText: T.statusMessage,
                headers: C,
                size: a.size,
                timeout: a.timeout,
                counter: a.counter,
                trailer: new Promise((se) => T.on("end", () => se(Kni(T.trailers)))),
              },
              V = C.get("Content-Encoding");
            if (
              !a.compress ||
              a.method === "HEAD" ||
              V === null ||
              T.statusCode === 204 ||
              T.statusCode === 304
            ) {
              ((d = new a_e(O, B)), r(d));
              return;
            }
            let q = { flush: HB.constants.Z_SYNC_FLUSH, finishFlush: HB.constants.Z_SYNC_FLUSH };
            if (V === "gzip" || V === "x-gzip") {
              let se = new HB.Gunzip(q);
              ((d = new a_e(O.on("error", (ae) => se.emit("error", ae)).pipe(se), B)), r(d));
              return;
            }
            if (V === "deflate" || V === "x-deflate") {
              T.once("data", (se) => {
                let ae = (se[0] & 15) === 8 ? new HB.Inflate() : new HB.InflateRaw();
                (O.on("error", (z) => ae.emit("error", z)).pipe(ae), (d = new a_e(ae, B)), r(d));
              });
              return;
            }
            if (V === "br") {
              try {
                var Z = new HB.BrotliDecompress();
              } catch (se) {
                (s(se), I());
                return;
              }
              (O.on("error", (se) => Z.emit("error", se)).pipe(Z), (d = new a_e(Z, B)), r(d));
              return;
            }
            ((d = new a_e(O, B)), r(d));
          }),
          XRo(D, a));
      });
    };
  zni.exports = fZ;
  fZ.isRedirect = (e) => e === 301 || e === 302 || e === 303 || e === 307 || e === 308;
  fZ.Headers = Ofr;
  fZ.Request = D4e;
  fZ.Response = a_e;
  fZ.FetchError = Voe;
  fZ.AbortError = kfr;
});
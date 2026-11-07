
var Dun = "~effect/http/HttpClient",
  gy,
  xRe,
  RU,
  Mun = (e, t) => {
    let r = Object.create(aRs);
    return (
      (r.preprocess = t),
      (r.postprocess = e),
      (r.execute = function (s) {
        return e(t(s));
      }),
      r
    );
  },
  aRs,
  xun = (e) =>
    Mun(
      (t) =>
        Hi(t, (r) =>
          hl((s) => {
            let a = ARs.get(r),
              H = a ?? new AbortController(),
              u = FZt(r.url, r.urlParams, OL(r.hash));
            if (xm(u)) return bn(new N6({ reason: new wZt({ request: r, cause: u.failure }) }));
            let f = u.success;
            if (s.getRef(hye) || s.getRef(HRs)(r)) {
              let _ = e(r, f, H.signal, s);
              if (a) return _;
              return q0((L) =>
                XC(L(_), {
                  onSuccess(I) {
                    return (Hpt.register(I, H), Jt(new zZt(I, H)));
                  },
                  onFailure(I) {
                    if (xW(I)) H.abort();
                    return NL(I);
                  },
                }),
              );
            }
            return Uye(s.getRef(cRs)(r), { kind: "client" }, (_) => {
              if (
                (_.attribute("http.request.method", r.method),
                _.attribute("server.address", f.origin),
                f.port !== "")
              )
                _.attribute("server.port", +f.port);
              (_.attribute("url.full", f.toString()),
                _.attribute("url.path", f.pathname),
                _.attribute("url.scheme", f.protocol.slice(0, -1)));
              let L = f.search.slice(1);
              if (L !== "") _.attribute("url.query", L);
              let I = s.getRef(x1e),
                D = Yie(r.headers, I);
              for (let S in D) _.attribute(`http.request.header.${S}`, String(D[S]));
              return (
                (r = s.getRef(QZt) ? YW(r, gun(_)) : r),
                q0((S) =>
                  S(e(r, f, H.signal, s)).pipe(
                    DQt(_, { captureStackTrace: !1 }),
                    XC({
                      onSuccess: (T) => {
                        _.attribute("http.response.status_code", T.status);
                        let C = Yie(T.headers, I);
                        for (let O in C) _.attribute(`http.response.header.${O}`, String(C[O]));
                        if (a) return Jt(T);
                        return (Hpt.register(T, H), Jt(new zZt(T, H)));
                      },
                      onFailure(T) {
                        if (!a && xW(T)) H.abort();
                        return NL(T);
                      },
                    }),
                  ),
                )
              );
            });
          }),
        ),
      Jt,
    ),
  SRe,
  HRs,
  QZt,
  cRs,
  Sun = (e) =>
    Es(gy)(
      M6((t) =>
        Vn(e, (r) =>
          xRe(
            r,
            iBe((s) => _I(t, s)),
          ),
        ),
      ),
    ),
  Hpt,
  ARs,
  zZt,
  yun = (e) => tQt(e) || uRs(e),
  uRs = (e) =>
    S1e(e) &&
    (e.reason._tag === "TransportError" || (e.reason._tag === "StatusCodeError" && Tun(e.reason.response))),
  Tun = (e) =>
    e.status === 408 ||
    e.status === 429 ||
    e.status === 500 ||
    e.status === 502 ||
    e.status === 503 ||
    e.status === 504;

var Ppt = ne(() => {
  Jq();
  YA();
  BH();
  KH();
  gE();
  Hf();
  _ie();
  gQ();
  U6();
  tde();
  eV();
  eV();
  p2();
  KZt();
  Eer();
  ((Iln = new WeakSet()),
    (o3s = bA("effect/http/HttpMiddleware/TracerDisabledWhen", { defaultValue: () => dW })),
    (a3s = bA("@effect/platform/HttpMiddleware/SpanNameGenerator", {
      defaultValue: () => (e) => `http.server ${e.method}`,
    })),
    (kRe = Eln((e) =>
      hl((t) => {
        let r = cg(t.context, Md),
          s = s3s(r.url);
        return Ysn(
          Hi(_h(e), (a) => {
            if (Iln.has(r.source)) return a;
            else if (a._tag === "Failure") {
              let [H, u] = oer(a.cause);
              return Zu(
                wU(Dpe(uD(u, () => "Sent HTTP Response")), {
                  "http.method": r.method,
                  "http.url": s,
                  "http.status": H.status,
                }),
                a,
              );
            }
            return Zu(
              wU(Dpe("Sent HTTP response"), {
                "http.method": r.method,
                "http.url": s,
                "http.status": a.value.status,
              }),
              a,
            );
          }),
          "http.span",
        );
      }),
    )),
    (Ier = Eln((e) =>
      hl((t) => {
        let r = cg(t.context, Md);
        if (!t.getRef(Gin) || t.getRef(o3s)(r)) return e;
        let a = t.getRef(a3s),
          H = bye(t, a(r), { parent: OL(Eun(r.headers)), kind: "server" }),
          u = t.context;
        return (
          t.setContext(Oh(t.context, IW, H)),
          sBe(
            e,
            (f) => {
              t.setContext(u);
              let d = t.getRef(y6).currentTimeNanosUnsafe();
              t.currentDispatcher.scheduleTask(() => {
                let _ = ger(r);
                if (Nu(_) && (_.value.username !== "" || _.value.password !== ""))
                  ((_.value.username = "REDACTED"), (_.value.password = "REDACTED"));
                let L = t.getRef(x1e),
                  I = Yie(r.headers, L);
                if ((H.attribute("http.request.method", r.method), Nu(_))) {
                  if (
                    (H.attribute("url.full", _.value.toString()),
                    H.attribute("url.path", _.value.pathname),
                    _.value.search.slice(1) !== "")
                  )
                    H.attribute("url.query", _.value.search.slice(1));
                  H.attribute("url.scheme", _.value.protocol.slice(0, -1));
                }
                if (r.headers["user-agent"] !== void 0)
                  H.attribute("user_agent.original", r.headers["user-agent"]);
                for (let T in I) H.attribute(`http.request.header.${T}`, String(I[T]));
                if (Nu(r.remoteAddress)) H.attribute("client.address", r.remoteAddress.value);
                let D = Uun(f);
                H.attribute("http.response.status_code", D.status);
                let S = Yie(D.headers, L);
                for (let T in S) H.attribute(`http.response.header.${T}`, String(S[T]));
                H.end(d, f);
              }, 0);
              return;
            },
            !0,
          )
        );
      }),
    )));
});
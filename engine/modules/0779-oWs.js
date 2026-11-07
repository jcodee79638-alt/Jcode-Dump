
var oWs,
  aWs = (e, t) => {
    let r = Cpt(e, Xfn, t.middleware);
    return hl((s) => {
      let a = s.context;
      return Jt(function (u, f) {
        let d = new Map(a.mapUnsafe);
        d.set(Md.key, new zpt(u, f));
        let _ = Pj(G0(B0(d))(r), t.scope);
        f.on("close", () => {
          if (!f.writableEnded) _.interruptUnsafe(s.id, ede.annotation);
        });
      });
    });
  },
  HWs = (e, t, r) => {
    let s = Cpt(t, Xfn, r.middleware);
    return hl((a) => {
      let H = a.context;
      return Jt(function (f, d, _) {
        let L = void 0,
          I = () => {
            if (L === void 0)
              ((L = new Ger.ServerResponse(f)),
                L.assignSocket(d),
                L.on("finish", () => {
                  d.end();
                }));
            return L;
          },
          D = der(
            Hi(e, (C) =>
              Bd(
                Fd((O) =>
                  C.handleUpgrade(f, d, _, (B) => {
                    O(Jt(B));
                  }),
                ),
                (O) => jn(() => O.close()),
              ),
            ),
          ),
          S = new Map(H.mapUnsafe);
        S.set(Md.key, new zpt(f, I, D));
        let T = Pj(G0(B0(S))(s), r.scope);
        d.on("close", () => {
          if (!d.writableEnded) T.interruptUnsafe(a.id, ede.annotation);
        });
      });
    });
  },
  zpt,
  cWs,
  AWs,
  uWs = (e, t) => VC(cWs(e, t), AWs),
  Xfn = (e, t) => {
    let r = e.resolvedResponse;
    if (r.writableEnded) return ti;
    let s = t.headers;
    if (!Qft(t.cookies)) {
      s = { ...s };
      let H = Yft(t.cookies);
      if (s["set-cookie"] !== void 0) H.push(s["set-cookie"]);
      s["set-cookie"] = H;
    }
    if (e.method === "HEAD")
      return (
        r.writeHead(t.status, s),
        Fd((H) => {
          r.end(() => H(ti));
        })
      );
    let a = t.body;
    switch (a._tag) {
      case "Empty":
        return (r.writeHead(t.status, s), r.end(), ti);
      case "Raw": {
        if (
          (r.writeHead(t.status, s),
          typeof a.body === "object" &&
            a.body !== null &&
            "pipe" in a.body &&
            typeof a.body.pipe === "function")
        )
          return bl({
            try: (H) => sWs(a.body, r, { signal: H, end: !0 }),
            catch: (H) =>
              new Nv({
                reason: new mpt({
                  request: e,
                  response: t,
                  description: "Error writing raw response",
                  cause: H,
                }),
              }),
          }).pipe(S6, Oye(qer(r, t)));
        return Fd((H) => {
          r.end(a.body, () => H(ti));
        });
      }
      case "Uint8Array": {
        if ((r.writeHead(t.status, s), a.body.length < 1048576)) return (r.end(a.body), ti);
        return Fd((H) => {
          r.end(a.body, () => H(ti));
        });
      }
      case "FormData":
        return yH(() => {
          let H = new globalThis.Response(a.formData);
          return (
            r.writeHead(t.status, { ...s, ...Object.fromEntries(H.headers) }),
            Fd((u, f) => {
              iWs
                .fromWeb(H.body, { signal: f })
                .pipe(r)
                .on("error", (d) => {
                  u(
                    bn(
                      new Nv({
                        reason: new mpt({
                          request: e,
                          response: t,
                          description: "Error writing FormData response",
                          cause: d,
                        }),
                      }),
                    ),
                  );
                })
                .once("finish", () => {
                  u(ti);
                });
            }).pipe(S6, Oye(qer(r, t)))
          );
        });
      case "Stream": {
        r.writeHead(t.status, s);
        let H = CW();
        return (
          r.on("drain", () => H.openUnsafe()),
          a.stream.pipe(
            qYt,
            dft((u) => {
              let f = !1;
              for (let d = 0; d < u.length; d++) {
                let _ = r.write(u[d]);
                if (!_ && !f) ((f = !0), H.closeUnsafe());
                else if (_ && f) f = !1;
              }
              if (!f) return ti;
              return H.await;
            }),
            S6,
            XC({ onSuccess: () => jn(() => r.end()), onFailure: qer(r, t) }),
          )
        );
      }
    }
  },
  qer = (e, t) => (r) =>
    Hi(bRe(r), ([s, a]) => {
      let H = e.headersSent;
      if (!H) e.writeHead(s.status);
      if (!e.writableEnded) e.end();
      return NL(H ? kin(r, Vut(t)) : a);
    });
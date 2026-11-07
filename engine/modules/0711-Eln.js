
var Eln = (e) => e,
  Iln,
  s3s = (e) => {
    let t = e.indexOf("?"),
      r = e.indexOf("#");
    if (t === -1) return r === -1 ? e : e.slice(0, r);
    if (r === -1) return e.slice(0, t);
    return e.slice(0, Math.min(t, r));
  },
  Dln = (e) =>
    hl((t) => {
      let r = cg(t.context, Md);
      return (Iln.add(r.source), e);
    }),
  o3s,
  a3s,
  kRe,
  Ier,
  yln = (e) => {
    let t = {
        allowedOrigins: e?.allowedOrigins ?? [],
        allowedMethods: e?.allowedMethods ?? ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        allowedHeaders: e?.allowedHeaders ?? [],
        exposedHeaders: e?.exposedHeaders ?? [],
        credentials: e?.credentials ?? !1,
        maxAge: e?.maxAge,
      },
      r = typeof t.allowedOrigins === "function" ? t.allowedOrigins : (D) => t.allowedOrigins.includes(D),
      s =
        typeof t.allowedOrigins === "function" || t.allowedOrigins.length > 1
          ? (D) => {
              if (!r(D)) return;
              return { "access-control-allow-origin": D, vary: "Origin" };
            }
          : t.allowedOrigins.length === 0
            ? ph({ "access-control-allow-origin": "*" })
            : ph({ "access-control-allow-origin": t.allowedOrigins[0], vary: "Origin" }),
      a =
        t.allowedMethods.length > 0
          ? { "access-control-allow-methods": t.allowedMethods.join(", ") }
          : void 0,
      H = t.credentials ? { "access-control-allow-credentials": "true" } : void 0,
      u = (D) => {
        if (t.allowedHeaders.length === 0 && D)
          return { vary: "Access-Control-Request-Headers", "access-control-allow-headers": D };
        if (t.allowedHeaders) return { "access-control-allow-headers": t.allowedHeaders.join(",") };
        return;
      },
      f =
        t.exposedHeaders.length > 0
          ? { "access-control-expose-headers": t.exposedHeaders.join(",") }
          : void 0,
      d = t.maxAge ? { "access-control-max-age": t.maxAge.toString() } : void 0,
      _ = (D) => {
        let S = D.headers.origin;
        return BU({ ...s(S), ...H, ...f });
      },
      L = (D) => {
        let S = D.headers.origin,
          T = D.headers["access-control-request-headers"];
        return BU({ ...s(S), ...H, ...f, ...a, ...u(T), ...d });
      },
      I = (D, S) => Jt(Pun(S, _(D)));
    return (D) =>
      hl((S) => {
        let T = cg(S.context, Md);
        if (T.method === "OPTIONS") return Jt(Rd({ status: 204, headers: L(T) }));
        return (jpt(T, I), D);
      });
  };
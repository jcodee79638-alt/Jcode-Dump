
var jGe = (e, t) =>
    o_t(
      ni(function* (r) {
        let s = yield* Qg(),
          a = [],
          H = Array.from(s.mapUnsafe.keys()).filter((u) => u.startsWith("effect/httpapi/HttpApiGroup/"));
        for (let u of Object.values(e.groups)) {
          let f = s.mapUnsafe.get(u.key)?.routes;
          if (f === void 0) {
            let d = H.length === 0 ? "none" : H.join(", ");
            return yield* No(
              `HttpApiGroup "${u.identifier}" not found (key: "${u.key}"). Did you forget to provide HttpApiBuilder.group(api, "${u.identifier}", ...)? Available groups: ${d}`,
            );
          }
          a.push(...f);
        }
        if ((yield* r.addAll(a), t?.openapiPath)) {
          let u = oSt(e);
          yield* r.add("GET", t.openapiPath, Jt(ow(u)));
        }
      }),
    ),
  Kd = (e, t, r) =>
    Xq(
      ft(function* () {
        let s = (yield* Qg()).pipe(bKt($f)),
          a = e.groups[t],
          H = r(pEa(a)),
          u = ug(H) ? yield* H : H,
          f = [];
        for (let d of u.handlers.values()) f.push(hEa(a, d, s));
        return B0(new Map([[a.key, { routes: f, handlers: u.handlers }]]));
      }),
    ),
  AEa,
  uEa = (e) => {
    switch (e._tag) {
      case "Http":
        return Vn(Md, (t) => T6((t.headers.authorization ?? "").slice(e.schemeLength + 1)));
      case "ApiKey": {
        let t = e.in === "header" ? e.key.toLowerCase() : e.key,
          r = nt({ [t]: re }),
          s = e.in === "query" ? $ln(r) : e.in === "cookie" ? hln(r) : Lln(r);
        return yie(s, { onFailure: () => T6(""), onSuccess: (a) => T6(a[t]) });
      }
      case "Basic": {
        let t = { username: "", password: T6("") };
        return Md.pipe(
          Hi((r) => bQ(fBe((r.headers.authorization ?? "").slice(lEa)))),
          yie({
            onFailure: () => t,
            onSuccess: (r) => {
              let s = r.split(":");
              if (s.length !== 2) return t;
              return { username: s[0], password: T6(s[1]) };
            },
          }),
        );
      }
    }
  },
  lEa = 6,
  fEa,
  pEa = (e) => {
    let t = Object.create(fEa);
    return ((t.group = e), (t.handlers = new Map()), t);
  },
  LEa = (e) =>
    e.headers["content-type"] ? e.headers["content-type"].toLowerCase().trim() : "application/json",
  $Ea = (e) => {
    let t = LEa(e),
      r = t.indexOf(";");
    return r === -1 ? t : t.slice(0, r).trim();
  },
  gEa = (e, t, r, s) => {
    let a = { group: e, endpoint: t };
    for (let H of t.middlewares) {
      let u = H,
        f = cg(r, u);
      s = (rSt(u) ? EEa(u, f) : f)(s, a);
    }
    return s;
  },
  YSi,
  EEa = (e, t) => {
    let r = YSi.get(t);
    if (r !== void 0) return r;
    let s = Object.entries(e.security).map(([H, u]) => ({ decode: uEa(u), middleware: t[H] }));
    if (s.length === 0) return Za;
    let a = ni(function* (H, u) {
      let f;
      for (let d = 0; d < s.length; d++) {
        let { decode: _, middleware: L } = s[d],
          I = yield* Nsn(Hi(_, (D) => L(H, { credential: D, endpoint: u.endpoint, group: u.group })));
        if (xm(I)) {
          f = I;
          continue;
        }
        return I.success;
      }
      return yield* bQ(f);
    });
    return (YSi.set(t, a), a);
  },
  IEa,
  vEa = "effect/httpapi/stream/failure",
  PEa,
  CEa;
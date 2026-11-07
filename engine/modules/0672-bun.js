
var bun = ne(() => {
  YA();
  BH();
  aL();
  U6();
  cpt();
  T1e();
  apt();
  lRs = bA("effect/http/FetchHttpClient/Fetch", { defaultValue: () => globalThis.fetch });
  vun = class vun extends _i()("effect/http/FetchHttpClient/RequestInit") {};
  ((fRs = xun((e, t, r, s) => {
    let a = s.getRef(lRs),
      H = s.context.mapUnsafe.get(vun.key) ?? {},
      u = H.headers ? KQ(SE(H.headers), e.headers) : e.headers;
    if (u["content-length"]) u = M1e(u, "content-length");
    let f = (d) =>
      Vn(
        bl({
          try: () =>
            a(t, {
              ...H,
              method: e.method,
              headers: u,
              body: d,
              duplex: e.body._tag === "Stream" ? "half" : void 0,
              signal: r,
            }),
          catch: (_) => new N6({ reason: new CZt({ request: e, cause: _ }) }),
        }),
        (_) => Lun(e, _),
      );
    switch (e.body._tag) {
      case "Raw":
      case "Uint8Array":
        return f(e.body.body);
      case "FormData":
        return f(e.body.formData);
      case "Stream":
        return Hi(Ecn(e.body.stream), f);
    }
    return f(void 0);
  })),
    (Apt = Sun(Jt(fRs))));
});
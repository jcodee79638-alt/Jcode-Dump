
var Mzs = (e, t) => {
    if (!t) return e;
    let r = new URL(e);
    return (Object.entries(t).forEach(([s, a]) => r.searchParams.set(s, a)), r.toString());
  },
  xzs,
  Szs = (e) => Object.keys(e).filter((t) => xzs.has(t)),
  Tzs = (e, t, r) =>
    ft(function* () {
      if (t.http?.body === void 0) return { jsonBody: e, bodyText: r(e) };
      let s = Szs(t.http.body);
      if (s.length > 0) return yield* XS(`http.body cannot overlay protocol-owned field(s): ${s.join(", ")}`);
      if (K_(e)) {
        let a = tWe(e, t.http.body) ?? {};
        return { jsonBody: a, bodyText: Cse(a) };
      }
      return yield* XS("http.body can only overlay JSON object request bodies");
    }),
  Qnr = (e) =>
    ft(function* () {
      let t = Mzs(TIn(e.endpoint, { request: e.request, body: e.body }).toString(), e.request.http?.query),
        r = yield* Tzs(e.body, e.request, e.encodeBody),
        s = yield* qKs(e.auth)({
          request: e.request,
          method: "POST",
          url: t,
          body: r.bodyText,
          headers: SE({ ...e.headers?.({ request: e.request }), ...e.request.http?.headers }),
        });
      return { url: t, jsonBody: r.jsonBody, bodyText: r.bodyText, headers: s };
    }),
  Ynr = (e) => ({
    id: "http-json",
    with: (t) => Ynr({ ...e, ...t }),
    prepare: (t) =>
      Qnr({ ...t }).pipe(
        Vn((r) => ({
          request: SIn({ url: r.url, body: r.bodyText, headers: r.headers }),
          framing: e.framing,
        })),
      ),
    frames: (t, r, s) =>
      hh(
        s.http
          .execute(t.request)
          .pipe(
            Vn((a) =>
              t.framing.frame(
                a.stream.pipe(
                  fft((H) =>
                    NG(
                      `${r.model.provider}/${r.model.route.id}`,
                      `Failed to read ${r.model.provider}/${r.model.route.id} stream`,
                      MIn(H),
                    ),
                  ),
                ),
              ),
            ),
          ),
      ),
  }),
  RIn;
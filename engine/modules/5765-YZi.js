
function YZi(e, t) {
  return ft(function* () {
    let r = yield* nA(() => XrH(t.disableEmbeddedWebUi)),
      s = new URL(e.url, "http://localhost").pathname;
    if (r) return yield* KrH(s, t.fs, r);
    let a = yield* t.client.execute(
        P1e(e.method)(GrH(s), { headers: JZi(e.headers, { host: zZi.host }), body: VrH(e) }),
      ),
      H = qrH(a.headers);
    if (a.headers["content-type"]?.includes("text/html")) {
      let u = yield* a.text;
      return (H.set("Content-Security-Policy", QZi(u)), YQ(u, { status: a.status, headers: H }));
    }
    return (
      H.set("Content-Security-Policy", wCr()),
      f2(a.stream.pipe(zBe(() => $1)), { status: a.status, headers: H })
    );
  });
}
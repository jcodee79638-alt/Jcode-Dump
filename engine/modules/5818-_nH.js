
function _nH(e, t, r, s) {
  return ft(function* () {
    let a = yield* e.execute(P1e(s.method)(t, { headers: JZi(s.headers, r), body: dnH(s) })),
      H = new Headers(a.headers);
    if ((H.delete("content-encoding"), H.delete("content-length"), a.status >= 500)) {
      let u = yield* a.text.pipe($s(() => Jt(""))),
        f = a.headers["content-type"] ?? "application/json";
      return (
        H.delete("content-type"),
        yield* cf("workspace proxy upstream error", {
          url: t.toString(),
          method: s.method,
          status: a.status,
          body: u.slice(0, 2000),
        }),
        YQ(u, { status: a.status, statusText: Tes(a), headers: H, contentType: f })
      );
    }
    return f2(a.stream.pipe(zBe(() => $1)), { status: a.status, statusText: Tes(a), headers: H });
  }).pipe($s(() => Jt(Rd({ status: 500 }))));
}
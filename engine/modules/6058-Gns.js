
var Gns = ne(async () => {
  BA();
  Gt();
  Cf();
  $H();
  await Jn([eN(), tM(), ak()]);
  qns = Kd(rm, "server.fs", (e) =>
    ft(function* () {
      return e
        .handleRaw("fs.read", (t) =>
          ft(function* () {
            let r = yield* (yield* w2).read({
              path: du.make(
                decodeURIComponent(new URL(t.request.url, "http://localhost").pathname.slice(13)),
              ),
            });
            return eer(r.content, { contentType: r.mime });
          }),
        )
        .handle("fs.list", (t) =>
          Rh(
            ft(function* () {
              return yield* (yield* w2).list(t.query);
            }),
          ),
        )
        .handle("fs.find", (t) =>
          Rh(
            ft(function* () {
              return yield* (yield* w2).find(t.query);
            }),
          ),
        );
    }),
  );
});
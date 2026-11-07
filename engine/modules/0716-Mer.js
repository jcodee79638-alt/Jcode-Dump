
var Mer = ne(() => {
  YA();
  BH();
  RQ();
  KH();
  Dd();
  Hf();
  aL();
  hRe();
  U6();
  p2();
  ORe = class ORe extends _i()("effect/http/HttpPlatform") {};
  ((yer = ni(function* (e) {
    let t = yield* g1,
      r = yield* _Re;
    return ORe.of({
      fileResponse: ni(function* (s, a) {
        let H = yield* t.stat(s),
          u = yield* r.fromFileInfo(H),
          f = Number(a?.offset ?? 0),
          d = a?.bytesToRead !== void 0 ? f + Number(a.bytesToRead) : void 0,
          _ = mG(a?.headers ? SE(a.headers) : FU, "etag", xZt(u));
        if (Nu(H.mtime)) _["last-modified"] = H.mtime.value.toUTCString();
        let L = d !== void 0 ? d - f : Number(H.size) - f;
        return e.fileResponse(s, a?.status ?? 200, a?.statusText, _, f, d, L);
      }),
      fileWebResponse(s, a) {
        return Vn(r.fromFileWeb(s), (H) => {
          let u = KQ(
            a?.headers ? SE(a.headers) : FU,
            BU({ etag: xZt(H), "last-modified": new Date(s.lastModified).toUTCString() }),
          );
          return e.fileWebResponse(s, a?.status ?? 200, a?.statusText, u, a);
        });
      },
    });
  })),
    (Sln = Es(ORe)(
      Hi(g1, (e) =>
        yer({
          fileResponse(t, r, s, a, H, u, f) {
            return f2(e.stream(t, { offset: H, bytesToRead: u !== void 0 ? u - H : void 0 }), {
              contentLength: f,
              headers: a,
              status: r,
              statusText: s,
            });
          },
          fileWebResponse(t, r, s, a, H) {
            return f2(Npe({ evaluate: () => t.stream(), onError: Za }), {
              headers: a,
              status: r,
              statusText: s,
            });
          },
        }),
      ),
    ).pipe(ou(y1e))));
});
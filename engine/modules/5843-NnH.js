
function NnH(e, t, r, s, a) {
  return ft(function* () {
    if (!(yield* DR.use((L) => L.isSyncing(r.id))))
      return YQ(`broken sync connection for workspace: ${r.id}`, {
        status: 503,
        contentType: "text/plain; charset=utf-8",
      });
    let u = Oes(s.url, a);
    if (t.headers.upgrade?.toLowerCase() === "websocket") return yield* mnH(t, u);
    let d = yield* _nH(e, u, s.headers, t),
      _ = jes(new Headers(d.headers));
    if (_) {
      let L = yield* Pes(r.id, _, t.source instanceof Request ? t.source.signal : void 0).pipe(
        eu(void 0),
        $s((I) => Jt(YQ(I.message, { status: 503 }))),
      );
      if (L) return L;
    }
    return d;
  });
}
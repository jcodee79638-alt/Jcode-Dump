
function mnH(e, t) {
  return FL(
    ft(function* () {
      let r = yield* on(e.upgrade),
        s = yield* Jun(FrH(t), { protocols: NrH(e.headers) }),
        a = yield* r.writer,
        H = yield* s.writer,
        u = (_, L) =>
          _.runRaw(() => ti, { onOpen: L(nYe()).pipe($s(() => ti)) }).pipe(
            vW("1 second"),
            GC("SocketError", "SocketCloseError", () => ti),
            $s(() => ti),
          ),
        f = Km([u(r, a), u(s, H)], { concurrency: "unbounded", discard: !0 });
      if (!(yield* Ses(Km([a(nYe()), H(nYe())], { concurrency: "unbounded", discard: !0 }))))
        return (yield* f, Rd());
      return (
        yield* s
          .runRaw((_) => a(_))
          .pipe(
            GC("SocketError", "SocketCloseError", (_) => a(new Fv(_.code, _.closeReason)).pipe($s(() => ti))),
            $s(() => a(new Fv(1011, "proxy error")).pipe($s(() => ti))),
            EI,
          ),
        yield* r
          .runRaw((_) => H(typeof _ === "string" ? _ : _.slice()))
          .pipe(
            $s(() => ti),
            up(H(new Fv()).pipe($s(() => ti))),
          ),
        Rd()
      );
    }).pipe(on),
  );
}
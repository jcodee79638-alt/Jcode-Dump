
function CoH() {
  return ft(function* () {
    yield* fH("global event connected");
    let e = l1e((r) => {
        let s = (a) => JM(r, a);
        return Bd(
          jn(() => g$.on("event", s)),
          () => jn(() => g$.off("event", s)),
        );
      }),
      t = XBe("10 seconds").pipe(
        pft(1),
        xE(() => ({ payload: { id: b2.create(), type: "server.heartbeat", properties: {} } })),
      );
    return f2(
      c2({ payload: { id: b2.create(), type: "server.connected", properties: {} } }).pipe(
        Fpe(e.pipe(oG(t, { haltStrategy: "left" }))),
        xE(PoH),
        Wie(jMe()),
        HG,
        m1e(fH("global event disconnected")),
      ),
      {
        contentType: "text/event-stream",
        headers: {
          "Cache-Control": "no-cache, no-transform",
          "X-Accel-Buffering": "no",
          "X-Content-Type-Options": "nosniff",
        },
      },
    );
  });
}
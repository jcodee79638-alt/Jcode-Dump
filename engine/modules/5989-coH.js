
function coH(e) {
  return ft(function* () {
    let t = yield* Jc,
      r = yield* lje,
      s = yield* dYt(),
      a = yield* e.listen((_) => jn(() => JM(s, _)));
    yield* sL(() => a);
    let H = Bie(s).pipe(
        aG(
          (_) =>
            _.location?.directory === t.directory &&
            (_.location.workspaceID === void 0 || _.location.workspaceID === r),
        ),
        xE((_) => ({ id: _.id, type: _.type, properties: _.data })),
      ),
      u = l1e((_) => {
        let L = (I) => {
          if (I.directory !== t.directory || I.payload.type !== "server.instance.disposed") return;
          JM(_, {
            id: I.payload.id ?? Iwr(),
            type: "server.instance.disposed",
            properties: I.payload.properties ?? {},
          });
        };
        return Bd(
          jn(() => g$.on("event", L)),
          () => jn(() => g$.off("event", L)),
        );
      }),
      f = H.pipe(
        oG(u, { haltStrategy: "left" }),
        p1e((_) => _.type === "server.instance.disposed"),
      ),
      d = XBe("10 seconds").pipe(
        pft(1),
        xE(() => ({ id: Iwr(), type: "server.heartbeat", properties: {} })),
      );
    return (
      yield* fH("event connected"),
      f2(
        c2({ id: Iwr(), type: "server.connected", properties: {} }).pipe(
          Fpe(f.pipe(oG(d, { haltStrategy: "left" }))),
          xE(HoH),
          Wie(jMe()),
          HG,
          m1e(fH("event disconnected")),
        ),
        {
          contentType: "text/event-stream",
          headers: {
            "Cache-Control": "no-cache, no-transform",
            "X-Accel-Buffering": "no",
            "X-Content-Type-Options": "nosniff",
          },
        },
      )
    );
  });
}
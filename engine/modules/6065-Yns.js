
var Yns = ne(async () => {
  cwr();
  Gt();
  Cf();
  $H();
  PMe();
  await Jn([fL(), tM()]);
  Qns = Kd(rm, "server.event", (e) =>
    ft(function* () {
      let t = yield* lL;
      return e.handleRaw("event.subscribe", () =>
        ft(function* () {
          let r = { id: b2.create(), type: "server.connected", data: {} },
            s = hh(
              ft(function* () {
                let H = yield* $Ys(t, VoH);
                return c2(r).pipe(Fpe(H));
              }),
            ).pipe(xE(qoH), Wie(jMe())),
            a = XBe("15 seconds").pipe(
              xE(
                () => `: heartbeat

`,
              ),
            );
          return f2(s.pipe(oG(a, { haltStrategy: "left" }), HG), {
            contentType: "text/event-stream",
            headers: {
              "Cache-Control": "no-cache, no-transform",
              "X-Accel-Buffering": "no",
              "X-Content-Type-Options": "nosniff",
            },
          });
        }),
      );
    }),
  );
});
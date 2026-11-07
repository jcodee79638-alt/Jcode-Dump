
function TaH(e) {
  let t = haH(),
    r = { closeStarted: !1, forceStop: !1 },
    s = t.close.bind(t);
  return (
    (t.close = (a) => {
      r.closeStarted = !0;
      let H = s(a);
      if (r.forceStop) t.closeAllConnections();
      return H;
    }),
    VC(
      uWs(() => t, { port: e.port, host: e.hostname, gracefulShutdownTimeout: "1 second" }),
      bf(Dkt)(
        Dkt.of({
          closeAll: jn(() => {
            if (((r.forceStop = !0), r.closeStarted)) t.closeAllConnections();
          }),
        }),
      ),
    )
  );
}
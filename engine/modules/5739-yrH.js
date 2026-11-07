
var yrH,
  MrH = 1e4,
  xrH,
  h$e,
  TrH = () => No("PtyTicket cache must be used via set/invalidateWhen, never get"),
  vrH = (e = yrH) =>
    ft(function* () {
      let t = yield* Zfn({ capacity: MrH, lookup: TrH, timeToLive: e }),
        r = Math.max(1, Math.round(Aut(Ag(e))));
      return h$e.of({
        issue: Ge("PtyTicket.issue")(function* (s) {
          let a = crypto.randomUUID();
          return (yield* mWs(t, a, s), { ticket: a, expires_in: r });
        }),
        consume: Ge("PtyTicket.consume")(function* (s) {
          return yield* _Ws(t, s.ticket, (a) => SrH(a, s));
        }),
      });
    }),
  brH,
  jrH;
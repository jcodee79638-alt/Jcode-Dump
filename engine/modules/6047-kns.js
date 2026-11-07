
var kns = ne(async () => {
  Ew();
  Gt();
  $H();
  Xy();
  await Jn([r5(), tM()]);
  ((FoH = nt({ id: wf, order: Io([ri("asc"), ri("desc")]), direction: Io([ri("previous"), ri("next")]) })),
    (BoH = E1(FoH)),
    (Pwr = {
      encode(e, t, r) {
        return Buffer.from(JSON.stringify({ id: e.id, order: t, direction: r })).toString("base64url");
      },
      decode(e) {
        return BoH(JSON.parse(Buffer.from(e, "base64url").toString("utf8")));
      },
    }),
    (wns = Kd(rm, "server.message", (e) =>
      ft(function* () {
        let t = yield* Txe;
        return e.handle(
          "session.messages",
          Ge(function* (r) {
            if (r.query.cursor && r.query.order !== void 0)
              return yield* new SJ({ message: "Cursor cannot be combined with order" });
            let s = yield* ZA({
                try: () => (r.query.cursor ? Pwr.decode(r.query.cursor) : void 0),
                catch: () => new SJ({ message: "Invalid cursor" }),
              }),
              a = s?.order ?? r.query.order ?? "desc",
              H = yield* t
                .messages({
                  sessionID: r.params.sessionID,
                  limit: r.query.limit ?? NoH,
                  order: a,
                  cursor: s ? { id: s.id, direction: s.direction } : void 0,
                })
                .pipe(
                  EA("Session.NotFoundError", (d) =>
                    bn(new Wf({ sessionID: d.sessionID, message: `Session not found: ${d.sessionID}` })),
                  ),
                  EA("Session.MessageDecodeError", (d) => {
                    let _ = `err_${crypto.randomUUID().slice(0, 8)}`;
                    return cf("failed to decode session message").pipe(
                      wU({ ref: _, sessionID: d.sessionID, messageID: d.messageID }),
                      Zu(
                        bn(
                          new l9({
                            message: "Unexpected server error. Check server logs for details.",
                            ref: _,
                          }),
                        ),
                      ),
                    );
                  }),
                ),
              u = H[0],
              f = H.at(-1);
            return {
              data: H,
              cursor: {
                previous: u ? Pwr.encode(u, a, "previous") : void 0,
                next: f ? Pwr.encode(f, a, "next") : void 0,
              },
            };
          }),
        );
      }),
    )));
});
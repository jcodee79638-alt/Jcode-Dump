
var J6,
  eTn,
  $io,
  Hor = (e) => ({
    writeSnapshot(t, r, s) {
      return e.writeSnapshot(J6.resolve(t), J6.resolve(r), ALt(t, s));
    },
    getEventsSince(t, r, s) {
      return e.getEventsSince(J6.resolve(t), J6.resolve(r), ALt(t, s));
    },
    async subscribe(t, r, s) {
      return (
        (t = J6.resolve(t)),
        (s = ALt(t, s)),
        await e.subscribe(t, r, s),
        {
          unsubscribe() {
            return e.unsubscribe(t, r, s);
          },
        }
      );
    },
    unsubscribe(t, r, s) {
      return e.unsubscribe(J6.resolve(t), r, ALt(t, s));
    },
  });
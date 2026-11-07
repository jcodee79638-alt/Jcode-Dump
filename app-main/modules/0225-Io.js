
function Io() {
  if (kn) return;
  ((kn = setInterval(() => {
    if (A.connection().state === "connected")
      A.activity()
        .then((e) =>
          Promise.allSettled([...Y.keys()].filter((t) => !e.sessions.some((n) => n.id === t)).map(Yt)),
        )
        .catch(() => {
          return;
        });
    (En.tick().catch(() => {
      return;
    }),
      Sn());
  }, 2000)),
    kn.unref());
}
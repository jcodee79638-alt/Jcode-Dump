
var mir = () => {
  let e = new Map(),
    t = (r) => (s) =>
      yH(() => {
        let a = e.get(r),
          H = a ?? { semaphore: j6(1), users: 0 };
        if (!a) e.set(r, H);
        return (
          H.users++,
          H.semaphore.withPermit(s).pipe(
            up(
              jn(() => {
                if ((H.users--, H.users === 0)) e.delete(r);
              }),
            ),
          )
        );
      });
  return { size: jn(() => e.size), withLock: t };
};
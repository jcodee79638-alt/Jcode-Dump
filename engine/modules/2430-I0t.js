
function I0t(e, t) {
  let r,
    s = () => (r ??= fpn(Jm(t, Fme), { memoMap: Mme }));
  return {
    runSync: (a) => s().runSync(e.use(a)),
    runPromiseExit: (a, H) => s().runPromiseExit(e.use(a), H),
    runPromise: (a, H) => s().runPromise(e.use(a), H),
    runFork: (a) => s().runFork(e.use(a)),
    runCallback: (a) => s().runCallback(e.use(a)),
  };
}
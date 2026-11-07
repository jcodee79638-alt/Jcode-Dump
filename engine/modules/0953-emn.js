
function emn(e) {
  return {
    strategy: () => e.strategy(),
    get: (...H) => bl({ try: () => e.get(...H), catch: (u) => new Ttr({ cause: u }) }),
    put: (...H) => bl({ try: () => e.put(...H), catch: (u) => new Ttr({ cause: u }) }),
    onMutate: (H) => bl({ try: () => e.onMutate(H), catch: (u) => new Ttr({ cause: u }) }),
    cache: e,
  };
}
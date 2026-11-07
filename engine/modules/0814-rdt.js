
function rdt(e, t) {
  let r = wpn(t),
    s = new Map(),
    a = (f) =>
      etr(
        f,
        (d, _) => {
          if (d.kind === "unbound") throw Error(`Unbound layer node: ${d.name}`);
          let L = d.dependencies.flatMap(Zer).map(_.visit),
            I = d.implementation;
          return L.length === 0 ? I : I.pipe(ou(L));
        },
        { cache: s, resolve: (d) => r.get(d.name) ?? d },
      );
  return Zer(e)
    .map((f) => a(f))
    .reduce((f, d) => d.pipe(Jm(f)), Lpe);
}
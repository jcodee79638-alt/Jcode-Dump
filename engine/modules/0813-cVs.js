
function cVs(e, t, r) {
  let s = new Map(),
    a = wpn(r);
  return {
    node: etr(
      e,
      (u, f) => {
        if (u.kind === "group") return { ...u, dependencies: u.dependencies.map(f.visit) };
        if (u.tag === t) {
          let d = s.get(u.name);
          if (d && d !== u) throw Error(`Tag ${t} has conflicting implementations for ${u.name}`);
          return (s.set(u.name, Yer(u, a)), G1e([]));
        }
        if (u.kind === "unbound") return u;
        return { ...u, dependencies: u.dependencies.map(f.visit) };
      },
      { resolve: (u) => a.get(u.name) ?? u },
    ),
    hoisted: G1e(Array.from(s.values())),
  };
}
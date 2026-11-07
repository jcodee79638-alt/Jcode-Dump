
var zCt,
  vKi,
  bKi,
  DQe = (e) => {
    if (Array.isArray(e)) return e;
    if (typeof e === "string") return Array.from(e);
    if (e instanceof Gy) return Array.from(e.map.entries(), ([t, r]) => [t, r]);
    if (e instanceof ST) return Array.from(e.set.values());
    if (e instanceof Sg) return Array.from(e.params.entries(), ([t, r]) => [t, r]);
    return;
  };
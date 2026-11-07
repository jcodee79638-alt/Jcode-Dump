
function is(e, t) {
  let n = new Map(e.files.map((s) => [se(s.path), s])),
    i = new Map(t.files.map((s) => [se(s.path), s])),
    r = (s, o) => s.uncaptured.some((l) => !l || o === se(l) || o.startsWith(se(l) + "/"));
  return [...new Set([...n.keys(), ...i.keys()])].sort().flatMap((s) => {
    let o = n.get(s),
      l = i.get(s);
    if (o?.hash === l?.hash || (!o && r(e, s)) || (!l && r(t, s))) return [];
    return [
      {
        path: l?.path ?? o.path,
        status: !o ? "added" : !l ? "deleted" : "modified",
        size: l?.size ?? o?.size ?? 0,
      },
    ];
  });
}
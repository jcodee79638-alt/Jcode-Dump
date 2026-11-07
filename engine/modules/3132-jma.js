
function jma(e) {
  let t = SN(e.before, e.after).reduce(
    (r, s) => ({
      additions: r.additions + (s.added ? (s.count ?? 0) : 0),
      deletions: r.deletions + (s.removed ? (s.count ?? 0) : 0),
    }),
    { additions: 0, deletions: 0 },
  );
  return {
    file: e.target.resource,
    patch: Ow(e.target.resource, e.target.resource, e.before, e.after),
    status: e.type === "add" ? "added" : e.type === "delete" ? "deleted" : "modified",
    ...t,
  };
}
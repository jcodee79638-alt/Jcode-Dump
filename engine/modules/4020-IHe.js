
function IHe(e, t, ...r) {
  return (
    r.flat().findLast((s) => XG(e, s.permission) && XG(t, s.pattern)) ?? {
      action: "ask",
      permission: e,
      pattern: "*",
    }
  );
}
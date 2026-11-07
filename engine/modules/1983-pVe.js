
function pVe(e, t, ...r) {
  return (
    r.flat().findLast((s) => XG(e, s.action) && XG(t, s.resource)) ?? {
      action: e,
      resource: "*",
      effect: "ask",
    }
  );
}
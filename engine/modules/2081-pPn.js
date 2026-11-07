
function pPn(e, t) {
  return e.map((r) => (vfo(r.action) ? { ...r, resource: bfo(r.resource, t) } : r));
}
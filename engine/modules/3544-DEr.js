
function DEr(e) {
  return e.map((t) => (t.path ? { ...t, path: t.path.slice() } : { ...t }));
}
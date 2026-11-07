
function VZs(e) {
  if (!e) return;
  return Object.fromEntries(Object.entries(e).map(([t, r]) => [t, qZs(r)]));
}

function bes(e, t) {
  let r = new Set([...Object.keys(e), ...Object.keys(t)]);
  return Object.fromEntries([...r].map((s) => [s, t[s] ?? -1]).filter(([s, a]) => (e[s] ?? -1) !== a));
}
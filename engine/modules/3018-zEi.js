
function zEi(e) {
  let r = e.filter((s) => s._tag === "Available").map((s) => [s.key, s.baseline()]);
  return {
    baseline: YEi(r.map(([, s]) => s.text)),
    snapshot: Object.fromEntries(r.map(([s, a]) => [s, a.snapshot])),
  };
}
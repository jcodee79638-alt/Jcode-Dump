
function BZs(e) {
  let t = [
    ...Object.entries(e.agent ?? {}),
    ...Object.entries(e.mode ?? {}).map(([r, s]) => [r, { ...s, mode: "primary" }]),
  ];
  if (!t.length) return;
  return Object.fromEntries(t.flatMap(([r, s]) => (s ? [[r, EMn(s)]] : [])));
}

function Uon(e) {
  let t = e?.separator ?? ",",
    r = e?.keyValueSeparator ?? "=";
  return Sm((s) =>
    Object.entries(s)
      .map(([a, H]) => `${a}${r}${H}`)
      .join(t),
  );
}
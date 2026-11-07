
function LCr(e) {
  let t = new Map(Object.entries(TZi));
  for (let [r, s] of vZi.get(e)?.entries() ?? []) t.set(r, s);
  return [...t.entries()];
}
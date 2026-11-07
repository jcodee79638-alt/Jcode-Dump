
function GLt(e) {
  if (typeof e !== "object" || e === null) return;
  let t = e;
  if (t.type !== "step-finish") return;
  if (!("cost" in t) || !("tokens" in t)) return;
  return { cost: t.cost, tokens: t.tokens };
}
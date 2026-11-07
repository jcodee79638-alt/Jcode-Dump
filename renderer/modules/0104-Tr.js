
function Tr(e) {
  if (!e || e.globalPaused || e.admission.allowed || e.admission.code !== "plan_exhausted") return;
  const n = e.plan.toLowerCase().replace(/\s+/g, "");
  return n === "pro20x" ? In.pro20x : n === "pro5x" ? In.pro5x : n === "plus" ? In.plus : In.free;
}

function ya(e) {
  return e === "running" || e === "completed" || e === "failed" || e === "cancelled" ? e : "interrupted";
}

function ba(e) {
  if (e === "Free" || e === "free") return "Free";
  if (e === "Plus" || e === "plus") return "Plus";
  if (["Pro5x", "pro5x", "pro_5x", "Pro 5x"].includes(e)) return "Pro5x";
  if (["Pro20x", "pro20x", "pro_20x", "Pro 20x"].includes(e)) return "Pro20x";
  return "unknown";
}
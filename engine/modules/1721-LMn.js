
function LMn(e) {
  return typeof e === "string" && e ? `Bearer ${e}` : void 0;
}
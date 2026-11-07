
function TJi(e) {
  if (typeof BigInt !== "function") return null;
  return BigInt(e.replace(/_/g, ""));
}
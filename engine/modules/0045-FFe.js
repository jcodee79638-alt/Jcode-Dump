
function FFe(e) {
  return (
    e != null &&
    typeof e === "object" &&
    Object.entries(e).every(([t, r]) => typeof t === "string" && (r === void 0 || xAt(r)))
  );
}
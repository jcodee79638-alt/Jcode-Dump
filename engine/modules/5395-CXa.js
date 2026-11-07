
function CXa(e) {
  return (
    e.length === 2 &&
    e.some((t) => rk(t) && t.type === "object" && t.properties === void 0) &&
    e.some((t) => rk(t) && t.type === "array" && t.items === void 0)
  );
}
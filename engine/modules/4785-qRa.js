
function qRa(e) {
  return (
    typeof e === "string" ||
    typeof e === "number" ||
    typeof e === "boolean" ||
    typeof e === "symbol" ||
    typeof e === "bigint"
  );
}
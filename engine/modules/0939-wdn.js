
function wdn(e) {
  switch (typeof e) {
    case "string":
    case "number":
    case "bigint":
    case "boolean":
      return String(e);
    default:
      return ad(e);
  }
}
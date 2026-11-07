
function Q0r(e) {
  if (typeof e === "bigint") return e.toString() + "n";
  if (typeof e === "string") return `"${e}"`;
  return `${e}`;
}
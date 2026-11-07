
function QBa(e) {
  if (typeof e !== "object" || e === null) return "";
  return `; props: [${Object.getOwnPropertyNames(e)
    .map((r) => `"${r}"`)
    .join(", ")}]`;
}
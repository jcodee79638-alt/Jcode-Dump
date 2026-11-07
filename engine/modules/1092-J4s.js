
function J4s(e) {
  return (e.replace(/['\u2019]/g, "").match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? [])
    .map((t) => t.toLowerCase())
    .join("_");
}
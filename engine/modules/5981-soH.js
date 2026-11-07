
function soH(e) {
  return e.type === "object" && !e.properties && !e.additionalProperties;
}
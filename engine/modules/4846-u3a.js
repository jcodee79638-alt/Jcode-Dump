
function u3a(e, t) {
  if (e.response_format?.type !== "json_schema") return null;
  if (e.response_format?.type === "json_schema") {
    if ("$parseRaw" in e.response_format) return e.response_format.$parseRaw(t);
    return JSON.parse(t);
  }
  return null;
}
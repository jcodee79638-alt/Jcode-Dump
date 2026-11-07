
function nRa(e, t) {
  if (e.output_format?.type !== "json_schema") return null;
  try {
    if ("parse" in e.output_format) return e.output_format.parse(t);
    return JSON.parse(t);
  } catch (r) {
    throw new Cu(`Failed to parse structured output: ${r}`);
  }
}
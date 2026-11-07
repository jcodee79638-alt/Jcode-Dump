
function IWa(e, t) {
  if (e.text?.format?.type !== "json_schema") return null;
  if ("$parseRaw" in e.text?.format) return (e.text?.format).$parseRaw(t);
  return JSON.parse(t);
}
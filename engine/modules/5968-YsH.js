
function YsH(e, t) {
  let r = e.replace("#/components/schemas/", ""),
    s = r.replace(/\d+$/, "");
  if (s !== r && t[s]) return `#/components/schemas/${s}`;
  return e;
}
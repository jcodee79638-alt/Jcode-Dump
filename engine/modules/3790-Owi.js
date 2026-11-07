
function Owi(e, t, r) {
  let s = r != null ? r : t.dateStrategy;
  if (Array.isArray(s)) return { anyOf: s.map((a, H) => Owi(e, t, a)) };
  switch (s) {
    case "string":
    case "format:date-time":
      return { type: "string", format: "date-time" };
    case "format:date":
      return { type: "string", format: "date" };
    case "integer":
      return iMa(e);
  }
}
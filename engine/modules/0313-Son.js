
function Son(e) {
  let t = e.annotations?.expected;
  if (typeof t === "string") return t;
  switch (e._tag) {
    case "Filter":
      return "<filter>";
    case "FilterGroup":
      return e.checks.map((r) => Son(r)).join(" & ");
  }
}
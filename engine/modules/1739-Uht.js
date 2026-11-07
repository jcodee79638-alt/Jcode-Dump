
function Uht(e, t) {
  return e.filter((r) => r.type === "document").findLast((r) => r.info[t] !== void 0)?.info[t];
}
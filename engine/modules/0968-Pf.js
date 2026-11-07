
function Pf(e, t) {
  return { name: typeof e === "string" && e.length > 0 ? e : "", config: typeof e === "object" ? e : t };
}
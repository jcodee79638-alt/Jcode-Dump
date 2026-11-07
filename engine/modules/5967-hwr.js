
function hwr(e, t) {
  if (Array.isArray(e)) return e.map((s) => hwr(s, t));
  if (!e || typeof e !== "object") return e;
  let r = e;
  if (r.$ref) return { $ref: YsH(r.$ref, t) };
  return Object.fromEntries(
    Object.entries(e)
      .filter(([s]) => s !== "description")
      .sort(([s], [a]) => s.localeCompare(a))
      .map(([s, a]) => [s, hwr(a, t)]),
  );
}

function FPr(e) {
  if (Array.isArray(e)) return e.map((t) => FPr(t));
  if (typeof e !== "object" || e === null) return e;
  return Object.fromEntries(
    Object.entries(e)
      .filter((t) =>
        (t[0] === "exclusiveMaximum" || t[0] === "exclusiveMinimum") && typeof t[1] === "boolean" ? !1 : !0,
      )
      .map(([t, r]) => [t, FPr(r)]),
  );
}
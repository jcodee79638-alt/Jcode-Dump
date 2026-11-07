
function THe(e) {
  if (e instanceof Error)
    return {
      type: e.name,
      message: fx(e),
      stack: e.stack,
      cause: e.cause === void 0 ? void 0 : AXe(e.cause),
      formatted: AXe(e),
    };
  if (!ux(e)) return { type: typeof e, message: fx(e), formatted: AXe(e) };
  let t = Object.getOwnPropertyNames(e).reduce((r, s) => {
    let a = e[s];
    if (a === void 0) return r;
    if (typeof a === "string" || typeof a === "number" || typeof a === "boolean") return ((r[s] = a), r);
    return ((r[s] = a instanceof Error ? a.message : String(a)), r);
  }, {});
  if (typeof t.message !== "string") t.message = fx(e);
  if (typeof t.type !== "string") t.type = e.constructor?.name;
  return ((t.formatted = AXe(e)), t);
}
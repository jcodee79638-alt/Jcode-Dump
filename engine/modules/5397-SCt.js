
function SCt(e, t, r = new Set()) {
  if (Array.isArray(e)) return e.map((a) => SCt(a, t, r));
  if (!rk(e)) return e;
  let s = t ?? (rk(e.$defs) ? e.$defs : void 0);
  if (typeof e.$ref === "string" && s) {
    let a = e.$ref.match(/^#\/\$defs\/(.+)$/)?.[1] ?? e.$ref.match(/^#\/definitions\/(.+)$/)?.[1];
    if (a && !r.has(a)) {
      let H = s[a];
      if (H) {
        let { $ref: u, ...f } = e;
        return SCt({ ...(rk(H) ? H : {}), ...f }, s, new Set(r).add(a));
      }
    }
  }
  return Object.fromEntries(Object.entries(e).map(([a, H]) => [a, SCt(H, s, r)]));
}
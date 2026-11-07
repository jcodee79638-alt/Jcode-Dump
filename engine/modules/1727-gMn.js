
function gMn(e, t) {
  let r = Object.entries(t ?? {}).map(([s, a]) => ({
    action: FZs(s),
    resource: "*",
    effect: a ? "allow" : "deny",
  }));
  for (let [s, a] of Object.entries(e ?? {})) {
    if (!a) continue;
    if (typeof a === "string") {
      r.push({ action: s, resource: "*", effect: a });
      continue;
    }
    r.push(...Object.entries(a).map(([H, u]) => ({ action: s, resource: H, effect: u })));
  }
  return r.length ? r : void 0;
}
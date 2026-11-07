
function Gis(e) {
  let t = mAe(e);
  for (let r of ["startsAt", "resetsAt", "requests", "tokens", "reservedTokens", "tokenLimit", "percentUsed"])
    if (typeof t[r] !== "number" || !Number.isFinite(t[r]) || t[r] < 0) throw new Sc("unavailable");
  if (Number(t.percentUsed) > 100) throw new Sc("unavailable");
  if (t.blockedByWeekly !== void 0 && typeof t.blockedByWeekly !== "boolean") throw new Sc("unavailable");
  return t;
}
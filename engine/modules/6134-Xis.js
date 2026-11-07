
function Xis(e) {
  let t = mAe(e),
    r = mAe(t.concurrency),
    s = t.promptAllowance === void 0 ? void 0 : mAe(t.promptAllowance),
    a = t.resetCredits === void 0 ? void 0 : mAe(t.resetCredits);
  if (
    a &&
    (!Number.isSafeInteger(a.available) ||
      Number(a.available) < 0 ||
      (a.nextExpiresAt !== null && (!Number.isSafeInteger(a.nextExpiresAt) || Number(a.nextExpiresAt) < 0)))
  )
    throw new Sc("unavailable");
  if (
    s &&
    (s.limit !== 15 ||
      !Number.isInteger(s.used) ||
      Number(s.used) < 0 ||
      Number(s.used) > 15 ||
      s.remaining !== 15 - Number(s.used) ||
      !Number.isSafeInteger(s.resetsAt) ||
      Number(s.resetsAt) <= 0)
  )
    throw new Sc("unavailable");
  if (
    { free: "Free", plus: "Plus", pro5x: "Pro 5x", pro20x: "Pro 20x" }[String(t.planId)] !== t.planName ||
    typeof t.planName !== "string" ||
    !Number.isSafeInteger(t.bankedResets) ||
    Number(t.bankedResets) < 0 ||
    !Number.isSafeInteger(r.active) ||
    Number(r.active) < 0 ||
    !Number.isSafeInteger(r.limit) ||
    Number(r.limit) < 1 ||
    (t.planExpiresAt !== void 0 &&
      t.planExpiresAt !== null &&
      (typeof t.planExpiresAt !== "number" || !Number.isSafeInteger(t.planExpiresAt) || t.planExpiresAt < 0))
  )
    throw new Sc("unavailable");
  return {
    planId: String(t.planId),
    planName: t.planName,
    ...(s
      ? {
          promptAllowance: {
            limit: 15,
            used: Number(s.used),
            remaining: Number(s.remaining),
            resetsAt: Number(s.resetsAt),
          },
        }
      : {}),
    ...(t.planExpiresAt !== void 0 ? { planExpiresAt: t.planExpiresAt } : {}),
    weekly: Gis(t.weekly),
    fiveHour: t.fiveHour === null ? null : Gis(t.fiveHour),
    bankedResets: Number(t.bankedResets),
    ...(a ? { resetCredits: { available: Number(a.available), nextExpiresAt: a.nextExpiresAt } } : {}),
    concurrency: { active: Number(r.active), limit: Number(r.limit) },
  };
}
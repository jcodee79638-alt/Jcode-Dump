
function fo(e) {
  if (!e || typeof e !== "object" || Array.isArray(e))
    throw Error("Jac Code could not check this key. Try again.");
  let t = e,
    n = { free: "Free", plus: "Plus", pro5x: "Pro 5x", pro20x: "Pro 20x" };
  if (
    !Object.hasOwn(n, String(t.planId)) ||
    n[String(t.planId)] !== t.planName ||
    !Object.hasOwn(n, String(t.currentPlanId)) ||
    !Number.isInteger(t.durationDays) ||
    Number(t.durationDays) < 0 ||
    Number(t.durationDays) > 365 ||
    [t.planExpiresAt, t.currentPlanExpiresAt].some(
      (i) => i !== null && (!Number.isSafeInteger(i) || Number(i) < 0),
    ) ||
    typeof t.replacesPaidPlan !== "boolean" ||
    typeof t.alreadyClaimed !== "boolean"
  )
    throw Error("Jac Code could not check this key. Try again.");
  return {
    planId: String(t.planId),
    planName: String(t.planName),
    durationDays: Number(t.durationDays),
    planExpiresAt: t.planExpiresAt,
    replacesPaidPlan: t.replacesPaidPlan,
    alreadyClaimed: t.alreadyClaimed,
    currentPlanId: String(t.currentPlanId),
    currentPlanExpiresAt: t.currentPlanExpiresAt,
  };
}
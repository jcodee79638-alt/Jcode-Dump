
function uo(e) {
  if (!e || typeof e !== "object" || Array.isArray(e)) throw Error("Jac Code: enter a valid plan key.");
  let t = e;
  if (
    Object.keys(t).some((n) => !["code", "confirm", "expectedPlanId", "expectedPlanExpiresAt"].includes(n)) ||
    typeof t.code !== "string" ||
    t.code.length > 128 ||
    !/^JAC[A-F0-9]{64}$/.test(t.code.toUpperCase().replace(/[\s-]/g, ""))
  )
    throw Error("Jac Code: enter a valid plan key.");
  if (t.confirm === void 0) {
    if (t.expectedPlanId !== void 0 || t.expectedPlanExpiresAt !== void 0)
      throw Error("Jac Code: check the key before activating it.");
    return { code: t.code.trim() };
  }
  if (
    t.confirm !== !0 ||
    !["free", "plus", "pro5x", "pro20x"].includes(String(t.expectedPlanId)) ||
    (t.expectedPlanExpiresAt !== null &&
      (!Number.isSafeInteger(t.expectedPlanExpiresAt) || Number(t.expectedPlanExpiresAt) < 0))
  )
    throw Error("Jac Code: check the key before activating it.");
  return {
    code: t.code.trim(),
    confirm: !0,
    expectedPlanId: String(t.expectedPlanId),
    expectedPlanExpiresAt: t.expectedPlanExpiresAt,
  };
}
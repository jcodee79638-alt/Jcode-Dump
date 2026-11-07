
function TZr(e) {
  let t = $v(e),
    r = k0(t.subscription),
    s = (H) => {
      let u = k0(H);
      return {
        remainingPercent:
          u.blockedByWeekly === !0
            ? 0
            : Math.max(
                0,
                Math.min(
                  100,
                  100 -
                    Math.ceil(
                      GF(u.tokenLimit) > 0 ? (GF(u.tokens) * 100) / GF(u.tokenLimit) : GF(u.percentUsed),
                    ),
                ),
              ),
        resetAt: GF(u.resetsAt),
      };
    },
    a = k0(t.admission);
  return {
    username: OM(k0(t.user).username),
    email: OM(k0(t.user).email) || void 0,
    plan: OM(r.planName),
    ...(r.sharedFree === !0 ? { sharedFree: !0 } : {}),
    planExpiresAt: r.planExpiresAt === null ? null : GF(r.planExpiresAt) || void 0,
    weekly: s(r.weekly),
    fiveHour: r.fiveHour ? s(r.fiveHour) : null,
    bankedResets: GF(r.bankedResets),
    ...(r.resetCredits &&
    Number.isSafeInteger(k0(r.resetCredits).available) &&
    Number(k0(r.resetCredits).available) >= 0 &&
    (k0(r.resetCredits).nextExpiresAt === null ||
      (Number.isSafeInteger(k0(r.resetCredits).nextExpiresAt) &&
        Number(k0(r.resetCredits).nextExpiresAt) >= 0))
      ? {
          resetCredits: {
            available: Number(k0(r.resetCredits).available),
            nextExpiresAt: k0(r.resetCredits).nextExpiresAt,
          },
        }
      : {}),
    admission: { allowed: a.allowed !== !1, code: OM(a.code) || "ready" },
    active: GF(k0(r.concurrency).active),
    concurrentLimit: GF(k0(r.concurrency).limit),
    globalPaused: t.globalPaused === !0,
    ...(t.announcements === void 0 ? {} : { announcements: _Zr(t.announcements) }),
  };
}
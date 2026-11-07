
function QEi(e, t) {
  if (e.some((r) => r._tag === "Unavailable" && mLr(t, r.key) !== void 0))
    return { _tag: "ReplacementBlocked" };
  return { _tag: "ReplacementReady", generation: zEi(e) };
}
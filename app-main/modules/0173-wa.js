
function wa(e) {
  if (
    !Xn(e) ||
    Object.keys(e).some((t) => !["version", "paused", "items"].includes(t)) ||
    e.version !== 1 ||
    typeof e.paused !== "boolean" ||
    !Array.isArray(e.items) ||
    e.items.length > gt.items
  )
    return !1;
  if (
    !e.items.every(
      (t, n) =>
        Xn(t) &&
        Object.keys(t).every((i) =>
          [
            "id",
            "sessionId",
            "directory",
            "text",
            "attachments",
            "thinking",
            "model",
            "accessMode",
            "createdAt",
            "position",
            "state",
            "message",
          ].includes(i),
        ) &&
        typeof t.id === "string" &&
        ma.test(t.id) &&
        t.position === n &&
        Number.isSafeInteger(t.createdAt) &&
        Number(t.createdAt) >= 0 &&
        ["queued", "admitting", "submitted", "needs_attention", "paused"].includes(String(t.state)) &&
        (t.message === void 0 || t.message === Yr) &&
        Ys(t),
    )
  )
    return !1;
  return new Set(e.items.map((t) => t.id)).size === e.items.length;
}
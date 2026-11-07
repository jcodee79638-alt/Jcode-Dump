
function oa(e, t) {
  if (!We(e) || e.version !== 1 || !We(e.task)) return !1;
  let n = e.task;
  if (
    n.id !== t ||
    typeof n.sessionId !== "string" ||
    n.sessionId.length > 256 ||
    typeof n.directory !== "string" ||
    n.directory.length > 2048 ||
    !W.default.isAbsolute(n.directory) ||
    typeof n.title !== "string" ||
    n.title.length > 256 ||
    typeof n.supportId !== "string" ||
    n.supportId.length > 256 ||
    !Me(n.startedAt) ||
    (n.endedAt !== void 0 && !Me(n.endedAt)) ||
    (n.restoredAt !== void 0 && !Me(n.restoredAt)) ||
    !["running", "completed", "failed", "interrupted", "cancelled"].includes(String(n.state)) ||
    !We(n.checkpoint) ||
    !Array.isArray(n.files) ||
    !Array.isArray(n.checks) ||
    n.files.length > ie.files * 2 ||
    n.checks.length > 64
  )
    return !1;
  if (
    typeof n.checkpoint.available !== "boolean" ||
    !Me(n.checkpoint.files, ie.files) ||
    !Me(n.checkpoint.bytes, ie.checkpointBytes * 2) ||
    !Me(n.checkpoint.skipped, 12002) ||
    (n.checkpoint.reason !== void 0 &&
      (typeof n.checkpoint.reason !== "string" || n.checkpoint.reason.length > 2000))
  )
    return !1;
  if (
    !n.files.every(
      (r) =>
        We(r) &&
        Ot(r.path) &&
        !Ce(r.path) &&
        ["added", "modified", "deleted"].includes(String(r.status)) &&
        Me(r.size, ie.fileBytes),
    )
  )
    return !1;
  if (
    !n.checks.every(
      (r) =>
        We(r) &&
        typeof r.id === "string" &&
        r.id.length <= 256 &&
        typeof r.label === "string" &&
        r.label.length <= 256 &&
        ["passed", "failed", "unknown"].includes(String(r.status)) &&
        (r.output === void 0 || (typeof r.output === "string" && r.output.length <= 4000)) &&
        (r.exitCode === void 0 || Number.isSafeInteger(r.exitCode)),
    )
  )
    return !1;
  if (
    e.events !== void 0 &&
    (!Array.isArray(e.events) ||
      e.events.length > 500 ||
      !e.events.every((r) => ss(r) && r.at >= Number(n.startedAt)) ||
      new Set(e.events.map((r) => r.id)).size !== e.events.length)
  )
    return !1;
  if (e.truncated !== void 0 && typeof e.truncated !== "boolean") return !1;
  let i = n.files;
  if (
    e.restored !== void 0 &&
    (!Array.isArray(e.restored) ||
      e.restored.length > ie.files * 2 ||
      !e.restored.every(
        (r) =>
          We(r) &&
          Ot(r.path) &&
          i.some((s) => We(s) && s.path === r.path) &&
          typeof r.fingerprint === "string" &&
          Lr.test(r.fingerprint) &&
          Me(r.at),
      ) ||
      new Set(e.restored.map((r) => r.path)).size !== e.restored.length)
  )
    return !1;
  if ((e.before !== void 0 && !ts(e.before)) || (e.after !== void 0 && !ts(e.after))) return !1;
  if (e.before && e.after && JSON.stringify(n.files) !== JSON.stringify(is(e.before, e.after))) return !1;
  return !0;
}
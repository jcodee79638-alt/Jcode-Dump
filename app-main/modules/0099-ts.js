
function ts(e) {
  if (
    !We(e) ||
    !Array.isArray(e.files) ||
    e.files.length > ie.files ||
    !e.files.every(
      (t) =>
        We(t) &&
        Ot(t.path) &&
        !Ce(t.path) &&
        typeof t.hash === "string" &&
        Lr.test(t.hash) &&
        Me(t.size, ie.fileBytes),
    ) ||
    !Me(e.bytes, ie.checkpointBytes) ||
    !Array.isArray(e.uncaptured) ||
    e.uncaptured.length > 6001 ||
    !e.uncaptured.every((t) => t === "" || Ot(t)) ||
    !We(e.reasons) ||
    !Object.entries(e.reasons).every(([t, n]) => t.length <= 128 && Me(n, 6001)) ||
    !Me(e.skipped, 6001) ||
    typeof e.incomplete !== "boolean"
  )
    return !1;
  return (
    new Set(e.files.map((t) => se(t.path))).size === e.files.length &&
    e.files.reduce((t, n) => t + n.size, 0) === e.bytes
  );
}
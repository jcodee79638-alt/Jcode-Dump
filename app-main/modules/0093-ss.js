
function ss(e) {
  return (
    We(e) &&
    typeof e.id === "string" &&
    /^[A-Za-z0-9_.:-]{1,256}$/.test(e.id) &&
    Me(e.at) &&
    ["started", "tool", "check", "files", "completed", "interrupted", "cancelled"].includes(String(e.kind)) &&
    typeof e.label === "string" &&
    e.label.length > 0 &&
    e.label.length <= 256 &&
    !/[\x00-\x1f]/.test(e.label) &&
    ["running", "passed", "failed", "unknown"].includes(String(e.status)) &&
    (e.path === void 0 || (Ot(e.path) && !Ce(e.path)))
  );
}
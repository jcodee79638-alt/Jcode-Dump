
function va(e) {
  if (e.status === "failed" || (Number.isSafeInteger(e.exitCode) && e.exitCode !== 0)) return "failed";
  if (
    e.status === "passed" &&
    e.exitCode === 0 &&
    typeof e.label === "string" &&
    e.label.trim() &&
    !/[;\r\n|&]/.test(e.label)
  )
    return "passed";
  return "unknown";
}
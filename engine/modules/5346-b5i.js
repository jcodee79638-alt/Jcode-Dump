
function b5i(e) {
  let r = { 1: "ERROR", 2: "WARN", 3: "INFO", 4: "HINT" }[e.severity || 1],
    s = e.range.start.line + 1,
    a = e.range.start.character + 1;
  return `${r} [${s}:${a}] ${e.message}`;
}
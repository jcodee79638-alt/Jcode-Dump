
function hDa(e) {
  let t = Nvi;
  if (t) {
    let r = t.stackTraceLimit;
    if (typeof r === "number") {
      try {
        t.stackTraceLimit = 0;
      } catch {
        return ((Nvi = null), new e());
      }
      try {
        return new e();
      } finally {
        t.stackTraceLimit = r;
      }
    }
  }
  return new e();
}
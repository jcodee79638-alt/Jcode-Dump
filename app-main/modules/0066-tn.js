
function tn(e, t) {
  let n = [...new Set(t.map((o) => o.trim()).filter(Boolean))],
    i = n.slice(0, 64),
    r = e.checks.map((o) => ({
      ...o,
      status:
        o.status === "failed" || (o.exitCode !== void 0 && o.exitCode !== 0)
          ? "failed"
          : o.status === "passed" && o.exitCode === 0 && !/[;\r\n|&]/.test(o.label)
            ? "passed"
            : "unknown",
    })),
    s = i.filter((o) => !r.some((l) => l.status === "passed" && l.label.trim() === o));
  return {
    state: r.some((o) => o.status === "failed")
      ? "failed"
      : n.length > 64 ||
          e.state !== "completed" ||
          s.length ||
          !r.length ||
          r.some((o) => o.status === "unknown")
        ? "incomplete"
        : "verified",
    expected: i,
    missing: s,
    checks: r,
  };
}
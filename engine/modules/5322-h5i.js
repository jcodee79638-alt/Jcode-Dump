
function h5i(e) {
  let t = new Set();
  return e.filter((r) => {
    let s = JSON.stringify({
      code: r.code,
      severity: r.severity,
      message: r.message,
      source: r.source,
      range: r.range,
    });
    if (t.has(s)) return !1;
    return (t.add(s), !0);
  });
}
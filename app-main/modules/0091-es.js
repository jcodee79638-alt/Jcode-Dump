
function es(e, t, n) {
  let i = [t, n].some((u) => u && (u.includes(0) || !ns.isUtf8(u))),
    r = t && !i ? new TextDecoder().decode(t) : void 0,
    s = n && !i ? new TextDecoder().decode(n) : void 0,
    o =
      r === void 0 || r === ""
        ? []
        : r.replace(/\n$/, "").split(`
`),
    l =
      s === void 0 || s === ""
        ? []
        : s.replace(/\n$/, "").split(`
`);
  return {
    before: r,
    after: s,
    patch: i
      ? "Binary file comparison is unavailable."
      : [
          `--- ${t ? `a/${e}` : "/dev/null"}`,
          `+++ ${n ? `b/${e}` : "/dev/null"}`,
          `@@ -${o.length ? 1 : 0},${o.length} +${l.length ? 1 : 0},${l.length} @@`,
          ...o.map((u) => `-${u}`),
          ...l.map((u) => `+${u}`),
        ].join(`
`),
  };
}
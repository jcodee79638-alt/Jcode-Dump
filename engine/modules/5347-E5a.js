
function E5a(e, t) {
  let r = t.filter((u) => u.severity === 1);
  if (r.length === 0) return "";
  let s = r.slice(0, v5i),
    a = r.length - v5i,
    H =
      a > 0
        ? `
... and ${a} more`
        : "";
  return `<diagnostics file="${e}">
${s.map(b5i).join(`
`)}${H}
</diagnostics>`;
}
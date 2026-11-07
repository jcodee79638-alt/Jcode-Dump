
function oTa(e) {
  let t = e.filter((r) => r.type === "reasoning");
  return t.length === 0
    ? void 0
    : t.map((r) => r.text).join(`
`);
}

var yma = "apply_patch",
  Mma,
  xma,
  Sma,
  Tma = (e) =>
    [
      "Applied patch sequentially:",
      ...e.applied.map((t) => `${t.type === "add" ? "A" : t.type === "delete" ? "D" : "M"} ${t.resource}`),
    ].join(`
`),
  vma,
  bma;
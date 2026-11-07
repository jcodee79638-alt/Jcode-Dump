
function d7(e) {
  let t = [];
  for (let [r, s] of Object.entries(e)) {
    if (typeof s === "string") {
      t.push({ permission: r, action: s, pattern: "*" });
      continue;
    }
    t.push(...Object.entries(s).map(([a, H]) => ({ permission: r, pattern: QTa(a), action: H })));
  }
  return t;
}
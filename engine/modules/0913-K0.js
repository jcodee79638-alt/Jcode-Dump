
function K0(...e) {
  let t = e.filter((r) => r !== void 0);
  if (t.length === 0) return;
  if (t.length === 1) return new pH(t);
  return new pH([
    new y1("("),
    Zt.join(
      t.map((r) => Zt`(${r})`),
      new y1(" or "),
    ),
    new y1(")"),
  ]);
}
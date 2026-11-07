
function WE(e, t = CA) {
  let r = $n.getValue(t, "i32");
  if (((t += lu), r === 0)) return null;
  let s = $n.getValue(t, "i32");
  t += lu;
  let a = $n.getValue(t, "i32");
  t += lu;
  let H = $n.getValue(t, "i32");
  t += lu;
  let u = $n.getValue(t, "i32");
  return new K7a(Nce, { id: r, tree: e, startIndex: s, startPosition: { row: a, column: H }, other: u });
}
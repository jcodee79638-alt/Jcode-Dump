
function Zt(e, ...t) {
  let r = [];
  if (t.length > 0 || (e.length > 0 && e[0] !== "")) r.push(new y1(e[0]));
  for (let [s, a] of t.entries()) r.push(a, new y1(e[s + 1]));
  return new pH(r);
}
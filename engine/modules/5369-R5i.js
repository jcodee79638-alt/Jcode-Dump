
function R5i(e, t) {
  if (e === "" || t === "") return Math.max(e.length, t.length);
  let r = Array.from({ length: e.length + 1 }, (s, a) =>
    Array.from({ length: t.length + 1 }, (H, u) => (a === 0 ? u : u === 0 ? a : 0)),
  );
  for (let s = 1; s <= e.length; s++)
    for (let a = 1; a <= t.length; a++) {
      let H = e[s - 1] === t[a - 1] ? 0 : 1;
      r[s][a] = Math.min(r[s - 1][a] + 1, r[s][a - 1] + 1, r[s - 1][a - 1] + H);
    }
  return r[e.length][t.length];
}
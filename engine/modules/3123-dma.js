
function dma(e, t, r) {
  let s = c$r(r),
    a = s.text.split(`
`);
  if (a.at(-1) === "") a.pop();
  let H = Lma(a, e, t),
    u = [...a];
  for (let [d, _, L] of H.toReversed()) u.splice(d, _, ...L);
  if (u.at(-1) !== "") u.push("");
  let f = c$r(
    u.join(`
`),
  );
  return { content: f.text, bom: s.bom || f.bom };
}
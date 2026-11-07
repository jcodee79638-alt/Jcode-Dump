
function Vjr(e, t, r) {
  let s = pR(r),
    a = s.text.split(`
`);
  if (a.length > 0 && a[a.length - 1] === "") a.pop();
  let H = IJa(a, e, t),
    u = DJa(a, H);
  if (u.length === 0 || u[u.length - 1] !== "") u.push("");
  let f = pR(
      u.join(`
`),
    ),
    d = f.text;
  return { unified_diff: yJa(s.text, d), content: d, bom: s.bom || f.bom };
}
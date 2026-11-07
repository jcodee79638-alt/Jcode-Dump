
function Mkt(e, t) {
  if (![e, t].every((a) => /^(0|[1-9]\d{0,5})\.(0|[1-9]\d{0,5})\.(0|[1-9]\d{0,5})$/.test(a))) throw new UP();
  let r = e.split(".").map(Number),
    s = t.split(".").map(Number);
  return r[0] - s[0] || r[1] - s[1] || r[2] - s[2];
}
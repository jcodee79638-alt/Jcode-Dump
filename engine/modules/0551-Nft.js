
function Nft(e, t) {
  if (Array.isArray(e)) return e.map((s) => Nft(s, t));
  if (!Dv(e)) return e;
  let r = {};
  for (let s of Object.keys(e)) {
    let a = e[s];
    if (s === "$ref") r[s] = typeof a === "string" ? t(a) : a;
    else if (Array.isArray(a) || Dv(a)) r[s] = Nft(a, t);
    else r[s] = a;
  }
  return r;
}
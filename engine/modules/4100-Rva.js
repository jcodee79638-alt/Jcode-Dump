
function Rva(e, t, r) {
  if (!r) return Wva(zDr[e], t);
  if (!r.startsWith(zDr[e])) throw Error(`ID ${r} does not start with ${zDr[e]}`);
  return r;
}
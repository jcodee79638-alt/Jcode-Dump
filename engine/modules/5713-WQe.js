
function WQe(e, t) {
  let r = vZi.get(e)?.get(t);
  if (r) return r;
  let s = TZi[t];
  if (s) return s;
  throw Error(`Unknown workspace adapter: ${t}`);
}
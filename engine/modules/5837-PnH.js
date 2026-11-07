
function PnH(e, t) {
  if (t) return t;
  let r = e.searchParams.get("workspace");
  if (!r) return;
  let s = kv(YS)(r);
  if (vl(s)) return Fes;
  return s.value;
}
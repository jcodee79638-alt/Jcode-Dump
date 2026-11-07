
function p2s(e, t) {
  if (t.length === 0) return e;
  let r = e;
  for (let s of t) if (((r = r?.children?.[String(s)]), !r)) return;
  return r;
}
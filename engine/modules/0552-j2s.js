
function j2s(e, t) {
  if (!Dv(e)) return;
  let r = {};
  for (let s of Object.keys(e)) r[s] = t(e[s], !1);
  return r;
}

function NAt(e, t) {
  let r = Nq(e, `PRAGMA table_info(${wAt(t)})`).map((s) => s.name);
  if (!r.length || r.length > 150 || r.some((s) => !/^[A-Za-z0-9_]{1,100}$/.test(s))) throw Ap();
  return r;
}
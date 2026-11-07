
function TVs(e) {
  let t = { sql: "", params: [] },
    r = [];
  for (let s of e) (r.push(s.sql), t.params.push(...s.params));
  return ((t._sql = Object.assign(r, { raw: r })), t);
}
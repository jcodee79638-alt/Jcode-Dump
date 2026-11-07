
function SVs(e) {
  let t = { sql: "", params: [] };
  for (let r of e) ((t.sql += r.sql), t.params.push(...r.params));
  return t;
}
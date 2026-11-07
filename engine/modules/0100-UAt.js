
function UAt(e) {
  let t = Nq(
    e,
    "SELECT name, sql FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name",
  );
  if (
    t.length > 128 ||
    t.some(
      (r) =>
        !/^[A-Za-z0-9_]{1,100}$/.test(r.name) ||
        typeof r.sql !== "string" ||
        r.sql.length > 1e5 ||
        !/^CREATE TABLE\s/i.test(r.sql) ||
        /;|--|\/\*/.test(r.sql),
    )
  )
    throw Ap();
  return t;
}
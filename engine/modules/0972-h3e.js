
function h3e(e) {
  let { localMigrations: t, dbMigrations: r } = e,
    s = new Set(r.map((a) => a.name).filter((a) => a !== null));
  return t.filter((a) => !a.name || !s.has(a.name));
}
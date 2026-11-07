
function KGs(e, t) {
  return ft(function* () {
    yield* e.run(
      Zt`CREATE TABLE IF NOT EXISTS ${Zt.identifier("migration")} (id TEXT PRIMARY KEY, time_completed INTEGER NOT NULL)`,
    );
    let r = new Set((yield* e.all(Zt`SELECT id FROM ${Zt.identifier("migration")}`)).map((s) => s.id));
    if (r.size === 0) {
      if (
        yield* e.get(
          Zt`SELECT name FROM sqlite_master WHERE type = 'table' AND name = ${"__drizzle_migrations"}`,
        )
      ) {
        let s = (yield* e.all(Zt`SELECT name FROM pragma_table_info('__drizzle_migrations')`)).some(
          (a) => a.name === "name",
        );
        if (s)
          yield* e.run(Zt`
            INSERT OR IGNORE INTO ${Zt.identifier("migration")} (id, time_completed)
            SELECT name, ${Date.now()}
            FROM ${Zt.identifier("__drizzle_migrations")}
            WHERE name IS NOT NULL
          `);
        if (!s) {
          let a = yield* e.all(Zt`
            SELECT created_at, strftime('%Y%m%d%H%M%S', created_at / 1000, 'unixepoch') AS prefix
            FROM ${Zt.identifier("__drizzle_migrations")}
            WHERE created_at IS NOT NULL
          `);
          for (let H of a) {
            let u = t.find((f) => f.id.startsWith(`${H.prefix}_`));
            if (!u)
              return yield* No(
                Error(`Legacy migration timestamp ${H.created_at} does not match any known migration`),
              );
            yield* e.run(Zt`
              INSERT OR IGNORE INTO ${Zt.identifier("migration")} (id, time_completed)
              VALUES (${u.id}, ${Date.now()})
            `);
          }
        }
        r = new Set((yield* e.all(Zt`SELECT id FROM ${Zt.identifier("migration")}`)).map((a) => a.id));
      }
    }
    for (let s of t) {
      if (r.has(s.id)) continue;
      yield* e.transaction((a) =>
        ft(function* () {
          (yield* s.up(a),
            yield* a.run(
              Zt`INSERT INTO ${Zt.identifier("migration")} (id, time_completed) VALUES (${s.id}, ${Date.now()})`,
            ));
        }),
      );
    }
  });
}
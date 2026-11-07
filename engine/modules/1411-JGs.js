
function JGs(e) {
  return XGs.withPermit(
    ft(function* () {
      let t = yield* e.all(
        Zt`SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%'`,
      );
      if (t.some((r) => r.name === "session")) return yield* KGs(e, vrr);
      if (t.length > 0) return yield* No("Database is not empty and has no session table");
      yield* e.transaction((r) =>
        ft(function* () {
          (yield* dgn.up(r),
            yield* r.run(
              Zt`CREATE TABLE ${Zt.identifier("migration")} (id TEXT PRIMARY KEY, time_completed INTEGER NOT NULL)`,
            ),
            yield* ja(vrr, (s) =>
              r.run(
                Zt`INSERT INTO ${Zt.identifier("migration")} (id, time_completed) VALUES (${s.id}, ${Date.now()})`,
              ),
            ));
        }),
      );
    }),
  );
}
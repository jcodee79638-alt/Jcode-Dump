
var b$n = ne(() => {
  Gt();
  SGs = {
    id: "20260511000411_data_migration_state",
    up(e) {
      return ft(function* () {
        yield* e.run(
          "\n        CREATE TABLE `data_migration` (\n          `name` text PRIMARY KEY,\n          `time_completed` integer NOT NULL\n        );\n      ",
        );
      });
    },
  };
});
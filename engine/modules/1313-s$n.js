
var s$n = ne(() => {
  Gt();
  dGs = {
    id: "20260303231226_add_workspace_fields",
    up(e) {
      return ft(function* () {
        (yield* e.run("ALTER TABLE `workspace` ADD `type` text NOT NULL;"),
          yield* e.run("ALTER TABLE `workspace` ADD `name` text;"),
          yield* e.run("ALTER TABLE `workspace` ADD `directory` text;"),
          yield* e.run("ALTER TABLE `workspace` ADD `extra` text;"),
          yield* e.run("ALTER TABLE `workspace` DROP COLUMN `config`;"));
      });
    },
  };
});
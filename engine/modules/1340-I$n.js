
var I$n = ne(() => {
  Gt();
  DGs = {
    id: "20260501142318_next_venus",
    up(e) {
      return ft(function* () {
        (yield* e.run("ALTER TABLE `session` ADD `agent` text;"),
          yield* e.run("ALTER TABLE `session` ADD `model` text;"));
      });
    },
  };
});
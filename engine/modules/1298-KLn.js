
var KLn = ne(() => {
  Gt();
  AGs = {
    id: "20260211171708_add_project_commands",
    up(e) {
      return ft(function* () {
        yield* e.run("ALTER TABLE `project` ADD `commands` text;");
      });
    },
  };
});
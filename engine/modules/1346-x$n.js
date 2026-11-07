
var x$n = ne(() => {
  Gt();
  MGs = {
    id: "20260507164347_add_workspace_time",
    up(e) {
      return ft(function* () {
        yield* e.run("ALTER TABLE `workspace` ADD `time_used` integer NOT NULL DEFAULT 0;");
      });
    },
  };
});
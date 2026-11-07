
var g$n = ne(() => {
  Gt();
  IGs = {
    id: "20260428004200_add_session_path",
    up(e) {
      return ft(function* () {
        yield* e.run("ALTER TABLE `session` ADD `path` text;");
      });
    },
  };
});
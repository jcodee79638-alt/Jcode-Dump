
var t$n = ne(() => {
  Gt();
  fGs = {
    id: "20260227213759_add_session_workspace_id",
    up(e) {
      return ft(function* () {
        (yield* e.run("ALTER TABLE `session` ADD `workspace_id` text;"),
          yield* e.run("CREATE INDEX `session_workspace_idx` ON `session` (`workspace_id`);"));
      });
    },
  };
});
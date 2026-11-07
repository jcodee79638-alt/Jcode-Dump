
var tgn = ne(() => {
  Gt();
  FGs = {
    id: "20260605042240_add_context_epoch_agent",
    up(e) {
      return ft(function* () {
        yield* e.run("ALTER TABLE `session_context_epoch` ADD `agent` text DEFAULT 'build' NOT NULL;");
      });
    },
  };
});
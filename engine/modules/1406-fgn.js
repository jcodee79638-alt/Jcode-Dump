
var fgn = ne(() => {
  Gt();
  GGs = {
    id: "20260622202450_simplify_session_input",
    up(e) {
      return ft(function* () {
        (yield* e.run("DELETE FROM `session_context_epoch`;"),
          yield* e.run("DELETE FROM `session_input`;"),
          yield* e.run("DELETE FROM `session_message`;"),
          yield* e.run("DELETE FROM `event`;"),
          yield* e.run("DELETE FROM `event_sequence`;"),
          yield* e.run("UPDATE `session` SET `workspace_id` = NULL WHERE `workspace_id` IS NOT NULL;"),
          yield* e.run("DELETE FROM `workspace`;"));
      });
    },
  };
});
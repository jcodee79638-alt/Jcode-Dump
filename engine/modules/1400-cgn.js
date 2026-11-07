
var cgn = ne(() => {
  Gt();
  VGs = {
    id: "20260622142730_simplify_session_context_epoch",
    up(e) {
      return ft(function* () {
        (yield* e.run("ALTER TABLE `session_context_epoch` DROP COLUMN `agent`;"),
          yield* e.run("ALTER TABLE `session_context_epoch` DROP COLUMN `replacement_seq`;"),
          yield* e.run("ALTER TABLE `session_context_epoch` DROP COLUMN `revision`;"));
      });
    },
  };
});
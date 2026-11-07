
var Z$n = ne(() => {
  Gt();
  NGs = {
    id: "20260605003541_add_session_context_snapshot",
    up(e) {
      return ft(function* () {
        yield* e.run(
          "\n        CREATE TABLE `session_context_epoch` (\n          `session_id` text PRIMARY KEY,\n          `baseline` text NOT NULL,\n          `snapshot` text NOT NULL,\n          `baseline_seq` integer NOT NULL,\n          `replacement_seq` integer,\n          `revision` integer DEFAULT 0 NOT NULL,\n          CONSTRAINT `fk_session_context_epoch_session_id_session_id_fk` FOREIGN KEY (`session_id`) REFERENCES `session`(`id`) ON DELETE CASCADE\n        );\n      ",
        );
      });
    },
  };
});
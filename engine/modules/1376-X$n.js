
var X$n = ne(() => {
  Gt();
  kGs = {
    id: "20260603141458_session_input_inbox",
    up(e) {
      return ft(function* () {
        (yield* e.run(
          "\n        CREATE TABLE `session_input` (\n          `seq` integer PRIMARY KEY AUTOINCREMENT,\n          `id` text NOT NULL UNIQUE,\n          `session_id` text NOT NULL,\n          `prompt` text NOT NULL,\n          `delivery` text NOT NULL,\n          `promoted_seq` integer,\n          `time_created` integer NOT NULL,\n          CONSTRAINT `fk_session_input_session_id_session_id_fk` FOREIGN KEY (`session_id`) REFERENCES `session`(`id`) ON DELETE CASCADE\n        );\n      ",
        ),
          yield* e.run(
            "CREATE INDEX `session_input_session_pending_seq_idx` ON `session_input` (`session_id`,`promoted_seq`,`seq`);",
          ));
      });
    },
  };
});
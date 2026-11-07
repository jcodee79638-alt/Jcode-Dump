
var Q$n = ne(() => {
  Gt();
  UGs = {
    id: "20260604172448_event_sourced_session_input",
    up(e) {
      return ft(function* () {
        (yield* e.run("DELETE FROM `session_input`;"),
          yield* e.run("DELETE FROM `session_message`;"),
          yield* e.run("DELETE FROM `event`;"),
          yield* e.run("DELETE FROM `event_sequence`;"),
          yield* e.run("UPDATE `session` SET `workspace_id` = NULL;"),
          yield* e.run("DELETE FROM `workspace`;"),
          yield* e.run("DROP INDEX IF EXISTS `event_aggregate_seq_idx`;"),
          yield* e.run("CREATE UNIQUE INDEX `event_aggregate_seq_idx` ON `event` (`aggregate_id`,`seq`);"),
          yield* e.run("DROP INDEX IF EXISTS `session_message_session_seq_idx`;"),
          yield* e.run(
            "CREATE UNIQUE INDEX `session_message_session_seq_idx` ON `session_message` (`session_id`,`seq`);",
          ),
          yield* e.run("PRAGMA foreign_keys=OFF;"),
          yield* e.run(
            "\n        CREATE TABLE `__new_session_input` (\n          `id` text PRIMARY KEY,\n          `session_id` text NOT NULL,\n          `prompt` text NOT NULL,\n          `delivery` text NOT NULL,\n          `admitted_seq` integer NOT NULL,\n          `promoted_seq` integer,\n          `time_created` integer NOT NULL,\n          CONSTRAINT `fk_session_input_session_id_session_id_fk` FOREIGN KEY (`session_id`) REFERENCES `session`(`id`) ON DELETE CASCADE\n        );\n      ",
          ),
          yield* e.run("DROP TABLE `session_input`;"),
          yield* e.run("ALTER TABLE `__new_session_input` RENAME TO `session_input`;"),
          yield* e.run("PRAGMA foreign_keys=ON;"),
          yield* e.run(
            "CREATE INDEX `session_input_session_pending_delivery_seq_idx` ON `session_input` (`session_id`,`promoted_seq`,`delivery`,`admitted_seq`);",
          ),
          yield* e.run(
            "CREATE UNIQUE INDEX `session_input_session_admitted_seq_idx` ON `session_input` (`session_id`,`admitted_seq`);",
          ),
          yield* e.run(
            "CREATE UNIQUE INDEX `session_input_session_promoted_seq_idx` ON `session_input` (`session_id`,`promoted_seq`);",
          ));
      });
    },
  };
});
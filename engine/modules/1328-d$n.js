
var d$n = ne(() => {
  Gt();
  $Gs = {
    id: "20260413175956_chief_energizer",
    up(e) {
      return ft(function* () {
        (yield* e.run(
          "\n        CREATE TABLE `session_entry` (\n          `id` text PRIMARY KEY,\n          `session_id` text NOT NULL,\n          `type` text NOT NULL,\n          `time_created` integer NOT NULL,\n          `time_updated` integer NOT NULL,\n          `data` text NOT NULL,\n          CONSTRAINT `fk_session_entry_session_id_session_id_fk` FOREIGN KEY (`session_id`) REFERENCES `session`(`id`) ON DELETE CASCADE\n        );\n      ",
        ),
          yield* e.run("CREATE INDEX `session_entry_session_idx` ON `session_entry` (`session_id`);"),
          yield* e.run(
            "CREATE INDEX `session_entry_session_type_idx` ON `session_entry` (`session_id`,`type`);",
          ),
          yield* e.run("CREATE INDEX `session_entry_time_created_idx` ON `session_entry` (`time_created`);"));
      });
    },
  };
});
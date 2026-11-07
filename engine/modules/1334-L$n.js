
var L$n = ne(() => {
  Gt();
  EGs = {
    id: "20260427172553_slow_nightmare",
    up(e) {
      return ft(function* () {
        (yield* e.run(
          "\n        CREATE TABLE `session_message` (\n          `id` text PRIMARY KEY,\n          `session_id` text NOT NULL,\n          `type` text NOT NULL,\n          `time_created` integer NOT NULL,\n          `time_updated` integer NOT NULL,\n          `data` text NOT NULL,\n          CONSTRAINT `fk_session_message_session_id_session_id_fk` FOREIGN KEY (`session_id`) REFERENCES `session`(`id`) ON DELETE CASCADE\n        );\n      ",
        ),
          yield* e.run("DROP INDEX IF EXISTS `session_entry_session_idx`;"),
          yield* e.run("DROP INDEX IF EXISTS `session_entry_session_type_idx`;"),
          yield* e.run("DROP INDEX IF EXISTS `session_entry_time_created_idx`;"),
          yield* e.run("CREATE INDEX `session_message_session_idx` ON `session_message` (`session_id`);"),
          yield* e.run(
            "CREATE INDEX `session_message_session_type_idx` ON `session_message` (`session_id`,`type`);",
          ),
          yield* e.run(
            "CREATE INDEX `session_message_time_created_idx` ON `session_message` (`time_created`);",
          ),
          yield* e.run("DROP TABLE `session_entry`;"));
      });
    },
  };
});
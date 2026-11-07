
var q$n = ne(() => {
  Gt();
  wGs = {
    id: "20260603040000_session_message_projection_order",
    up(e) {
      return ft(function* () {
        (yield* e.run("DELETE FROM `session_message`;"),
          yield* e.run("ALTER TABLE `session_message` ADD COLUMN `seq` integer NOT NULL;"),
          yield* e.run("DROP INDEX IF EXISTS `session_message_session_type_time_created_id_idx`;"),
          yield* e.run(
            "CREATE INDEX `session_message_session_seq_idx` ON `session_message` (`session_id`,`seq`);",
          ),
          yield* e.run(
            "CREATE INDEX `session_message_session_type_seq_idx` ON `session_message` (`session_id`,`type`,`seq`);",
          ));
      });
    },
  };
});
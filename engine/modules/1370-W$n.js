
var W$n = ne(() => {
  Gt();
  CGs = {
    id: "20260603001617_session_message_projection_indexes",
    up(e) {
      return ft(function* () {
        (yield* e.run("DROP INDEX IF EXISTS `session_message_session_idx`;"),
          yield* e.run("DROP INDEX IF EXISTS `session_message_session_type_idx`;"),
          yield* e.run("CREATE INDEX `event_aggregate_seq_idx` ON `event` (`aggregate_id`,`seq`);"),
          yield* e.run(
            "CREATE INDEX `session_message_session_time_created_id_idx` ON `session_message` (`session_id`,`time_created`,`id`);",
          ),
          yield* e.run(
            "CREATE INDEX `session_message_session_type_time_created_id_idx` ON `session_message` (`session_id`,`type`,`time_created`,`id`);",
          ));
      });
    },
  };
});
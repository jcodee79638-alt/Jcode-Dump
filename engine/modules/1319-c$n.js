
var c$n = ne(() => {
  Gt();
  _Gs = {
    id: "20260312043431_session_message_cursor",
    up(e) {
      return ft(function* () {
        (yield* e.run("DROP INDEX IF EXISTS `message_session_idx`;"),
          yield* e.run("DROP INDEX IF EXISTS `part_message_idx`;"),
          yield* e.run(
            "CREATE INDEX `message_session_time_created_id_idx` ON `message` (`session_id`,`time_created`,`id`);",
          ),
          yield* e.run("CREATE INDEX `part_message_id_id_idx` ON `part` (`message_id`,`id`);"));
      });
    },
  };
});
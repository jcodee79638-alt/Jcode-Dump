
var K$n = ne(() => {
  Gt();
  OGs = {
    id: "20260603160727_jittery_ezekiel_stane",
    up(e) {
      return ft(function* () {
        (yield* e.run("DROP INDEX IF EXISTS `session_input_session_pending_seq_idx`;"),
          yield* e.run(
            "CREATE INDEX IF NOT EXISTS `event_aggregate_type_seq_idx` ON `event` (`aggregate_id`,`type`,`seq`);",
          ),
          yield* e.run(
            "CREATE INDEX IF NOT EXISTS `session_input_session_pending_delivery_seq_idx` ON `session_input` (`session_id`,`promoted_seq`,`delivery`,`seq`);",
          ),
          yield* e.run(
            "CREATE INDEX IF NOT EXISTS `session_message_session_time_created_id_idx` ON `session_message` (`session_id`,`time_created`,`id`);",
          ));
      });
    },
  };
});
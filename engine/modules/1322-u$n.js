
var u$n = ne(() => {
  Gt();
  hGs = {
    id: "20260323234822_events",
    up(e) {
      return ft(function* () {
        (yield* e.run(
          "\n        CREATE TABLE `event_sequence` (\n          `aggregate_id` text PRIMARY KEY,\n          `seq` integer NOT NULL\n        );\n      ",
        ),
          yield* e.run(
            "\n        CREATE TABLE `event` (\n          `id` text PRIMARY KEY,\n          `aggregate_id` text NOT NULL,\n          `seq` integer NOT NULL,\n          `type` text NOT NULL,\n          `data` text NOT NULL,\n          CONSTRAINT `fk_event_aggregate_id_event_sequence_aggregate_id_fk` FOREIGN KEY (`aggregate_id`) REFERENCES `event_sequence`(`aggregate_id`) ON DELETE CASCADE\n        );\n      ",
          ));
      });
    },
  };
});
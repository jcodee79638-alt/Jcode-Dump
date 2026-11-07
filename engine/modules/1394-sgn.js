
var sgn = ne(() => {
  Gt();
  RGs = {
    id: "20260611192811_lush_chimera",
    up(e) {
      return ft(function* () {
        (yield* e.run("DROP INDEX IF EXISTS `credential_connector_active_idx`;"),
          yield* e.run("DROP TABLE `credential`;"),
          yield* e.run(
            "\n        CREATE TABLE `credential` (\n          `id` text PRIMARY KEY,\n          `integration_id` text,\n          `label` text NOT NULL,\n          `value` text NOT NULL,\n          `connector_id` text,\n          `method_id` text,\n          `active` integer,\n          `time_created` integer NOT NULL,\n          `time_updated` integer NOT NULL\n        );\n      ",
          ));
      });
    },
  };
});
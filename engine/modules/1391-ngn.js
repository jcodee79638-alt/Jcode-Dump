
var ngn = ne(() => {
  Gt();
  BGs = {
    id: "20260611035744_credential",
    up(e) {
      return ft(function* () {
        (yield* e.run(
          "\n        CREATE TABLE `credential` (\n          `id` text PRIMARY KEY,\n          `connector_id` text NOT NULL,\n          `method_id` text NOT NULL,\n          `label` text NOT NULL,\n          `value` text NOT NULL,\n          `active` integer DEFAULT false NOT NULL,\n          `time_created` integer NOT NULL,\n          `time_updated` integer NOT NULL\n        );\n      ",
        ),
          yield* e.run(
            'CREATE UNIQUE INDEX `credential_connector_active_idx` ON `credential` (`connector_id`) WHERE "credential"."active" = 1;',
          ));
      });
    },
  };
});
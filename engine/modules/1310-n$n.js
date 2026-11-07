
var n$n = ne(() => {
  Gt();
  pGs = {
    id: "20260228203230_blue_harpoon",
    up(e) {
      return ft(function* () {
        (yield* e.run(
          "\n        CREATE TABLE `account` (\n          `id` text PRIMARY KEY,\n          `email` text NOT NULL,\n          `url` text NOT NULL,\n          `access_token` text NOT NULL,\n          `refresh_token` text NOT NULL,\n          `token_expiry` integer,\n          `selected_org_id` text,\n          `time_created` integer NOT NULL,\n          `time_updated` integer NOT NULL\n        );\n      ",
        ),
          yield* e.run(
            "\n        CREATE TABLE `account_state` (\n          `id` integer PRIMARY KEY NOT NULL,\n          `active_account_id` text,\n          FOREIGN KEY (`active_account_id`) REFERENCES `account`(`id`) ON UPDATE no action ON DELETE set null\n        );\n      ",
          ));
      });
    },
  };
});

var QLn = ne(() => {
  Gt();
  uGs = {
    id: "20260213144116_wakeful_the_professor",
    up(e) {
      return ft(function* () {
        yield* e.run(
          "\n        CREATE TABLE `control_account` (\n          `email` text NOT NULL,\n          `url` text NOT NULL,\n          `access_token` text NOT NULL,\n          `refresh_token` text NOT NULL,\n          `token_expiry` integer,\n          `active` integer NOT NULL,\n          `time_created` integer NOT NULL,\n          `time_updated` integer NOT NULL,\n          CONSTRAINT `control_account_pk` PRIMARY KEY(`email`, `url`)\n        );\n      ",
        );
      });
    },
  };
});
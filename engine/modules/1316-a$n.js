
var a$n = ne(() => {
  Gt();
  mGs = {
    id: "20260309230000_move_org_to_state",
    up(e) {
      return ft(function* () {
        (yield* e.run("ALTER TABLE `account_state` ADD `active_org_id` text;"),
          yield* e.run(
            "UPDATE `account_state` SET `active_org_id` = (SELECT `selected_org_id` FROM `account` WHERE `account`.`id` = `account_state`.`active_account_id`);",
          ),
          yield* e.run("ALTER TABLE `account` DROP COLUMN `selected_org_id`;"));
      });
    },
  };
});
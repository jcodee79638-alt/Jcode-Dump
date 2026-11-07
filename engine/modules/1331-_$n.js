
var _$n = ne(() => {
  Gt();
  gGs = {
    id: "20260423070820_add_icon_url_override",
    up(e) {
      return ft(function* () {
        yield* e.run(
          "\n        ALTER TABLE `project` ADD `icon_url_override` text;\n        UPDATE `project` SET `icon_url_override` = `icon_url` WHERE `icon_url` IS NOT NULL;\n      ",
        );
      });
    },
  };
});
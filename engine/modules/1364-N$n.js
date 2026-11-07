
var N$n = ne(() => {
  Gt();
  jGs = {
    id: "20260602002951_lowly_union_jack",
    up(e) {
      return ft(function* () {
        (yield* e.run(
          "\n        CREATE TABLE `permission` (\n          `id` text PRIMARY KEY,\n          `project_id` text NOT NULL,\n          `action` text NOT NULL,\n          `resource` text NOT NULL,\n          `time_created` integer NOT NULL,\n          `time_updated` integer NOT NULL,\n          CONSTRAINT `fk_permission_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE CASCADE\n        );\n      ",
        ),
          yield* e.run(
            "CREATE UNIQUE INDEX `permission_project_action_resource_idx` ON `permission` (`project_id`,`action`,`resource`);",
          ));
      });
    },
  };
});
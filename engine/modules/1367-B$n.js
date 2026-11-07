
var B$n = ne(() => {
  Gt();
  PGs = {
    id: "20260602182828_add_project_directories",
    up(e) {
      return ft(function* () {
        yield* e.run(
          "\n        CREATE TABLE `project_directory` (\n          `project_id` text NOT NULL,\n          `directory` text NOT NULL,\n          `type` text NOT NULL,\n          `time_created` integer NOT NULL,\n          CONSTRAINT `project_directory_pk` PRIMARY KEY(`project_id`, `directory`),\n          CONSTRAINT `fk_project_directory_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE CASCADE\n        );\n      ",
        );
      });
    },
  };
});
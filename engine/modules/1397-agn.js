
var agn = ne(() => {
  Gt();
  WGs = {
    id: "20260612174303_project_dir_strategy",
    up(e) {
      return ft(function* () {
        (yield* e.run("ALTER TABLE `project_directory` ADD `strategy` text;"),
          yield* e.run("PRAGMA foreign_keys=OFF;"),
          yield* e.run(
            "\n        CREATE TABLE `__new_project_directory` (\n          `project_id` text NOT NULL,\n          `directory` text NOT NULL,\n          `type` text,\n          `strategy` text,\n          `time_created` integer NOT NULL,\n          CONSTRAINT `project_directory_pk` PRIMARY KEY(`project_id`, `directory`),\n          CONSTRAINT `fk_project_directory_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE CASCADE\n        );\n      ",
          ),
          yield* e.run(
            "INSERT INTO `__new_project_directory`(`project_id`, `directory`, `type`, `time_created`) SELECT `project_id`, `directory`, `type`, `time_created` FROM `project_directory`;",
          ),
          yield* e.run("DROP TABLE `project_directory`;"),
          yield* e.run("ALTER TABLE `__new_project_directory` RENAME TO `project_directory`;"),
          yield* e.run("PRAGMA foreign_keys=ON;"));
      });
    },
  };
});
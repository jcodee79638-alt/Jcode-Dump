
var f$n = ne(() => {
  Gt();
  LGs = {
    id: "20260410174513_workspace-name",
    up(e) {
      return ft(function* () {
        let r = (yield* e.all("PRAGMA table_info(`workspace`)")).some((s) => s.name === "name")
          ? "`name`"
          : "''";
        (yield* e.run("PRAGMA foreign_keys=OFF;"),
          yield* e.run(
            "\n        CREATE TABLE `__new_workspace` (\n          `id` text PRIMARY KEY,\n          `type` text NOT NULL,\n          `name` text DEFAULT '' NOT NULL,\n          `branch` text,\n          `directory` text,\n          `extra` text,\n          `project_id` text NOT NULL,\n          CONSTRAINT `fk_workspace_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE CASCADE\n        );\n      ",
          ),
          yield* e.run(
            `INSERT INTO \`__new_workspace\`(\`id\`, \`type\`, \`branch\`, \`name\`, \`directory\`, \`extra\`, \`project_id\`) SELECT \`id\`, \`type\`, \`branch\`, ${r}, \`directory\`, \`extra\`, \`project_id\` FROM \`workspace\`;`,
          ),
          yield* e.run("DROP TABLE `workspace`;"),
          yield* e.run("ALTER TABLE `__new_workspace` RENAME TO `workspace`;"),
          yield* e.run("PRAGMA foreign_keys=ON;"));
      });
    },
  };
});
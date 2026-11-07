
var ZLn = ne(() => {
  Gt();
  lGs = {
    id: "20260225215848_workspace",
    up(e) {
      return ft(function* () {
        yield* e.run(
          "\n        CREATE TABLE `workspace` (\n          `id` text PRIMARY KEY,\n          `branch` text,\n          `project_id` text NOT NULL,\n          `config` text NOT NULL,\n          CONSTRAINT `fk_workspace_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE CASCADE\n        );\n      ",
        );
      });
    },
  };
});
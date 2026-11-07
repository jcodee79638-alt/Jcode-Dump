
var XLn = ne(() => {
  Gt();
  cGs = {
    id: "20260127222353_familiar_lady_ursula",
    up(e) {
      return ft(function* () {
        (yield* e.run(
          "\n        CREATE TABLE `project` (\n          `id` text PRIMARY KEY,\n          `worktree` text NOT NULL,\n          `vcs` text,\n          `name` text,\n          `icon_url` text,\n          `icon_color` text,\n          `time_created` integer NOT NULL,\n          `time_updated` integer NOT NULL,\n          `time_initialized` integer,\n          `sandboxes` text NOT NULL\n        );\n      ",
        ),
          yield* e.run(
            "\n        CREATE TABLE `message` (\n          `id` text PRIMARY KEY,\n          `session_id` text NOT NULL,\n          `time_created` integer NOT NULL,\n          `time_updated` integer NOT NULL,\n          `data` text NOT NULL,\n          CONSTRAINT `fk_message_session_id_session_id_fk` FOREIGN KEY (`session_id`) REFERENCES `session`(`id`) ON DELETE CASCADE\n        );\n      ",
          ),
          yield* e.run(
            "\n        CREATE TABLE `part` (\n          `id` text PRIMARY KEY,\n          `message_id` text NOT NULL,\n          `session_id` text NOT NULL,\n          `time_created` integer NOT NULL,\n          `time_updated` integer NOT NULL,\n          `data` text NOT NULL,\n          CONSTRAINT `fk_part_message_id_message_id_fk` FOREIGN KEY (`message_id`) REFERENCES `message`(`id`) ON DELETE CASCADE\n        );\n      ",
          ),
          yield* e.run(
            "\n        CREATE TABLE `permission` (\n          `project_id` text PRIMARY KEY,\n          `time_created` integer NOT NULL,\n          `time_updated` integer NOT NULL,\n          `data` text NOT NULL,\n          CONSTRAINT `fk_permission_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE CASCADE\n        );\n      ",
          ),
          yield* e.run(
            "\n        CREATE TABLE `session` (\n          `id` text PRIMARY KEY,\n          `project_id` text NOT NULL,\n          `parent_id` text,\n          `slug` text NOT NULL,\n          `directory` text NOT NULL,\n          `title` text NOT NULL,\n          `version` text NOT NULL,\n          `share_url` text,\n          `summary_additions` integer,\n          `summary_deletions` integer,\n          `summary_files` integer,\n          `summary_diffs` text,\n          `revert` text,\n          `permission` text,\n          `time_created` integer NOT NULL,\n          `time_updated` integer NOT NULL,\n          `time_compacting` integer,\n          `time_archived` integer,\n          CONSTRAINT `fk_session_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE CASCADE\n        );\n      ",
          ),
          yield* e.run(
            "\n        CREATE TABLE `todo` (\n          `session_id` text NOT NULL,\n          `content` text NOT NULL,\n          `status` text NOT NULL,\n          `priority` text NOT NULL,\n          `position` integer NOT NULL,\n          `time_created` integer NOT NULL,\n          `time_updated` integer NOT NULL,\n          CONSTRAINT `todo_pk` PRIMARY KEY(`session_id`, `position`),\n          CONSTRAINT `fk_todo_session_id_session_id_fk` FOREIGN KEY (`session_id`) REFERENCES `session`(`id`) ON DELETE CASCADE\n        );\n      ",
          ),
          yield* e.run(
            "\n        CREATE TABLE `session_share` (\n          `session_id` text PRIMARY KEY,\n          `id` text NOT NULL,\n          `secret` text NOT NULL,\n          `url` text NOT NULL,\n          `time_created` integer NOT NULL,\n          `time_updated` integer NOT NULL,\n          CONSTRAINT `fk_session_share_session_id_session_id_fk` FOREIGN KEY (`session_id`) REFERENCES `session`(`id`) ON DELETE CASCADE\n        );\n      ",
          ),
          yield* e.run("CREATE INDEX `message_session_idx` ON `message` (`session_id`);"),
          yield* e.run("CREATE INDEX `part_message_idx` ON `part` (`message_id`);"),
          yield* e.run("CREATE INDEX `part_session_idx` ON `part` (`session_id`);"),
          yield* e.run("CREATE INDEX `session_project_idx` ON `session` (`project_id`);"),
          yield* e.run("CREATE INDEX `session_parent_idx` ON `session` (`parent_id`);"),
          yield* e.run("CREATE INDEX `todo_session_idx` ON `todo` (`session_id`);"));
      });
    },
  };
});
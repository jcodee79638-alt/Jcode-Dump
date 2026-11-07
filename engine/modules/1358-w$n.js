
var w$n = ne(() => {
  Gt();
  vGs = {
    id: "20260601010001_normalize_storage_paths",
    up(e) {
      return ft(function* () {
        (yield* e.run(
          "UPDATE project SET worktree = REPLACE(worktree, char(92), '/') WHERE worktree GLOB '[A-Za-z]:' || char(92) || '*' OR worktree LIKE char(92) || char(92) || '%';",
        ),
          yield* e.run(
            "UPDATE project SET sandboxes = REPLACE(sandboxes, char(92) || char(92), '/') WHERE instr(sandboxes, char(92)) > 0 AND (worktree GLOB '[A-Za-z]:*' OR worktree LIKE '//%');",
          ),
          yield* e.run(
            "UPDATE session SET directory = REPLACE(directory, char(92), '/') WHERE directory GLOB '[A-Za-z]:' || char(92) || '*' OR directory LIKE char(92) || char(92) || '%';",
          ),
          yield* e.run(
            "UPDATE session SET path = REPLACE(path, char(92), '/') WHERE path IS NOT NULL AND instr(path, char(92)) > 0 AND (directory GLOB '[A-Za-z]:*' OR directory LIKE '//%');",
          ));
      });
    },
  };
});
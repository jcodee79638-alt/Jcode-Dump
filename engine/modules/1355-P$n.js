
var P$n = ne(() => {
  Gt();
  TGs = {
    id: "20260511173437_session-metadata",
    up(e) {
      return ft(function* () {
        if ((yield* e.all("PRAGMA table_info(`session`)")).some((t) => t.name === "metadata")) return;
        yield* e.run("ALTER TABLE `session` ADD `metadata` text;");
      });
    },
  };
});

var y$n = ne(() => {
  Gt();
  yGs = {
    id: "20260504145000_add_sync_owner",
    up(e) {
      return ft(function* () {
        yield* e.run("ALTER TABLE `event_sequence` ADD `owner_id` text;");
      });
    },
  };
});